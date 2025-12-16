from typing import Optional, List

from accounts.schemas import UserGallerySchemaOut
from hotels.models import Branch, Hotel
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
    hotel_id: int

    class Meta:
        model = Branch
        exclude = ["id", "is_active", "created_at", "hotel"]

    @model_validator(mode="after")
    def validate_all(self):
        validate_number(value=self.hotel_id, field_name="Hotel", is_required=True)
        validate_string(value=self.name, field_name="Branch Name", is_required=True)
        validate_string(value=self.address, field_name="Address", is_required=True)
        validate_string(value=self.country, field_name="Country", is_required=True)
        validate_string(value=self.state, field_name="State", is_required=True)
        validate_string(value=self.city, field_name="City", is_required=True)
        validate_number(value=int(self.pincode), field_name="Pincode", is_required=True)
        validate_decimal_number(value=self.latitude, field_name="Latitude", is_required=False)
        validate_decimal_number(value=self.longitude, field_name="Longitude", is_required=False)
        return self










class BranchSchemaOut(ModelSchema):
    class Meta:
        model = Branch
        fields = ["id", "hotel", "name", "address", "country", "state", "city", "pincode", "latitude", "longitude", "is_active", "created_at"]








class ManagerDashboardInitialDataSchemaOut(BaseModel):
    items: List[dict]
    count: int
