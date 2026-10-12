// Shared Arcade Hub Features - Injected into all hub pages
(function() {
  'use strict';

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    const swPath = window.location.pathname.includes('/.hub/') ? '../sw.js' : './sw.js';
    navigator.serviceWorker.register(swPath).catch(() => {});
  }

  // Auto theme by time (6am-6pm lighter, 6pm-6am darker)
  function autoThemeSchedule() {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;
    const saved = localStorage.getItem('arcade_theme');
    if (!saved || saved === 'auto') {
      document.documentElement.style.setProperty('--neon-green', isDay ? '#00cc66' : '#00ff88');
    }
  }
  autoThemeSchedule();
  setInterval(autoThemeSchedule, 60000);

  // Gamepad detection
  function updateGamepadStatus() {
    const gps = navigator.getGamepads();
    const connected = Array.from(gps).filter(g => g);
    const badge = document.getElementById('gamepad-badge');
    if (badge) {
      badge.textContent = connected.length ? `🎮 ${connected.length} controller${connected.length>1?'s':''} connected` : '';
      badge.style.display = connected.length ? 'inline' : 'none';
    }
  }
  setInterval(updateGamepadStatus, 1000);
  window.addEventListener('gamepadconnected', updateGamepadStatus);
  window.addEventListener('gamepaddisconnected', updateGamepadStatus);

  // Cheatsheet modal
  window.showCheatsheet = function() {
    const modal = document.createElement('div');
    modal.id = 'cheatsheet-modal';
    modal.innerHTML = `
      <div style="position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;">
        <div style="background:#0a0a0f;border:2px solid #00ff88;border-radius:10px;padding:30px;max-width:600px;max-height:80vh;overflow:auto;">
          <h2 style="color:#00ff88;margin:0 0 20px;text-shadow:0 0 10px #00ff88;">⌨️ KEYBOARD SHORTCUTS</h2>
          <table style="width:100%;color:#00ff88;font-family:monospace;font-size:0.9rem;border-collapse:collapse;">
            <tr><td style="padding:8px;width:120px;"><kbd>R</kbd></td><td>Random game (library)</td></tr>
            <tr><td style="padding:8px;"><kbd>Space</kbd></td><td>Stop all sounds</td></tr>
            <tr><td style="padding:8px;"><kbd>F</kbd></td><td>Toggle fullscreen</td></tr>
            <tr><td style="padding:8px;"><kbd>?</kbd></td><td>Show this cheatsheet</td></tr>
            <tr><td style="padding:8px;"><kbd>H</kbd></td><td>Home</td></tr>
            <tr><td style="padding:8px;"><kbd>1-9</kbd></td><td>Soundboard hotkeys</td></tr>
            <tr><td style="padding:8px;"><kbd>Q-P</kbd></td><td>Meme sounds</td></tr>
            <tr><td style="padding:8px;"><kbd>A-L</kbd></td><td>COD sounds</td></tr>
            <tr><td style="padding:8px;"><kbd>Z-B</kbd></td><td>Retro sounds</td></tr>
          </table>
          <button onclick="document.getElementById('cheatsheet-modal').remove()" style="margin-top:20px;padding:10px 20px;background:#00ff88;color:#000;border:none;border-radius:4px;font-weight:bold;cursor:pointer;">CLOSE</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  };

  // Fullscreen helper
  window.toggleFullscreen = function() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Global keydown handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) { e.preventDefault(); window.showCheatsheet(); }
    if (e.key === 'f' || e.key === 'F') { e.preventDefault(); window.toggleFullscreen(); }
  });

  // Playtime tracker helper (for library pages)
  window.recordPlaytime = function(gameId, startTime) {
    const key = 'arcade_playtime_' + gameId;
    const prev = parseInt(localStorage.getItem(key) || '0', 10);
    const elapsed = prev + Math.floor((Date.now() - startTime) / 1000);
    localStorage.setItem(key, elapsed);
  };
})();