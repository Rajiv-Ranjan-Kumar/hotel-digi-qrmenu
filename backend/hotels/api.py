from typing import Optional
from ninja import Router

from accounts.models import UserGallery
from hotels.queries import add_new_hotel, get_hotel_by_id
from utils.helper import authorize_request, secure, validate_model_id
from hotels.schema import HotelSchemaIn, HotelSchemaOut




router = Router()




@router.post("/hotel", response=HotelSchemaOut, auth=secure())
@authorize_request
async def register_hotel(request, payload: HotelSchemaIn, user_id: Optional[int] = None):
    await validate_model_id(value=payload.logo, model=UserGallery, field_name="Logo")
    hotel_query = await add_new_hotel(payload=payload, user_id=user_id)
    return hotel_query






@router.get("/hotel/{hotel_id}", response=HotelSchemaOut, auth=secure())
@authorize_request
async def get_hotel(request, hotel_id: int, user_id: Optional[int] = None):
    hotel_obj = await get_hotel_by_id(hotel_id=hotel_id, user_id=user_id)
    return hotel_obj