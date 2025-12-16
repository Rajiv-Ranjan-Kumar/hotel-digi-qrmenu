from accounts.models import UserGallery
from utils.schema_config import *






class UserInSchema(Schema):
    email: str
    first_name: str
    last_name: str
    password: str
    confirm_password: str
    role_id: int

    @model_validator(mode="after")
    def validate_all(self):
        validate_email(value=self.email, field_name="Email", is_required=True)
        validate_string(value=self.first_name, field_name="First name", is_required=True)
        validate_string(value=self.last_name, field_name="Last name", is_required=True)
        validate_password(value=self.password, field_name="Password", is_required=True)
        validate_passwords_match(password=self.password, confirm_password=self.confirm_password)
        validate_number(value=self.role_id, field_name="Role ID", is_required=True)
        
        return self








class OTPVerifySchema(Schema):
    email: str
    otp: int

    @model_validator(mode="after")
    def validate_all(self):
        validate_email(value=self.email, field_name="Email", is_required=True)
        validate_number(value=self.otp, field_name="OTP", is_required=True)
        
        return self








class ChangePasswordSchema(Schema):
    email: str
    otp: int
    password: str
    confirm_password: str

    @model_validator(mode="after")
    def validate_all(self):
        validate_email(value=self.email, field_name="Email", is_required=True)
        validate_number(value=self.otp, field_name="OTP", is_required=True)
        validate_password(value=self.password, field_name="Password", is_required=True)
        validate_passwords_match(password=self.password, confirm_password=self.confirm_password)
        
        return self








class LoginSchemaIn(Schema):
    email: str
    password: str







class ProfileSchemaOut(Schema):
    id: int
    first_name: str
    last_name: str
    email: str
    role: str





class LoginSchemaOut(Schema):
    access_token: str
    is_authenticated: bool
    profile: ProfileSchemaOut










class UserGallerySchemaOut(ModelSchema):
    class Meta:
        model = UserGallery
        exclude = ["image_file"]