import { $, R } from '../utils/dom.js';
import { sg, ss } from '../utils/storage.js';

const dark = () => R.dataset.theme ? R.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
const paintTheme = () => { $('#theme').textContent = dark() ? '☀' : '☾'; };

function setLang(l) {
  R.lang = l;
  R.dir = l === 'ar' ? 'rtl' : 'ltr';
  ss('lg', l);
}

export function initThemeLang() {
  if (sg('th')) R.dataset.theme = sg('th');
  paintTheme();
  $('#theme').onclick = () => {
    R.dataset.theme = dark() ? 'light' : 'dark';
    ss('th', R.dataset.theme);
    paintTheme();
  };
  setLang(sg('lg') === 'ar' ? 'ar' : 'en');
  $('#lang').onclick = () => setLang(R.lang === 'ar' ? 'en' : 'ar');
}
