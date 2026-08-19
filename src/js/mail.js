/* ======================================================
   DEEPJIT DAS — Contact Mail Controller
   Handles EmailJS API sending + Graceful mailto fallback
   ====================================================== */

function SendMail() {
    const nameInput    = document.getElementById('fullname');
    const emailInput   = document.getElementById('email_id');
    const messageInput = document.getElementById('message');

    const name    = nameInput ? nameInput.value.trim() : '';
    const email   = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    const successToast = document.getElementById('toast-success');
    const errorToast   = document.getElementById('toast-error');
    const btnText      = document.getElementById('sendBtnText');
    const btnIcon      = document.getElementById('sendBtnIcon');
    const sendBtn      = document.getElementById('sendMailBtn');

    function showToast(el, msg) {
        if (!el) return;
        if (msg) el.textContent = msg;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 4000);
    }

    if (!name || !email || !message) {
        showToast(errorToast, '✗ Please fill in all fields before sending.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast(errorToast, '✗ Please enter a valid email address.');
        return;
    }

    // Set loading state on button
    if (sendBtn) sendBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending...';
    if (btnIcon) btnIcon.className = 'fas fa-spinner fa-spin';

    function resetBtn() {
        if (sendBtn) sendBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (btnIcon) btnIcon.className = 'fa fa-paper-plane';
    }

    // Try EmailJS first
    if (typeof emailjs !== 'undefined' && emailjs.send) {
        emailjs.send("service_txphbgb", "template_zk9n06l", {
            from_name: name,
            from_email: email,
            to_name: "Deepjit",
            message: message
        }).then(() => {
            resetBtn();
            if (window.launchConfetti) window.launchConfetti();
            showToast(successToast, '✓ Message sent successfully! I will reply soon.');
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (messageInput) messageInput.value = '';
        }).catch((err) => {
            console.warn('EmailJS error, using Gmail fallback:', err);
            resetBtn();
            // Fallback: Open Gmail web composer directly
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dasdeepjit1234@gmail.com&su=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
            window.open(gmailUrl, '_blank');
            showToast(successToast, '✓ Opening Gmail composer to send...');
        });
    } else {
        resetBtn();
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dasdeepjit1234@gmail.com&su=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
        window.open(gmailUrl, '_blank');
        showToast(successToast, '✓ Opening Gmail composer to send...');
    }
}
