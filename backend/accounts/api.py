from typing import List, Optional
from ninja.pagination import paginate, PageNumberPagination
from coresettings.models import Role
from ninja import File, Form, Router
from ninja.files import UploadedFile
from validators.base import validate_email
from accounts.schemas import ChangePasswordSchema, LoginSchemaIn, LoginSchemaOut, OTPVerifySchema, UserGallerySchemaOut, UserInSchema
from utils.helper import authorize_request, secure, validate_model_id
from accounts.queries import (
    account_verify,
    add_new_user,
    authenticate_user,
    delete_user_gallery_image,
    fetch_user_gallery,
    generate_and_send_otp,
    set_new_password,
    upload_files
)




router = Router()






@router.post("/create-account", response={ 200: dict })
async def create_account(request, payload: UserInSchema):
    # print(payload)
    await validate_model_id(model = Role, value = payload.role_id, field_name="User role")
    await add_new_user(payload)
    return { "message": "Account created successfully" }








@router.post("/verify-account", response={200: dict})
async def verify_account(request, payload: OTPVerifySchema):
    await account_verify(payload)
    return {"message": "Account Verification Successfully."}






@router.post("/send-otp/{email}", response={200: dict})
async def send_otp(request, email: str):
    validate_email(value=email, field_name="Email", is_required=True)
    await generate_and_send_otp(email)
    return {"message": "OTP send Successfully."}








@router.post("/change-password", response={200: dict})
async def change_password(request, payload: ChangePasswordSchema):
    await set_new_password(payload)
    return {"message": "Password changed Successfully."}








@router.post("/login", response=LoginSchemaOut)
async def login_user(request, payload: LoginSchemaIn):
    user = await authenticate_user(payload)
    return user







# @router.post("/user-gallery", response=List[UserGallerySchemaOut], auth=secure())
# @authorize_request
# async def upload_user_gallery(request, files: File[List[UploadedFile]], user_id: Optional[int]=None):
#     created_objs = await upload_files(user_id=user_id, files=files)
#     return created_objs




@router.post("/user-gallery", response=List[UserGallerySchemaOut], auth=secure())
@authorize_request
async def upload_user_gallery(request, files: List[UploadedFile] = File(...), user_id: Optional[int] = None):
    created_objs = await upload_files(user_id=user_id, files=files)
    return created_objs






@router.get("/user-gallery", response=List[UserGallerySchemaOut], auth=secure())
@paginate(PageNumberPagination, page_size=10)
@authorize_request
async def get_user_gallery(request, user_id: Optional[int] = None):
    user_galleries = await fetch_user_gallery(user_id=user_id)
    return user_galleries







@router.delete("/user-gallery/{gallery_id}", response={200: dict}, auth=secure())
@authorize_request
async def delete_user_gallery(request, gallery_id: int, user_id: Optional[int] = None):
    await delete_user_gallery_image(gallery_id=gallery_id, user_id=user_id)
    return {"message": "Gallery image deleted successfully."}