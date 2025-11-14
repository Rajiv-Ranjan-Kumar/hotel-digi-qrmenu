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








class HotelSchemaOut(ModelSchema):
    logo: Optional[UserGallerySchemaOut] = None

    class Meta:
        model = Hotel
        fields = ["id", "name", "description", "logo", "created_at"]
