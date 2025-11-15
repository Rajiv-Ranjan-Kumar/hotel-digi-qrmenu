from typing import Optional
from accounts.schemas import UserGallerySchemaOut
from hotels.models import Hotel
from utils.schema_config import *



class HotelSchemaIn(ModelSchema):
    class Meta:
        model = Hotel
        exclude = ["id","owner","created_at"]
        
    @model_validator(mode="after")
    def validate_all(self):
        validate_number(value=self.logo, field_name="Logo", is_required=False)
        validate_string(value=self.name, field_name="Hotel Name", is_required=True)
        validate_string(value=self.description, field_name="Description", is_required=False)
        
        return self








class HotelSchemaFilter(ModelSchema):
    name: Optional[str] = None

    class Meta:
        model = Hotel
        fields = ["name"]
    
    @model_validator(mode="after")
    def validate_all(self):
        validate_string(value=self.name, field_name="Hotel Name")
        
        return self









class HotelSchemaOut(ModelSchema):
    logo: Optional[UserGallerySchemaOut] = None

    class Meta:
        model = Hotel
        fields = ["id", "name", "description", "logo", "created_at"]







class BranchSchemaIn(ModelSchema):
    class Meta:
        model = Hotel
        exclude = ["id","hotel","is_active","created_at"]
        
    @model_validator(mode="after")
    def validate_all(self):
        validate_string(value=self.name, field_name="Branch Name", is_required=True)
        validate_string(value=self.address, field_name="Address", is_required=True)
        validate_string(value=self.country, field_name="Country", is_required=True)
        validate_string(value=self.state, field_name="State", is_required=True)
        validate_string(value=self.city, field_name="City", is_required=True)
        validate_email(value=self.pincode, field_name="Pincode", is_required=True)
        validate_number(value=self.latitude, field_name="Latitude", is_required=False)
        validate_number(value=self.longitude, field_name="Longitude", is_required=False)
        
        return self










class BranchSchemaOut(ModelSchema):
    class Meta:
        model = Hotel
        fields = "__all__"