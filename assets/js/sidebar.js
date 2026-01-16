// Sidebar Management Module
const SidebarManager = (() => {
    function toggleMobileMenu() {
        const m = document.getElementById('mobileMenu');
        if (!m) return;
        playClickSound();
        if (m.classList.contains('active')) {
            m.classList.remove('active');
            m.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        } else {
            m.classList.add('active');
            m.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function initMobileMenu(){
        const closeBtn = document.getElementById('mobileMenuClose');
        const mobileLang = document.getElementById('mobileLangBtn');
        const mobileMenuEl = document.getElementById('mobileMenu');
        if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMobileMenu(); });
        if (mobileMenuEl) mobileMenuEl.addEventListener('click', (e) => { if (e.target === mobileMenuEl) toggleMobileMenu(); });

        if (mobileLang) mobileLang.addEventListener('click', (e) => {
            e.preventDefault();
            playClickSound();
            const current = localStorage.getItem('lang') || 'vi';
            const v = current === 'vi' ? 'en' : 'vi';
            localStorage.setItem('lang', v);
            I18N.applyTranslations(v);
            I18N.updateLangBtn(v);
        });

        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMobileMenu(); });
    }

    function initDraggableSidebar() {
        const sidebar = document.getElementById('floatingSidebar');
        if (!sidebar) return;
        
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        
        sidebar.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - sidebar.offsetLeft;
            offsetY = e.clientY - sidebar.offsetTop;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            sidebar.style.left = x + 'px';
            sidebar.style.top = y + 'px';
            sidebar.style.right = 'auto';
            sidebar.style.bottom = 'auto';
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Toggle sidebar visibility
        const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
        if (sidebarOpenBtn) {
            sidebarOpenBtn.addEventListener('click', () => {
                if (sidebar) {
                    sidebar.classList.toggle('visible');
                }
            });
        }
    }

    return {
        toggleMobileMenu,
        initMobileMenu,
        initDraggableSidebar
    };
})();
