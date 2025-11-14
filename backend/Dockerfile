FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create media folders for UserGallery
RUN mkdir -p /app/media/user_gallery/originals \
    && mkdir -p /app/media/user_gallery/thumbnails \
    && chmod -R 775 /app/media

# Apply migrations, sync API paths, and start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py api_access && python manage.py runserver 0.0.0.0:8000"]
