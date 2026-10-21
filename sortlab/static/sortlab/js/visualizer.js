(() => {
  'use strict';

  /* =========================================================
   * Helpers & constants
   * ========================================================= */
  const $ = id => document.getElementById(id);

  const meta = {
    bubble: {
      name: 'Bubble Sort',
      complexity: 'Time: O(n²) average · Space: O(1)',
    },
    selection: {
      name: 'Selection Sort',
      complexity: 'Time: O(n²) average · Space: O(1)',
    },
    insertion: {
      name: 'Insertion Sort',
      complexity: 'Time: O(n²) average · Space: O(1)',
    },
    merge: {
      name: 'Merge Sort',
      complexity: 'Time: O(n log n) · Space: O(n)',
    },
    quick: {
      name: 'Quick Sort',
      complexity: 'Time: O(n log n) average · Space: O(log n) average',
    },
  };

  /* =========================================================
   * State
   * ========================================================= */
  let original = [42, 18, 63, 7, 31, 55, 12, 84];
  let arr = [...original];
  let ops = [];
  let cursor = 0;

  let running = false;
  let timer = null;
  let startedAt = 0;
  let elapsedBefore = 0;

  let comparisons = 0;
  let moves = 0;
  let sortedSet = new Set();
  let lastOp = null;

  /* =========================================================
   * Utilities
   * ========================================================= */
  const fmt = n =>
    Number.isInteger(n) ? String(n) : String(Number(n.toFixed(3)));

  function notify(msg) {
    const toast = $('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(notify.t);
    notify.t = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function parseManual() {
    const raw = $('manualInput').value.trim();
    if (!raw) return { error: 'Enter at least one number.' };

    const parts = raw.split(/[, \s;]+/).filter(Boolean);
    if (parts.length > 80) return { error: 'Please enter 80 numbers or fewer.' };

    const nums = parts.map(Number);
    if (nums.some(n => !Number.isFinite(n))) {
      return { error: 'Invalid input. Use valid numbers separated by commas or spaces.' };
    }

    return { nums };
  }

  function delay() {
    return Math.max(25, 520 - Number($('speed').value) * 48);
  }

  /* =========================================================
   * Operation generator
   * Builds a list of "ops" describing every step of the sort,
   * which is later replayed step by step for the animation.
   * ========================================================= */
  function makeOps(a, kind) {
    const out = [];

    const cmp = (i, j) =>
      out.push({
        type: 'compare',
        a: i,
        b: j,
        text: `Compare ${fmt(a[i])} and ${fmt(a[j])}`,
      });

    const swap = (i, j) => {
      out.push({
        type: 'swap',
        a: i,
        b: j,
        text: `Swap positions ${i + 1} and ${j + 1}`,
      });
      [a[i], a[j]] = [a[j], a[i]];
    };

    const write = (k, value) => {
      a[k] = value;
      out.push({
        type: 'write',
        a: k,
        value,
        text: `Write ${fmt(value)} at position ${k + 1}`,
      });
    };

    /* ---------- Bubble Sort ---------- */
    if (kind === 'bubble') {
      for (let end = a.length - 1; end > 0; end--) {
        let changed = false;

        for (let i = 0; i < end; i++) {
          cmp(i, i + 1);
          if (a[i] > a[i + 1]) {
            swap(i, i + 1);
            changed = true;
          }
        }

        out.push({
          type: 'mark',
          indices: [end],
          text: `Position ${end + 1} finalized`,
        });

        if (!changed) break;
      }

      if (a.length) {
        out.push({
          type: 'mark',
          indices: [0],
          text: 'First position finalized',
        });
      }
    }

    /* ---------- Selection Sort ---------- */
    if (kind === 'selection') {
      for (let i = 0; i < a.length; i++) {
        let min = i;

        for (let j = i + 1; j < a.length; j++) {
          cmp(min, j);
          if (a[j] < a[min]) min = j;
        }

        if (min !== i) swap(i, min);

        out.push({
          type: 'mark',
          indices: [i],
          text: `Position ${i + 1} finalized`,
        });
      }
    }

    /* ---------- Insertion Sort ---------- */
    if (kind === 'insertion') {
      for (let i = 1; i < a.length; i++) {
        let j = i;

        while (j > 0) {
          cmp(j - 1, j);
          if (a[j - 1] > a[j]) {
            swap(j - 1, j);
            j--;
          } else {
            break;
          }
        }

        out.push({
          type: 'mark',
          indices: Array.from({ length: i + 1 }, (_, k) => k),
          text: `First ${i + 1} values are ordered`,
        });
      }
    }

    /* ---------- Merge Sort ---------- */
    if (kind === 'merge') {
      const mergeSort = (lo, hi) => {
        if (hi - lo <= 1) return;

        const mid = (lo + hi) >> 1;
        mergeSort(lo, mid);
        mergeSort(mid, hi);

        const left = a.slice(lo, mid);
        const right = a.slice(mid, hi);
        let i = 0;
        let j = 0;
        let k = lo;

        while (i < left.length && j < right.length) {
          out.push({
            type: 'compare',
            a: lo + i,
            b: mid + j,
            text: `Compare ${fmt(left[i])} and ${fmt(right[j])}`,
          });
          write(k, left[i] <= right[j] ? left[i++] : right[j++]);
          k++;
        }

        while (i < left.length) write(k++, left[i++]);
        while (j < right.length) write(k++, right[j++]);

        out.push({
          type: 'mark',
          indices: Array.from({ length: hi - lo }, (_, x) => lo + x),
          text: `Merged positions ${lo + 1}–${hi}`,
        });
      };

      mergeSort(0, a.length);
    }

    /* ---------- Quick Sort ---------- */
    if (kind === 'quick') {
      const partition = (lo, hi) => {
        const pivot = a[hi];
        out.push({
          type: 'pivot',
          a: hi,
          text: `Choose ${fmt(pivot)} as pivot`,
        });

        let i = lo;
        for (let j = lo; j < hi; j++) {
          cmp(j, hi);
          if (a[j] < pivot) {
            if (i !== j) swap(i, j);
            i++;
          }
        }

        if (i !== hi) swap(i, hi);

        out.push({
          type: 'mark',
          indices: [i],
          text: `Pivot placed at position ${i + 1}`,
        });

        return i;
      };

      const quickSort = (lo, hi) => {
        if (lo < hi) {
          const p = partition(lo, hi);
          quickSort(lo, p - 1);
          quickSort(p + 1, hi);
        }
      };

      quickSort(0, a.length - 1);
    }

    out.push({
      type: 'done',
      indices: Array.from({ length: a.length }, (_, i) => i),
      text: 'Sorting complete — ascending order achieved',
    });

    return out;
  }

  /* =========================================================
   * Rendering
   * ========================================================= */
  function render() {
    const chart = $('chart');
    chart.innerHTML = '';

    const max = Math.max(1, ...arr.map(x => Math.abs(x)));

    arr.forEach((v, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'bar-wrap';

      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = Math.max(5, (Math.abs(v) / max) * 100) + '%';

      if (sortedSet.has(i)) bar.classList.add('sorted');

      if (lastOp) {
        const isTarget = i === lastOp.a || i === lastOp.b;

        if (lastOp.type === 'compare' && isTarget) {
          bar.classList.add('compare');
        }
        if ((lastOp.type === 'swap' || lastOp.type === 'write') && isTarget) {
          bar.classList.add(lastOp.type);
        }
        if (lastOp.type === 'pivot' && i === lastOp.a) {
          bar.classList.add('pivot');
        }
      }

      bar.title = `Index ${i}: ${fmt(v)}`;
      wrap.appendChild(bar);

      if (arr.length <= 24) {
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = fmt(v);
        wrap.appendChild(label);
      }

      chart.appendChild(wrap);
    });
  }

  function updateStats() {
    const elapsed =
      elapsedBefore + (running ? (performance.now() - startedAt) / 1000 : 0);

    $('comparisons').textContent = comparisons.toLocaleString();
    $('moves').textContent = moves.toLocaleString();
    $('operations').textContent = cursor.toLocaleString();
    $('elapsed').textContent = elapsed.toFixed(1) + 's';
    $('stepCount').textContent = `${cursor} / ${ops.length} operations`;
    $('progress').style.width =
      (ops.length ? (cursor / ops.length) * 100 : 0) + '%';
  }

  function log(op) {
    const el = $('log');
    if (el.querySelector('.empty')) el.innerHTML = '';

    const row = document.createElement('div');
    const num = document.createElement('span');
    const txt = document.createElement('span');

    row.className = 'log-item';
    num.className = 'log-num';
    num.textContent = String(cursor + 1).padStart(3, '0');
    txt.textContent = op.text;

    row.append(num, txt);
    el.prepend(row);

    while (el.children.length > 50) el.lastChild.remove();
  }

  /* =========================================================
   * Applying operations
   * ========================================================= */
  function applyToState(op) {
    if (op.type === 'compare') comparisons++;

    if (op.type === 'swap') {
      [arr[op.a], arr[op.b]] = [arr[op.b], arr[op.a]];
      moves += 2;
    }

    if (op.type === 'write') {
      arr[op.a] = op.value;
      moves++;
    }

    if (op.type === 'mark') {
      op.indices.forEach(i => sortedSet.add(i));
    }

    if (op.type === 'done') {
      sortedSet = new Set(op.indices);
    }
  }

  function apply(op) {
    lastOp = op;
    applyToState(op);

    $('operationText').textContent = op.text;
    cursor++;
    log(op);
    render();
    updateStats();

    if (op.type === 'done') {
      stop();
      notify('Sorting complete.');
    }
  }

  function step() {
    if (cursor >= ops.length) {
      stop();
      return false;
    }
    apply(ops[cursor]);
    return cursor < ops.length;
  }

  /* =========================================================
   * Playback controls
   * ========================================================= */
  function stop() {
    if (running) elapsedBefore += (performance.now() - startedAt) / 1000;

    running = false;
    clearTimeout(timer);
    timer = null;

    if ($('startBtn')) $('startBtn').textContent = '▶ Start';
    updateStats();
  }

  function resetState() {
    arr = [...original];
    ops = makeOps([...original], $('algorithm').value);
    cursor = 0;
    comparisons = 0;
    moves = 0;
    sortedSet = new Set();
    lastOp = null;
    elapsedBefore = 0;
    startedAt = 0;
  }

  function prepare() {
    stop();
    resetState();

    $('log').innerHTML =
      '<div class="empty">Press Start or Step to inspect the algorithm.</div>';
    $('operationText').textContent = 'Ready — choose Start or Step.';

    render();
    updateStats();
  }

  function tick() {
    if (!running) return;

    step();

    if (running && cursor < ops.length) {
      timer = setTimeout(tick, delay());
    } else {
      stop();
    }
  }

  function start() {
    if (running) return;
    if (cursor >= ops.length) prepare();

    running = true;
    startedAt = performance.now();
    $('startBtn').textContent = '▶ Running';
    timer = setTimeout(tick, delay());
  }

  function instant() {
    stop();
    resetState();

    for (const op of ops) {
      applyToState(op);
      cursor++;
    }

    $('log').innerHTML =
      '<div class="empty">Instant sort applied. Press Reset, then Start or Step to watch the process.</div>';
    $('operationText').textContent = 'Sorted instantly — ascending order.';

    render();
    updateStats();
    notify('Array sorted instantly.');
  }

  /* =========================================================
   * Data input
   * ========================================================= */
  function useNumbers(nums) {
    stop();
    original = [...nums];
    prepare();
    notify(`Loaded ${nums.length} number${nums.length === 1 ? '' : 's'} successfully.`);
  }

  function randomize() {
    const size = Number($('arraySize').value);
    const nums = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 96) + 4
    );

    $('manualInput').value = nums.join(', ');
    useNumbers(nums);
  }

  function changeAlgorithm() {
    const key = $('algorithm').value;
    const m = meta[key];

    $('algoName').textContent = m.name;
    $('complexity').textContent = m.complexity;

    document
      .querySelectorAll('#complexityRows tr')
      .forEach(tr => tr.classList.toggle('active', tr.dataset.algo === key));

    prepare();
  }

  /* =========================================================
   * Event listeners
   * ========================================================= */
  $('loadBtn').addEventListener('click', () => {
    const r = parseManual();
    if (r.error) {
      notify(r.error);
      return;
    }
    useNumbers(r.nums);
  });

  $('randomBtn').addEventListener('click', randomize);

  $('arraySize').addEventListener('input', () => {
    $('sizeValue').textContent = $('arraySize').value;
  });

  $('algorithm').addEventListener('change', changeAlgorithm);
  $('startBtn').addEventListener('click', start);

  $('stepBtn').addEventListener('click', () => {
    stop();
    if (cursor >= ops.length) prepare();
    step();
  });

  $('pauseBtn').addEventListener('click', stop);
  $('resetBtn').addEventListener('click', prepare);
  $('sortNowBtn').addEventListener('click', instant);

  $('speed').addEventListener('input', () => {
    if (running) {
      clearTimeout(timer);
      timer = setTimeout(tick, delay());
    }
  });

  $('copyBtn').addEventListener('click', async () => {
    const result = arr.map(fmt).join(', ');
    try {
      await navigator.clipboard.writeText(result);
      notify('Current array copied to clipboard.');
    } catch (e) {
      $('manualInput').value = result;
      $('manualInput').select();
      notify('Result placed in input field; copy it manually.');
    }
  });

  /* =========================================================
   * Init
   * ========================================================= */
  prepare();
})();