/**
 * SEG3525 – Devoir 1 · Portfolio de Benny Aubelin Cubahiro
 * JavaScript : interactions de la page
 * ─────────────────────────────────────────────────────────────
 * 1. Navbar opaque au scroll
 * 2. Lien actif selon la section visible (IntersectionObserver)
 * 3. Animations d'apparition des cartes
 * 4. Barre de progression de lecture
 * 5. Fermeture du menu hamburger après clic (mobile)
 */

// ─── 1. NAVBAR – opacité au scroll ───────────────────────────
const navbar = document.getElementById('main-nav');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}


// ─── 2. LIEN ACTIF dans la navbar ────────────────────────────
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));


// ─── 3. ANIMATIONS D'APPARITION ──────────────────────────────
const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animObserver.observe(el);
});


// ─── 4. BARRE DE PROGRESSION DE LECTURE ──────────────────────
const progressBar = document.createElement('div');
progressBar.id = 'reading-progress';
Object.assign(progressBar.style, {
  position:     'fixed',
  top:          '0',
  left:         '0',
  width:        '0%',
  height:       '3px',
  background:   '#E94F37',
  zIndex:       '9999',
  transition:   'width 0.1s ease',
  borderRadius: '0 2px 2px 0',
  pointerEvents: 'none',
});
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop   = window.scrollY;
  const docHeight   = document.documentElement.scrollHeight - window.innerHeight;
  const pct         = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${pct}%`;
}, { passive: true });


// ─── 5. FERMER LE MENU HAMBURGER (mobile) ────────────────────
const navCollapse = document.getElementById('navMenu');
if (navCollapse) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}


// ─── Debug console ────────────────────────────────────────────
console.log(
  '%c Portfolio · Benny Aubelin Cubahiro ✓ ',
  'background:#E94F37;color:#fff;font-weight:bold;padding:4px 8px;border-radius:4px;'
);
