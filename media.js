'use strict';
// Fetch gameplay clips only as their section approaches the viewport.
const gameplayVideos = document.querySelectorAll('video[data-lazy-video]');
function loadGameplayVideo(video) {
  video.querySelectorAll('source[data-src]').forEach(source => {
    source.src = source.dataset.src;
    source.removeAttribute('data-src');
  });
  video.muted = true;
  video.load();
  // Native controls remain available if autoplay is blocked.
  video.play().catch(() => {});
}
if ('IntersectionObserver' in window) {
  const mediaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      loadGameplayVideo(entry.target);
      mediaObserver.unobserve(entry.target);
    });
  }, {rootMargin: '200px 0px'});
  gameplayVideos.forEach(video => mediaObserver.observe(video));
} else {
  gameplayVideos.forEach(loadGameplayVideo);
}
