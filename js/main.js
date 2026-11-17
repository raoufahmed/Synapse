/* ==========================================================================
   SYNAPSE — Interactive UI Logic
   Handles: Hero photo rail, 3D carousels (Committees & Videos), Event filters,
            Masonry photo galleries, Lightbox, Dark/Light theme, and EN/AR toggle.
   ========================================================================== */

const $ = (selector) => document.querySelector(selector);
const R = document.documentElement;

// Bilingual HTML helpers
const L = (pair) => `<span class="en">${pair[0]}</span><span class="ar">${pair[1]}</span>`;
const P = (pair) => `<p>${L(pair)}</p>`;

// Ensure all logo elements point to LOGO_SRC without triggering duplicate fetches
if (typeof LOGO_SRC !== 'undefined') {
  document.querySelectorAll('img.lg').forEach((img) => {
    if (img.getAttribute('src') !== LOGO_SRC) {
      img.src = LOGO_SRC;
    }
  });
}

/* --------------------------------------------------------------------------
1. Hero Infinite Photo Rail (Staged so visible photos load first)
   -------------------------------------------------------------------------- */
function fillRailTrack(el, paths) {
  if (!el || !paths || !paths.length) return;

  const visibleCount = 5;
  const toImg = (src, eager) =>
    eager
      ? `<img src="${src}" alt="SYNAPSE activity photo" decoding="async">`
      : `<img src="${src}" alt="SYNAPSE activity photo" loading="lazy" decoding="async">`;

  // Render the immediately visible photos first so bandwidth isn't choked
  const initialHtml = paths
    .slice(0, visibleCount)
    .map((src) => toImg(src, true))
    .join('');
  el.innerHTML = initialHtml;

  // Append the rest of the track and seamless loop clone shortly after first paint
  const appendRemaining = () => {
    const fullHtml = paths.map((src, idx) => toImg(src, idx < visibleCount)).join('');
    el.innerHTML = fullHtml + fullHtml;
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => setTimeout(appendRemaining, 600), { timeout: 1500 });
  } else {
    setTimeout(appendRemaining, 900);
  }
}

fillRailTrack($('#t1'), HERO_RAIL.row1);
fillRailTrack($('#t2'), HERO_RAIL.row2);

/* --------------------------------------------------------------------------
2. Committees — 3D Circular Carousel & Detail Dialog
   -------------------------------------------------------------------------- */
const csRoot = $('#cs');
const csStage = $('#csStage');
const csInfo = $('#csInfo');
const comDlg = $('#comDlg');
const N = COMMITTEES.length;
const STEP = 24;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const metaOf = (i) => COMMITTEES[i] || { color: '#38bdf8' };

$('#coms').innerHTML = COMMITTEES.map((c, i) => `
  <div class="cs-card" data-i="${i}" style="--com-accent:${c.color}" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${N}">
    <div class="cs-face">
      <span class="cs-img">
        <img src="${c.image}" alt="" draggable="false" loading="lazy" decoding="async">
        <span class="cs-no">0${i + 1} / 0${N}</span>
      </span>
      <h3>${L(c.name)}</h3>
    </div>
  </div>
`).join('');

const comCards = [...document.querySelectorAll('.cs-card')];
let pos = 0;
let cw = 300;
let RAD = 450;
let active = -1;
let raf = 0;
let swap = 0;
let drag = null;
let moved = false;

const wrapd = (d) => {
  d = ((d % N) + N) % N;
  return d > N / 2 ? d - N : d;
};

function setActive(i) {
  const first = active < 0;
  active = i;
  const item = COMMITTEES[i];
  csRoot.style.setProperty('--com-accent', item.color);

  const paint = () => {
    $('#csName').innerHTML = L(item.name);
    $('#csDesc').innerHTML = L(item.desc);
    csInfo.classList.remove('out');
  };

  clearTimeout(swap);
  if (first || reduced) {
    paint();
  } else {
    csInfo.classList.add('out');
    swap = setTimeout(paint, 170);
  }
}

function renderCommittees() {
  comCards.forEach((el, i) => {
    const d = wrapd(i - pos);
    const a = Math.abs(d);
    const deg = d * STEP;
    const r = (deg * Math.PI) / 180;
    const o = a <= 1 ? 1 - 0.15 * a : a <= 2 ? 0.85 - 0.3 * (a - 1) : Math.max(0, 0.55 - 0.35 * (a - 2));

    el.style.transform = `translate3d(${Math.sin(r) * RAD}px, 0, ${(Math.cos(r) - 1) * RAD}px) rotateY(${deg}deg)`;
    el.style.opacity = o;
    el.style.zIndex = 100 - Math.round(a * 10);
    el.style.visibility = o < 0.02 ? 'hidden' : 'visible';
    el.style.pointerEvents = a < 3.2 ? 'auto' : 'none';
    el.classList.toggle('on', a < 0.5);
    el.setAttribute('aria-hidden', a > 2.5);
  });

  const idx = ((Math.round(pos) % N) + N) % N;
  if (idx !== active) setActive(idx);
}

function tweenCommittees(to) {
  cancelAnimationFrame(raf);
  if (reduced) {
    pos = to;
    renderCommittees();
    return;
  }
  const from = pos;
  const t0 = performance.now();
  const dur = 650;
  const step = (t) => {
    const k = Math.min(1, (t - t0) / dur);
    pos = from + (to - from) * (1 - Math.pow(1 - k, 4));
    renderCommittees();
    if (k < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

const goCommittee = (n) => tweenCommittees(Math.round(pos) + n);
const goToCommittee = (i) => tweenCommittees(Math.round(pos) + wrapd(i - Math.round(pos)));

function measureCommittees() {
  cw = comCards[0].offsetWidth || 300;
  RAD = cw * 2.5;
  renderCommittees();
}

addEventListener('resize', measureCommittees);
measureCommittees();

csStage.addEventListener('pointerdown', (e) => {
  if (e.button > 0) return;
  cancelAnimationFrame(raf);
  drag = { x: e.clientX, p: pos, id: e.pointerId, lx: e.clientX, lt: e.timeStamp, v: 0 };
  moved = false;
});

csStage.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (!moved && Math.abs(dx) > 6) {
    moved = true;
    csStage.setPointerCapture(drag.id);
    csStage.classList.add('drag');
  }
  if (!moved) return;
  pos = drag.p - dx / (cw * 0.95);
  const dt = e.timeStamp - drag.lt;
  if (dt > 0) drag.v = (e.clientX - drag.lx) / dt;
  drag.lx = e.clientX;
  drag.lt = e.timeStamp;
  renderCommittees();
});

function endCommitteeDrag() {
  if (!drag) return;
  const v = drag.v;
  drag = null;
  csStage.classList.remove('drag');
  if (moved) {
    tweenCommittees(Math.round(pos - Math.max(-1.5, Math.min(1.5, (v * 300) / (cw * 0.95)))));
  }
}

csStage.addEventListener('pointerup', endCommitteeDrag);
csStage.addEventListener('pointercancel', endCommitteeDrag);
csStage.addEventListener('click', (e) => {
  if (moved) return;
  const c = e.target.closest('.cs-card');
  if (c && +c.dataset.i !== active) goToCommittee(+c.dataset.i);
});

let csVisible = true;
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    csVisible = e.isIntersecting;
  }, { threshold: 0.2 }).observe(csRoot);
}

document.addEventListener('keydown', (e) => {
  if (!csVisible || document.querySelector('dialog[open]') || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goCommittee(-1);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    goCommittee(1);
  }
});

$('#csExplore').onclick = () => {
  const i = active;
  const item = COMMITTEES[i];
  $('#cmBody').innerHTML = `
    <span class="cm-img"><img src="${item.image}" alt="" decoding="async"></span>
    <div class="cm-txt">
      <span class="cs-no">0${i + 1} / 0${N}</span>
      <h3 id="cmTitle">${L(item.name)}</h3>
      <p>${L(item.desc)}</p>
      <a class="btn fill" href="#contact">
        <span class="en">Get in touch</span>
        <span class="ar">تواصل معنا</span>
      </a>
    </div>
  `;
  comDlg.style.setProperty('--com-accent', item.color);
  comDlg.showModal();
};

$('#cmx').onclick = () => comDlg.close();
comDlg.addEventListener('click', (e) => {
  if (e.target === comDlg || e.target.closest('a')) comDlg.close();
});

/* --------------------------------------------------------------------------
3. Events, Category Filters, Masonry Galleries & Lightbox
   -------------------------------------------------------------------------- */
$('#evs').innerHTML = EVENTS.map((ev, i) => `
  <article class="event" id="ev${i}" data-category="${ev.category}">
    <div class="ev-top">
      <div>
        <span class="chip">${L(ev.tag)}</span>
        <h3>${L(ev.title)}</h3>
        <div class="tl">${L(ev.tagline)}</div>
      </div>
      <div>
        ${ev.paragraphs.map(P).join('')}
        <h4>${L(ev.roleHeading)}</h4>
        <ul>${ev.roles.map((r) => `<li>${L(r)}</li>`).join('')}</ul>
        ${ev.quote ? `<h4>${L(ev.quote.heading)}</h4>${P(ev.quote.text)}` : ''}
        <p class="by">${L(ev.byline)}</p>
      </div>
    </div>
    <div class="event-highlight">
      <span class="spark" aria-hidden="true">✦</span>
      <div>
        <strong><span class="en">Key achievement</span><span class="ar">أبرز إنجاز</span></strong>
        <p>${L(ev.highlight)}</p>
      </div>
    </div>
    ${ev.video ? `
      <div class="event-video">
        <video controls playsinline preload="none" poster="${ev.poster || ''}">
          <source src="${ev.video}" type="video/mp4">
        </video>
      </div>
    ` : ''}
    <div class="gal" id="g${i}"></div>
    <div class="mw"><button class="btn fill" id="m${i}"></button></div>
  </article>
`).join('');

$('#eventFilters').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  $('#eventFilters').querySelectorAll('.filter-btn').forEach((x) => {
    x.classList.toggle('active', x === btn);
  });
  document.querySelectorAll('.event').forEach((card) => {
    card.classList.toggle('is-filtered-out', btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter);
  });
});

const lb = $('#lb');
let curPhotos = [];
let ci = 0;

EVENTS.forEach((ev, i) => {
  let shownCount = 0;
  let initialized = false;
  const articleEl = $('#ev' + i);
  const galleryEl = $('#g' + i);
  const moreBtn = $('#m' + i);
  const btnWrap = moreBtn.parentElement;

  function loadMore(count) {
    ev.photos.slice(shownCount, shownCount + count).forEach((src, offset) => {
      const btn = document.createElement('button');
      btn.dataset.i = i;
      btn.dataset.j = shownCount + offset;
      btn.setAttribute('aria-label', 'Photo ' + (shownCount + offset + 1));
      btn.innerHTML = `<img src="${src}" alt="${ev.title[0]} photo ${shownCount + offset + 1}" loading="lazy" decoding="async">`;
      galleryEl.appendChild(btn);
    });
    shownCount = Math.min(shownCount + count, ev.photos.length);
    if (shownCount >= ev.photos.length) {
      btnWrap.remove();
    } else {
      const left = ev.photos.length - shownCount;
      moreBtn.innerHTML = L([`SHOW MORE (${left} left)`, `عرض المزيد (باقي ${left})`]);
    }
  }

  function initGallery() {
    if (initialized) return;
    initialized = true;
    loadMore(8);
  }

  moreBtn.addEventListener('click', () => loadMore(12));

  // Only populate event thumbnails when user scrolls near the Events section
  if ('IntersectionObserver' in window && articleEl) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        initGallery();
        obs.disconnect();
      }
    }, { rootMargin: '500px 0px' });
    obs.observe(articleEl);
  } else {
    initGallery();
  }
});

function showLightboxPhoto(j) {
  ci = (j + curPhotos.length) % curPhotos.length;
  $('#lbi').src = curPhotos[ci];
}

$('#evs').onclick = (e) => {
  const btn = e.target.closest('.gal button');
  if (btn) {
    curPhotos = EVENTS[+btn.dataset.i].photos;
    showLightboxPhoto(+btn.dataset.j);
    lb.showModal();
  }
};

$('#lbx').onclick = () => lb.close();
$('#lbp').onclick = () => showLightboxPhoto(ci - 1);
$('#lbn').onclick = () => showLightboxPhoto(ci + 1);
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showLightboxPhoto(ci - 1);
  if (e.key === 'ArrowRight') showLightboxPhoto(ci + 1);
});

/* --------------------------------------------------------------------------
4. Theme (Dark / Light), Language (EN / AR) & Mobile Menu
   -------------------------------------------------------------------------- */
const storageGet = (k) => {
  try { return localStorage.getItem(k); } catch (e) { return null; }
};
const storageSet = (k, v) => {
  try { localStorage.setItem(k, v); } catch (e) {}
};

const isDark = () => (R.dataset.theme ? R.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches);

function paintTheme() {
  $('#theme').textContent = isDark() ? '☀' : '☾';
}

if (storageGet('th')) R.dataset.theme = storageGet('th');
paintTheme();

$('#theme').onclick = () => {
  R.dataset.theme = isDark() ? 'light' : 'dark';
  storageSet('th', R.dataset.theme);
  paintTheme();
};

function setLang(lang) {
  R.lang = lang;
  R.dir = lang === 'ar' ? 'rtl' : 'ltr';
  storageSet('lg', lang);
}

setLang(storageGet('lg') === 'ar' ? 'ar' : 'en');
$('#lang').onclick = () => setLang(R.lang === 'ar' ? 'en' : 'ar');

$('#bg').onclick = () => $('#menu').classList.toggle('open');
$('#menu').onclick = (e) => {
  if (e.target.closest('a')) $('#menu').classList.remove('open');
};

/* --------------------------------------------------------------------------
5. Videos & Reels — 3D Circular Showcase
   -------------------------------------------------------------------------- */
const vsRoot = $('#vs');
const vsStage = $('#vsStage');
const vsInfo = $('#vsInfo');
const vidsWrap = $('#vids');

if (vsRoot && vidsWrap) {
  const VN = VIDEOS.length;
  const VSTEP = 26;

  vidsWrap.innerHTML = VIDEOS.map((v, i) => `
    <div class="vs-card" data-i="${i}" style="--vid-accent:${v.color}" role="group" aria-roledescription="slide" aria-label="0${i + 1} / 0${VN}">
      <div class="vs-face">
        <span class="vs-badge">0${i + 1} / 0${VN}</span>
        <div class="vs-frame">
          <iframe src="https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1" title="${v.title[0]}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `).join('');

  const vidCards = [...document.querySelectorAll('.vs-card')];
  let vpos = 0;
  let vw = 540;
  let VRAD = 1100;
  let vactive = -1;
  let vraf = 0;
  let vswap = 0;
  let vdrag = null;
  let vmoved = false;

  const vwrap = (d) => {
    if (VN <= 1) return 0;
    d = ((d % VN) + VN) % VN;
    return d > VN / 2 ? d - VN : d;
  };

  function setVidActive(i) {
    const first = vactive < 0;
    vactive = i;
    const item = VIDEOS[i];
    vsRoot.style.setProperty('--vid-accent', item.color);

    const paint = () => {
      $('#vsTag').innerHTML = L(item.tag);
      $('#vsTitle').innerHTML = L(item.title);
      $('#vsDesc').innerHTML = L(item.desc);
      $('#vsYtLink').href = item.url;
      vsInfo.classList.remove('out');
    };

    clearTimeout(vswap);
    if (first || reduced) {
      paint();
    } else {
      vsInfo.classList.add('out');
      vswap = setTimeout(paint, 170);
    }
  }

  function renderVideos() {
    vidCards.forEach((el, i) => {
      const d = vwrap(i - vpos);
      const a = Math.abs(d);
      const deg = d * VSTEP;
      const r = (deg * Math.PI) / 180;
      const o = a <= 1 ? 1 - 0.18 * a : a <= 2 ? 0.82 - 0.32 * (a - 1) : Math.max(0, 0.5 - 0.35 * (a - 2));

      el.style.transform = `translate3d(${Math.sin(r) * VRAD}px, 0, ${(Math.cos(r) - 1) * VRAD}px) rotateY(${deg}deg)`;
      el.style.opacity = o;
      el.style.zIndex = 100 - Math.round(a * 10);
      el.style.visibility = o < 0.02 ? 'hidden' : 'visible';
      el.style.pointerEvents = a < 3.2 ? 'auto' : 'none';
      el.classList.toggle('on', a < 0.5);
      el.setAttribute('aria-hidden', a > 2.5);
    });

    const idx = VN <= 1 ? 0 : ((Math.round(vpos) % VN) + VN) % VN;
    if (idx !== vactive) setVidActive(idx);
  }

  function tweenVideos(to) {
    if (VN <= 1) {
      vpos = 0;
      renderVideos();
      return;
    }
    cancelAnimationFrame(vraf);
    if (reduced) {
      vpos = to;
      renderVideos();
      return;
    }
    const from = vpos;
    const t0 = performance.now();
    const dur = 650;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      vpos = from + (to - from) * (1 - Math.pow(1 - k, 4));
      renderVideos();
      if (k < 1) vraf = requestAnimationFrame(step);
    };
    vraf = requestAnimationFrame(step);
  }

  const goVideo = (n) => tweenVideos(Math.round(vpos) + n);
  const goToVideo = (i) => tweenVideos(Math.round(vpos) + vwrap(i - Math.round(vpos)));

  function measureVideos() {
    vw = vidCards[0].offsetWidth || 540;
    VRAD = vw * 2.2;
    renderVideos();
  }

  addEventListener('resize', measureVideos);
  measureVideos();

  if (VN <= 1) {
    $('#vsPrev').style.display = 'none';
    $('#vsNext').style.display = 'none';
  }
  $('#vsPrev').onclick = () => goVideo(-1);
  $('#vsNext').onclick = () => goVideo(1);

  vsStage.addEventListener('pointerdown', (e) => {
    if (VN <= 1 || e.button > 0) return;
    cancelAnimationFrame(vraf);
    vdrag = { x: e.clientX, p: vpos, id: e.pointerId, lx: e.clientX, lt: e.timeStamp, v: 0 };
    vmoved = false;
  });

  vsStage.addEventListener('pointermove', (e) => {
    if (!vdrag) return;
    const dx = e.clientX - vdrag.x;
    if (!vmoved && Math.abs(dx) > 6) {
      vmoved = true;
      vsStage.setPointerCapture(vdrag.id);
      vsStage.classList.add('drag');
    }
    if (!vmoved) return;
    vpos = vdrag.p - dx / (vw * 0.95);
    const dt = e.timeStamp - vdrag.lt;
    if (dt > 0) vdrag.v = (e.clientX - vdrag.lx) / dt;
    vdrag.lx = e.clientX;
    vdrag.lt = e.timeStamp;
    renderVideos();
  });

  function endVideoDrag() {
    if (!vdrag) return;
    const v = vdrag.v;
    vdrag = null;
    vsStage.classList.remove('drag');
    if (vmoved) {
      tweenVideos(Math.round(vpos - Math.max(-1.5, Math.min(1.5, (v * 300) / (vw * 0.95)))));
    }
  }

  vsStage.addEventListener('pointerup', endVideoDrag);
  vsStage.addEventListener('pointercancel', endVideoDrag);
  vsStage.addEventListener('click', (e) => {
    if (vmoved) return;
    const c = e.target.closest('.vs-card');
    if (c && +c.dataset.i !== vactive) goToVideo(+c.dataset.i);
  });
}
