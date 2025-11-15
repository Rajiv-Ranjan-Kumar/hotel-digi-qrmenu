from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from utils.cache_config import invalidate_cache
from hotels.models import Hotel





@receiver(post_save, sender=Hotel)
@receiver(post_delete, sender=Hotel)
def clear_hotel_cache(sender, instance, **kwargs):
    cache_key = f"hotel:{instance.id}"
    invalidate_cache(cache_key)
    # Clear filter cache
    invalidate_cache("hotel_filter")