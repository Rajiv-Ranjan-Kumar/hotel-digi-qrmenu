import io
import random
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


from utils.cloudinary_config import assign_cloudinary_data, upload_to_cloudinary
from coresettings.models import Role










class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_active") is not True:
            raise ValueError("Superuser must have is_active=True.")
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)









class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()
    
    class Meta:
        ordering = ["-date_joined"]
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email










class UserRole(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="role")
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="users")
    assigned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-assigned_at"]
        verbose_name = "User Role"
        verbose_name_plural = "User Roles"

    def __str__(self):
        return f"{self.user.email} → {self.role.name}"










class OtpHistory(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="otp_history")
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]
        verbose_name = "OTP History"
        verbose_name_plural = "OTP Histories"

    def __str__(self):
        return f"{self.user.email} - {self.otp}"

    def generate_otp(self):
        """Instance method to generate OTP and overwrite old one."""
        self.otp = f"{random.randint(100000, 999999)}"
        self.save(update_fields=["otp", "created_at"])
        return self.otp

    @classmethod
    def get_or_create_with_otp(cls, user):
        """Class method to get or create OTPHistory and generate new OTP."""
        obj, created = cls.objects.get_or_create(user=user)
        obj.generate_otp()
        return obj












class UserGallery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="gallery")
    original_image_url = models.URLField(blank=True, null=True)
    optimized_image_url = models.URLField(blank=True, null=True)
    auto_crop_image_url = models.URLField(blank=True, null=True)
    public_id = models.CharField(max_length=255, blank=True, null=True, unique=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    image_file = models.ImageField(upload_to="temp_uploads/", blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]

    def __str__(self):
        return f"Image {self.id} for {self.user.email if self.user else 'Unknown'}"

    def save(self, *args, **kwargs):
        if self.image_file and not self.original_image_url:
            file_content = self.image_file.read()
            upload_result = upload_to_cloudinary(io.BytesIO(file_content), self.image_file.name)
            assign_cloudinary_data(self, upload_result)
            self.image_file = None
        super().save(*args, **kwargs)