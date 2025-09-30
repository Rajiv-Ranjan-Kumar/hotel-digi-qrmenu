# accounts/signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import User, Role, UserRole
from utils.cache_config import invalidate_cache








@receiver(post_save, sender=User)
@receiver(post_delete, sender=User)
def clear_user_cache(sender, instance, **kwargs):
    invalidate_cache("users")






@receiver(post_save, sender=Role)
@receiver(post_delete, sender=Role)
def clear_role_cache(sender, instance, **kwargs):
    invalidate_cache("roles")






@receiver(post_save, sender=UserRole)
@receiver(post_delete, sender=UserRole)
def clear_role_cache(sender, instance, **kwargs):
    invalidate_cache("user_role")