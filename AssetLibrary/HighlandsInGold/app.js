/* Content remains readable with JavaScript disabled. This script only mounts media. */
document.querySelectorAll('[data-media]').forEach(figure => {
  const item = (window.PORTFOLIO_MEDIA || {})[figure.dataset.media];
  if (!item || !item.src) return;
  if (item.type === 'vimeo') {
    const cover = figure.querySelector('.video_cover');
    if (!cover) return;
    cover.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const frame = document.createElement('iframe');
      frame.className = 'video_frame';
      frame.title = item.alt;
      frame.allow = 'autoplay; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      frame.src = item.src + '?autoplay=1&title=0&byline=0&portrait=0';
      cover.replaceWith(frame);
      frame.focus();
    });
    return;
  }
  const video = item.type === 'video';
  const media = document.createElement(video ? 'video' : 'img');
  if (video) {
    media.controls = true;
    media.playsInline = true;
    media.preload = 'metadata';
    media.setAttribute('aria-label', item.alt);
    if (item.poster) media.poster = item.poster;
  } else {
    media.alt = item.alt;
    media.loading = 'lazy';
  }
  media.addEventListener(video ? 'loadedmetadata' : 'load', () => figure.classList.add('has_media'), {once:true});
  media.addEventListener('error', () => {figure.classList.remove('has_media');media.remove();}, {once:true});
  media.src = item.src;
  figure.insertBefore(media, figure.firstChild);
});
