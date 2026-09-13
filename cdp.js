// cdp.js — minimal CDP helper for headless Chrome at :9222
module.exports = async function connect() {
  const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
  const page = targets.find(t => t.type === 'page');
  if (!page) throw new Error('no page target');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let seq = 0;
  const pend = new Map();
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pend.has(msg.id)) { pend.get(msg.id).res(msg); pend.delete(msg.id); }
  };
  const send = (method, params) => new Promise((res, rej) => {
    const id = ++seq;
    pend.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });
  const errors = [];
  ws.addEventListener('message', ev => {
    const msg = JSON.parse(ev.data);
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails;
      errors.push('EXC: ' + (d.exception ? d.exception.description : d.text));
    }
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      errors.push('LOG: ' + msg.params.entry.text);
    }
  });
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Page.enable');
  const evalJs = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result.exceptionDetails) return { err: r.result.exceptionDetails.exception ? r.result.exceptionDetails.exception.description : r.result.exceptionDetails.text };
    return { v: r.result.result.value };
  };
  const navigate = async url => {
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 1500));
  };
  const clear = () => errors.length = 0;
  const close = () => ws.close();
  return { evalJs, navigate, errors, clear, close };
};