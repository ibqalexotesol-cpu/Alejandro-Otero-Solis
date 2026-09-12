const dialog = document.querySelector('dialog');
const enlarged = dialog.querySelector('img');
const caption = dialog.querySelector('p');
document.querySelectorAll('[data-photo]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    enlarged.src = link.href;
    enlarged.alt = link.querySelector('img').alt;
    caption.textContent = enlarged.alt;
    dialog.showModal();
  });
});
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

const categoryNavigation = document.querySelector('.categories');
const instruction = document.createElement('p');
instruction.className = 'category-instruction';
instruction.textContent = 'Selecciona una categoría para ver sus fotografías.';
categoryNavigation.before(instruction);
document.querySelectorAll(':is(.populated-gallery,#xv-anos)').forEach(gallery => {
  const back = document.createElement('a');
  back.className = 'gallery-back';
  back.href = '#portafolio';
  back.textContent = '← Volver a las categorías';
  gallery.prepend(back);
});
function updateCategoryNavigation() {
  categoryNavigation.querySelectorAll('a').forEach(link => {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', updateCategoryNavigation);
updateCategoryNavigation();