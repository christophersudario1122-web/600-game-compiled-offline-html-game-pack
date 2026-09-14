const fs = require('fs');
const path = require('path');

const HUB = path.join(__dirname, '.hub');
const files = ['.library1.html', '.settings.html', '.stats.html', '.konami.html', '.secrets.html', '.login.html', '.notes.html', '.snake.html', '.shortcuts.html', '.soundboard.html'];
const rootFiles = ['PRESSHERETOSTART.html'];

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
    allJs.replace(/const\s+(\w+)\s*=\s*(?:async\s*)?\(/g, (_, n) => { funcDefs.add(n); });
    allJs.replace(/let\s+(\w+)\s*=\s*(?:async\s*)?\(/g, (_, n) => { funcDefs.add(n); });

    // 4. DOM references
    const domRefs = new Set();
    allJs.replace(/getElementById\(['"]([^'"]+)['"]\)/g, (_, n) => { domRefs.add(n); });
    allJs.replace(/querySelector\(['"]([^'"]+)['"]\)/g, (_, n) => { domRefs.add(n); });
    allJs.replace(/document\.(\w+)/g, (_, n) => { if (!['getElementById','querySelector','createElement','addEventListener','write','body','head'].includes(n)) domRefs.add(n); });

    // 5. Check DOM refs exist in HTML
    for (const ref of domRefs) {
        if (!content.includes(`id="${ref}"`) && !content.includes(`id='${ref}'`) && !content.includes(`class="${ref}"`) && !content.includes(`class='${ref}'`)) {
            console.log(`  [DOM MISSING] #${ref} referenced in JS but not in HTML`);
            totalIssues++;
        }
    }

    // 6. LocalStorage
    const lsRead = new Set(), lsWrite = new Set();
    allJs.replace(/localStorage\.getItem\(['"]([^'"]+)['"]\)/g, (_, n) => { lsRead.add(n); });
    allJs.replace(/localStorage\.setItem\(['"]([^'"]+)['"]/g, (_, n) => { lsWrite.add(n); });
    allJs.replace(/localStorage\.removeItem\(['"]([^'"]+)['"]\)/g, (_, n) => { lsWrite.add(n); });

    for (const key of lsRead) { if (!lsWrite.has(key)) { console.log(`  [LS READ-ONLY] '${key}' is read but never written in this file`); totalIssues++; } }

    // 7. Cross-page links - smart resolution
    const links = [];
    content.replace(/href\s*=\s*['"]([^'"]+\.html)['"]/g, (_, n) => { links.push(n); });
    
    const validTargets = new Set([
        ...files.map(f => f),  // file.html
        ...files.map(f => './' + f),  // ./file.html
        ...rootFiles.map(f => '../' + f),  // ../file.html
        ...files.map(f => '../.hub/' + f),  // ../.hub/file.html
        ...files.map(f => '.hub/' + f),  // .hub/file.html
        // Game pack paths
        '../.library2/pressHERE.html',
        '../.Offline-HTML-Games-Pack-master/offline/tisrealyaint.html',
    ]);
    
    for (const link of links) {
        if (!link.startsWith('http') && !link.startsWith('/') && !link.startsWith('../../')) {
            if (!validTargets.has(link)) {
                console.log(`  [BROKEN LINK] Links to non-existent page: ${link}`);
                totalIssues++;
            }
        }
    }

    // 8. Check onclick handlers
    const onclicks = [];
    content.replace(/onclick\s*=\s*['"]([^'"]+)['"]/g, (_, n) => { onclicks.push(n); });
    const handlerFuncs = new Set();
    onclicks.forEach(c => { c.replace(/(\w+)\s*\(/g, (_, n) => { handlerFuncs.add(n); }); });
    const knownFuncs = ['window','location','console','alert','prompt','confirm','playClickSound','playHoverSound','initAudio','toggleAmbientMusic','changeTheme','startGame','newNote','exportNotes','importNotes','stopAllSounds','testAllSounds','playSound','flashButton','setMasterVolume','renderSounds'];
    for (const func of handlerFuncs) {
        if (!funcDefs.has(func) && !knownFuncs.includes(func)) {
            console.log(`  [ONCLICK UNDEF] Handler calls undefined function: ${func}`);
            totalIssues++;
        }
    }

    // Stats
    console.log(`  --- Stats: ${funcDefs.size} functions, ${domRefs.size} DOM refs, ${lsRead.size} LS reads, ${lsWrite.size} LS writes ---`);
}

console.log(`\n${'='.repeat(60)}`);
console.log(`TOTAL ISSUES FOUND: ${totalIssues}`);
console.log(`${'='.repeat(60)}`);
