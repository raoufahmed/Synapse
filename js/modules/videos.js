import { $, L, esc, safeColor, safeUrl } from '../utils/dom.js';
import { reduced } from '../utils/motion.js';
import { VIDS } from '../data/videos.js';

// Videos & Reels: 3D circular showcase of YouTube embeds.

export function initVideos() {
  const vsRoot=$('#vs'),vsStage=$('#vsStage'),vsInfo=$('#vsInfo'),vidsWrap=$('#vids');
  if(vsRoot&&vidsWrap){
    const VN=VIDS.length,VSTEP=26;
    vidsWrap.innerHTML=VIDS.map((v,i)=>`<div class="vs-card" data-i="${i}" style="--vid-accent:${safeColor(v.color)}" role="group" aria-roledescription="slide" aria-label="0${i+1} / 0${VN}"><div class="vs-face"><span class="vs-badge">0${i+1} / 0${VN}</span><div class="vs-frame"><iframe src="https://www.youtube.com/embed/${encodeURIComponent(v.id)}?rel=0&modestbranding=1" title="${esc(v.title[0])}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></div></div>`).join('');
    const vidCards=[...document.querySelectorAll('.vs-card')];
    let vpos=0,vw=540,VRAD=1100,vactive=-1,vraf=0,vswap=0,vdrag=null,vmoved=false;
    const vwrap=d=>{if(VN<=1)return 0;d=((d%VN)+VN)%VN;return d>VN/2?d-VN:d};
    function setVidActive(i){
      const first=vactive<0;vactive=i;
      const item=VIDS[i];
      vsRoot.style.setProperty('--vid-accent',item.color);
      const paint=()=>{
        $('#vsTag').innerHTML=L(item.tag);
        $('#vsTitle').innerHTML=L(item.title);
        $('#vsDesc').innerHTML=L(item.desc);
        $('#vsYtLink').href=safeUrl(item.url);
        vsInfo.classList.remove('out');
      };
      clearTimeout(vswap);
      if(first||reduced)paint();else{vsInfo.classList.add('out');vswap=setTimeout(paint,170)}
    }
    function vrender(){
      vidCards.forEach((el,i)=>{
        const d=vwrap(i-vpos),a=Math.abs(d),deg=d*VSTEP,r=deg*Math.PI/180;
        const o=a<=1?1-.18*a:a<=2?.82-.32*(a-1):Math.max(0,.5-.35*(a-2));
        el.style.transform=`translate3d(${Math.sin(r)*VRAD}px,0,${(Math.cos(r)-1)*VRAD}px) rotateY(${deg}deg)`;
        el.style.opacity=o;el.style.zIndex=100-Math.round(a*10);
        el.style.visibility=o<.02?'hidden':'visible';el.style.pointerEvents=a<3.2?'auto':'none';
        el.classList.toggle('on',a<.5);el.setAttribute('aria-hidden',a>2.5);
      });
      const idx=VN<=1?0:((Math.round(vpos)%VN)+VN)%VN;
      if(idx!==vactive)setVidActive(idx);
    }
    function vtween(to){
      if(VN<=1){vpos=0;vrender();return}
      cancelAnimationFrame(vraf);
      if(reduced){vpos=to;vrender();return}
      const from=vpos,t0=performance.now(),dur=650;
      const step=t=>{const k=Math.min(1,(t-t0)/dur);vpos=from+(to-from)*(1-Math.pow(1-k,4));vrender();if(k<1)vraf=requestAnimationFrame(step)};
      vraf=requestAnimationFrame(step);
    }
    const vgo=n=>vtween(Math.round(vpos)+n),vgoTo=i=>vtween(Math.round(vpos)+vwrap(i-Math.round(vpos)));
    function vmeasure(){vw=vidCards[0].offsetWidth||540;VRAD=vw*2.2;vrender()}
    addEventListener('resize',vmeasure);vmeasure();
    if(VN<=1){$('#vsPrev').style.display='none';$('#vsNext').style.display='none'}
    $('#vsPrev').onclick=()=>vgo(-1);
    $('#vsNext').onclick=()=>vgo(1);
    vsStage.addEventListener('pointerdown',e=>{if(VN<=1||e.button>0)return;cancelAnimationFrame(vraf);vdrag={x:e.clientX,p:vpos,id:e.pointerId,lx:e.clientX,lt:e.timeStamp,v:0};vmoved=false});
    vsStage.addEventListener('pointermove',e=>{
      if(!vdrag)return;const dx=e.clientX-vdrag.x;
      if(!vmoved&&Math.abs(dx)>6){vmoved=true;vsStage.setPointerCapture(vdrag.id);vsStage.classList.add('drag')}
      if(!vmoved)return;
      vpos=vdrag.p-dx/(vw*.95);const dt=e.timeStamp-vdrag.lt;
      if(dt>0)vdrag.v=(e.clientX-vdrag.lx)/dt;vdrag.lx=e.clientX;vdrag.lt=e.timeStamp;vrender();
    });
    function vendDrag(){
      if(!vdrag)return;const v=vdrag.v;vdrag=null;vsStage.classList.remove('drag');
      if(vmoved)vtween(Math.round(vpos-Math.max(-1.5,Math.min(1.5,v*300/(vw*.95)))));
    }
    vsStage.addEventListener('pointerup',vendDrag);vsStage.addEventListener('pointercancel',vendDrag);
    vsStage.addEventListener('click',e=>{if(vmoved)return;const c=e.target.closest('.vs-card');if(c&&+c.dataset.i!==vactive)vgoTo(+c.dataset.i)});
  }
}
