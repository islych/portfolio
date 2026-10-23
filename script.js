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

// Native dialog keeps keyboard focus inside the enlarged screenshot.
const imageViewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerCaption = document.getElementById('viewer-caption');
if (imageViewer && typeof imageViewer.showModal === 'function') {
  document.querySelectorAll('.demo-image').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      viewerImage.src = link.href;
      viewerImage.alt = link.querySelector('img').alt;
      viewerCaption.textContent = link.dataset.caption;
      imageViewer.showModal();
      document.body.classList.add('viewer-open');
    });
  });
  imageViewer.querySelector('.viewer-close').addEventListener('click', () => imageViewer.close());
  imageViewer.addEventListener('click', event => {
    const bounds = imageViewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) imageViewer.close();
  });
  imageViewer.addEventListener('close', () => document.body.classList.remove('viewer-open'));
}
