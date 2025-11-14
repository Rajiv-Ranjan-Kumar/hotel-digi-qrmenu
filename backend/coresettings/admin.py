from django.contrib import admin
from coresettings.models import ApiAccess, Apis, Role





# Register your models here.

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "description"]
    search_fields = ["name"]






@admin.register(Apis)
class ApisAdmin(admin.ModelAdmin):
    list_display = ["id", "path", "comment"]
    list_filter = ["path"]
    search_fields = ["path"]





@admin.register(ApiAccess)
class ApiAccessAdmin(admin.ModelAdmin):
    list_display = ["id", "role", "api", "can_get", "can_post", "can_put", "can_patch", "can_delete"]
    list_filter = ["role"]
    search_fields = ["api"]