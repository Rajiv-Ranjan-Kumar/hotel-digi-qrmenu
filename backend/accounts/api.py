from accounts.models import Role
from validators.base import validate_model_id
from ninja import Router
from core.redis import redis
from accounts.schemas import UserInSchema

from accounts.queries import (
    add_new_user
)



router = Router()






@router.post("/create-account", response={ 200: dict })
async def create_account(request, payload: UserInSchema):
    # print(payload)
    await validate_model_id(model = Role, value = payload.role_id, field_name="User role")
    await add_new_user(payload)
    return { "message": "Account created successfully" }