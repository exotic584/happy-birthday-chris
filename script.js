(() => {
  const $ = id => document.getElementById(id);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const show = id => {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
  };

  // Background: stars + floating hearts
  const bg = $('bg');
  if (!reduce) {
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.className = 'p star';
      const z = 2 + Math.random() * 3;
      Object.assign(s.style, { width: z + 'px', height: z + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', bottom: 'auto', opacity: .8, animationDelay: Math.random() * 3 + 's' });
      bg.appendChild(s);
    }
    const heart = () => {
      const h = document.createElement('span');
      h.className = 'p';
      h.textContent = ['💗', '💖', '✨', '🩷'][Math.floor(Math.random() * 4)];
      h.style.left = Math.random() * 100 + '%';
      h.style.fontSize = 12 + Math.random() * 18 + 'px';
      h.style.animationDuration = 7 + Math.random() * 6 + 's';
      bg.appendChild(h);
      setTimeout(() => h.remove(), 14000);
    };
    setInterval(heart, 700);
  }

  // Scene 1: countdown 5..1
  let n = 5;
  const count = $('count');
  const timer = setInterval(() => {
    n--;
    if (n > 0) {
      count.textContent = n;
      count.classList.remove('tick'); void count.offsetWidth; count.classList.add('tick');
    } else {
      clearInterval(timer);
      show('s2');
      setTimeout(() => { $('blow').hidden = false; }, 1200);
    }
  }, 1000);

  // Scene 2: blow candle
  let blown = false;
  $('blow').addEventListener('click', async e => {
    if (blown) return;
    blown = true;
    const btn = e.currentTarget;
    btn.hidden = true;
    $('s2').querySelector('.cake').classList.add('out');
    $('ready').textContent = 'ขอให้พรเป็นจริงนะ ✨';
    const r = btn.getBoundingClientRect();
    const fw = document.querySelector('.flame-wrap').getBoundingClientRect();
    if (!reduce) for (let i = 0; i < 24; i++) {
      const b = document.createElement('span');
      b.className = 'burst';
      b.textContent = ['✨', '💗', '⭐', '💖'][i % 4];
      b.style.left = fw.left + 'px'; b.style.top = fw.top + 'px';
      const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 130;
      b.style.setProperty('--x', Math.cos(a) * d + 'px');
      b.style.setProperty('--y', Math.sin(a) * d - 40 + 'px');
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 1500);
    }
    await wait(2800);
    show('s3');
  });

  // Scene 3 -> 4: open envelope
  let opened = false;
  $('envelope').addEventListener('click', async e => {
    if (opened) return;
    opened = true;
    e.currentTarget.classList.add('open');
    await wait(1000);
    show('s4');
    await wait(900);
    typeLetter();
  });

  // Scene 4: typewriter
  const TEXT = 'สุขสันต์วันเกิดนะคริส ขอให้เป็นปีอายุ 20 ที่มีความสุขมากๆทำอะไรก้มีแต่คนรักและเอ็นดูนะ ขอให้ทุกวันที่คริสตื่นมามีแต่เรื่องที่ให้มีรอยยิ้มเสมอ ฝันอะไรในอนาคตก้ขอให้มันเกิดขึ้นจริงนะ รักนะจุ๊บๆ😘';
  async function typeLetter() {
    const el = $('letter'), chars = Array.from(TEXT);
    if (reduce) { el.textContent = TEXT; }
    else {
      el.classList.add('typing');
      for (const c of chars) { el.textContent += c; await wait(c === ' ' ? 90 : 55); }
      el.classList.remove('typing');
    }
    await wait(500);
    $('sign').classList.add('show');
  }
})();
