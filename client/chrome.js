document.querySelector('.burger')?.addEventListener('click', () => {
  document.querySelector('.nav')?.classList.toggle('open');
});

function syncRail() {
  fetch('/api/stats')
    .then((r) => (r.ok ? r.json() : null))
    .then((s) => {
      if (!s) return;
      const h = document.getElementById('rail-height');
      const d = document.getElementById('rail-diff');
      const t = document.getElementById('rail-time');
      if (h) h.textContent = '#' + Number(s.height).toLocaleString('en-US');
      if (d) d.textContent = Number(s.difficulty).toLocaleString('en-US');
      if (t) t.textContent = s.blockTime + 's';
    })
    .catch(() => {});
}

syncRail();
setInterval(syncRail, 10000);
