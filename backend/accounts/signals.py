# accounts/signals.py
import logging
import os
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from utils.cloudinary_config import delete_from_cloudinary
from coresettings.models import Role
from .models import OtpHistory, User, UserGallery, UserRole
from utils.cache_config import invalidate_cache



logger = logging.getLogger(__name__)







@receiver(post_save, sender=User)
def assign_superadmin_role(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        super_admin_role = Role.objects.get(name="Super Admin")
        UserRole.objects.get_or_create(user=instance, role=super_admin_role)








@receiver(post_save, sender=User)
@receiver(post_delete, sender=User)
def clear_user_cache(sender, instance, **kwargs):
    # clear user list cache
    invalidate_cache("users")

    # clear user existence cache (id/email based)
    invalidate_cache("user_exist")








@receiver(post_save, sender=UserRole)
@receiver(post_delete, sender=UserRole)
def clear_role_cache(sender, instance, **kwargs):
    # clear user_role cache
    invalidate_cache("user_role")









@receiver(post_save, sender=OtpHistory)
@receiver(post_delete, sender=OtpHistory)
def clear_otp_cache(sender, instance, **kwargs):
    # clear otp_history cache for specific user
    cache_key = f"otp_history:{instance.user.email}"
    invalidate_cache(cache_key)






@receiver(post_delete, sender=UserGallery)
def delete_cloudinary_image(sender, instance, **kwargs):
    if instance.public_id:
        delete_from_cloudinary(instance.public_id)




@receiver(post_save, sender=UserGallery)
@receiver(post_delete, sender=UserGallery)
def clear_user_gallery_cache(sender, instance, **kwargs):
    # Clear gallery cache for this user
    cache_key = f"user_gallery:{instance.user.id}"
    invalidate_cache(cache_key)