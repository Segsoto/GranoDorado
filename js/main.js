// ===== MAIN JAVASCRIPT FILE =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoadingScreen();
});

// ===== VIDEO LOADING SCREEN =====
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const video = document.getElementById('loadingVideo');
    const progressBar = document.getElementById('progressBar');
    
    // Check if this is the first visit
    const hasSeenLoading = localStorage.getItem('granoDorado_hasSeenLoading');
    
    if (!loadingScreen || hasSeenLoading === 'true') {
        // Hide loading screen immediately if not first visit
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        initializeApp();
        return;
    }
    
    // Mark that user has seen the loading screen
    localStorage.setItem('granoDorado_hasSeenLoading', 'true');
    
    document.body.style.overflow = 'hidden';
    let loadingComplete = false;
    let videoDuration = 4; // Default 4 seconds
    
    // Start progress bar animation immediately
    animateProgressBar(progressBar, videoDuration);
    
    if (video) {
        // When video metadata is loaded, get real duration
        video.addEventListener('loadedmetadata', function() {
            videoDuration = Math.max(video.duration, 3); // Minimum 3 seconds
            console.log('Video loaded, duration:', videoDuration + 's');
        });
        
        // Try to play the video
        video.addEventListener('canplaythrough', function() {
            video.play().catch(function(error) {
                console.log('Video autoplay failed, but continuing with timer');
            });
        });
        
        // When video ends naturally (if not looping)
        video.addEventListener('ended', function() {
            completeLoading();
        });
    }
    
    // Always complete loading after the duration time
    setTimeout(function() {
        completeLoading();
    }, videoDuration * 1000);
    
    function completeLoading() {
        if (loadingComplete) return;
        loadingComplete = true;
        
        loadingScreen.classList.add('fade-out');
        document.body.style.overflow = '';
        
        setTimeout(function() {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 800);
        
        initializeApp();
    }
}

function animateProgressBar(progressBar, duration) {
    if (!progressBar) return;
    
    let progress = 0;
    const increment = 100 / (duration * 20); // Update 20 times per second
    
    const interval = setInterval(function() {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
    }, 50);
}

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeDarkMode();
    initializeProductFilters();
    initializeContactForm();
    initializeAnimations();
    initializeParallax();
    initializeMicroInteractions();
    initializeCoffeeBeans(); // Add coffee beans animation
    createScrollTrailEffect(); // Add scroll trail effect
    
    // Add event listeners
    addGlobalEventListeners();
    
    console.log('Grano Dorado website initialized successfully! ☕');
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navigation on scroll
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Handle navigation links (both internal scrolling and page navigation)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal anchor link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (pages), let the default behavior happen
            // No preventDefault() needed for page navigation
        });
    });
    
    // Highlight active navigation link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Only set up scroll-based active link updating if there are sections on this page
    if (sections.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.scrollY + 100; // Offset for better UX
            
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
    } else {
        // For pages without sections, set active based on current page
        setActiveNavLinkByPage();
    }
}

function setActiveNavLinkByPage() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        // Set active if it matches current page or if it's index and we're on root
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll indicator in hero
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('quienes-somos');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ===== DARK MODE =====
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Add ripple effect
        addRippleEffect(this);
    });
    
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// ===== PRODUCT FILTERS =====
function initializeProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter products with animation
            productCards.forEach((card, index) => {
                const categories = card.getAttribute('data-category') || '';
                
                // Add delay for stagger effect
                setTimeout(() => {
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.classList.add('reveal');
                        
                        // Trigger reveal animation
                        setTimeout(() => {
                            card.classList.add('revealed');
                        }, 100);
                    } else {
                        card.classList.remove('revealed');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, index * 100);
            });
            
            // Add button press effect
            addButtonPressEffect(this);
        });
    });
    
    // Product card interactions
    productCards.forEach(card => {
        const addCartBtn = card.querySelector('.btn-add-cart');
        const viewMoreBtn = card.querySelector('.btn-view-more');
        
        if (addCartBtn) {
            addCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleAddToCart(card);
            });
        }
        
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleViewMore(card);
            });
        }
    });
}

function handleAddToCart(productCard) {
    const productName = productCard.querySelector('h4').textContent;
    
    // Show success message
    showNotification(`${productName} agregado al carrito`, 'success');
    
    // Add cart animation
    const btn = productCard.querySelector('.btn-add-cart');
    btn.innerHTML = '<i class="fas fa-check"></i> Agregado';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.innerHTML = 'Agregar al carrito';
        btn.style.background = '';
    }, 2000);
}

function handleViewMore(productCard) {
    const productName = productCard.querySelector('h4').textContent;
    showNotification(`Mostrando detalles de ${productName}`, 'info');
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const formData = new FormData(this);
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                
                // Add success animation
                addSuccessAnimation(submitBtn);
            }, 2000);
        });
        
        // Form field animations
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    
    // Remove existing validation classes
    field.classList.remove('valid', 'invalid');
    
    // Validation logic
    switch (fieldType) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            break;
        case 'tel':
            const phoneRegex = /^\+?[\d\s\-\(\)]{8,}$/;
            isValid = value === '' || phoneRegex.test(value); // Optional field
            break;
        default:
            isValid = value.length >= 2;
    }
    
    // Apply validation classes
    if (value !== '') {
        field.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    return isValid;
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('value-card')) {
                    animateValueCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // Counter animations for statistics (if any)
    initializeCounters();
}

function animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    if (content) {
        content.style.transform = 'scale(0.8)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            content.style.transform = 'scale(1)';
            content.style.opacity = '1';
        }, 200);
    }
}

function animateValueCard(card) {
    const icon = card.querySelector('.value-icon');
    if (icon) {
        icon.style.transform = 'rotateY(180deg)';
        
        setTimeout(() => {
            icon.style.transition = 'transform 0.6s ease';
            icon.style.transform = 'rotateY(0deg)';
        }, 300);
    }
}

function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled <= window.innerHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Parallax for other sections
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * (element.dataset.parallax || -0.5);
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ===== MICRO INTERACTIONS =====
function initializeMicroInteractions() {
    // Hover effects for buttons
    const buttons = document.querySelectorAll('button, .cta-button, .btn-add-cart, .btn-view-more');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.product-card, .blog-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Image lazy loading
    initializeLazyLoading();
    
    // Tooltip initialization
    initializeTooltips();
}

function initializeLazyLoading() {
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

function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.dataset.tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addButtonPressEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function addSuccessAnimation(element) {
    element.style.background = '#10b981';
    element.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
    
    setTimeout(() => {
        element.style.background = '';
        element.innerHTML = '<span class="btn-text">Enviar mensaje</span><span class="btn-loading"><i class="fas fa-spinner fa-spin"></i></span>';
    }, 3000);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = text;
    
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    
    // Fade in
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 100);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }
}

// ===== GLOBAL EVENT LISTENERS =====
function addGlobalEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
        
        // Quick navigation with number keys
        if (e.ctrlKey || e.metaKey) {
            const keyMap = {
                '1': '#inicio',
                '2': '#quienes-somos',
                '3': '#historia',
                '4': '#carta',
                '5': '#blog',
                '6': '#contacto'
            };
            
            if (keyMap[e.key]) {
                e.preventDefault();
                const section = document.querySelector(keyMap[e.key]);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
    
    // Coffee beans effect on WhatsApp button click
    const whatsappButton = document.getElementById('whatsappButton');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            // Trigger golden coffee beans effect
            triggerCoffeeBeansEffect();
            
            // Add a small delay to let the effect start before navigation
            setTimeout(() => {
                // The default link behavior will execute
            }, 100);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (window.innerWidth > 768) {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Handle visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // Restart animations when tab becomes visible
            const revealElements = document.querySelectorAll('.reveal.revealed');
            revealElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = null;
            });
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send error reports to a logging service here
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Handle promise rejections
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Skip to content functionality
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && !document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#inicio';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.style.cssText = `
            position: fixed;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1002;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
});

// Announce page changes for screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== COFFEE BEANS FALLING ANIMATION =====
function initializeCoffeeBeans() {
    const coffeeBeansContainer = document.getElementById('coffeeBeans');
    if (!coffeeBeansContainer) return;

    // Only add subtle floating beans after loading screen
    const hasVisited = localStorage.getItem('granoDoradoVisited');
    if (hasVisited) {
        // Add very subtle floating animation for return visitors
        addSubtleFloatingBeans();
        return;
    }

    // For first-time visitors after loading screen, add gentle falling animation
    setTimeout(() => {
        addGentleFallingAnimation();
    }, 2000);
}

function addSubtleFloatingBeans() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Add floating beans container to hero
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-beans-container';
    floatingContainer.innerHTML = `
        <div class="floating-bean"></div>
        <div class="floating-bean"></div>
        <div class="floating-bean"></div>
    `;
    hero.appendChild(floatingContainer);
}

function addGentleFallingAnimation() {
    const coffeeBeansContainer = document.getElementById('coffeeBeans');
    if (!coffeeBeansContainer) return;

    function createGentleBean() {
        const bean = document.createElement('div');
        bean.className = 'coffee-bean small';
        bean.style.left = Math.random() * 100 + '%';
        bean.style.animationDuration = '6s';
        bean.style.opacity = '0.3';
        
        coffeeBeansContainer.appendChild(bean);
        
        setTimeout(() => {
            if (bean.parentNode) {
                bean.parentNode.removeChild(bean);
            }
        }, 7000);
    }

    // Very gentle and sparse falling animation
    setInterval(() => {
        if (Math.random() < 0.2) { // Only 20% chance
            createGentleBean();
        }
    }, 3000);
}

// Function to trigger beans on special events
function triggerCoffeeBeansEffect() {
    const coffeeBeansContainer = document.getElementById('coffeeBeans');
    if (!coffeeBeansContainer) return;
    
    // Create a burst of golden beans
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const bean = document.createElement('div');
            bean.className = 'coffee-bean golden';
            bean.style.left = (30 + Math.random() * 40) + '%';
            bean.style.animationDelay = (Math.random() * 0.3) + 's';
            
            coffeeBeansContainer.appendChild(bean);
            
            setTimeout(() => {
                if (bean.parentNode) {
                    bean.parentNode.removeChild(bean);
                }
            }, 5000);
        }, i * 150);
    }
}

// ===== SERVICE WORKER REGISTRATION (PWA READY) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showNotification,
        validateField,
        throttle,
        debounce
    };
}