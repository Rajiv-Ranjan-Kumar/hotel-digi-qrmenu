from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import User, Role, UserRole, ApiAccess








class UserAdmin(BaseUserAdmin):
    ordering = ["id"]
    list_display = ["email", "first_name", "last_name", "is_staff", "is_active"]
    list_filter = ["is_staff", "is_superuser", "is_active"]
    search_fields = ["email", "first_name", "last_name"]

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "is_staff", "is_active"),
            },
        ),
    )

    filter_horizontal = ("groups", "user_permissions")
    readonly_fields = ("date_joined",)










@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "description"]
    search_fields = ["name"]






@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "role", "assigned_at"]
    list_filter = ["role"]
    search_fields = ["user__email", "role__name"]






@admin.register(ApiAccess)
class ApiAccessAdmin(admin.ModelAdmin):
    list_display = ["id", "role", "path", "can_get", "can_post", "can_put", "can_patch", "can_delete"]
    list_filter = ["role"]
    search_fields = ["path"]


admin.site.register(User, UserAdmin)
