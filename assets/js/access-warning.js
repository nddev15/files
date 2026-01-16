// Access Warning Modal Module
const AccessWarning = (() => {
    function init() {
        function isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        }

        const HIDE_KEY_TS = 'accessWarningDismissedAt';
        const HIDE_KEY_OK = 'accessWarningAgreed';
        let suppress = false;
        
        try {
            const ok = localStorage.getItem(HIDE_KEY_OK);
            const ts = parseInt(localStorage.getItem(HIDE_KEY_TS), 10) || null;
            if (ts && !ok) {
                try { localStorage.removeItem(HIDE_KEY_TS); } catch(e){}
            }
            if (ok && ts) {
                const age = Date.now() - ts;
                if (age < 3 * 60 * 60 * 1000) {
                    suppress = true;
                }
            }
        } catch (e) {
            suppress = false;
        }

        if (!isIOS() && !suppress) {
            const modal = document.getElementById('accessWarningModal');
            const closeBtn = document.getElementById('aw-close');
            const okBtn = document.getElementById('aw-ok');
            
            const hide = function(save){
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
                if (save) {
                    try {
                        localStorage.setItem(HIDE_KEY_OK, '1');
                        localStorage.setItem(HIDE_KEY_TS, Date.now().toString());
                    } catch(e){}
                }
            };
            
            modal.classList.add('active');
            document.body.classList.add('modal-open');

            closeBtn.addEventListener('click', function(){ hide(false); });
            okBtn.addEventListener('click', function(){ hide(true); });

            modal.addEventListener('click', function(e){ if (e.target === modal) hide(false); });
        }
    }

    return {
        init
    };
})();
