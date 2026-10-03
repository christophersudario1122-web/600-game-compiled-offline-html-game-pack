// Generator for .hub/arcade-features.js — 10 families x 100 entries = 1000 features.
// Run: node tools/gen-features.mjs
import { writeFileSync } from 'node:fs';

const F = [];
const add = (family, id, name, desc, p = {}) => F.push({ family, id, name, desc, ...p });

// ---- 1. shortcuts (100): key combo -> action ----
const shortcutActions = ['nav-library','nav-hub','nav-settings','nav-stats','nav-notes','nav-snake','nav-sound','nav-secrets','nav-calc','nav-shortcuts','theme-next','theme-prev','search-focus','search-clear','sort-cycle','filter-fav','filter-recent','random-game','fullscreen','mute-toggle','cheatsheet','stats-overlay','export-data','clock-toggle','matrix-toggle'];
const modSets = ['', 'Shift+', 'Alt+', 'Ctrl+', 'Ctrl+Shift+'];
const keyPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
let si = 0;
outer1: for (const m of modSets) for (const k of keyPool) {
  if (si >= 100) break outer1;
  const action = shortcutActions[si % shortcutActions.length];
  si++;
  add('shortcuts', `shortcut-${String(si).padStart(3, '0')}`, `Shortcut ${m}${k} → ${action}`,
    `Keyboard shortcut ${m ? m.replace('+', ' + ') : ''}${k} triggers ${action}.`, { keys: `${m}${k}`, action });
}

// ---- 2. themes (100): full palettes, hue-rotated ----
for (let i = 1; i <= 100; i++) {
  const hue = Math.round(((i - 1) * 360) / 100);
  const hue2 = (hue + 140) % 360;
  add('themes', `theme-${String(i).padStart(3, '0')}`, `Theme #${i} Neon-${hue}°`,
    `Full palette theme with ${hue}° primary and ${hue2}° accent hues.`,
    { palette: { '--neon-green': `hsl(${hue},100%,60%)`, '--neon-cyan': `hsl(${hue2},100%,60%)`, '--neon-pink': `hsl(${(hue + 300) % 360},100%,65%)`, '--bg0': '#050508', '--bg1': '#0a0a12', '--ink': '#e8fff2' } });
}

// ---- 3. sfx (100): WebAudio synth presets ----
const waveTypes = ['square', 'sawtooth', 'triangle', 'sine'];
const sfxUses = ['hover', 'click', 'launch', 'win', 'lose', 'coin', 'jump', 'hit', 'select', 'back'];
for (let i = 1; i <= 100; i++) {
  add('sfx', `sfx-${String(i).padStart(3, '0')}`, `SFX #${i} ${sfxUses[(i - 1) % sfxUses.length]}-${waveTypes[(i - 1) % waveTypes.length]}`,
    `Synthesized UI sound for ${sfxUses[(i - 1) % sfxUses.length]} events.`,
    { freq: 180 + ((i * 37) % 880), dur: 0.05 + ((i * 13) % 40) / 200, type: waveTypes[(i - 1) % waveTypes.length], use: sfxUses[(i - 1) % sfxUses.length] });
}

// ---- 4. gamepad (100): button combo -> action ----
const padBtns = ['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'Start', 'Select', 'L3', 'R3', 'Up', 'Down', 'Left', 'Right'];
for (let i = 1; i <= 100; i++) {
  const b1 = padBtns[(i - 1) % padBtns.length];
  const b2 = padBtns[(i * 5) % padBtns.length];
  const combo = i % 3 === 0 ? `${b1}+${b2}` : b1;
  const action = shortcutActions[i % shortcutActions.length];
  add('gamepad', `pad-${String(i).padStart(3, '0')}`, `Gamepad ${combo} → ${action}`,
    `Gamepad combo ${combo} triggers ${action}.`, { combo, action });
}

// ---- 5. stats (100): tracked counters ----
const statDomains = ['plays', 'wins', 'launches', 'visits', 'unlocks', 'favorites', 'ratings', 'notes', 'sessions', 'streaks'];
for (let i = 1; i <= 100; i++) {
  const domain = statDomains[(i - 1) % statDomains.length];
  add('stats', `stat-${String(i).padStart(3, '0')}`, `Stat ${domain} #${Math.ceil(i / statDomains.length)}`,
    `Persistent counter for ${domain} slice ${Math.ceil(i / statDomains.length)}.`, { key: `arcade_stat_${domain}_${Math.ceil(i / statDomains.length)}`, domain });
}

// ---- 6. a11y (100): accessibility adjustments ----
const a11yKinds = ['font-plus', 'font-minus', 'contrast', 'spacing', 'lineheight', 'focus-ring', 'motion-safe', 'dyslexia-font', 'underline-links', 'grayscale'];
for (let i = 1; i <= 100; i++) {
  const kind = a11yKinds[(i - 1) % a11yKinds.length];
  add('a11y', `a11y-${String(i).padStart(3, '0')}`, `A11y ${kind} step ${Math.ceil(i / a11yKinds.length)}`,
    `Accessibility adjustment ${kind}, magnitude step ${Math.ceil(i / a11yKinds.length)}.`, { kind, step: Math.ceil(i / a11yKinds.length) });
}

// ---- 7. clocks (100): date/time format presets ----
const clockStyles = ['full', 'long', 'medium', 'short'];
for (let i = 1; i <= 100; i++) {
  const dateStyle = clockStyles[(i - 1) % clockStyles.length];
  const timeStyle = clockStyles[(i * 3) % clockStyles.length];
  const hour12 = i % 2 === 0;
  add('clocks', `clock-${String(i).padStart(3, '0')}`, `Clock ${dateStyle}/${timeStyle} ${hour12 ? '12h' : '24h'} #${Math.ceil(i / 8)}`,
    `Date/time readout preset, ${hour12 ? '12' : '24'}-hour.`, { dateStyle, timeStyle, hour12 });
}

// ---- 8. filters (100): library filter/sort presets ----
const sortModes = ['az', 'za', 'recent', 'played', 'rated', 'random'];
for (let i = 1; i <= 100; i++) {
  const sort = sortModes[(i - 1) % sortModes.length];
  const tag = ['all', 'fav', 'recent', 'top-rated', 'unplayed'][i % 5];
  add('filters', `filter-${String(i).padStart(3, '0')}`, `Filter ${tag} + sort ${sort} #${Math.ceil(i / 30)}`,
    `Library preset: show ${tag}, sorted ${sort}.`, { tag, sort, q: i % 4 === 0 ? ['arcade', ' retro', 'puzzle', 'racer'][i % 4].trim() : '' });
}

// ---- 9. utils (100): export/backup/session utilities ----
const utilDomains = ['favorites', 'ratings', 'notes', 'playtime', 'settings', 'stats', 'shortcuts', 'themes', 'highscores', 'sessions'];
const utilFormats = ['json', 'csv', 'txt', 'md', 'html', 'yaml', 'xml', 'tsv', 'log', 'bak'];
for (let i = 1; i <= 100; i++) {
  const domain = utilDomains[(i - 1) % utilDomains.length];
  const format = utilFormats[Math.floor((i - 1) / utilDomains.length) % utilFormats.length];
  add('utils', `util-${String(i).padStart(3, '0')}`, `Export ${domain} as ${format.toUpperCase()}`,
    `One-click download of ${domain} data in ${format.toUpperCase()} format.`, { domain, format });
}

// ---- 10. eggs (100): secret code -> celebration ----
const eggEmojis = ['🎉', '👾', '🕹️', '🚀', '🐉', '🍕', '⚡', '🌈', '💎', '🔥'];
for (let i = 1; i <= 100; i++) {
  const code = `upupdowndown${i}leftleftrightright${i % 9}ab${i % 7}`;
  add('eggs', `egg-${String(i).padStart(3, '0')}`, `Secret code #${i} ${eggEmojis[(i - 1) % eggEmojis.length]}`,
    `Hidden code ${code} triggers a celebration.`, { code, emoji: eggEmojis[(i - 1) % eggEmojis.length], msg: `Easter egg #${i} unlocked` });
}

if (F.length !== 1000) throw new Error(`expected 1000, got ${F.length}`);
const ids = new Set(F.map(f => f.id));
if (ids.size !== 1000) throw new Error('duplicate ids');

const out = `// Arcade Hub — 1000 features registry + engines. Generated by tools/gen-features.mjs. DO NOT HAND-EDIT.
// window.Arcade: { FEATURES, count(), byFamily(), applyTheme(), playSfx(), track(), exportData(), ... }
(function () {
'use strict';
const FEATURES = ${JSON.stringify(F, null, 1)};
const $ = (s, r) => (r || document).querySelector(s);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
function toast(msg) {
  try {
    let t = document.getElementById('arcade-toast');
    if (!t) { t = document.createElement('div'); t.id = 'arcade-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.className = 'show';
    clearTimeout(t._h); t._h = setTimeout(() => { t.className = ''; }, 2200);
  } catch (e) {}
}
// --- themes engine ---
function applyTheme(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'themes'); if (!f) return false;
  try {
    const r = document.documentElement.style;
    for (const k of Object.keys(f.palette)) r.setProperty(k, f.palette[k]);
    store.set('arcade_theme_id', id);
    document.dispatchEvent(new CustomEvent('arcade:theme', { detail: { id } }));
    return true;
  } catch (e) { return false; }
}
function nextTheme(dir) {
  const ts = FEATURES.filter(x => x.family === 'themes');
  const cur = store.get('arcade_theme_id', ts[0].id);
  let i = ts.findIndex(x => x.id === cur); if (i < 0) i = 0;
  i = (i + dir + ts.length) % ts.length;
  applyTheme(ts[i].id); toast('Theme: ' + ts[i].name);
}
// --- sfx engine (WebAudio synth) ---
let _ac = null;
function playSfx(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'sfx'); if (!f) return false;
  try {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
    _ac = _ac || new C();
    const o = _ac.createOscillator(), g = _ac.createGain();
    o.type = f.type; o.frequency.value = f.freq;
    g.gain.setValueAtTime(0.12, _ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, _ac.currentTime + f.dur);
    o.connect(g); g.connect(_ac.destination); o.start(); o.stop(_ac.currentTime + f.dur);
    return true;
  } catch (e) { return false; }
}
// --- stats engine ---
function track(id, n) {
  const f = FEATURES.find(x => x.id === id && x.family === 'stats'); if (!f) return false;
  try {
    const v = store.get(f.key, 0) + (n == null ? 1 : n);
    store.set(f.key, v);
    document.dispatchEvent(new CustomEvent('arcade:stat', { detail: { id, value: v } }));
    return true;
  } catch (e) { return false; }
}
// --- a11y engine ---
function applyA11y(id, on) {
  const f = FEATURES.find(x => x.id === id && x.family === 'a11y'); if (!f) return false;
  try {
    const b = document.body, key = 'arcade_' + f.id;
    const enable = on == null ? !(b.dataset[f.id] === '1') : !!on;
    b.dataset[f.id] = enable ? '1' : '0';
    const m = f.step;
    if (f.kind === 'font-plus') b.style.fontSize = enable ? (100 + m * 5) + '%' : '';
    else if (f.kind === 'font-minus') b.style.fontSize = enable ? (100 - m * 5) + '%' : '';
    else if (f.kind === 'contrast') b.style.filter = enable ? 'contrast(' + (100 + m * 10) + '%)' : '';
    else if (f.kind === 'grayscale') b.style.filter = enable ? 'grayscale(100%)' : '';
    else if (f.kind === 'spacing') b.style.letterSpacing = enable ? (m * 0.5) + 'px' : '';
    else if (f.kind === 'lineheight') b.style.lineHeight = enable ? (1.4 + m * 0.1) + '' : '';
    else if (f.kind === 'focus-ring') b.classList.toggle('arcade-focus-ring', enable);
    else if (f.kind === 'motion-safe') b.classList.toggle('arcade-motion-safe', enable);
    else if (f.kind === 'dyslexia-font') b.style.fontFamily = enable ? 'Verdana,Arial,sans-serif' : '';
    else if (f.kind === 'underline-links') b.classList.toggle('arcade-ulinks', enable);
    store.set(key, enable);
    return true;
  } catch (e) { return false; }
}
// --- clocks engine ---
function fmtClock(id, d) {
  const f = FEATURES.find(x => x.id === id && x.family === 'clocks'); if (!f) return '';
  try {
    const dt = d || new Date();
    return new Intl.DateTimeFormat('en-US', { dateStyle: f.dateStyle, timeStyle: f.timeStyle, hour12: f.hour12 }).format(dt);
  } catch (e) { return String(d || new Date()); }
}
// --- filters engine ---
function applyFilter(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'filters'); if (!f) return false;
  try {
    store.set('arcade_filter', { tag: f.tag, sort: f.sort, q: f.q });
    const grid = document.querySelector('[data-game-grid]');
    if (grid) grid.dispatchEvent(new CustomEvent('arcade:filter', { detail: { tag: f.tag, sort: f.sort, q: f.q }, bubbles: true }));
    else toast('Filter: ' + f.name);
    return true;
  } catch (e) { return false; }
}
// --- utils engine (export/download) ---
function escCsv(s) { s = String(s == null ? '' : s); return /[",\\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function serialize(domain, format) {
  const data = { favorites: store.get('arcade_fav', []), ratings: store.get('arcade_ratings', {}), notes: store.get('arcade_notes', {}), playtime: store.get('arcade_playtime', {}), settings: store.get('arcade_settings', {}), stats: store.get('arcade_stats', {}), shortcuts: store.get('arcade_shortcuts', {}), themes: store.get('arcade_theme_id', ''), highscores: store.get('arcade_high', {}), sessions: store.get('arcade_sessions', []) };
  const v = data[domain] == null ? {} : data[domain];
  if (format === 'json' || format === 'bak') return JSON.stringify({ domain, exportedAt: new Date().toISOString(), data: v }, null, 2);
  if (format === 'csv' || format === 'tsv') {
    const sep = format === 'csv' ? ',' : '\\t';
    const rows = [['key', 'value']];
    const obj = (v && typeof v === 'object') ? v : { value: v };
    for (const k of Object.keys(obj)) rows.push([escCsv(k), escCsv(typeof obj[k] === 'object' ? JSON.stringify(obj[k]) : obj[k])]);
    return rows.map(r => r.join(sep)).join('\\n');
  }
  if (format === 'md') return '# Arcade export: ' + domain + '\\n\\nExported ' + new Date().toISOString() + '\\n\\n\\\`\\\`\\\`json\\n' + JSON.stringify(v, null, 2) + '\\n\\\`\\\`\\\`\\n';
  if (format === 'html') return '<!doctype html><html><head><meta charset="utf-8"><title>Arcade export: ' + domain + '</title></head><body><h1>' + domain + '</h1><pre>' + JSON.stringify(v, null, 2).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</pre></body></html>';
  if (format === 'xml' || format === 'yaml' || format === 'log' || format === 'txt') return domain + ' export ' + new Date().toISOString() + '\\n' + JSON.stringify(v, null, 2) + '\\n';
  return JSON.stringify(v);
}
function exportData(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'utils'); if (!f) return false;
  try {
    const text = serialize(f.domain, f.format);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'arcade-' + f.domain + '.' + (f.format === 'bak' ? 'bak.json' : f.format === 'log' ? 'log.txt' : f.format);
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    track('stat-006', 1); toast('Exported ' + f.domain + ' (' + f.format.toUpperCase() + ')');
    return true;
  } catch (e) { return false; }
}
// --- eggs engine ---
let _seq = '';
document.addEventListener('keydown', (e) => {
  try {
    if (e.key && e.key.length === 1) { _seq = (_seq + e.key.toLowerCase()).slice(-64); }
    for (const f of FEATURES) {
      if (f.family !== 'eggs') continue;
      if (_seq.endsWith(f.code)) { _seq = ''; celebrate(f); break; }
    }
  } catch (err) {}
});
function celebrate(f) {
  toast(f.emoji + ' ' + f.msg);
  try { playSfx('sfx-004'); } catch (e) {}
  document.dispatchEvent(new CustomEvent('arcade:egg', { detail: { id: f.id } }));
  track('stat-005', 1);
}
// --- shortcuts engine ---
const ACTIONS = {
  'nav-library': () => { location.href = '.library1.html'; },
  'nav-hub': () => { location.href = '../PRESSHERETOSTART.html'; },
  'nav-settings': () => { location.href = '.settings.html'; },
  'nav-stats': () => { location.href = '.stats.html'; },
  'nav-notes': () => { location.href = '.notes.html'; },
  'nav-snake': () => { location.href = '.snake.html'; },
  'nav-sound': () => { location.href = '.soundboard.html'; },
  'nav-secrets': () => { location.href = '.secrets.html'; },
  'nav-calc': () => { location.href = '.calculator.html'; },
  'nav-shortcuts': () => { location.href = '.shortcuts.html'; },
  'theme-next': () => nextTheme(1), 'theme-prev': () => nextTheme(-1),
  'search-focus': () => { const el = $('input[type="search"],input[name="q"],#search'); if (el) el.focus(); },
  'search-clear': () => { const el = $('input[type="search"],input[name="q"],#search'); if (el) { el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true })); } },
  'sort-cycle': () => applyFilter('filter-001'),
  'filter-fav': () => applyFilter('filter-002'), 'filter-recent': () => applyFilter('filter-003'),
  'random-game': () => { const a = Array.from(document.querySelectorAll('a[href*="games/"],a[href*="offline"]')); if (a.length) { const p = a[Math.floor(Math.random() * a.length)]; toast('Random: ' + (p.textContent || p.href).trim().slice(0, 40)); p.click(); } },
  'fullscreen': () => { try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); } catch (e) {} },
  'mute-toggle': () => { try { const m = store.get('arcade_mute', false); store.set('arcade_mute', !m); toast(m ? 'Unmuted' : 'Muted'); } catch (e) {} },
  'cheatsheet': () => { try { if (window.showCheatsheet) window.showCheatsheet(); } catch (e) {} },
  'stats-overlay': () => { try { if (window.toggleStatsOverlay) window.toggleStatsOverlay(); } catch (e) {} },
  'export-data': () => exportData('util-001'),
  'clock-toggle': () => { try { document.body.classList.toggle('arcade-clock'); } catch (e) {} },
  'matrix-toggle': () => { try { document.body.classList.toggle('arcade-matrix'); } catch (e) {} }
};
function normEv(e) {
  let s = '';
  if (e.ctrlKey) s += 'Ctrl+'; if (e.shiftKey) s += 'Shift+'; if (e.altKey) s += 'Alt+';
  const k = (e.key || '').length === 1 ? e.key.toUpperCase() : e.key;
  return s + k;
}
document.addEventListener('keydown', (e) => {
  try {
    if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '')) return;
    const combo = normEv(e);
    const f = FEATURES.find(x => x.family === 'shortcuts' && x.keys === combo);
    if (f && ACTIONS[f.action]) { e.preventDefault(); ACTIONS[f.action](); track('stat-010', 1); }
  } catch (err) {}
});
// --- gamepad engine (poll; edge-trigger) ---
let _padPrev = [];
setInterval(() => {
  try {
    const gps = (navigator.getGamepads ? Array.from(navigator.getGamepads()) : []).filter(Boolean);
    if (!gps.length) return;
    const g = gps[0];
    const pressed = g.buttons.map((b, i) => (b && b.pressed) ? i : -1).filter(i => i >= 0);
    const prevKey = _padPrev.join(',');
    const curKey = pressed.join(',');
    _padPrev = pressed;
    if (!curKey || curKey === prevKey) return;
    const label = pressed.map(i => ['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'Start', 'Select', 'L3', 'R3', 'Up', 'Down', 'Left', 'Right'][i] || ('B' + i)).join('+');
    const f = FEATURES.find(x => x.family === 'gamepad' && x.combo === label);
    if (f && ACTIONS[f.action]) ACTIONS[f.action]();
  } catch (e) {}
}, 250);
// --- restore persisted state ---
try {
  const tid = store.get('arcade_theme_id', null);
  if (tid) { const f = FEATURES.find(x => x.id === tid); if (f) applyTheme(tid); }
} catch (e) {}
window.Arcade = {
  FEATURES, version: 1,
  count() { return FEATURES.length; },
  byFamily(fam) { return FEATURES.filter(x => x.family === fam); },
  applyTheme, nextTheme, playSfx, track, applyA11y, fmtClock, applyFilter, exportData,
  toast
};
})();
`;

writeFileSync(new URL('../.hub/arcade-features.js', import.meta.url), out);
console.log('wrote .hub/arcade-features.js with', F.length, 'features');
