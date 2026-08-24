# QuickNotes

A project for keeping track of notes. Take notes for any occasion and organize them into collections.

Available API endpoints are defined in `urls.py`. Sample requests for exercising the API are in `api.http`.

This project was originally built using Django templates (see `quicknotes_site`), but that implementation is likely outdated in favor of the DRF API.

## Running the Project Locally

**1. Create and activate a virtual environment:**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**2. Install dependencies:**

```bash
pip install -r requirements.txt
```

**3. Set up environment variables:**

Copy `.env-example` to `.env` and fill in the values:

```bash
cp .env-example .env
```

**4. Set up the database:**

This project expects a Postgres database. A local instance can be launched via Docker, or adjust `settings.py` to point at a different database backend/connection if preferred.

Once your database is configured, run migrations:

```bash
python manage.py migrate
```

**5. Start the development server:**

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.