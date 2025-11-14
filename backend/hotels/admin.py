from django.contrib import admin
from .models import Hotel, Branch




@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ("name", "owner", "created_at")
    search_fields = ("name", "owner__email")
    list_filter = ("created_at",)
    ordering = ("-created_at",)






@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ("name", "hotel", "city", "is_active", "created_at")
    list_filter = ("city", "is_active", "created_at")
    search_fields = ("name", "hotel__name", "city")
    ordering = ("-created_at",)
