const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],I='/images/';
const services=[['Social media management','Planning, publishing, scheduling and day-to-day support.'],['LinkedIn content and marketing','Content built for professional audiences and personal brands.'],['Content strategy','Pillars, topics, hooks, formats, CTAs and calendars.'],['Personal branding','Turn expertise and opinions into a clear professional identity.'],['Content creation and design','Text posts, carousels, educational graphics, promo creatives.'],['Audience engagement','Thoughtful comments and ongoing relationship-building.'],['Promotional communication','Outreach and promotional DMs that fit the brand.'],['YouTube SEO packs','Titles, descriptions, hashtags, tags, thumbnail text, summaries.']];
$('#svc').innerHTML=services.map((s,i)=>`<article class="card rv"><h3><span class="ic">${'&#9733;&#9998;&#9881;&#9823;&#9674;&#9993;&#9873;&#9654;'.split(';').filter(Boolean)[i]||'&#9733;'};</span>${s[0]}</h3><p>${s[1]}</p></article>`).join('');
const car=[
{t:'Carousel 01: Consistency',f:'Alexx Roy, 5 slides',e:[24,15,2,'153 impressions'],s:['cover','1','2','3','close'],p:'c1',live:'c1-live',alt:'Consistency carousel slide'},
{t:'Carousel 02: The PACT Framework',f:'Amarendra Nath Sasmal, 9 slides',e:[33,32,0],s:['cover','1','2','3','4','5','6','7','close'],p:'c2',live:'c2-live',alt:'PACT Framework carousel slide'},
{t:'Carousel 03: 7 Signs of Depletion',f:'Amarendra Nath Sasmal, 10 slides',e:[39,44,1],s:['cover','1','2','3','4','5','6','7','todo','close'],p:'c3',live:'c3-live',alt:'7 Signs of Depletion carousel slide',extra:'c3-latest'}];
$('#car').innerHTML=car.map((c,k)=>{const sl=c.s.map((n,i)=>`<button data-zoom="${I}${c.p}-${n}.jpg" aria-label="Enlarge slide ${i+1}"><img loading="lazy" src="${I}${c.p}-${n}.jpg" alt="${c.alt} ${i+1}" width="300" height="375"></button>`).join('');
const lv=[c.live,c.extra].filter(Boolean).map(n=>`<button class="live" data-zoom="${I}${n}.jpg" aria-label="Enlarge live LinkedIn post"><span class="tag">Live on LinkedIn</span><img loading="lazy" src="${I}${n}.jpg" alt="Live LinkedIn post for ${c.t}" width="300" height="375"></button>`).join('');
return `<div class="cb rv" id="car-${k+1}"><div class="cb-head"><div><h3>${c.t}</h3><span class="mut">for ${c.f}</span></div><div class="eng"><span><b>${c.e[0]}</b> reactions</span><span><b>${c.e[1]}</b> comments</span><span><b>${c.e[2]}</b> reposts</span>${c.e[3]?`<span><b>${c.e[3].split(' ')[0]}</b> impressions</span>`:''}</div></div>
<div class="track-wrap"><button class="arr l" aria-label="Previous slides" data-d="-1">&#8249;</button><div class="track" tabindex="0">${sl}${lv}</div><button class="arr r" aria-label="Next slides" data-d="1">&#8250;</button></div></div>`}).join('');
$$('.arr').forEach(b=>b.onclick=()=>{const t=$('.track',b.parentElement);t.scrollBy({left:b.dataset.d*t.clientWidth*.8,behavior:'smooth'})});
const ch=[
{n:'Himanshu Agrawaal',c:36,img:'yt-himanshu',d:'Business growth, systems and founder productivity. @thehimanshuagrawaal',snap:'6.4K subscribers, 894 videos, 689K lifetime views',w:['Titles, descriptions, hashtags, tags, thumbnail text and summaries for 36 videos.','Topics: business systems, scaling, sales funnels, ads, mindset.','Keywords for founders, e.g. business scaling strategy, CEO productivity, delegation.'],pk:'Stop being the bottleneck',ti:['How to Run a Business Without Being There | CEO System Explained','Build a Business That Runs Without You (CEO Productivity System)'],th:'Business Without You, CEO System Secret, Stop Being Bottleneck, Smart CEO Strategy',tg:'how to build a business system, how to run business without owner, remove bottleneck in business operations, how ceos delegate work effectively',h:'#businesssystems #entrepreneurmindset #ceoproductivity #delegation'},
{n:'Vedastram',c:15,img:'yt-vedastram',d:"India's animated universe of ancient Indian knowledge. @Vedastram",snap:'14.5K subscribers, 184 videos, 381K lifetime views',w:['15 SEO packs for animated stories and explainers on Indian knowledge.','Topics: vrat and fasting, temple science, Ayurveda, yoga, Gurukul, Satvik living.','Bilingual Hindi and English keywords for parents, kids and curious learners.'],pk:'Real meaning of vrat',ti:['Real Meaning of Vrat Explained | Moral Story for Kids','Why Do We Fast? Science + Moral Story for Kids'],th:'Real Meaning Vrat, Fasting Secret Kids, Vrat Story Lesson, Self Control Story',tg:'vrat meaning for kids hindi, vrat kya hota hai simple explanation, fasting moral story for kids hindi, hindi kahani',h:'#moralstory #kidsstory #vrat #fasting #hindistories'},
{n:'HiveStrat | HR as CEO',c:13,img:'yt-hivestrat',d:'HR leadership podcast turning HR into a profit engine. @HiveStratHR',snap:'275 subscribers, 85 videos, new episode every Tuesday',w:['13 SEO packs for HR as CEO podcast episodes and clips.','Topics: onboarding, HR metrics, KPIs, execution, culture, retention.','Keywords for HR leaders and founders, e.g. employee retention, 30-60-90 day plan.'],pk:'The 90-day hiring mistake',ti:['Why New Employees Quit in 90 Days (Fix This Onboarding Mistake)','The 90-Day Onboarding Framework Every Company Should Use'],th:'90-Day Hiring Mistake, Onboarding System Secret, Why Employees Quit, Fix Your Onboarding',tg:'how to reduce employee turnover in first 90 days, employee onboarding process for new hires, 30 60 90 day onboarding plan explained',h:'#onboarding #hrstrategy #employeeretention #workplaceculture'}];
$('#yt').innerHTML=ch.map(c=>`<article class="ch rv" id="${['ch-himanshu','ch-vedastram','ch-hivestrat'][ch.indexOf(c)]}"><button class="shot" data-zoom="${I}${c.img}.jpg" aria-label="Enlarge ${c.n} channel screenshot"><img loading="lazy" src="${I}${c.img}.jpg" alt="YouTube channel screenshot of ${c.n}" width="1345" height="798"></button>
<div><span class="n">${c.c} SEO packs delivered</span><h3>${c.n}</h3><small>${c.d}<br>Channel snapshot: ${c.snap}</small><ul>${c.w.map(x=>`<li>${x}</li>`).join('')}</ul>
<div class="pk"><h4>Sample pack: ${c.pk}</h4><p><b>Titles:</b> ${c.ti.join(' / ')}</p><p><b>Thumbnail text:</b> ${c.th}</p><p><b>Tags:</b> ${c.tg}</p><p><b>Hashtags:</b> ${c.h}</p></div></div></article>`).join('');
$('#packs').innerHTML=[['Himanshu Agrawaal',36,'ch-himanshu'],['Vedastram',15,'ch-vedastram'],['HiveStrat (Padma ji)',13,'ch-hivestrat'],['Akhilesh Ji',12,'more-akhilesh'],['AYK Ji',12,'more-ayk'],['Amarendra Ji',11,'more-amarendra'],['Shubh',1,'more-shubh']].map(p=>`<a href="#${p[2]}" data-jump="${p[2]}" aria-label="${p[0]}, ${p[1]} SEO packs. Jump to details">${p[0]} <b>${p[1]}</b><i aria-hidden="true">&#8595;</i></a>`).join('');
$('#more').innerHTML=[['Akhilesh Ji','12 packs','Excel and Power BI tutorials','Excel Timeline Hack, Excel vs Power BI, Auto K/M Format, Stop Manual Work'],['AYK Ji','12 packs','Yoga, Himalayan wisdom and mindset','Real Yoga Source, Himalaya Secret Truth, Rewire Your Brain'],['Amarendra Ji','11 packs','Career growth and emotional fatigue','Silent Career Killer, Promotion Trap, You\'re Not Lazy, Why You Burn Out'],['Shubh','1 pack','High-ticket sales','High Ticket Secret']].map(m=>`<article class="card rv" id="more-${m[0].split(' ')[0].toLowerCase()}"><h3>${m[0]}</h3><p><b>${m[1]}</b>. ${m[2]}.</p><p style="margin-top:.5rem;font-size:.9rem">Example videos: ${m[3]}</p></article>`).join('');
// lightbox
const lb=$('#lb'),lbi=$('img',lb);document.addEventListener('click',e=>{const z=e.target.closest('[data-zoom]');if(z){lbi.src=z.dataset.zoom;lbi.alt=$('img',z)?.alt||'';lb.hidden=false;$('#lbx').focus()}else if(e.target===lb||e.target.id==='lbx')lb.hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
// nav
const burger=$('#burger'),menu=$('#menu');burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};menu.onclick=e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}};
// button ripple
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rip';const d=Math.max(r.width,r.height);s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)});
// reveal + counters
const count=el=>{const n=+el.dataset.n,s=el.dataset.s||'',t0=performance.now();(function f(t){const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+(p===1?s:'');if(p<1)requestAnimationFrame(f)})(t0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');$$('[data-n]',e.target).forEach(count);if(e.target.dataset.n)count(e.target);io.unobserve(e.target)}}),{threshold:.15});
$$('.rv,.total,.stats').forEach(x=>io.observe(x));$('#yr').textContent=new Date().getFullYear();
// contact form -> /api/contact
const f=$('#cf'),fs=$('#fs');f.addEventListener('submit',async e=>{e.preventDefault();fs.className='';fs.textContent='';
 const d=Object.fromEntries(new FormData(f));let bad=false;
 $$('input,textarea',f).forEach(i=>i.classList.remove('invalid'));
 if(d.name.trim().length<2){f.name.classList.add('invalid');bad=true}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){f.email.classList.add('invalid');bad=true}if(d.message.trim().length<10){f.message.classList.add('invalid');bad=true}
 if(bad){fs.className='bad';fs.textContent='Please fix the highlighted fields.';return}
 const b=$('#send');b.disabled=true;b.textContent='Sending...';
 try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});const j=await r.json();
  if(j.ok){fs.className='ok';fs.textContent='Thank you. Your message is sent and I will reply within one working day.';f.reset()}else{fs.className='bad';fs.textContent=j.error||'Could not send. Please try again.'}}
 catch{fs.className='bad';fs.textContent='Network problem. Please email me directly instead.'}
 b.disabled=false;b.textContent='Send message'});
// premium: hero rotating text, scroll progress, portrait tilt
(()=>{const w=['manage LinkedIn content','design carousels that get saved','write YouTube SEO packs','grow personal brands'],r=$('#rot');let i=0,j=0,del=false;
 const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;if(rm){r.textContent=w[0];r.style.animation='none'}else(function t(){const s=w[i];j+=del?-1:1;r.textContent=s.slice(0,j);let d=del?35:70;if(!del&&j===s.length){del=true;d=1600}else if(del&&j===0){del=false;i=(i+1)%w.length;d=300}setTimeout(t,d)})();
 const p=$('#prog');addEventListener('scroll',()=>{p.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%'},{passive:true});
 const pt=$('#pt');if(pt&&!rm&&matchMedia('(hover:hover)').matches){pt.onmousemove=e=>{const b=pt.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;pt.style.transform=`rotateY(${x*10}deg) rotateX(${-y*10}deg)`};pt.onmouseleave=()=>pt.style.transform=''}})();

// extra animations: reveal variants, heading underline, active nav link
(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 $$('#about .two>div:first-child,.client .shotwrap').forEach(x=>x.classList.add('rv','left'));
 $$('#about .two>div:last-child,.client>div:not(.shotwrap)').forEach(x=>x.classList.add('rv','right'));
 $$('.card:not(.rv),.total,.faq details,.tablewrap,.steps.row li').forEach(x=>x.classList.add('rv','zoom'));
 $$('h2').forEach(x=>x.classList.add('rv'));
 $$('.rv:not(.in)').forEach(x=>io.observe(x));
 const links=$$('#menu a[href^="#"]:not(.btn)'),secs=links.map(a=>$(a.getAttribute('href'))).filter(Boolean);
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
 secs.forEach(s=>so.observe(s));
})();

// nav gets a solid state after scrolling
(()=>{const n=$('#nav');const t=()=>n.classList.toggle('scrolled',scrollY>30);addEventListener('scroll',t,{passive:true});t()})();

// animation pack 2
(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,hov=matchMedia('(hover:hover)').matches;
 // headline: word-by-word reveal
 const h1=$('.hero h1');if(h1&&!rm){const words=h1.textContent.trim().split(/\s+/);h1.setAttribute('aria-label',h1.textContent.trim());h1.innerHTML=words.map((w,i)=>`<span class="w" aria-hidden="true" style="--i:${i}">${w}</span>`).join(' ');h1.classList.add('split')}
 // floating particles
 const dots=$('#dots');if(dots&&!rm){for(let i=0;i<16;i++){const b=document.createElement('b'),s=2+Math.random()*4;b.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;animation-duration:${9+Math.random()*12}s;animation-delay:${-Math.random()*15}s`;dots.appendChild(b)}}
 // staggered children + timeline
 $$('.chips,.packs,.why,.kpis,.eng,.ch ul,.steps:not(.row)').forEach(g=>{g.classList.add('stag');[...g.children].forEach((c,i)=>c.style.setProperty('--i',i));io.observe(g)});
 const tl=$('.tl');if(tl)io.observe(tl);
 if(!rm){
  // cursor spotlight on cards
  if(hov)document.addEventListener('mousemove',e=>{const c=e.target.closest&&e.target.closest('.card,.ch');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
  // magnetic buttons
  if(hov){document.addEventListener('mousemove',e=>{const b=e.target.closest&&e.target.closest('.btn:not([disabled])');if(!b)return;const r=b.getBoundingClientRect();b.style.setProperty('--bx',((e.clientX-r.left-r.width/2)*.18)+'px');b.style.setProperty('--by',((e.clientY-r.top-r.height/2)*.28)+'px')},{passive:true});
   document.addEventListener('mouseout',e=>{const b=e.target.closest&&e.target.closest('.btn');if(b&&!b.contains(e.relatedTarget)){b.style.setProperty('--bx','0px');b.style.setProperty('--by','0px')}})}
 }
 // hero parallax + back to top
 const aur=$('.aurora'),tt=$('#totop');let tick=false;
 const upd=()=>{tick=false;const y=scrollY;if(aur&&!rm&&y<innerHeight*1.2)aur.style.setProperty('--py',(y*.18)+'px');tt.classList.toggle('show',y>700)};
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
 tt.onclick=()=>scrollTo({top:0,behavior:rm?'auto':'smooth'});
})();

// pack chips: smooth scroll to the matching channel and highlight it
document.addEventListener('click',e=>{const a=e.target.closest('[data-jump]');if(!a)return;const t=document.getElementById(a.dataset.jump);if(!t)return;e.preventDefault();
 const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;t.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'});
 history.replaceState(null,'','#'+a.dataset.jump);t.classList.remove('flash');void t.offsetWidth;setTimeout(()=>{t.classList.add('flash');setTimeout(()=>t.classList.remove('flash'),1800)},rm?0:450)});

// client stats count up with thousands separators; WhatsApp hint
(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 if(!rm){const els=$$('[data-cn]');els.forEach(el=>el.textContent='0');
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.cn,t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString('en-US');if(p<1)requestAnimationFrame(f)})(t0);cio.unobserve(el)}),{threshold:.6});
  els.forEach(el=>cio.observe(el))}
 const wa=$('#wa');if(wa&&!rm){setTimeout(()=>{wa.classList.add('hint');setTimeout(()=>wa.classList.remove('hint'),3500)},3500)}
})();

// client strip: seamless, always moving right to left at any screen width
(()=>{const m=$('.marq'),d=m&&$('div',m);if(!d)return;
 const base=[...d.children].slice(0,d.children.length/2);
 const build=()=>{d.innerHTML='';base.forEach(s=>d.appendChild(s));
  const w=d.scrollWidth;if(!w)return;
  const n=Math.ceil(innerWidth/w)+1;
  for(let k=0;k<n;k++)base.forEach(s=>{const c=s.cloneNode(true);c.setAttribute('aria-hidden','true');d.appendChild(c)});
  d.style.setProperty('--w',w+'px');d.style.setProperty('--dur',(w/55).toFixed(1)+'s');m.classList.add('js')};
 let t;const rb=()=>{clearTimeout(t);t=setTimeout(build,200)};
 (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(build);addEventListener('resize',rb);
})();

// visit tracking (no personal data) + availability badge and announcement bar from admin settings
(()=>{const send=(e,x={})=>{try{const b=JSON.stringify({e,...x});navigator.sendBeacon?navigator.sendBeacon('/api/track',new Blob([b],{type:'application/json'})):fetch('/api/track',{method:'POST',headers:{'Content-Type':'application/json'},body:b,keepalive:true})}catch{}};
 send('view');try{if(!sessionStorage.getItem('v')){sessionStorage.setItem('v','1');let ref='';try{const u=new URL(document.referrer);if(u.host!==location.host)ref=u.hostname.replace(/^www\./,'')}catch{}send('visit',{ref})}}catch{}
 document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const h=a.getAttribute('href')||'';if(h.includes('wa.me'))send('wa');else if(/\.pdf$/.test(h))send('resume');else if(h.startsWith('mailto:'))send('email');else if(h.startsWith('tel:'))send('phone');else if(h==='#contact')send('cta')});
 fetch('/api/settings',{cache:'no-store'}).then(r=>r.json()).then(s=>{const b=$('.badge');if(b){b.lastChild.textContent=s.text;b.classList.toggle('off',!s.available)}
  if(s.banner){const d=document.createElement('div');d.className='announce';d.textContent=s.banner.text+' ';if(s.banner.link){const a=document.createElement('a');a.href=s.banner.link;a.textContent=s.banner.linkText||'Learn more';d.appendChild(a)}document.body.prepend(d);document.documentElement.style.setProperty('--ab',d.offsetHeight+'px')}}).catch(()=>{});
})();
