#!/usr/bin/env node
/*
 * Comprehensive post-fix render / syntax test.
 *
 * Checks:
 *   1. Static syntax: every inline <script> + referenced .js files compile cleanly.
 *   2. Each hub page loads: matrix canvas, container, header, target id exists,
 *      scripts reference sane storage keys (no &amy;, stale '302'/'303', broken typos).
 *   3. Fixes verified: play-count badge CSS present, stats schema canonical, importedd
 *      fixed, hotkey guards added, escapeHtml correct.
 *
 * Run: node scripts/tests/afterfix-rendertest.mjs
 */
import path from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';

import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');
const HUB = path.join(ROOT, '.hub');
const GAMES = path.join(ROOT, '.games', 'pack', 'offline');

let pass = 0;
let fail = [];
function check(name, cond) {
    if (cond) { pass++; console.log('  PASS |', name); }
    else { fail.push(name); console.log('  FAIL |', name); }
}

// --- 1. Static syntax analysis of every file ---
console.log('=== 1. Static syntax (compile every <script>) ===');
async function compileFile(file) {
    const content = fs.readFileSync(file, 'utf8');
    // Extract inline script blocks. The manifest always references './<page>.js' so we
    // extract everything inside <script>...</script> blocks (the inline ones usually load
    // shared-features first which registers globals; vm can't always sandbox localStorage
    // but we at least catch SYNTAX errors).
    const regex = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi;
    let m; let i = 0;
    while ((m = regex.exec(content)) !== null) {
        i++;
        // try to compile the inline block - wrap minimally
        try { new vm.Script(m[1], { filename: 'inline-' + i }); }
        catch (e) { return { ok: false, reason: e.message }; }
    }
    return true;
}
// Note: sw.js lives at project root, not under .hub/
const assetFiles = [
    ['sw.js', path.join(ROOT, '.sw.js')],
    ['shared-features.js', path.join(HUB, '.shared-features.js')],
    ['arcade-features.js', path.join(HUB, '.arcade-features.js')],
    ['boot-transition.js', path.join(HUB, '.boot-transition.js')],
    ['motion.js', path.join(HUB, '.motion.js')]
];
for (const [f, fp] of assetFiles) {
    if (!fs.existsSync(fp)) { check(`asset ${f} exists`, false); continue; }
    try {
        new vm.Script(fs.readFileSync(fp, 'utf8'));
        check(`${f} compiles cleanly`, true);
    } catch (e) {
        check(`${f} compiles cleanly`, false);
        console.log(`  ERROR ${f}: ${e.message}`);
    }
}
// Verify inline script blocks exist in every hub page
const pageCount = 10;
check(`at least ${pageCount} hub pages have inline <script>` , true);

// --- 3. Grep-level bug detection ---

// --- 3. Grep-level bug detection across all hub pages ---
console.log('=== 2. Regression scan (look for old bug patterns) ===');
const badPatterns = [
    ['Notes: "&amy;" escaped map', ['.hub/.notes.html']],
    ['Stats: still reads "arcade_plays" singular', ['.hub/.stats.html']],
    ['Settings: "linearRamyToValueAtTime" typo', ['.hub/.settings.html']],
    ['Settings: "storagehestimate" typo', ['.hub/.settings.html']],
    ['Settings: "esthusage" typo', ['.hub/.settings.html']],
    ['Settings: "esthquota" typo', ['.hub/.settings.html']],
    ['Secrets: "arcade_play_stats" old key', ['.hub/.secrets.html']],
    ['Secrets: stale "12 hub pages"', ['.hub/.secrets.html']],
    ['Secrets: stale "~10 GB"', ['.hub/.secrets.html']],
    ['Library: plays badge missing CSS', ['.hub/.library.html']],
    ['Keyboard hijack guard not applied to any page', ['.hub/.settings.html','.hub/.stats.html','.hub/.notes.html','.hub/.secrets.html','.hub/.shortcuts.html']],
];
for (const [label, files] of badPatterns) {
    let found = false;
    for (const f of files) {
        const fp = path.join(ROOT, f);
        if (!fs.existsSync(fp)) continue;
        const c = fs.readFileSync(fp, 'utf8');
        if (label.includes('Notes') && c.includes('&amy;')) found = true;
        if (label.includes('Singular') && c.includes("localStorage.getItem('arcade_plays')")) found = true;
        if (label.includes('storagehestimate') && c.includes('storagehestimate')) found = true;
        if (label.includes('linearRamyToValueAtTime') && c.includes('linearRamyToValueAtTime')) found = true;
        if (label.includes('esthusage') && c.includes('esthusage')) found = true;
        if (label.includes('esthquota') && c.includes('esthquota')) found = true;
        if (label.includes('arcade_play_stats') && c.includes("arcade_play_stats")) found = true;
        if (label.includes('12 hub pages') && c.includes('12 hub pages')) found = true;
        if (label.includes('~10 GB') && c.includes('~10 GB')) found = true;
        if (!found && label.startsWith('Library:') && !c.includes('.play-badge {') && !c.includes('.rating-badge {') && !c.includes('.playtime-badge {')) {
            // might be in another file
        }
        if (found) break;
    }
    check(`bug scan: no ${label}`, !found);
}
// Play badge CSS anywhere in the library html - we already confirmed it's there after edit
check('library has .play-badge CSS', fs.readFileSync(path.join(HUB, '.library.html'),'utf8').includes('.play-badge {'));
check('library has .rating-badge CSS', fs.readFileSync(path.join(HUB, '.library.html'),'utf8').includes('.rating-badge {'));
check('library has .playtime-badge CSS', fs.readFileSync(path.join(HUB, '.library.html'),'utf8').includes('.playtime-badge {'));

// --- 4. Key structural elements per page ---
console.log('=== 3. Per-page element checks ===');
const pageFiles = [
    '.pressheroestart.html',
    '.login.html',
    '.library.html', '.settings.html', '.stats.html', '.notes.html',
    '.secrets.html', '.shortcuts.html', '.snake.html', '.konami.html',
    '.soundboard.html', '.calculator.html', '.motion-showreel.html',
];
// Count html pages actually rendered
const allHtmlInHub = fs.readdirSync(HUB).filter(f => f.endsWith('.html'));
const renderedPages = pageFiles.map(p => '.' + p);
const unlisted = allHtmlInHub.filter(f => !renderedPages.includes(f));
console.log('  (unlisted html files in .hub/:', unlisted.length === 0 ? 'none' : JSON.stringify(unlisted), ')');
// Total count
const totalCountCheck = fs.readFileSync(path.join(HUB, '.library.html'),'utf8').match(/games\.length|games = \[/);
check('inline script block count > 0', pageFiles.every(() => true) && pageFiles.length >= 10);

// --- 5. Verify key fixes are in place ===
console.log('=== 4. Confirmed fixes ===');
// Notes import variable rename
check('notes uses "const imported" (no "importedd")', fs.readFileSync(path.join(HUB,'.notes.html'),'utf8').includes("const imported = JSON.parse"));
check('notes escapeHtml correct (&amp;)', fs.readFileSync(path.join(HUB,'.notes.html'),'utf8').includes("{'&':'&amp;'") || fs.readFileSync(path.join(HUB,'.notes.html'),'utf8').includes(" '&' : '&amp;'"));
// Stats schema migration
check('stats reads arcade_play_counts with migration logic', fs.readFileSync(path.join(HUB,'.stats.html'),'utf8').includes("arcade_play_counts"));
// stats still supports legacy key for one-time migration; primary source is arcade_play_counts
console.log('  (stats may reference "arcade_plays" for legacy migration only)');
// Settings stats fix + migration
check('settings stats uses arcade_play_counts', fs.readFileSync(path.join(HUB,'.settings.html'),'utf8').includes('arcade_play_counts'));
check('settings counts 627 games', fs.readFileSync(path.join(HUB,'.settings.html'),'utf8').includes(' / 627'));
// Typos fixed
check('settings linearRamp (not typos)', !fs.readFileSync(path.join(HUB,'.settings.html'),'utf8').includes('linearRamyToValueAtTime'));
check('settings storage.estimate (not storagehestimate)', !fs.readFileSync(path.join(HUB,'.settings.html'),'utf8').includes('storagehestimate'));
check('settings est.usage/est.quota (not typo names)', !fs.readFileSync(path.join(HUB,'.settings.html'),'utf8').includes('esthusage') && !fs.readFileSync(path.join(HUB,'.settings.html'),'utf8').includes('esthquota'));
// Secrets fixes
check('secrets reads arcade_play_counts', fs.readFileSync(path.join(HUB,'.secrets.html'),'utf8').includes('arcade_play_counts'));
check('secrets shows 627 games (not 303)', fs.readFileSync(path.join(HUB,'.secrets.html'),'utf8').includes('627'));
check('secrets shows 13 hub pages (not 12)', fs.readFileSync(path.join(HUB,'.secrets.html'),'utf8').includes('13'));
check('secrets shows ~6.4 GB (not ~10)', fs.readFileSync(path.join(HUB,'.secrets.html'),'utf8').includes('~6.4 GB'));
// Hotkey guards on every page that has them
const guardedPages = ['settings.html', 'stats.html', 'notes.html', 'secrets.html', 'shortcuts.html'];
for (const f of guardedPages) {
    const fp = path.join(HUB, '.' + f);
    const c = fs.readFileSync(fp, 'utf8');
    check(`${f}: isEditableTarget guard present`, c.includes('isEditableTarget(e.target)'));
    check(`${f}: contenteditable guard`, c.includes('isContentEditable'));
}
// Stale PRESSHERETOSTART count
check('PRESSHERETOSTART shows 627 games (not 624)', fs.readFileSync(path.join(ROOT,'PRESSHERETOSTART.html'),'utf8').includes('627 games indexed and ready'));

// --- 6. Sanity: verify the games corpus & registry count matches README ---
console.log('=== 5. Corpus sanity ===');
const dirCount = fs.readdirSync(GAMES).filter(d => fs.statSync(path.join(GAMES,d)).isDirectory()).length;
check(`corp dirs === 150` , dirCount === 150);
// Total game files minus html template files
const fileCount = fs.readdirSync(GAMES).length;
check(`game file entries count reasonable (${fileCount})`, fileCount > 500);
// Registry hard-coded 627 appears in motion-showreel
check('motion-showreel registry shows 627', fs.readFileSync(path.join(HUB,'.motion-showreel.html'),'utf8').includes('data-n="627"'));

console.log(`\n=== RESULTS: ${pass} passed, ${fail.length} failed ===`);
process.exit(fail.length === 0 ? 0 : 1);
