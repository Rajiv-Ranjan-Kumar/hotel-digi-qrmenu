from django.contrib import admin
from django.utils.html import format_html
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import OtpHistory, User, UserGallery, UserRole







class UserAdmin(BaseUserAdmin):
    ordering = ["id"]
    list_display = ["email", "first_name", "last_name", "is_staff", "is_active"]
    list_filter = ["is_staff", "is_superuser", "is_active"]
    search_fields = ["email", "first_name", "last_name"]

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "is_staff", "is_active"),
            },
        ),
    )

    filter_horizontal = ("groups", "user_permissions")
    readonly_fields = ("date_joined",)






admin.site.register(User, UserAdmin)



@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "role", "assigned_at"]
    list_filter = ["role"]
    search_fields = ["user__email", "role__name"]







@admin.register(OtpHistory)
class OtpHistoryAdmin(admin.ModelAdmin):
    list_display = ("user", "otp", "created_at")
    readonly_fields = ("created_at",)








@admin.register(UserGallery)
class UserGalleryAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "name", "uploaded_at", "image_preview")
    list_filter = ("user", "uploaded_at")
    search_fields = ("user__email", "name")
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        if obj.original_image_url:
            return format_html(
                '<img src="{}" width="80" height="80" style="object-fit:cover; border-radius:8px;" />',
                obj.original_image_url
            )
        return "No Image"
    image_preview.short_description = "Preview"

    def get_readonly_fields(self, request, obj=None):
        readonly = list(super().get_readonly_fields(request, obj))
        if obj and obj.original_image_url:
            readonly.append("image_file")
        return readonly

    def get_fields(self, request, obj=None):
        fields = ["user", "name", "image_preview", "image_file",
                  "original_image_url", "optimized_image_url", "auto_crop_image_url", "public_id"]
        if obj and obj.original_image_url:
            fields.remove("image_file")
        return fields