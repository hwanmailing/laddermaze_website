'use strict';

const icons = {
  key: '<path fill="#ad7900" d="M34 2h14v4h6v6h4v14h-4v6H42v4h-6v6h-6v6h-6v8H12v-6H6V40h6v-6h6v-6h8v-6h4V8h4z"/><path fill="#ffdf25" d="M34 2h14v4h6v6h4v10h-4v6H42v-4h-6v8h-6v6h-6v6h-4v10h-8v-6H6v-8h6v-6h6v-6h8v-6h4V8h4zm4 8v12h10V10z"/><path fill="#ffef76" d="M34 6h14v4H38v8h-4zM14 34h6v6h-6z"/>',
  exit: '<path fill="#00a68c" d="M13 7h34v45h8v6H5v-6h8z"/><path fill="#00f0b9" d="M17 3h34v49h7v5H7v-5h10zm6 7v42h21V10z"/><path fill="#00dfb0" d="M29 16h10v11H29zm-3 14h16v5h-5v13h-4v-9h-3v9h-4z"/><path fill="#003f4a" d="M32 19h4v5h-4z"/>',
  traps: '<path fill="#92091c" d="M2 52h60v8H2z"/><path fill="#fc203a" d="M3 52v-9h4V31h4v13h4v8h3V27h4V12h4v23h4v17h3V24h4V4h4v30h4v18h3V37h4V24h4v21h4v7z"/><path fill="#ff8670" d="M7 43h3v12H7zm15-16h3v27h-3zm15-5h3v30h-3zm15 17h3v15h-3z"/>',
  enemy: '<path fill="#70549c" d="M3 4h7v7h6v7h7v-6h18v6h7v-7h6V4h7v21h-6v7h-7v8h5v16H12V40h5v-8h-7v-7H3z"/><path fill="#b690dd" d="M5 2h6v10h7v8h9v-7h10v7h9v-8h7V2h6v20h-7v7h-8v9h5v16H15V38h5v-9h-8v-7H5z"/><path fill="#281447" d="M21 32h7v7h-7zm16 0h7v7h-7zM28 43h9v6h-9z"/>',
  gem: '<path fill="#006d9c" d="M12 7h40v5h6v25L35 60h-6L6 37V12h6z"/><path fill="#00c5f5" d="M13 5h38v5h6v23L33 57h-2L7 33V10h6z"/><path fill="#00e2ff" d="M17 9h29v22L32 51 17 30z"/><path fill="#3aebff" d="M13 10h5v20h-5z"/><path fill="#008ad5" d="M46 10h7v21L34 50l12-22z"/>',
};
function pixelIcon(name, extraClass = '') {
  return `<svg class="feature-icon ${extraClass}" viewBox="0 0 64 64" aria-hidden="true" shape-rendering="crispEdges">${icons[name]}</svg>`;
}
const apple = '<svg viewBox="0 0 24 28" aria-hidden="true"><path fill="white" d="M17.4 4.5c1-1.2 1.7-2.8 1.5-4.5-1.5.1-3.3 1-4.3 2.2-1 1.1-1.8 2.8-1.6 4.3 1.7.1 3.3-.8 4.4-2zM21.3 14.9c0-3.4 2.8-5.1 2.9-5.2-1.6-2.4-4.1-2.7-5-2.8-2.1-.2-4.2 1.3-5.3 1.3-1.1 0-2.8-1.3-4.6-1.2-2.4 0-4.6 1.4-5.8 3.5-2.5 4.3-.6 10.7 1.8 14.2 1.2 1.7 2.5 3.5 4.3 3.3 1.8-.1 2.4-1.1 4.6-1.1 2.1 0 2.8 1.1 4.7 1.1 1.9-.1 3.1-1.7 4.2-3.4 1.4-1.9 1.9-3.8 1.9-3.9-.1 0-3.7-1.4-3.7-5.8z" transform="translate(-2 0) scale(.93)"/></svg>';
const google = '<svg viewBox="0 0 28 32" aria-hidden="true"><path fill="#32bbff" d="M1 1l16 15L1 31z"/><path fill="#00ed84" d="M1 1l19 11-4 5z"/><path fill="#ffce00" d="M20 12l7 4-7 4-5-4z"/><path fill="#ff4058" d="M1 31l19-11-4-5z"/></svg>';
function safeUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '#'; } catch { return '#'; }
}
function createStoreBadge(kind) {
  const isApple = kind === 'apple';
  const a = document.createElement('a');
  a.className = 'store-badge';
  a.href = safeUrl(isApple ? window.LADDER_MAZE_CONFIG.appStoreUrl : window.LADDER_MAZE_CONFIG.playStoreUrl);
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label', `${isApple ? 'Apple App Store' : 'Google Play Store'} (opens in a new tab)`);
  a.innerHTML = `${isApple ? apple : google}<span><small>${isApple ? 'Download on the' : 'GET IT ON'}</small>${isApple ? 'App Store' : 'Google Play'}</span>`;
  return a;
}

const currentPage = document.body.dataset.page || 'home';
document.querySelector('#header').innerHTML = `
  <div class="header-inner">
    <a href="index.html" class="brand" aria-label="Ladder Maze home"><span class="brand-icon" aria-hidden="true"></span><span class="brand-name">Ladder Maze</span></a>
    <nav class="nav" aria-label="Main navigation">${[['home','Home','index.html'],['about','About','about.html'],['features','Features','features.html']].map(([key,label,href]) => `<a href="${href}"${key === currentPage ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <button class="play-button" type="button" data-play>Play Now <span class="chevron" aria-hidden="true"></span></button>
  </div>`;

const features = [
  ['key','#ffdf25','Find the Key','Discover the hidden<br>path to the key.'],
  ['exit','#00f0b9','Reach the Exit','Then find the exit<br>and move to the next floor.'],
  ['traps','#fc203a','Avoid Traps','One wrong step...<br>and it’s over!'],
  ['enemy','#b690dd','Outsmart Enemies','Use your weapons<br>and stay alive.'],
  ['gem','#00c5f5','Use Every Clue','Numbers, ladders,<br>and hidden hints.'],
];
const featureList = document.querySelector('#feature-list');
if (featureList) featureList.innerHTML = features.map(([icon,color,title,description]) => `<article class="feature" style="--icon-color:${color}">${pixelIcon(icon)}<h2>${title}</h2><p>${description}</p></article>`).join('');

const grid = document.querySelector('#screenshot-grid');
if (grid) grid.innerHTML = Array.from({length: 8}, (_, i) => `<figure class="screenshot-card"><video class="screenshot-video" data-lazy-video width="300" height="400" autoplay muted loop playsinline controls preload="none" aria-label="Ladder Maze gameplay video ${i+1}"><source data-src="images/screenshots/${i+1}.webm" type="video/webm"><source data-src="images/screenshots/${i+1}.mp4" type="video/mp4"></video></figure>`).join('');

document.querySelector('#dialogs').innerHTML = `
  <dialog class="download-dialog" id="download-dialog" aria-labelledby="download-title" aria-describedby="download-description">
    <button class="close-dialog" type="button" data-close aria-label="Close download popup" autofocus>×</button>
    ${pixelIcon('key','dialog-emblem')}
    <h2 id="download-title">Your adventure awaits!</h2>
    <p id="download-description">Choose your store and enter the maze.</p>
    <div class="store-links" data-stores></div>
    <p class="dialog-tagline">Think. Explore. Survive.</p>
  </dialog>`;

document.querySelectorAll('[data-stores]').forEach(container => container.append(createStoreBadge('apple'),createStoreBadge('google')));
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
// Shared footer for every page, including the temporary information pages.
const footer = document.querySelector('#footer');
if (footer) footer.innerHTML = `
  <div class="footer-inner">
    <div class="footer-row">
      <a class="footer-brand" href="index.html" aria-label="Arcade Game Lab — Ladder Maze home">
        <span class="footer-brand-row"><img src="images/icon.jpg" width="52" height="52" alt=""><span class="footer-brand-name">Arcade<span>Game Lab</span></span></span>
        <span class="footer-tagline">Play • Create • Explore</span>
      </a>
      <nav class="footer-nav" aria-label="Footer navigation"><a href="mailto:rondasoft@gmail.com">Contact Us</a><a href="privacy-policy.html"${currentPage === 'privacy-policy' ? ' aria-current="page"' : ''}>Privacy Policy</a><a href="support.html"${currentPage === 'support' ? ' aria-current="page"' : ''}>Support</a></nav>
    </div>
    <p class="footer-copyright">© 2026 Arcade Game Lab. All rights reserved.</p>
  </div>`;
