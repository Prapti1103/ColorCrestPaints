
  // Bootstrap validation styling
  (() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', evt => {
        if (!form.checkValidity()) { evt.preventDefault(); evt.stopPropagation(); }
        form.classList.add('was-validated');
      }, false);
    });
  })();

  // Simple email regex + contact success
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const msg = document.getElementById('message').value.trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    if(!name || !emailOk || !msg){ return; }
    this.classList.remove('was-validated');
    this.reset();
    document.getElementById('formSuccess').classList.remove('d-none');
    setTimeout(()=>document.getElementById('formSuccess').classList.add('d-none'), 3500);
  });

  // Store locator mini-validation
  document.getElementById('locateForm').addEventListener('submit', function(e){
    e.preventDefault();
    const pin = document.getElementById('pincode').value.replace(/\D/g,'');
    const err = document.getElementById('pinError');
    if(pin.length < 4){ err.style.display='block'; return; }
    err.style.display='none';
    alert('Showing stores near: ' + pin + ' (demo)');
  });

  // Tiny palette generator (base +/- lightness)
  function hexToHsl(hex){
    hex = hex.replace('#','');
    if(hex.length===3){ hex = hex.split('').map(c=>c+c).join(''); }
    const r = parseInt(hex.substr(0,2),16)/255;
    const g = parseInt(hex.substr(2,2),16)/255;
    const b = parseInt(hex.substr(4,2),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h, s, l = (max+min)/2;
    if(max===min){ h = s = 0; }
    else{
      const d = max-min;
      s = l > .5 ? d/(2-max-min) : d/(max+min);
      switch(max){
        case r: h = (g-b)/d + (g<b ? 6:0); break;
        case g: h = (b-r)/d + 2; break;
        case b: h = (r-g)/d + 4; break;
      }
      h *= 60;
    }
    return {h, s: s*100, l: l*100};
  }
  function hslToCss(h,s,l){ return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`; }

  document.getElementById('genPalette').addEventListener('click', ()=>{
    const base = document.getElementById('baseColor').value;
    const {h,s,l} = hexToHsl(base);
    const shades = [
      {h,s,l: Math.max(10, l-20)},
      {h,s,l},
      {h,s,l: Math.min(90, l+20)}
    ];
    const wrap = document.getElementById('palette');
    wrap.innerHTML='';
    shades.forEach(c=>{
      const sw = document.createElement('div');
      sw.style.width='48px'; sw.style.height='48px'; sw.style.borderRadius='10px';
      sw.style.boxShadow='0 6px 16px rgba(0,0,0,.12)';
      sw.style.border='1px solid rgba(0,0,0,.08)';
      sw.style.background = hslToCss(c.h,c.s,c.l);
      sw.title = sw.style.background;
      wrap.appendChild(sw);
    });
  });
