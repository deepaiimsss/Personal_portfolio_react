/* ======================================================
   DEEPJIT DAS — Portfolio Script
   ====================================================== */

// ---- 1. TYPED.JS ----
const typed = new Typed('.typing', {
    strings: [
        'Full Stack Apps.',
        'AI-Powered Tools.',
        'Scalable APIs.',
        'Beautiful UIs.',
        'Cloud Solutions.'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true,
    backDelay: 1500
});

// ---- 2. SMOOTH SCROLL NAVIGATION ----
const scrollContainer = document.getElementById('scrollContainer');
const navLinks        = document.querySelectorAll('.nav-link');
const dots            = document.querySelectorAll('.dot');

function scrollToSection(id) {
    const target = document.querySelector(id);
    if (target) {
        if (scrollContainer && scrollContainer.scrollHeight > window.innerHeight) {
            scrollContainer.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Nav link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            scrollToSection(href);
        }
    });
});

// Dot click
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToSection(dot.getAttribute('href'));
    });
});

// ---- 4. ACTIVE SECTION TRACKING (Scroll Spy) ----
const sections = document.querySelectorAll('.section');

scrollContainer.addEventListener('scroll', () => {
    let current = '';
    const scrollTop = scrollContainer.scrollTop;

    sections.forEach(sec => {
        const secTop = sec.offsetTop;
        if (scrollTop >= secTop - 200) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === '#' + current) {
            dot.classList.add('active');
        }
    });
});

// ---- 5. REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger the reveals
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
        }
    });
}, {
    root: scrollContainer,
    threshold: 0.1
});

revealEls.forEach(el => revealObserver.observe(el));

// ---- 6. HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navMenu   = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
    });
}

// Close mobile nav on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
    });
});
