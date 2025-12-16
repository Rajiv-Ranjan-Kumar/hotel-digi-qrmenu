from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from utils.cache_config import invalidate_cache
from hotels.models import Branch, Hotel






@receiver(post_save, sender=Hotel)
def create_default_branch(sender, instance, created, **kwargs):
    if created:
        Branch.objects.create(
            hotel=instance,
            name=f"{instance.name} Main Branch",
            address="Default address",
            country=None,
            state=None,
            city=None,
            pincode=None,
            latitude=None,
            longitude=None
        )






@receiver(post_save, sender=Hotel)
@receiver(post_delete, sender=Hotel)
def clear_hotel_cache(sender, instance, **kwargs):
    cache_key = f"hotel:{instance.id}"
    invalidate_cache(cache_key)

    # Clear filter cache
    invalidate_cache("hotel_filter")

    # Manager dashboard cache for the owner
    manager_cache_key = f"manager_dashboard:{instance.owner_id}"
    invalidate_cache(manager_cache_key)





@receiver(post_save, sender=Branch)
@receiver(post_delete, sender=Branch)
def clear_branch_cache(sender, instance, **kwargs):
    cache_key = f"branch:{instance.id}"
    invalidate_cache(cache_key)

    # Manager dashboard cache for the owner of the hotel
    manager_cache_key = f"manager_dashboard:{instance.hotel.owner_id}"
    invalidate_cache(manager_cache_key)