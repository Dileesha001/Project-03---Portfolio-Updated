/* ===================================
   DILEESHA RAVISHAN - PORTFOLIO JS
=================================== */

// ---- Typed Text Animation ----
const typedTarget = document.getElementById('typedText');
const phrases = [
    'Web Developer',
    'IT Professional',
    'Frontend Developer',
    'Full-Stack Developer',
    'UI/UX Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWriter() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typedTarget.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTarget.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }
    typeTimeout = setTimeout(typeWriter, delay);
}
typeWriter();


// ---- Sticky Header on Scroll ----
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
}
window.addEventListener('scroll', setActiveNav);


// ---- Mobile Menu Toggle ----
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuToggle.classList.remove('open');
    });
});


// ---- Skill Bars Animation (Intersection Observer) ----
const skillFills = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const width = target.getAttribute('data-width');
            target.style.width = width + '%';
            skillObserver.unobserve(target);
        }
    });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ---- Portfolio Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


// ---- Scroll Reveal Animation ----
const reveals = document.querySelectorAll('.section-header, .about-image-wrapper, .about-content, .skills-left, .skills-right, .portfolio-card, .contact-left, .contact-right, .stat-card, .tech-card, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

reveals.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
});


// ---- Back to Top Button ----
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnText = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    btnText.textContent = 'Sending...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    submitBtn.disabled = true;

    setTimeout(() => {
        btnText.textContent = 'Send Message';
        btnIcon.className = 'fas fa-paper-plane';
        submitBtn.disabled = false;
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1800);
});


// ---- Smooth Parallax for Hero ----
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.home-content');
    const heroImage = document.querySelector('.home-image-wrapper');
    const scrolled = window.scrollY;
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.12}px)`;
        if (heroImage) heroImage.style.transform = `translateY(${scrolled * 0.07}px)`;
    }
});


// ---- Smooth anchor scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
