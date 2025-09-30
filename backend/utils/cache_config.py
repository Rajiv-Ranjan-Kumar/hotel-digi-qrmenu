# utils/cache_utils.py
import logging
from django.core.cache import cache
from django.conf import settings
import functools
from django_redis import get_redis_connection







logger = logging.getLogger(__name__)





DEFAULT_TTL = getattr(settings, "CACHE_TTL", 600)



def cache_data(key_prefix: str, ttl: int = DEFAULT_TTL):
    """
    Universal decorator to cache any function result.
    First check Redis, else DB call, then update Redis.
    """
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            key = f"{key_prefix}:{kwargs}"
            data = cache.get(key)
            if data is not None:
                logger.info("✅ CACHE HIT → %s", key)   # Docker logs me dikhega
                return data  # cache hit

            result = func(*args, **kwargs)  # DB call
            cache.set(key, result, ttl)
            logger.info("⚡ DB HIT (cached now) → %s", key)  # Docker logs me dikhega
            return result
        return wrapper
    return decorator




def invalidate_cache(pattern: str):
    """
    Clear cache keys matching a pattern.
    Example: invalidate_cache("users")
    """
    con = get_redis_connection("default")
    keys = con.keys(f"{pattern}:*")
    if keys:
        con.delete(*keys)
