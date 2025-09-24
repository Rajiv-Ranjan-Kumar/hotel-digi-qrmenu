import re
from ninja.errors import HttpError
from django.apps import apps
from asgiref.sync import sync_to_async





def validate_required(value, field_name="Field"):
    if value is None or (isinstance(value, str) and not value.strip()):
        raise HttpError(status_code=400, message=f"{field_name} is required.")
    
    return value







def validate_email(value, field_name="Email", is_required=False):
    if is_required:
        validate_required(value, field_name=field_name)

    if value and not re.match(r"[^@]+@[^@]+\.[^@]+", value):
        raise HttpError(status_code=400, message=f"{field_name} is not a valid formate.")

    return value






def validate_string(value, field_name="Field", is_required=False):
    if is_required:
        validate_required(value, field_name=field_name)
    if value and not isinstance(value, str):
        raise HttpError(status_code=400, message=f"{field_name} must be a string.")
    
    return value








def validate_password(value: str, field_name="Password", is_required=False):
    if is_required:
        validate_required(value, field_name=field_name)

    if len(value) < 5:
        raise HttpError(status_code=400, message=f"{field_name} must be at least 5 characters")
    
    if not re.match(r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$', value):
        raise HttpError(status_code=400, message=f"{field_name} must have uppercase, lowercase, digit & special char")
    
    return value







def validate_passwords_match(password, confirm_password):
    if password != confirm_password:
        raise HttpError(status_code=400, message="Passwords do not match.")
    
    return True









async def validate_model_id(value, model_name, field_name="ID", is_required=False):
    if is_required and not value:
        raise HttpError(status_code=400, message=f"{field_name} is required.")

    if value is not None:
        if not isinstance(value, int) or value <= 0:
            raise HttpError(status_code=400, message=f"{field_name} must be a positive integer.")

        # Get model
        Model = None
        for app_config in apps.get_app_configs():
            try:
                Model = app_config.get_model(model_name)
                break
            except LookupError:
                continue

        if Model is None:
            raise HttpError(status_code=400, message=f"Model '{model_name}' does not exist.")

        # Wrap sync ORM call inside sync_to_async
        exists = await sync_to_async(Model.objects.filter(id=value).exists)()
        if not exists:
            raise HttpError(status_code=404, message=f"{field_name} with id {value} not found.")

    return value