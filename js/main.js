// ===== MAIN APPLICATION SCRIPT =====
console.log('🚀 Inicializando Grano Dorado...');

// Verificar video loading una sola vez
function initializeVideoLoading() {
    const hasSeenVideo = localStorage.getItem('granoDorado_hasSeenVideo');
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) {
        console.log('📍 No hay pantalla de carga en esta página');
        return;
    }
    
    if (hasSeenVideo === 'true') {
        console.log('🎬 Usuario ya vio el video, ocultando pantalla de carga...');
        hideLoadingScreen();
        return;
    }
    
    console.log('🎬 Primera visita, mostrando video de carga...');
    
    // Marcar como visto inmediatamente
    localStorage.setItem('granoDorado_hasSeenVideo', 'true');
    
    const video = document.getElementById('loadingVideo');
    const progressBar = document.getElementById('progressBar');
    
    if (video && progressBar) {
        // Animar barra de progreso
        animateProgressBar(progressBar, 2.5);
        
        // Ocultar después de la duración del video
        setTimeout(hideLoadingScreen, 2500);
    } else {
        // Si no hay video, ocultar inmediatamente
        hideLoadingScreen();
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    console.log('🎭 Ocultando pantalla de carga...');
    
    // Fade out suave
    loadingScreen.classList.add('fade-out');
    document.body.style.overflow = '';
    
    // Remover elemento después del fade
    setTimeout(function() {
        if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
            console.log('🗑️ Pantalla de carga removida');
        }
    }, 300);
    
    // Inicializar la aplicación principal
    initializeApp();
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

// Funciones de depuración
window.verVideoNuevamente = function() {
    localStorage.removeItem('granoDorado_hasSeenVideo');
    location.reload();
};

window.info = function() {
    console.log('ℹ️ === INFORMACIÓN DEL VIDEO ===');
    const hasSeenVideo = localStorage.getItem('granoDorado_hasSeenVideo');
    console.log('🎬 El video se reproduce SOLO la primera vez');
    console.log('📍 Solo aparece en la página de inicio');
    console.log('🔍 Estado actual:', hasSeenVideo ? 'Ya visto' : 'No visto');
    console.log('🔄 Para ver nuevamente: verVideoNuevamente()');
};

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    if (window.animationsInitialized) {
        console.log('App already initialized, skipping...');
        return;
    }
    
    console.log('🔧 Inicializando componentes principales...');
    
    // Marcar como inicializado
    window.animationsInitialized = true;
    
    // Initialize all components (navigation already initialized in DOMContentLoaded)
    initializeScrollEffects();
    initializeProductFilters();
    initializeContactForm();
    initializeAnimations();
    initializeParallax();
    initializeMicroInteractions();
    initializeCoffeeBeans();
    initializeCoffeeRecommender();
    createScrollTrailEffect();
    
    // Add event listeners
    addGlobalEventListeners();
    
    console.log('✅ Aplicación inicializada correctamente');
}

// ===== DARK MODE =====
function initializeDarkMode() {
    console.log('🌙 Inicializando modo oscuro...');
    
    // Get all dark mode toggle buttons
    const darkModeToggles = document.querySelectorAll('.nav-dark-mode-toggle');
    
    // Check saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update button icons based on current theme
    updateDarkModeButtons(currentTheme);
    
    // Add event listeners to all toggle buttons
    darkModeToggles.forEach(button => {
        button.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Update button icons
            updateDarkModeButtons(newTheme);
            
            console.log(`🎨 Tema cambiado a: ${newTheme}`);
        });
    });
}

function updateDarkModeButtons(theme) {
    const darkModeToggles = document.querySelectorAll('.nav-dark-mode-toggle');
    const icon = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    const text = theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    
    darkModeToggles.forEach(button => {
        const iconElement = button.querySelector('i');
        const textElement = button.querySelector('span');
        
        if (iconElement) {
            iconElement.className = icon;
        }
        if (textElement) {
            textElement.textContent = text;
        }
    });
}

function testAnimations() {
    console.log('🧪 Testing animations...');
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 200);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    console.log('🧭 Inicializando navegación...');
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Navbar scroll effect
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Set active nav link
    updateActiveNavLink();
    setActiveNavLinkByPage();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
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

function setActiveNavLinkByPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    console.log('📜 Inicializando efectos de scroll...');
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
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
    
    // Scroll indicator
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

// ===== PRODUCT FILTERS =====
function initializeProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length === 0) return;
    
    console.log('🔍 Inicializando filtros de productos...');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            handleAddToCart(productCard);
        });
    });
    
    // View more functionality
    const viewMoreBtns = document.querySelectorAll('.view-more');
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            handleViewMore(productCard);
        });
    });
}

function handleAddToCart(productCard) {
    if (!productCard) return;
    
    const productName = productCard.querySelector('h3')?.textContent || 'Producto';
    const productPrice = productCard.querySelector('.price')?.textContent || '';
    
    // Add to cart animation
    const btn = productCard.querySelector('.add-to-cart');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
    
    showNotification(`${productName} agregado al carrito`, 'success');
}

function handleViewMore(productCard) {
    if (!productCard) return;
    
    const productName = productCard.querySelector('h3')?.textContent || 'Producto';
    showNotification(`Mostrando detalles de ${productName}`, 'info');
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    console.log('📧 Inicializando formulario de contacto...');
    
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    
    // Add real-time validation
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                addSuccessAnimation(submitBtn);
                showNotification('¡Mensaje enviado correctamente!', 'success');
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Remove previous error states
    field.classList.remove('error');
    
    let errorMessage = '';
    
    if (required && !value) {
        errorMessage = 'Este campo es obligatorio';
    } else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMessage = 'Ingresa un email válido';
    } else if (type === 'tel' && value && !/^\+?[\d\s\-\(\)]+$/.test(value)) {
        errorMessage = 'Ingresa un teléfono válido';
    } else if (field.name === 'name' && value && value.length < 2) {
        errorMessage = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (errorMessage) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
        return false;
    } else {
        hideFieldError(field);
        return true;
    }
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    console.log('✨ Inicializando animaciones...');
    initializeRevealAnimations();
    initializeCounters();
}

function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                } else if (entry.target.classList.contains('value-card')) {
                    animateValueCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

function animateTimelineItem(item) {
    const icon = item.querySelector('.timeline-icon');
    const content = item.querySelector('.timeline-content');
    
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 300);
        }, 200);
    }
}

function animateValueCard(card) {
    const icon = card.querySelector('.value-icon, .cert-icon');
    
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'rotateY(360deg)';
        }, 300);
    }
}

function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target, parseInt(entry.target.dataset.count));
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const suffix = element.dataset.suffix || '';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    console.log('🎭 Inicializando efectos parallax...');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16));
}

// ===== MICRO INTERACTIONS =====
function initializeMicroInteractions() {
    console.log('🎯 Inicializando micro-interacciones...');
    
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .btn, button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function() {
            addButtonPressEffect(this);
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.value-card, .service-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Initialize tooltips
    initializeTooltips();
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
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
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            showTooltip(this, this.dataset.tooltip);
        });
        
        trigger.addEventListener('mouseleave', hideTooltip);
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
    }, 3000);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => removeNotification(notification));
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
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
    hideTooltip(); // Remove existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        pointer-events: none;
        z-index: 1000;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2) + 'px';
    tooltip.style.top = (rect.top - tooltipRect.height - 8) + 'px';
    
    window.currentTooltip = tooltip;
}

function hideTooltip() {
    if (window.currentTooltip) {
        window.currentTooltip.remove();
        window.currentTooltip = null;
    }
}

// ===== EVENT LISTENERS =====
function addGlobalEventListeners() {
    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            console.log('👁️ Página visible nuevamente');
        }
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const activeMenu = document.querySelector('.nav-menu.active');
            const activeModal = document.querySelector('.modal.active');
            
            if (activeMenu) {
                const hamburger = document.getElementById('hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                    activeMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
            
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }
    });
    
    // Handle smooth scrolling for anchor links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
    
    // Handle external links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="http"]');
        if (link && !link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// ===== COFFEE BEANS ANIMATION =====
function initializeCoffeeBeans() {
    const container = document.getElementById('coffeeBeans');
    if (!container) return;
    
    console.log('☕ Inicializando animación de granos de café...');
    
    // Create floating coffee beans
    for (let i = 0; i < 15; i++) {
        createCoffeeBean(container);
    }
}

function createCoffeeBean(container) {
    const bean = document.createElement('div');
    bean.className = 'coffee-bean';
    bean.innerHTML = '☕';
    
    // Random positioning and animation
    const x = Math.random() * window.innerWidth;
    const animationDuration = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    bean.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: -50px;
        font-size: ${Math.random() * 20 + 10}px;
        opacity: ${Math.random() * 0.7 + 0.3};
        animation: fallDown ${animationDuration}s linear ${delay}s infinite;
        pointer-events: none;
        color: #8B4513;
    `;
    
    container.appendChild(bean);
    
    // Remove bean after animation
    setTimeout(() => {
        if (bean.parentNode) {
            bean.parentNode.removeChild(bean);
        }
    }, (animationDuration + delay) * 1000);
}

function createScrollTrailEffect() {
    let trail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        // Add current position to trail
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Remove old trail points
        trail = trail.filter(point => Date.now() - point.time < 1000);
        
        // Create trail particles
        if (trail.length > 5) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        animation: fadeOut 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 500);
}

// ===== HELPER FUNCTIONS =====
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
    };
}

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

// ===== COFFEE RECOMMENDER INITIALIZATION =====
function initializeCoffeeRecommender() {
    // Check if CoffeeRecommender class is available
    if (typeof CoffeeRecommender !== 'undefined') {
        // CoffeeRecommender will initialize itself when its script loads
        console.log('✅ Coffee Recommender available');
    } else {
        console.warn('⚠️ Coffee Recommender script not loaded');
    }
    
    // Also ensure the button works even if recommender isn't loaded
    const coffeeBtn = document.getElementById('coffeeRecommenderBtn');
    if (coffeeBtn && typeof CoffeeRecommender === 'undefined') {
        coffeeBtn.addEventListener('click', function() {
            alert('Sistema de recomendaciones en mantenimiento. ¡Contáctanos por WhatsApp para ayudarte a elegir tu café ideal!');
        });
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('⚠️ Error detectado:', e.error);
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM cargado, inicializando componentes...');
    
    // Always initialize navigation immediately
    initializeNavigation();
    initializeDarkMode();
    
    // Initialize video loading only on index page
    if (document.getElementById('loadingScreen')) {
        initializeVideoLoading();
    } else {
        // For other pages, initialize all components immediately
        setTimeout(() => {
            if (!window.animationsInitialized) {
                initializeApp();
            }
        }, 100);
    }
});

// Execute info function after load
window.addEventListener('load', function() {
    setTimeout(info, 2000);
});

console.log('✅ Script principal cargado correctamente');