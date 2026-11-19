(function(){
const Q=s=>document.querySelector(s);
let S=[];try{S=JSON.parse(ls('saved')||'[]')}catch(e){}
let cmp=null,dp=null,zm=parseFloat(ls('zoom'))||1;
const THEMES=[['#059669','5,150,105','#4f46e5'],['#2563eb','37,99,235','#f59e0b'],['#7c3aed','124,58,237','#10b981'],['#d97706','217,119,6','#2563eb'],['#db2777','219,39,119','#0ea5e9'],['#0f766e','15,118,110','#e11d48']];
const INF=['sip','mf','lumpsum','fd','rd','ppf','ssy','ci','nps','epf'];
const FORM={sip:'FV = P × [((1+i)ⁿ − 1) ÷ i] × (1+i)',mf:'FV = P × [((1+i)ⁿ − 1) ÷ i] × (1+i)',lumpsum:'A = P × (1+r)ᵗ',cagr:'CAGR = (Final ÷ Initial)^(1÷years) − 1',emi:'EMI = P×r×(1+r)ⁿ ÷ ((1+r)ⁿ − 1)',home:'EMI = P×r×(1+r)ⁿ ÷ ((1+r)ⁿ − 1)',car:'EMI = P×r×(1+r)ⁿ ÷ ((1+r)ⁿ − 1)',personal:'EMI = P×r×(1+r)ⁿ ÷ ((1+r)ⁿ − 1)',fd:'A = P × (1 + r÷4)^(4t)',ci:'A = P × (1 + r÷n)^(n×t)',si:'SI = P × R × T ÷ 100',hra:'Exempt = min(HRA, Rent − 10% Basic, 50%/40% Basic)',gratuity:'Basic × 15 ÷ 26 × Years',roi:'ROI = (Final − Invested) ÷ Invested × 100'};
const FAQ=[['What is a SIP?|SIP क्या है?','A Systematic Investment Plan invests a fixed amount every month in a mutual fund.|SIP में हर महीने एक तय रकम म्यूचुअल फंड में लगाई जाती है।'],['How can I reduce my EMI burden?|EMI का बोझ कैसे कम करें?','Make part-prepayments, choose a longer tenure, or move to a lower-rate lender. See the Loan Prepayment calculator.|बीच-बीच में प्रीपेमेंट करें, अवधि बढ़ाएँ या कम ब्याज वाले बैंक में लोन ट्रांसफर करें। लोन प्रीपेमेंट कैलकुलेटर देखें।'],['Are the results exact?|क्या नतीजे सटीक हैं?','No. They are estimates based on the numbers you enter. Real returns and rates change.|नहीं, ये आपके डाले आँकड़ों पर आधारित अनुमान हैं। असली रिटर्न और दरें बदलती रहती हैं।'],['Is my data stored on a server?|क्या मेरा डेटा सर्वर पर जाता है?','No. Everything stays in your own browser.|नहीं, सब कुछ आपके अपने ब्राउज़र में ही रहता है।'],['New or old tax regime, which is better?|नया या पुराना टैक्स रिजीम, कौन सा बेहतर?','Use the Old vs New Tax calculator with your deductions to compare.|अपनी कटौतियों के साथ पुराना बनाम नया टैक्स कैलकुलेटर चलाकर तुलना करें।']];
const AL={'सिप':'sip','एसआईपी':'sip','ईएमआई':'emi','जीएसटी':'gst','एफडी':'fd','आरडी':'rd','पीपीएफ':'ppf','एनपीएस':'nps','ईपीएफ':'epf','एचआरए':'hra','एसडब्ल्यूपी':'swp','सीएजीआर':'cagr','आरओआई':'roi','बीएमआई':'bmi'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const words=n=>{n=Math.abs(n);return n>=1e7?'₹'+(n/1e7).toFixed(2)+' '+t('Crore|करोड़'):n>=1e5?'₹'+(n/1e5).toFixed(2)+' '+t('Lakh|लाख'):n>=1e3?'₹'+(n/1e3).toFixed(1)+' '+t('Thousand|हज़ार'):fmt(n)};
const st=document.createElement('style');st.textContent=`
body{padding-bottom:calc(92px + env(safe-area-inset-bottom,0px))}
.bnav{position:fixed;left:0;right:0;bottom:0;z-index:50;display:flex;justify-content:center;padding:8px 14px calc(8px + env(safe-area-inset-bottom,0px))}
.bnav>div{width:100%;max-width:480px;display:flex;background:var(--glass);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);border:1px solid var(--bd);border-radius:26px;box-shadow:var(--sh);padding:6px;gap:4px}
.bnav button{flex:1;background:none;border:none;color:var(--tx2);font-size:11px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:6px 0;border-radius:18px}
.bnav button span{font-size:20px}.bnav button.on{color:var(--ac);background:var(--acs)}
.sheet{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center}
.sheet>div{width:100%;max-width:480px;max-height:85vh;overflow:auto;background:var(--bg);color:var(--tx);border-radius:30px 30px 0 0;padding:22px}
.sheet h3{margin:6px 0 10px;font-size:16px}.sheet p{margin:6px 0}.sheet summary{padding:6px 0}.sheet a,.foot a{color:var(--ac);font-weight:600}
.swr{display:flex;gap:12px;margin:8px 0 14px}.sw{width:34px;height:34px;border-radius:50%;border:3px solid var(--bd);cursor:pointer;display:block}
.cmp{margin-top:18px;font-size:13px}.cmp td:nth-child(1),.cmp th:nth-child(1){text-align:left}
.toast{position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:var(--ac);color:#fff;padding:10px 18px;border-radius:16px;font-size:13px;font-weight:600;z-index:200}
.ckb{position:fixed;left:12px;right:12px;bottom:calc(88px + env(safe-area-inset-bottom,0px));max-width:456px;margin:auto;z-index:60;background:var(--glass);backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);border:1px solid var(--bd);border-radius:20px;padding:12px 14px;font-size:12px;display:flex;gap:10px;align-items:center;color:var(--tx)}
.vb{border-color:var(--acs)}`;
document.head.appendChild(st);
const ml=document.createElement('link');ml.rel='manifest';ml.href='manifest.json';document.head.appendChild(ml);
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
function closeS(){const d=$('sh2');if(d)d.remove()}
function sheet(h){closeS();const d=document.createElement('div');d.className='sheet noprint';d.id='sh2';d.innerHTML=`<div>${h}<button class="ib" style="width:100%;margin-top:16px" onclick="FX.close()">${t('Close|बंद करें')}</button></div>`;d.onclick=e=>{if(e.target===d)closeS()};document.body.appendChild(d)}
function applyCol(i){const c=THEMES[i]||THEMES[0],r=document.documentElement.style;r.setProperty('--ac',c[0]);r.setProperty('--acs','rgba('+c[1]+',.18)');r.setProperty('--c2',c[2])}
function applyVals(v){if(!cur)return;cur.f.forEach(f=>{const k=f[0];if(v[k]===undefined)return;if(f[3]==='sel'||f[3]==='date'){const e=$('f_'+k);if(e)e.value=v[k]}else{const n=$('n_'+k),r=$('r_'+k);if(n)n.value=v[k];if(r)r.value=v[k]}})}
const fv=(f,v)=>f[3]==='sel'?t(f[4][v]):f[3]==='date'?v:f[6]==='₹'?fmt(v):v+(f[6]?' '+f[6]:'');
const txt=()=>t(cur.n)+'\n'+cur.last.rows.map(x=>t(x[0])+': '+t(x[1])).join('\n')+'\n'+location.href;
/* new calculators */
const add=(c,ci)=>{CALCS.push(c);C[c.id]=c;if(ci!=null)CATS[ci].c.push(c.id)};
add({id:'budget',i:'🧾',n:'Budget Planner 50/30/20|बजट प्लानर 50/30/20',f:[['inc','Monthly Income|मासिक आमदनी',40000,5000,1000000,1000,'₹'],['nd','Needs %|ज़रूरतें %',50,10,80,1,'%'],['wt','Wants %|शौक/मौज %',30,0,60,1,'%']],fn:v=>{const n=v.inc*v.nd/100,w=v.inc*v.wt/100,s=v.inc-n-w;return{rows:[['Needs|ज़रूरतें',fmt(n)],['Wants|शौक/मौज',fmt(w)],['Savings|बचत',fmt(s),1],['Savings %|बचत %',pc(s/v.inc*100)]],donut:[Math.max(0,s),n+w],dl:['Savings|बचत','Spending|खर्च']}}},5);
add({id:'networth',i:'🏦',n:'Net Worth|कुल संपत्ति',f:[['a','Property & Gold|ज़मीन-मकान और सोना',2000000,0,100000000,50000,'₹'],['b','Investments|निवेश',500000,0,100000000,10000,'₹'],['c','Cash & Bank|नकद और बैंक',100000,0,100000000,5000,'₹'],['l','Loans & Debts|कर्ज़',800000,0,100000000,10000,'₹']],fn:v=>{const as=v.a+v.b+v.c;return{rows:[['Total Assets|कुल संपत्ति',fmt(as)],['Total Liabilities|कुल कर्ज़',fmt(v.l)],['Net Worth|शुद्ध संपत्ति',fmt(as-v.l),1]],donut:[Math.max(0,as-v.l),v.l],dl:['Net Worth|शुद्ध संपत्ति','Liabilities|कर्ज़']}}},5);
add({id:'term',i:'🛡️',n:'Term Cover Needed|टर्म बीमा कवर',f:[['inc','Annual Income|सालाना आय',600000,100000,50000000,50000,'₹'],['y','Years of income to cover|कितने साल की आय',15,5,30,1,'Yr'],['l','Loans to cover|चुकाने वाले लोन',500000,0,50000000,50000,'₹'],['e','Existing cover + savings|मौजूदा कवर + बचत',500000,0,100000000,50000,'₹']],note:'Rule of thumb: 10-15× yearly income.|मोटा नियम: सालाना आय का 10-15 गुना।',fn:v=>({rows:[['Recommended cover|ज़रूरी कवर',fmt(Math.max(0,v.inc*v.y+v.l-v.e)),1],['Income replacement|आय की भरपाई',fmt(v.inc*v.y)]]})},5);
add({id:'pivot',i:'📌',n:'Pivot Points|पिवट पॉइंट्स',f:[['h','High|हाई',105,1,1000000,1,'₹'],['l','Low|लो',95,1,1000000,1,'₹'],['c','Close|क्लोज़',100,1,1000000,1,'₹']],fn:v=>{const p=(v.h+v.l+v.c)/3,f=x=>'₹'+x.toFixed(2);return{rows:[['Pivot|पिवट',f(p),1],['R1',f(2*p-v.l)],['R2',f(p+v.h-v.l)],['R3',f(v.h+2*(p-v.l))],['S1',f(2*p-v.h)],['S2',f(p-(v.h-v.l))],['S3',f(v.l-2*(v.h-p))]]}}},6);
CATS.splice(CATS.length-1,0,{id:'rural',i:'🌾',n:'Farming & Rural|खेती और ग्रामीण',c:[]});
const RC=CATS.length-2;
add({id:'kcc',i:'🚜',n:'KCC Loan Interest|KCC लोन ब्याज',f:[['p','Loan Amount|लोन राशि',100000,10000,3000000,5000,'₹'],['r','Interest Rate|ब्याज दर',9,2,15,.5,'%'],['m','Months|महीने',12,1,12,1,''],['g','Repayment|चुकौती',0,'sel',['On time (−5% benefit)|समय पर (−5% लाभ)','Late|देर से']]],note:'Assumes 2% subvention + 3% prompt-repayment benefit. Please verify with your bank.|2% सब्सिडी + 3% समय पर चुकौती लाभ माना है। अपने बैंक से जाँच लें।',fn:v=>{const e=v.g===0?Math.max(0,v.r-5):v.r,i=v.p*e*v.m/1200;return{rows:[['Effective rate|प्रभावी दर',pc(e)],['Interest|ब्याज',fmt(i)],['Total to repay|कुल चुकाना',fmt(v.p+i),1]],donut:[v.p,i],dl:[PR,INT],main:v.p+i}}},RC);
add({id:'crop',i:'🌽',n:'Crop Profit|फसल का मुनाफ़ा',f:[['a','Area (acre)|क्षेत्रफल (एकड़)',2,.5,100,.5,''],['y','Yield (qtl / acre)|उपज (क्विंटल/एकड़)',20,1,200,1,''],['p','Price (₹ / qtl)|भाव (₹/क्विंटल)',2200,100,20000,50,'₹'],['c','Cost (₹ / acre)|लागत (₹/एकड़)',25000,1000,300000,1000,'₹']],fn:v=>{const rv=v.a*v.y*v.p,co=v.a*v.c,pf=rv-co;return{rows:[['Revenue|आमदनी',fmt(rv)],['Cost|लागत',fmt(co)],['Profit|मुनाफ़ा',fmt(pf),1],['Profit per acre|मुनाफ़ा प्रति एकड़',fmt(v.a?pf/v.a:0)]],donut:[co,Math.max(0,pf)],dl:['Cost|लागत','Profit|मुनाफ़ा'],main:pf}}},RC);
add({id:'milk',i:'🥛',n:'Dairy Income|दूध का हिसाब',f:[['n','Animals|पशु',5,1,200,1,''],['l','Litres / day / animal|लीटर/दिन/पशु',8,1,40,.5,''],['r','Rate (₹ / litre)|भाव (₹/लीटर)',45,10,120,1,'₹'],['f','Feed cost (₹ / animal / day)|चारा खर्च (₹/पशु/दिन)',150,10,800,10,'₹']],fn:v=>{const i=v.n*v.l*v.r*30,c=v.n*v.f*30;return{rows:[['Monthly income|मासिक आमदनी',fmt(i)],['Monthly feed cost|मासिक चारा खर्च',fmt(c)],['Monthly profit|मासिक मुनाफ़ा',fmt(i-c),1]],donut:[c,Math.max(0,i-c)],dl:['Cost|खर्च','Profit|मुनाफ़ा'],main:i-c}}},RC);
/* wrappers */
const _r=render;render=function(){_r();navR();if(view==='home'){const c=Q('.chips'),SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(c&&SR){const b=document.createElement('button');b.className='chip';b.textContent='🎤';b.onclick=FX.mic;c.appendChild(b)}}};
const _cv=calcV;calcV=function(){_cv();applyVals(vals);out()};
const _out=out;out=function(){_out();addX()};
const _hg=homeGrid;homeGrid=function(){const o=q;let s=q.trim().toLowerCase();for(const k in AL)if(s.includes(k))s=s.replace(k,AL[k]);q=s;try{_hg()}finally{q=o}};
const _oc=openCat;openCat=function(id){try{history.pushState({n:1},'')}catch(e){}_oc(id)};
const _ok=openCalc;openCalc=function(id,i){try{history.pushState({n:1},'')}catch(e){}_ok(id,i)};
addEventListener('popstate',()=>{closeS();if(view!=='home')back()});
function navR(){const on=view==='home'&&tab==='all'&&!q?'h':view==='home'&&tab==='fav'?'f':'';let n=Q('.bnav');if(!n){n=document.createElement('div');n.className='bnav noprint';document.body.appendChild(n)}n.innerHTML='<div>'+[['h','🏠','Home|होम','FX.home()'],['f','⭐','Favorites|पसंदीदा','FX.favs()'],['s','💾','Saved|सेव','FX.saved()'],['g','⚙️','Settings|सेटिंग','FX.settings()']].map(b=>`<button class="${on===b[0]?'on':''}" onclick="${b[3]}"><span>${b[1]}</span>${t(b[2])}</button>`).join('')+'</div>'}
function addX(){if(view!=='calc'||!$('out')||!cur||!cur.last)return;const r=cur.last;let h='';
if(r.main!=null&&isFinite(r.main)){h+=`<div class="note">≈ ${words(r.main)}</div>`;if(INF.includes(cur.id)&&vals.t>0)h+=`<div class="note">${t('Worth in today\'s money (6% inflation)|आज की कीमत में (6% महंगाई मानकर)')}: <b>${fmt(r.main/Math.pow(1.06,vals.t))}</b></div>`}
if(FORM[cur.id])h+=`<div class="note">📐 ${t('Formula|फ़ॉर्मूला')}: ${FORM[cur.id]}</div>`;
h+=`<div class="acts noprint"><button class="ib" onclick="FX.setA()">⚖️ ${t('Compare (set A)|तुलना (A बनाएँ)')}</button>${cmp&&cmp.id===cur.id?`<button class="ib" onclick="FX.clrA()">✖ ${t('Clear A|A हटाएँ')}</button>`:''}<button class="ib" onclick="FX.save()">💾 ${t('Save|सेव')}</button><button class="ib" onclick="FX.wa()">🟢 WhatsApp</button>${r.table?`<button class="ib" onclick="FX.csv()">⬇️ CSV</button>`:''}</div>`;
if(cmp&&cmp.id===cur.id){const d=cur.f.filter(f=>cmp.v[f[0]]!=vals[f[0]]).map(f=>[t(f[1]),fv(f,cmp.v[f[0]]),fv(f,vals[f[0]])]),rr=r.rows.map((x,i)=>[t(x[0]),cmp.rows[i]?t(cmp.rows[i][1]):'-',t(x[1])]);
h+=`<div class="cmp"><b>⚖️ ${t('Comparison|तुलना')}</b><div class="tw"><table><tr><th></th><th>A</th><th>B (${t('now|अभी')})</th></tr>${[...d,...rr].map(x=>`<tr>${x.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table></div></div>`}
$('out').insertAdjacentHTML('beforeend',h)}
window.FX={close:closeS,
home(){view='home';tab='all';q='';cat=null;try{history.replaceState(null,'',location.pathname)}catch(e){}closeS();render();scrollTo(0,0)},
favs(){view='home';tab='fav';q='';cat=null;closeS();render();scrollTo(0,0)},
setA(){cmp={id:cur.id,v:{...vals},rows:JSON.parse(JSON.stringify(cur.last.rows))};out();toast(t('Saved as A. Now change the values to compare.|A के रूप में सेव। अब वैल्यू बदलकर तुलना देखें।'))},
clrA(){cmp=null;out()},
save(){const n=prompt(t('Name this calculation|इस गणना का नाम लिखें'),t(cur.n));if(!n)return;S.push({n,id:cur.id,v:{...vals}});S=S.slice(-30);ls('saved',JSON.stringify(S));toast(t('Saved ✓|सेव हो गया ✓'))},
saved(){sheet(`<h3>💾 ${t('Saved calculations|सेव की गई गणनाएँ')}</h3>`+(S.length?S.map((s,i)=>`<div class="rr"><span onclick="FX.open(${i})" style="cursor:pointer;color:var(--ac);font-weight:700">${esc(s.n)}</span><span><button class="ib" onclick="FX.del(${i})">🗑</button></span></div>`).join(''):`<div class="empty">${t('Nothing saved yet|अभी कुछ सेव नहीं है')}</div>`))},
open(i){const s=S[i];if(!s||!C[s.id])return;closeS();openCalc(s.id,0);vals=Object.assign({},vals,s.v);applyVals(vals);out()},
del(i){S.splice(i,1);ls('saved',JSON.stringify(S));FX.saved()},
wa(){window.open('https://wa.me/?text='+encodeURIComponent(txt()),'_blank')},
csv(){const tb=cur.last.table;if(!tb)return;const c2=c=>'"'+String(c).replace(/"/g,'""')+'"',rows=[tb.head.map(h=>c2(t(h))),...tb.body.map(b=>b.map(c2))].map(r=>r.join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+rows],{type:'text/csv'}));a.download=cur.id+'.csv';document.body.appendChild(a);a.click();a.remove()},
mic(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;const r=new SR();r.lang=lang==='hi'?'hi-IN':'en-IN';r.onresult=e=>{q=e.results[0][0].transcript.replace(/[.।]/g,'');render()};r.start()},
col(i){applyCol(i);ls('col',i)},
zoom(d){zm=Math.min(1.3,Math.max(.85,Math.round((zm+d)*100)/100));Q('.app').style.zoom=zm;ls('zoom',zm)},
install(){if(dp){dp.prompt();dp=null}else alert(t('Open the browser menu and choose "Add to Home screen".|ब्राउज़र मेन्यू खोलकर "Add to Home screen" चुनें।'))},
clear(){['favs','recent','saved'].forEach(k=>ls(k,'[]'));S=[];favs=[];recent=[];toast(t('Cleared|मिटा दिया'));closeS();render()},
settings(){sheet(`<h3>⚙️ ${t('Settings|सेटिंग')}</h3><div class="note">${t('Colour theme|रंग थीम')}</div><div class="swr">${THEMES.map((c,i)=>`<i class="sw" style="background:${c[0]}" onclick="FX.col(${i})"></i>`).join('')}</div><div class="note">${t('Text size|अक्षर का आकार')}</div><div class="acts"><button class="ib" onclick="FX.zoom(-.1)">A−</button><button class="ib" onclick="FX.zoom(.1)">A+</button></div><div class="acts"><button class="ib" onclick="toggleLang();FX.settings()">🌐 ${lang==='en'?'हिंदी':'English'}</button><button class="ib" onclick="toggleTheme();FX.settings()">🌓 ${t('Dark / Light|डार्क / लाइट')}</button></div><div class="acts"><button class="ib" onclick="FX.install()">📲 ${t('Install app|ऐप इंस्टॉल करें')}</button></div><h3 style="margin-top:18px">❓ FAQ</h3>${FAQ.map(x=>`<details><summary>${t(x[0])}</summary><p class="note">${t(x[1])}</p></details>`).join('')}<div class="note" style="margin-top:14px"><a href="privacy.html#privacy">Privacy Policy</a> · <a href="privacy.html#terms">Disclaimer</a> · <a href="privacy.html#about">About</a> · <a href="privacy.html#contact">Contact</a></div><div class="acts"><button class="ib" onclick="FX.clear()">🗑 ${t('Clear my saved data|मेरा सेव डेटा मिटाएँ')}</button></div>`)}};
/* footer links, cookie notice, saved look */
const ft=Q('.foot');if(ft)ft.insertAdjacentHTML('beforeend','<div><a href="privacy.html#privacy">Privacy</a> · <a href="privacy.html#terms">Disclaimer</a> · <a href="privacy.html#about">About</a> · <a href="privacy.html#contact">Contact</a></div>');
if(!ls('ck')){const b=document.createElement('div');b.className='ckb noprint';b.innerHTML=`<span style="flex:1">🍪 ${t('This site uses local storage and may show ads. By continuing you accept our Privacy Policy.|यह साइट लोकल स्टोरेज इस्तेमाल करती है और विज्ञापन दिखा सकती है। आगे बढ़ने का मतलब है कि आप हमारी प्राइवेसी पॉलिसी मानते हैं।')}</span><button class="ib">OK</button>`;b.querySelector('button').onclick=()=>{ls('ck','1');b.remove()};document.body.appendChild(b)}
applyCol(parseInt(ls('col'))||0);if(zm!==1)Q('.app').style.zoom=zm;
render();
})();
