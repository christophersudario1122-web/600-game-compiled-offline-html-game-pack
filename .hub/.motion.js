/* .motion.js — Arcade hub "Claude-Motion"-style motion layer.
   Subtle-but-noticeable: damped-spring-ish reveals, blur-in headings, count-ups,
   bar growth — all offline, no dependencies, no CDN.

   Design guarantees:
   - Loaded as a synchronous end-of-body script, so the hidden pre-state is set
     BEFORE first paint (no flash). If JS never runs, nothing is ever hidden.
   - Reveals wait until the 2s boot overlay (#bt-screen) is removed, so the
     perfboard choreography plays to the user instead of under the BIOS screen.
   - Dynamically-added content (the library grid rebuilds on every filter) is
     tagged inside MutationObserver callbacks, which run before paint.
   - Respects prefers-reduced-motion: everything lands instantly.
   - Never declares `transform` in the *shown* state, so existing :hover lifts
     (.card:hover{transform:...}) keep working. */
(function () {
  "use strict";
  if (window.__arcadeMotion) return;
  window.__arcadeMotion = true;

  var docEl = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---- 1. mark JS present + inject styles (before first paint) ---- */
  docEl.classList.add("m-js");
  var CSS =
    "html.m-js [data-motion]:not(.m-in){opacity:0;transform:translateY(14px)}" +
    'html.m-js [data-motion="head"]:not(.m-in){filter:blur(7px)}' +
    "html.m-js [data-motion].m-in{opacity:1;filter:none}" +
    "html.m-js [data-motion]{transition:opacity .55s cubic-bezier(.22,1,.36,1)," +
      "transform .6s cubic-bezier(.22,1,.36,1),filter .45s ease-out}" +
    "html.m-js .bar-fill,html.m-js .activity-bar{" +
      "transition:width .9s cubic-bezier(.22,1,.36,1),height .9s cubic-bezier(.22,1,.36,1)}" +
    "@media (prefers-reduced-motion: reduce){" +
      "html.m-js [data-motion]:not(.m-in){opacity:1;transform:none;filter:none}}" +
    /* cinematic post-boot "power-on" flash, fired when #bt-screen is removed */
    "@keyframes mPowerOn{0%{opacity:0}10%{opacity:.85}100%{opacity:0}}" +
    "html.m-js #m-power{position:fixed;inset:0;z-index:99998;pointer-events:none;" +
      "background:radial-gradient(ellipse at center,rgba(0,255,136,.45),rgba(0,255,136,0) 62%);" +
      "animation:mPowerOn .75s cubic-bezier(.22,1,.36,1) forwards}";
  var style = document.createElement("style");
  style.id = "motion-style";
  style.textContent = CSS;
  (document.head || docEl).appendChild(style);

  /* ---- 2. targets ---- */
  var AUTO = "h1,h2,.card,.bar-row,.achievement,.activity-col,.gotd-section,.header-container,.action-bar,.tabs-container";
  var order = 0;
  var io = ("IntersectionObserver" in window)
    ? new IntersectionObserver(onHit, { threshold: 0.06, rootMargin: "0px 0px -30px 0px" })
    : null;

  var booted = false, waiting = [];

  function tag(el) {
    if (!el || el.nodeType !== 1 || el.__mTagged) return;
    if (el.hasAttribute("data-motion") || (el.classList && el.classList.contains("m-in"))) return;
    if (el.closest && el.closest("#bt-screen")) return;
    el.__mTagged = true;
    el.__mord = order++;
    var isHead = /^H[12]$/.test(el.tagName);
    el.setAttribute("data-motion", isHead ? "head" : "");
    if (reduce) { el.classList.add("m-in"); return; }
    if (io) io.observe(el); else revealNow(el);
  }

  function tagAll(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches && root.matches(AUTO)) tag(root);
    if (root.querySelectorAll) {
      var list = root.querySelectorAll(AUTO);
      for (var i = 0; i < list.length; i++) tag(list[i]);
    }
  }

  function onHit(entries) {
    var hits = [];
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) { hits.push(entries[i].target); io.unobserve(entries[i].target); }
    }
    if (!hits.length) return;
    if (!booted) { waiting = waiting.concat(hits); return; }
    flushBatch(hits);
  }

  function flushBatch(list) {
    list.sort(function (a, b) { return (a.__mord || 0) - (b.__mord || 0); });
    for (var i = 0; i < list.length; i++) {
      var el = list[i], d = Math.min(i * 45, 420);
      el.style.transitionDelay = d + "ms";
      el.classList.add("m-in");
      (function (node, delay) {
        setTimeout(function () { node.style.transitionDelay = ""; }, delay + 780);
      })(el, d);
      after(el);
    }
  }

  function revealNow(el) {
    el.classList.add("m-in");
    after(el);
  }

  /* ---- 3. post-reveal effects: count-ups + bar growth ---- */
  function after(root) {
    if (reduce) return;
    var vals = [];
    if (root.matches && root.matches(".card-value,.activity-val,[data-count]")) vals.push(root);
    if (root.querySelectorAll) {
      var v = root.querySelectorAll(".card-value,.activity-val,[data-count]");
      for (var i = 0; i < v.length; i++) vals.push(v[i]);
    }
    for (var j = 0; j < vals.length; j++) observeValue(vals[j]);
    growBars(root);
  }

  function observeValue(el) {
    if (el.__mValObs) { maybeCount(el); return; }
    el.__mValObs = new MutationObserver(function () { if (!el.__mBusy) maybeCount(el); });
    el.__mValObs.observe(el, { childList: true, characterData: true, subtree: true });
    maybeCount(el);
  }

  function maybeCount(el) {
    if (reduce || el.__mBusy) return;
    var t = el.textContent || "";
    var m = /^(\D*)(\d+)(\D*)$/.exec(t); // skip compound values like "1h 2m" or "0/6"
    if (!m) return;
    var pre = m[1], num = parseInt(m[2], 10), suf = m[3];
    if (!num || num > 1000000) return;
    el.__mBusy = true;
    var dur = 900, start = null;
    el.textContent = pre + "0" + suf;
    (function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var v = Math.round((1 - Math.pow(1 - p, 3)) * num);
      el.textContent = pre + v + suf;
      if (p < 1) requestAnimationFrame(step);
      else {
        // Settle. Keep __mBusy set through the next macrotask so the MutationObserver
        // callback queued by this final write is ignored (else it re-triggers forever).
        el.textContent = pre + num + suf;
        setTimeout(function () { el.__mBusy = false; }, 40);
      }
    })(null);
  }

  function growBars(root) {
    if (reduce) return;
    var bars = [];
    if (root.matches && root.matches(".bar-fill,.activity-bar")) bars.push(root);
    if (root.querySelectorAll) {
      var b = root.querySelectorAll(".bar-fill,.activity-bar");
      for (var i = 0; i < b.length; i++) bars.push(b[i]);
    }
    for (var j = 0; j < bars.length; j++) {
      var bar = bars[j];
      if (bar.__mGrown) continue;
      bar.__mGrown = true;
      var isH = bar.classList.contains("activity-bar");
      var prop = isH ? "height" : "width";
      var target = bar.style[prop];
      if (!target || target === "0%") continue;
      bar.style.transition = "none";
      bar.style[prop] = "0%";
      (function (el, pr, tgt) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.style.transition = ""; el.style[pr] = tgt; });
        });
      })(bar, prop, target);
    }
  }

  /* ---- 4. boot gating ---- */
  var hadBoot = false;

  function powerOn() {
    if (reduce || !hadBoot) return;
    var f = document.createElement("div");
    f.id = "m-power";
    document.body.appendChild(f);
    setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); }, 820);
  }

  function bootDone() {
    if (booted) return;
    booted = true;
    powerOn();
    if (waiting.length) { var w = waiting; waiting = []; flushBatch(w); }
  }

  function boot() {
    tagAll(document.body);
    if (!document.getElementById("bt-screen")) { bootDone(); return; }
    hadBoot = true;
    var watch = new MutationObserver(function () {
      if (!document.getElementById("bt-screen")) { watch.disconnect(); bootDone(); }
    });
    watch.observe(document.body, { childList: true });
    setTimeout(function () { watch.disconnect(); bootDone(); }, 9000);
  }

  /* ---- 5. watch for dynamically-added content ---- */
  var mo = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var added = muts[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        if (added[j].nodeType === 1) tagAll(added[j]);
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* ---- 6. public API ---- */
  window.Motion = {
    refresh: function () { tagAll(document.body); },
    reveal: function (el) { tagAll(el); },
    countUp: maybeCount,
    lerp: function (a, b, t) { return a + (b - a) * t; },
    easeOutCubic: function (t) { return 1 - Math.pow(1 - t, 3); },
    reduce: reduce
  };
})();