/* ===========================================================
   DevStack Portfolio — script.js
   Basic state management & interactive functionality (no framework)
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');

  const closeMenu = () => {
    navList.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = navList.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close menu after a link is tapped (mobile UX)
  navList.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- 2. Highlight active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 120; // offset for sticky header

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- 3. Back-to-top button ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 4. Contact form validation (client-side state) ---------- */
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMsg = document.getElementById('formSuccess');

  const errors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    message: document.getElementById('messageError'),
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateField = (input, key, message) => {
    input.dataset.touched = 'true';
    const value = input.value.trim();
    let isValid = value.length > 0;

    if (key === 'email' && isValid) {
      isValid = isValidEmail(value);
    }

    errors[key].textContent = isValid ? '' : message;
    return isValid;
  };

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('blur', () => {
      if (input === nameInput) validateField(nameInput, 'name', 'Please enter your name.');
      if (input === emailInput) validateField(emailInput, 'email', 'Please enter a valid email address.');
      if (input === messageInput) validateField(messageInput, 'message', 'Please write a short message.');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.textContent = '';

    const validName = validateField(nameInput, 'name', 'Please enter your name.');
    const validEmail = validateField(emailInput, 'email', 'Please enter a valid email address.');
    const validMessage = validateField(messageInput, 'message', 'Please write a short message.');

    if (validName && validEmail && validMessage) {
      // No backend in this project — simulate a successful submission.
      successMsg.textContent = `Thanks, ${nameInput.value.trim()}! Your message has been noted.`;
      form.reset();
      Object.values(errors).forEach(el => (el.textContent = ''));
      [nameInput, emailInput, messageInput].forEach(el => delete el.dataset.touched);
    } else {
      successMsg.textContent = '';
    }
  });

  /* ---------- 5. Projects "Show More / Show Less" toggle ---------- */
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenCards = document.querySelectorAll('.project-card--hidden');

  if (showMoreBtn && hiddenCards.length > 0) {
    showMoreBtn.addEventListener('click', () => {
      const isExpanded = showMoreBtn.getAttribute('aria-expanded') === 'true';

      hiddenCards.forEach(card => {
        if (isExpanded) {
          // Collapse: hide cards again
          card.classList.remove('project-card--visible');
          card.setAttribute('aria-hidden', 'true');
        } else {
          // Expand: reveal hidden cards
          card.classList.add('project-card--visible');
          card.setAttribute('aria-hidden', 'false');
        }
      });

      showMoreBtn.setAttribute('aria-expanded', String(!isExpanded));
      showMoreBtn.textContent = isExpanded ? 'Show More Projects' : 'Show Less';
    });
  }

  /* ---------- 6. Footer year (small dynamic touch) ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- 7. Header shrink-on-scroll (subtle interactivity) ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 2px 10px rgba(0,0,0,0.06)' : 'none';
  }, { passive: true });

});
