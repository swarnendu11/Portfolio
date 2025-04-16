document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const header = document.querySelector("header");
    const closeButton = document.querySelector(".close-menu");

    // Toggle navigation on hamburger click
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("open");
        document.body.classList.toggle("active-nav");
    });

    // Close menu button
    closeButton.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("open");
        document.body.classList.remove("active-nav");
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("open");
            document.body.classList.remove("active-nav");
        });
    });

    // Close menu if clicked outside
    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("open");
            document.body.classList.remove("active-nav");
        }
    });

    // Add scrolled class to header on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll("section");
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    
    window.addEventListener("scroll", highlightNavLink);
    highlightNavLink(); // Call on initial load

    // Typing animation effect for the typing-text element
    const typingText = document.querySelector(".typing-text");
    if (typingText) {
        const words = ["Developer", "Designer", "Problem Solver"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove a character
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                // Add a character
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            // If word is complete, start deleting after a pause
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1000; // Pause at the end of the word
            } 
            // If deletion is complete, move to the next word
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before starting the next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start the typing animation
        setTimeout(type, 1000);
    }
});
