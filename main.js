// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when resume section is visible
      if (entry.target.classList.contains('skill-fill-trigger')) {
        document.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .timeline-item, .hero-name, .hero-bio, .hero-cta, .section-title').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Set skill bar data-width from inline style, then reset to 0 for animation
document.querySelectorAll('.skill-fill').forEach(bar => {
  bar.dataset.width = bar.style.width;
  bar.style.width = '0';
});

// Trigger skill bars when resume section enters view
const resumeSection = document.getElementById('resume');
if (resumeSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  skillObserver.observe(resumeSection);
}

