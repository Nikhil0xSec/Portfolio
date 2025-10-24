// DOM Elements
const body = document.querySelector('body');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.querySelector('.theme-toggle');
const skillBars = document.querySelectorAll('.skill-per');
const form = document.getElementById('contactForm');
const yearSpan = document.getElementById('year');
const loader = document.querySelector('.loader-wrapper');
const scrollProgress = document.querySelector('.scroll-progress');
const animatedBg = document.querySelector('.animated-bg');

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 1000);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const options = {
        strings: ['Jr. tech Professional', 'UX/UI Designer', 'Web Developer', 'Cybersecurity Enthusiast'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 1000,
        loop: true
    };
    
    if (document.querySelector('.typed-text')) {
        new Typed('.typed-text', options);
    }
});

// Set current year in footer
yearSpan.textContent = new Date().getFullYear();

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Theme Toggle
function toggleTheme() {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

themeToggle.addEventListener('click', toggleTheme);
loadTheme();

// Animate skill bars when in viewport
function animateSkillBars() {
    // For the new circular progress charts
    document.querySelectorAll('.skill-circle-progress').forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percent'));
        const radius = circle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        
        // Calculate the stroke-dashoffset based on percentage
        // Lower percentage = more of the circle is hidden (higher dashoffset)
        const offset = circumference - (percent / 100) * circumference;
        
        // Set the circle properties for animation
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference; // Start from full offset (empty)
        
        // Trigger animation
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });
}

// Intersection Observer for skills animations
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// Active nav link on scroll
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// EmailJS Initialization

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("Hm_Nox_1z7iJfJyh1"); // your public key
});

// Form validation
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        let isValid = true;
        const formElements = form.elements;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });
        
        // Check required fields
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            
            if (element.hasAttribute('required') && element.value.trim() === '') {
                const errorMessage = element.nextElementSibling;
                errorMessage.textContent = 'This field is required';
                errorMessage.style.display = 'block';
                isValid = false;
            }
            
            // Email validation
            if (element.type === 'email' && element.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(element.value)) {
                    const errorMessage = element.nextElementSibling;
                    errorMessage.textContent = 'Please enter a valid email address';
                    errorMessage.style.display = 'block';
                    isValid = false;
                }
            }
        }
        
        if (isValid) {
        // 1. Manually collect the data from the form fields
        const templateParams = {
            name: document.getElementById('name').value,       // Gets value from Name input
            email: document.getElementById('email').value,     // Gets value from Email input
            message: document.getElementById('message').value, // Gets value from Message textarea
            // Add any other template variables needed by your EmailJS template here
        };

    // 2. Use emailjs.send(serviceID, templateID, templateParams)
    // NOTE: I'm assuming "template_ctiqtf4" is your new Template ID.
        emailjs.send("service_b28mogc", "template_ctiqtf4", templateParams)
            .then(() => {
                alert("Form submitted successfully!");
                form.reset();
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            alert("Something went wrong. Please try again later.");
        });
}

        // In a real application, you would submit the form data to a server here
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: new FormData(form)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Handle success
        // })
        // .catch(error => {
        //     // Handle error
        // });
    });
}

// Reveal animations for sections
const revealSections = document.querySelectorAll('.section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

let currentTestimonial = 0;

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the current testimonial and activate its dot
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentTestimonial = index;
}

// Click event for dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showTestimonial(index);
    });
});

// Click event for prev arrow
prevArrow.addEventListener('click', () => {
    const newIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(newIndex);
});

// Click event for next arrow
nextArrow.addEventListener('click', () => {
    const newIndex = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(newIndex);
});

// Auto rotate testimonials
let testimonialInterval;

function startTestimonialInterval() {
    testimonialInterval = setInterval(() => {
        const newIndex = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(newIndex);
    }, 5000);
}

function stopTestimonialInterval() {
    clearInterval(testimonialInterval);
}

// Start the autoplay
startTestimonialInterval();

// Pause on hover
const testimonialsContainer = document.querySelector('.testimonials-container');
if (testimonialsContainer) {
    testimonialsContainer.addEventListener('mouseenter', stopTestimonialInterval);
    testimonialsContainer.addEventListener('mouseleave', startTestimonialInterval);
}

// Animated Background
if (animatedBg) {
    const ctx = animatedBg.getContext('2d');
    let particles = [];
    const particleCount = 100;
    
    // Set canvas to full window size
    function resizeCanvas() {
        animatedBg.width = window.innerWidth;
        animatedBg.height = window.innerHeight;
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * animatedBg.width,
                y: Math.random() * animatedBg.height,
                radius: Math.random() * 2 + 1,
                color: 'rgba(255, 255, 255, 0.5)',
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25
            });
        }
    }
    
    // Draw particles
    function drawParticles() {
        ctx.clearRect(0, 0, animatedBg.width, animatedBg.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce back when hitting the edges
            if (particle.x < 0 || particle.x > animatedBg.width) {
                particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > animatedBg.height) {
                particle.speedY = -particle.speedY;
            }
        });
        
        // Connect particles with lines when they are close enough
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance/600})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawParticles);
    }
    
    // Initialize animated background
    function initAnimatedBg() {
        resizeCanvas();
        createParticles();
        drawParticles();
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
    
    // Start animation
    initAnimatedBg();
}

// Achievements Counter
function countUp(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const count = parseInt(element.innerText);
    const increment = target / 50; // Adjust speed of counting
    
    if (count < target) {
        element.innerText = Math.ceil(count + increment);
        setTimeout(() => countUp(element), 50);
    } else {
        element.innerText = target;
    }
}

const achievementValues = document.querySelectorAll('.achievement-value');
if (achievementValues.length > 0) {
    const achievementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start all counters when achievements section is visible
                achievementValues.forEach(value => {
                    setTimeout(() => {
                        countUp(value);
                    }, 400);
                });
                achievementsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the achievements section
    achievementsObserver.observe(document.querySelector('.achievements-section'));
}

// Business Card Download
document.addEventListener('DOMContentLoaded', function() {
    const downloadCardBtn = document.querySelector('.download-card');
    
    if (downloadCardBtn) {
        downloadCardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create canvas to render the business card
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set dimensions (standard business card size ratio)
            canvas.width = 1050;
            canvas.height = 600;
            
            // Draw background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#2563eb');
            gradient.addColorStop(1, '#1e3a8a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add logo circle
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(canvas.width/2, 180, 60, 0, Math.PI * 2);
            ctx.fill();
            
            // Add initials
            ctx.fillStyle = '#2563eb';
            ctx.font = 'bold 70px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('NK', canvas.width/2, 180);
            
            // Add name
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 60px Arial, sans-serif';
            ctx.fillText('Nikhil Kumar Dev', canvas.width/2, 320);
            
            // Add title
            ctx.font = '30px Arial, sans-serif';
            ctx.fillText('JR. TECH PROFESSIONAL', canvas.width/2, 380);
            
            // Add contact information
            ctx.font = '25px Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('Email: devnikhil19@gmail.com', 100, 450);
            ctx.fillText('Phone: +91 6202536561', 100, 490);
            ctx.fillText('Location: Chennai, Tamil Nadu', 100, 530);
            ctx.fillText('Website: www.nikhildev.com.np', 100, 570);
            
            // Add social icons (simplified)
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(canvas.width - 200, 520, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(canvas.width - 150, 520, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(canvas.width - 100, 520, 20, 0, Math.PI * 2);
            ctx.fill();
            
            // Convert to image and trigger download
            const dataURL = canvas.toDataURL('image/png');
            
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'Nikhil_business_card.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }
});

// Timeline Animations
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Make the timeline item visible
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 200);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        // Initially hide all timeline items
        item.style.opacity = '0';
        
        // Alternate direction based on odd/even
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observe each timeline item
        timelineObserver.observe(item);
    });
} 




