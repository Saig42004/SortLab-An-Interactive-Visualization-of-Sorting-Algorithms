# SortLab --- Interactive Sorting Algorithm Visualizer

SortLab is an educational web application that helps learners understand
sorting algorithms by showing how an array changes during execution.
Users can enter their own numbers, choose an algorithm, and either watch
the visualization play automatically or inspect it one operation at a
time.

The application uses **Django** to serve the website and **HTML, CSS,
and JavaScript** for the user interface and browser-based visualization.
The sorting logic runs in the browser; the current project does not
require a custom database model for sorting.

## Table of Contents

-   [Problem Statement](#problem-statement)
-   [Objectives](#objectives)
-   [Features](#features)
-   [Algorithms](#algorithms)
-   [Technology Stack](#technology-stack)
-   [Application Architecture](#application-architecture)
-   [Project Structure](#project-structure)
-   [Installation and Local Setup](#installation-and-local-setup)
-   [How to Use](#how-to-use)
-   [Complexity Reference](#complexity-reference)
-   [Design Decisions and
    Limitations](#design-decisions-and-limitations)
-   [Troubleshooting](#troubleshooting)
-   [Future Improvements](#future-improvements)

## Problem Statement

Sorting algorithms are often taught through pseudocode or examples that
show only the final sorted output. This can make it difficult for
learners to understand how comparisons, swaps, and insertions transform
an array. SortLab addresses this learning challenge by making algorithm
operations visible and interactive.

## Objectives

-   Visualize how common sorting algorithms arrange values in ascending
    order.
-   Allow users to test custom input arrays.
-   Support automatic playback and step-by-step inspection.
-   Display operation counters and algorithm complexity information.
-   Provide a browser-based learning tool served by Django.

## Features

### Custom input

-   Enter numbers separated by commas, spaces, or semicolons.
-   Supports integers, decimal values, negative numbers, and duplicates.
-   Supports up to 80 values.

### Controls

-   **Use these numbers:** load the entered values.
-   **Randomize:** generate a random array.
-   **Start:** play the operation sequence automatically.
-   **Step:** apply one operation at a time.
-   **Pause:** pause automatic playback.
-   **Reset:** restore the original array and prepare the selected
    algorithm again.
-   **Sort instantly:** display the final sorted array without animated
    playback.
-   **Copy result:** copy the current array when clipboard access is
    available.
-   **Animation speed:** adjust playback speed.

### Visualization and learning support

-   Animated bar visualization of array values.
-   Highlights for comparisons, swaps/writes, pivot selection, and
    sorted positions.
-   Activity log describing the current operation.
-   Counters for comparisons, moves/writes, and visualization
    operations.
-   Elapsed playback-time display.
-   Time and space complexity reference for supported algorithms.

## Algorithms

  ------------------------------------------------------------------------
  Algorithm   How it works    Average time Worst-case time   Typical extra
                                                                     space
  ----------- ------------ --------------- --------------- ---------------
  Bubble Sort Repeatedly             O(n²)           O(n²)            O(1)
              compares                                     
              adjacent                                     
              values and                                   
              swaps them                                   
              when out of                                  
              order.                                       

  Selection   Finds the              O(n²)           O(n²)            O(1)
  Sort        smallest                                     
              value in the                                 
              unsorted                                     
              section and                                  
              places it                                    
              next.                                        

  Insertion   Inserts each           O(n²)           O(n²)            O(1)
  Sort        value into                                   
              its correct                                  
              position in                                  
              the sorted                                   
              section.                                     

  Merge Sort  Divides the       O(n log n)      O(n log n)            O(n)
              array, sorts                                 
              the parts,                                   
              and merges                                   
              them.                                        

  Quick Sort  Partitions        O(n log n)           O(n²)        O(log n)
              around a                                       average; O(n)
              pivot and                                         worst case
              sorts the                                    
              resulting                                    
              sections.                                    
  ------------------------------------------------------------------------

These are standard theoretical complexities; actual behavior depends on
the implementation and input.

## Technology Stack

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  Python                              Runtime language for the Django
                                      application.

  Django                              Handles URL routing and renders the
                                      page template.

  HTML                                Defines the page structure and
                                      interface elements.

  CSS                                 Styles the layout, controls, and
                                      visualization.

  JavaScript                          Implements sorting operations,
                                      animation, user interactions, and
                                      statistics.

  Git and GitHub                      Version control and source-code
                                      hosting.
  -----------------------------------------------------------------------

## Application Architecture

1.  A browser requests the SortLab page.
2.  Django routes the request to the application view and renders the
    HTML template.
3.  The browser loads the page styling and JavaScript.
4.  The user enters an array and selects an algorithm.
5.  JavaScript prepares the visualization's operation sequence and
    updates the bars, activity log, and counters during playback.
6.  The user can reset the visualization or try another algorithm with
    the same input.

**Architecture note:** Django serves the page; sorting and animation
logic run in the browser. The current project does not save user arrays
or results to a database.

## Project Structure

The expected project layout is:

``` text
SortLab_Django/
├── manage.py
├── requirements.txt
├── README.md
├── .gitignore
├── sortlab_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── sortlab/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── views.py
    ├── urls.py
    ├── templates/
    │   └── sortlab/
    │       └── index.html
    └── static/
        └── sortlab/
            ├── css/
            │   └── style.css
            └── js/
                └── visualizer.js
```

### Important files

-   `manage.py` --- Django command-line entry point.
-   `requirements.txt` --- Python package dependencies.
-   `sortlab_project/settings.py` --- project configuration and
    installed apps.
-   `sortlab_project/urls.py` --- project-level URL routing.
-   `sortlab/views.py` --- handles the page request and renders the
    template.
-   `sortlab/urls.py` --- application-level URL patterns.
-   `sortlab/templates/sortlab/index.html` --- interface structure.
-   `sortlab/static/sortlab/css/style.css` --- visual styling.
-   `sortlab/static/sortlab/js/visualizer.js` --- sorting operations,
    animation, controls, and statistics.
-   `.gitignore` --- excludes local or generated files that should not
    be committed.

Adjust this tree if the actual repository uses a different layout.

## Installation and Local Setup

### Requirements

-   Python 3.10 or newer recommended.
-   A terminal such as Command Prompt, PowerShell, or VS Code terminal.
-   Internet access to install dependencies initially.
-   Git is optional if downloading the project as a ZIP.

### 1. Get the project

Clone the repository using its GitHub URL:

``` bash
git clone <your-repository-url>
cd SortLab_Django
```

Alternatively, download the repository as a ZIP and extract it. Continue
from the folder containing `manage.py`.

### 2. Create a virtual environment

**Windows:**

``` bash
python -m venv .venv
```

If `python` is not recognized, try `py -m venv .venv`.

**Linux:**

``` bash
python3 -m venv .venv
```

### 3. Activate the environment

**Windows --- Command Prompt:**

``` cmd
.venv\Scripts\activate.bat
```

**Windows --- PowerShell:**

``` powershell
.\.venv\Scripts\Activate.ps1
```

**Linux:**

``` bash
source .venv/bin/activate
```

The prompt usually displays `(.venv)` after activation.

### 4. Install dependencies

``` bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If `requirements.txt` is not present, a compatible Django version can be
installed as a fallback:

``` bash
python -m pip install "Django>=5.0,<6.0"
```

### 5. Apply migrations

``` bash
python manage.py migrate
```

This initializes the default tables for enabled Django apps. The sorting
workflow does not require a custom database model.

### 6. Start the development server

``` bash
python manage.py runserver
```

Open **http://127.0.0.1:8000/** in your browser. Keep the terminal open
while using the site. Press **Ctrl+C** to stop the server.

If port 8000 is busy, use:

``` bash
python manage.py runserver 8001
```

Then open **http://127.0.0.1:8001/**.

## How to Use

1.  Open the application in your browser.
2.  Enter an array, for example `42, 18, 63, 7, 31`.
3.  Click **Use these numbers**.
4.  Select one of the five sorting algorithms.
5.  Click **Step** to inspect individual operations or **Start** for
    automatic playback.
6.  Adjust the animation speed if needed.
7.  Observe the bar highlights, activity log, and counters.
8.  Reset and try another algorithm with the same input to compare its
    behavior.

## Understanding the Visualization

-   **Blue bars:** values not currently highlighted.
-   **Yellow bars:** values being compared.
-   **Pink bars:** values being swapped or written.
-   **Purple bars:** pivot selection in Quick Sort.
-   **Green bars:** positions marked as sorted.

The activity log describes the current operation, while counters update
as visualization operations are applied.

### Interpreting measurements

Comparison, move/write, and operation totals are counters tracked by the
visualizer. The elapsed-time display measures playback time; it is not a
controlled benchmark of actual algorithm execution speed. The visualizer
prepares an operation sequence so it can demonstrate the process step by
step.

## Complexity Reference

  Algorithm          Average time   Worst-case time                 Typical extra space
  ---------------- -------------- ----------------- -----------------------------------
  Bubble Sort               O(n²)             O(n²)                                O(1)
  Selection Sort            O(n²)             O(n²)                                O(1)
  Insertion Sort            O(n²)             O(n²)                                O(1)
  Merge Sort           O(n log n)        O(n log n)                                O(n)
  Quick Sort           O(n log n)             O(n²)   O(log n) average; O(n) worst case

## Design Decisions and Limitations

-   **Browser-side sorting:** JavaScript updates the visualization
    without sending each operation to the server.
-   **Django as the web layer:** Django serves the page and organizes
    URL routing; a custom database model is unnecessary for the current
    workflow.
-   **Learning-focused measurements:** animations and counters explain
    algorithm behavior rather than provide rigorous performance
    benchmarks.
-   **No saved user history:** arrays and results are not currently
    linked to user accounts or stored persistently.
-   **Input limit:** the visualizer accepts up to 80 values to keep the
    animation manageable.

## Troubleshooting

### `python: can't open file 'manage.py'`

Change to the project directory that contains `manage.py`.

### `ModuleNotFoundError: No module named 'django'`

Activate the virtual environment and run:

``` bash
python -m pip install -r requirements.txt
```

### Virtual environment activation fails

Check the activation path. Windows uses `.venv\Scripts\...`; Linux uses
`.venv/bin/activate`.

### Port 8000 is already in use

Run the server on another port:

``` bash
python manage.py runserver 8001
```

### CSS or JavaScript does not load

Confirm the files exist at the paths shown above and that the template
references them with Django's static-file tags. Check the browser
developer console and Django logs for errors.

## Future Improvements

-   Add side-by-side visualization for comparing algorithms on the same
    input.
-   Add Heap Sort, Counting Sort, and Radix Sort.
-   Compare theoretical complexity with observed operation counts.
-   Add downloadable sorting summaries and quiz questions.
-   Improve keyboard accessibility and add explanatory annotations.
-   Add automated tests for sorting correctness and interface behavior.

## Summary

SortLab demonstrates how sorting algorithms transform an array through
custom input, animated bars, step-by-step playback, an activity log,
operation counters, and complexity references. It combines a Django web
layer with browser-based JavaScript visualization to make algorithm
behavior easier to explore.

------------------------------------------------------------------------

**Project:** SortLab --- Interactive Sorting Algorithm Visualizer\
**Framework:** Django\
**Front end:** HTML, CSS, JavaScript\
**Purpose:** Learn and compare sorting algorithms through visualization
