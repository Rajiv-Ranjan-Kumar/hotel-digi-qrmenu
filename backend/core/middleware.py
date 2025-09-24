from django.utils.deprecation import MiddlewareMixin
from accounts.models import ApiAccess
from ninja.errors import HttpError



class ApiAccessMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        if not request.user.is_authenticated:
            return None

        path = request.path
        method = request.method.lower()

        api_access, created = ApiAccess.objects.get_or_create(path=path)

        if created:
            raise HttpError(status_code=403, message="Access denied this endpoint")

        user_roles = request.user.roles.all()

        access_entry = ApiAccess.objects.filter(id=api_access.id, roles__in=user_roles).first()

        if not access_entry:
           raise HttpError(status_code=403, message="Access denied for your role")
        
        method_field = f"can_{method}"
        if not getattr(access_entry, method_field, False):
            raise HttpError(status_code=403, message=f"Method {method.upper()} not allowed for this role")
            

        return None
