# SortLab — Interactive Sorting Algorithm Visualizer

## 1. Project Overview

**SortLab** is an educational web application that helps students understand how sorting algorithms work. Instead of only seeing the final sorted list, users can watch values being compared, swapped, or written into new positions through an animated bar visualization.

The project combines a front-end interface built with **HTML, CSS, and JavaScript** with **Django**, which serves the website through a Python web server.

## 2. Project Objectives

- Demonstrate how common sorting algorithms arrange numbers in ascending order.
- Let users enter their own numbers and observe how the selected algorithm processes them.
- Provide step-by-step and automatic playback modes.
- Display useful statistics such as comparisons, moves/writes, operations, and elapsed time.
- Present algorithm time and space complexity for learning and comparison.

## 3. Main Features

### Custom input

Users can enter numbers separated by commas, spaces, or semicolons. The visualizer supports integers, decimal values, negative numbers, and duplicate values, with a maximum of 80 values.

### Five sorting algorithms

1. **Bubble Sort** — repeatedly compares neighboring values and swaps them when they are out of order.
2. **Selection Sort** — repeatedly finds the smallest value in the unsorted section and places it in the next position.
3. **Insertion Sort** — inserts each value into its correct position within the already ordered section.
4. **Merge Sort** — divides the array into smaller sections, sorts them, and merges the sections back together.
5. **Quick Sort** — partitions the array around a pivot and sorts the resulting sections.

### Visualization controls

- **Use these numbers:** loads the values typed by the user.
- **Randomize:** creates a random array.
- **Start:** plays the sorting operations automatically.
- **Step:** applies one operation at a time.
- **Pause:** stops automatic playback.
- **Reset:** returns to the original array and prepares the selected algorithm again.
- **Sort instantly:** shows the final sorted array without animated playback.
- **Copy result:** copies the current array when clipboard access is available; if it is unavailable, the result is placed in the input field for manual copying.
- **Animation speed:** changes the playback speed.

### Statistics and learning guide

The interface displays:

- **Comparisons:** comparisons performed between values.
- **Moves / writes:** array changes recorded by the visualizer.
- **Operations:** visualization events that have been applied.
- **Elapsed time:** time recorded by the visualizer during playback.

It also includes a complexity guide and an activity log describing the operations.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Defines the page structure and interface elements. |
| CSS | Styles the interface, bar chart, controls, layout, and responsive design. |
| JavaScript | Implements the sorting-operation sequences, animation, user interactions, and statistics. |
| Python | Runs the Django application. |
| Django | Maps the website URL to a view and renders the HTML template. |

**Important design note:** The sorting algorithms and their visualization logic run in the browser using JavaScript. Django serves the web page; this project does not require a custom database model for the sorting functionality.

## 5. Project Structure

The main project folder contains the following files:

```text
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

- `manage.py` — Django’s command-line utility for running project commands.
- `requirements.txt` — lists the Python package requirements.
- `sortlab_project/settings.py` — Django configuration, including installed apps and template settings.
- `sortlab_project/urls.py` — connects the root URL to the app’s URL configuration.
- `sortlab/views.py` — renders the `sortlab/index.html` template.
- `sortlab/urls.py` — defines URL patterns for the SortLab app.
- `sortlab/templates/sortlab/index.html` — contains the HTML structure of the interface.
- `sortlab/static/sortlab/css/style.css` — styles the interface and visualization.
- `sortlab/static/sortlab/js/visualizer.js` — implements sorting operations, animation, interactions, and statistics.
- `.gitignore` — prevents local and generated files such as `.venv/` from being committed to Git.

## 6. Installation and Setup

### Requirements

- Python 3.10 or newer is recommended.
- The extracted `SortLab_Django` project folder.
- A terminal such as Command Prompt, PowerShell, Linux Terminal, or the VS Code terminal.
- Internet access for the initial Django package installation.

### Step 1: Open the project folder

Open the project in VS Code, or open a terminal and change directory to the folder containing `manage.py`.

#### Windows — Command Prompt (CMD)

```cmd
cd path\to\SortLab_Django
dir
```

#### Windows — PowerShell

```powershell
Set-Location "path\to\SortLab_Django"
Get-ChildItem
```

#### Linux

```bash
cd /path/to/SortLab_Django
ls
```

Continue only when the listing shows `manage.py` in the current folder.

### Step 2: Create a virtual environment

#### Windows — CMD or PowerShell

```cmd
python -m venv .venv
```

If the `python` command is not recognized on Windows, try:

```cmd
py -m venv .venv
```

#### Linux

```bash
python3 -m venv .venv
```

If Linux reports that `venv` is unavailable, install the package for your Python version using your distribution's package manager. For example, on Ubuntu/Debian:

```bash
sudo apt update
sudo apt install python3-venv
```

### Step 3: Activate the virtual environment

#### Windows — Command Prompt (CMD)

```cmd
.venv\Scripts\activate.bat
```

#### Windows — PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks script activation, you can use Command Prompt instead. Alternatively, review your organization's security policy before changing PowerShell execution settings.

#### Linux

```bash
source .venv/bin/activate
```

When activation succeeds, the terminal prompt usually begins with `(.venv)`.

### Step 4: Install dependencies

With the virtual environment activated, run the appropriate command.

#### Windows

```cmd
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

#### Linux

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

If `requirements.txt` is unavailable, install Django directly:

```bash
python -m pip install "Django>=5.0,<6.0"
```

### Step 5: Apply Django migrations

This step initializes Django's default database tables if the built-in Django apps are enabled. SortLab does not need a custom database model for its sorting functionality.

#### Windows

```cmd
python manage.py migrate
```

#### Linux

```bash
python manage.py migrate
```

### Step 6: Start the development server

#### Windows

```cmd
python manage.py runserver
```

#### Linux

```bash
python manage.py runserver
```

Open the following address in your browser:

**http://127.0.0.1:8000/**

Keep the terminal open while using the website. Press **Ctrl + C** to stop the server.

### Optional: Use a different port

If port `8000` is already in use, run:

```bash
python manage.py runserver 8001
```

Then open **http://127.0.0.1:8001/**.

### Step 7: Deactivate the virtual environment

When you finish working, you can deactivate the environment.

#### Windows and Linux

```bash
deactivate
```

## 7. How to Use SortLab

1. Open `http://127.0.0.1:8000/`.
2. Enter a list such as `42, 18, 63, 7, 31`.
3. Click **Use these numbers**.
4. Select a sorting algorithm from the dropdown menu.
5. Click **Step** to inspect operations one at a time, or click **Start** for animated playback.
6. Adjust the speed slider if required.
7. Observe the highlighted bars, activity log, and statistics.
8. Try another algorithm with the same input to compare its behavior.
9. Use **Reset** to return to the original input before replaying the algorithm.

## 8. Understanding the Visualization

- **Blue bars:** values not currently highlighted.
- **Yellow bars:** values being compared.
- **Pink bars:** values being swapped or written.
- **Purple bars:** pivot selection in Quick Sort.
- **Green bars:** positions marked as sorted.

The activity log describes the current operation. The counters update as the visualizer applies operations.

**Note about measurements:** The displayed comparison, move/write, and operation counts are counts tracked by this visualizer. The elapsed time is playback time, not a formal benchmark of each algorithm’s real execution speed. The visualizer generates an operation sequence before playback so it can demonstrate the algorithm step by step.

## 9. Algorithm Complexity Reference

| Algorithm | Average Time Complexity | Worst-case Time Complexity | Typical Extra Space |
|---|---:|---:|---:|
| Bubble Sort | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n²) | O(log n) average, O(n) worst case |

Actual performance depends on the input data and implementation.

## 10. Troubleshooting

### `python: can't open file 'manage.py'`

The terminal is not in the folder containing `manage.py`. Run `dir` on Windows or `ls` on Linux, then change to the correct folder.

### `ModuleNotFoundError: No module named 'django'`

Activate the project's virtual environment and install dependencies:

```bash
python -m pip install -r requirements.txt
```

### Virtual environment activation says the path cannot be found

Check where `.venv` is located. Windows uses `.venv\Scripts\...`; Linux uses `.venv/bin/activate`.

### Linux says `python3: command not found`

Install Python 3 and the virtual environment package using your Linux distribution's package manager.

### Port 8000 is already in use

Stop the other server with **Ctrl + C**, or run:

```bash
python manage.py runserver 8001
```

Then visit **http://127.0.0.1:8001/**.

### Static CSS or JavaScript files do not load

Check that the CSS and JavaScript files exist at the paths shown in the project structure, and confirm that the template uses Django's static-file tags correctly. Review the terminal and browser developer console for errors.

## 11. Limitations and Future Improvements

### Current limitations

- The application is intended for learning and local demonstration.
- User-entered arrays are handled in the browser and are not saved to a user account or database.
- The elapsed display measures visualization playback rather than a controlled algorithm benchmark.
- The project does not currently include authentication or persistent data storage.

### Possible future improvements

- Add a side-by-side algorithm comparison mode.
- Add more sorting algorithms, such as Heap Sort, Counting Sort, and Radix Sort.
- Add a theoretical-versus-observed operation-count comparison.
- Add downloadable sorting reports and quiz questions.
- Improve keyboard accessibility and add more visualization explanations.

## 12. Conclusion

SortLab provides an interactive way to study five widely used sorting algorithms. By combining custom input, animated bars, step-by-step playback, an activity log, and complexity information, it helps learners connect algorithm logic with the changes made to an array. Django serves the application, while JavaScript handles the interactive sorting visualization in the browser.

---

**Project name:** SortLab — Interactive Sorting Algorithm Visualizer  
**Application framework:** Django  
**Front-end:** HTML, CSS, JavaScript  
**Supported setup instructions:** Windows and Linux  
**Run locally:** `python manage.py runserver`
