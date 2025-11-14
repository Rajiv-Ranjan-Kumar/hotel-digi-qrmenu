from django.db import transaction
from django.core.management.base import BaseCommand
from backend.api import api
from coresettings.models import ApiAccess, Apis, Role




EXCLUDE_PATHS = [
    "/api/accounts/create-account",
    "/api/accounts/verify-account",
    "/api/accounts/send-otp/{email}",
    "/api/accounts/change-password",
    "/api/accounts/login",
]





DEFAULT_ROLES = [
    {
        "name": "Super Admin",
        "description": "Has unrestricted access to all system features, APIs, and administrative actions.",
    },
    {
        "name": "Admin",
        "description": "Can manage users, roles, and application data with limited administrative privileges.",
    },
]














class Command(BaseCommand):
    help = "Sync all API paths, ensure roles exist, and assign full API permissions to Super Admin."


    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING("🔄 Starting API sync and role setup..."))
        self.create_default_roles()
        self.sync_api_paths()
        self.grant_full_access_to_superadmin()
        self.stdout.write(self.style.SUCCESS("✅ All operations completed successfully."))




    def create_default_roles(self):
        roles_to_create = []
        existing_roles = set(Role.objects.values_list("name", flat=True))

        for role_data in DEFAULT_ROLES:
            if role_data["name"] not in existing_roles:
                roles_to_create.append(Role(**role_data))

        if roles_to_create:
            Role.objects.bulk_create(roles_to_create)
            self.stdout.write(self.style.SUCCESS(f"Created {len(roles_to_create)} new roles."))
        else:
            self.stdout.write(self.style.SUCCESS("All default roles already exist."))

    
    
    
    
    def sync_api_paths(self):
        schema = api.get_openapi_schema()
        exclude_normalized = [ep.rstrip("/") for ep in EXCLUDE_PATHS]
        existing_paths = set(Apis.objects.values_list("path", flat=True))

        new_apis = []

        for path, methods in schema["paths"].items():
            if not path.startswith("/api/"):
                continue
            
            if not methods:
                continue
        
            # 1️⃣ Remove trailing slash
            normalized = path.rstrip("/")
            
            # 2️⃣ Skip excluded paths
            if normalized in exclude_normalized:
                continue

            # 3️⃣ Skip dynamic parameter paths → {something}
            if "{" in path or "}" in path:
                continue

            # 4️⃣ Skip if already present
            if path in existing_paths:
                continue

            new_apis.append(Apis(path=path))

        if new_apis:
            Apis.objects.bulk_create(new_apis)
            self.stdout.write(self.style.SUCCESS(f"Added {len(new_apis)} new API paths."))
        else:
            self.stdout.write(self.style.SUCCESS("No new API paths to add."))






    def grant_full_access_to_superadmin(self):
        super_admin = Role.objects.filter(name="Super Admin").first()
        if not super_admin:
            self.stdout.write(self.style.ERROR("Super Admin role not found — skipping permission assignment."))
            return

        all_apis = list(Apis.objects.all())
        existing_access = set(ApiAccess.objects.filter(role=super_admin).values_list("api_id", flat=True))

        new_access = [
            ApiAccess(role=super_admin, api=api_obj, can_get=True, can_post=True, can_put=True, can_patch=True, can_delete=True)
            for api_obj in all_apis
            if api_obj.id not in existing_access
        ]

        if new_access:
            ApiAccess.objects.bulk_create(new_access)
            self.stdout.write(self.style.SUCCESS(f"Granted full access to Super Admin for {len(new_access)} APIs."))
        else:
            self.stdout.write(self.style.SUCCESS("Super Admin already has access to all APIs."))