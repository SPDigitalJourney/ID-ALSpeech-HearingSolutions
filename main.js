// ============================================
// IDÉAL Speech & Hearing Solutions
// Global JS — Navbar, Mobile Menu, FAQ, Modal
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll shadow ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // --- Hamburger / Mobile Menu ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // --- Lead Capture Modal ---
  const overlay = document.getElementById('leadModal');
  document.querySelectorAll('[data-modal="lead"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (overlay) overlay.classList.add('open');
    });
  });
  if (overlay) {
    overlay.querySelector('.modal-close')?.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  }

  // --- Lead Form → WhatsApp ---
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = document.getElementById('lf-name')?.value || '';
      const phone   = document.getElementById('lf-phone')?.value || '';
      const service = document.getElementById('lf-service')?.value || 'General enquiry';
      const msg = encodeURIComponent(
        `Hello IDÉAL! 👋\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${service}\n\nPlease help me book a consultation.`
      );
      window.open(`https://wa.me/919482110420?text=${msg}`, '_blank');
      if (overlay) overlay.classList.remove('open');
    });
  }

  // --- Active nav link highlight ---
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // --- Animate elements on scroll ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .stat-strip, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    observer.observe(el);
  });
});
