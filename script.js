// ========================================
// Daily Theme Switcher (7 themes, changes every 24h)
// ========================================
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
    if (themeLabel && theme) {
        themeLabel.textContent = theme.label;
    }
    // Update active state on picker buttons
    document.querySelectorAll('.theme-picker-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
}

// Apply today's theme on load
const todayTheme = getDayTheme();
applyTheme(todayTheme.name);

// Theme indicator toggle
const themeIndicator = document.getElementById('themeIndicator');
const themePicker = document.getElementById('themePicker');

if (themeIndicator && themePicker) {
    themeIndicator.addEventListener('click', () => {
        themePicker.classList.toggle('open');
    });

    // Close picker when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeIndicator.contains(e.target) && !themePicker.contains(e.target)) {
            themePicker.classList.remove('open');
        }
    });

    // Theme picker buttons — preview any theme
    themePicker.querySelectorAll('.theme-picker-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
        });
    });
}

// Auto-switch at midnight
function msUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight - now;
}

setTimeout(() => {
    applyTheme(getDayTheme().name);
    // Then check every 24 hours
    setInterval(() => applyTheme(getDayTheme().name), 24 * 60 * 60 * 1000);
}, msUntilMidnight());

// ========================================
// Typewriter Effect
// ========================================
const typewriterTexts = [
    'DevOps Engineer',
    'Cloud Infrastructure Architect',
    'CI/CD Pipeline Builder',
    'Kubernetes Enthusiast',
    'Infrastructure as Code Advocate',
    'Automation First Thinker'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typewrite() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        speed = 500; // Pause before next word
    }

    setTimeout(typewrite, speed);
}

typewrite();

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// Mobile Navigation Toggle
// ========================================
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.stat-card, .skill-category, .timeline-item, .project-card, .contact-card'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index % 6 * 0.1}s`;
        observer.observe(el);
    });
});

// ========================================
// Smooth scroll for all anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
