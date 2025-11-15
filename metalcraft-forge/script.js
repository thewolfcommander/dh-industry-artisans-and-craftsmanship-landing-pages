// Mobile Navigation
const navTrigger = document.querySelector('.nav-trigger');
const navLinks = document.querySelector('.nav-links');

navTrigger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const expanded = navTrigger.getAttribute('aria-expanded') === 'true';
    navTrigger.setAttribute('aria-expanded', !expanded);

    // Animate bars
    const bars = navTrigger.querySelectorAll('.bar');
    if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'rotate(45deg) translateY(8px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navTrigger.setAttribute('aria-expanded', 'false');
        const bars = navTrigger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Navigation scroll effect
const topnav = document.querySelector('.topnav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        topnav.classList.add('elevated');
    } else {
        topnav.classList.remove('elevated');
    }
});

// Animated counters for stats
const statValues = document.querySelectorAll('.stat-value');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;

    const statsBar = document.querySelector('.stats-bar');
    const statsTop = statsBar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statsTop < windowHeight - 100) {
        statsAnimated = true;

        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'));
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

window.addEventListener('scroll', animateStats);
animateStats();

// Skill bars animation
const skillFills = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) return;

    const craftSection = document.querySelector('.craft-section');
    const craftTop = craftSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (craftTop < windowHeight - 200) {
        skillsAnimated = true;

        skillFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
        });
    }
};

window.addEventListener('scroll', animateSkills);
animateSkills();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = 80;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio card interactions
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
        console.log('Portfolio item clicked');
    });

    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service blocks
document.querySelectorAll('.service-block').forEach((block, index) => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(50px)';
    block.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(block);
});

// Observe process steps
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = `all 0.6s ease ${index * 0.15}s`;
    observer.observe(step);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formResponse = document.querySelector('.form-response');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate submission
    setTimeout(() => {
        formResponse.textContent = 'Thank you! We\'ll contact you within 24 hours to discuss your project.';
        formResponse.classList.add('visible', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
            formResponse.classList.remove('visible');
        }, 5000);
    }, 1500);
});

// Form validation
const formInputs = contactForm.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = 'var(--fire)';
        } else {
            input.style.borderColor = 'var(--iron)';
        }
    });

    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.style.borderColor = 'var(--iron)';
        }
    });
});

// Parallax effect for sparks
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sparks = document.querySelectorAll('.spark');

    sparks.forEach((spark, index) => {
        const speed = (index + 1) * 0.05;
        spark.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to service blocks
const serviceBlocks = document.querySelectorAll('.service-block');

serviceBlocks.forEach(block => {
    block.addEventListener('mouseenter', function() {
        this.style.background = 'var(--iron)';
    });

    block.addEventListener('mouseleave', function() {
        this.style.background = 'var(--charcoal)';
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navTrigger.setAttribute('aria-expanded', 'false');
        const bars = navTrigger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
        navTrigger.focus();
    }
});

// Add loading class on images
const imgPlaceholders = document.querySelectorAll('.img-placeholder');

const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.1 });

imgPlaceholders.forEach(img => {
    img.style.transition = 'all 0.5s ease';
    imgObserver.observe(img);
});

console.log('⚒️ Metalcraft Forge - Forged with code and passion');
