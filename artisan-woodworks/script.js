// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
});

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .reveal-scale');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateCounters = () => {
    if (animated) return;

    const aboutSection = document.querySelector('.about');
    const aboutTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (aboutTop < windowHeight - 200) {
        animated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateCounters);
animateCounters();

// Testimonials slider
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentTestimonial = 0;

const updateSlider = () => {
    const offset = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
};

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateSlider();
});

// Auto-advance testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateSlider();
}, 5000);

// Pause auto-advance on hover
const testimonialsSlider = document.querySelector('.testimonials-slider');
testimonialsSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialsSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        updateSlider();
    }, 5000);
});

// Gallery item interactions
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Add your lightbox or modal functionality here
        console.log('Gallery item clicked');
    });

    item.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    formStatus.textContent = 'Sending your message...';
    formStatus.className = 'form-status';
    formStatus.style.display = 'block';

    // Simulate API call
    setTimeout(() => {
        formStatus.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 1000);
});

// Form validation with accessibility
const formInputs = contactForm.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.setAttribute('aria-invalid', 'true');
            input.style.borderColor = '#dc3545';
        } else {
            input.setAttribute('aria-invalid', 'false');
            input.style.borderColor = '#ddd';
        }
    });

    input.addEventListener('input', () => {
        if (input.hasAttribute('aria-invalid') && input.getAttribute('aria-invalid') === 'true') {
            if (input.value.trim()) {
                input.setAttribute('aria-invalid', 'false');
                input.style.borderColor = '#ddd';
            }
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Set focus to target for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});

// Intersection Observer for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('.image-placeholder').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const animateTimeline = () => {
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (itemTop < windowHeight - 100) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
};

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateTimeline);
animateTimeline();

console.log('Artisan Woodworks - Handcrafted with code ❤️');
