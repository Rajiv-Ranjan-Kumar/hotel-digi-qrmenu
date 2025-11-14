from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from accounts.models import User, UserGallery





class Hotel(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_hotels")
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    logo = models.OneToOneField(UserGallery, on_delete=models.SET_NULL, blank=True, null=True, related_name="hotel_logo")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Hotel")
        verbose_name_plural = _("Hotels")

    def __str__(self):
        return self.name









class Branch(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name="branches")
    name = models.CharField(max_length=150)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Branch")
        verbose_name_plural = _("Branches")

    def __str__(self):
        return f"{self.name} ({self.hotel.name})"

