# SortLab — Interactive Sorting Algorithm Visualizer

SortLab is an educational web application for exploring eight sorting algorithms through individual method pages and an interactive, step-by-step visual workbench. Python and Django handle page routing and delivery; HTML, CSS and JavaScript provide the interface and browser-side sorting traces.

## Features

- Persistent left sidebar navigation with responsive mobile behavior.
- Dedicated pages for Bubble, Selection, Insertion, Merge, Quick, Heap, Shell and Counting Sort.
- Each algorithm page includes theory, process steps, complexity, stability and an interactive trace.
- Workbench with custom input, random arrays, play, pause, step, reset, instant sort, counters and operation log.
- Separate complexity and algorithm comparison pages.
- Animated sorting illustration and adaptive cursor.
- Django health endpoint at `/health/`.

## Technology

- Python 3.12.8
- Django 5.2
- Gunicorn
- WhiteNoise
- HTML, CSS and JavaScript
- SQLite (default Django database)

**Architecture:** Django serves pages and static assets. Sorting traces and animations run in the browser. User-entered arrays and sorting results are not persisted.

## Project structure

```text
SortLab_Final/
├── manage.py
├── requirements.txt
├── render.yaml
├── Procfile
├── build.sh
├── .python-version
├── sortx_site/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── lab/
    ├── views.py
    ├── tests.py
    ├── templates/lab/
    └── static/lab/
        ├── css/style.css
        └── js/site.js
```

## Run locally (Windows)

Install Python 3.12.8, then open Command Prompt in the extracted project folder:

```cmd
py -3.12 -m venv .venv
.venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open `http://127.0.0.1:8000/`.

## Main routes

| Page | Route |
|---|---|
| Home | `/` |
| The Lab | `/lab/` |
| Algorithms | `/algorithms/` |
| Individual algorithm | `/algorithms/<slug>/` |
| Complexity | `/complexity/` |
| Compare | `/compare/` |
| About | `/about/` |
| Health check | `/health/` |

All sidebar navigation opens in the same browser tab. Algorithms expands to show its eight individual pages.

## Deploy to Render

The repository includes a Render Blueprint (`render.yaml`), `build.sh` and `Procfile`.

1. Push the **contents** of this project folder to the root of your GitHub repository. `manage.py`, `render.yaml`, `build.sh` and `requirements.txt` must be at the repository root.
2. In Render, choose **New → Blueprint** and connect the repository containing `render.yaml`.
3. Render reads the build and start commands from the Blueprint. The build command installs dependencies and runs `collectstatic`; the start command applies migrations and starts Gunicorn.
4. Confirm the environment variables include `DEBUG=False`, a generated `SECRET_KEY`, and `ALLOWED_HOSTS` containing `.onrender.com,localhost,127.0.0.1`.
5. After deployment, open `/health/`. Expected response:

```json
{"status": "ok", "application": "SortLab"}
```

Django exceptions are configured to be written to the Render runtime logs. Check those logs if a route returns HTTP 500.

### SQLite on Render

SQLite is used for Django's standard tables. Render's free service filesystem is ephemeral, so database contents can be lost when the service is replaced or redeployed. The current application does not save user arrays or results. Use managed PostgreSQL or a persistent disk if durable database data is added later.

## Checks

Run locally after installing dependencies:

```cmd
python manage.py check
python manage.py test
python manage.py collectstatic --noinput
```

The included tests cover the main routes, all eight algorithm detail routes, unknown algorithm handling and the health endpoint.

## Complexity reference

| Algorithm | Best | Average | Worst | Extra space |
|---|---:|---:|---:|---:|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) average |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Shell Sort | Gap-dependent | Gap-dependent | Gap-dependent | O(1) |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(n + k) |

Shell Sort complexity depends on its gap sequence. Counting Sort assumes a bounded integer range.

## Limitations

- No accounts or saved experiment history.
- Playback time is a visualization measure, not a controlled performance benchmark.
- Counting Sort is restricted to integer input and a bounded range.
