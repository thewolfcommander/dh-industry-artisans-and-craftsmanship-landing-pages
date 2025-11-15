// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);

    // Animate hamburger
    const lines = hamburger.querySelectorAll('.line');
    if (menu.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translateY(8px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
});

// Close menu on link click
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const lines = hamburger.querySelectorAll('.line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const masonryItems = document.querySelectorAll('.masonry-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        // Filter items
        masonryItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe slide-in elements
document.querySelectorAll('.slide-in').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Observe pop-in elements
document.querySelectorAll('.pop-in').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerHeight = 90;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling
const inquiryForm = document.getElementById('inquiryForm');
const formMessage = document.querySelector('.form-message');

inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(inquiryForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        formMessage.textContent = 'Thank you for your interest! We\'ll be in touch within 24 hours.';
        formMessage.classList.add('show', 'success');
        inquiryForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }, 1500);
});

// Form validation
const formInputs = inquiryForm.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
        input.style.borderColor = '#C65D3B';
        input.classList.add('error');
        return false;
    } else {
        input.style.borderColor = '#E0E0E0';
        input.classList.remove('error');
        return true;
    }
}

// Parallax effect for circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');

    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.1;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Class cards hover effect
const classCards = document.querySelectorAll('.class-card');

classCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateZ(1deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateZ(0deg)';
    });
});

// Item cards interaction
const itemCards = document.querySelectorAll('.item-card');

itemCards.forEach(card => {
    card.addEventListener('click', function() {
        console.log('Item clicked - could open modal or detail page');
    });
});

// Feature boxes animation on scroll
const featureBoxes = document.querySelectorAll('.feature-box');

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

featureBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(30px)';
    box.style.transition = 'all 0.6s ease';
    featureObserver.observe(box);
});

// Step items animation
const stepItems = document.querySelectorAll('.step-item');

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 150);
        }
    });
}, { threshold: 0.3 });

stepItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = 'all 0.5s ease';
    stepObserver.observe(item);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const lines = hamburger.querySelectorAll('.line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
        hamburger.focus();
    }
});

// Dynamic year in footer (if needed)
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// Enroll buttons
const enrollBtns = document.querySelectorAll('.class-card .btn-small');

enrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const className = btn.closest('.class-card').querySelector('h3').textContent;
        alert(`Enrollment form for "${className}" would open here.\n\nIn a production site, this would open a modal or redirect to an enrollment page.`);
    });
});

// Add subtle rotation to spinning wheel on scroll
const spinningWheel = document.querySelector('.spinning-wheel');
if (spinningWheel) {
    window.addEventListener('scroll', () => {
        const scrollPercent = window.pageYOffset / window.innerHeight;
        spinningWheel.style.transform = `scale(1) rotate(${scrollPercent * 360}deg)`;
    });
}

// Image lazy loading effect
const imagePlaceholders = document.querySelectorAll('.placeholder-img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.1 });

imagePlaceholders.forEach(img => {
    img.style.transition = 'all 0.6s ease';
    imageObserver.observe(img);
});

console.log('🏺 Clay & Fire Pottery Studio - Crafted with love');
