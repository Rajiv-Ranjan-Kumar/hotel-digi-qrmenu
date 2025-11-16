from decimal import Decimal
import re
from ninja.errors import HttpError






def validate_required(value: str, field_name: str="Field"):
    if value is None or (isinstance(value, str) and not value.strip()):
        raise HttpError(status_code=400, message=f"{field_name} is required.")
    
    return value







def validate_email(value: str, field_name: str="Email", is_required: bool=False):
    if is_required:
        validate_required(value, field_name=field_name)

    if value and not re.match(r"[^@]+@[^@]+\.[^@]+", value):
        raise HttpError(status_code=400, message=f"{field_name} is not a valid formate.")

    return value






def validate_string(value: str, field_name: str="Field", is_required: bool=False):
    if is_required:
        validate_required(value, field_name=field_name)
    if value and not isinstance(value, str):
        raise HttpError(status_code=400, message=f"{field_name} must be a string.")
    
    return value








def validate_number(value: int, field_name: str = "Field", is_required: bool = False):
    if is_required:
        validate_required(value, field_name=field_name)
    
    if not isinstance(value, int):
        raise HttpError(status_code=400, message=f"{field_name} must be a number integer")
    
    if value <= 0:
        raise HttpError(status_code=400, message=f"{field_name} must be a positive number")
    
    return value










def validate_decimal_number(value, field_name: str = "Field", is_required: bool = False, max_digits: int = 9, decimal_places: int = 6):
    if is_required:
        validate_required(value, field_name=field_name)

    try:
        decimal_value = Decimal(str(value))
    except:
        raise HttpError(status_code=400, message=f"{field_name} must be a valid decimal number")

    if decimal_value <= 0:
        raise HttpError(status_code=400, message=f"{field_name} must be a positive number")

    digits_str = str(decimal_value).replace("-", "").replace(".", "")
    
    if len(digits_str) > max_digits:
        raise HttpError(status_code=400, message=f"{field_name} must have max {max_digits} total digits")

    decimal_str = str(decimal_value).split(".")[1] if "." in str(decimal_value) else ""
    
    if len(decimal_str) > decimal_places:
        raise HttpError(status_code=400, message=f"{field_name} must have max {decimal_places} decimal places")

    return decimal_value









def validate_password(value: str, field_name: str="Password", is_required: bool=False):
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