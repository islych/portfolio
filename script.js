const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 650) closeMenu();
});
