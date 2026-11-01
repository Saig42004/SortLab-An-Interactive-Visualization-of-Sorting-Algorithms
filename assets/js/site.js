(() => {
"use strict";
const $ = id => document.getElementById(id);
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = window.matchMedia("(pointer: coarse)").matches;

/* Cursor tracking: local-only pointer coordinates, smooth interpolation, no analytics. */
if (!coarse && !prefersReduced) {
  const core = document.querySelector(".cursor-core");
  const halo = document.querySelector(".cursor-halo");
  let x = innerWidth/2, y = innerHeight/2, hx=x, hy=y, visible=false;
  addEventListener("pointermove", e => {
    x=e.clientX; y=e.clientY; visible=true;
    document.documentElement.style.setProperty("--mx", `${x}px`);
    document.documentElement.style.setProperty("--my", `${y}px`);
    core.style.opacity="1"; halo.style.opacity="1";
  }, {passive:true});
  addEventListener("pointerleave",()=>{core.style.opacity="0";halo.style.opacity="0";});
  const tick=()=>{hx+=(x-hx)*.16;hy+=(y-hy)*.16;core.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;halo.style.transform=`translate3d(${hx}px,${hy}px,0) translate(-50%,-50%)`;requestAnimationFrame(tick);};
  tick();
  document.querySelectorAll("a,button,.method-card,select").forEach(el=>{
    el.addEventListener("pointerenter",()=>halo.classList.add("hovering"));
    el.addEventListener("pointerleave",()=>halo.classList.remove("hovering"));
  });
  // Magnetic buttons have a small, bounded movement.
  document.querySelectorAll(".magnetic").forEach(el=>{
    el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);el.style.transform=`translate(${dx*.10}px,${dy*.12}px)`;});
    el.addEventListener("pointerleave",()=>{el.style.transform="translate(0,0)";});
  });
  // Pointer-reactive tilt for the hero visualization.
  document.querySelectorAll("[data-tilt]").forEach(el=>{
    el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),rx=(e.clientY-r.top)/r.height-.5,ry=(e.clientX-r.left)/r.width-.5;el.style.transform=`perspective(900px) rotateX(${-rx*4}deg) rotateY(${ry*5}deg)`;});
    el.addEventListener("pointerleave",()=>el.style.transform="perspective(900px) rotateX(0) rotateY(0)");
  });
}
// Reveal sections as they enter the viewport.
const revealEls=document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !prefersReduced) {
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
  revealEls.forEach(el=>observer.observe(el));
} else revealEls.forEach(el=>el.classList.add("visible"));
// Small hero parallax on pointer devices.
if(!coarse&&!prefersReduced){const hero=document.querySelector(".hero");hero.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;document.querySelectorAll(".hero-orb").forEach((o,i)=>o.style.transform=`translate(${dx*(i? -15:20)}px,${dy*(i? -10:15)}px)`);},{passive:true});}

/* Sorting algorithms: trace events are replayed in the browser. */
const algos=[
 {id:"bubble",name:"Bubble Sort",avg:"O(n²)",space:"O(1)",stable:true,desc:"Compares adjacent values and moves larger values toward the end.",color:"#c7f36b"},
 {id:"selection",name:"Selection Sort",avg:"O(n²)",space:"O(1)",stable:false,desc:"Finds the minimum value in the unsorted region and places it next.",color:"#8ce9e3"},
 {id:"insertion",name:"Insertion Sort",avg:"O(n²)",space:"O(1)",stable:true,desc:"Builds a sorted prefix by shifting larger values to make room.",color:"#e2a18a"},
 {id:"merge",name:"Merge Sort",avg:"O(n log n)",space:"O(n)",stable:true,desc:"Divides the array, sorts each half, and merges ordered runs.",color:"#a7a0ed"},
 {id:"quick",name:"Quick Sort",avg:"O(n log n)",space:"O(log n) avg.",stable:false,desc:"Partitions values around a pivot and recursively sorts each side.",color:"#f1c56d"},
 {id:"heap",name:"Heap Sort",avg:"O(n log n)",space:"O(1)",stable:false,desc:"Uses a max heap to repeatedly move the largest value into place.",color:"#91d4a0"},
 {id:"shell",name:"Shell Sort",avg:"O(n^1.5)*",space:"O(1)",stable:false,desc:"Uses shrinking gaps to move distant out-of-order values efficiently.",color:"#d5b7ee"},
 {id:"counting",name:"Counting Sort",avg:"O(n + k)",space:"O(n + k)",stable:true,desc:"Counts bounded integer frequencies and reconstructs the sorted array.",color:"#e9a3bd"}
];
const state={original:[42,18,63,7,31,55,12,84],arr:[],steps:[],idx:0,cmp:0,writes:0,sorted:[],timer:null,started:0,elapsed:0};
const fmt=n=>Number.isInteger(n)?String(n):String(Number(n.toFixed(2)));
function parse(){const p=$("numbers").value.trim().split(/[,\s;]+/).filter(Boolean);if(!p.length||p.length>80)throw Error("Enter between 1 and 80 values.");const a=p.map(Number);if(a.some(v=>!Number.isFinite(v)))throw Error("Only valid numbers are allowed.");return a;}
function makeTrace(key,input){const a=input.slice(),steps=[],n=a.length;const cmp=(i,j,msg)=>steps.push({t:"c",ix:[i,j],msg});const write=(i,v,msg)=>{a[i]=v;steps.push({t:"w",ix:[i],values:{[i]:v},msg});};const swap=(i,j,msg)=>{if(i===j)return;[a[i],a[j]]=[a[j],a[i]];steps.push({t:"s",ix:[i,j],values:{[i]:a[i],[j]:a[j]},msg});};const mark=(ix,msg)=>steps.push({t:"d",ix,msg});
 if(key==="bubble"){for(let e=n-1;e>0;e--){let changed=false;for(let j=0;j<e;j++){cmp(j,j+1,`Compare ${fmt(a[j])} with ${fmt(a[j+1])}.`);if(a[j]>a[j+1]){swap(j,j+1,`Swap ${fmt(a[j+1])} and ${fmt(a[j])}.`);changed=true;}}mark([e],`Position ${e+1} is fixed.`);if(!changed)break;}mark(a.map((_,i)=>i),"Array sorted.");}
 else if(key==="selection"){for(let i=0;i<n-1;i++){let m=i;for(let j=i+1;j<n;j++){cmp(m,j,`Compare ${fmt(a[m])} with ${fmt(a[j])}.`);if(a[j]<a[m])m=j;}swap(i,m,`Place minimum ${fmt(a[m])} at index ${i+1}.`);mark([i],"One more value is fixed.");}mark(a.map((_,i)=>i),"Array sorted.");}
 else if(key==="insertion"){for(let i=1;i<n;i++){let v=a[i],j=i-1;while(j>=0){cmp(j,i,`Compare ${fmt(a[j])} with key ${fmt(v)}.`);if(a[j]>v){write(j+1,a[j],`Shift ${fmt(a[j])} right.`);j--;}else break;}write(j+1,v,`Insert ${fmt(v)} into sorted prefix.`);mark(Array.from({length:i+1},(_,k)=>k),"Sorted prefix extended.");}mark(a.map((_,i)=>i),"Array sorted.");}
 else if(key==="merge"){function sort(l,r){if(r-l<2)return;let m=(l+r)>>1;sort(l,m);sort(m,r);let L=a.slice(l,m),R=a.slice(m,r),i=0,j=0,k=l;while(i<L.length&&j<R.length){cmp(l+i,m+j,`Compare ${fmt(L[i])} and ${fmt(R[j])} for merge.`);if(L[i]<=R[j])write(k++,L[i++],"Write next value from left run.");else write(k++,R[j++],"Write next value from right run.");}while(i<L.length)write(k++,L[i++],"Copy remaining left value.");while(j<R.length)write(k++,R[j++],"Copy remaining right value.");mark(Array.from({length:r-l},(_,x)=>l+x),`Merged segment ${l+1}–${r}.`);}sort(0,n);mark(a.map((_,i)=>i),"Array sorted.");}
 else if(key==="quick"){function sort(l,r){if(l>=r)return;let p=a[r];steps.push({t:"p",ix:[r],msg:`Pivot selected: ${fmt(p)}.`});let i=l;for(let j=l;j<r;j++){cmp(j,r,`Compare ${fmt(a[j])} with pivot ${fmt(p)}.`);if(a[j]<=p)swap(i++,j,"Move value into lower partition.");}swap(i,r,`Pivot ${fmt(p)} placed in final position.`);mark([i],"Pivot fixed.");sort(l,i-1);sort(i+1,r);}sort(0,n-1);mark(a.map((_,i)=>i),"Array sorted.");}
 else if(key==="heap"){function heap(size,root){let m=root,l=2*root+1,r=l+1;if(l<size){cmp(m,l,`Compare heap values ${fmt(a[m])} and ${fmt(a[l])}.`);if(a[l]>a[m])m=l;}if(r<size){cmp(m,r,`Compare heap values ${fmt(a[m])} and ${fmt(a[r])}.`);if(a[r]>a[m])m=r;}if(m!==root){swap(root,m,"Restore max-heap property.");heap(size,m);}}for(let i=(n>>1)-1;i>=0;i--)heap(n,i);for(let e=n-1;e>0;e--){swap(0,e,"Move maximum value to final position.");mark([e],"Largest remaining value fixed.");heap(e,0);}mark(a.map((_,i)=>i),"Array sorted.");}
 else if(key==="shell"){for(let gap=Math.floor(n/2);gap>0;gap=Math.floor(gap/2)){for(let i=gap;i<n;i++){let v=a[i],j=i;while(j>=gap){cmp(j-gap,i,`Compare gap-${gap} values ${fmt(a[j-gap])} and ${fmt(v)}.`);if(a[j-gap]>v){write(j,a[j-gap],"Shift value across current gap.");j-=gap;}else break;}if(j!==i)write(j,v,"Insert value at gap-sorted position.");}mark(a.map((_,i)=>i),`Completed gap ${gap}.`);}mark(a.map((_,i)=>i),"Array sorted.");}
 else if(key==="counting"){if(a.some(v=>!Number.isInteger(v)))throw Error("Counting Sort accepts integers only.");let min=Math.min(...a),max=Math.max(...a);if(max-min>5000)throw Error("Counting Sort range must be 5,000 or less.");let c=Array(max-min+1).fill(0);a.forEach((v,i)=>{cmp(i,i,`Count occurrence of ${v}.`);c[v-min]++;});let k=0;c.forEach((count,idx)=>{while(count--)write(k++,idx+min,`Write ${idx+min} from frequency count.`);});mark(a.map((_,i)=>i),"Array sorted.");}
 return steps;}
function render(high=[],type=""){const max=Math.max(1,...state.arr.map(Math.abs));$("arrayBars").innerHTML=state.arr.map((v,i)=>{let c="array-bar";if(state.sorted.includes(i))c+=" sorted";if(high.includes(i))c+=" "+(type==="c"?"compare":type==="p"?"pivot":"swap");return `<div class="${c}" style="height:${Math.max(5,Math.abs(v)/max*100)}%" title="${fmt(v)}"></div>`;}).join("");$("arrayValues").innerHTML=state.arr.map(v=>`<span>${fmt(v)}</span>`).join("");}
function stats(){$("comparisons").textContent=state.cmp;$("writes").textContent=state.writes;$("operations").textContent=state.idx;$("elapsed").textContent=state.elapsed.toFixed(1)+"s";$("progress").textContent=`${state.idx} / ${state.steps.length}`;}
function stop(){if(state.timer)clearTimeout(state.timer);state.timer=null;}
function reset(){stop();state.arr=state.original.slice();state.idx=0;state.cmp=0;state.writes=0;state.sorted=[];state.started=0;state.elapsed=0;try{state.steps=makeTrace($("algorithm").value,state.original);}catch(e){state.steps=[];$("status").textContent=e.message;}render();stats();$("operation").textContent="Waiting for first operation…";$("status").textContent="Ready. Choose Play or Step.";$("log").innerHTML='<li class="empty-log">Your operation history will appear here.</li>';}
function updateInfo(){let a=algos.find(x=>x.id===$("algorithm").value);$("activeTitle").textContent=a.name;$("algoInfo").textContent=`Average ${a.avg} · Space ${a.space}`;reset();}
function log(msg){let ol=$("log");if(ol.querySelector(".empty-log"))ol.innerHTML="";let li=document.createElement("li");li.textContent=msg;ol.prepend(li);while(ol.children.length>35)ol.lastElementChild.remove();}
function next(){if(state.idx>=state.steps.length){stop();state.sorted=state.arr.map((_,i)=>i);render();$("status").textContent="Complete — array is sorted.";return false;}if(!state.started)state.started=performance.now();let s=state.steps[state.idx++];if(s.t==="c"){state.cmp++;render(s.ix,"c");}else if(s.t==="s"||s.t==="w"){Object.entries(s.values||{}).forEach(([i,v])=>state.arr[+i]=v);state.writes+=s.t==="s"?2:1;render(s.ix,"s");}else if(s.t==="p")render(s.ix,"p");else if(s.t==="d"){state.sorted=s.ix||[];render();}state.elapsed=(performance.now()-state.started)/1000;$("operation").textContent=s.msg;$("status").textContent=`Operation ${state.idx} of ${state.steps.length}`;log(s.msg);stats();if(state.idx>=state.steps.length){state.sorted=state.arr.map((_,i)=>i);render();$("status").textContent="Complete — array is sorted.";return false;}return true;}
function play(){if(state.idx>=state.steps.length)reset();stop();const tick=()=>{if(!next())return;state.timer=setTimeout(tick,Math.max(18,520-Number($("speed").value)*4.8));};tick();}
function apply(){try{state.original=parse();reset();$("status").textContent=`Loaded ${state.original.length} values.`;}catch(e){$("status").textContent=e.message;}}
function random(){let n=+$("arraySize").value;state.original=Array.from({length:n},()=>Math.floor(Math.random()*95)+5);$("numbers").value=state.original.join(", ");reset();$("status").textContent=`Generated ${n} values.`;}
function instant(){try{stop();reset();state.started=performance.now();while(state.idx<state.steps.length){let s=state.steps[state.idx++];if(s.t==="c")state.cmp++;if(s.t==="s"||s.t==="w"){Object.entries(s.values||{}).forEach(([i,v])=>state.arr[+i]=v);state.writes+=s.t==="s"?2:1;}if(s.t==="d")state.sorted=s.ix||[];}state.sorted=state.arr.map((_,i)=>i);state.elapsed=(performance.now()-state.started)/1000;render();stats();$("operation").textContent="Sorting complete."; $("status").textContent="Complete — array is sorted.";log(`${$("algorithm").selectedOptions[0].text} completed.`);}catch(e){$("status").textContent=e.message;}}
function countRun(key,input){let trace=makeTrace(key,input);return {key,ops:trace.length,cmp:trace.filter(s=>s.t==="c").length,writes:trace.reduce((n,s)=>n+(s.t==="s"?2:s.t==="w"?1:0),0)};}
function compare(){try{let input=parse(),a=countRun($("compareA").value,input),b=countRun($("compareB").value,input),max=Math.max(a.ops,b.ops,1);$("compareResult").innerHTML=[a,b].map((r,i)=>{let meta=algos.find(x=>x.id===r.key);return `<article class="result-card"><h3>${meta.name}</h3><div class="result-stats"><div><small>COMPARISONS</small><b>${r.cmp}</b></div><div><small>WRITES</small><b>${r.writes}</b></div><div><small>TRACE EVENTS</small><b>${r.ops}</b></div></div><div class="result-track"><span style="width:${r.ops/max*100}%;background:${i?"#8ce9e3":"#c7f36b"}"></span></div></article>`;}).join("");}catch(e){$("compareResult").textContent=e.message;}}
function init(){const options=algos.map(a=>`<option value="${a.id}">${a.name}</option>`).join("");["algorithm","compareA","compareB"].forEach(id=>$(id).innerHTML=options);$("algorithm").value="bubble";$("compareA").value="bubble";$("compareB").value="quick";$("complexityRows").innerHTML=algos.map(a=>`<tr><td>${a.name}</td><td>${a.avg}</td><td>${a.space}</td></tr>`).join("");$("methodGrid").innerHTML=algos.map((a,i)=>`<article class="method-card" data-method="${a.id}" style="--accent:${a.color}" tabindex="0"><div class="method-meta"><span><i></i>${String(i+1).padStart(2,"0")} / METHOD</span><span>${a.stable?"STABLE":"UNSTABLE"}</span></div><h3>${a.name}</h3><p>${a.desc}</p><div class="method-stats"><div><small>AVG TIME</small><b>${a.avg}</b></div><div><small>SPACE</small><b>${a.space}</b></div></div><span class="method-link">↗</span></article>`).join("");document.querySelectorAll(".method-card").forEach(card=>{let choose=()=>{$("algorithm").value=card.dataset.method;updateInfo();$("lab").scrollIntoView({behavior:"smooth"});};card.addEventListener("click",choose);card.addEventListener("keydown",e=>{if(e.key==="Enter")choose();});});$("apply").addEventListener("click",apply);$("random").addEventListener("click",random);$("algorithm").addEventListener("change",updateInfo);$("play").addEventListener("click",play);$("step").addEventListener("click",()=>{stop();next();});$("pause").addEventListener("click",()=>{stop();$("status").textContent="Paused.";});$("reset").addEventListener("click",reset);$("instant").addEventListener("click",instant);$("arraySize").addEventListener("input",()=>$("sizeLabel").textContent=$("arraySize").value);$("compareRun").addEventListener("click",compare);$("clearLog").addEventListener("click",()=>$("log").innerHTML='<li class="empty-log">Trace cleared.</li>');$("mobileMenu").addEventListener("click",()=>$("mainNav").classList.toggle("open"));document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));state.arr=state.original.slice();state.steps=makeTrace("bubble",state.original);render();stats();}
document.addEventListener("DOMContentLoaded",init);
})();