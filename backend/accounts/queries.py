import logging
from typing import Optional


from .auth_backend import generate_jwt_token
from utils.cache_config import cache_data
from utils.cloudinary_config import assign_cloudinary_data, upload_images_bulk


from .models import OtpHistory, User, UserGallery, UserRole
from coresettings.models import Role
from ninja.errors import HttpError
from django.db import IntegrityError, transaction
from asgiref.sync import sync_to_async
from django.contrib.auth.hashers import check_password







logger = logging.getLogger(__name__)










async def is_user_exist(id: Optional[int]=None, email: Optional[str]=None, is_active: bool=True) -> bool:
    if not (id or email):
        return False
    
    query = {"id": id} if id else {"email": email}

    @cache_data("user_exist", ttl=300)
    def check():
        return User.objects.filter(**query, is_active=is_active).exists()
    return await sync_to_async(check)()











async def verify_otp(email: str, otp: int):
    @cache_data(f"otp_history:{email}", ttl=300)
    def check():
        return OtpHistory.objects.filter(user__email=email, otp=otp).first()
    return await sync_to_async(check)()












async def add_new_user(payload):
    try:
        if await is_user_exist(email=payload.email):
            raise HttpError(status_code=400, message="User with this email already exists")

        user_data = {k: v for k, v in payload.model_dump().items() if k not in ["password", "confirm_password", "role_id"]}

        def create_user_and_role():
            with transaction.atomic():
                # Create user
                user = User.objects.create(**user_data)
                user.set_password(payload.password)
                user.save()

                # Assign role
                user_role = UserRole.objects.create(user=user, role_id=payload.role_id)

                # Fetch role object
                role = Role.objects.get(id=user_role.role_id)

                # Super Admin block
                if role.name.lower() == "super admin":
                    raise HttpError(status_code=400, message="You cannot create an account with the Super Admin role.")

                # Admin flags
                elif role.name.lower() == "admin":
                    user.is_active = True
                    user.is_staff = True
                    user.save()
                
                # Generate otp
                else:
                    OtpHistory.get_or_create_with_otp(user=user)

            return user

        user = await sync_to_async(create_user_and_role)()
        
        return user

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error adding new user: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")











async def account_verify(payload):
    try:
        # User exist check (inactive)
        if not await is_user_exist(email=payload.email, is_active=False):
            raise HttpError(status_code=400, message="Unverified account not found with this email")

        quarry = await verify_otp(payload.email, payload.otp)

        if not quarry:
            raise HttpError(status_code=400, message="Invalid OTP.")

        # Get related user safely (relation access = sync call)
        user = await sync_to_async(lambda: quarry.user)()
        user.is_active = True
        await user.asave(update_fields=["is_active"])

        # OTP delete after success
        await quarry.adelete()

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error verifying user account: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")










async def generate_and_send_otp(email: str):
    try:
        if not await is_user_exist(email=email):
            raise HttpError(status_code=400, message="User not found with this email")

        def generate_otp():
            with transaction.atomic():
                user = User.objects.get(email=email)
                return OtpHistory.get_or_create_with_otp(user)

        await sync_to_async(generate_otp)()

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error generate otp: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")










async def set_new_password(payload):
    try:
        if not await is_user_exist(email=payload.email):
            raise HttpError(status_code=400, message="User not found with this email")
        
        quarry = await verify_otp(payload.email, payload.otp)

        if not quarry:
            raise HttpError(status_code=400, message="Invalid OTP.")
        
        # Get related user safely (relation access = sync call)
        user = await sync_to_async(lambda: quarry.user)()
        user.set_password(payload.password)
        await user.asave(update_fields=["password"])

        # delete OTP after password reset
        await quarry.adelete()
    
    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error set new password: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")








async def authenticate_user(payload):
    try:
        # User + roles + role in one go
        user = await sync_to_async(
            lambda: User.objects.prefetch_related("role__role").filter(email=payload.email, is_active=True).first()
        )()

        if not user:
            raise HttpError(status_code=400, message="User not found with this email")

        if not await sync_to_async(check_password)(payload.password, user.password):
            raise HttpError(status_code=401, message="Invalid credentials")

        if not user.is_active:
            raise HttpError(status_code=403, message="User account is inactive")

        # roles extract from prefetched relation
        role = user.role.role.name

        access_token = await sync_to_async(generate_jwt_token)(user=user)

        return {k: getattr(user, k) for k in ("id", "first_name", "last_name", "email")} | {
            "role": role,
            "is_authenticated": user.is_authenticated,
            "access_token": access_token,
        }

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error authenticate user: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")


















async def upload_files(user_id: int, files: list):
    if len(files) > 5:
        raise HttpError(status_code=400, message="You can upload a maximum of 5 files at once.")

    uploaded_urls = await upload_images_bulk(files)

    @sync_to_async
    def save_uploaded_images():
        saved_objects = []
        with transaction.atomic():
            for f in uploaded_urls:
                try:
                    obj = UserGallery(user_id=user_id)
                    assign_cloudinary_data(obj, f)
                    obj.save()
                    saved_objects.append(obj)
                except IntegrityError:
                    logger.warning(f"Duplicate public_id skipped: {f['public_id']}")
                    continue
        return saved_objects

    try:
        saved = await save_uploaded_images()
        if not saved:
            raise HttpError(status_code=400, message="No new images were uploaded (duplicates skipped).")
        return saved
    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error while saving uploaded images: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong during upload.")













async def fetch_user_gallery(user_id: Optional[int] = None):
    @cache_data("user_gallery", ttl=300)
    def get_gallery():
        query = UserGallery.objects.all().order_by('-uploaded_at')
        if user_id:
            query = query.filter(user_id=user_id)
        return list(query)

    try:
        return await sync_to_async(get_gallery)()
    except Exception as e:
        logger.error(f"Error fetching user gallery: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")











async def delete_user_gallery_image(gallery_id: int, user_id: Optional[int] = None):
    try:
        @sync_to_async
        def delete_image():
            query = UserGallery.objects.filter(id=gallery_id)
            if user_id:
                query = query.filter(user_id=user_id)
            obj = query.first()
            if not obj:
                raise HttpError(status_code=404, message="Gallery image not found.")
            obj.delete()

        await delete_image()

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error deleting user gallery image: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong")