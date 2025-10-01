// ===== ANIMACIONES SIMPLES =====
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos con clase 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Observar elementos con clase 'reveal'
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Animación de typing para títulos
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efecto typing a elementos con clase 'typing'
    const typingElements = document.querySelectorAll('.typing');
    typingElements.forEach(element => {
        const text = element.textContent;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(element, text, 100);
                    observer.unobserve(element);
                }
            });
        });
        observer.observe(element);
    });

    // Efecto de contador animado
    function animateCounter(element, target, duration = 2000) {
        if (!element) return;
        
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Aplicar contador a elementos con clase 'counter'
    const counterElements = document.querySelectorAll('.counter');
    counterElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target') || element.textContent);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(element, target);
                    observer.unobserve(element);
                }
            });
        });
        observer.observe(element);
    });

    // Animación de progreso para barras
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = bar.getAttribute('data-width') || '100%';
                    bar.style.width = width;
                    observer.unobserve(bar);
                }
            });
        });
        observer.observe(bar);
    });
});