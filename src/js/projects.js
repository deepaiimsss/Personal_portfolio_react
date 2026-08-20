/* ======================================================
   DEEPJIT DAS — Project Details & Lightbox Modal
   ====================================================== */

const projectsData = [
    {
        title: "AI Resume Analyzer",
        date: "May 2026",
        image: "images/portfolio/portfolio-1.jpg",
        desc: "An intelligent, end-to-end recruitment solution that parses resumes, scores candidate qualification against job descriptions using LLMs, and offers tailored suggestions for improvements.",
        features: [
            "Real-time semantic resume-to-job matching algorithm",
            "AI-generated candidate scoring and improvement tips",
            "Built with Puter.js and modern TypeScript ecosystem",
            "Responsive, dark-themed UI built with Tailwind CSS"
        ],
        techs: ["React.js", "TypeScript", "Tailwind CSS", "Puter.js", "LLM API"],
        github: "https://github.com/deepaimsss",
        live: "https://deepjitnita.vercel.app"
    },
    {
        title: "Tax Portal (National Informatics Centre)",
        date: "Aug 2025",
        image: "images/portfolio/portfolio-2.jpg",
        desc: "An enterprise tax computation and filing portal developed during internship at the National Informatics Centre (NIC). Streamlines government tax workflow with secure verification.",
        features: [
            "Robust Spring Boot backend with ACID-compliant PostgreSQL DB",
            "Automated tax calculations and deduction validations",
            "Role-based authentication & citizen tax ledger records",
            "High-speed single page interface powered by Vite & React"
        ],
        techs: ["React.js", "Vite", "Spring Boot", "PostgreSQL", "REST APIs"],
        github: "https://github.com/deepaimsss",
        live: "https://deepjitnita.vercel.app"
    },
    {
        title: "Retune Music Platform",
        date: "Aug 2024",
        image: "images/portfolio/portfolio-3.jpg",
        desc: "A sleek, full-featured music streaming web application designed for seamless audio playback, playlist curation, and low-latency audio buffering.",
        features: [
            "Custom HTML5 audio player with visual waveforms",
            "User playlists, favorite tracks, and search filtering",
            "Node.js backend with audio stream pipeline handling",
            "Smooth animated UI with glassmorphic controls"
        ],
        techs: ["React JS", "Node.js", "Express", "HTML5 Audio", "CSS3"],
        github: "https://github.com/deepaimsss",
        live: "https://deepjitnita.vercel.app"
    },
    {
        title: "Flipkart Full-Stack Clone",
        date: "Aug 2023",
        image: "images/portfolio/portfolio-4.jpg",
        desc: "A production-grade e-commerce replica of Flipkart with complete customer shopping journey from catalog browsing to cart management and checkout.",
        features: [
            "Redux state management for cart, user auth, and filters",
            "MongoDB schema with product inventory and order tracking",
            "Secure JWT-based user authentication and order history",
            "Responsive layout matching Flipkart's core design system"
        ],
        techs: ["React", "Redux", "Node.js", "Express", "MongoDB"],
        github: "https://github.com/deepaimsss",
        live: "https://deepjitnita.vercel.app"
    },
    {
        title: "Telegram Group-Calls Music Bot",
        date: "Oct 2023",
        image: "images/portfolio/portfolio-5.jpg",
        desc: "High-performance Python Telegram bot that streams high-quality music into Telegram group voice chats directly from YouTube, Spotify, and Apple Music.",
        features: [
            "Multi-source streaming (YouTube, Spotify, Apple Music)",
            "Low-latency voice chat audio feeding using Py-TgCalls",
            "Queue management, seek, skip, loop, and volume controls",
            "Async architecture handling thousands of group chats"
        ],
        techs: ["Python", "Pyrogram", "Py-TgCalls", "AsyncIO", "FFmpeg"],
        github: "https://github.com/deepaimsss",
        live: "https://telegram.dog/Itz_me_AR"
    },
    {
        title: "Rock-Paper-Scissors AI Game",
        date: "Nov 2023",
        image: "images/portfolio/portfolio-6.jpg",
        desc: "An interactive arcade web game featuring score tracking, randomized computer strategy, and custom visual victory animations.",
        features: [
            "Smooth hand-selection animations and instant round scoring",
            "Persistent high score storage in localStorage",
            "Pure vanilla JavaScript architecture with zero dependencies",
            "Adaptive sound effects and responsive touch controls"
        ],
        techs: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
        github: "https://github.com/deepaimsss",
        live: "https://deepjitnita.vercel.app"
    }
];

function openProjectModal(index) {
    const proj = projectsData[index];
    if (!proj) return;

    const modal = document.getElementById('projectModal');
    if (!modal) return;

    document.getElementById('pmTitle').textContent = proj.title;
    document.getElementById('pmDate').textContent = proj.date;
    document.getElementById('pmImage').src = proj.image;
    document.getElementById('pmImage').alt = proj.title;
    document.getElementById('pmDesc').textContent = proj.desc;

    // Features list
    const featuresList = document.getElementById('pmFeatures');
    featuresList.innerHTML = '';
    proj.features.forEach(f => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${f}`;
        featuresList.appendChild(li);
    });

    // Tech badges
    const techsWrap = document.getElementById('pmTechs');
    techsWrap.innerHTML = '';
    proj.techs.forEach(t => {
        const span = document.createElement('span');
        span.textContent = t;
        techsWrap.appendChild(span);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Click to copy functionality
function initCopyElements() {
    document.querySelectorAll('.copyable').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = el.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const toast = document.getElementById('toast-success');
                if (toast) {
                    toast.textContent = `📋 Copied: ${textToCopy}`;
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3000);
                }
            });
        });
    });
}

function initProjects() {
    // Attach click listener to project cards
    const cards = document.querySelectorAll('.proj-card');
    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => openProjectModal(index));
    });

    // Close button & backdrop
    const closeBtn = document.getElementById('pmClose');
    const modal = document.getElementById('projectModal');
    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
    }

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });

    initCopyElements();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
} else {
    initProjects();
}
