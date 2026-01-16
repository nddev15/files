// Theme Manager Module
const Theme = (() => {
  const applyTheme = (theme) => {
    const themeBtn = document.getElementById('themeToggle');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

    // Update all theme checkboxes (both theme-switch__checkbox and bb8-toggle__checkbox)
    const switches = document.querySelectorAll('.theme-switch__checkbox, .bb8-toggle__checkbox');
    switches.forEach(s => s.checked = (theme === 'dark'));
  };

  const playThemeSound = () => {
    try {
      const audio = document.querySelector('audio[src*="switch"]') || new Audio('assets/audioclick/switch.mp3');
      audio.currentTime = 0;
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch (e) {
      // Silent fail
    }
  };

  const init = () => {
    const themeBtn = document.getElementById('themeToggle');
    const stored = localStorage.getItem('theme') || 'light';
    applyTheme(stored);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        try { playThemeSound(); } catch (e) {}
        const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }

    // Update all theme checkboxes and listeners
    const switches = document.querySelectorAll('.theme-switch__checkbox, .bb8-toggle__checkbox');
    switches.forEach(cb => {
      cb.checked = (stored === 'dark');
      cb.addEventListener('change', () => {
        try { playThemeSound(); } catch (e) {}
        const newTheme = cb.checked ? 'dark' : 'light';
        applyTheme(newTheme);
      });
    });
  };

  return {
    applyTheme,
    init,
    playThemeSound
  };
})();
