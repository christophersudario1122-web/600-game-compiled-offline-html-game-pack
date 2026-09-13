const fs = require('fs');
const path = require('path');

const HUB = path.join(__dirname, '.hub');
const files = ['.library1.html', '.settings.html', '.stats.html', '.konami.html', '.secrets.html', '.login.html', '.notes.html', '.snake.html', '.shortcuts.html'];

let totalIssues = 0;

for (const fname of files) {
    const fp = path.join(HUB, fname);
    if (!fs.existsSync(fp)) { console.log(`[SKIP] ${fname} not found`); continue; }
    const content = fs.readFileSync(fp, 'utf8');
    console.log(`\n${'='.repeat(60)}`);
    console.log(`=== ${fname} (${content.split('\n').length} lines) ===`);
    console.log(`${'='.repeat(60)}`);

    // 1. Div mismatch
    let divStack = [];
    let extraCloses = 0;
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        const opens = (line.match(/<div[^>]*>/g) || []).length;
        const closes = (line.match(/<\/div>/g) || []).length;
        for (let j = 0; j < opens; j++) divStack.push(i + 1);
        for (let j = 0; j < closes; j++) {
            if (divStack.length > 0) divStack.pop();
            else { console.log(`  [DIV] Line ${i + 1}: Extra closing </div>`); extraCloses++; }
        }
    });
    if (divStack.length > 0) { console.log(`  [DIV] ${divStack.length} unclosed <div> tags (first at line ${divStack[0]})`); totalIssues++; }
    if (extraCloses > 0) totalIssues++;

    // 2. Extract scripts
    const scriptBlocks = content.match(/<script>([\s\S]*?)<\/script>/g) || [];
    const allJs = scriptBlocks.map(s => s.replace(/<\/?script>/g, '')).join('\n');

    // 3. Function definitions
    const funcDefs = new Set();
    allJs.replace(/\bfunction\s+(\w+)\s*\(/g, (_, n) => { funcDefs.add(n); });
    allJs.replace(/(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?function/g, (_, n) => { funcDefs.add(n); });
    allJs.replace(/(\w+)\s*:\s*(?:async\s*)?function\s*\(/g, (_, n) => { funcDefs.add(n); });
    allJs.replace(/(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/g, (_, n) => { funcDefs.add(n); });

    // 4. Function calls
    const funcCalls = new Set();
    allJs.replace(/\b([a-zA-Z_]\w*)\s*\(/g, (_, n) => { funcCalls.add(n); });

    // 5. DOM refs
    const domRefs = new Set();
    allJs.replace(/(?:getElementById|querySelector|querySelectorAll)\s*\(\s*['"]([^'"]+)['"]/g, (_, n) => { domRefs.add(n); });

    // 6. localStorage keys
    const lsRead = new Set(), lsWrite = new Set(), lsRemove = new Set();
    allJs.replace(/localStorage\.getItem\s*\(\s*['"]([^'"]+)['"]/g, (_, n) => { lsRead.add(n); });
    allJs.replace(/localStorage\.setItem\s*\(\s*['"]([^'"]+)['"]/g, (_, n) => { lsWrite.add(n); });
    allJs.replace(/localStorage\.removeItem\s*\(\s*['"]([^'"]+)['"]/g, (_, n) => { lsRemove.add(n); });
    allJs.replace(/getLS\s*\(\s*['"]([^'"]+)['"]/g, (_, n) => { lsRead.add(n); });
    allJs.replace(/setLS\s*\(\s*['"]([^'"]+)['"]/g, (_, n) => { lsWrite.add(n); });

    // 7. onclick handlers
    const onclickCalls = [];
    content.replace(/onclick\s*=\s*['"]([^'"]+)['"]/g, (_, n) => { onclickCalls.push(n); });
    allJs.replace(/addEventListener\s*\(\s*['"]click['"]\s*,\s*(\w+)/g, (_, n) => { onclickCalls.push(n); });

    // 8. Known JS globals
    const knownFuncs = new Set([
        'setTimeout', 'setInterval', 'clearInterval', 'clearTimeout', 'parseInt', 'parseFloat',
        'JSON.parse', 'JSON.stringify', 'console.log', 'console.error', 'console.warn', 'console.info',
        'alert', 'confirm', 'prompt', 'Date', 'Math.random', 'Math.floor', 'Math.max', 'Math.min',
        'Math.round', 'Math.abs', 'Math.sqrt', 'Math.pow', 'Math.PI', 'Math.ceil', 'Math.sin',
        'Array.from', 'Object.keys', 'Object.values', 'Object.entries', 'Object.assign', 'Object.create',
        'addEventListener', 'removeEventListener', 'dispatchEvent', 'preventDefault', 'stopPropagation',
        'getElementById', 'querySelector', 'querySelectorAll',
        'localStorage.getItem', 'localStorage.setItem', 'localStorage.removeItem', 'localStorage.clear',
        'sessionStorage', 'encodeURIComponent', 'decodeURIComponent', 'encodeURI', 'decodeURI',
        'btoa', 'atob', 'fetch', 'requestAnimationFrame', 'cancelAnimationFrame',
        'document', 'window', 'navigator', 'location', 'history', 'screen', 'crypto', 'console',
        'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'RegExp', 'Error', 'Promise',
        'Map', 'Set', 'WeakMap', 'WeakSet', 'Symbol', 'JSON', 'Infinity', 'NaN',
        'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'eval', 'undefined', 'null',
        'Blob', 'File', 'FileReader', 'URL', 'XMLHttpRequest', 'FormData', 'Headers', 'Request', 'Response',
        'CustomEvent', 'Event', 'MouseEvent', 'KeyboardEvent', 'EventTarget', 'HTMLElement',
        'getComputedStyle', 'requestIdleCallback', 'matchMedia',
        'getLS', 'setLS', 'showToast', 'playClick', 'playMute', 'showConfetti',
        'generateConfetti', 'animateGreeting', 'typeEffect',
    ]);

    // Check undefined function calls
    let undefCount = 0;
    for (const call of funcCalls) {
        if (!knownFuncs.has(call) && !funcDefs.has(call) && call[0] === call[0].toLowerCase()
            && !call.startsWith('on') && !call.includes('.') && !/^[A-Z]/.test(call)) {
            console.log(`  [JS UNDEF] Possible undefined function: ${call}`);
            undefCount++;
        }
    }
    if (undefCount > 0) totalIssues++;

    // Check DOM references
    let domMissing = 0;
    for (const ref of domRefs) {
        if (!content.includes(`id="${ref}"`) && !content.includes(`id='${ref}'`)) {
            console.log(`  [DOM MISSING] #${ref} referenced in JS but not in HTML`);
            domMissing++;
        }
    }
    if (domMissing > 0) totalIssues++;

    // Check localStorage read-only keys
    for (const k of lsRead) {
        if (!lsWrite.has(k) && !lsRemove.has(k)) {
            console.log(`  [LS READ-ONLY] '${k}' is read but never written in this file`);
        }
    }

    // Check onclick handlers
    for (const oc of onclickCalls) {
        const funcName = oc.split('(')[0].trim().split('.')[0];
        if (funcName && !funcDefs.has(funcName) && !knownFuncs.has(funcName) && !funcName.includes('.')) {
            console.log(`  [ONCLICK UNDEF] Handler calls undefined function: ${funcName}`);
            totalIssues++;
        }
    }

    // Cross-page links
    const links = [];
    content.replace(/href\s*=\s*['"]([^'"]+\.html)['"]/g, (_, n) => { links.push(n); });
    for (const link of links) {
        if (!link.startsWith('http') && !link.startsWith('/')) {
            const target = link.replace(/^\.\//, '');
            const targets = files.map(f => f.replace(/^\./, ''));
            if (!targets.includes(target)) {
                console.log(`  [BROKEN LINK] Links to non-existent page: ${link}`);
                totalIssues++;
            }
        }
    }

    // Check for settings.html structural issue - content before doctype
    if (fname === '.settings.html') {
        const hasDoctype = content.includes('<!DOCTYPE') || content.includes('<!doctype');
        const hasHTML = content.includes('<html');
        if (!hasDoctype || !hasHTML) {
            console.log('  [STRUCTURAL] Missing <!DOCTYPE html> or <html> tag');
            totalIssues++;
        }
    }

    // Stats
    console.log(`  --- Stats: ${funcDefs.size} functions, ${domRefs.size} DOM refs, ${lsRead.size + lsWrite.size} LS keys ---`);
}

console.log(`\n${'='.repeat(60)}`);
console.log(`TOTAL ISSUES FOUND: ${totalIssues}`);
console.log(`${'='.repeat(60)}`);