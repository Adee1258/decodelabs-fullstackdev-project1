/* ===========================================================
   DevStack Portfolio — script.js
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav    = document.getElementById('mainNav');
  const navList    = document.getElementById('navList');

  const closeMenu = () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.addEventListener('click', toggleMenu);

  // FIX: manually smooth-scroll on anchor click (works on file:// too)
  navList.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        closeMenu();
        const target = document.querySelector(href);
        if (target) {
          const headerH = document.getElementById('header').offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - headerH;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // Also fix hero section buttons (View Projects / Get in Touch)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.classList.contains('nav-link')) return; // already handled above
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- 2. Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- 3. Back-to-top ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 4. Contact form ---------- */
  const form         = document.getElementById('contactForm');
  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMsg   = document.getElementById('formSuccess');

  const errors = {
    name:    document.getElementById('nameError'),
    email:   document.getElementById('emailError'),
    message: document.getElementById('messageError'),
  };

  const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validateField = (input, key, msg) => {
    input.dataset.touched = 'true';
    const value = input.value.trim();
    let ok = value.length > 0;
    if (key === 'email' && ok) ok = isValidEmail(value);
    errors[key].textContent = ok ? '' : msg;
    return ok;
  };

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('blur', () => {
      if (input === nameInput)    validateField(nameInput,    'name',    'Please enter your name.');
      if (input === emailInput)   validateField(emailInput,   'email',   'Please enter a valid email address.');
      if (input === messageInput) validateField(messageInput, 'message', 'Please write a short message.');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.textContent = '';
    const vN = validateField(nameInput,    'name',    'Please enter your name.');
    const vE = validateField(emailInput,   'email',   'Please enter a valid email address.');
    const vM = validateField(messageInput, 'message', 'Please write a short message.');
    if (vN && vE && vM) {
      successMsg.textContent = `Thanks, ${nameInput.value.trim()}! Your message has been noted.`;
      form.reset();
      Object.values(errors).forEach(el => (el.textContent = ''));
      [nameInput, emailInput, messageInput].forEach(el => delete el.dataset.touched);
    }
  });

  /* ---------- 5. Show More / Show Less ---------- */
  const showMoreBtn  = document.getElementById('showMoreBtn');
  const hiddenCards  = document.querySelectorAll('.project-card--hidden');

  if (showMoreBtn && hiddenCards.length > 0) {
    showMoreBtn.addEventListener('click', () => {
      const isExpanded = showMoreBtn.getAttribute('aria-expanded') === 'true';
      hiddenCards.forEach(card => {
        if (isExpanded) {
          card.classList.remove('project-card--visible');
          card.setAttribute('aria-hidden', 'true');
        } else {
          card.classList.add('project-card--visible');
          card.setAttribute('aria-hidden', 'false');
        }
      });
      showMoreBtn.setAttribute('aria-expanded', String(!isExpanded));
      showMoreBtn.textContent = isExpanded ? 'Show More Projects' : 'Show Less';
    });
  }

  /* ---------- 6. Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- 7. Header shadow on scroll ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 2px 10px rgba(0,0,0,0.06)' : 'none';
  }, { passive: true });

});
