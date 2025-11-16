import logging
from typing import Optional
from django.db import transaction

from django.db import IntegrityError
from utils.cache_config import cache_data
from hotels.models import Branch, Hotel
from hotels.schema import BranchSchemaIn, BranchSchemaOut, HotelSchemaFilter, HotelSchemaIn, HotelSchemaOut
from ninja.errors import HttpError
from asgiref.sync import sync_to_async





logger = logging.getLogger(__name__)










async def add_new_hotel(payload: HotelSchemaIn, user_id: Optional[int] = None) -> HotelSchemaOut:
    try:
        data = payload.model_dump(exclude_unset=True)
        data["logo_id"] = data.pop("logo", None)

        async with transaction.atomic():
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

        async with transaction.atomic():
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
    










async def get_hotel_by_id(hotel_id: int, user_id: Optional[int] = None) -> HotelSchemaOut:
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








async def filter_hotel(filters: HotelSchemaFilter, user_id: Optional[int] = None) -> list[HotelSchemaOut]:
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








async def delete_hotel_by_id(hotel_id: int, user_id: Optional[int] = None) -> None:
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












async def add_new_hotel_branch(payload: BranchSchemaIn, user_id: Optional[int] = None) -> BranchSchemaOut:
    try:
        async with transaction.atomic():
            hotel = await Hotel.objects.aget(id=payload.hotel_id, owner_id=user_id)
            data = payload.model_dump(exclude_unset=True)
            data["hotel"] = hotel
            branch = await Branch.objects.acreate(**data)
            return branch
    
    except Hotel.DoesNotExist:
        raise HttpError(404, "Hotel not found or you don't have permission to add a branch to this hotel.")

    except IntegrityError as e:
        logger.error(f"IntegrityError while creating hotel branch: {e}", exc_info=True)
        if "unique" in str(e).lower() and "name" in str(e).lower():
            raise HttpError(400, "A branch with this name already exists for this hotel.")
        raise HttpError(400, "Invalid data or constraint violation.")

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error while creating branch: {e}", exc_info=True)
        raise HttpError(500, "Something went wrong while creating hotel branch.")








async def update_hotel_branch_by_id(branch_id: int, payload: BranchSchemaIn, user_id: Optional[int] = None) -> BranchSchemaOut:
    try:
        data = payload.model_dump(exclude_unset=True)
       
        data.pop("hotel_id", None)
        data = {k: v for k, v in data.items() if v is not None}

        async with transaction.atomic():
            branch = await Branch.objects.select_related("hotel").aget(id=branch_id, hotel__owner_id=user_id)

            for key, value in data.items():
                setattr(branch, key, value)

            await branch.asave()
            return branch

    except Branch.DoesNotExist:
        raise HttpError(404, "Branch not found or you don't have permission to update this branch.")

    except IntegrityError as e:
        logger.error(f"IntegrityError while updating hotel branch: {e}", exc_info=True)
        if "unique_branch_per_hotel" in str(e):
            raise HttpError(400, "A branch with this name already exists for this hotel.")
        raise HttpError(400, "Invalid data or constraint violation.")

    except HttpError:
        raise
    except Exception as e:
        logger.error(f"Error while updating branch: {e}", exc_info=True)
        raise HttpError(500, "Something went wrong while updating hotel branch.")











async def get_hotel_branch_by_id(branch_id: int, user_id: Optional[int] = None) -> BranchSchemaOut:
    try:
        filters = {"id": branch_id}
        if user_id is not None:
            filters["hotel__owner_id"] = user_id

        branch = await Branch.objects.aget(**filters)
        return branch

    except Branch.DoesNotExist:
        raise HttpError(status_code=404, message="Branch not found or you don't have permission to access it.")
    except Exception as e:
        logger.error(f"Unexpected error while fetching branch by ID: {e}", exc_info=True)
        raise HttpError(status_code=500, message="Something went wrong while fetching branch.")
