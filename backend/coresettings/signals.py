# accounts/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import ApiAccess, Role
from utils.cache_config import invalidate_cache




@receiver(post_save, sender=Role)
@receiver(post_delete, sender=Role)
def clear_role_cache(sender, instance, **kwargs):
    # clear roles cache
    invalidate_cache("roles")
    # clear all api access cache
    invalidate_cache("access")



@receiver(post_save, sender=ApiAccess)
@receiver(post_delete, sender=ApiAccess)
def clear_access_cache(sender, instance, **kwargs):
    invalidate_cache("access")