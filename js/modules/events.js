import { $, L, P } from '../utils/dom.js';
import { IMGS } from '../data/images.js';
import { EV, EV_META } from '../data/events.js';
import { openLightbox } from './lightbox.js';

// Events: card grid, category filters, detail dialog with paged photo gallery.

export function initEvents() {
  $('#evs').innerHTML=EV.map((e,i)=>{
    const meta=EV_META[i]||EV_META[0];
    const cover=IMGS[e.ph[0]]||'';
    return `<article class="ev-win" id="ev${i}" data-category="${meta.category}">
    <div class="ev-cover" data-open="${i}">
      <img src="${cover}" alt="${e.t[0]}" loading="lazy">
      <span class="chip">${L(e.tag)}</span>
      <span class="ev-photo-count">📷 ${e.ph.length}</span>
    </div>
    <div class="ev-win-body">
      <h3>${L(e.t)}</h3>
      <div class="ev-win-tl">${L(e.tl)}</div>
      <p class="ev-win-brief">${L(e.p[0])}</p>
      <div class="ev-win-foot">
        <button class="btn fill" type="button" data-open="${i}"><span class="en">Read More</span><span class="ar">اقرأ المزيد</span></button>
      </div>
    </div>
  </article>`;
  }).join('');

  $('#eventFilters').addEventListener('click',e=>{
    const b=e.target.closest('[data-filter]');
    if(!b)return;
    $('#eventFilters').querySelectorAll('.filter-btn').forEach(x=>x.classList.toggle('active',x===b));
    document.querySelectorAll('.ev-win').forEach(card=>card.classList.toggle('is-filtered-out',b.dataset.filter!=='all'&&card.dataset.category!==b.dataset.filter));
  });

  const evDlg=$('#evDlg'),evDlgBody=$('#evDlgBody');

  function openEventModal(i){
    const e=EV[i],meta=EV_META[i]||EV_META[0],cover=IMGS[e.ph[0]]||'';
    evDlgBody.innerHTML=`
    <div class="ev-dlg-hero"><img src="${cover}" alt="${e.t[0]}"></div>
    <div class="ev-dlg-content">
      <span class="chip">${L(e.tag)}</span>
      <h3 id="evDlgTitle">${L(e.t)}</h3>
      <div class="tl">${L(e.tl)}</div>
      ${e.p.map(P).join('')}
      <div class="event-highlight"><span class="spark" aria-hidden="true">✦</span><div><strong><span class="en">Key achievement</span><span class="ar">أبرز إنجاز</span></strong><p>${L(meta.highlight)}</p></div></div>
      <h4>${L(e.rh)}</h4>
      <ul>${e.r.map(x=>`<li>${L(x)}</li>`).join('')}</ul>
      ${e.q?`<h4>${L(e.q[0])}</h4>${P(e.q[1])}`:''}
      <p class="by">${L(e.by)}</p>
      ${e.video?`<div class="event-video"><video controls playsinline preload="metadata" poster="${e.poster||''}"><source src="${e.video}" type="video/mp4"></video></div>`:''}
      <div class="gal" id="modalGal"></div>
      <div class="mw"><button class="btn fill" id="modalMore" type="button"></button></div>
    </div>`;
    let n=0;
    const g=$('#modalGal'),b=$('#modalMore'),w=b.parentElement;
    function more(c){
      e.ph.slice(n,n+c).forEach((k,x)=>{
        const el=document.createElement('button');
        el.dataset.i=i;el.dataset.j=n+x;
        el.setAttribute('aria-label','Photo '+(n+x+1));
        el.innerHTML=`<img src="${IMGS[k]}" alt="${e.t[0]} photo ${n+x+1}" loading="lazy">`;
        g.appendChild(el);
      });
      n=Math.min(n+c,e.ph.length);
      if(n>=e.ph.length)w.remove();
      else b.innerHTML=L(['SHOW MORE ('+(e.ph.length-n)+' left)','عرض المزيد (باقي '+(e.ph.length-n)+')']);
    }
    more(9);
    b.addEventListener('click',()=>more(12));
    evDlg.scrollTop=0;
    evDlg.showModal();
  }

  $('#evs').addEventListener('click',e=>{
    const trigger=e.target.closest('[data-open]');
    if(trigger)openEventModal(+trigger.dataset.open);
  });
  $('#evx').onclick=()=>evDlg.close();
  evDlg.addEventListener('click',e=>{if(e.target===evDlg)evDlg.close()});


  // photo in the event gallery -> open full-screen lightbox
  evDlgBody.addEventListener('click',e=>{
    const b=e.target.closest('.gal button');
    if(b)openLightbox(EV[+b.dataset.i].ph,+b.dataset.j);
  });
}
