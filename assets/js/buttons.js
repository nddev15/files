// Button Effects & Sound Module
const ButtonEffects = (() => {
  const playClickSound = () => {
    try {
      const audio = document.querySelector('audio[src*="mouse-click"]') || new Audio('assets/audioclick/mouse-click.mp3');
      audio.currentTime = 0;
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      // Silent fail
    }
  };

  const initButtonEffects = () => {
    const elems = Array.from(document.querySelectorAll('button:not(#mobileHamburger):not(#mobileLangBtn):not(#mobileMenuClose):not(#themeToggle):not(#langBtn), a.btn-modal-action, .contact-item'));
    elems.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden';

      el.addEventListener('pointerdown', (e) => {
        try { playClickSound(); } catch (err) {}
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        if (document.body.classList.contains('dark')) ripple.classList.add('ripple-dark');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        el.appendChild(ripple);
        setTimeout(() => { ripple.remove(); }, 650);
      });

      if (el.tagName.toLowerCase() === 'a' && el.classList.contains('btn-modal-action')) {
        el.addEventListener('click', (ev) => {
          try {
            const href = el.getAttribute('href');
            if (!href || href === '#' || href.startsWith('javascript:')) return;
            ev.preventDefault();
            try { playClickSound(); } catch (e) {}
            const target = el.getAttribute('target');
            setTimeout(() => {
              if (target === '_blank') window.open(href, '_blank');
              else window.location.href = href;
            }, 140);
          } catch (e) { }
        });
      }
    });
  };

  return {
    init: initButtonEffects,
    playClickSound
  };
})();
