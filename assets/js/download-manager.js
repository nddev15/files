// Download & Password Management Module
const DownloadManager = (() => {
    let pendingInstallUrl = '';
    let pendingInstallVersion = 'v1';

    function handleDirectDownload(url) {
        try { window.pendingInstallUrl = url; } catch(e) { window.pendingInstallUrl = url; }
        try {
            if (url === window.INSTALL_V1) window.pendingInstallVersion = 'v1';
            else if (url === window.INSTALL_V2) window.pendingInstallVersion = 'v2';
            else window.pendingInstallVersion = 'v1';
        } catch(e){ window.pendingInstallVersion = 'v1'; }

        document.getElementById('downloadModal').classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => { openPasswordModal(); }, 160);
    }

    function openPasswordModal(){
        playClickSound();
        const modal = document.getElementById('passwordModal');
        if(!modal) return;
        const inputEl = document.getElementById('installPassword');
        inputEl.value = '';
        document.getElementById('passwordMsg').textContent = '';
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        setTimeout(()=>{ inputEl.focus(); }, 120);
    }

    function closePasswordModal(event){
        if(!event) return;
        if(event.target && event.target.id !== 'passwordModal') return;
        playClickSound();
        document.getElementById('passwordModal').classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    async function verifyPassword(){
        playClickSound();
        const inputEl = document.getElementById('installPassword');
        const msgEl = document.getElementById('passwordMsg');
        const pass = (inputEl && inputEl.value) ? inputEl.value.trim() : '';
        if(!pass){ msgEl.textContent = 'Vui lòng nhập mật khẩu.'; return; }

        const ver = window.pendingInstallVersion || 'v1';
        try{
            const isValid = await PasswordManager.verifyPassword(pass, ver);
            if(isValid){
                msgEl.textContent = 'Mật khẩu đúng. Chuyển hướng...';
                setTimeout(()=>{
                    document.getElementById('passwordModal').classList.remove('active');
                    document.body.classList.remove('modal-open');
                    const url = window.pendingInstallUrl || window.INSTALL_V1;
                    window.location.href = url;
                }, 700);
            } else {
                msgEl.textContent = 'Mật khẩu không đúng. Vui lòng thử lại.';
            }
        }catch(err){
            msgEl.textContent = 'Lỗi mật khẩu. Liên hệ admin.';
        }
    }

    function initPasswordInput() {
        const passwordInput = document.getElementById('installPassword');
        if (passwordInput) {
            passwordInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    verifyPassword();
                }
            });
        }
    }

    return {
        handleDirectDownload,
        openPasswordModal,
        closePasswordModal,
        verifyPassword,
        initPasswordInput
    };
})();
