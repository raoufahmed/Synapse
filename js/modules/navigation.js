import { $ } from '../utils/dom.js';

export function initNavigation() {
  $('#bg').onclick = () => $('#menu').classList.toggle('open');
  $('#menu').onclick = e => { if (e.target.closest('a')) $('#menu').classList.remove('open'); };
}
