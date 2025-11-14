from django.db import models





class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name






class Apis(models.Model):
    path = models.CharField(max_length=255, unique=True)
    comment = models.CharField(max_length=255, default="Auto Add by System")

    def __str__(self):
        return self.path







class ApiAccess(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="api_access")
    api = models.ForeignKey(Apis,  on_delete=models.CASCADE, related_name="access_entries")

    can_get = models.BooleanField(default=False)
    can_post = models.BooleanField(default=False)
    can_put = models.BooleanField(default=False)
    can_patch = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)

    class Meta:
        unique_together = ("role", "api")

    def __str__(self):
        role_name = self.role.name if self.role else "No Role"
        perms = []
        if self.can_get: perms.append("GET")
        if self.can_post: perms.append("POST")
        if self.can_put: perms.append("PUT")
        if self.can_patch: perms.append("PATCH")
        if self.can_delete: perms.append("DELETE")
        return f"{role_name} → {self.api} ({', '.join(perms) if perms else 'No Access'})"
