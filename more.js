(function(){
const Q=s=>document.querySelector(s);
const ic=document.createElement('link');ic.rel='icon';ic.type='image/svg+xml';ic.href='icon.svg';document.head.appendChild(ic);
[['apple-mobile-web-app-title','Financial Calculator'],['apple-mobile-web-app-capable','yes'],['application-name','Financial Calculator']].forEach(a=>{const m=document.createElement('meta');m.name=a[0];m.content=a[1];document.head.appendChild(m)});
/* scientific calculator: auto multiply, fresh start after = */
let just=false;const _sp=sp;
sp=function(k){const last=ex.slice(-1),isNum=/^[0-9.]$/.test(k),isOpen=/^(\(|sin\(|cos\(|tan\(|log\(|ln\(|√\(|π|e)$/.test(k);
if(isNum&&just){ex='';hist=''}
else if((isOpen&&/[0-9.)πe]/.test(last))||(isNum&&/[)πe]/.test(last)))ex+='×';
_sp(k);just=(k==='='&&ex!=='')};
/* quick access row on home */
const POP=[['sip','SIP|SIP'],['emi','EMI|EMI'],['fd','FD|FD'],['tax','Income Tax|आयकर'],['gst','GST|GST'],['hra','HRA|HRA'],['swp','SWP|SWP'],['unit','Unit|यूनिट']];
const _r=render;render=function(){_r();if(view==='home'&&tab==='all'&&!q){const c=Q('.chips');if(c&&!Q('#pop')){const d=document.createElement('div');d.id='pop';d.className='chips';d.innerHTML=POP.filter(p=>C[p[0]]).map(p=>`<button class="chip" onclick="openCalc('${p[0]}',0)">${C[p[0]].i} ${t(p[1])}</button>`).join('');c.after(d)}}};
/* result photo card */
function card(){const r=cur.last,W=1080,c=document.createElement('canvas');c.width=c.height=W;const x=c.getContext('2d');
const g=x.createLinearGradient(0,0,W,W);g.addColorStop(0,'#0b3fb5');g.addColorStop(1,'#059669');x.fillStyle=g;x.fillRect(0,0,W,W);
x.fillStyle='rgba(255,255,255,.14)';x.beginPath();if(x.roundRect)x.roundRect(50,50,W-100,W-100,50);else x.rect(50,50,W-100,W-100);x.fill();
x.fillStyle='#fff';x.font='700 56px system-ui,sans-serif';x.textAlign='left';x.fillText(t(cur.n),100,160,W-200);
r.rows.slice(0,7).forEach((w,i)=>{const y=290+i*100;x.font='500 32px system-ui,sans-serif';x.fillStyle='rgba(255,255,255,.8)';x.textAlign='left';x.fillText(t(w[0]),100,y,430);
x.font='700 '+(w[2]?'50':'42')+'px system-ui,sans-serif';x.fillStyle=w[2]?'#fde047':'#fff';x.textAlign='right';x.fillText(t(w[1]),W-100,y,470)});
x.textAlign='center';x.fillStyle='rgba(255,255,255,.85)';x.font='500 30px system-ui,sans-serif';x.fillText('Financial Calculator – Made by V Pandey',W/2,W-110);x.fillText(location.host,W/2,W-70);
c.toBlob(b=>{const f=new File([b],cur.id+'.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f],text:t(cur.n)}).catch(()=>{});else{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=cur.id+'.png';document.body.appendChild(a);a.click();a.remove()}},'image/png')}
FX.card=card;
const _o=out;out=function(){_o();if(view!=='calc')return;const a=document.querySelectorAll('#out .acts'),l=a[a.length-1];if(l)l.insertAdjacentHTML('beforeend',`<button class="ib" onclick="FX.card()">🖼️ ${t('Card|कार्ड')}</button>`)};
render();
})();
