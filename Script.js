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
