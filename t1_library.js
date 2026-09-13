const connect = require('./cdp.js');
const BASE = 'http://127.0.0.1:8090';
(async () => {
  const c = await connect();
  // Library: seed state then nav
  await c.navigate(BASE + '/.hub/.library1.html');
  await c.evalJs(`localStorage.setItem('arcade_plays','{"vex6":{"count":5},"2048":{"count":3}}');localStorage.setItem('arcade_recent','["vex6","2048"]');localStorage.setItem('arcade_favorites','["vex6"]');localStorage.setItem('arcade_play_days','{"2026-09-11":4,"2026-09-12":7,"2026-09-10":2}');0`);
  await c.navigate(BASE + '/.hub/.library1.html');
  c.clear();
  const r = await c.evalJs(`(() => {
    const gotd = document.querySelectorAll('.gotd-section').length;
    const streakEl = !!document.getElementById('gotd-streak');
    const recShelf = !!document.getElementById('rec-shelf');
    const recentShelf = !!document.getElementById('recent-shelf');
    const overlay = !!document.getElementById('launcher-overlay');
    const favBadge = !!document.querySelector('.favorites-tab .fav-count-badge');
    const tiles = document.querySelectorAll('.card').length;
    const playBadges = document.querySelectorAll('.play-badge').length;
    const themeVal = (document.getElementById('theme-select')||{}).value;
    const targets = [];
    document.querySelectorAll('button, [onclick], a.card').forEach(el => {
      if (el.style && el.style.display === 'none') return;
      if (/location|window\\.open/.test(el.getAttribute('onclick')||'')) return;
      if (el.tagName === 'INPUT') return;
      const desc = (el.tagName + '#' + (el.id||'') + ':' + (el.getAttribute('onclick')||'').slice(0,30));
      targets.push([el, desc]);
    });
    let clicked = 0, failed = [];
    for (const [el, desc] of targets) { try { el.click(); clicked++; } catch (e) { failed.push(desc + ' -> ' + e.message); } }
    const afterBadge = !!document.querySelector('.favorites-tab .fav-count-badge');
    return { gotd, streakEl, recShelf, recentShelf, overlay, favBadge, tiles, playBadges, themeVal, clicked, failed, afterBadge };
  })()`);
  console.log(JSON.stringify({ library1: r.v || r.err, jsErrors: c.errors.slice(0, 8) }, null, 1));
  c.close();
  process.exit(0);
})().catch(e => { console.error('FAIL ' + e.message); process.exit(1); });