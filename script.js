// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    
    // Add click event listeners for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Skill filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            skillItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate skill progress bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    // Trigger animation when skills section comes into view
    const skillsSection = document.querySelector('#skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Project discussion"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Hero buttons functionality
    const viewWorkButton = document.querySelector('.btn-primary');
    const downloadResumeButton = document.querySelector('.btn-secondary');
    
    if (viewWorkButton) {
        viewWorkButton.addEventListener('click', function() {
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (downloadResumeButton) {
        downloadResumeButton.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'Diya N resume.pdf';
            link.download = 'Diya_N_Resume.pdf';
            
            try {
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                window.open('Diya N resume.pdf', '_blank');
            }
        });
    }

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Project Modal Functionality
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');

    // Project data (added "link" for Figma/URLs)
    const projectData = {
        eventloop: {
            title: "EventLoop Platform",
            type: "Web Application",
            year: "2024",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2070&q=80",
            description: "A comprehensive event management platform designed for seamless event discovery, registration, and management.",
            tags: ["UI Design", "UX Research", "Prototyping", "Figma", "User Testing"],
            features: ["Event creation and management", "User registration", "Interactive calendar", "Payment integration"],
            process: "Research → Wireframes → Prototypes → Testing → Iteration",
            link: "https://www.figma.com/file/xxxx/EventLoop" // ADD your actual figma link
        },
        restaurant: {
            title: "Restaurant App Interface",
            type: "Mobile App",
            year: "2024",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2070&q=80",
            description: "Modern restaurant application focusing on seamless food ordering experience.",
            tags: ["Mobile Design", "UI/UX", "Food & Beverage"],
            features: ["Menu browsing", "Real-time order tracking", "Secure payment"],
            process: "Competitor analysis → Journey mapping → Iterative prototyping",
            link: "https://www.figma.com/file/yyyy/RestaurantApp"
        },
        "college-events": {
            title: "College Events Management",
            type: "Educational Platform",
            year: "2024",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80",
            description: "Complete college event management system with admin dashboard.",
            tags: ["Web Design", "Dashboard", "Event Management"],
            features: ["Admin dashboard", "Student registration", "Event categorization"],
            process: "Wireframes → Multi-user flows → Responsive design",
            link: "https://www.figma.com/file/zzzz/CollegeEvents"
        }
    };

    // Card click opens modal
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Button click inside card
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectCard = this.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }

    const modalCloseBtn = document.getElementById('modalCloseBtn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal && projectModal.style.display === 'block') {
            closeProjectModal();
        }
    });

    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalType').textContent = project.type;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalProcess').textContent = project.process;

        // Tags
        const modalTags = document.getElementById('modalTags');
        modalTags.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });

        // Features
        const modalFeatures = document.getElementById('modalFeatures');
        modalFeatures.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        // ✅ Add View Project button
        const modalLink = document.getElementById('modalLink');
        if (modalLink) {
            modalLink.href = project.link;
            modalLink.target = "_blank";
            modalLink.style.display = "inline-block";
        }

        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Image fade-in
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Section fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(section);
    });
    if (sections[0]) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }

    // Touch support
    let touchStartY = 0;
    let touchEndY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) console.log('Swipe up detected');
            else console.log('Swipe down detected');
        }
    }

    // Throttle scroll
    let ticking = false;
    function updateOnScroll() { ticking = false; }
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    console.log('%c👋 Welcome to Diya\'s Portfolio!', 'color: #38a169; font-size: 20px; font-weight: bold;');
    console.log('%cFeel free to explore the code and get in touch!', 'color: #4a5568; font-size: 14px;');
});
