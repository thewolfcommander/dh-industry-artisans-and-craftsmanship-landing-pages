// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');

menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
});

mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.collection-item, .technique-card, .workshop-box').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${i * 0.1}s`;
    observer.observe(el);
});

// Form handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        formStatus.textContent = 'Thank you! We\'ll be in touch soon.';
        formStatus.classList.add('show', 'success');
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;

        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 5000);
    }, 1000);
});

console.log('🧵 Textile Weavers - Woven with care');
