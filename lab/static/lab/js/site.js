(() => {
  "use strict";

  /* =========================================================
   * Helpers & environment
   * ========================================================= */
  const $ = id => document.getElementById(id);
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  /* =========================================================
   * Cursor tracking
   * Local-only pointer coordinates, smooth interpolation, no analytics.
   * ========================================================= */
  if (!coarse && !prefersReduced) {
    const core = document.querySelector(".cursor-core");
    const halo = document.querySelector(".cursor-halo");

    if (core && halo) {
      let x = innerWidth / 2;
      let y = innerHeight / 2;
      let hx = x;
      let hy = y;
      let visible = false;

      addEventListener(
        "pointermove",
        e => {
          x = e.clientX;
          y = e.clientY;
          visible = true;
          document.documentElement.style.setProperty("--mx", `${x}px`);
          document.documentElement.style.setProperty("--my", `${y}px`);
          core.style.opacity = "1";
          halo.style.opacity = "1";
        },
        { passive: true }
      );

      addEventListener("pointerleave", () => {
        core.style.opacity = "0";
        halo.style.opacity = "0";
      });

      const tick = () => {
        hx += (x - hx) * 0.16;
        hy += (y - hy) * 0.16;
        core.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
        halo.style.transform = `translate3d(${hx}px,${hy}px,0) translate(-50%,-50%)`;
        requestAnimationFrame(tick);
      };
      tick();

      // Hover state for the halo
      document.querySelectorAll("a,button,.method-card,select").forEach(el => {
        el.addEventListener("pointerenter", () => halo.classList.add("hovering"));
        el.addEventListener("pointerleave", () => halo.classList.remove("hovering"));
      });

      // Magnetic buttons (small, bounded movement)
      document.querySelectorAll(".magnetic").forEach(el => {
        el.addEventListener("pointermove", e => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${dx * 0.1}px,${dy * 0.12}px)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "translate(0,0)";
        });
      });

      // Pointer-reactive tilt for the hero visualization
      document.querySelectorAll("[data-tilt]").forEach(el => {
        el.addEventListener("pointermove", e => {
          const r = el.getBoundingClientRect();
          const rx = (e.clientY - r.top) / r.height - 0.5;
          const ry = (e.clientX - r.left) / r.width - 0.5;
          el.style.transform = `perspective(900px) rotateX(${-rx * 4}deg) rotateY(${ry * 5}deg)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
        });
      });
    }
  }

  /* =========================================================
   * Reveal sections as they enter the viewport
   * ========================================================= */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReduced) {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("visible"));
  }

  /* =========================================================
   * Hero parallax (pointer devices only)
   * ========================================================= */
  if (!coarse && !prefersReduced) {
    const hero = document.querySelector(".hero");

    if (hero) {
      hero.addEventListener(
        "pointermove",
        e => {
          const r = hero.getBoundingClientRect();
          const dx = (e.clientX - r.left) / r.width - 0.5;
          const dy = (e.clientY - r.top) / r.height - 0.5;

          document.querySelectorAll(".hero-orb").forEach((o, i) => {
            o.style.transform = `translate(${dx * (i ? -15 : 20)}px,${dy * (i ? -10 : 15)}px)`;
          });
        },
        { passive: true }
      );
    }
  }

  /* =========================================================
   * Cursor colour switch over the signal-red closing panel
   * ========================================================= */
  if (!coarse && !prefersReduced) {
    const core = document.querySelector(".cursor-core");
    const halo = document.querySelector(".cursor-halo");

    if (core && halo) {
      document.addEventListener(
        "pointermove",
        e => {
          const red = e.target.closest('[data-cursor="light"]');
          document.body.classList.toggle("cursor-on-red", !!red);
        },
        { passive: true }
      );
    }
  }

  /* =========================================================
   * Algorithm catalogue
   * ========================================================= */
  const algos = [
    {
      id: "bubble",
      name: "Bubble Sort",
      avg: "O(n²)",
      space: "O(1)",
      stable: true,
      desc: "Compares adjacent values and moves larger values toward the end.",
      color: "#c7f36b",
    },
    {
      id: "selection",
      name: "Selection Sort",
      avg: "O(n²)",
      space: "O(1)",
      stable: false,
      desc: "Finds the minimum value in the unsorted region and places it next.",
      color: "#8ce9e3",
    },
    {
      id: "insertion",
      name: "Insertion Sort",
      avg: "O(n²)",
      space: "O(1)",
      stable: true,
      desc: "Builds a sorted prefix by shifting larger values to make room.",
      color: "#e2a18a",
    },
    {
      id: "merge",
      name: "Merge Sort",
      avg: "O(n log n)",
      space: "O(n)",
      stable: true,
      desc: "Divides the array, sorts each half, and merges ordered runs.",
      color: "#a7a0ed",
    },
    {
      id: "quick",
      name: "Quick Sort",
      avg: "O(n log n)",
      space: "O(log n) avg.",
      stable: false,
      desc: "Partitions values around a pivot and recursively sorts each side.",
      color: "#f1c56d",
    },
    {
      id: "heap",
      name: "Heap Sort",
      avg: "O(n log n)",
      space: "O(1)",
      stable: false,
      desc: "Uses a max heap to repeatedly move the largest value into place.",
      color: "#91d4a0",
    },
    {
      id: "shell",
      name: "Shell Sort",
      avg: "O(n^1.5)*",
      space: "O(1)",
      stable: false,
      desc: "Uses shrinking gaps to move distant out-of-order values efficiently.",
      color: "#d5b7ee",
    },
    {
      id: "counting",
      name: "Counting Sort",
      avg: "O(n + k)",
      space: "O(n + k)",
      stable: true,
      desc: "Counts bounded integer frequencies and reconstructs the sorted array.",
      color: "#e9a3bd",
    },
  ];

  /* =========================================================
   * State
   * ========================================================= */
  const state = {
    original: [42, 18, 63, 7, 31, 55, 12, 84],
    arr: [],
    steps: [],
    idx: 0,
    cmp: 0,
    writes: 0,
    sorted: [],
    timer: null,
    started: 0,
    elapsed: 0,
  };

  /* =========================================================
   * Utilities
   * ========================================================= */
  const fmt = n =>
    Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));

  function parse() {
    const p = $("numbers").value.trim().split(/[,\s;]+/).filter(Boolean);
    if (!p.length || p.length > 80) throw Error("Enter between 1 and 80 values.");

    const a = p.map(Number);
    if (a.some(v => !Number.isFinite(v))) throw Error("Only valid numbers are allowed.");

    return a;
  }

  /* =========================================================
   * Trace generator
   * Returns a list of steps:
   *   c = compare, w = write, s = swap, p = pivot, d = done/mark
   * ========================================================= */
  function makeTrace(key, input) {
    const a = input.slice();
    const steps = [];
    const n = a.length;

    const cmp = (i, j, msg) => steps.push({ t: "c", ix: [i, j], msg });

    const write = (i, v, msg) => {
      a[i] = v;
      steps.push({ t: "w", ix: [i], values: { [i]: v }, msg });
    };

    const swap = (i, j, msg) => {
      if (i === j) return;
      [a[i], a[j]] = [a[j], a[i]];
      steps.push({ t: "s", ix: [i, j], values: { [i]: a[i], [j]: a[j] }, msg });
    };

    const mark = (ix, msg) => steps.push({ t: "d", ix, msg });

    /* ---------- Bubble Sort ---------- */
    if (key === "bubble") {
      for (let e = n - 1; e > 0; e--) {
        let changed = false;

        for (let j = 0; j < e; j++) {
          cmp(j, j + 1, `Compare ${fmt(a[j])} with ${fmt(a[j + 1])}.`);
          if (a[j] > a[j + 1]) {
            swap(j, j + 1, `Swap ${fmt(a[j + 1])} and ${fmt(a[j])}.`);
            changed = true;
          }
        }

        mark([e], `Position ${e + 1} is fixed.`);
        if (!changed) break;
      }
      mark(a.map((_, i) => i), "Array sorted.");
    }

    /* ---------- Selection Sort ---------- */
    else if (key === "selection") {
      for (let i = 0; i < n - 1; i++) {
        let m = i;

        for (let j = i + 1; j < n; j++) {
          cmp(m, j, `Compare ${fmt(a[m])} with ${fmt(a[j])}.`);
          if (a[j] < a[m]) m = j;
        }

        swap(i, m, `Place minimum ${fmt(a[m])} at index ${i + 1}.`);
        mark([i], "One more value is fixed.");
      }
      mark(a.map((_, i) => i), "Array sorted.");
    }

    /* ---------- Insertion Sort ---------- */
    else if (key === "insertion") {
      for (let i = 1; i < n; i++) {
        let v = a[i];
        let j = i - 1;

        while (j >= 0) {
          cmp(j, i, `Compare ${fmt(a[j])} with key ${fmt(v)}.`);
          if (a[j] > v) {
            write(j + 1, a[j], `Shift ${fmt(a[j])} right.`);
            j--;
          } else {
            break;
          }
        }

        write(j + 1, v, `Insert ${fmt(v)} into sorted prefix.`);
        mark(Array.from({ length: i + 1 }, (_, k) => k), "Sorted prefix extended.");
      }
      mark(a.map((_, i) => i), "Array sorted.");
    }

    /* ---------- Merge Sort ---------- */
    else if (key === "merge") {
      function sort(l, r) {
        if (r - l < 2) return;

        let m = (l + r) >> 1;
        sort(l, m);
        sort(m, r);

        let L = a.slice(l, m);
        let R = a.slice(m, r);
        let i = 0;
        let j = 0;
        let k = l;

        while (i < L.length && j < R.length) {
          cmp(l + i, m + j, `Compare ${fmt(L[i])} and ${fmt(R[j])} for merge.`);
          if (L[i] <= R[j]) write(k++, L[i++], "Write next value from left run.");
          else write(k++, R[j++], "Write next value from right run.");
        }

        while (i < L.length) write(k++, L[i++], "Copy remaining left value.");
        while (j < R.length) write(k++, R[j++], "Copy remaining right value.");

        mark(Array.from({ length: r - l }, (_, x) => l + x), `Merged segment ${l + 1}–${r}.`);
      }

      sort(0, n);
      mark(a.map((_, i) => i), "Array sorted.");
    }

    /* ---------- Quick Sort ---------- */
    else if (key === "quick") {
      function sort(l, r) {
        if (l >= r) return;

        let p = a[r];
        steps.push({ t: "p", ix: [r], msg: `Pivot selected: ${fmt(p)}.` });

        let i = l;
        for (let j = l; j < r; j++) {
          cmp(j, r, `Compare ${fmt(a[j])} with pivot ${fmt(p)}.`);
          if (a[j] <= p) swap(i++, j, "Move value into lower partition.");
        }

        swap(i, r, `Pivot ${fmt(p)} placed in final position.`);
        mark([i], "Pivot fixed.");

        sort(l, i - 1);
        sort(i + 1, r);
      }

      sort(0, n - 1);
      mark(a.map((_, i) => i), "Array sorted.");
    }

    /* ---------- Heap Sort ---------- */
    else if (key === "heap") {
      function heap(size, root) {
        let m = root;
        let l = 2 * root + 1;
        let r = l + 1;

        if (l < size) {
          cmp(m, l, `Compare heap values ${fmt(a[m])} and ${fmt(a[l])}.`);
          if (a[l] > a[m]) m = l;
        }

        if (r < size) {
          cmp(m, r, `Compare heap values ${fmt(a[m])} and ${fmt(a[r])}.`);
          if (a[r] > a[m]) m = r;
        }

        if (m !== root) {
          swap(root, m, "Restore max-heap property.");
          heap(size, m);
        }
      }

      for (let i = (n >> 1) - 1; i >= 0; i--) heap(n, i);

      for (let e = n - 1; e > 0; e--) {
        swap(0, e, "Move maximum value to final position.");
        mark([e], "Largest remaining value fixed.");
        heap(e, 0);
      }
      mark(a.map((_, i) => i), "Array sorted.");
    }

    /* ---------- Shell Sort ---------- */
    else if (key === "shell") {
      for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
          let v = a[i];
          let j = i;

          while (j >= gap) {
            cmp(j - gap, i, `Compare gap-${gap} values ${fmt(a[j - gap])} and ${fmt(v)}.`);
            if (a[j - gap] > v) {
              write(j, a[j - gap], "Shift value across current gap.");
              j -= gap;
            } else {
              break;
            }
          }

          if (j !== i) write(j, v, "Insert value at gap-sorted position.");
        }

        mark(a.map((_, i) => i), `Completed gap ${gap}.`);
      }
      mark(a.map((_, i) => i), "Array sorted.");
    }

    /* ---------- Counting Sort ---------- */
    else if (key === "counting") {
      if (a.some(v => !Number.isInteger(v))) throw Error("Counting Sort accepts integers only.");

      let min = Math.min(...a);
      let max = Math.max(...a);
      if (max - min > 5000) throw Error("Counting Sort range must be 5,000 or less.");

      let c = Array(max - min + 1).fill(0);

      a.forEach((v, i) => {
        cmp(i, i, `Count occurrence of ${v}.`);
        c[v - min]++;
      });

      let k = 0;
      c.forEach((count, idx) => {
        while (count--) write(k++, idx + min, `Write ${idx + min} from frequency count.`);
      });

      mark(a.map((_, i) => i), "Array sorted.");
    }

    return steps;
  }

  /* =========================================================
   * Rendering
   * ========================================================= */
  function render(high = [], type = "") {
    const max = Math.max(1, ...state.arr.map(Math.abs));

    $("arrayBars").innerHTML = state.arr
      .map((v, i) => {
        let c = "array-bar";
        if (state.sorted.includes(i)) c += " sorted";
        if (high.includes(i)) {
          c += " " + (type === "c" ? "compare" : type === "p" ? "pivot" : "swap");
        }
        return `<div class="${c}" style="height:${Math.max(5, (Math.abs(v) / max) * 100)}%" title="${fmt(v)}"></div>`;
      })
      .join("");

    $("arrayValues").innerHTML = state.arr.map(v => `<span>${fmt(v)}</span>`).join("");
  }

  function stats() {
    $("comparisons").textContent = state.cmp;
    $("writes").textContent = state.writes;
    $("operations").textContent = state.idx;
    $("elapsed").textContent = state.elapsed.toFixed(1) + "s";
    $("progress").textContent = `${state.idx} / ${state.steps.length}`;
  }

  function log(msg) {
    let ol = $("log");
    if (ol.querySelector(".empty-log")) ol.innerHTML = "";

    let li = document.createElement("li");
    li.textContent = msg;
    ol.prepend(li);

    while (ol.children.length > 35) ol.lastElementChild.remove();
  }

  /* =========================================================
   * Playback controls
   * ========================================================= */
  function stop() {
    if (state.timer) clearTimeout(state.timer);
    state.timer = null;
  }

  function reset() {
    stop();
    state.arr = state.original.slice();
    state.idx = 0;
    state.cmp = 0;
    state.writes = 0;
    state.sorted = [];
    state.started = 0;
    state.elapsed = 0;

    try {
      state.steps = makeTrace($("algorithm").value, state.original);
    } catch (e) {
      state.steps = [];
      $("status").textContent = e.message;
    }

    render();
    stats();
    $("operation").textContent = "Waiting for first operation…";
    $("status").textContent = "Ready. Choose Play or Step.";
    $("log").innerHTML = '<li class="empty-log">Your operation history will appear here.</li>';
  }

  function updateInfo() {
    let a = algos.find(x => x.id === $("algorithm").value);
    $("activeTitle").textContent = a.name;
    $("algoInfo").textContent = `Average ${a.avg} · Space ${a.space}`;
    reset();
  }

  function next() {
    if (state.idx >= state.steps.length) {
      stop();
      state.sorted = state.arr.map((_, i) => i);
      render();
      $("status").textContent = "Complete — array is sorted.";
      return false;
    }

    if (!state.started) state.started = performance.now();

    let s = state.steps[state.idx++];

    if (s.t === "c") {
      state.cmp++;
      render(s.ix, "c");
    } else if (s.t === "s" || s.t === "w") {
      Object.entries(s.values || {}).forEach(([i, v]) => (state.arr[+i] = v));
      state.writes += s.t === "s" ? 2 : 1;
      render(s.ix, "s");
    } else if (s.t === "p") {
      render(s.ix, "p");
    } else if (s.t === "d") {
      state.sorted = s.ix || [];
      render();
    }

    state.elapsed = (performance.now() - state.started) / 1000;
    $("operation").textContent = s.msg;
    $("status").textContent = `Operation ${state.idx} of ${state.steps.length}`;
    log(s.msg);
    stats();

    if (state.idx >= state.steps.length) {
      state.sorted = state.arr.map((_, i) => i);
      render();
      $("status").textContent = "Complete — array is sorted.";
      return false;
    }
    return true;
  }

  function play() {
    if (state.idx >= state.steps.length) reset();
    stop();

    const tick = () => {
      if (!next()) return;
      state.timer = setTimeout(tick, Math.max(18, 520 - Number($("speed").value) * 4.8));
    };
    tick();
  }

  function instant() {
    try {
      stop();
      reset();
      state.started = performance.now();

      while (state.idx < state.steps.length) {
        let s = state.steps[state.idx++];

        if (s.t === "c") state.cmp++;

        if (s.t === "s" || s.t === "w") {
          Object.entries(s.values || {}).forEach(([i, v]) => (state.arr[+i] = v));
          state.writes += s.t === "s" ? 2 : 1;
        }

        if (s.t === "d") state.sorted = s.ix || [];
      }

      state.sorted = state.arr.map((_, i) => i);
      state.elapsed = (performance.now() - state.started) / 1000;

      render();
      stats();
      $("operation").textContent = "Sorting complete.";
      $("status").textContent = "Complete — array is sorted.";
      log(`${$("algorithm").selectedOptions[0].text} completed.`);
    } catch (e) {
      $("status").textContent = e.message;
    }
  }

  /* =========================================================
   * Data input
   * ========================================================= */
  function apply() {
    try {
      state.original = parse();
      reset();
      $("status").textContent = `Loaded ${state.original.length} values.`;
    } catch (e) {
      $("status").textContent = e.message;
    }
  }

  function random() {
    let n = +$("arraySize").value;
    state.original = Array.from({ length: n }, () => Math.floor(Math.random() * 95) + 5);
    $("numbers").value = state.original.join(", ");
    reset();
    $("status").textContent = `Generated ${n} values.`;
  }

  /* =========================================================
   * Comparison (inside the workbench page)
   * ========================================================= */
  function countRun(key, input) {
    let trace = makeTrace(key, input);
    return {
      key,
      ops: trace.length,
      cmp: trace.filter(s => s.t === "c").length,
      writes: trace.reduce((n, s) => n + (s.t === "s" ? 2 : s.t === "w" ? 1 : 0), 0),
    };
  }

  function compare() {
    try {
      let input = parse();
      let a = countRun($("compareA").value, input);
      let b = countRun($("compareB").value, input);
      let max = Math.max(a.ops, b.ops, 1);

      $("compareResult").innerHTML = [a, b]
        .map((r, i) => {
          let meta = algos.find(x => x.id === r.key);
          return `<article class="result-card"><h3>${meta.name}</h3><div class="result-stats"><div><small>COMPARISONS</small><b>${r.cmp}</b></div><div><small>WRITES</small><b>${r.writes}</b></div><div><small>TRACE EVENTS</small><b>${r.ops}</b></div></div><div class="result-track"><span style="width:${(r.ops / max) * 100}%;background:${i ? "#8ce9e3" : "#c7f36b"}"></span></div></article>`;
        })
        .join("");
    } catch (e) {
      $("compareResult").textContent = e.message;
    }
  }

  /* =========================================================
   * Standalone compare page
   * ========================================================= */
  function initCompareOnly() {
    const run = $("compareRun");
    const a = $("compareA");
    const b = $("compareB");
    const input = $("compareNumbers");
    const out = $("compareResult");

    if (!run || !a || !b || !input || !out) return;

    a.value = "bubble";
    b.value = "quick";

    run.addEventListener("click", () => {
      try {
        const values = input.value
          .trim()
          .split(/[\s,;]+/)
          .filter(Boolean)
          .map(Number);

        if (!values.length || values.length > 80 || values.some(v => !Number.isFinite(v))) {
          throw Error("Enter 1–80 valid numbers.");
        }

        const results = [a.value, b.value].map(key => {
          const tr = makeTrace(key, values);
          const meta = algos.find(x => x.id === key);
          return {
            meta,
            comparisons: tr.filter(x => x.t === "c").length,
            writes: tr.reduce((n, x) => n + (x.t === "s" ? 2 : x.t === "w" ? 1 : 0), 0),
            events: tr.length,
          };
        });

        const max = Math.max(1, ...results.map(x => x.events));

        out.innerHTML = results
          .map(
            (r, i) =>
              `<article class="result-card"><h3>${r.meta.name}</h3><div class="result-stats"><div><small>COMPARISONS</small><b>${r.comparisons}</b></div><div><small>WRITES / SWAPS</small><b>${r.writes}</b></div><div><small>TRACE EVENTS</small><b>${r.events}</b></div></div><div class="result-track"><span style="width:${(r.events / max) * 100}%"></span></div></article>`
          )
          .join("");
      } catch (e) {
        out.textContent = e.message;
      }
    });
  }

  /* =========================================================
   * Home page hero animation (live bubble-sort loop)
   * ========================================================= */
  function animateHero() {
    const graph = $("heroGraph");
    if (!graph) return;

    const bars = [...graph.querySelectorAll(".hero-bar")];
    if (!bars.length) return;

    let step = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    setInterval(() => {
      const vals = bars.map(b => Number(b.querySelector("b")?.textContent || 0));
      const i = step % (vals.length - 1);

      if (vals[i] > vals[i + 1]) {
        [vals[i], vals[i + 1]] = [vals[i + 1], vals[i]];

        bars[i].style.setProperty("--h", `${(vals[i] / Math.max(...vals)) * 100}%`);
        bars[i + 1].style.setProperty("--h", `${(vals[i + 1] / Math.max(...vals)) * 100}%`);
        bars[i].querySelector("b").textContent = String(vals[i]).padStart(2, "0");
        bars[i + 1].querySelector("b").textContent = String(vals[i + 1]).padStart(2, "0");
      }

      bars.forEach((b, j) => b.classList.toggle("hot", j === i || j === i + 1));

      const cmp = $("heroComparisons");
      const sw = $("heroSwaps");
      const op = $("heroOperation");
      const stepLabel = $("heroStep");

      if (cmp) cmp.textContent = String(18 + step).padStart(3, "0");
      if (sw) sw.textContent = String(6 + Math.floor(step / 2)).padStart(3, "0");
      if (op) op.textContent = step % 2 ? "ADJACENT COMPARISON" : "COMPARE → SWAP";
      if (stepLabel) {
        stepLabel.textContent = `ADJACENT COMPARISON ${String((step % 8) + 1).padStart(2, "0")}`;
      }

      step++;
    }, 900);
  }

  /* =========================================================
   * Init (page-aware)
   * ========================================================= */
  function init() {
    // Standalone compare page
    const compareOnly = document.getElementById("compareRun");
    if (compareOnly && !$("algorithm")) {
      initCompareOnly();
      return;
    }

    // Pages without the workbench (e.g. home)
    if (!$("algorithm")) {
      animateHero();
      return;
    }

    // Populate selects
    const options = algos.map(a => `<option value="${a.id}">${a.name}</option>`).join("");
    ["algorithm", "compareA", "compareB"].forEach(id => {
      if ($(id)) $(id).innerHTML = options;
    });

    $("algorithm").value = $("algorithm").dataset.selected || "bubble";
    if ($("compareA")) $("compareA").value = "bubble";
    if ($("compareB")) $("compareB").value = "quick";

    // Complexity table
    $("complexityRows").innerHTML = algos
      .map(a => `<tr><td>${a.name}</td><td>${a.avg}</td><td>${a.space}</td></tr>`)
      .join("");

    // Method cards (if present on the page)
    if ($("methodGrid")) {
      $("methodGrid").innerHTML = algos
        .map(
          (a, i) =>
            `<article class="method-card" data-method="${a.id}" style="--accent:${a.color}" tabindex="0"><div class="method-meta"><span><i></i>${String(i + 1).padStart(2, "0")} / METHOD</span><span>${a.stable ? "STABLE" : "UNSTABLE"}</span></div><h3>${a.name}</h3><p>${a.desc}</p><div class="method-stats"><div><small>AVG TIME</small><b>${a.avg}</b></div><div><small>SPACE</small><b>${a.space}</b></div></div><span class="method-link">↗</span></article>`
        )
        .join("");
    }

    document.querySelectorAll(".method-card").forEach(card => {
      let choose = () => {
        const item = algos.find(x => x.id === card.dataset.method);
        if (item) window.location.href = `/algorithms/${item.id}-sort/`;
      };
      card.addEventListener("click", choose);
      card.addEventListener("keydown", e => {
        if (e.key === "Enter") choose();
      });
    });

    // Event listeners
    $("apply").addEventListener("click", apply);
    $("random").addEventListener("click", random);
    $("algorithm").addEventListener("change", updateInfo);
    $("play").addEventListener("click", play);
    $("step").addEventListener("click", () => {
      stop();
      next();
    });
    $("pause").addEventListener("click", () => {
      stop();
      $("status").textContent = "Paused.";
    });
    $("reset").addEventListener("click", reset);
    $("instant").addEventListener("click", instant);
    $("arraySize").addEventListener("input", () => {
      $("sizeLabel").textContent = $("arraySize").value;
    });

    if ($("compareRun")) $("compareRun").addEventListener("click", compare);

    if ($("clearLog")) {
      $("clearLog").addEventListener("click", () => {
        $("log").innerHTML = '<li class="empty-log">Trace cleared.</li>';
      });
    }

    updateInfo();
  }

  document.addEventListener("DOMContentLoaded", init);
})();