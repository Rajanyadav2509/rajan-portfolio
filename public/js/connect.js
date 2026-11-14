// Connect page form -> Render API, then show the thank-you card with the welcome-card animation
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const API='https://rajan-portfolio-38vr.onrender.com';
const f=$('#cf'),fs=$('#fs');
f.addEventListener('submit',async e=>{
 e.preventDefault();fs.className='';fs.textContent='';
 const d=Object.fromEntries(new FormData(f));let bad=false;
 $$('input,textarea',f).forEach(i=>i.classList.remove('invalid'));
 if(d.name.trim().length<2){f.name.classList.add('invalid');bad=true}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){f.email.classList.add('invalid');bad=true}
 if(d.message.trim().length<10){f.message.classList.add('invalid');bad=true}
 if(bad){fs.className='bad';fs.textContent='Please fix the highlighted fields.';return}
 const b=$('#send');b.disabled=true;b.textContent='Sending...';
 try{
  const c=new AbortController(),to=setTimeout(()=>c.abort(),20000);
  const r=await fetch(API+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d),signal:c.signal});
  clearTimeout(to);const j=await r.json();
  if(j.ok){
   // Hide the form, show the thank-you card with the welcome-card animation,
   // then return to the home page after a few seconds
   $('#formBox').style.display='none';
   const t=$('#thanks');t.classList.add('show');
   t.scrollIntoView({behavior:'smooth',block:'center'});
   setTimeout(()=>{location.href='/'},5000);
  }else if(r.status===429){fs.className='bad';fs.textContent='Too many messages sent. Please try again in a few minutes.'}
  else{fs.className='bad';fs.textContent=j.error||'Could not send. Please try again.'}
 }catch{fs.className='bad';fs.textContent='Could not reach the server. Please try again in a few minutes.'}
 b.disabled=false;b.textContent='Send message';
});
