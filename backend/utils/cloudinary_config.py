import os
import uuid
import logging
import asyncio
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from django.conf import settings






logger = logging.getLogger(__name__)









cloudinary.config(
    cloud_name=settings.CLOUDINARY_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True
)







def upload_to_cloudinary(file, filename: str):
    try:
        base_name = os.path.splitext(filename)[0]
        unique_id = f"{base_name}_{uuid.uuid4().hex[:8]}"
        upload_result = cloudinary.uploader.upload(file, public_id=unique_id, overwrite=False)
        original_url = upload_result.get("secure_url")

        optimized_url, _ = cloudinary_url(unique_id, fetch_format="auto", quality="auto")
        auto_crop_url, _ = cloudinary_url(unique_id, width=150, height=150, crop="auto", gravity="auto")

        return {
            "filename": filename,
            "original_url": original_url,
            "optimized_url": optimized_url,
            "auto_crop_url": auto_crop_url,
            "public_id": unique_id
        }
    except Exception as e:
        logger.error(f"Cloudinary upload failed: {e}", exc_info=True)
        return None







def assign_cloudinary_data(instance, upload_result: dict):
    """Common helper to set all cloudinary fields on model instance."""
    if not upload_result:
        return
    instance.original_image_url = upload_result["original_url"]
    instance.optimized_image_url = upload_result["optimized_url"]
    instance.auto_crop_image_url = upload_result["auto_crop_url"]
    instance.public_id = upload_result["public_id"]
    instance.name = upload_result["filename"]







async def upload_images_bulk(files: list):
    async def safe_upload(file, filename):
        return await asyncio.to_thread(upload_to_cloudinary, file, filename)

    tasks = [safe_upload(f.file, getattr(f, "name", "file")) for f in files]
    results = await asyncio.gather(*tasks)
    return [r for r in results if r]







def delete_from_cloudinary(public_id: str) -> bool:
    try:
        if public_id:
            cloudinary.uploader.destroy(public_id)
            logger.info(f"Deleted from Cloudinary: {public_id}")
            return True
        return False
    except Exception as e:
        logger.error(f"Cloudinary delete failed: {e}", exc_info=True)
        return False
