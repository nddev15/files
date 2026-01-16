// Contact Management Module
const ContactManager = (() => {
    async function loadContactsFromJSON() {
        try {
            const res = await fetch('assets/config/contactlink/contact.json', { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to load contact.json');
            const data = await res.json();
            if (!data.contacts || !Array.isArray(data.contacts)) return;
            
            const contactList = document.getElementById('contactList');
            if (!contactList) return;
            contactList.innerHTML = '';
            
            data.contacts.forEach(contact => {
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'contact-item';
                a.title = contact.type.charAt(0).toUpperCase() + contact.type.slice(1);
                a.setAttribute('data-contact-type', contact.type);
                a.setAttribute('data-contact-link', contact.link);
                
                const img = document.createElement('img');
                img.src = contact.icon;
                img.alt = contact.type;
                img.className = 'contact-icon-img';
                
                const div = document.createElement('div');
                
                const labelSpan = document.createElement('span');
                labelSpan.className = 'contact-text';
                labelSpan.setAttribute('data-i18n-key', contact.label_key);
                labelSpan.textContent = contact.type.charAt(0).toUpperCase() + contact.type.slice(1);
                
                const subSpan = document.createElement('span');
                subSpan.className = 'contact-sub';
                subSpan.textContent = contact.sub;
                
                div.appendChild(labelSpan);
                div.appendChild(subSpan);
                
                a.appendChild(img);
                a.appendChild(div);
                contactList.appendChild(a);
            });
            
            // Re-initialize contact button listeners after loading
            initContactButtons();
        } catch (err) {
            console.error('Error loading contacts:', err);
        }
    }

    function initContactButtons(){
        document.querySelectorAll('.contact-item').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const type = el.getAttribute('data-contact-type');
                const link = el.getAttribute('data-contact-link') || '#';
                showContactModal(type, link);
            });
        });
    }

    function showContactModal(type, link){
        const modal = document.getElementById('contactInfoModal');
        if (!modal) return;
        const titleEl = modal.querySelector('.contact-modal-title');
        const bodyEl = modal.querySelector('.contact-modal-body');
        const actionEl = modal.querySelector('.contact-modal-action');
        const lang = localStorage.getItem('lang') || 'vi';
        const allTranslations = I18N.translations();
        let title = '';
        let body = '';
        if (type === 'facebook'){
            title = allTranslations[lang].contactFacebook || 'Facebook';
            body = allTranslations[lang].contactModalDescFacebook || link;
        } else if (type === 'telegram'){
            title = allTranslations[lang].contactTelegram || 'Telegram';
            body = allTranslations[lang].contactModalDescTelegram || link;
        } else if (type === 'zalo'){
            title = allTranslations[lang].contactZalo || 'Zalo';
            body = allTranslations[lang].contactModalDescZalo || link;
        } else if (type === 'email'){
            title = 'Email';
            body = link.replace('mailto:', '');
        }
        titleEl.textContent = title;
        bodyEl.textContent = body;
        actionEl.onclick = function(e){
            e.stopPropagation();
            try { window.open(link, '_blank'); }
            catch(err) { window.location.href = link; }
            modal.classList.remove('active');
        };
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeContactModal() {
        document.getElementById('contactInfoModal').classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    return {
        loadContactsFromJSON,
        initContactButtons,
        showContactModal,
        closeContactModal
    };
})();
