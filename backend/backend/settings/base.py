from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = config("SECRET_KEY", default="insecure-secret")

DEBUG = True

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="*", cast=lambda v: [s.strip() for s in v.split(",")])

INSTALLED_APPS = [
     "corsheaders",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    #custom apps
    "imagekit",
    'accounts',
    'coresettings',
    'hotels',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True
USE_TZ = True


STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


AUTH_USER_MODEL = "accounts.User"




# Redis Cache Configuration
UPSTASH_REDIS_REST_URL = config("UPSTASH_REDIS_REST_URL", default=None)
UPSTASH_REDIS_REST_TOKEN = config("UPSTASH_REDIS_REST_TOKEN", default=None)

if UPSTASH_REDIS_REST_TOKEN:
    REDIS_URL = f"rediss://default:{UPSTASH_REDIS_REST_TOKEN}@unbiased-hedgehog-32710.upstash.io:6379"
else:
    REDIS_URL = "redis://redis:6379/0"

    
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": REDIS_URL,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}


SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"

# Cache alias shortcut
CACHE_TTL = 60 * 100  # 10 minutes


# Channels Configuration
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [REDIS_URL],
        },
    },
}



# media settings
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"



# cloudinary settings
CLOUDINARY_NAME = config("CLOUDINARY_NAME")
CLOUDINARY_API_KEY = config("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = config("CLOUDINARY_API_SECRET")
CLOUDINARY_URL = config("CLOUDINARY_URL")

CLOUDINARY_BASE_URL = config("CLOUDINARY_BASE_URL")





# Agar sirf specific origin allow karna ho:
CORS_ALLOWED_ORIGINS = [
    "https://super-memory-p4wwwv9jwj939w6q-5173.app.github.dev",
    "http://localhost:5173"
]


# Agar sab allow karna ho (development ke liye):
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Optionally, allow all headers and methods
CORS_ALLOW_HEADERS = ["*"]  # Allow all headers
CORS_ALLOW_METHODS = ["*"]  # Allow all HTTP methods (GET, POST, PUT, etc.)
