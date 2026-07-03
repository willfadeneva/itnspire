/* ============================================================
   IT Inspire — Complete JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // NAVIGATION — Scroll effect
    // ============================================================
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    function handleNavScroll() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 600;

        if (scrollY > heroHeight * 0.3) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ============================================================
    // NAVIGATION — Mobile hamburger
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ============================================================
    // NAVIGATION — Active link highlighting
    // ============================================================
    const allSections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 150;
        let currentSectionId = 'hero';

        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    // ============================================================
    // HERO VIDEO — Ensure playback
    // ============================================================
    const heroVideo = document.getElementById('heroVideo');

    if (heroVideo) {
        // Attempt to play; some browsers require user interaction
        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked — add a one-click play handler
                const playVideoOnInteraction = () => {
                    heroVideo.play().catch(() => {});
                    document.removeEventListener('click', playVideoOnInteraction);
                    document.removeEventListener('touchstart', playVideoOnInteraction);
                };
                document.addEventListener('click', playVideoOnInteraction, { once: true });
                document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
            });
        }
    }

    // ============================================================
    // SCROLL REVEAL — Intersection Observer
    // ============================================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after reveal for performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================================
    // BACK TO TOP BUTTON
    // ============================================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    // ============================================================
    // MATH CAPTCHA
    // ============================================================
    const captchaQuestion = document.getElementById('captchaQuestion');
    const captchaInput = document.getElementById('captcha');
    const refreshCaptcha = document.getElementById('refreshCaptcha');

    let captchaAnswer = 0;

    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = Math.random() > 0.5 ? '+' : '-';
        // Ensure non-negative result for subtraction
        let a = num1, b = num2;
        if (operator === '-' && a < b) { [a, b] = [b, a]; }
        captchaAnswer = operator === '+' ? a + b : a - b;
        captchaQuestion.textContent = `${a} ${operator} ${b} = ?`;
        if (captchaInput) captchaInput.value = '';
    }

    generateCaptcha();

    if (refreshCaptcha) {
        refreshCaptcha.addEventListener('click', generateCaptcha);
    }

    // ============================================================
    // FORM VALIDATION & SUBMISSION
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    function showFieldError(field, message) {
        const group = field.closest('.form-group');
        if (!group) return;
        const errorEl = group.querySelector('.form-error');
        group.classList.add('error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('visible');
        }
    }

    function clearFieldError(field) {
        const group = field.closest('.form-group');
        if (!group) return;
        const errorEl = group.querySelector('.form-error');
        group.classList.remove('error');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('visible');
        }
    }

    function validateField(field) {
        const value = field.value.trim();
        const id = field.id;

        clearFieldError(field);

        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required.');
            return false;
        }

        if (id === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address.');
                return false;
            }
        }

        if (id === 'phone' && value) {
            const phoneRegex = /^[\d\s\-+()]{6,20}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number.');
                return false;
            }
        }

        if (id === 'captcha' && value) {
            const numericValue = parseInt(value, 10);
            if (isNaN(numericValue) || numericValue !== captchaAnswer) {
                showFieldError(field, 'Incorrect answer. Please try again.');
                return false;
            }
        }

        return true;
    }

    // Real-time validation on blur
    const formInputs = contactForm ? contactForm.querySelectorAll('input, textarea, select') : [];
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() || input.hasAttribute('required')) {
                validateField(input);
            }
        });

        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const captcha = document.getElementById('captcha');

            const fields = [name, email, phone, message, captcha];
            let isValid = true;

            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                // Focus the first invalid field
                const firstError = contactForm.querySelector('.form-group.error input, .form-group.error textarea');
                if (firstError) firstError.focus();
                showToast('Please fix the errors above before submitting.', 'error');
                return;
            }

            // Gather form data
            const countryCode = document.getElementById('countryCode').value;
            const formData = {
                name: name.value.trim(),
                email: email.value.trim(),
                phone: `${countryCode} ${phone.value.trim()}`,
                message: message.value.trim()
            };

            // Simulate submission (replace with actual API call)
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                showToast('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                generateCaptcha();
                // Clear all error states
                contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
                contactForm.querySelectorAll('.form-error').forEach(e => {
                    e.textContent = '';
                    e.classList.remove('visible');
                });
            }, 1500);

            // Uncomment below for actual fetch:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                showToast('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                generateCaptcha();
            })
            .catch(err => {
                showToast('Something went wrong. Please try again later.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            });
            */
        });
    }

    // ============================================================
    // TOAST NOTIFICATIONS
    // ============================================================
    function showToast(message, type = 'info') {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto-remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // ============================================================
    // SMOOTH SCROLL for .btn-smooth links (fallback for older browsers)
    // ============================================================
    document.querySelectorAll('.btn-smooth').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = parseInt(getComputedStyle(document.documentElement).scrollPaddingTop, 10) || 72;
                    const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: targetPos,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================================
    // KEYBOARD — Escape closes mobile menu
    // ============================================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ============================================================
    // PERFORMANCE — Passive scroll listeners where possible
    // ============================================================
    console.log('IT Inspire site loaded successfully.');
});
