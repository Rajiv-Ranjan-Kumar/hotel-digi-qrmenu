import logging
from typing import Optional

from utils.cache_config import cache_data, invalidate_cache

from .models import Role, User, UserRole
from ninja.errors import HttpError
from django.db import transaction
from asgiref.sync import sync_to_async







logger = logging.getLogger(__name__)






@cache_data("user_exist", ttl=300)
def user_exist_in_db(**query):
    return User.objects.filter(**query, is_active=True).exists()





async def is_user_already_exist(id: Optional[int] = None, email: Optional[str] = None) -> bool:
    if not (id or email):
        return False

    query = {"id": id} if id else {"email": email}
    return await sync_to_async(user_exist_in_db)(**query)














async def add_new_user(payload):
    try:
        if await is_user_already_exist(email=payload.email):
            raise HttpError(status_code=400, message="User with this email already exists")

        user_data = {k: v for k, v in payload.model_dump().items() if k not in ["password", "confirm_password", "role_id"]}

        def create_user_and_role():
            with transaction.atomic():
                # Create user
                user = User.objects.create(**user_data)
                user.set_password(payload.password)
                user.save()

                # Assign role
                user_role = UserRole.objects.create(user=user, role_id=payload.role_id)

                # Fetch role object
                role = Role.objects.get(id=user_role.role_id)

                # Super Admin block
                if role.name.lower() == "super admin":
                    raise HttpError(
                        status_code=400,
                        message="You cannot create an account with the Super Admin role."
                    )

                # Admin flags
                if role.name.lower() == "admin":
                    user.is_active = True
                    user.is_staff = True
                    user.save()

            return user

        user = await sync_to_async(create_user_and_role)()

        # 🚨 Invalidate cached user exist checks after create
        invalidate_cache("user_exist")
        
        return user

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error adding new user: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")
