from typing import Optional
from ninja import Query, Router
from ninja.pagination import paginate, PageNumberPagination

from accounts.models import UserGallery
from hotels.queries import add_new_hotel, delete_hotel_by_id, filter_hotel, get_hotel_by_id, update_hotel_by_id
from utils.helper import authorize_request, secure, validate_model_id
from hotels.schema import HotelSchemaFilter, HotelSchemaIn, HotelSchemaOut




router = Router()




@router.post("/hotel", response=HotelSchemaOut, auth=secure())
@authorize_request
async def register_hotel(request, payload: HotelSchemaIn, user_id: Optional[int] = None):
    await validate_model_id(value=payload.logo, model=UserGallery, field_name="Logo")
    hotel_query = await add_new_hotel(payload=payload, user_id=user_id)
    return hotel_query






@router.put("/hotel/{hotel_id}", response=HotelSchemaOut, auth=secure())
@authorize_request
async def update_hotel(request, hotel_id: int, payload: HotelSchemaIn, user_id: Optional[int] = None):
    await validate_model_id(value=payload.logo, model=UserGallery, field_name="Logo")
    hotel_obj = await update_hotel_by_id(hotel_id=hotel_id, payload=payload, user_id=user_id)
    return hotel_obj






@router.get("/hotel/{hotel_id}", response=HotelSchemaOut, auth=secure())
@authorize_request
async def get_hotel(request, hotel_id: int, user_id: Optional[int] = None):
    hotel_obj = await get_hotel_by_id(hotel_id=hotel_id, user_id=user_id)
    return hotel_obj





@router.get("/hotel", response=list[HotelSchemaOut], auth=secure())
@authorize_request
@paginate(PageNumberPagination, page_size=10)
async def filter_hotels(request, filters: HotelSchemaFilter = Query(...), user_id: Optional[int] = None):
    hotels = await filter_hotel(filters=filters, user_id=user_id)
    return hotels







@router.delete("/hotel/{hotel_id}", auth=secure())
@authorize_request
async def delete_hotel(request, hotel_id: int, user_id: Optional[int] = None):
    hotel_obj = await delete_hotel_by_id(hotel_id=hotel_id, user_id=user_id)
    return {"detail": "Hotel deleted successfully."}