const connect = require('./cdp.js');
const BASE = 'http://127.0.0.1:8090';
(async () => {
  const c = await connect();
  // ===== KONAMI =====
  await c.navigate(BASE + '/.hub/.konami.html');
  c.clear();
  const kon = await c.evalJs(`(() => {
    const tiles = document.querySelectorAll('.secret-game').length;
    const hasWam = tiles >= 9 && Array.prototype.some.call(document.querySelectorAll('.secret-game'), t => /wam/.test(t.getAttribute('onclick')));
    let failed = [];
    document.querySelectorAll('.secret-game').forEach(el => { try { el.click(); } catch (e) { failed.push(e.message); } });
    const areaVisible = document.getElementById('minigame-area') && document.getElementById('minigame-area').style.display === 'flex';
    return { tiles, hasWam, areaVisible, failed };
  })()`);
  const wam = await c.evalJs(`(function(){ try { startWAM(document.getElementById('minigame-content')); return { holes: document.querySelectorAll('[id^=whole]').length, scoreEl: !!document.getElementById('wscore'), timerEl: !!document.getElementById('wtime') }; } catch(e){ return { err: e.message }; } })()`);
  console.log(JSON.stringify({ konami: kon.v || kon.err, wam: wam.v || wam.err, jsErrors: c.errors.slice(0, 8) }, null, 1));
  // ===== SECRETS =====
  await c.navigate(BASE + '/.hub/.secrets.html');
  await c.evalJs(`localStorage.removeItem('arcade_achievements');0`);
  await c.navigate(BASE + '/.hub/.secrets.html');
  c.clear();
  const sec1 = await c.evalJs(`(() => {
    const gate = Array.from(document.querySelectorAll('div')).some(d => d.textContent && d.textContent.indexOf('ACCESS DENIED') !== -1);
    const containerHidden = document.querySelector('.container') ? getComputedStyle(document.querySelector('.container')).display === 'none' : null;
    const achRow = document.getElementById('ach-count') ? document.getElementById('ach-count').textContent : null;
    return { gate, containerHidden, achRow };
  })()`);
  await c.evalJs(`localStorage.setItem('arcade_achievements','["firstSteps","speedDemon","marathon"]');0`);
  await c.navigate(BASE + '/.hub/.secrets.html');
  const sec2 = await c.evalJs(`(() => {
    const gate = Array.from(document.querySelectorAll('div')).some(d => d.textContent && d.textContent.indexOf('ACCESS DENIED') !== -1);
    const containerHidden = document.querySelector('.container') ? getComputedStyle(document.querySelector('.container')).display === 'none' : null;
    return { gate, containerHidden };
  })()`);
  console.log(JSON.stringify({ secrets_0ach: sec1.v || sec1.err, secrets_3ach: sec2.v || sec2.err, jsErrors: c.errors.slice(0, 8) }, null, 1));
  c.close();
  process.exit(0);
})().catch(e => { console.error('FAIL ' + e.message); process.exit(1); });