import logging
from typing import Optional
from .models import User
from ninja.errors import HttpError







logger = logging.getLogger(__name__)






async def is_user_already_exist(id: Optional[int] = None, email: Optional[str] = None) -> bool:
    query = {}
    if id is not None:
        query["id"] = id
    elif email is not None:
        query["email"] = email
    else:
        return False

    user = await User.objects.filter(**query).afirst()
    if not user:
        return False

    if user.is_active:
        return True

    await user.adelete()
    return False








async def add_new_user(payload: dict):
    try:
        if await is_user_already_exist(email=payload.get("email")):
            raise HttpError(status_code=400, message="User with this email already exists")
        
        password = payload.pop("password", None)
        user = await User.objects.acreate(**payload)

        if password:
            user.set_password(password)
            await user.asave()
        
        return user
    
    except Exception as e:
        logger.error(f"Error adding new user: {e}", exc_info=True)
        raise HttpError(status_code=500, message="something went wrong")