// ============================================================
// DAILY THEME SWITCHER — 7 themes, auto-changes at midnight
// ============================================================
const themes = [
    { name: 'sunday',    label: 'Sunday — Indigo & Cyan' },
    { name: 'monday',    label: 'Monday — Emerald & Teal' },
    { name: 'tuesday',   label: 'Tuesday — Rose & Pink' },
    { name: 'wednesday', label: 'Wednesday — Amber & Orange' },
    { name: 'thursday',  label: 'Thursday — Violet & Purple' },
    { name: 'friday',    label: 'Friday — Sky & Blue' },
    { name: 'saturday',  label: 'Saturday — Slate & Steel' }
];

function getDayTheme() {
    return themes[new Date().getDay()];
}

function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    const themeLabel = document.getElementById('themeLabel');
    const theme = themes.find(t => t.name === themeName);
    if (themeLabel && theme) themeLabel.textContent = theme.label;
    document.querySelectorAll('.theme-picker-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

applyTheme(getDayTheme().name);

// Theme indicator + picker popup
const themeIndicator = document.getElementById('themeIndicator');
const themePicker    = document.getElementById('themePicker');

if (themeIndicator && themePicker) {
    themeIndicator.addEventListener('click', () => themePicker.classList.toggle('open'));

    document.addEventListener('click', (e) => {
        if (!themeIndicator.contains(e.target) && !themePicker.contains(e.target)) {
            themePicker.classList.remove('open');
        }
    });

    themePicker.querySelectorAll('.theme-picker-btn').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });
}

// Auto-switch at midnight
function msUntilMidnight() {
    const now = new Date();
    const mid = new Date(now);
    mid.setHours(24, 0, 0, 0);
    return mid - now;
}
setTimeout(() => {
    applyTheme(getDayTheme().name);
    setInterval(() => applyTheme(getDayTheme().name), 86400000);
}, msUntilMidnight());

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
const typewriterTexts = [
    'Platform & DevOps Engineer',
    'Kubernetes Operator (3.5 yrs)',
    'Linux Systems Engineer',
    'CI/CD & GitOps Practitioner',
    'Cloud Infrastructure (AWS)'
];

let twIndex    = 0;
let twChar     = 0;
let twDeleting = false;
const twEl     = document.getElementById('typewriter');

function typewrite() {
    if (!twEl) return;
    const cur = typewriterTexts[twIndex];
    if (twDeleting) {
        twEl.textContent = cur.substring(0, twChar - 1);
        twChar--;
    } else {
        twEl.textContent = cur.substring(0, twChar + 1);
        twChar++;
    }

    let speed = twDeleting ? 28 : 58;
    if (!twDeleting && twChar === cur.length) {
        speed = 2000;
        twDeleting = true;
    } else if (twDeleting && twChar === 0) {
        twDeleting = false;
        twIndex = (twIndex + 1) % typewriterTexts.length;
        speed = 480;
    }
    setTimeout(typewrite, speed);
}
typewrite();

// ============================================================
// NAVBAR SCROLL + ACTIVE LINK TRACKING
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
            navLinkEls.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sec.id}`);
            });
        }
    });
}

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
const navToggle        = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinksContainer.classList.remove('open');
    });
});

// ============================================================
// SCROLL ANIMATIONS — IntersectionObserver
// ============================================================
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 0.08}s`;
    io.observe(el);
});

// ============================================================
// SMOOTH SCROLL — anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// HERO TERMINAL ANIMATION
// ============================================================
const terminalLines = [
    { text: '$ kubectl get nodes', cls: 't-prompt' },
    { text: 'NAME                STATUS   ROLES    AGE   VERSION', cls: 't-info' },
    { text: 'node-1a-x7k2p       Ready    <none>   14d   v1.29.3', cls: 't-ok' },
    { text: 'node-1b-m9r4q       Ready    <none>   14d   v1.29.3', cls: 't-ok' },
    { text: 'node-1c-p2n8w       Ready    <none>   14d   v1.29.3', cls: 't-ok' },
    { text: '', cls: '' },
    { text: '$ argocd app list', cls: 't-prompt' },
    { text: 'backend-api    Synced   Healthy   https://eks.example.com', cls: 't-tag' },
    { text: 'frontend-app   Synced   Healthy   https://eks.example.com', cls: 't-tag' },
    { text: '', cls: '' },
    { text: '$ terraform plan -var-file=prod.tfvars', cls: 't-prompt' },
    { text: 'Refreshing state...', cls: 't-info' },
    { text: 'Plan: 0 to add, 2 to change, 0 to destroy.', cls: 't-warn' },
    { text: '', cls: '' },
    { text: '$ wizcli image scan --image myapp/api:v2.4.1', cls: 't-prompt' },
    { text: 'Scanning image...  ████████████████ 100%', cls: 't-info' },
    { text: 'Result: PASSED — 0 critical, 0 high vulnerabilities', cls: 't-ok' },
    { text: '', cls: '' },
    { text: '$ echo "All systems nominal ✓"', cls: 't-prompt' },
    { text: 'All systems nominal ✓', cls: 't-ok' },
];

function runTerminalAnimation() {
    const body = document.getElementById('terminalBody');
    if (!body) return;

    body.innerHTML = '';
    let delay = 400;

    terminalLines.forEach((line, idx) => {
        const span = document.createElement('span');
        span.className = `t-line${line.cls ? ' ' + line.cls : ''}`;
        span.textContent = line.text;
        body.appendChild(span);

        const lineDelay = line.text.startsWith('$') ? 800 : 180;
        delay += lineDelay;

        setTimeout(() => {
            span.classList.add('show');
            // Auto-scroll within terminal
            body.scrollTop = body.scrollHeight;
        }, delay);
    });

    // Loop: restart after a pause
    const totalDelay = delay + 4000;
    setTimeout(runTerminalAnimation, totalDelay);
}

// Start after page load
window.addEventListener('load', () => {
    setTimeout(runTerminalAnimation, 800);
});

// ============================================================
// PROJECT CARD 3D TILT
// ============================================================
document.querySelectorAll('.project-card[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * 5;
        const ry = ((x - cx) / cx) * -5;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
});
