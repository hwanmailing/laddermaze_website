'use strict';
// Keep native details/summary keyboard behavior, and open linked help topics.
function revealSupportTopic(id, focus = false) {
  // Keep older shared FAQ links useful after the gameplay FAQ rewrite.
  const legacyTopics = {
    'faq-purchase': 'faq-score',
    'faq-contact': 'faq-strategy',
    'faq-reset': 'faq-random',
    'faq-devices': 'faq-performance',
  };
  const topic = document.getElementById(legacyTopics[id] || id);
  if (!(topic instanceof HTMLDetailsElement)) return;
  topic.open = true;
  if (focus) {
    topic.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center'});
    topic.querySelector('summary').focus({preventScroll: true});
  }
}
document.querySelectorAll('[data-faq-target]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const id = link.dataset.faqTarget;
    history.replaceState(null, '', `#${id}`);
    revealSupportTopic(id, true);
  });
});
window.addEventListener('hashchange', () => revealSupportTopic(location.hash.slice(1)));
revealSupportTopic(location.hash.slice(1));
