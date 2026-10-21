# SortLab Django — Interactive Sorting Algorithm Visualizer

## Project purpose
SortLab is an educational website that lets users enter numbers and visualize sorting algorithms step by step. It includes playback controls, an activity log, operation counters, and algorithm complexity information.

## Source code is separated by language
- **HTML:** `sortlab/templates/sortlab/index.html` — page structure and controls.
- **CSS:** `sortlab/static/sortlab/css/style.css` — visual design and responsive layout.
- **JavaScript:** `sortlab/static/sortlab/js/visualizer.js` — sorting algorithms, animation, input handling, and counters.
- **Python/Django:** `manage.py`, `sortlab/views.py`, `sortlab/urls.py`, and `sortlab_project/` — web server and URL/view configuration.

The sorting visualization runs in JavaScript in the browser. Django serves the HTML template. User-entered arrays are not stored in a database.

## Project structure
```text
SortLab_Django/
├── manage.py
├── requirements.txt
├── README.md
├── .gitignore
├── sortlab_project/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── sortlab/
    ├── views.py
    ├── urls.py
    ├── templates/sortlab/index.html
    └── static/sortlab/
        ├── css/style.css
        └── js/visualizer.js
```

## Run on Windows
Open a terminal in the folder containing `manage.py`.

### Command Prompt (CMD)
```cmd
python -m venv .venv
.venv\Scripts\activate.bat
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### PowerShell
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open http://127.0.0.1:8000/. Keep the terminal open during the demo and press Ctrl+C to stop the server.

## Algorithms
Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.

## Complexity reference
| Algorithm | Average time | Typical extra space |
|---|---|---|
| Bubble Sort | O(n²) | O(1) |
| Selection Sort | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(log n) average; O(n²) worst-case time |

Displayed elapsed time is playback time, not a formal benchmark.
