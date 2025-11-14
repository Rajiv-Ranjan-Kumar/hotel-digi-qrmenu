import re
from .models import ApiAccess, Role
from hashlib import md5
from utils.cache_config import cache_data
from asgiref.sync import sync_to_async









async def get_roles():
    @cache_data("roles")
    def get_all_roles():
        return Role.objects.all()

    return await sync_to_async(get_all_roles)()









async def get_access_entry(path: str, user_roles):
    role_ids = sorted(str(r.id) for r in user_roles)
    cache_key = f"access:{path}:{md5(','.join(role_ids).encode()).hexdigest()}"

    @cache_data(cache_key, ttl=300)
    def fetch_entry():
        all_entries = ApiAccess.objects.filter(role__in=user_roles)
        for entry in all_entries:
            api_path = entry.api.path.rstrip('/')
            pattern = re.sub(r"\{[a-zA-Z_]+\}", r"[^/]+", api_path)
            pattern = pattern.rstrip('/')
            if re.match(f"^{pattern}(/[^/]+)?$", path.rstrip('/')):
                return entry
        return None

    return await sync_to_async(fetch_entry)()