# CSR Pulse Connect Backend

This is the backend for the CSR Pulse Connect application, built with Django and Django REST Framework.

## Setup Instructions

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create a superuser:
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver
```

## API Endpoints

- `/api/users/` - User management
- `/api/regions/` - Region management
- `/api/mous/` - MOU management
- `/api/projects/` - CSR Project management
- `/api/reports/` - Report management
- `/api/surveys/` - Survey management
- `/api/survey-questions/` - Survey Question management
- `/api/survey-responses/` - Survey Response management
- `/api/notifications/` - Notification management
- `/api/requests/` - Request management
- `/api/token/` - JWT token obtain
- `/api/token/refresh/` - JWT token refresh

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Database

This project uses SQLite3 as the database. The database file will be automatically created at `db.sqlite3` in the project root directory when you run migrations.

## Testing

Run tests with:
```bash
python manage.py test
``` 