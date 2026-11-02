# SortLab — Interactive Sorting Algorithm Visualizer

SortLab is an educational web application for exploring eight sorting algorithms through individual method pages and an interactive, step-by-step visual workbench. The application uses **Python and Django** for page routing and delivery, with **HTML, CSS and JavaScript** for the interface and browser-side sorting traces.

## Features

- Persistent left sidebar navigation inspired by a compact workspace layout.
- Dedicated pages for Bubble, Selection, Insertion, Merge, Quick, Heap, Shell and Counting Sort.
- Each algorithm page includes a short theory section, process steps, best/average/worst time complexity, space complexity, stability and its own preselected workbench.
- Interactive workbench: custom input, random arrays, play, pause, step, reset, instant sort, operation log, counters and complexity reference.
- Separate complexity and algorithm comparison pages.
- Animated hero sorting illustration and adaptive red/white custom cursor.
- Responsive layout for desktop, tablet and mobile.
- Django health endpoint at `/health/` for deployment checks.

## Technology stack

| Technology | Role |
|---|---|
| Python | Application runtime |
| Django | URL routing, views, templates and admin integration |
| HTML | Page structure |
| CSS | Responsive layout and visual styling |
| JavaScript | Sorting trace generation, playback and comparisons |
| SQLite | Default Django database configuration |
| Gunicorn | Production WSGI server |
| WhiteNoise | Production static-file serving |

**Architecture note:** Django serves the pages and static assets. Sorting trace generation and animation run in the browser. The current project does not persist user-entered arrays or sorting results in the database.

## Project structure

```text
SortLab_Final/
├── manage.py
├── requirements.txt
├── render.yaml
├── Procfile
├── build.sh
├── .python-version
├── README.md
├── sortx_site/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── lab/
    ├── views.py
    ├── tests.py
    ├── templates/lab/
    │   ├── base.html
    │   ├── home.html
    │   ├── workbench.html
    │   ├── workbench_page.html
    │   ├── algorithms.html
    │   ├── algorithm_detail.html
    │   ├── complexity.html
    │   ├── compare.html
    │   └── about.html
    └── static/lab/
        ├── css/style.css
        └── js/site.js
```

## Local setup (Windows)

1. Install Python 3.12 or newer in the 3.12 series and open Command Prompt in the extracted project folder.
2. Create and activate a virtual environment:

```cmd
py -3.12 -m venv .venv
.venv\Scripts\activate
```

3. Install dependencies:

```cmd
python -m pip install --upgrade pip
pip install -r requirements.txt
```

4. Run database migrations and start Django:

```cmd
python manage.py migrate
python manage.py runserver
```

5. Open `http://127.0.0.1:8000/`. Press `Ctrl+C` to stop the server.

## Main routes

| Page | Route |
|---|---|
| Home | `/` |
| The Lab | `/lab/` |
| Algorithm index | `/algorithms/` |
| Individual algorithm | `/algorithms/<slug>/` |
| Complexity | `/complexity/` |
| Compare | `/compare/` |
| About | `/about/` |
| Health check | `/health/` |

All sidebar navigation opens the selected page in the **same browser tab**. The Algorithms item expands to show its eight individual pages.

## Using the workbench

1. Enter numbers separated by commas, spaces or semicolons (up to 80 values).
2. Select an algorithm. Counting Sort accepts integers only and limits the range to 5,000.
3. Use Play to animate the trace, Step to advance one operation, Pause to stop playback, Reset to restore the input, or Sort instantly to complete the trace.
4. Review comparisons, writes/swaps, operations, elapsed playback time and the operation log.

The elapsed value measures visualization playback time, not a controlled algorithm benchmark.

## Deploy to Render

This repository includes `render.yaml`, `build.sh` and a `Procfile` for Render.

1. Push the complete project folder to a GitHub repository.
2. In Render, choose **New → Blueprint** and connect that repository, or create a Python web service manually.
3. If creating manually, use:
   - **Build command:** `./build.sh`
   - **Start command:** `python manage.py migrate --noinput && gunicorn sortx_site.wsgi:application --bind 0.0.0.0:$PORT`
4. Set `SECRET_KEY` to a long random secret and `DEBUG=False`. The Blueprint can generate a secret automatically.
5. Deploy and check `https://YOUR-SERVICE.onrender.com/health/`; it should return `{"status":"ok","application":"SortLab"}`.

`DEBUG` defaults to `True` for local development; the Render Blueprint explicitly sets it to `False`. `ALLOWED_HOSTS` is configured to include the Render hostname through `RENDER_EXTERNAL_HOSTNAME` and the provided environment variable. WhiteNoise serves collected static assets.

### SQLite note for Render

SQLite is configured as requested. On Render's standard ephemeral filesystem, database files can be lost when an instance is replaced or redeployed. This project currently does not store user arrays/results, so its database is only used for Django's standard tables. If persistent user data is added later, use a managed PostgreSQL database or attach a persistent disk and configure SQLite to use it.

## Tests and checks

Run Django checks and tests locally:

```bash
python manage.py check
python manage.py test
python manage.py collectstatic --noinput
```

The included tests verify the main routes, all eight algorithm detail routes, unknown algorithm 404 handling and the health endpoint.

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

Bubble and Insertion Sort have O(n) best cases with early-exit/already-sorted input behavior in the corresponding implementation. Shell Sort depends on its gap sequence. Counting Sort assumes a bounded integer range.

## Limitations and future improvements

- No accounts or saved experiment history.
- Browser-side trace generation is intended for learning, not formal performance benchmarking.
- Counting Sort is restricted to integer input and a bounded range.
- A future version could add saved experiments, downloadable reports, quizzes and accessibility refinements.

---

**Project:** SortLab — Interactive Sorting Algorithm Visualizer  
**Backend:** Python / Django  
**Frontend:** HTML / CSS / JavaScript  
**Deployment:** Render
