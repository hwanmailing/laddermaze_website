'use strict';
document.querySelectorAll('.store-badge').forEach(link => {
  const value = link.href.includes('apps.apple.com') ? window.LADDER_MAZE_CONFIG.appStoreUrl : window.LADDER_MAZE_CONFIG.playStoreUrl;
  try { const url = new URL(value); if (url.protocol === 'https:') link.href = url.href; } catch {}
});
const downloadDialog = document.querySelector('#download-dialog');
function openDialog(dialog, trigger) {
  dialog.returnFocus = trigger;
  dialog.showModal();
}
document.querySelectorAll('[data-play]').forEach(button => button.addEventListener('click', () => openDialog(downloadDialog, button))); 
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => dialog.returnFocus?.focus({preventScroll: true}));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  let backdropDown = false;
  const outside = event => {const r = dialog.getBoundingClientRect(); return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;};
  dialog.addEventListener('pointerdown', event => {backdropDown = outside(event);});
  dialog.addEventListener('click', event => {if (backdropDown && outside(event)) dialog.close(); backdropDown = false;});
});
