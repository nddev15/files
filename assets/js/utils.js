// Utility Functions Module
function playClickSound() {
    try { ButtonEffects.playClickSound(); } catch(e) {}
}

function playThemeSound() {
    try { Theme.playThemeSound(); } catch(e) {}
}

function applyTranslations(lang) {
    try { I18N.applyTranslations(lang); } catch(e) {}
}

function updateLangBtn(lang) {
    try {
        const langBtn = document.getElementById('langBtn');
        const mobileMenuFlag = document.getElementById('mobileMenuFlag');
        const flagPath = lang === 'vi' ? 'assets/img/svg/vnflag.svg' : 'assets/img/svg/enflag.svg';
        
        if (langBtn) {
            const img = langBtn.querySelector('img');
            if (img) img.src = flagPath;
        }
        if (mobileMenuFlag) {
            mobileMenuFlag.src = flagPath;
        }
    } catch(e) {}
}
