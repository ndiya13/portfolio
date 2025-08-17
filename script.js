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
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Project discussion"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
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
            // Create download link for the resume PDF
            const link = document.createElement('a');
            link.href = 'Diya N resume.pdf';
            link.download = 'Diya_N_Resume.pdf';
            link.textContent = 'Download Resume';
            
            // Handle download with error handling for deployment
            try {
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                // Fallback: open in new tab if download fails
                window.open('Diya N resume.pdf', '_blank');
            }
        });
    }



    // Add scroll indicator functionality
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

    // Project data
    const projectData = {
        eventloop: {
            title: "EventLoop Platform",
            type: "Web Application",
            year: "2024",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description: "A comprehensive event management platform designed for seamless event discovery, registration, and management. The platform features an intuitive user interface that simplifies the entire event lifecycle from creation to execution.",
            tags: ["UI Design", "UX Research", "Prototyping", "Figma", "User Testing"],
            features: [
                "Event creation and management dashboard",
                "User registration and authentication system",
                "Real-time event discovery and search",
                "Interactive calendar and scheduling",
                "Payment integration for ticket sales",
                "Analytics and reporting tools"
            ],
            process: "The design process began with extensive user research to understand the pain points of event organizers and attendees. I created wireframes and prototypes using Figma, conducted user testing sessions, and iterated based on feedback to create a seamless user experience."
        },
        restaurant: {
            title: "Restaurant App Interface",
            type: "Mobile App",
            year: "2024",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description: "Modern restaurant application focusing on seamless food ordering experience with emphasis on visual appeal and user-friendly navigation. The app streamlines the ordering process while maintaining the aesthetic appeal of fine dining.",
            tags: ["Mobile Design", "UI/UX", "Food & Beverage", "iOS Design", "Android Design"],
            features: [
                "Intuitive menu browsing with high-quality images",
                "Customizable order options and preferences",
                "Real-time order tracking and notifications",
                "Secure payment processing",
                "Loyalty program integration",
                "Table reservation system"
            ],
            process: "I focused on creating a mobile-first design that prioritizes ease of use and visual appeal. The design process included competitor analysis, user journey mapping, and iterative prototyping to ensure the app meets both business and user needs."
        },
        "college-events": {
            title: "College Events Management",
            type: "Educational Platform",
            year: "2024",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            description: "Complete college event management system with admin dashboard, user registration, and event categorization features for seamless event coordination. The platform serves both students and administrators with different access levels and functionalities.",
            tags: ["Web Design", "Dashboard", "Event Management", "Admin Panel", "Responsive Design"],
            features: [
                "Comprehensive admin dashboard with analytics",
                "Student registration and profile management",
                "Event categorization and filtering system",
                "Automated notification system",
                "Attendance tracking and reporting",
                "Resource allocation and management"
            ],
            process: "The project involved designing for multiple user personas - administrators, faculty, and students. I created wireframes for different user flows, designed a scalable dashboard interface, and ensured the platform is accessible across all devices."
        }
    };

    // Add click event listeners to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Add click event listeners to view project buttons
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            const projectCard = this.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking the footer close button
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking outside
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal && projectModal.style.display === 'block') {
            closeProjectModal();
        }
    });

    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Populate modal content
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalType').textContent = project.type;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalProcess').textContent = project.process;

        // Populate tags
        const modalTags = document.getElementById('modalTags');
        modalTags.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });

        // Populate features
        const modalFeatures = document.getElementById('modalFeatures');
        modalFeatures.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });



        // Show modal
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeProjectModal() {
        if (projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }



    // Add loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add intersection observer for fade-in animations
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
    
    // Observe sections for fade-in effect
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(section);
    });

    // Initialize first section as visible
    if (sections[0]) {
        sections[0].style.opacity = '1';
        sections[0].style.transform = 'translateY(0)';
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            console.log('Escape key pressed');
        }
    });

    // Add touch support for mobile devices
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
            if (diff > 0) {
                // Swipe up - could trigger next section
                console.log('Swipe up detected');
            } else {
                // Swipe down - could trigger previous section
                console.log('Swipe down detected');
            }
        }
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Add console welcome message
    console.log('%c👋 Welcome to Diya\'s Portfolio!', 'color: #38a169; font-size: 20px; font-weight: bold;');
    console.log('%cFeel free to explore the code and get in touch!', 'color: #4a5568; font-size: 14px;');
});
