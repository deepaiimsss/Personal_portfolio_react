/* ======================================================
   DEEPJIT DAS — Premium Visual Effects & Micro-Interactions
   1. Loading Screen
   2. Scroll Progress Bar
   3. Particle Star Field
   4. Spotlight cursor glow
   5. Scramble Text on hero name
   6. 3D Card Tilt & Mouse-Tracking Spotlight
   7. Animated Counters
   8. Live Timezone Clock (IST)
   9. Magnetic Button Physics
   10. Interactive Project Category Filter
   11. Confetti Particle Explosion Engine
   12. Quick Pitch Modal Controller
   13. Cosmic Stardust Cursor Trail
   ====================================================== */

/* ===================================================
   1. LOADING SCREEN
   =================================================== */
(function initLoader() {
    const loader   = document.getElementById('loaderScreen');
    const bar      = document.getElementById('loaderBar');
    const txt      = document.getElementById('loaderText');

    const steps = [
        { pct: 20,  msg: 'Loading assets...'    },
        { pct: 50,  msg: 'Building UI...'        },
        { pct: 75,  msg: 'Almost there...'       },
        { pct: 100, msg: 'Welcome!'              },
    ];

    let i = 0;
    function step() {
        if (!loader) return;
        if (i < steps.length) {
            bar.style.width = steps[i].pct + '%';
            txt.textContent = steps[i].msg;
            i++;
            setTimeout(step, i === steps.length ? 400 : 350);
        } else {
            setTimeout(() => {
                loader.classList.add('hidden');
                // Ensure home elements are visible immediately
                document.querySelectorAll('#home .reveal').forEach(el => el.classList.add('visible'));
                // Trigger scramble after loader gone
                scrambleHeroName();
            }, 400);
        }
    }

    if (loader) {
        step();
    }
})();

/* ===================================================
   2. SCROLL PROGRESS BAR
   =================================================== */
(function initProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    const container = document.getElementById('scrollContainer');
    if (!container) return;

    container.addEventListener('scroll', () => {
        const scrolled = container.scrollTop;
        const total    = container.scrollHeight - container.clientHeight;
        bar.style.width = (scrolled / total * 100) + '%';
    });
})();

/* ===================================================
   3. PARTICLE STAR FIELD (Home section canvas)
   =================================================== */
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [], mouse = { x: -9999, y: -9999 };
    const NUM = 80;
    const CONNECT_DIST = 120;

    function resize() {
        const section = document.getElementById('home');
        W = canvas.width  = section ? section.offsetWidth  : window.innerWidth;
        H = canvas.height = section ? section.offsetHeight : window.innerHeight;
    }

    function getAccentColor() {
        const c = getComputedStyle(document.documentElement)
                      .getPropertyValue('--accent').trim() || '#6c63ff';
        return c;
    }

    function hexToRgb(hex) {
        hex = hex.replace('#','');
        if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
        const n = parseInt(hex, 16);
        return [(n>>16)&255, (n>>8)&255, n&255];
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * W;
            this.y  = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.r  = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            // Repel from mouse
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 80) {
                this.x += dx / dist * 1.5;
                this.y += dy / dist * 1.5;
            }
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
        }
        draw() {
            const [r,g,b] = hexToRgb(getAccentColor());
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = Array.from({ length: NUM }, () => new Particle());
    }

    function drawConnections() {
        const [r,g,b] = hexToRgb(getAccentColor());
        for (let i = 0; i < particles.length; i++) {
            for (let j = i+1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < CONNECT_DIST) {
                    const alpha = (1 - d / CONNECT_DIST) * 0.25;
                    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
                    ctx.lineWidth   = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    // Mouse tracking (only on home section)
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.addEventListener('mousemove', (e) => {
            const rect = homeSection.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        homeSection.addEventListener('mouseleave', () => {
            mouse.x = -9999; mouse.y = -9999;
        });
    }

    window.addEventListener('resize', () => { resize(); particles.forEach(p => p.reset()); });
    init();
    animate();
})();

/* ===================================================
   4. SPOTLIGHT CURSOR GLOW (Home section)
   =================================================== */
(function initSpotlight() {
    const home = document.getElementById('home');
    if (!home) return;
    const spot = document.createElement('div');
    spot.className = 'spotlight';
    home.appendChild(spot);

    home.addEventListener('mousemove', (e) => {
        const rect = home.getBoundingClientRect();
        spot.style.left = (e.clientX - rect.left) + 'px';
        spot.style.top  = (e.clientY - rect.top)  + 'px';
    });
})();

/* ===================================================
   5. SCRAMBLE TEXT on Hero Name
   =================================================== */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

function scrambleText(el, finalText, duration = 1200) {
    if (!el) return;
    let start = null;
    const original = finalText;

    function frame(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const revealedCount = Math.floor(progress * original.length);

        let output = '';
        for (let i = 0; i < original.length; i++) {
            if (original[i] === ' ' || original[i] === '\n') {
                output += original[i];
            } else if (i < revealedCount) {
                output += original[i];
            } else {
                output += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
        }
        el.textContent = output;

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            el.textContent = original;
        }
    }
    requestAnimationFrame(frame);
}

function scrambleHeroName() {
    const first   = document.getElementById('heroFirstName');
    const outline = document.getElementById('heroNameOutline');
    if (first) {
        setTimeout(() => scrambleText(first, 'Deepjit', 700), 100);
    }
    if (outline) {
        setTimeout(() => scrambleText(outline, 'Das', 500), 350);
    }
}

/* ===================================================
   6. 3D CARD TILT & CARD MOUSE-TRACKING SPOTLIGHT
   =================================================== */
(function initTilt() {
    const cards = document.querySelectorAll('.svc-card, .proj-card');
    const MAX_TILT = 8; // degrees

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect   = card.getBoundingClientRect();
            const x      = e.clientX - rect.left;
            const y      = e.clientY - rect.top;
            const cx     = rect.width  / 2;
            const cy     = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -MAX_TILT;
            const rotateY = ((x - cx) / cx) *  MAX_TILT;
            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
})();

/* ===================================================
   7. ANIMATED COUNTERS
   =================================================== */
(function initCounters() {
    const strip = document.getElementById('counterStrip');
    if (!strip) return;

    let animated = false;

    function animateCounters() {
        if (animated) return;
        animated = true;
        const nums = strip.querySelectorAll('.counter-num');
        nums.forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 1400;
            const start = performance.now();

            function tick(now) {
                const elapsed  = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target + (target === 50 ? '+' : '');
            }
            requestAnimationFrame(tick);
        });
    }

    // Fire after loader dismisses
    setTimeout(animateCounters, 1800);
})();

/* ===================================================
   8. LIVE TIMEZONE CLOCK (IST)
   =================================================== */
(function initLiveClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
        clockEl.textContent = `${timeString} IST`;
    }

    updateTime();
    setInterval(updateTime, 1000);
})();

/* ===================================================
   9. MAGNETIC BUTTON PHYSICS
   =================================================== */
(function initMagneticButtons() {
    const magnets = document.querySelectorAll('.btn-pill, .social-row a, .theme-toggle-btn, .btn-pitch');
    
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            // Move button slightly toward mouse
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
})();

/* ===================================================
   10. INTERACTIVE PROJECT CATEGORY FILTER
   =================================================== */
(function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.pf-btn');
    const cards = document.querySelectorAll('.proj-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });
        });
    });
})();

/* ===================================================
   11. PURE CANVAS CONFETTI EXPLOSION ENGINE
   =================================================== */
window.launchConfetti = function (originX, originY) {
    let canvas = document.getElementById('confettiCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'confettiCanvas';
        canvas.className = 'confetti-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const startX = typeof originX === 'number' ? originX : canvas.width / 2;
    const startY = typeof originY === 'number' ? originY : canvas.height * 0.5;

    const colors = ['#6c63ff', '#ff3366', '#00d4ff', '#ff9f43', '#43e97b', '#FF9933', '#ffd700', '#a855f7'];
    const confetti = [];
    const count = 140;

    for (let i = 0; i < count; i++) {
        const shape = Math.random() > 0.4 ? 'rect' : 'circle';
        confetti.push({
            x: startX,
            y: startY,
            w: Math.random() * 9 + 4,
            h: Math.random() * 7 + 4,
            r: Math.random() * 4 + 2,
            shape: shape,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 22,
            vy: (Math.random() * -18) - 4,
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 12,
            gravity: 0.38,
            opacity: 1
        });
    }

    let animId;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = 0;

        confetti.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.vRot;
            p.opacity -= 0.008;

            if (p.opacity > 0) {
                active++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.opacity);
                if (p.shape === 'rect') {
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        });

        if (active > 0) {
            animId = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animId);
        }
    }
    render();
};

// Global click handler to trigger confetti sprinkles on any CV download button
document.addEventListener('click', (e) => {
    const downloadLink = e.target.closest('a[download], a[href*="Cv"], a[href*="cv"], a[href$=".pdf"]');
    const isCvBtn = downloadLink || (e.target.closest('a') && e.target.closest('a').textContent.toLowerCase().includes('download cv'));
    
    if (isCvBtn) {
        const targetEl = downloadLink || e.target.closest('a') || e.target;
        const rect = targetEl.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        
        if (window.launchConfetti) {
            window.launchConfetti(originX, originY);
        }
        
        const toast = document.getElementById('toast-success');
        if (toast) {
            toast.textContent = '🎉 CV Downloaded! Thank you for reviewing.';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3500);
        }
    }
});

/* ===================================================
   12. QUICK PITCH MODAL CONTROLLER
   =================================================== */
(function initPitchModal() {
    const openBtn = document.getElementById('pitchOpenBtn');
    const modal = document.getElementById('pitchModal');
    const closeBtn = document.getElementById('pitchClose');

    if (!modal) return;

    function openModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
})();

/* ===================================================
   13. COSMIC STARDUST CURSOR TRAIL
   =================================================== */
(function initStardust() {
    const sparkles = [];
    const MAX_SPARKLES = 15;

    window.addEventListener('mousemove', (e) => {
        if (sparkles.length > MAX_SPARKLES) return;
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.width = '3px';
        spark.style.height = '3px';
        spark.style.borderRadius = '50%';
        spark.style.backgroundColor = 'var(--accent, #6c63ff)';
        spark.style.boxShadow = '0 0 6px var(--accent, #6c63ff)';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '9999';
        spark.style.opacity = '0.7';
        spark.style.transition = 'all 0.6s cubic-bezier(0.1, 0.9, 0.2, 1)';
        document.body.appendChild(spark);
        sparkles.push(spark);

        requestAnimationFrame(() => {
            spark.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20 + 10}px) scale(0)`;
            spark.style.opacity = '0';
        });

        setTimeout(() => {
            if (spark.parentNode) spark.parentNode.removeChild(spark);
            const idx = sparkles.indexOf(spark);
            if (idx > -1) sparkles.splice(idx, 1);
        }, 600);
    });
})();

/* ===================================================
   14. INTERACTIVE CODE BENTO CONTROLLER
   =================================================== */
(function initCodeBento() {
    const tabs = document.querySelectorAll('.code-tab');
    const tsBody = document.getElementById('codeTs');
    const jsonBody = document.getElementById('codeJson');

    if (!tabs.length || !tsBody || !jsonBody) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.tab;
            if (target === 'ts') {
                tsBody.classList.remove('hidden');
                jsonBody.classList.add('hidden');
            } else if (target === 'json') {
                jsonBody.classList.remove('hidden');
                tsBody.classList.add('hidden');
            }
        });
    });
})();





/* ===================================================
   19. MINIMALIST LO-FI CODING MUSIC ENGINE
   =================================================== */
(function initMinimalLoFi() {
    const playBtn = document.getElementById('lofiPlayBtn');
    const label   = document.getElementById('lofiLabel');

    if (!playBtn) return;

    const tracks = [
        "audio/arijit_lofi_mashup.m4a",
        "audio/bollywood_lofi_mixtape.m4a",
        "audio/midnight_coding_lofi.m4a"
    ];

    let currentIdx = 0;
    let isPlaying = false;
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.volume = 0.55;

    audio.addEventListener('ended', () => {
        currentIdx = (currentIdx + 1) % tracks.length;
        audio.src = tracks[currentIdx];
        audio.play().catch(() => {});
    });

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            audio.pause();
            playBtn.classList.remove('playing');
            if (label) label.textContent = 'Lo-Fi Beats';
            isPlaying = false;
        } else {
            if (!audio.src || !audio.src.includes(tracks[currentIdx])) {
                audio.src = tracks[currentIdx];
            }
            playBtn.classList.add('playing');
            if (label) label.textContent = 'Lo-Fi On 🎵';
            isPlaying = true;

            const p = audio.play();
            if (p !== undefined) {
                p.catch(() => {});
            }
        }
    });
})();





