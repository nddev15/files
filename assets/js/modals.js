// Modal Management Module
const Modals = (() => {
    function openModal() { 
        document.getElementById('downloadModal').classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal(event) { 
        if (event && event.target && event.target.id === 'downloadModal') {
            document.getElementById('downloadModal').classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    function closeChangelog(event) { 
        if (event && event.target && event.target.id === 'changelogModal') {
            document.getElementById('changelogModal').classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    function openOptionsModal(){
        const m = document.getElementById('optionsModal');
        if (!m) return;
        m.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeOptionsModal(event){
        if (event && event.target && event.target.id === 'optionsModal'){
            document.getElementById('optionsModal').classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    function openImagePreview(url) {
        const modal = document.getElementById('imgPreviewModal');
        const img = document.getElementById('previewImg');
        img.src = url;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeImagePreview(event) {
        if (event && event.target && event.target.id === 'imgPreviewModal') {
            document.getElementById('imgPreviewModal').classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    return {
        openModal,
        closeModal,
        closeChangelog,
        openOptionsModal,
        closeOptionsModal,
        openImagePreview,
        closeImagePreview
    };
})();
