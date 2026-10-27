document.querySelector('#year').textContent = new Date().getFullYear();
const message = document.querySelector('#message');
document.querySelectorAll('[data-plan]').forEach(link => {
  link.addEventListener('click', () => {
    message.value = `Интересует пакет «${link.dataset.plan}». `;
  });
});
const dialog = document.querySelector('#demo-dialog');
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  dialog.showModal();
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => {
  button.addEventListener('click', () => dialog.close());
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
