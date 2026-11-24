import { $, L } from '../utils/dom.js';
import { reduced } from '../utils/motion.js';
import { COMS, COM_META, COM_IMG, LEAD_IMGS } from '../data/committees.js';

// Committees: 3D circular carousel (drag / arrows / click) + "Explore Committee" dialog.

export function initCommittees() {
  /* committees — 3D circular carousel */
  const csRoot=$('#cs'),csStage=$('#csStage'),csInfo=$('#csInfo'),comDlg=$('#comDlg');
  const N=COMS.length,STEP=24;
  const metaOf=i=>COM_META[i]||{icon:'✦',color:'#38bdf8'};
  $('#coms').innerHTML=COMS.map((c,i)=>{const m=metaOf(i);return `<div class="cs-card" data-i="${i}" style="--com-accent:${m.color}" role="group" aria-roledescription="slide" aria-label="${i+1} / ${N}"><div class="cs-face"><span class="cs-img"><img src="${COM_IMG[i]}" alt="" draggable="false" loading="lazy" decoding="async"><span class="cs-no">0${i+1} / 0${N}</span></span><h3>${L(c.name)}</h3></div></div>`}).join('');
  const comCards=[...document.querySelectorAll('.cs-card')];
  let pos=0,cw=300,RAD=450,active=-1,raf=0,swap=0,drag=null,moved=false;
  const wrapd=d=>{d=((d%N)+N)%N;return d>N/2?d-N:d};
  function setActive(i){
    const first=active<0;active=i;
    csRoot.style.setProperty('--com-accent',metaOf(i).color);
    const paint=()=>{$('#csName').innerHTML=L(COMS[i].name);$('#csDesc').innerHTML=L(COMS[i].desc);csInfo.classList.remove('out')};
    clearTimeout(swap);
    if(first||reduced)paint();else{csInfo.classList.add('out');swap=setTimeout(paint,170)}
  }
  function render(){
    comCards.forEach((el,i)=>{
      const d=wrapd(i-pos),a=Math.abs(d),deg=d*STEP,r=deg*Math.PI/180;
      const o=a<=1?1-.15*a:a<=2?.85-.3*(a-1):Math.max(0,.55-.35*(a-2));
      el.style.transform=`translate3d(${Math.sin(r)*RAD}px,0,${(Math.cos(r)-1)*RAD}px) rotateY(${deg}deg)`;
      el.style.opacity=o;el.style.zIndex=100-Math.round(a*10);
      el.style.visibility=o<.02?'hidden':'visible';el.style.pointerEvents=a<3.2?'auto':'none';
      el.classList.toggle('on',a<.5);el.setAttribute('aria-hidden',a>2.5);
    });
    const idx=((Math.round(pos)%N)+N)%N;if(idx!==active)setActive(idx);
  }
  function tween(to){
    cancelAnimationFrame(raf);
    if(reduced){pos=to;render();return}
    const from=pos,t0=performance.now(),dur=650;
    const step=t=>{const k=Math.min(1,(t-t0)/dur);pos=from+(to-from)*(1-Math.pow(1-k,4));render();if(k<1)raf=requestAnimationFrame(step)};
    raf=requestAnimationFrame(step);
  }
  const go=n=>tween(Math.round(pos)+n),goTo=i=>tween(Math.round(pos)+wrapd(i-Math.round(pos)));
  function measure(){cw=comCards[0].offsetWidth||300;RAD=cw*2.5;render()}
  addEventListener('resize',measure);measure();
  csStage.addEventListener('pointerdown',e=>{if(e.button>0)return;cancelAnimationFrame(raf);drag={x:e.clientX,p:pos,id:e.pointerId,lx:e.clientX,lt:e.timeStamp,v:0};moved=false});
  csStage.addEventListener('pointermove',e=>{
    if(!drag)return;const dx=e.clientX-drag.x;
    if(!moved&&Math.abs(dx)>6){moved=true;csStage.setPointerCapture(drag.id);csStage.classList.add('drag')}
    if(!moved)return;
    pos=drag.p-dx/(cw*.95);const dt=e.timeStamp-drag.lt;
    if(dt>0)drag.v=(e.clientX-drag.lx)/dt;drag.lx=e.clientX;drag.lt=e.timeStamp;render();
  });
  function endDrag(){
    if(!drag)return;const v=drag.v;drag=null;csStage.classList.remove('drag');
    if(moved)tween(Math.round(pos-Math.max(-1.5,Math.min(1.5,v*300/(cw*.95)))));
  }
  csStage.addEventListener('pointerup',endDrag);csStage.addEventListener('pointercancel',endDrag);
  csStage.addEventListener('click',e=>{if(moved)return;const c=e.target.closest('.cs-card');if(c&&+c.dataset.i!==active)goTo(+c.dataset.i)});
  let csVisible=true;
  if('IntersectionObserver' in window)new IntersectionObserver(([e])=>{csVisible=e.isIntersecting},{threshold:.2}).observe(csRoot);
  document.addEventListener('keydown',e=>{
    if(!csVisible||document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}else if(e.key==='ArrowRight'){e.preventDefault();go(1)}
  });
  function renderLeadCard(ld){
    const src=ld.imgKey&&LEAD_IMGS[ld.imgKey];
    const mono=(ld.name[0]||'').split(/\s+/).map(w=>w[0]||'').join('').slice(0,2).toUpperCase()||'SY';
    const avatar=src
      ?`<img src="${src}" alt="${ld.name[0]}" loading="lazy">`
      :`<span class="cm-lead-mono" aria-hidden="true">${mono}</span>`;
    return `<div class="cm-lead-card"><div class="cm-lead-avatar">${avatar}</div><div class="cm-lead-meta"><span class="cm-lead-role">${L(ld.role)}</span><div class="cm-lead-name">${L(ld.name)}</div></div></div>`;
  }
  $('#csExplore').onclick=()=>{
    const i=active,m=metaOf(i),c=COMS[i];
    const leadsList=(!c.hideLeads&&(c.leads||[])).filter(Boolean);
    const leadsHtml=leadsList.map(renderLeadCard).join('');
    const leadsSection=leadsHtml?`<div class="cm-leads-wrap"><div class="cm-leads-label"><span class="en">Committee Leadership</span><span class="ar">قيادة اللجنة</span></div><div class="cm-leads">${leadsHtml}</div></div>`:'';
    $('#cmBody').innerHTML=`<span class="cm-img"><img src="${COM_IMG[i]}" alt=""></span><div class="cm-txt"><span class="cs-no">0${i+1} / 0${N}</span><h3 id="cmTitle">${L(c.name)}</h3><p>${L(c.desc)}</p>${leadsSection}<a class="btn fill" href="#contact"><span class="en">Get in touch</span><span class="ar">تواصل معنا</span></a></div>`;
    comDlg.style.setProperty('--com-accent',m.color);comDlg.showModal();
  };
  $('#cmx').onclick=()=>comDlg.close();
  comDlg.addEventListener('click',e=>{if(e.target===comDlg||e.target.closest('a'))comDlg.close()});
}
