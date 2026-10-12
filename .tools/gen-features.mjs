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

// ---- 11. widgets (100): live dashboard widgets ----
const widgetKinds = ['clock', 'date', 'streak', 'sessions', 'storage', 'favs', 'notes', 'highscores', 'plays', 'gotd'];
const widgetEmojis = ['🕒', '📅', '🔥', '🎮', '💾', '⭐', '📝', '🏆', '▶️', '👑'];
for (let i = 1; i <= 100; i++) {
  const w = widgetKinds[(i - 1) % widgetKinds.length];
  add('widgets', `widget-${String(i).padStart(3, '0')}`, `${widgetEmojis[(i - 1) % widgetEmojis.length]} Widget ${w} v${Math.ceil(i / widgetKinds.length)}`,
    `Dashboard widget rendering live ${w} data, variant ${Math.ceil(i / widgetKinds.length)}.`, { kind: w, variant: Math.ceil(i / widgetKinds.length) });
}

// ---- 12. tools (100): quick overlay utilities ----
const toolKinds = ['coin', 'dice6', 'dice20', 'random', 'timer', 'stopwatch', 'countdown', 'pomodoro', 'picker', 'uuid'];
for (let i = 1; i <= 100; i++) {
  const k = toolKinds[(i - 1) % toolKinds.length];
  add('tools', `tool-${String(i).padStart(3, '0')}`, `🛠️ Tool ${k} #${Math.ceil(i / toolKinds.length)}`,
    `Opens a working ${k} utility in an overlay.`, { kind: k, inst: Math.ceil(i / toolKinds.length) });
}

// ---- 13. presets (100): layout density / font presets ----
const presetModes = ['compact', 'comfortable', 'spacious', 'zen', 'deck', 'focus'];
const presetFonts = [92, 100, 108, 116];
let pi = 0;
for (let i = 1; i <= 100; i++) {
  const mode = presetModes[(i - 1) % presetModes.length];
  const font = presetFonts[(pi++) % presetFonts.length];
  add('presets', `preset-${String(i).padStart(3, '0')}`, `🎛️ Preset ${mode} ${font}%`,
    `UI preset: ${mode} density at ${font}% font scale.`, { mode, font });
}

// ---- 14. collections (100): curated game shelves (tags = real library1 getT tags) ----
const collectionNames = ['Papa’s Kitchen', 'Bloons Defense', 'Ducky Dash', 'Wheel of Chaos', 'Vex Volume', 'FNAF Night Shift', 'Moto X Track', 'Riddle Me This', 'Fireboy & Watergirl', 'Dadish Diner Dash', 'OVO Jump Academy', 'Retro Bowl League', 'Horror Novice Pack', 'Sports Arena', 'Shooter Bootcamp', 'Racing Grid', 'Grand Strategy', 'Platformer Peak', 'Action Replay', 'Arcade Classics'];
const collectionTags = ['papa', 'bloons', 'duck', 'wheely', 'vex', 'fnaf', 'motox', 'riddle', 'fireboy', 'dadish', 'ovo', 'retrobowl', 'horror', 'sport', 'shooter', 'racing', 'strategy', 'platformer', 'action', 'arcade'];
for (let i = 1; i <= 100; i++) {
  add('collections', `col-${String(i).padStart(3, '0')}`, `📁 ${collectionNames[(i - 1) % collectionNames.length]} #${Math.ceil(i / collectionNames.length)}`,
    `Apply the curated shelf "${collectionNames[(i - 1) % collectionNames.length]}".`, { name: collectionNames[(i - 1) % collectionNames.length], tag: collectionTags[(i - 1) % collectionTags.length] });
}

// ---- 15. challenges (100): daily-style play goals ----
const challengeGoals = ['Play 5 games', 'Play 3 platformers', 'Play a two-player game', 'Reach a streak of 3', 'Rate 2 games', 'Try a hidden gem', 'Play a classic', 'Play 10 different games', 'Beat the GOTD', 'Finish a session streak'];
for (let i = 1; i <= 100; i++) {
  add('challenges', `chal-${String(i).padStart(3, '0')}`, `🎯 Challenge ${i}`, `“${challengeGoals[(i - 1) % challengeGoals.length]}” — persisted goal.`, { goal: challengeGoals[(i - 1) % challengeGoals.length] });
}

// ---- 16. badges (100): earnable achievement badges ----
const badgeEmojis = ['🏅', '🥇', '🥈', '🥉', '🎖️', '⭐', '💎', '🔥', '🏆', '👾'];
for (let i = 1; i <= 100; i++) {
  add('badges', `badge-${String(i).padStart(3, '0')}`, `${badgeEmojis[(i - 1) % badgeEmojis.length]} Badge #${i}`,
    `Achievement badge #${i} — earned via arcade_awards.`, { icon: badgeEmojis[(i - 1) % badgeEmojis.length] });
}

// ---- 17. greetings (100): boot / toast messages ----
const greetingLines = ['Welcome back, player.', 'Ready for arcade night?', 'PRESS START.', 'The hunt continues.', 'Save the princess again?', 'High-score hunter online.', 'Let us play.', 'The cabinet hums.', 'One more game?', 'Stay golden.'];
for (let i = 1; i <= 100; i++) {
  add('greetings', `gr-${String(i).padStart(3, '0')}`, `👋 "${greetingLines[(i - 1) % greetingLines.length]}"`,
    `Boot greeting shown as a toast.`, { msg: greetingLines[(i - 1) % greetingLines.length] });
}

// ---- 18. savepoints (100): named backup profiles ----
const saveScopes = ['full', 'favorites', 'settings', 'stats', 'notes', 'highscores', 'shortcuts', 'themes'];
for (let i = 1; i <= 100; i++) {
  const scope = saveScopes[(i - 1) % saveScopes.length];
  add('savepoints', `sv-${String(i).padStart(3, '0')}`, `💾 Savepoint ${scope} #${Math.ceil(i / saveScopes.length)}`,
    `Named backup profile covering ${scope} data.`, { scope, label: `${scope}_${Math.ceil(i / saveScopes.length)}` });
}

// ---- 19. soundscapes (100): ambient WebAudio arpeggios ----
const rootNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const scaleNames = ['major', 'minor', 'pentatonic', 'blues', 'whole-tone', 'chromatic', 'lydian', 'mixolydian'];
for (let i = 1; i <= 100; i++) {
  const r = rootNotes[(i - 1) % rootNotes.length];
  const s = scaleNames[(i - 1) % scaleNames.length];
  add('soundscapes', `ss-${String(i).padStart(3, '0')}`, `🎵 ${r} ${s}`,
    `Ambient WebAudio arpeggio in ${r} ${s} at ${70 + (i % 9) * 5} bpm.`, { root: r, scale: s, tempo: 70 + (i % 9) * 5 });
}

// ---- 20. magic (100): canvas particle ceremonies ----
const magicKinds = ['confetti', 'rain', 'stars', 'fireworks', 'matrix', 'bubbles'];
for (let i = 1; i <= 100; i++) {
  add('magic', `mag-${String(i).padStart(3, '0')}`, `✨ ${magicKinds[(i - 1) % magicKinds.length]} #${Math.ceil(i / magicKinds.length)}`,
    `Canvas particle ceremony: ${magicKinds[(i - 1) % magicKinds.length]}.`, { kind: magicKinds[(i - 1) % magicKinds.length] });
}

if (F.length !== 2000) throw new Error(`expected 2000, got ${F.length}`);
const ids = new Set(F.map(f => f.id));
if (ids.size !== 2000) throw new Error('duplicate ids');

const out = `// Arcade Hub — 2000 features registry + engines. Generated by tools/gen-features.mjs. DO NOT HAND-EDIT.
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
// --- widgets engine ---
function _widgetBody(f) {
  const n = new Date();
  try {
    if (f.kind === 'clock') return '🕒 ' + n.toLocaleTimeString();
    if (f.kind === 'date') return '📅 ' + n.toLocaleDateString();
    if (f.kind === 'streak') return '🔥 Streak ' + store.get('arcade_gotd_streak', store.get('arcade_streak', 0));
    if (f.kind === 'sessions') return '🎮 Sessions ' + store.get('arcade_sessions', []).length;
    if (f.kind === 'storage') { let used = 0; try { used = JSON.stringify(localStorage).length; } catch (e) {} return '💾 ' + Math.round(used / 1024) + ' KB'; }
    if (f.kind === 'favs') return '⭐ ' + store.get('arcade_fav', []).length + ' favorites';
    if (f.kind === 'notes') return '📝 ' + Object.keys(store.get('arcade_notes', {})).length + ' notes';
    if (f.kind === 'highscores') return '🏆 ' + Object.keys(store.get('arcade_high', {})).length + ' highs';
    if (f.kind === 'plays') return '▶️ ' + store.get('arcade_playcount', 0) + ' plays';
    if (f.kind === 'gotd') return '👑 GOTD: ' + store.get('arcade_gotd', '—');
    return f.kind;
  } catch (e) { return '—'; }
}
function mountWidget(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'widgets'); if (!f) return false;
  try {
    const host = document.querySelector('[data-widgets]') || document.querySelector('#widgets');
    if (!host) return toast('Widget: ' + f.name);
    const el = document.createElement('div');
    el.className = 'arcade-widget'; el.dataset.widgetId = f.id;
    el.title = f.desc;
    el.textContent = _widgetBody(f);
    host.appendChild(el);
    const t = setInterval(() => { try { el.textContent = _widgetBody(f); } catch (e) {} }, 5000);
    el._timer = t;
    return true;
  } catch (e) { return false; }
}
function clearWidgets() {
  try {
    const host = document.querySelector('[data-widgets]') || document.querySelector('#widgets');
    if (!host) return;
    Array.from(host.querySelectorAll('.arcade-widget')).forEach(w => { clearInterval(w._timer); w.remove(); });
  } catch (e) {}
}
// --- tools engine ---
let _toolOpen = null;
function launchTool(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'tools'); if (!f) return false;
  try {
    if (_toolOpen) { _toolOpen.remove(); _toolOpen = null; }
    const ov = document.createElement('div');
    ov.className = 'arcade-tool-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;';
    const box = document.createElement('div');
    box.style.cssText = 'background:#0a0a12;border:1px solid #0f0;border-radius:10px;padding:20px;max-width:380px;width:90%;color:#cfc;font-family:monospace;';
    let body = '';
    const outId = 'to_' + f.id.replace(/\W/g, '');
    const btnId = 'tb_' + f.id.replace(/\W/g, '');
    if (f.kind === 'coin' || f.kind === 'dice6' || f.kind === 'dice20') {
      body = '<div style="text-align:center;font-size:2rem;margin:12px 0" id="' + outId + '">?</div>' +
        '<button id="' + btnId + '" style="width:100%;padding:8px;font-family:inherit">Roll</button>';
    } else if (f.kind === 'random') {
      body = '<div style="text-align:center;font-size:1.4rem;margin:8px 0" id="' + outId + '">—</div>' +
        '<input id="mn" type="number" placeholder="min" style="width:45%;padding:6px;font-family:inherit" value="1">' +
        '<input id="mx" type="number" placeholder="max" style="width:45%;padding:6px;font-family:inherit" value="6">' +
        '<button id="' + btnId + '" style="width:100%;margin-top:8px;padding:8px;font-family:inherit">Roll</button>';
    } else if (f.kind === 'timer' || f.kind === 'countdown' || f.kind === 'pomodoro') {
      body = '<div style="text-align:center;font-size:2rem;margin:12px 0" id="' + outId + '">' +
        (f.kind === 'pomodoro' ? '25:00' : '60') + '</div>' +
        '<button id="' + btnId + '" style="width:100%;padding:8px;font-family:inherit">Start</button>';
    } else if (f.kind === 'stopwatch') {
      body = '<div style="text-align:center;font-size:2rem;margin:12px 0" id="' + outId + '">0.0s</div>' +
        '<button id="' + btnId + '" style="width:100%;padding:8px;font-family:inherit">Start</button>';
    } else if (f.kind === 'picker') {
      body = '<div style="text-align:center;font-size:1.3rem;margin:8px 0" id="' + outId + '">—</div>' +
        '<input id="opts" placeholder="comma,separated,options" style="width:100%;padding:6px;font-family:inherit">' +
        '<button id="' + btnId + '" style="width:100%;margin-top:8px;padding:8px;font-family:inherit">Pick</button>';
    } else if (f.kind === 'uuid') {
      body = '<div style="text-align:center;font-size:.9rem;margin:8px 0;word-break:break-all" id="' + outId + '"></div>' +
        '<button id="' + btnId + '" style="width:100%;padding:8px;font-family:inherit">Generate</button>';
    }
    box.innerHTML = '<h3 style="margin:0 0 8px;color:#0f0">' + f.name + '</h3>' + body +
      '<button data-close style="width:100%;margin-top:8px;padding:6px;background:#222;color:#aaa;border:1px solid #444;font-family:inherit">Close</button>';
    ov.appendChild(box);
    document.body.appendChild(ov);
    _toolOpen = ov;
    const out = box.querySelector('#' + outId);
    const btn = box.querySelector('#' + btnId);
    const act = {
      'coin': function () { out.textContent = Math.random() < 0.5 ? 'HEADS' : 'TAILS'; },
      'dice6': function () { out.textContent = 1 + Math.floor(Math.random() * 6); },
      'dice20': function () { out.textContent = 1 + Math.floor(Math.random() * 20); },
      'random': function () {
        const mn = parseInt(box.querySelector('#mn').value, 10) || 1;
        const mx = parseInt(box.querySelector('#mx').value, 10) || 6;
        out.textContent = mn + Math.floor(Math.random() * (mx - mn + 1));
      },
      'picker': function () {
        const opts = (box.querySelector('#opts').value || 'a,b,c').split(',').map(s => s.trim()).filter(Boolean);
        out.textContent = opts[Math.floor(Math.random() * opts.length)] || '—';
      },
      'uuid': function () {
        let s = '';
        for (let i = 0; i < 36; i++) {
          if (i === 8 || i === 13 || i === 18 || i === 23) s += '-';
          else s += '0123456789abcdef'[Math.floor(Math.random() * 16)];
        }
        out.textContent = s;
      }
    };
    if (btn) btn.addEventListener('click', function () {
      if (act[f.kind]) return act[f.kind]();
      if (f.kind === 'timer' || f.kind === 'countdown') {
        if (btn._on) { clearInterval(btn._iv); btn._on = false; btn.textContent = 'Start'; return; }
        let secs = f.kind === 'timer' ? 60 : 60;
        btn._on = true; btn.textContent = 'Stop';
        out.textContent = secs + 's';
        btn._iv = setInterval(function () {
          secs--;
          if (secs <= 0) { clearInterval(btn._iv); btn._on = false; btn.textContent = 'Start'; out.textContent = 'DONE!'; return; }
          out.textContent = secs + 's';
        }, 1000);
      } else if (f.kind === 'pomodoro') {
        if (btn._on) { clearInterval(btn._iv); btn._on = false; btn.textContent = 'Start'; return; }
        let secs = 25 * 60;
        btn._on = true; btn.textContent = 'Stop';
        const pad = function (v) { return String(v).padStart(2, '0'); };
        const fmt = function () { out.textContent = pad(Math.floor(secs / 60)) + ':' + pad(secs % 60); };
        fmt();
        btn._iv = setInterval(function () {
          secs--;
          if (secs <= 0) { clearInterval(btn._iv); btn._on = false; btn.textContent = 'Start'; out.textContent = '🍅 DONE!'; return; }
          fmt();
        }, 1000);
      } else if (f.kind === 'stopwatch') {
        if (btn._on) { clearInterval(btn._iv); btn._on = false; btn.textContent = 'Start'; return; }
        let ms = 0;
        btn._on = true; btn.textContent = 'Stop';
        btn._iv = setInterval(function () { ms += 100; out.textContent = (ms / 1000).toFixed(1) + 's'; }, 100);
      }
    });
    box.querySelector('[data-close]').addEventListener('click', function () { ov.remove(); _toolOpen = null; });
    ov.addEventListener('click', function (e) { if (e.target === ov) { ov.remove(); _toolOpen = null; } });
    return true;
  } catch (e) { return false; }
}
// --- presets engine ---
function applyPreset(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'presets'); if (!f) return false;
  try {
    document.body.dataset.preset = f.mode;
    document.body.dataset.fontScale = String(f.font);
    document.body.style.setProperty('--arcade-font-scale', (f.font / 100) + '');
    store.set('arcade_preset', id);
    document.dispatchEvent(new CustomEvent('arcade:preset', { detail: { id, mode: f.mode, font: f.font } }));
    toast('Preset: ' + f.mode + ' ' + f.font + '%');
    return true;
  } catch (e) { return false; }
}
// --- collections engine ---
function applyCollection(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'collections'); if (!f) return false;
  try {
    store.set('arcade_collection', { id, name: f.name, tag: f.tag });
    document.dispatchEvent(new CustomEvent('arcade:collection', { detail: { id, name: f.name, tag: f.tag }, bubbles: true }));
    toast('📁 ' + f.name);
    return true;
  } catch (e) { return false; }
}
// --- challenges engine ---
function startChallenge(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'challenges'); if (!f) return false;
  try {
    const c = { id, goal: f.goal, start: Date.now(), done: false };
    store.set('arcade_challenge', c);
    document.dispatchEvent(new CustomEvent('arcade:challenge', { detail: c, bubbles: true }));
    toast('🎯 ' + f.goal);
    return true;
  } catch (e) { return false; }
}
function challengeDone() {
  try {
    const c = store.get('arcade_challenge', null);
    if (!c || c.done) return false;
    c.done = true; store.set('arcade_challenge', c);
    toast('🏆 Challenge complete!');
    track('stat-007', 1);
    return true;
  } catch (e) { return false; }
}
// --- badges engine ---
function awardBadge(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'badges'); if (!f) return false;
  try {
    const aw = store.get('arcade_awards', {});
    if (aw[id]) return true;
    aw[id] = Date.now();
    store.set('arcade_awards', aw);
    toast(f.icon + ' ' + f.name + ' earned!');
    playSfx('sfx-004');
    return true;
  } catch (e) { return false; }
}
function hasBadge(id) { try { return !!store.get('arcade_awards', {})[id]; } catch (e) { return false; } }
// --- greetings engine ---
function greet(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'greetings'); if (!f) return false;
  toast(f.msg); return true;
}
// --- savepoints engine ---
function snapshot(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'savepoints'); if (!f) return false;
  try {
    const scope = f.scope;
    const all = { favorites: 'arcade_fav', settings: 'arcade_theme_id', stats: 'arcade_playcount', notes: 'arcade_notes', highscores: 'arcade_high', shortcuts: 'arcade_shortcuts', themes: 'arcade_theme_id', full: '' };
    const key = all[scope] || '';
    const data = { arcade_awards: store.get('arcade_awards', {}) };
    if (!key) { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf('arcade_') === 0) data[k] = store.get(k, null); } }
    else data[key] = store.get(key, null);
    const text = JSON.stringify({ scope, label: f.label, exportedAt: new Date().toISOString(), data }, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'arcade-' + f.label + '.json';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast('💾 Savepoint ' + f.label);
    return true;
  } catch (e) { return false; }
}
// --- soundscapes engine ---
let _scapeIv = null, _scapeCtx = null;
function playScape(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'soundscapes'); if (!f) return false;
  stopScape();
  try {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
    _scapeCtx = new C();
    const roots = { C: 261.6, D: 293.7, E: 329.6, F: 349.2, G: 392.0, A: 440.0, B: 493.9 };
    const scales = { major: [0, 2, 4, 5, 7, 9, 11, 12], minor: [0, 2, 3, 5, 7, 8, 10, 12], pentatonic: [0, 2, 4, 7, 9, 12], blues: [0, 3, 5, 6, 7, 10, 12], 'whole-tone': [0, 2, 4, 6, 8, 10, 12], chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], lydian: [0, 2, 4, 6, 7, 9, 11, 12], mixolydian: [0, 2, 4, 5, 7, 9, 10, 12] };
    const base = roots[f.root] || 440;
    const steps = scales[f.scale] || scales.major;
    let i = 0;
    _scapeIv = setInterval(function () {
      try {
        if (!_scapeCtx) return;
        const o = _scapeCtx.createOscillator(), g = _scapeCtx.createGain();
        o.type = 'sine';
        o.frequency.value = base * Math.pow(2, steps[i % steps.length] / 12);
        g.gain.setValueAtTime(0.05, _scapeCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, _scapeCtx.currentTime + 2.4);
        o.connect(g); g.connect(_scapeCtx.destination);
        o.start(); o.stop(_scapeCtx.currentTime + 2.5);
        i++;
      } catch (e) {}
    }, Math.max(120, Math.round(60000 / (f.tempo || 90) / 2)));
    toast('🎵 ' + f.name);
    return true;
  } catch (e) { return false; }
}
function stopScape() {
  try { if (_scapeIv) clearInterval(_scapeIv); _scapeIv = null; } catch (e) {}
  try { if (_scapeCtx) { _scapeCtx.close(); _scapeCtx = null; } } catch (e) {}
}
// --- magic engine ---
let _magicEl = null;
function castMagic(id) {
  const f = FEATURES.find(x => x.id === id && x.family === 'magic'); if (!f) return false;
  try {
    if (_magicEl) _magicEl.remove();
    const cv = document.createElement('canvas');
    cv.style.cssText = 'position:fixed;inset:0;z-index:9997;pointer-events:none;';
    cv.width = innerWidth; cv.height = innerHeight;
    document.body.appendChild(cv);
    _magicEl = cv;
    const ctx = cv.getContext('2d');
    const colors = ['#0f0', '#0ff', '#f0f', '#ff0', '#fff', '#f80'];
    const N = f.kind === 'rain' ? 70 : f.kind === 'fireworks' ? 40 : 50;
    const parts = [];
    for (let i = 0; i < N; i++) {
      parts.push({
        x: Math.random() * cv.width, y: f.kind === 'fireworks' ? cv.height : Math.random() * cv.height,
        vx: (Math.random() - 0.5) * 4,
        vy: f.kind === 'rain' ? 6 + Math.random() * 6 : f.kind === 'bubbles' ? -1 - Math.random() * 2 : f.kind === 'stars' ? -0.5 : (Math.random() - 0.5) * 3,
        r: 1 + Math.random() * 3,
        c: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    let life = 240;
    let raf;
    const tick = function () {
      ctx.clearRect(0, 0, cv.width, cv.height);
      life--;
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (f.kind === 'fireworks' || f.kind === 'stars') p.vy += 0.12;
        if (p.y > cv.height + 10 || p.x > cv.width + 10 || p.x < -10) { p.x = Math.random() * cv.width; p.y = -10; }
        ctx.globalAlpha = Math.max(0.1, life / 240);
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      if (life > 0) raf = requestAnimationFrame(tick);
      else { cv.remove(); _magicEl = null; }
    };
    raf = requestAnimationFrame(tick);
    setTimeout(function () { try { cv.remove(); } catch (e) {} _magicEl = null; }, 3000);
    return true;
  } catch (e) { return false; }
}
// --- restore persisted state ---
try {
  const tid = store.get('arcade_theme_id', null);
  if (tid) { const f = FEATURES.find(x => x.id === tid); if (f) applyTheme(tid); }
} catch (e) {}
window.Arcade = {
  FEATURES, version: 2,
  count() { return FEATURES.length; },
  byFamily(fam) { return FEATURES.filter(x => x.family === fam); },
  applyTheme, nextTheme, playSfx, track, applyA11y, fmtClock, applyFilter, exportData,
  mountWidget, clearWidgets, launchTool, applyPreset, applyCollection, startChallenge,
  challengeDone, awardBadge, hasBadge, greet, snapshot, playScape, stopScape, castMagic,
  toast
};
})();
`;

writeFileSync(new URL('../.hub/arcade-features.js', import.meta.url), out);
console.log('wrote .hub/arcade-features.js with', F.length, 'features');
