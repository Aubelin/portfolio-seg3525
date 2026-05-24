/**
 * SEG3525 – Devoir 1 · Portfolio de Benny Aubelin Cubahiro
 * JavaScript — interactions & animations V2
 * ─────────────────────────────────────────────────────────────
 * 1. Navbar opaque au scroll
 * 2. Lien actif selon la section visible (IntersectionObserver)
 * 3. Animations d'apparition avec délai de cascade
 * 4. Barre de progression de lecture
 * 5. Fermeture du menu hamburger après clic (mobile)
 * 6. Typewriter effect — sous-titre héro
 * 7. Counter animation — stats identitaires
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


// ─── 3. ANIMATIONS D'APPARITION avec cascade ─────────────────
// Assigne des délais de cascade aux cartes dans les grilles
document.querySelectorAll('.row').forEach(row => {
  const cards = row.querySelectorAll('.animate-on-scroll');
  cards.forEach((card, i) => {
    if (i > 0) card.setAttribute('data-delay', i);
  });
});

const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animObserver.observe(el);
});


// ─── 4. BARRE DE PROGRESSION DE LECTURE ──────────────────────
const progressBar = document.createElement('div');
progressBar.id = 'reading-progress';
Object.assign(progressBar.style, {
  position:      'fixed',
  top:           '0',
  left:          '0',
  width:         '0%',
  height:        '3px',
  background:    '#E94F37',
  zIndex:        '9999',
  transition:    'width 0.1s ease',
  borderRadius:  '0 2px 2px 0',
  pointerEvents: 'none',
});
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct       = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
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


// ─── 6. TYPEWRITER EFFECT — sous-titre héro ──────────────────
const typewriterEl = document.getElementById('typewriter');

if (typewriterEl) {
  const words = [
    'Développeur Full-Stack',
    'Ingénieur Logiciel',
    'Builder de produits',
    'React · Django · PostgreSQL',
    'Bilingue FR / EN',
  ];

  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function typewrite() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 55 : 110;

    // Fin de frappe → pause avant effacement
    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2200;
      isDeleting = true;
    }
    // Fin d'effacement → passer au mot suivant
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      delay = 380;
    }

    setTimeout(typewrite, delay);
  }

  // Lancer après un court délai pour que la page soit prête
  setTimeout(typewrite, 900);
}


// ─── 7. COUNTER ANIMATION — stats identitaires ───────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return; // skip stat-text (FR/EN, Fall 2026)

  const duration   = 1400; // ms
  const frameRate  = 16;   // ~60fps
  const totalSteps = duration / frameRate;
  const increment  = target / totalSteps;
  let   current    = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, frameRate);
}

// Observer dédié aux stat-cards pour déclencher le compteur
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-number[data-target]');
      if (numEl) animateCounter(numEl);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-card').forEach(card => {
  counterObserver.observe(card);
});


// ─── Console signature ────────────────────────────────────────
console.log(
  '%c Portfolio · Benny Aubelin Cubahiro ✓ ',
  'background:#E94F37;color:#fff;font-weight:bold;padding:4px 10px;border-radius:4px;'
);
