// ===== SUPER SIMPLE ANIMATION SYSTEM =====
console.log('🎬 Loading animations.js...');

// Múltiples formas de inicialización
document.addEventListener('DOMContentLoaded', startAnimations);
window.addEventListener('load', startAnimations);

// Flag para evitar inicialización múltiple
let animationsStarted = false;

function startAnimations() {
    if (animationsStarted) return;
    animationsStarted = true;
    
    console.log('🚀 Starting animations...');
    
    setTimeout(() => {
        initRevealAnimations();
        initCounterAnimations();
    }, 100);
}

function initRevealAnimations() {
    console.log('👁️ Setting up reveal animations...');
    
    const reveals = document.querySelectorAll('.reveal');
    console.log(`Found ${reveals.length} reveal elements`);
    
    if (reveals.length === 0) return;
    
    // Observer simple
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('✨ Revealing:', entry.target.tagName);
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
}

function initCounterAnimations() {
    console.log('🔢 Setting up counters...');
    
    const counters = document.querySelectorAll('[data-count]');
    console.log(`Found ${counters.length} counters`);
    
    if (counters.length === 0) return;
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-count')) || 0;
        console.log(`Counter ${index + 1}: ${target}`);
        
        let hasRun = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasRun) {
                    hasRun = true;
                    console.log(`🎯 Starting counter: ${target}`);
                    runCounter(counter, target, index * 200);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(counter);
    });
}

function runCounter(element, target, delay = 0) {
    setTimeout(() => {
        console.log(`⏱️ Running counter to ${target}`);
        
        let current = 0;
        const steps = Math.max(target * 8, 40);
        const stepTime = 2000 / steps; // 2 segundos total
        
        const interval = setInterval(() => {
            current += target / steps;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(interval);
                console.log(`✅ Counter done: ${target}`);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
        
    }, delay);
}

// Funciones de test globales
window.testAnimations = function() {
    console.log('🧪 Testing all animations...');
    
    document.querySelectorAll('.reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 100);
    });
    
    document.querySelectorAll('[data-count]').forEach((counter, i) => {
        const target = parseInt(counter.getAttribute('data-count')) || 0;
        setTimeout(() => runCounter(counter, target), i * 300);
    });
};

window.resetAnimations = function() {
    console.log('🔄 Resetting animations...');
    
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('revealed');
    });
    
    document.querySelectorAll('[data-count]').forEach(counter => {
        counter.textContent = '0';
    });
};

console.log('✅ animations.js loaded!');