// Shared behaviour for project case-study pages
(function () {
  const nav = document.getElementById('nav');

  // Reading progress bar
  const bar = document.createElement('div');
  bar.className = 'proj-progress';
  document.body.appendChild(bar);

  // Back-to-top button
  const topBtn = document.createElement('button');
  topBtn.className = 'proj-top';
  topBtn.type = 'button';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.textContent = '↑';
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(topBtn);

  // Section numbers "1 · Title" -> badge + title
  document.querySelectorAll('.proj-section h2').forEach((h2) => {
    h2.innerHTML = h2.innerHTML.replace(/^\s*(\d+)\s*·\s*/, '<span class="proj-num">$1</span>');
  });

  // Wrap tables so they scroll sideways on small screens
  document.querySelectorAll('.proj-table').forEach((t) => {
    const w = document.createElement('div');
    w.className = 'proj-table-wrap';
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });

  // Table of contents (wide screens)
  const toc = document.querySelector('.proj-toc');
  const links = [];
  if (toc) {
    const title = document.createElement('div');
    title.className = 'proj-toc-title';
    title.textContent = 'On this page';
    toc.appendChild(title);
    document.querySelectorAll('.proj-section').forEach((s, i) => {
      const h2 = s.querySelector('h2');
      if (!h2) return;
      if (!s.id) s.id = 'section-' + (i + 1);
      const a = document.createElement('a');
      a.href = '#' + s.id;
      a.textContent = h2.textContent.replace(/^\s*\d+\s*/, '').trim();
      toc.appendChild(a);
      links.push([s, a]);
    });
  }

  const hero = document.querySelector('.proj-hero');
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    topBtn.classList.toggle('show', y > 600);
    if (toc) {
      toc.classList.toggle('show', hero ? hero.getBoundingClientRect().bottom < 80 : true);
      let current = null;
      for (const [s, a] of links) if (s.getBoundingClientRect().top < 170) current = a;
      links.forEach(([, a]) => a.classList.toggle('active', a === current));
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Click a figure to view it full-screen
  const lb = document.createElement('div');
  lb.className = 'proj-lightbox';
  lb.innerHTML = '<img alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.proj-section figure img').forEach((img) => {
    img.title = 'Click to enlarge';
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
})();
