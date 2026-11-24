import { $ } from '../utils/dom.js';
import { IMGS } from '../data/images.js';

let lb, img, cur = [], ci = 0;
const at = k => cur[(k + cur.length) % cur.length];
const show = j => {
  ci = (j + cur.length) % cur.length;
  img.src = IMGS[cur[ci]];
  // warm the cache for the neighbours so next/previous feel instant
  [ci - 1, ci + 1].forEach(k => { new Image().src = IMGS[at(k)]; });
};

// photos = array of image keys, j = index to show first
export function openLightbox(photos, j) {
  cur = photos;
  show(j);
  lb.showModal();
}

export function initLightbox() {
  lb = $('#lb');
  img = $('#lbi');
  $('#lbx').onclick = () => lb.close();
  $('#lbp').onclick = () => show(ci - 1);
  $('#lbn').onclick = () => show(ci + 1);
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(ci - 1);
    if (e.key === 'ArrowRight') show(ci + 1);
  });
}
