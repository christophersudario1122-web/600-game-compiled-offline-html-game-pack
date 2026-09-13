const connect = require('./cdp.js');
const BASE = 'http://127.0.0.1:8090';
(async () => {
  const c = await connect();
  // ===== STATS =====
  await c.navigate(BASE + '/.hub/.stats.html');
  await c.evalJs(`localStorage.setItem('arcade_plays','{"vex6":{"count":9},"2048":{"count":3},"snake":{"count":2},"pong":{"count":1}}');localStorage.setItem('arcade_play_days','{"2026-09-11":4,"2026-09-12":7,"2026-09-10":2,"2026-09-09":5,"2026-09-08":1,"2026-09-07":0,"2026-09-06":3}');localStorage.setItem('arcade_achievements','["firstSteps","speedDemon"]');0`);
  await c.navigate(BASE + '/.hub/.stats.html');
  c.clear();
  const st = await c.evalJs(`(() => {
    const bars = document.querySelectorAll('.activity-bar').length;
    const rankBadges = document.querySelectorAll('.rank-badge').length;
    const firstRank = document.querySelector('.rank-badge');
    const played = document.getElementById('stat-played').textContent;
    const total = document.getElementById('stat-total').textContent;
    const ach = document.getElementById('stat-ach').textContent;
    const targets = [];
    document.querySelectorAll('button, [onclick]').forEach(el => {
      if (el.style && el.style.display === 'none') return;
      if (/location|window\\.open|confirm/.test(el.getAttribute('onclick')||'') || el.tagName === 'INPUT') return;
      targets.push(el);
    });
    let clicked = 0, failed = [];
    for (const el of targets) { try { el.click(); clicked++; } catch (e) { failed.push(e.message); } }
    return { bars, rankBadges, firstRank: firstRank ? firstRank.textContent : null, played, total, ach, clicked, failed };
  })()`);
  console.log(JSON.stringify({ stats: st.v || st.err, jsErrors: c.errors.slice(0, 8) }, null, 1));
  // ===== SETTINGS =====
  await c.navigate(BASE + '/.hub/.settings.html');
  await c.evalJs(`localStorage.removeItem('arcade_custom_color');localStorage.removeItem('arcade_custom_theme');0`);
  await c.navigate(BASE + '/.hub/.settings.html');
  c.clear();
  const set = await c.evalJs(`(() => {
    const accentPicker = !!document.getElementById('custom-accent-picker');
    const swatches = document.querySelectorAll('.theme-swatch').length;
    const targets = [];
    document.querySelectorAll('button, [onclick], .theme-swatch, select').forEach(el => {
      if (el.style && el.style.display === 'none') return;
      if (/location|window\\.open|confirm/.test(el.getAttribute('onclick')||'') || el.tagName === 'INPUT') return;
      targets.push(el);
    });
    let clicked = 0, failed = [];
    for (const el of targets) { try { el.click(); clicked++; } catch (e) { failed.push(e.message); } }
    const picker = document.getElementById('custom-color-picker');
    const accent = document.getElementById('custom-accent-picker');
    if (picker) picker.value = '#ff8800';
    if (accent) accent.value = '#00aaff';
    document.getElementById('custom-color-hex').value = '#ff8800';
    document.getElementById('apply-custom-theme').click();
    const saved = localStorage.getItem('arcade_custom_theme');
    const applied = getComputedStyle(document.documentElement).getPropertyValue('--neon-green').trim();
    return { accentPicker, swatches, clicked, failed, saved, applied };
  })()`);
  console.log(JSON.stringify({ settings: set.v || set.err, jsErrors: c.errors.slice(0, 8) }, null, 1));
  c.close();
  process.exit(0);
})().catch(e => { console.error('FAIL ' + e.message); process.exit(1); });