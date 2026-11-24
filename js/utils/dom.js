import { IMGS } from '../data/images.js';

export const $ = s => document.querySelector(s);
export const R = document.documentElement;

// bilingual helpers: [en, ar] -> markup with both spans (CSS shows the active language)
export const L = a => `<span class="en">${a[0]}</span><span class="ar">${a[1]}</span>`;
export const P = a => `<p>${L(a)}</p>`;

// rng('b', 3) -> ['b0','b1','b2'];  cnt('b') -> number of photos whose key starts with 'b'
export const rng = (p, n) => Array.from({ length: n }, (_, i) => p + i);
export const cnt = p => Object.keys(IMGS).filter(k => k[0] === p).length;
