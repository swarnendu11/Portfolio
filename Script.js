/**
 * Swarnendu Das - Modern Portfolio Main Interactive Engine
 * Handles dynamic role filtering, CLI terminal, command palette, project modals,
 * dark/light theming, scroll spy, toast notifications, and typing animations.
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- State & DOM References ---
    const htmlElement = document.documentElement;
    const header = document.getElementById("header");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const mobileDrawerBackdrop = document.getElementById("mobileDrawerBackdrop");
    const closeDrawerBtn = document.getElementById("closeDrawerBtn");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    const desktopNavLinks = document.querySelectorAll(".nav-link");
    const backToTopBtn = document.getElementById("backToTopBtn");
    const toastContainer = document.getElementById("toastContainer");

    // Resume Modal
    const resumeModalBackdrop = document.getElementById("resumeModalBackdrop");
    const openCvModalBtn = document.getElementById("openCvModalBtn");
    const heroViewCvBtn = document.getElementById("heroViewCvBtn");
    const aboutPreviewResumeBtn = document.getElementById("aboutPreviewResumeBtn");
    const closeResumeModalBtn = document.getElementById("closeResumeModalBtn");

    // Project Modal
    const projectModalBackdrop = document.getElementById("projectModalBackdrop");
    const closeProjectModalBtn = document.getElementById("closeProjectModalBtn");
    const projectModalTitle = document.getElementById("projectModalTitle");
    const projectModalBody = document.getElementById("projectModalBody");

    // Command Palette
    const cmdPaletteBackdrop = document.getElementById("cmdPaletteBackdrop");
    const cmdPaletteOpenBtn = document.getElementById("cmdPaletteOpenBtn");
    const cmdCloseEsc = document.getElementById("cmdCloseEsc");
    const cmdPaletteInput = document.getElementById("cmdPaletteInput");
    const cmdPaletteResults = document.getElementById("cmdPaletteResults");

    // Project Case Study Data Store
    const projectData = {
        joblix: {
            title: "Joblix — Modern Job Portal & Hiring Platform",
            category: "Full Stack Web Application",
            period: "2026",
            liveUrl: "https://joblix.vercel.app/",
            githubUrl: "https://github.com/swarnendu11/joblix",
            image: "https://res.cloudinary.com/dkwauetdi/image/upload/v1775446078/Screenshot_2026-04-06_085151_xxwcvm.png",
            overview: "Joblix is a production-ready, full-stack hiring ecosystem built to streamline recruitment workflows for modern tech companies and job seekers.",
            keyFeatures: [
                "Clerk Authentication for secure multi-tenant authorization (Candidate & Recruiter profiles)",
                "Next.js App Router with Server-Side Rendering (SSR) for blazing performance & SEO indexability",
                "Dynamic job listing, multi-parameter filtering, bookmarking, and resume submission tracking",
                "Responsive employer analytics dashboard to manage applicants and review resumes seamlessly",
                "Tailwind CSS aesthetic interface with accessible typography and clean contrast"
            ],
            techStack: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Clerk Auth", "Vercel"],
            architecture: "Engineered with modular React components, server actions for asynchronous data fetching, and optimistic UI updates for instant feedback."
        },
        novacare: {
            title: "Novacare — Hospital Management System",
            category: "Healthcare Platform & Backend System",
            period: "2026",
            liveUrl: "https://novacare-frontend.vercel.app/",
            githubUrl: "https://github.com/swarnendu11/novacare",
            image: "https://res.cloudinary.com/dkwauetdi/image/upload/v1782711096/Screenshot_2026-06-29_105235_mfqyox.png",
            overview: "Novacare is a full-featured hospital management system developed collaboratively in a team to modernize clinical workflows, doctor consultations, and patient history management.",
            keyFeatures: [
                "Role-Based Access Control (RBAC) supporting Administrator, Doctor, and Patient dashboards",
                "Secure REST API endpoints built with Node.js and Express.js for appointment scheduling",
                "MongoDB schema architecture with Mongoose modeling patient records, doctors, and slots",
                "JWT session authentication and password encryption with Bcrypt",
                "Real-time consultation status tracking and patient queue management"
            ],
            techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT", "Tailwind CSS"],
            architecture: "Three-tier architecture with separated API routes, controller middlewares, and schema validation layers ensuring zero data corruption."
        },
        shiftly: {
            title: "Shiftly — Logistics & Shipment Hub",
            category: "Logistics Dashboard & Frontend System",
            period: "2026",
            liveUrl: "https://shiftly-pearl.vercel.app/",
            githubUrl: "https://github.com/swarnendu11/shiftly",
            image: "https://res.cloudinary.com/dkwauetdi/image/upload/v1782711096/Screenshot_2026-06-29_105112_wdqwut.png",
            overview: "Shiftly is a high-performance logistics tracking interface built for transport fleets, warehouse managers, and shipment dispatch monitoring.",
            keyFeatures: [
                "Fast single-page application bundled with Vite for near-instant hot reload and minimal bundle size",
                "Interactive parcel tracking dashboard displaying shipment status, routes, and timestamps",
                "RESTful API integration for automated parcel status updates and filtering",
                "Fluid mobile-first UI with custom Tailwind color palette and responsive table views"
            ],
            techStack: ["Vite", "React", "JavaScript (ES6+)", "Tailwind CSS", "REST API", "Vercel"],
            architecture: "Client-side state management handling live tracking data with cached query responses and error fallback boundaries."
        }
    };

    // =========================================================================
    // 1. THEME TOGGLE (Dark / Light)
    // =========================================================================
    const savedTheme = localStorage.getItem("swarnendu_theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("swarnendu_theme", nextTheme);
        showToast(`Switched to ${nextTheme} theme`);
    });

    // =========================================================================
    // 2. MOBILE DRAWER NAVIGATION
    // =========================================================================
    function openMobileDrawer() {
        mobileDrawer.classList.add("active");
        mobileDrawerBackdrop.classList.add("active");
        hamburgerMenu.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMobileDrawer() {
        mobileDrawer.classList.remove("active");
        mobileDrawerBackdrop.classList.remove("active");
        hamburgerMenu.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    hamburgerMenu.addEventListener("click", openMobileDrawer);
    closeDrawerBtn.addEventListener("click", closeMobileDrawer);
    mobileDrawerBackdrop.addEventListener("click", closeMobileDrawer);

    mobileNavLinks.forEach(link => {
        link.addEventListener("click", closeMobileDrawer);
    });

    // =========================================================================
    // 3. HEADER SCROLL EFFECT & SCROLL SPY
    // =========================================================================
    const sections = document.querySelectorAll("section[id]");

    function handleScroll() {
        const scrollY = window.scrollY;

        // Sticky Header shadow
        if (scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Back to top button visibility
        if (scrollY > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }

        // Active Nav Link Spy
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                desktopNavLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
                mobileNavLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // =========================================================================
    // 4. TYPING TEXT ANIMATION
    // =========================================================================
    const typingTextElement = document.getElementById("typingText");
    if (typingTextElement) {
        const roles = [
            "Full Stack Developer",
            "Node.js & Express Engineer",
            "React & Next.js Specialist",
            "Software Development Engineer",
            "System & API Architect",
            "MCA Candidate (2026)"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function loopType() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1600; // Pause after word is typed
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400; // Pause before new word
            }

            setTimeout(loopType, typingSpeed);
        }

        setTimeout(loopType, 800);
    }

    // =========================================================================
    // 5. TARGET ROLE LENS SELECTOR
    // =========================================================================
    const roleLensBtns = document.querySelectorAll(".role-lens-btn");
    const roleBannerText = document.getElementById("roleBannerText");
    const skillsCategoryCards = document.querySelectorAll(".skill-category-card");

    const roleNarratives = {
        all: "Showing all technical highlights: Full-stack applications, scalable backend APIs, modern frontend UI, and CS fundamentals.",
        fullstack: "Focusing on Full-Stack mastery: Next.js + Tailwind on the frontend, Node/Express on the backend, and MongoDB/MySQL persistence.",
        backend: "Highlighting Backend & Systems: Node.js, Express.js REST APIs, MySQL relational schemas, authentication (JWT/OAuth), and server controllers.",
        frontend: "Emphasizing Frontend Engineering: React, Next.js App Router, TypeScript, responsive Tailwind CSS layouts, and modern Vite pipelines.",
        fresher: "Spotlighting SDE Candidate profile: MCA (7.69 CGPA), Data Structures, Algorithms, clean code architecture, and high communication skills."
    };

    roleLensBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            roleLensBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedRole = btn.dataset.role;
            roleBannerText.textContent = roleNarratives[selectedRole] || roleNarratives.all;

            // Highlight relevant skill cards
            skillsCategoryCards.forEach(card => {
                const cat = card.dataset.category;
                card.style.borderColor = "";
                card.style.transform = "";

                if (selectedRole === "backend" && cat === "backend") {
                    card.style.borderColor = "var(--accent-primary)";
                    card.style.transform = "translateY(-4px)";
                } else if (selectedRole === "frontend" && cat === "frontend") {
                    card.style.borderColor = "var(--accent-primary)";
                    card.style.transform = "translateY(-4px)";
                } else if (selectedRole === "fullstack" && (cat === "backend" || cat === "frontend")) {
                    card.style.borderColor = "var(--accent-primary)";
                }
            });

            showToast(`Role Lens updated: ${btn.textContent.trim()}`);
        });
    });

    // =========================================================================
    // 6. SKILLS MATRIX FILTERING
    // =========================================================================
    const skillTabs = document.querySelectorAll(".skill-tab");

    skillTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            skillTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const selectedCat = tab.dataset.skillCat;

            skillsCategoryCards.forEach(card => {
                if (selectedCat === "all" || card.dataset.category === selectedCat) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // =========================================================================
    // 7. PROJECTS FILTER & LIVE SEARCH
    // =========================================================================
    const projFilterBtns = document.querySelectorAll(".proj-filter-btn");
    const projectSearchInput = document.getElementById("projectSearchInput");
    const projectCards = document.querySelectorAll(".project-card");

    function filterProjects() {
        const activeFilter = document.querySelector(".proj-filter-btn.active")?.dataset.filter || "all";
        const query = projectSearchInput.value.toLowerCase().trim();

        projectCards.forEach(card => {
            const cardCat = card.dataset.category || "";
            const cardTech = (card.dataset.tech || "") + " " + card.querySelector(".project-title").textContent.toLowerCase();

            const matchesCategory = activeFilter === "all" || cardCat.includes(activeFilter);
            const matchesSearch = query === "" || cardTech.includes(query);

            if (matchesCategory && matchesSearch) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    projFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            projFilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterProjects();
        });
    });

    projectSearchInput.addEventListener("input", filterProjects);

    // =========================================================================
    // 8. PROJECT CASE STUDY MODAL
    // =========================================================================
    const projectDetailBtns = document.querySelectorAll(".project-detail-btn");

    function openProjectModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        projectModalTitle.textContent = data.title;
        projectModalBody.innerHTML = `
            <div class="modal-project-content" style="display: flex; flex-direction: column; gap: 20px;">
                <div style="width: 100%; height: 220px; border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-tertiary);">
                    <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>

                <div>
                    <span style="font-size: 0.8rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase;">${data.category} &bull; ${data.period}</span>
                    <p style="margin-top: 8px; font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary);">${data.overview}</p>
                </div>

                <div>
                    <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px; color: var(--text-primary);"><i class="fas fa-check-circle text-success"></i> Key Engineering Highlights</h4>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                        ${data.keyFeatures.map(feat => `<li style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; padding-left: 18px; position: relative;"><span style="position: absolute; left: 0; color: var(--accent-primary);">&bull;</span> ${feat}</li>`).join("")}
                    </ul>
                </div>

                <div>
                    <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px; color: var(--text-primary);"><i class="fas fa-cubes text-primary"></i> Technology Stack</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${data.techStack.map(t => `<span class="tech-tag" style="background: var(--bg-tertiary); padding: 4px 10px; font-size: 0.78rem;">${t}</span>`).join("")}
                    </div>
                </div>

                <div style="background: var(--bg-tertiary); padding: 14px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-primary);">
                    <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">System Architecture Note</h5>
                    <p style="font-size: 0.82rem; color: var(--text-muted);">${data.architecture}</p>
                </div>

                <div style="display: flex; gap: 12px; margin-top: 10px; flex-wrap: wrap;">
                    <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex: 1;">
                        <i class="fas fa-external-link-alt"></i> Open Live Application
                    </a>
                    <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="flex: 1;">
                        <i class="fab fa-github"></i> View GitHub Source
                    </a>
                </div>
            </div>
        `;

        projectModalBackdrop.classList.add("active");
        projectModalBackdrop.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeProjectModal() {
        projectModalBackdrop.classList.remove("active");
        projectModalBackdrop.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    projectDetailBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const projId = btn.dataset.projectId;
            openProjectModal(projId);
        });
    });

    closeProjectModalBtn.addEventListener("click", closeProjectModal);
    projectModalBackdrop.addEventListener("click", (e) => {
        if (e.target === projectModalBackdrop) closeProjectModal();
    });

    // =========================================================================
    // 9. RESUME PREVIEW MODAL
    // =========================================================================
    function openResumeModal() {
        resumeModalBackdrop.classList.add("active");
        resumeModalBackdrop.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeResumeModal() {
        resumeModalBackdrop.classList.remove("active");
        resumeModalBackdrop.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (openCvModalBtn) openCvModalBtn.addEventListener("click", openResumeModal);
    if (heroViewCvBtn) heroViewCvBtn.addEventListener("click", openResumeModal);
    if (aboutPreviewResumeBtn) aboutPreviewResumeBtn.addEventListener("click", openResumeModal);
    if (closeResumeModalBtn) closeResumeModalBtn.addEventListener("click", closeResumeModal);

    resumeModalBackdrop.addEventListener("click", (e) => {
        if (e.target === resumeModalBackdrop) closeResumeModal();
    });

    // =========================================================================
    // 10. COMMAND PALETTE (Ctrl/Cmd + K)
    // =========================================================================
    function openCmdPalette() {
        cmdPaletteBackdrop.classList.add("active");
        cmdPaletteBackdrop.setAttribute("aria-hidden", "false");
        cmdPaletteInput.value = "";
        cmdPaletteInput.focus();
        filterCmdItems("");
        document.body.style.overflow = "hidden";
    }

    function closeCmdPalette() {
        cmdPaletteBackdrop.classList.remove("active");
        cmdPaletteBackdrop.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (cmdPaletteOpenBtn) cmdPaletteOpenBtn.addEventListener("click", openCmdPalette);
    if (cmdCloseEsc) cmdCloseEsc.addEventListener("click", closeCmdPalette);

    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            if (cmdPaletteBackdrop.classList.contains("active")) {
                closeCmdPalette();
            } else {
                openCmdPalette();
            }
        } else if (e.key === "Escape") {
            closeCmdPalette();
            closeResumeModal();
            closeProjectModal();
            closeMobileDrawer();
        }
    });

    cmdPaletteBackdrop.addEventListener("click", (e) => {
        if (e.target === cmdPaletteBackdrop) closeCmdPalette();
    });

    const cmdItems = document.querySelectorAll(".cmd-item");

    function filterCmdItems(q) {
        const query = q.toLowerCase().trim();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (query === "" || text.includes(query)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    }

    if (cmdPaletteInput) {
        cmdPaletteInput.addEventListener("input", () => {
            filterCmdItems(cmdPaletteInput.value);
        });
    }

    cmdItems.forEach(item => {
        item.addEventListener("click", () => {
            const action = item.dataset.action;
            const target = item.dataset.target;
            closeCmdPalette();

            if (action === "goto" && target) {
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            } else if (action === "update-photo") {
                const photoInput = document.getElementById("profilePhotoInput");
                if (photoInput) photoInput.click();
            } else if (action === "resume") {
                openResumeModal();
            } else if (action === "download-resume") {
                const a = document.createElement("a");
                a.href = "Swarnendu_das.pdf";
                a.download = "Swarnendu_das.pdf";
                a.click();
            } else if (action === "copy-email") {
                copyToClipboard("swarnendu.1122das@gmail.com", "Email copied to clipboard!");
            } else if (action === "toggle-theme") {
                themeToggleBtn.click();
            } else if (action === "whatsapp") {
                window.open("https://wa.me/918478900839", "_blank");
            } else if (action === "instagram") {
                window.open("https://www.instagram.com/itz.swarnendu/", "_blank");
            }
        });
    });

    // =========================================================================
    // 12. COPY TO CLIPBOARD & TOAST SYSTEM
    // =========================================================================
    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<i class="fas fa-check-circle text-success"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(100%)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function copyToClipboard(text, successMsg) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMsg || "Copied to clipboard!");
        }).catch(() => {
            showToast("Failed to copy text");
        });
    }

    const quickCopyEmailBtn = document.getElementById("quickCopyEmailBtn");
    const copyEmailContactBtn = document.getElementById("copyEmailContactBtn");

    if (quickCopyEmailBtn) {
        quickCopyEmailBtn.addEventListener("click", () => {
            copyToClipboard("swarnendu.1122das@gmail.com", "swarnendu.1122das@gmail.com copied!");
        });
    }

    if (copyEmailContactBtn) {
        copyEmailContactBtn.addEventListener("click", () => {
            copyToClipboard("swarnendu.1122das@gmail.com", "swarnendu.1122das@gmail.com copied!");
        });
    }

    // =========================================================================
    // 13. CONTACT FORM SUBMISSION
    // =========================================================================
    const contactForm = document.getElementById("contactForm");
    const contactSubmitBtn = document.getElementById("contactSubmitBtn");
    const formStatusMsg = document.getElementById("formStatusMsg");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const subject = document.getElementById("contactSubject").value || "Portfolio Inquiry";
            const message = document.getElementById("contactMessage").value;

            // Submit visual state
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Preparing Email...`;

            setTimeout(() => {
                formStatusMsg.className = "form-status success";
                formStatusMsg.style.display = "block";
                formStatusMsg.innerHTML = `
                    <strong>Thank you, ${name}!</strong> Your message has been prepared. Opening your default mail client now, or email directly at <a href="mailto:swarnendu.1122das@gmail.com" style="color: var(--accent-primary); text-decoration: underline;">swarnendu.1122das@gmail.com</a>.
                `;

                // Open default email client with populated fields
                const mailtoUrl = `mailto:swarnendu.1122das@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Swarnendu,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.location.href = mailtoUrl;

                contactForm.reset();
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> Send Another Message`;
                showToast("Opening email client to send message...");
            }, 600);
        });
    }

    // =========================================================================
    // 14. PROFILE PHOTO INITIALIZATION
    // =========================================================================
    const DEFAULT_PROFILE_PHOTO = "https://res.cloudinary.com/dkwauetdi/image/upload/v1788420366/ChatGPT_Image_Sep_3_2026_12_42_05_PM_2_optimized_1000_djumhy.png";
    const profileImgs = document.querySelectorAll(".profile-img, .logo-img");

    profileImgs.forEach(img => {
        if (!img.getAttribute("src")) {
            img.src = DEFAULT_PROFILE_PHOTO;
        }
    });

});
