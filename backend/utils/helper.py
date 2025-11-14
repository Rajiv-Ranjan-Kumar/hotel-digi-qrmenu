from functools import wraps
import logging
from typing import Type
from django.db.models import Model
from asgiref.sync import sync_to_async
from ninja.errors import HttpError

from accounts.auth_backend import GlobalAuth
from accounts.queries import is_user_exist
from coresettings.queries import get_access_entry, get_roles
from utils.cache_config import cache_data






logger = logging.getLogger(__name__)





def secure():
    return GlobalAuth()






def get_full_file_path(request, relative_path):
    if not relative_path:
        return None

    # Agar relative_path already URL hai (S3), return directly
    if relative_path.startswith("http://") or relative_path.startswith("https://"):
        return relative_path

    # Local development: build absolute URL
    return request.build_absolute_uri(relative_path)







async def validate_model_id(model: Type[Model], value: int, field_name: str):
    @cache_data(f"{model.__name__.lower()}_exists", ttl=300)
    def check_in_db(id: int) -> bool:
        return model.objects.filter(id=id).exists()

    exists = await sync_to_async(check_in_db)(id=value)

    if not exists:
        raise HttpError(status_code=404, message=f"{field_name} with ID {value} not found")











def normalize_role_name(name: str) -> str:
    return name.replace(" ", "").replace("-", "").lower()











def authorize_request(func):
    @wraps(func)
    async def wrapper(request, *args, **kwargs):
        user_role = getattr(request, "user_role", None)
        user_id_from_token = getattr(request, "user_id", None)
        request_path = request.path
        request_method = str(request.method).lower()

        if not user_role:
            raise HttpError(403, "User role missing in token or request.")
        


        # Get all roles
        roles = await get_roles()
        normalized_user_role = normalize_role_name(user_role)



        # Full access roles
        if normalized_user_role in ("superadmin", "admin"):
            logger.info(f"✅ {normalized_user_role} has full access to {request_path}")
            return await func(request, *args, **kwargs)
        


        # Validate user existence
        if normalized_user_role in ("superadmin", "admin"):
            if "user_id" not in kwargs or not kwargs["user_id"]:
                kwargs["user_id"] = user_id_from_token
        else:
            kwargs["user_id"] = user_id_from_token

        target_user_id = kwargs.get("user_id")

        if not target_user_id or not await is_user_exist(id=target_user_id):
            raise HttpError(404, "User not found or inactive.")
        


        # Match user role in DB
        matched_role = next((r for r in roles if normalize_role_name(r.name) == normalized_user_role), None)
        if not matched_role:
            raise HttpError(403, "Invalid or unregistered user role.")
        


        # Get ApiAccess entry
        access_entry = await get_access_entry(request_path, [matched_role])
        if not access_entry:
            raise HttpError(403, f"No access entry found for {request_path}")
        


        # Check HTTP method permission
        method_field = f"can_{request_method}"
        allowed = getattr(access_entry, method_field, False)

        logger.info(
            f"🔐 {normalized_user_role.upper()} → {request_method.upper()} "
            f"on {request_path} → Allowed: {allowed}"
        )

        if not allowed:
            raise HttpError(403, f"{request_method.upper()} not allowed for this role.")

        return await func(request, *args, **kwargs)

    return wrapper
