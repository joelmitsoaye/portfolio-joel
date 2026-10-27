(function () {
  'use strict';

  /* ---------- Réalisations ---------- */
  var WORKS = [
    { f: 'r001', cat: 'Vision Yeux de Dieu', t: 'Joyeux mois d\'Octobre' },
    { f: 'r004', cat: 'Vision Yeux de Dieu', t: 'L\'Élu se réveille 3, mini séminaire' },
    { f: 'r005', cat: 'Vision Yeux de Dieu', t: 'Répétition : La constance' },
    { f: 'r006', cat: 'Vision Yeux de Dieu', t: 'Soirée de louange : Je respire' },
    { f: 'r009', cat: 'Vision Yeux de Dieu', t: 'L\'Élu se réveille, mini séminaire' },
    { f: 'r010', cat: 'Vision Yeux de Dieu', t: 'Méditation : La puissance de la continuité' },
    { f: 'r016', cat: 'Foire Estudiantine', t: 'Bienvenue à la Foire Estudiantine de Lomé' },
    { f: 'r015', cat: 'Foire Estudiantine', t: 'Jeunesse, compétence et inclusion numérique' },
    { f: 'r002', cat: 'Foire Estudiantine', t: 'Teasing : des ateliers, une ambiance festive' },
    { f: 'r003', cat: 'Foire Estudiantine', t: 'Teasing : connecter les talents' },
    { f: 'r011', cat: 'Foire Estudiantine', t: 'Fête de l\'indépendance' },
    { f: 'r012', cat: 'Foire Estudiantine', t: 'Bonne semaine aux FELiens' },
    { f: 'r0014', cat: 'Foire Estudiantine', t: 'Bonne semaine aux FELiens' },
    { f: 'r007', cat: 'Ayato Ganmenou', t: 'Pilotez votre entreprise de partout' },
    { f: 'r008', cat: 'Foire Estudiantine', t: 'Bonne semaine aux FELiens' },
    { f: 'r017', cat: 'Wiyao Aesthetics', t: 'Bannière Wiyao Aesthetics' }
  ];

  var gallery = document.getElementById('gallery');
  var filters = document.getElementById('filters');
  var cats = ['Tous'];
  WORKS.forEach(function (w) { if (cats.indexOf(w.cat) < 0) cats.push(w.cat); });

  cats.forEach(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = c; b.setAttribute('role', 'tab');
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(filters.children, function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      Array.prototype.forEach.call(gallery.children, function (fig) {
        var show = c === 'Tous' || fig.dataset.cat === c;
        fig.classList.toggle('hide', !show);
        if (show) requestAnimationFrame(function () { fig.classList.add('in'); });
      });
    });
    filters.appendChild(b);
  });

  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');

  WORKS.forEach(function (w) {
    var fig = document.createElement('figure');
    fig.dataset.cat = w.cat;
    var img = document.createElement('img');
    img.src = 'assets/img/works/' + w.f + '.webp';
    img.alt = w.t + ' (' + w.cat + ')';
    img.loading = 'lazy';
    var cap = document.createElement('figcaption');
    cap.textContent = w.cat + ' · ' + w.t;
    fig.appendChild(img); fig.appendChild(cap);
    fig.addEventListener('click', function () {
      lbImg.src = img.src; lbImg.alt = img.alt; lb.hidden = false;
    });
    gallery.appendChild(fig);
  });

  function closeLb() { lb.hidden = true; lbImg.src = ''; }
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ---------- Animations au défilement ---------- */
  var targets = document.querySelectorAll('.reveal, .gallery figure');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t, i) {
      t.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(t);
    });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  /* ---------- Mode sombre ---------- */
  var root = document.documentElement;
  var moon = document.getElementById('iconMoon');
  var sun = document.getElementById('iconSun');
  function paintIcons() {
    var dark = root.getAttribute('data-theme') === 'dark';
    moon.style.display = dark ? 'none' : 'block';
    sun.style.display = dark ? 'block' : 'none';
  }
  if (!root.getAttribute('data-theme') && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }
  paintIcons();
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    paintIcons();
  });

  /* ---------- Formulaire ---------- */
  var service = document.getElementById('service');
  var wrap = document.getElementById('autreWrap');
  var autre = document.getElementById('autre');
  service.addEventListener('change', function () {
    var isOther = service.value === 'autre';
    wrap.hidden = !isOther;
    autre.required = isOther;
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
