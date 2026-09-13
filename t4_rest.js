const connect = require('./cdp.js');
const BASE = 'http://127.0.0.1:8090';
const pages = [
  ['notes', '/.hub/.notes.html'],
  ['snake', '/.hub/.snake.html'],
  ['shortcuts', '/.hub/.shortcuts.html'],
  ['login', '/.hub/.login.html'],
  ['PRESS', '/PRESSHERETOSTART.html']
];
(async () => {
  const c = await connect();
  for (const [name, path] of pages) {
    await c.navigate(BASE + path);
    c.clear();
    const r = await c.evalJs(`(() => {
      let clicked = 0, failed = [];
      document.querySelectorAll('button, [onclick], a').forEach(el => {
        if (el.style && el.style.display === 'none') return;
        const oc = el.getAttribute('onclick') || '';
        if (/location|window\\.open|confirm/.test(oc) || el.tagName === 'INPUT') return;
        const desc = (el.tagName + '#' + (el.id||'') + ':' + oc.slice(0,30) + (el.getAttribute('href')||'').slice(0,20));
        try { el.click(); clicked++; } catch (e) { failed.push(desc + ' -> ' + e.message); }
      });
      return { clicked, failed, title: document.title };
    })()`);
    console.log(JSON.stringify({ page: name, ...(r.v || r.err), jsErrors: c.errors.slice(0, 8) }));
  }
  c.close();
  process.exit(0);
})().catch(e => { console.error('FAIL ' + e.message); process.exit(1); });