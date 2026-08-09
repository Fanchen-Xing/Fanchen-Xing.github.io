(function(){
  var LANG_KEY = 'fx-site-lang';

  function getLang(){
    return localStorage.getItem(LANG_KEY) || 'zh';
  }

  function applyLang(lang){
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    document.body.setAttribute('data-lang', lang);

    var nodes = document.querySelectorAll('[data-zh]');
    nodes.forEach(function(el){
      var text = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
      if (text !== null) el.textContent = text;
    });

    var attrNodes = document.querySelectorAll('[data-zh-placeholder]');
    attrNodes.forEach(function(el){
      var val = lang === 'zh' ? el.getAttribute('data-zh-placeholder') : el.getAttribute('data-en-placeholder');
      if (val !== null) el.setAttribute('placeholder', val);
    });

    var toggleBtn = document.querySelector('.lang-toggle');
    if (toggleBtn){
      toggleBtn.textContent = lang === 'zh' ? 'EN' : '中文';
    }
  }

  function toggleLang(){
    var current = getLang();
    var next = current === 'zh' ? 'en' : 'zh';
    localStorage.setItem(LANG_KEY, next);
    applyLang(next);
  }

  document.addEventListener('DOMContentLoaded', function(){
    applyLang(getLang());

    var toggleBtn = document.querySelector('.lang-toggle');
    if (toggleBtn){
      toggleBtn.addEventListener('click', toggleLang);
    }

    var navToggle = document.querySelector('.nav-toggle');
    var mainNav = document.querySelector('.main-nav');
    if (navToggle && mainNav){
      navToggle.addEventListener('click', function(){
        mainNav.classList.toggle('open');
      });
      mainNav.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', function(){
          mainNav.classList.remove('open');
        });
      });
    }

    // Demo reel video modal
    var playBtn = document.getElementById('playDemoReel');
    var modal = document.getElementById('videoModal');
    var backdrop = document.getElementById('videoModalBackdrop');
    var closeBtn = document.getElementById('videoModalClose');
    var video = document.getElementById('demoReelVideo');

    if (playBtn && modal && video){
      var openModal = function(){
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        video.currentTime = 0;
        video.play();
      };
      var closeModal = function(){
        modal.classList.remove('open');
        document.body.style.overflow = '';
        video.pause();
      };
      playBtn.addEventListener('click', openModal);
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (backdrop) backdrop.addEventListener('click', closeModal);
      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
      });
    }

    // Image reel: segmented, draggable, crossfade slider
    document.querySelectorAll('.image-reel').forEach(initImageReel);
  });

  function initImageReel(reel){
    var stage = reel.querySelector('.reel-stage');
    var track = reel.querySelector('.reel-track');
    if (!stage || !track) return;

    var slides = Array.prototype.slice.call(stage.querySelectorAll('.reel-slide'));
    if (slides.length === 0) return;

    var duration = parseInt(reel.getAttribute('data-duration'), 10) || 3000;
    var autoplayEnabled = reel.getAttribute('data-autoplay') !== 'false';

    // Build one progress segment per slide
    var segments = slides.map(function(){
      var seg = document.createElement('div');
      seg.className = 'reel-segment';
      var fill = document.createElement('div');
      fill.className = 'reel-fill';
      seg.appendChild(fill);
      track.appendChild(seg);
      return { el: seg, fill: fill };
    });

    // Drag handle: visual cue that the track is draggable, follows playhead
    var handle = document.createElement('div');
    handle.className = 'reel-handle';
    handle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7l-4 5 4 5M16 7l4 5-4 5"/></svg>';
    track.appendChild(handle);

    var current = 0;
    var elapsed = 0;
    var lastTick = null;
    var dragging = false;
    var rafId = null;

    function setFills(index, frac){
      segments.forEach(function(seg, i){
        var pct = i < index ? 100 : (i === index ? frac * 100 : 0);
        seg.fill.style.width = pct + '%';
      });
      var overall = (index + frac) / slides.length;
      handle.style.left = (overall * 100) + '%';
    }

    function goTo(index){
      if (index === current) return;
      slides[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
    }

    function frame(ts){
      if (lastTick === null) lastTick = ts;
      if (!dragging && autoplayEnabled){
        elapsed += ts - lastTick;
        var frac = Math.min(elapsed / duration, 1);
        setFills(current, frac);
        if (frac >= 1){
          elapsed = 0;
          goTo((current + 1) % slides.length);
        }
      }
      lastTick = ts;
      rafId = requestAnimationFrame(frame);
    }

    function scrubTo(clientX){
      var rect = track.getBoundingClientRect();
      var pos = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 0.9999);
      var raw = pos * slides.length;
      var index = Math.floor(raw);
      var frac = raw - index;
      if (index !== current) goTo(index);
      setFills(index, frac);
      elapsed = frac * duration;
    }

    track.addEventListener('pointerdown', function(e){
      dragging = true;
      track.classList.add('dragging');
      track.setPointerCapture(e.pointerId);
      scrubTo(e.clientX);
    });
    track.addEventListener('pointermove', function(e){
      if (dragging) scrubTo(e.clientX);
    });
    function endDrag(){
      dragging = false;
      track.classList.remove('dragging');
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    setFills(0, 0);
    rafId = requestAnimationFrame(frame);
  }
})();
