# SortLab — Interactive Sorting Algorithm Visualizer

SortLab is an educational, browser-based application that helps learners understand how sorting algorithms rearrange an array. Users can enter their own values, choose a sorting method, and inspect the operations through animated playback or step-by-step execution. The project also provides algorithm complexity references and a side-by-side comparison workspace.

This version is a **static website** built with HTML, CSS, and JavaScript. It is designed to be hosted directly with GitHub Pages. It does not require Django, a Python backend, or a database.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Features](#features)
- [Algorithms](#algorithms)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Project Structure](#project-structure)
- [Installation and Local Setup](#installation-and-local-setup)
- [How to Use](#how-to-use)
- [Understanding the Visualization](#understanding-the-visualization)
- [Complexity Reference](#complexity-reference)
- [Design Decisions and Limitations](#design-decisions-and-limitations)
- [Deployment with GitHub Pages](#deployment-with-github-pages)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## Problem Statement

Sorting algorithms are commonly taught using pseudocode, static examples, or only the final sorted output. These approaches can make it difficult for learners to understand how comparisons, swaps, and writes change an array during execution. SortLab addresses this learning challenge by making the sorting process visible and interactive in a web browser.

## Objectives

- Visualize how common sorting algorithms arrange values in ascending order.
- Allow users to experiment with custom input arrays and randomly generated arrays.
- Support automatic playback and step-by-step inspection of sorting operations.
- Display operation traces and useful algorithm complexity information.
- Compare two sorting algorithms using the same input dataset.
- Provide a website that can be hosted as static files using GitHub Pages.

## Features

### Custom input

- Enter values separated by commas, spaces, or semicolons.
- Supports integer and decimal values, including negative values and duplicates where accepted by the input parser.
- Supports up to 80 values in the manual input field.
- Generate random arrays and adjust the random array size using the size control.

### Sorting controls

- **Apply values:** load the manually entered array.
- **Randomize:** generate a new random array.
- **Play:** run the selected algorithm's operation trace automatically.
- **Step:** advance through the trace one operation at a time.
- **Pause:** stop automatic playback.
- **Reset:** return to the starting array and reset the visualization.
- **Sort instantly:** show the final sorted result without animated playback.

### Visualization and learning support

- Animated bar visualization of the array.
- Visual highlights for comparisons, swaps/writes, and sorted positions.
- Operation trace that describes the steps performed by the selected algorithm.
- Counters and playback information to help inspect the run.
- Complexity reference showing time and auxiliary-space information.
- Side-by-side comparison of two selected algorithms using the same dataset.
- Separate project information page at `about.html`.
- Responsive layout for different screen sizes.

## Algorithms

SortLab includes the following eight sorting methods:

1. **Bubble Sort** — repeatedly compares adjacent values and swaps them when they are in the wrong order.
2. **Selection Sort** — finds the smallest value in the unsorted portion and places it in the next correct position.
3. **Insertion Sort** — inserts each value into its correct position within the already sorted portion.
4. **Merge Sort** — divides the array into smaller parts, sorts those parts, and merges them.
5. **Quick Sort** — partitions the array around a pivot and recursively sorts the resulting sections.
6. **Heap Sort** — uses a heap data structure to repeatedly select the next value for the sorted output.
7. **Shell Sort** — compares values at decreasing gaps until the array is sorted; its complexity depends on the chosen gap sequence.
8. **Counting Sort** — counts occurrences of integer values and uses those counts to construct the sorted result. It is suitable for a bounded integer range, not arbitrary decimal values.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Defines the website structure and interface elements. |
| CSS3 | Controls layout, styling, responsive behavior, and visualization appearance. |
| JavaScript (Vanilla) | Implements sorting operations, animation, user interactions, operation traces, and comparisons in the browser. |
| Git and GitHub | Version control and source-code hosting. |
| GitHub Pages | Publishes the static website. |

## Application Architecture

1. A visitor opens the SortLab website in a browser.
2. The browser loads `index.html`, the stylesheet, and the JavaScript file from the `assets` directory.
3. The visitor enters an array or generates random values and selects a sorting algorithm.
4. JavaScript performs the sorting workflow and prepares or updates the visualization operations in the browser.
5. The interface updates the bars, operation trace, playback state, and comparison information.
6. The visitor can reset the visualization or compare another algorithm using the same input.

**Architecture note:** GitHub Pages only serves the static website files. Sorting, animation, and comparison logic run on the visitor's device in JavaScript. This version does not send sorting operations to a backend and does not save user arrays or results to a database.

## Project Structure

The expected project layout is:

```text
SortLab/
├── index.html
├── about.html
├── .nojekyll
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── site.js
```

### Important files

- `index.html` — main page containing the sorting visualizer, algorithm information, complexity reference, and comparison section.
- `about.html` — separate page containing information about the project.
- `assets/css/style.css` — page layout, visual styling, responsive rules, and animation styles.
- `assets/js/site.js` — sorting algorithms, visualization behavior, controls, operation trace, and comparison logic.
- `.nojekyll` — tells GitHub Pages not to apply Jekyll processing to the published files.
- `README.md` — project documentation and setup instructions.

## Installation and Local Setup

### Requirements

- A modern web browser such as Chrome, Edge, Firefox, or Safari.
- Git is optional if downloading the project as a ZIP.
- No Python, Django, Node.js, package manager, or database is required to use the website.

### 1. Get the project

Clone the repository:

```bash
git clone https://github.com/Saig42004/SortLab-An-Interactive-Visualization-of-Sorting-Algorithms.git
cd SortLab-An-Interactive-Visualization-of-Sorting-Algorithms
```

Alternatively, download the repository as a ZIP file and extract it.

### 2. Open the website

Open `index.html` in a modern web browser. The main visualizer should load directly from the local files.

### 3. Optional: run a local web server

If you prefer to preview the site through a local HTTP server, run this command from the project root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser. This server is only for local preview; it is not required for GitHub Pages deployment.

## How to Use

1. Open the SortLab website.
2. Enter an array in the input field, for example `42, 18, 63, 7, 31, 55, 12, 84`, or generate a random array.
3. Apply the entered values if using custom input.
4. Select a sorting algorithm.
5. Use **Step** to inspect individual operations or **Play** to run the visualization automatically.
6. Use **Pause** to stop playback, **Reset** to restart, or **Sort instantly** to display the final sorted array.
7. Review the operation trace and complexity information.
8. Use the comparison section to run two algorithms against the same dataset and inspect their operation counts.

## Understanding the Visualization

The visualizer uses bar highlights and an operation trace to explain what is happening during a sorting run. The legend on the page identifies the visual states, including unsorted values, comparisons, swaps/writes, and sorted positions. The exact highlights shown depend on the selected algorithm and the current operation.

### Interpreting measurements

Operation counts are intended to help learners compare the work performed by the algorithms. The elapsed display relates to visualization playback and should not be treated as a controlled benchmark of algorithm execution speed. Browser performance, animation timing, input size, and implementation details can affect observed behavior.

## Complexity Reference

The following table gives standard theoretical complexity references. Shell Sort depends on its gap sequence. Counting Sort uses `k` to represent the range of integer keys.

| Algorithm | Average time | Worst-case time | Typical extra space |
|---|---:|---:|---:|
| Bubble Sort | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n²) | O(log n) average; O(n) worst case |
| Heap Sort | O(n log n) | O(n log n) | O(1) |
| Shell Sort | Gap-dependent | Gap-dependent | O(1) for the in-place implementation |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) |

These are theoretical references, not measured performance guarantees for every input or implementation. `n` is the number of elements; `k` is the integer key range used by Counting Sort.

## Design Decisions and Limitations

- **Static website:** the published version uses HTML, CSS, and browser-side JavaScript; it does not require a Django server.
- **Client-side processing:** sorting and visualization run in the browser. No server-side sorting API is used.
- **No persistent user data:** custom arrays and sorting results are not saved to a server or database.
- **Input size:** the manual input interface is designed for up to 80 values so the visualization remains manageable.
- **Counting Sort input:** Counting Sort is intended for integer values within its supported bounded range; it is not a general-purpose choice for decimal values or very large key ranges.
- **Complexity charts:** growth curves are illustrative and should not be interpreted as benchmark results.
- **External fonts:** Google Fonts may be requested from an external service; fallback fonts are used if the service is unavailable.
- **Browser compatibility:** use a reasonably up-to-date browser for the expected JavaScript and CSS behavior.

## Deployment with GitHub Pages

1. Ensure the static website files (`index.html`, `about.html`, `.nojekyll`, and the `assets` folder) are in the **root** of the GitHub repository.
2. Commit and push the files to the `main` branch.
3. Open the repository on GitHub and go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then click **Save**.
6. Open the **Actions** tab and wait for the Pages deployment workflow to complete successfully.
7. Open the published URL shown in **Settings → Pages**.

For this repository, the expected project-site address is:

`https://saig42004.github.io/SortLab-An-Interactive-Visualization-of-Sorting-Algorithms/`

The About page should be available at:

`https://saig42004.github.io/SortLab-An-Interactive-Visualization-of-Sorting-Algorithms/about.html`

These are the expected URLs; the site is not confirmed live until GitHub Pages reports a successful deployment. GitHub Pages serves static files and does not run Django, Python, Gunicorn, or server-side application code.

## Troubleshooting

### The GitHub Pages URL shows a 404 page

Confirm that `index.html` is in the repository root, GitHub Pages is configured to deploy from `main` and `/(root)`, and the Pages deployment workflow completed successfully.

### The page loads but styling or JavaScript is missing

Confirm that these files exist with the same names and capitalization:

- `assets/css/style.css`
- `assets/js/site.js`

Also confirm that `index.html` references the relative paths `assets/css/style.css` and `assets/js/site.js`.

### The About page link does not work

Confirm that `about.html` is in the same root directory as `index.html` and that the navigation link uses the relative path `about.html`.

### Changes do not appear after pushing

Check that the latest commit is on the branch selected in GitHub Pages. Review the **Actions** tab for deployment errors, then refresh the published page after the workflow succeeds. Browser caching may also delay visible updates.

## Future Improvements

- Add more sorting algorithms, such as Radix Sort, with clear input constraints.
- Add more detailed explanations of individual algorithm operations.
- Improve accessibility, keyboard navigation, and screen-reader descriptions.
- Add optional controls for selecting input distributions and testing edge cases.
- Add automated tests for sorting correctness and visualization state transitions.
- Improve comparison summaries while clearly separating operation counts from real execution-time benchmarks.

## Summary

SortLab is an interactive sorting algorithm learning tool. It combines custom array input, animated visualization, step-by-step playback, operation traces, complexity references, and side-by-side algorithm comparison. The current version is a static HTML, CSS, and JavaScript website that can be published using GitHub Pages without a Django backend.

---

**Project:** SortLab — Interactive Sorting Algorithm Visualizer  
**Front end:** HTML, CSS, JavaScript  
**Hosting:** GitHub Pages  
**Purpose:** Learn and compare sorting algorithms through visualization
