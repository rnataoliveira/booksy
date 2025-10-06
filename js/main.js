// ===== BOOKSY V2 - REDE SOCIAL LITERÁRIA =====

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const newsletterModal = document.getElementById('newsletter-modal');
const modalClose = document.getElementById('modal-close');
const newsletterForm = document.getElementById('newsletter-form');

// Navigation functionality
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLinks();
        this.setupScrollHeader();
    }

    setupMobileMenu() {
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close menu when clicking on links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });
        }
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = 70;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupScrollHeader() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Book Room Interactions
class BookRoomPreview {
    constructor() {
        this.init();
    }

    init() {
        this.setupRoomInteractions();
        this.setupRoomAnimations();
    }

    setupRoomInteractions() {
        const bookRooms = document.querySelectorAll('.book-room');
        
        bookRooms.forEach((room, index) => {
            room.addEventListener('click', () => {
                // Remove active class from all rooms
                bookRooms.forEach(r => r.classList.remove('active'));
                // Add active class to clicked room
                room.classList.add('active');
                
                // Animate room selection
                this.animateRoomSelection(room);
            });

            // Add hover effects
            room.addEventListener('mouseenter', () => {
                if (!room.classList.contains('active')) {
                    room.style.transform = 'translateY(-3px) scale(1.02)';
                }
            });

            room.addEventListener('mouseleave', () => {
                if (!room.classList.contains('active')) {
                    room.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }

    animateRoomSelection(selectedRoom) {
        // Add selection animation
        selectedRoom.style.transform = 'scale(1.05)';
        setTimeout(() => {
            selectedRoom.style.transform = 'scale(1)';
        }, 200);

        // Update room activity
        this.updateRoomActivity(selectedRoom);
    }

    updateRoomActivity(room) {
        const activityDot = room.querySelector('.activity-dot');
        if (activityDot) {
            activityDot.style.animation = 'none';
            setTimeout(() => {
                activityDot.style.animation = 'pulse 2s infinite';
            }, 100);
        }
    }

    setupRoomAnimations() {
        // Animate rooms on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, { threshold: 0.1 });

        const bookRooms = document.querySelectorAll('.book-room');
        bookRooms.forEach((room, index) => {
            room.style.opacity = '0';
            room.style.animationDelay = `${index * 0.1}s`;
            observer.observe(room);
        });
    }
}

// Interface Preview Interactions
class InterfacePreview {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabSwitching();
        this.setupDiscussionInteractions();
        this.setupEventInteractions();
    }

    setupTabSwitching() {
        const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.interface-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                // Animate tab switch
                this.animateTabSwitch(tab);
            });
        });
    }

    animateTabSwitch(activeTab) {
        const content = document.querySelector('.interface-content');
        if (content) {
            content.style.opacity = '0.5';
            content.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 150);
        }
    }

    setupDiscussionInteractions() {
        const discussionThread = document.querySelector('.discussion-thread');
        if (discussionThread) {
            discussionThread.addEventListener('click', () => {
                this.animateDiscussionClick(discussionThread);
            });
        }
    }

    animateDiscussionClick(thread) {
        thread.style.transform = 'scale(1.02)';
        thread.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
        
        setTimeout(() => {
            thread.style.transform = 'scale(1)';
            thread.style.boxShadow = '';
        }, 200);
    }

    setupEventInteractions() {
        const eventButton = document.querySelector('.upcoming-event .btn');
        if (eventButton) {
            eventButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.animateEventJoin(eventButton);
            });
        }
    }

    animateEventJoin(button) {
        const originalText = button.textContent;
        button.textContent = 'Participando...';
        button.style.background = 'var(--secondary-color)';
        
        setTimeout(() => {
            button.textContent = '✓ Confirmado';
            button.style.background = 'var(--secondary-color)';
        }, 1000);

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    }
}

// Statistics Counter Animation
class StatsCounter {
    constructor() {
        this.init();
    }

    init() {
        this.setupCounterAnimation();
    }

    setupCounterAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^\d]/g, ''));
        
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                displayValue += '%';
            } else if (isPlus) {
                if (numericValue >= 1000) {
                    displayValue = (displayValue / 1000).toFixed(1) + 'K+';
                } else {
                    displayValue += '+';
                }
            }
            
            element.textContent = displayValue;
        }, 20);
    }
}

// Newsletter Modal
class NewsletterModal {
    constructor() {
        this.init();
    }

    init() {
        this.setupModalTriggers();
        this.setupModalClose();
        this.setupFormSubmission();
        this.setupAutoShow();
    }

    setupModalTriggers() {
        // Show modal when clicking newsletter links
        const newsletterTriggers = document.querySelectorAll('[data-newsletter]');
        newsletterTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal();
            });
        });
    }

    setupModalClose() {
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideModal();
            });
        }

        if (newsletterModal) {
            newsletterModal.addEventListener('click', (e) => {
                if (e.target === newsletterModal) {
                    this.hideModal();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && newsletterModal.classList.contains('active')) {
                this.hideModal();
            }
        });
    }

    setupFormSubmission() {
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }
    }

    setupAutoShow() {
        // Show modal after 30 seconds if not shown before
        setTimeout(() => {
            if (!localStorage.getItem('newsletter-shown')) {
                this.showModal();
                localStorage.setItem('newsletter-shown', 'true');
            }
        }, 30000);
    }

    showModal() {
        if (newsletterModal) {
            newsletterModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal() {
        if (newsletterModal) {
            newsletterModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleFormSubmission() {
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;

        // Simulate form submission
        button.textContent = 'Inscrevendo...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = '✓ Inscrito!';
            button.style.background = 'var(--secondary-color)';
            
            setTimeout(() => {
                this.hideModal();
                this.showSuccessNotification();
            }, 1500);
        }, 2000);
    }

    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✅</span>
                <span>Obrigado! Você receberá nossas novidades em breve.</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
    }

    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.problem-card, .testimonial-card, .stat-card, .step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-visual, .solution-visual');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Reading Progress Indicator
class ReadingProgress {
    constructor() {
        this.init();
    }

    init() {
        this.createProgressBar();
        this.updateProgress();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
        document.body.appendChild(progressBar);
    }

    updateProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            const progressFill = document.querySelector('.reading-progress-fill');
            if (progressFill) {
                progressFill.style.width = `${scrollPercent}%`;
            }
        });
    }
}

// Literary Theme Enhancements
class LiteraryTheme {
    constructor() {
        this.init();
    }

    init() {
        this.addBookQuotes();
        this.setupThemeToggle();
        this.addReadingModeEffects();
    }

    addBookQuotes() {
        const quotes = [
            "\"Um leitor vive mil vidas antes de morrer. O homem que nunca lê vive apenas uma.\" - George R.R. Martin",
            "\"A leitura é uma conversa com os homens mais ilustres dos séculos passados.\" - René Descartes",
            "\"Livros são os amigos mais silenciosos e constantes.\" - Charles W. Eliot",
            "\"A leitura engrandece a alma.\" - Voltaire"
        ];

        // Add random quote to footer
        const footer = document.querySelector('.footer-description');
        if (footer && Math.random() > 0.5) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            footer.innerHTML += `<br><br><em style="opacity: 0.8; font-size: 0.9em;">${randomQuote}</em>`;
        }
    }

    setupThemeToggle() {
        // Add theme toggle button (for future dark mode)
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.title = 'Alternar tema';
        
        // Add to navigation
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.appendChild(themeToggle);
        }
    }

    addReadingModeEffects() {
        // Add subtle reading-focused animations
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4');
        
        textElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease';
                element.style.letterSpacing = '0.5px';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.letterSpacing = '';
            });
        });
    }
}

// Performance Optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
        this.optimizeScrollEvents();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload critical fonts and assets
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const optimizedScroll = () => {
            // Batch scroll-related updates
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll updates here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', optimizedScroll, { passive: true });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new Navigation();
    new BookRoomPreview();
    new InterfacePreview();
    new StatsCounter();
    new NewsletterModal();
    new ScrollAnimations();
    new ReadingProgress();
    
    // Theme enhancements
    new LiteraryTheme();
    
    // Performance optimizations
    new PerformanceOptimizer();
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    console.log('📚 Booksy V2 - Rede Social Literária carregada com sucesso!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        BookRoomPreview,
        InterfacePreview,
        StatsCounter,
        NewsletterModal,
        ScrollAnimations,
        ReadingProgress,
        LiteraryTheme,
        PerformanceOptimizer
    };
}
