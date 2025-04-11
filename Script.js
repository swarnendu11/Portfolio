document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");

    // Toggle navigation on click
    hamburger.addEventListener("click", function () {
        nav.classList.toggle("active");

        // Prevent body scrolling when menu is open
        document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
        });
    });

    // Close menu if clicked outside
    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});

// Navigation menu toggle
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

document.getElementById('hamburger-menu').addEventListener('click', toggleMenu);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            const menu = document.getElementById('menu');
            menu.classList.remove('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add animation to skill items on scroll
const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'Frontend Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingText.textContent = currentChar;
    typingText.classList.add('stop-blinking');

    if (!isDeleting && charIndex < currentWord.length) {
        // If typing
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If deleting
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted
        isEnd = true;
        isDeleting = !isDeleting;
        
        if (isDeleting) {
            setTimeout(typeEffect, 2000);
        } else {
            wordIndex = !isEnd ? wordIndex : (wordIndex + 1) % words.length;
            charIndex = 0;
            setTimeout(typeEffect, 500);
        }
    }
}

// Start the typing animation
document.addEventListener('DOMContentLoaded', function() {
    if(typingText) {
        setTimeout(typeEffect, 1000);
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
