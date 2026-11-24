import { IMGS } from '../data/images.js';

export const $ = s => document.querySelector(s);
export const R = document.documentElement;

// --- Security helpers (defence in depth; all current content is trusted, static data) ---
// esc: HTML-escape any text before it is placed inside an innerHTML template or attribute.
export const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// safeUrl: only https: links are allowed (blocks javascript:, data:, http:). Falls back to '#'.
export const safeUrl = (u, fallback = '#') => { try { const x = new URL(u, location.origin); return x.protocol === 'https:' ? x.href : fallback; } catch (e) { return fallback; } };
// safeColor: only #hex colours may be injected into style="--accent:..." attributes.
export const safeColor = (c, fallback = '#38bdf8') => /^#[0-9a-f]{3,8}$/i.test(c) ? c : fallback;

// bilingual helpers: [en, ar] -> markup with both spans (CSS shows the active language)
export const L = a => `<span class="en">${esc(a[0])}</span><span class="ar">${esc(a[1])}</span>`;
export const P = a => `<p>${L(a)}</p>`;

// rng('b', 3) -> ['b0','b1','b2'];  cnt('b') -> number of photos whose key starts with 'b'
export const rng = (p, n) => Array.from({ length: n }, (_, i) => p + i);
export const cnt = p => Object.keys(IMGS).filter(k => k[0] === p).length;
