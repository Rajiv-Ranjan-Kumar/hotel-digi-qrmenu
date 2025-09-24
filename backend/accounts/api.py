from ninja import Router
from core.redis import redis
from accounts.schemas import UserInSchema

from accounts.queries import (
    add_new_user
)



router = Router()






@router.post("/create-account", response={ 200: dict })
async def create_account(request, payload: UserInSchema):
    print(payload)
    # await add_new_user(payload.dict())
    return { "message": "Account created successfully" }