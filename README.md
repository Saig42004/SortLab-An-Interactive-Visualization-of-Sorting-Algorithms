# SortLab --- Interactive Sorting Algorithm Visualizer

**Visualize the process. Understand the logic. Compare the algorithms.**

SortLab is an educational web application that makes sorting algorithms
easier to understand through interactive, step-by-step visualizations.
Users can work with input arrays, select a sorting algorithm, control
the visualization, and observe how values move toward their sorted
positions.

The application uses **Django** for server-side routing and page
rendering, and **HTML, CSS, and JavaScript** for the browser interface
and sorting visualizations. The sorting logic runs in the browser.

------------------------------------------------------------------------

## Table of Contents

-   [Project Overview](#project-overview)
-   [Problem Statement](#problem-statement)
-   [Objectives](#objectives)
-   [Features](#features)
-   [Supported Sorting Algorithms](#supported-sorting-algorithms)
-   [Time and Space Complexity](#time-and-space-complexity)
-   [Technology Stack](#technology-stack)
-   [Application Workflow](#application-workflow)
-   [Application Architecture](#application-architecture)
-   [Project Structure](#project-structure)
-   [Installation and Setup](#installation-and-setup)
-   [Run the Application](#run-the-application)
-   [How to Use SortLab](#how-to-use-sortlab)
-   [Understanding the Visualization and
    Metrics](#understanding-the-visualization-and-metrics)
-   [Design Decisions and
    Limitations](#design-decisions-and-limitations)
-   [Troubleshooting](#troubleshooting)
-   [Future Improvements](#future-improvements)
-   [Contributing](#contributing)
-   [License](#license)

------------------------------------------------------------------------

## Project Overview

Sorting is a fundamental concept in Data Structures and Algorithms.
Traditional explanations often focus on pseudocode or the final sorted
output. This can make it difficult for learners to understand the
sequence of comparisons, swaps, insertions, partitions, and merges that
occur during execution.

SortLab addresses this learning problem by turning algorithm execution
into an interactive visual experience. Instead of seeing only the final
answer, users can inspect the intermediate operations and understand how
the array changes.

## Problem Statement

Learners may understand the definition of a sorting algorithm but still
struggle to trace its execution on an actual array. Static examples do
not always make it clear which elements are compared, moved, selected,
or placed into their final positions.

SortLab provides a visual environment where users can control execution
and observe these operations. This helps connect algorithm theory with
practical behavior.

## Objectives

-   Demonstrate how sorting algorithms transform an unsorted array.
-   Allow users to experiment with custom input values.
-   Show algorithm execution through animated bars and operation
    highlights.
-   Support automatic playback and step-by-step inspection.
-   Present operation counters and theoretical complexity information.
-   Provide dedicated pages for algorithm explanations and reference
    material.
-   Demonstrate a web application built with Django and browser-side
    JavaScript.

## Features

### Interactive visualization

-   Enter a custom array of numbers.
-   Generate a random array for testing.
-   Select a sorting algorithm.
-   Start, pause, reset, or step through the visualization.
-   Adjust animation speed.
-   Display the final sorted result instantly when supported by the
    interface.

### Learning support

-   Animated bar representation of array values.
-   Highlights for values involved in comparisons and movements.
-   Algorithm-specific visual indicators, such as pivot selection in
    Quick Sort.
-   An operation/activity trace to explain the current step.
-   Counters for operations tracked by the visualizer.
-   Complexity reference information.

### Application pages

  -----------------------------------------------------------------------
  Page                                Purpose
  ----------------------------------- -----------------------------------
  Home                                Introduces SortLab and provides
                                      navigation into the application.

  Algorithms                          Lists the available sorting
                                      algorithms.

  Algorithm detail                    Explains an individual algorithm
                                      and presents its related
                                      visualization.

  The Lab / Workbench                 Provides the interactive sorting
                                      workspace.

  Complexity                          Displays algorithm complexity
                                      information.

  Compare                             Provides the algorithm comparison
                                      area.

  About                               Describes the project.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Supported Sorting Algorithms

SortLab includes these eight sorting algorithms:

1.  Bubble Sort
2.  Selection Sort
3.  Insertion Sort
4.  Merge Sort
5.  Quick Sort
6.  Heap Sort
7.  Shell Sort
8.  Counting Sort

## Time and Space Complexity

The table below summarizes the standard theoretical time and auxiliary-space complexity of the eight algorithms. These are theoretical references, not benchmark measurements produced by SortLab.

| Algorithm | Best Time | Average Time | Worst Time | Auxiliary Space |
|---|---:|---:|---:|---:|
| Bubble Sort* | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) average; O(n) worst |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) for an in-place implementation |
| Shell Sort*** | Depends on gap sequence | Depends on gap sequence | Depends on gap sequence | O(1) |
| Counting Sort**** | O(n + k) | O(n + k) | O(n + k) | O(n + k) |

**Notes**

- `n` is the number of elements in the input.
- `k` is the range of integer keys in Counting Sort.
- `*` Bubble Sort's best case is O(n) when the implementation stops early if a pass makes no swaps. Without that optimization, its best case is O(n²).
- `**` Quick Sort's auxiliary space depends on recursion depth and partition behavior.
- `***` Shell Sort's exact time complexity depends on the chosen gap sequence and implementation; there is no single universal bound for all variants.
- `****` Counting Sort assumes integer keys in a manageable range. Its complexity depends on both the number of elements and the key range.

---

## Technology Stack

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  Python                              Programming language used by the
                                      Django application.

  Django                              Handles URL routing, views,
                                      templates, and the server-side web
                                      layer.

  HTML                                Defines the structure of
                                      application pages.

  CSS                                 Controls layout, styling, and
                                      responsive presentation.

  JavaScript                          Implements sorting operations,
                                      animation, controls, and
                                      browser-side updates.

  Git                                 Tracks source-code changes.

  GitHub                              Hosts the project repository.
  -----------------------------------------------------------------------

## Application Workflow

1.  The user opens a SortLab page in a browser.
2.  Django receives the HTTP request.
3.  Django's URL configuration routes the request to the appropriate
    view.
4.  The view renders the required HTML template.
5.  The browser loads the page's CSS and JavaScript assets.
6.  The user enters or generates an array and selects an algorithm.
7.  JavaScript performs the sorting and updates the visualization.
8.  The user inspects the operations through playback controls,
    highlights, and counters.

## Application Architecture

``` text
                  USER
                    |
                    v
              WEB BROWSER
                    |
               HTTP Request
                    |
                    v
             DJANGO URL ROUTER
                    |
                    v
                DJANGO VIEW
                    |
                    v
              HTML TEMPLATE
                    |
          -----------------------
          |                     |
          v                     v
       CSS FILES           JAVASCRIPT
                                |
                                v
                       SORTING LOGIC
                                |
                ------------------------------
                |             |              |
                v             v              v
           BAR DISPLAY   OPERATION TRACE   COUNTERS
```

### Separation of responsibilities

-   **Django:** handles requests, URL routing, views, and template
    rendering.
-   **HTML:** provides the structure of each page.
-   **CSS:** controls the visual design and layout.
-   **JavaScript:** performs sorting operations and updates the
    visualization in the browser.

The browser performs the sorting visualization. The application does not
need to send every comparison or swap to Django.

------------------------------------------------------------------------

## Project Structure

The following tree reflects the Django project layout used by this
version of SortLab. It shows the actual application files and their
locations, rather than a generic Django example.

``` text
SortLab/
│
├── manage.py
├── requirements.txt
├── README.md
├── .gitignore
├── .python-version
├── render.yaml
├── build.sh
├── Procfile
│
├── sortx_site/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── lab/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── views.py
    │
    ├── templates/
    │   └── lab/
    │       ├── base.html
    │       ├── home.html
    │       ├── algorithms.html
    │       ├── algorithm_detail.html
    │       ├── workbench.html
    │       ├── workbench_page.html
    │       ├── complexity.html
    │       ├── compare.html
    │       └── about.html
    │
    └── static/
        └── lab/
            ├── css/
            │   └── style.css
            └── js/
                └── site.js
```

### What the important files do

  -----------------------------------------------------------------------
  File / Folder                       Description
  ----------------------------------- -----------------------------------
  `manage.py`                         Runs Django management commands.

  `requirements.txt`                  Lists the Python packages required
                                      by the project.

  `sortx_site/settings.py`            Contains Django settings, installed
                                      apps, middleware, templates,
                                      static-file configuration, and
                                      other project settings.

  `sortx_site/urls.py`                Defines the main URL routing
                                      configuration.

  `sortx_site/wsgi.py`                Exposes the WSGI application entry
                                      point.

  `sortx_site/asgi.py`                Exposes the ASGI application entry
                                      point.

  `lab/views.py`                      Contains view functions that handle
                                      application page requests.

  `lab/models.py`                     Contains Django model definitions.

  `lab/tests.py`                      Contains the Django application
                                      test module.

  `lab/templates/lab/`                Contains the HTML templates used by
                                      the application.

  `lab/static/lab/css/style.css`      Contains the application's styling.

  `lab/static/lab/js/site.js`         Contains browser-side interactions
                                      and visualization code.

  `render.yaml`, `build.sh`,          Supporting configuration files for
  `Procfile`                          the project's hosting environment;
                                      they are not needed to run the
                                      local development server.
  -----------------------------------------------------------------------

**Folder note:** `sortx_site` is the Django project configuration
package. `lab` is the Django application. Keep the folder names and
paths unchanged unless you also update the corresponding Django settings
and imports.

------------------------------------------------------------------------

## Installation and Setup

### Prerequisites

-   Python 3.10 or newer. Use the version specified in `.python-version`
    when setting up the same environment as the project.
-   Git, if cloning the repository.
-   A modern web browser.
-   Internet access for the initial installation of dependencies.

Check the installed tools:

**Windows --- Command Prompt or PowerShell**

``` cmd
python --version
git --version
```

If `python` is not recognized, try:

``` cmd
py --version
```

**Linux**

``` bash
python3 --version
git --version
```

### 1. Clone the repository

``` bash
git clone https://github.com/Saig42004/SortLab-An-Interactive-Visualization-of-Sorting-Algorithms.git
cd SortLab-An-Interactive-Visualization-of-Sorting-Algorithms
```

If you downloaded the project as a ZIP, extract it and open a terminal
in the directory containing `manage.py` and `requirements.txt`.

Check the current directory:

**Windows**

``` cmd
dir
```

**Linux**

``` bash
pwd
ls
```

Do not continue until you are in the project root and can see
`manage.py` and `requirements.txt`.

### 2. Create a virtual environment

**Windows**

``` cmd
python -m venv .venv
```

If required:

``` cmd
py -m venv .venv
```

**Linux**

``` bash
python3 -m venv .venv
```

### 3. Activate the virtual environment

**Windows --- Command Prompt**

``` cmd
.venv\Scripts\activate.bat
```

**Windows --- PowerShell**

``` powershell
.\.venv\Scripts\Activate.ps1
```

**Linux**

``` bash
source .venv/bin/activate
```

After activation, the terminal prompt normally displays `(.venv)`.

### 4. Install dependencies

Run from the project root with the virtual environment activated:

**Windows and Linux**

``` bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If Linux uses `python3` for the active environment, use:

``` bash
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
```

### 5. Apply database migrations

``` bash
python manage.py migrate
```

This applies migrations for the installed Django applications and
initializes the configured database.

### 6. Start the development server

``` bash
python manage.py runserver
```

Open the application:

``` text
http://127.0.0.1:8000/
```

Keep the terminal open while using SortLab. Press `Ctrl+C` to stop the
server.

If port `8000` is already in use:

``` bash
python manage.py runserver 8001
```

Then open:

``` text
http://127.0.0.1:8001/
```

### Deactivate the virtual environment

``` bash
deactivate
```

This command works in Windows and Linux terminals.

------------------------------------------------------------------------

## How to Use SortLab

1.  Start the Django development server.
2.  Open the application in your browser.
3.  Open **The Lab / Workbench** or choose an algorithm from the
    Algorithms section.
4.  Enter an array of values or use the randomize option.
5.  Load the input into the visualizer.
6.  Select the algorithm you want to study.
7.  Use the available controls to start, pause, reset, or step through
    operations.
8.  Observe the highlighted bars and the operation description.
9.  Review the counters as the visualization progresses.
10. Reset and test another algorithm using the same input.

For a fair learning comparison, use the same input array when exploring
multiple algorithms.

## Understanding the Visualization and Metrics

The visualizer uses bars to represent array values. Highlights identify
the elements involved in the current operation. The exact colors and
operation labels are defined by the front-end styling and JavaScript
implementation.

Common metrics include:

-   **Comparisons:** value comparisons tracked by the visualization.
-   **Moves / writes:** assignments or movements tracked by the
    implementation.
-   **Operations:** the visualization operations counted by the
    application.
-   **Elapsed playback time:** time associated with the animation or
    playback.

### Important measurement limitation

Playback time is not a controlled algorithm benchmark. It can include
animation delays, browser rendering, and other interface overhead.
Operation counters are educational indicators and should not
automatically be treated as exact counts of every primitive CPU
operation.

------------------------------------------------------------------------

## Design Decisions and Limitations

-   **Browser-side execution:** sorting and animation run in JavaScript
    in the browser; Django serves the web application.
-   **Django's role:** Django handles the server-side web layer rather
    than performing each sorting operation.
-   **Learning-oriented interface:** the main goal is to make algorithm
    behavior understandable.
-   **No assumed result persistence:** do not assume custom arrays or
    sorting results are stored between visits unless persistence is
    implemented separately.
-   **Complexity versus measurement:** theoretical complexity and
    visualizer counters describe different things. A counter or
    animation duration is not a substitute for formal complexity
    analysis.
-   **Input size:** large arrays can make detailed animation slower and
    harder to inspect. Follow the validation and limits shown by the
    running application.

## Troubleshooting

### Error: `python` is not recognized

On Windows, try:

``` cmd
py --version
py -m venv .venv
```

On Linux, check:

``` bash
python3 --version
```

### Error: `Could not open requirements file: requirements.txt`

The terminal is not in the directory containing `requirements.txt`.

**Windows**

``` cmd
dir
dir /s /b requirements.txt
```

**Linux**

``` bash
pwd
find . -name requirements.txt
```

Change into the project root directory and run the installation command
again.

### Error: `ModuleNotFoundError: No module named 'django'`

Activate the virtual environment and install dependencies:

``` bash
python -m pip install -r requirements.txt
```

### Error: `can't open file 'manage.py'`

You are running the command from the wrong directory. Change to the
folder containing `manage.py`.

### Port 8000 is already in use

``` bash
python manage.py runserver 8001
```

### CSS or JavaScript does not load

-   Confirm that the CSS and JavaScript files exist in
    `lab/static/lab/`.
-   Confirm that the templates reference static assets correctly.
-   Check the browser developer console for missing files or JavaScript
    errors.
-   Check the terminal running Django for server-side errors.

### A page returns an HTTP 500 error

Read the full traceback in the terminal running Django. The browser's
HTTP status alone does not identify the underlying Python exception.

------------------------------------------------------------------------

## Future Improvements

Possible extensions include:

-   Automated correctness tests for every sorting algorithm.
-   More detailed explanations for individual algorithm operations.
-   Side-by-side comparison using identical input arrays.
-   A separate benchmarking mode that measures algorithm execution
    without animation overhead.
-   Keyboard accessibility and improved reduced-motion support.
-   Downloadable operation summaries and learning exercises.
-   Additional algorithms and input scenarios.

These are proposed improvements and should not be interpreted as
features already implemented.

## Contributing

Contributions that improve algorithm correctness, usability,
accessibility, or educational value are welcome.

1.  Fork the repository.
2.  Create a branch for your change.
3.  Make a focused update.
4.  Run and test the application locally.
5.  Submit a pull request describing the change and the tests performed.

For sorting algorithm changes, test relevant edge cases such as empty
input, one element, duplicate values, already-sorted input,
reverse-sorted input, and negative values where supported.

## License

No license is declared in this README. Check the repository for a
`LICENSE` file before reusing, modifying, or redistributing the project.

------------------------------------------------------------------------

**Project:** SortLab --- Interactive Sorting Algorithm Visualizer\
**Backend:** Python, Django\
**Frontend:** HTML, CSS, JavaScript\
**Repository:** [GitHub ---
SortLab](https://github.com/Saig42004/SortLab-An-Interactive-Visualization-of-Sorting-Algorithms)\
**Purpose:** Learn sorting algorithms through interactive visualization.
