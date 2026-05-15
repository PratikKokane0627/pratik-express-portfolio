// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');

    if (scrollProgress) {
        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});


// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Ignore empty hashes
        if (targetId.length <= 1) return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Close mobile navbar
        const navbarCollapse = document.querySelector('.navbar-collapse.show');

        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
        }
    });
});


// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});


// Intersection Observer Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);


// Observe Elements
document.querySelectorAll(
    '.section-title, .skill-category, .project-card, .about-text, .contact-form, .contact-info, .education-card, .cert-card, .about-image-wrapper, .about-stats'
).forEach(el => {
    observer.observe(el);
});


// Active Nav Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href')?.slice(1) === current) {
            link.classList.add('active');
        }
    });
});


// Contact Form
let messagesList = [];

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            id: Date.now(),
            name: this.name.value,
            email: this.email.value,
            subject: this.subject.value,
            message: this.message.value,
            timestamp: new Date().toISOString(),
            status: 'unread'
        };

        // Store Message
        messagesList.push(formData);

        console.log('New Message:', formData);
        console.log('All Messages:', messagesList);

        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML =
                '<i class="fas fa-check me-2"></i>Message Sent!';

            submitBtn.style.background =
                'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;

                this.reset();

                alert(
                    `Thank you for your message, ${formData.name}! I will get back to you soon.\n\nMessage ID: ${formData.id}`
                );
            }, 2000);
        }, 1500);
    });
}


// Back To Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Resume Download
const downloadResume = document.getElementById('downloadResume');

if (downloadResume) {
    downloadResume.addEventListener('click', function (e) {
        e.preventDefault();

        const resumeUrl = '/resume/Pratik_MernStack_Resume.pdf';

        const originalText = this.innerHTML;

        this.innerHTML =
            '<i class="fas fa-spinner fa-spin me-2"></i>Downloading...';

        this.style.pointerEvents = 'none';

        const link = document.createElement('a');

        link.href = resumeUrl;
        link.download = 'Pratik_Kokane_Resume.pdf';
        link.target = '_blank';

        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.pointerEvents = 'auto';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 1500);
    });
}