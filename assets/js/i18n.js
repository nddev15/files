// I18N (Internationalization) Module
const I18N = (() => {
  let translations = {};

  const loadTranslations = async () => {
    try {
      const [viRes, enRes] = await Promise.all([
        fetch('assets/lang/vi.json', { cache: 'no-store' }),
        fetch('assets/lang/en.json', { cache: 'no-store' })
      ]);
      translations.vi = await viRes.json();
      translations.en = await enRes.json();
    } catch (err) {
      console.error('Failed to load translations:', err);
      translations = { vi: {}, en: {} };
    }
  };

  const applyTranslations = (lang) => {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
  };

  const getTranslation = (lang, key) => {
    return (translations[lang] && translations[lang][key]) || '';
  };

  const getCurrentLang = () => {
    return localStorage.getItem('lang') || 'vi';
  };

  const setLang = (lang) => {
    localStorage.setItem('lang', lang);
  };

  const updateLangBtn = (lang) => {
    const langBtn = document.getElementById('langBtn');
    if (!langBtn) return;
    const src = lang === 'vi' ? 'assets/img/svg/vnflag.svg' : 'assets/img/svg/enflag.svg';
    const label = lang === 'vi' ? 'VI' : 'EN';
    langBtn.innerHTML = `<img src="${src}" class="flag-img" alt="${label}">`;
    langBtn.setAttribute('data-lang', lang);
    
    const mobileFlag = document.getElementById('mobileMenuFlag');
    if (mobileFlag) {
      mobileFlag.src = src;
      mobileFlag.alt = label;
    }
  };

  const init = async () => {
    await loadTranslations();
    const stored = getCurrentLang();
    updateLangBtn(stored);
    applyTranslations(stored);

    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        try { ButtonEffects.playClickSound(); } catch(e) {}
        const current = getCurrentLang();
        const v = current === 'vi' ? 'en' : 'vi';
        setLang(v);
        applyTranslations(v);
        updateLangBtn(v);
      });
    }
  };

  return {
    loadTranslations,
    applyTranslations,
    getTranslation,
    getCurrentLang,
    setLang,
    updateLangBtn,
    init,
    translations: () => translations
  };
})();
