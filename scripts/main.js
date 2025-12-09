// Minimal JS for the redesign scaffold
document.addEventListener('DOMContentLoaded',()=>{
  console.log('Redesign scaffold loaded');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('expanded');
      if(!expanded) nav.removeAttribute('hidden'); else nav.setAttribute('hidden','');
    });
  }
});

// Contact form handler: posts to data-endpoint if set, otherwise falls back to mailto
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contact-form');
  if(!form) return;
  const status = document.getElementById('contact-status');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };
    if(!data.name || !data.email || !data.message){
      status.textContent = 'Please complete required fields.';
      return;
    }
    const endpoint = form.getAttribute('data-endpoint') || '';
    try{
      if(endpoint){
        // POST as JSON to configured endpoint
        const res = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        if(res.ok){ status.textContent = 'Message sent. Thank you.'; form.reset(); }
        else { status.textContent = 'Failed to send message (server).'; }
      } else {
        // Mailto fallback
        const subject = encodeURIComponent((data.subject || 'Contact form message'));
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
        window.location.href = `mailto:info@maconnc.org?subject=${subject}&body=${body}`;
        status.textContent = 'Opening mail client...';
      }
    } catch(err){
      console.error(err);
      status.textContent = 'An error occurred. Please try again.';
    }
  });
});
