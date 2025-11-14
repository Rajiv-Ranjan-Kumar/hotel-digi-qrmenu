import logging
from typing import Optional

from django.db import IntegrityError
from hotels.models import Hotel
from hotels.schema import HotelSchemaIn, HotelSchemaOut
from ninja.errors import HttpError





logger = logging.getLogger(__name__)










async def add_new_hotel(payload: HotelSchemaIn, user_id: Optional[int] = None) -> HotelSchemaOut:
    try:
        data = payload.model_dump(exclude_unset=True)
        
        if "logo" in data:
            data["logo_id"] = data.pop("logo")
            
        hotel_obj = await Hotel.objects.acreate(owner_id=user_id, **data)
        return hotel_obj
    
    except IntegrityError as e:
        if "unique constraint" in str(e).lower() or "unique" in str(e).lower():
            raise HttpError(status_code=400, message="A hotel with this name already exists.")
        else:
            logger.error(f"Integrity error while creating hotel: {e}", exc_info=True)
            raise HttpError(status_code=400, message="Invalid data or constraint violation.")

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Unexpected error while creating hotel: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong while creating hotel.")








async def get_hotel_by_id(hotel_id: int, user_id: Optional[int] = None) -> HotelSchemaOut:
    try:
        query = Hotel.objects.select_related("logo").filter(id=hotel_id)

        if user_id is not None:
            query = query.filter(owner_id=user_id)

        hotel_obj = await query.aget()
        return hotel_obj

    except Hotel.DoesNotExist:
        raise HttpError(status_code=404, message="Hotel not found.")
    except Exception as e:
        logger.error(f"Unexpected error while fetching hotel by ID: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong while fetching hotel.")
