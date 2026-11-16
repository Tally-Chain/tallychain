import { canonTx, formatTally, hashHex, notchOf, utf8, verifySig } from '/protocol.js';

export const $ = (id) => document.getElementById(id);

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function api(path, body) {
  const res = await fetch(path, body
    ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }
    : undefined);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'request failed');
  return data;
}

export function short(value, n = 8) {
  const text = String(value || '');
  if (text.length <= n * 2 + 1) return text;
  return `${text.slice(0, n)}…${text.slice(-4)}`;
}

export function ago(ts) {
  if (!ts) return 'mempool';
  const seconds = Math.max(0, (Date.now() - ts) / 1000);
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${Math.floor(seconds)}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function toast(message, bad = false) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.toggle('bad', bad);
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.remove(), 3800);
}

export function tally(amount) {
  return `${formatTally(amount)} tTALLY`;
}

export function localNotch(tx) {
  return notchOf(tx.memo) === tx.notch && (tx.type === 'coinbase' || verifySig(tx));
}

export const TALLY_SEAM_SVG = `<svg viewBox="0 0 24 220" preserveAspectRatio="none" aria-hidden="true"><path d="M12 0 L12 28 L5 42 L19 58 L7 76 L18 96 L6 114 L19 132 L8 152 L17 170 L12 186 L12 220" fill="none" stroke="#e58333" stroke-width="1.4"/><line x1="2" y1="58" x2="9" y2="58" stroke="#f0c399" stroke-opacity=".35"/><line x1="15" y1="132" x2="22" y2="132" stroke="#f0c399" stroke-opacity=".35"/></svg>`;

export { canonTx, formatTally, hashHex, notchOf, utf8, verifySig };
