from typing import List, Optional
from coresettings.queries import get_roles
from asgiref.sync import sync_to_async
from ninja import Router





router = Router()





@router.get("/role", response={200: List[dict]})
async def fetch_roles(request):
    roles = await get_roles()
    roles = await sync_to_async(list)(roles.values("id", "name", "description"))
    return roles