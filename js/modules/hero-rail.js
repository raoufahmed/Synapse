import { $ } from '../utils/dom.js';
import { IMGS, DIMS } from '../data/images.js';

// Two photo strips under the hero. Each strip is rendered twice so the CSS marquee loops seamlessly.
function fill(el, keys) {
  const h = keys.map(k => {
    const d = DIMS[k];
    const size = d ? ` width="${d[0]}" height="${d[1]}"` : '';
    return `<img src="${IMGS[k]}" alt="SYNAPSE activity photo"${size} loading="lazy" decoding="async">`;
  }).join('');
  el.innerHTML = h + h;
}

export function initHeroRail() {
  fill($('#t1'), ['b0', 'p0', 'r1', 'b2', 'p1', 'b4', 'r2', 'b5']);
  fill($('#t2'), ['b1', 'r0', 'b3', 'p2', 'b6', 'r3', 'b7', 'b8']);
}
