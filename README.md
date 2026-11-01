# SortLab — Interactive Sorting Algorithm Visualizer

SortLab is an educational web application for exploring how sorting algorithms rearrange an array. It combines a Django website with a browser-based JavaScript visualization so users can inspect individual operations, watch sorting play automatically, and compare two algorithms on the same input.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Features](#features)
- [Supported Algorithms](#supported-algorithms)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [Installation and Local Setup](#installation-and-local-setup)
- [How to Use](#how-to-use)
- [Complexity Reference](#complexity-reference)
- [Design Decisions and Limitations](#design-decisions-and-limitations)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## Problem Statement

Sorting algorithms are easier to understand when learners can see how values move during execution. Pseudocode and final sorted output do not always make comparisons, swaps, shifts, partitioning, and merging intuitive. SortLab addresses this by showing the operations as an interactive visual trace.

## Objectives

- Demonstrate the working of common sorting algorithms.
- Allow users to enter custom arrays and generate random arrays.
- Show sorting through automatic playback and one-step-at-a-time controls.
- Display comparison, write/swap, operation, and elapsed-playback counters.
- Present time and space complexity references.
- Compare two algorithms using the same input values.

## Features

### Interactive sorting workbench

- Enter values separated by commas, spaces, or semicolons.
- Supports integers, decimal values, negative values, and duplicate values for algorithms that accept them.
- Accepts up to 80 values.
- Generate random arrays with a selectable size from 5 to 60.
- Select an algorithm from the workbench or the algorithm index.
- Adjust animation playback speed.

### Playback controls

- **Apply values:** load the custom input array.
- **Randomize:** generate a random array.
- **Play:** run the operation trace automatically.
- **Step:** apply the next operation.
- **Pause:** stop automatic playback.
- **Reset:** restore the original input and rebuild the trace.
- **Sort instantly:** apply the full trace and show the final sorted array.

### Visualization and learning support

- Animated bar visualization of array values.
- Visual highlights for comparisons, swaps/writes, pivots, and sorted positions.
- Operation trace describing the current action.
- Counters for comparisons, writes/swaps, and trace operations.
- Elapsed playback-time display.
- Algorithm index with short descriptions and stability labels.
- Compact complexity chart and complexity tables.

### Algorithm comparison

Choose two algorithms and run them against the same input. The comparison displays each algorithm's comparison count, write count, and number of trace events.

### Separate About page

The About page is available at `/about/`. The main navigation links to it, and the page provides a route back to the homepage and sorting workbench.

### Interface interactions

The interface includes pointer-based cursor effects, a cursor-following spotlight, hover interactions, card tilt, magnetic button movement, and scroll reveal effects. Pointer effects are disabled on coarse-pointer devices and when reduced motion is preferred.

## Supported Algorithms

| Algorithm | Main idea | Average time | Worst-case time | Extra space |
|---|---|---:|---:|---:|
| Bubble Sort | Repeatedly compares adjacent values and swaps them when out of order. | O(n²) | O(n²) | O(1) |
| Selection Sort | Finds the minimum value in the unsorted section and places it next. | O(n²) | O(n²) | O(1) |
| Insertion Sort | Inserts each value into its correct position in the sorted prefix. | O(n²) | O(n²) | O(1) |
| Merge Sort | Divides the array, sorts the parts, and merges them. | O(n log n) | O(n log n) | O(n) |
| Quick Sort | Partitions values around a pivot and sorts the resulting sections. | O(n log n) | O(n²) | O(log n) average; O(n) worst case |
| Heap Sort | Builds a max heap and repeatedly moves the maximum value to its final position. | O(n log n) | O(n log n) | O(1) |
| Shell Sort | Uses decreasing gaps to move out-of-order values. | Gap-dependent | Gap-dependent | O(1) |
| Counting Sort | Counts integer frequencies and reconstructs the sorted array. | O(n + k) | O(n + k) | O(n + k) |

Here, `n` is the number of input values and `k` is the integer value range used by Counting Sort. Shell Sort complexity depends on the gap sequence; this implementation uses halving gaps. Complexity values are theoretical references, not measured benchmark results.

## Technology Stack

| Technology | Purpose |
|---|---|
| Python | Runtime language for the Django application. |
| Django | Serves pages and handles URL routing. |
| HTML | Defines page structure and interface elements. |
| CSS | Controls layout, styling, responsive behavior, and visual effects. |
| JavaScript | Implements sorting traces, animation, controls, counters, and comparison. |
| SQLite | Default Django database used for standard Django setup; sorting inputs/results are not saved by the application. |
| Git and GitHub | Version control and source-code hosting. |

## Application Architecture

1. A browser requests the SortLab homepage.
2. Django routes the request through the `lab` application.
3. The Django view renders the relevant HTML template.
4. The browser loads the CSS and JavaScript static files.
5. JavaScript validates the input and prepares an operation trace for the selected algorithm.
6. The browser replays the trace and updates the bars, operation log, and counters.
7. For comparison, JavaScript prepares traces for two algorithms using the same input and displays their operation counts.

**Architecture note:** Django serves the website and its pages. Sorting logic, animation, and comparison run in the user's browser. The current application does not save custom arrays or sorting results to the database.

## Project Structure

The updated project uses this layout:

```text
SortLab/
├── manage.py
├── requirements.txt
├── README.md
├── .gitignore
├── build.sh
├── sortx_site/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── lab/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── views.py
    ├── urls.py
    ├── templates/
    │   └── lab/
    │       ├── index.html
    │       └── about.html
    └── static/
        └── lab/
            ├── css/
            │   └── style.css
            └── js/
                └── site.js
```

### Important files

- `manage.py` — Django command-line entry point.
- `requirements.txt` — Python dependencies.
- `sortx_site/settings.py` — Django settings and installed applications.
- `sortx_site/urls.py` — project-level URL routing.
- `sortx_site/wsgi.py` — WSGI entry point for compatible hosting services.
- `lab/views.py` — renders the homepage and About page.
- `lab/urls.py` — routes the homepage and `/about/` page.
- `lab/templates/lab/index.html` — main SortLab interface.
- `lab/templates/lab/about.html` — separate About page.
- `lab/static/lab/css/style.css` — site styling.
- `lab/static/lab/js/site.js` — sorting algorithms, trace playback, interface interactions, and comparison logic.
- `build.sh` — installs dependencies, collects static files, and runs database migrations for deployment builds.
- `.gitignore` — excludes local or generated files from version control.

## Installation and Local Setup

### Requirements

- Python 3.10 or newer recommended.
- Command Prompt, PowerShell, or VS Code terminal.
- Internet access to install Python dependencies.
- Git is optional if the project is downloaded as a ZIP.

### 1. Get the project

Clone the repository:

```bash
git clone https://github.com/Saig42004/SortLab-An-Interactive-Visualization-of-Sorting-Algorithms.git
cd SortLab-An-Interactive-Visualization-of-Sorting-Algorithms
```

Alternatively, download the repository as a ZIP and extract it. Run the following commands from the folder containing `manage.py`.

### 2. Create a virtual environment

**Windows:**

```bash
py -m venv .venv
```

If the `py` command is unavailable, try:

```bash
python -m venv .venv
```

**Linux/macOS:**

```bash
python3 -m venv .venv
```

### 3. Activate the environment

**Windows — Command Prompt:**

```cmd
.venv\Scripts\activate.bat
```

**Windows — PowerShell:**

```powershell
.\.venv\Scripts\Activate.ps1
```

**Linux/macOS:**

```bash
source .venv/bin/activate
```

The terminal prompt should show `(.venv)` after activation.

### 4. Install dependencies

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 5. Apply database migrations

```bash
python manage.py migrate
```

This initializes Django's default database tables. The sorting workflow itself does not require a custom database model.

### 6. Check the Django project

```bash
python manage.py check
```

### 7. Start the development server

```bash
python manage.py runserver
```

Open **http://127.0.0.1:8000/** in your browser.

The About page is available at **http://127.0.0.1:8000/about/**.

Keep the terminal open while using the website. Press `Ctrl+C` to stop the development server.

If port 8000 is already in use, run:

```bash
python manage.py runserver 8001
```

Then open **http://127.0.0.1:8001/**.

## How to Use

1. Open the homepage in your browser.
2. Scroll to the sorting workbench or select a method from the algorithm index.
3. Enter values such as `42, 18, 63, 7, 31`.
4. Click **Apply values**.
5. Select one of the eight sorting algorithms.
6. Click **Step** to inspect one operation or **Play** for automatic playback.
7. Use **Pause**, **Reset**, or **Sort instantly** as needed.
8. Observe the bar highlights, operation trace, and counters.
9. Open the comparison section, choose two algorithms, and run them on the same input.
10. Visit `/about/` to read about the project.

### Counting Sort input restriction

Counting Sort accepts integers only. It also rejects an input range greater than 5,000. If the selected algorithm is Counting Sort, use whole numbers within that range.

## Understanding the Visualization

- **Unsorted bars:** values not currently highlighted.
- **Compare highlight:** values involved in a comparison.
- **Swap/write highlight:** values being exchanged or written.
- **Pivot highlight:** pivot selected during Quick Sort.
- **Sorted highlight:** positions marked as complete.

The operation trace explains the current action. The counters record comparisons, writes/swaps, and trace events.

### Interpreting measurements

The elapsed display measures the time taken during trace playback, not a controlled benchmark of the algorithm's raw execution time. The comparison section reports counts derived from the generated operation traces. These counts help explain the visualized work; they should not be treated as hardware-independent performance benchmarks.

## Complexity Reference

| Algorithm | Average time | Worst-case time | Extra space |
|---|---:|---:|---:|
| Bubble Sort | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n²) | O(log n) average; O(n) worst case |
| Heap Sort | O(n log n) | O(n log n) | O(1) |
| Shell Sort | Gap-dependent | Gap-dependent | O(1) |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) |

## Design Decisions and Limitations

- **Browser-side processing:** sorting traces and animations run in JavaScript in the browser.
- **Django web layer:** Django serves the homepage and About page; it does not perform each sorting operation.
- **No saved user history:** custom arrays and results are not persisted or linked to user accounts.
- **Input size:** custom arrays are limited to 80 values to keep the visualization manageable.
- **Counting Sort:** accepts integers only and limits the value range to 5,000.
- **Shell Sort complexity:** depends on the gap sequence; the implementation uses a halving gap sequence.
- **Timing:** elapsed playback time includes visualization playback overhead and is not a rigorous algorithm benchmark.
- **External fonts:** the interface references Google Fonts, so those fonts may not load without an internet connection.

## Troubleshooting

### `python: can't open file 'manage.py'`

You are not in the project root. Change directory to the folder that contains `manage.py`, then run the command again.

### `ModuleNotFoundError: No module named 'django'`

Activate the virtual environment and install the dependencies:

```bash
python -m pip install -r requirements.txt
```

### Virtual environment activation fails

Check that you are using the correct command for your terminal. Command Prompt and PowerShell use different activation commands.

### Port 8000 is already in use

Start Django on another port:

```bash
python manage.py runserver 8001
```

### Static CSS or JavaScript does not load

Check that the files exist under `lab/static/lab/`. Confirm that the templates load static files with Django's `{% load static %}` and `{% static ... %}` tags. Inspect the browser developer console and terminal output for errors.

### Counting Sort rejects the input

Counting Sort requires whole-number values and rejects input whose maximum-minus-minimum range is greater than 5,000. Choose another algorithm for decimal values or a wider range.

## Future Improvements

- Add automated tests for sorting correctness and URL behavior.
- Add more algorithms, such as Radix Sort and Bucket Sort.
- Add accessibility improvements for keyboard navigation and screen readers.
- Add downloadable comparison summaries.
- Add educational quizzes and explanations for each algorithm.
- Add optional benchmark mode that measures algorithm execution separately from animation playback.
- Improve deployment documentation and configure a production hosting environment.

## Summary

SortLab is an interactive learning project that makes sorting operations visible through animated arrays, step-by-step playback, operation traces, counters, complexity references, and two-algorithm comparison. Django serves the web pages, while JavaScript performs the sorting visualization in the browser.

---

**Project:** SortLab — Interactive Sorting Algorithm Visualizer  
**Framework:** Django  
**Front end:** HTML, CSS, JavaScript  
**Algorithms:** Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, and Counting Sort  
**Purpose:** Understand sorting algorithms through interactive visualization
