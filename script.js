// Year
document.getElementById('year').textContent = new Date().getFullYear();
// Sticky header shadow
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
  // Parallax hero
  const bg = document.getElementById('heroBg');
  if (bg) bg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
});
// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));
// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Counter animation
const counters = document.querySelectorAll('.count');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
    };
    requestAnimationFrame(step);
    counterObs.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObs.observe(c));
// Duplicate marquee items for seamless loop
const track = document.querySelector('.marquee-track');
if (track) {
  track.innerHTML += track.innerHTML;
}
// Contact form (no backend — opens WhatsApp / mail-like behavior)
function handleContact(e) {
  e.preventDefault();
  const f = e.target;
  const data = Object.fromEntries(new FormData(f).entries());
  const msg = `Hi Learning Potato! I'd like to book a Free Demo Class.%0A%0A`
    + `Name: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email || '-'}%0A`
    + `Class: ${data.class}%0ABoard: ${data.board}%0ASubject: ${data.subject}%0A`
    + `Message: ${data.message || '-'}`;
  window.open(`https://wa.me/918999949582?text=${msg}`, '_blank');
  f.reset();
  alert('Thanks! Redirecting you to WhatsApp to confirm your demo class request.');
  return false;
}
window.handleContact = handleContact;