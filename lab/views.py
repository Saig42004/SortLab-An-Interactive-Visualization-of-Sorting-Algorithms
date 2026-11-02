from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET

ALGORITHMS = [
    {"slug":"bubble-sort", "id":"bubble", "name":"Bubble Sort", "short":"Repeatedly compares adjacent values and swaps them when they are out of order.", "theory":"Bubble Sort makes repeated passes through the array. During each pass, it compares neighbouring values and swaps a pair when the left value is larger. The largest unsorted value moves toward the end on every pass, so the sorted portion grows from right to left.", "best":"O(n)", "average":"O(n²)", "worst":"O(n²)", "space":"O(1)", "stable":"Yes", "steps":["Compare each adjacent pair from left to right.","Swap the pair when the left value is greater.","After a pass, the largest remaining value is fixed at the end.","Repeat until a complete pass makes no swaps."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
    {"slug":"selection-sort", "id":"selection", "name":"Selection Sort", "short":"Finds the smallest value in the unsorted region and places it next.", "theory":"Selection Sort divides the array into a sorted prefix and an unsorted suffix. It scans the unsorted suffix to find the minimum value, swaps that value into the first unsorted position, and repeats. The sorted prefix grows by one element per pass.", "best":"O(n²)", "average":"O(n²)", "worst":"O(n²)", "space":"O(1)", "stable":"No", "steps":["Start at the first unsorted position.","Scan the remaining values to find the minimum.","Swap the minimum into the first unsorted position.","Move the boundary forward and repeat."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
    {"slug":"insertion-sort", "id":"insertion", "name":"Insertion Sort", "short":"Builds a sorted prefix by shifting larger values to make room.", "theory":"Insertion Sort treats the first element as a sorted section. It takes the next value as a key, shifts larger values in the sorted section one position to the right, and inserts the key into the gap. This is repeated until the whole array is sorted.", "best":"O(n)", "average":"O(n²)", "worst":"O(n²)", "space":"O(1)", "stable":"Yes", "steps":["Treat the first value as a sorted prefix.","Pick the next value as the key.","Shift larger values one position to the right.","Insert the key into the correct gap."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
    {"slug":"merge-sort", "id":"merge", "name":"Merge Sort", "short":"Divides the array, sorts each half, and merges ordered runs.", "theory":"Merge Sort uses divide and conquer. It repeatedly splits the array into smaller halves until each part contains one element. It then merges pairs of sorted parts by repeatedly selecting the smaller front value, producing larger sorted sections until one sorted array remains.", "best":"O(n log n)", "average":"O(n log n)", "worst":"O(n log n)", "space":"O(n)", "stable":"Yes", "steps":["Divide the array into two halves.","Continue splitting until each part has one value.","Merge neighbouring parts in sorted order.","Continue merging until one sorted array remains."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
    {"slug":"quick-sort", "id":"quick", "name":"Quick Sort", "short":"Partitions values around a pivot and recursively sorts each side.", "theory":"Quick Sort selects a pivot and partitions the array so values smaller than or equal to the pivot move to one side and larger values move to the other. The pivot reaches its final position. The same process is then applied recursively to the left and right partitions.", "best":"O(n log n)", "average":"O(n log n)", "worst":"O(n²)", "space":"O(log n) average", "stable":"No", "steps":["Choose a pivot value.","Compare each value with the pivot.","Move smaller values to the left partition.","Place the pivot, then recursively sort both partitions."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
    {"slug":"heap-sort", "id":"heap", "name":"Heap Sort", "short":"Uses a max heap to repeatedly move the largest value into place.", "theory":"Heap Sort first rearranges the array into a max heap, where every parent is at least as large as its children. The root therefore contains the maximum value. It swaps the root with the last unsorted value, shrinks the heap, and restores the heap property until all values are placed.", "best":"O(n log n)", "average":"O(n log n)", "worst":"O(n log n)", "space":"O(1)", "stable":"No", "steps":["Build a max heap from the array.","Swap the maximum root with the last unsorted element.","Reduce the heap size by one.","Restore the max-heap property and repeat."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
    {"slug":"shell-sort", "id":"shell", "name":"Shell Sort", "short":"Uses shrinking gaps to move distant out-of-order values efficiently.", "theory":"Shell Sort generalizes insertion sort by comparing values that are a chosen gap apart. It sorts these gapped subsequences, then reduces the gap and repeats. As the gap approaches one, the array is already partly ordered, making the final insertion-sort pass more efficient. Complexity depends on the gap sequence.", "best":"Gap-dependent", "average":"Gap-dependent", "worst":"Gap-dependent", "space":"O(1)", "stable":"No", "steps":["Choose an initial gap, commonly half the array length.","Perform insertion-style shifts between values that far apart.","Reduce the gap and repeat the gapped passes.","Finish with a gap of one."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
    {"slug":"counting-sort", "id":"counting", "name":"Counting Sort", "short":"Counts bounded integer frequencies and reconstructs the sorted array.", "theory":"Counting Sort is a non-comparison sorting algorithm for integers in a bounded range. It creates a frequency array, counts how often each value occurs, and reconstructs the output in ascending order using those counts. Its performance depends on both the number of input elements and the value range.", "best":"O(n + k)", "average":"O(n + k)", "worst":"O(n + k)", "space":"O(n + k)", "stable":"Implementation-dependent", "steps":["Find the minimum and maximum values.","Create a frequency array for the value range.","Count each input value.","Write values back in ascending order using the frequencies."], "example":"[5, 1, 4, 2] → [1, 2, 4, 5]"},
]

def home(request):
    return render(request, "lab/home.html", {"algorithms": ALGORITHMS, "active": "home"})

def workbench(request):
    return render(request, "lab/workbench_page.html", {"algorithms": ALGORITHMS, "active": "lab"})

def algorithms_index(request):
    return render(request, "lab/algorithms.html", {"algorithms": ALGORITHMS, "active": "algorithms"})

def algorithm_detail(request, slug):
    algorithm = next((item for item in ALGORITHMS if item["slug"] == slug), None)
    if algorithm is None:
        from django.http import Http404
        raise Http404("Algorithm not found")
    return render(request, "lab/algorithm_detail.html", {"algorithm": algorithm, "algorithms": ALGORITHMS, "active": "algorithms"})

def complexity(request):
    return render(request, "lab/complexity.html", {"algorithms": ALGORITHMS, "active": "complexity"})

def compare(request):
    return render(request, "lab/compare.html", {"algorithms": ALGORITHMS, "active": "compare"})

def about(request):
    return render(request, "lab/about.html", {"algorithms": ALGORITHMS, "active": "about"})

@require_GET
def health(request):
    return JsonResponse({"status": "ok", "application": "SortLab"})
