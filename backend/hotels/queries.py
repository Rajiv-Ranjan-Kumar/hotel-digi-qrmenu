import logging
from typing import Optional

from django.db import IntegrityError
from utils.cache_config import cache_data
from hotels.models import Hotel
from hotels.schema import HotelSchemaFilter, HotelSchemaIn, HotelSchemaOut
from ninja.errors import HttpError
from asgiref.sync import sync_to_async





logger = logging.getLogger(__name__)










async def add_new_hotel(payload: HotelSchemaIn, user_id: Optional[int] = None) -> HotelSchemaOut:
    try:
        data = payload.model_dump(exclude_unset=True)
        data["logo_id"] = data.pop("logo", None)

        hotel = await Hotel.objects.acreate(owner_id=user_id, **data)
        return await Hotel.objects.select_related("logo").aget(id=hotel.id)

    except IntegrityError as e:
        logger.error(f"IntegrityError while creating hotel: {e}", exc_info=True)
        if "unique" in str(e).lower() and "name" in str(e).lower():
            raise HttpError(400, "A hotel with this name already exists.")
        raise HttpError(400, "Invalid data or constraint violation.")

    except HttpError:
        raise
    except Exception:
        raise HttpError(500, "Something went wrong while creating hotel.")







async def update_hotel_by_id(hotel_id: int, payload: HotelSchemaIn, user_id: Optional[int] = None) -> HotelSchemaOut:
    try:
        data = payload.model_dump(exclude_unset=True)
        data["logo_id"] = data.pop("logo", None)
        data = {k: v for k, v in data.items() if v is not None}

        query = Hotel.objects.filter(id=hotel_id)
        if user_id is not None:
            query = query.filter(owner_id=user_id)

        updated_count = await query.aupdate(**data)
        if updated_count == 0:
            raise HttpError(404, "Hotel not found.")

        return await Hotel.objects.select_related("logo").aget(id=hotel_id)

    except IntegrityError as e:
        logger.error(f"IntegrityError while updating hotel: {e}", exc_info=True)
        if "unique" in str(e).lower() and "name" in str(e).lower():
            raise HttpError(400, "A hotel with this name already exists.")
        if "unique" in str(e).lower() and "logo" in str(e).lower():
            raise HttpError(400, "This logo is already assigned to another hotel.")
        raise HttpError(400, "Invalid data or constraint violation.")

    except HttpError:
        raise
    except Exception:
        raise HttpError(500, "Something went wrong while updating hotel.")
    










async def get_hotel_by_id(hotel_id: int, user_id: Optional[int] = None):
    @cache_data(f"hotel:{hotel_id}", ttl=600)
    def fetch():
        query = Hotel.objects.select_related("logo").filter(id=hotel_id)

        if user_id is not None:
            query = query.filter(owner_id=user_id)

        hotel_obj = query.first()
        if hotel_obj is None:
            raise Hotel.DoesNotExist

        return hotel_obj

    try:
        return await sync_to_async(fetch)()
    except Hotel.DoesNotExist:
        raise HttpError(status_code=404, message="Hotel not found.")
    except Exception as e:
        logger.error(f"Unexpected error while fetching hotel by ID: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong while fetching hotel.")








async def filter_hotel(filters: HotelSchemaFilter, user_id: Optional[int] = None):
    cache_key_parts = ["hotel_filter"]

    if filters.name:
        cache_key_parts.append(f"name:{filters.name}")

    if user_id:
        cache_key_parts.append(f"user:{user_id}")

    cache_key = "|".join(cache_key_parts)

    @cache_data(cache_key, ttl=300)
    def fetch():
        query = Hotel.objects.select_related("logo").all()

        if filters.name:
            query = query.filter(name__icontains=filters.name)

        if user_id is not None:
            query = query.filter(owner_id=user_id)

        return list(query)

    try:
        return await sync_to_async(fetch)()
    except Exception as e:
        logger.error(f"Error while filtering hotels: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong while filtering hotels.")








async def delete_hotel_by_id(hotel_id: int, user_id: Optional[int] = None):
    try:
        query = Hotel.objects.filter(id=hotel_id)
        if user_id is not None:
            query = query.filter(owner_id=user_id)

        deleted_count, _ = await query.adelete()
        if deleted_count == 0:
            raise HttpError(404, "Hotel not found.")

    except HttpError:
        raise
    except Exception:
        raise HttpError(500, "Something went wrong while deleting hotel.")