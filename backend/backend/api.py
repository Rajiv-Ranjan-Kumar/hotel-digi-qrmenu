from ninja import NinjaAPI
from accounts.api import router as accounts_router





api = NinjaAPI(
    title="Hotel Digi QR Menu API",
    version="1.0.0",
    description="API for Hotel Digi QR Menu",
    docs_url="/docs",
    openapi_url="/openapi.json"
)

# Add accounts router with tags
api.add_router("/accounts/", accounts_router, tags=["Accounts"])
