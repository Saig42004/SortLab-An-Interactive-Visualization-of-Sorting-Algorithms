# SortLab — Interactive Sorting Algorithm Visualizer

SortLab is a static, browser-based learning tool for exploring eight sorting algorithms. It visualizes comparisons, swaps, writes, operation traces, playback controls, complexity references, and side-by-side algorithm comparisons.

## Live site

After enabling GitHub Pages, the project site URL will be:

`https://saig42004.github.io/SortLab-An-Interactive-Visualization-of-Sorting-Algorithms/`

## Features

- Eight algorithms: Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, and Counting Sort.
- Custom array input and random array generation.
- Play, pause, step, reset, and instant-sort controls.
- Comparison, write/swap, operation, and elapsed playback counters.
- Algorithm index, time/space complexity reference, and two-algorithm comparison.
- Separate About page at `about.html`.
- Responsive black-and-red interface with pointer effects and reduced-motion support.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages

## Project structure

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

## Run locally

No Python, Django, Node.js, or package installation is required.

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

For a local web-server preview, run this command from the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Push these static files to the repository's `main` branch.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**.
6. Click **Save**.
7. Check the **Actions** tab for the Pages deployment workflow. When it succeeds, open the URL shown in **Settings → Pages**.

GitHub Pages serves static files only. The previous Django backend is not used by this version.

## Notes and limitations

- Sorting, animation, and comparisons run in the visitor's browser.
- Custom arrays and results are not saved to a server or database.
- Counting Sort accepts integers only and limits the value range to 5,000.
- The elapsed display measures trace playback time, not a controlled performance benchmark.
- Google Fonts are loaded from an external service; fallback fonts are used if unavailable.

## Algorithms and complexity

| Algorithm | Average time | Worst time | Extra space |
|---|---:|---:|---:|
| Bubble Sort | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n²) | O(log n) average |
| Heap Sort | O(n log n) | O(n log n) | O(1) |
| Shell Sort | Gap-dependent | Gap-dependent | O(1) |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) |

`n` is the number of values; `k` is the integer value range for Counting Sort.
