/* ======================================================
   DEEPJIT DAS — Theme Switcher
   Dark/Light mode + Accent Color
   ====================================================== */

(function () {
    const root        = document.documentElement;
    const body        = document.body;
    const panel       = document.getElementById('themePanel');
    const toggleBtn   = document.getElementById('themeToggleBtn');
    const closeBtn    = document.getElementById('themeClose');
    const darkBtn     = document.getElementById('darkBtn');
    const lightBtn    = document.getElementById('lightBtn');
    const swatches    = document.querySelectorAll('.swatch');

    // ---- Helpers ----
    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1,3), 16);
        const g = parseInt(hex.slice(3,5), 16);
        const b = parseInt(hex.slice(5,7), 16);
        return `${r}, ${g}, ${b}`;
    }

    function setAccent(color) {
        if (color === 'india' || color === '#FF9933') {
            root.style.setProperty('--accent', '#FF9933');
            root.style.setProperty('--accent2', '#138808');
            root.style.setProperty('--accent3', '#138808');
            root.style.setProperty('--accent-glow', 'rgba(255, 153, 51, 0.45)');
            root.style.setProperty('--border', 'rgba(255, 153, 51, 0.25)');
            localStorage.setItem('dj_accent', 'india');
        } else {
            root.style.setProperty('--accent', color);
            root.style.setProperty('--accent2', '#ff6584');
            root.style.setProperty('--accent3', '#43e97b');
            root.style.setProperty('--accent-glow', `rgba(${hexToRgb(color)}, 0.4)`);
            root.style.setProperty('--border', `rgba(${hexToRgb(color)}, 0.18)`);
            localStorage.setItem('dj_accent', color);
        }

        // Mark active swatch
        swatches.forEach(s => {
            s.classList.toggle('active', s.dataset.color === color || (color === 'india' && s.dataset.color === 'india'));
        });
    }

    function setMode(mode) {
        if (mode === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            darkBtn.classList.remove('active');
            lightBtn.classList.add('active');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            darkBtn.classList.add('active');
            lightBtn.classList.remove('active');
        }
        localStorage.setItem('dj_mode', mode);
    }

    // ---- Restore saved preferences ----
    const savedMode   = localStorage.getItem('dj_mode')   || 'dark';
    const savedAccent = localStorage.getItem('dj_accent') || '#6c63ff';

    setMode(savedMode);
    setAccent(savedAccent);

    // ---- Panel Open / Close ----
    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target)) {
            panel.classList.remove('open');
        }
    });

    // ---- Mode buttons ----
    darkBtn.addEventListener('click', () => setMode('dark'));
    lightBtn.addEventListener('click', () => setMode('light'));

    // ---- Swatch buttons ----
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            setAccent(swatch.dataset.color);
        });
    });

})();
