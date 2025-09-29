// ===== SISTEMA DE ANIMACIONES ULTRA SIMPLE =====
console.log('🎬 Iniciando sistema de animaciones...');

// Esperar a que TODO esté listo
window.addEventListener('load', function() {
    console.log('🌟 Página completamente cargada, iniciando animaciones...');
    
    // Delay adicional para asegurar que todo esté listo
    setTimeout(function() {
        iniciarAnimaciones();
    }, 1000);
});

function iniciarAnimaciones() {
    console.log('🚀 === INICIANDO ANIMACIONES ===');
    
    // 1. Configurar animaciones reveal
    configurarReveals();
    
    // 2. Configurar contadores
    configurarContadores();
    
    console.log('✅ Animaciones configuradas');
}

function configurarReveals() {
    console.log('👁️ Configurando animaciones reveal...');
    
    const elementos = document.querySelectorAll('.reveal');
    console.log('📋 Elementos encontrados:', elementos.length);
    
    if (elementos.length === 0) {
        console.log('❌ No se encontraron elementos .reveal');
        return;
    }
    
    // Observer muy simple
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                console.log('✨ Revelando elemento');
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Aplicar a todos los elementos
    elementos.forEach(function(elemento) {
        // Asegurar estado inicial
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'all 1s ease';
        
        observer.observe(elemento);
    });
    
    console.log('✅ Reveals configurados');
}

function configurarContadores() {
    console.log('🔢 Configurando contadores...');
    
    const contadores = document.querySelectorAll('[data-count]');
    console.log('📊 Contadores encontrados:', contadores.length);
    
    if (contadores.length === 0) {
        console.log('❌ No se encontraron contadores');
        return;
    }
    
    contadores.forEach(function(contador, indice) {
        const valorFinal = parseInt(contador.getAttribute('data-count')) || 0;
        console.log('🎯 Contador ' + (indice + 1) + ': ' + valorFinal);
        
        // Asegurar que empiece en 0
        contador.textContent = '0';
        
        let yaAnimado = false;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !yaAnimado) {
                    yaAnimado = true;
                    console.log('🚀 Iniciando contador: ' + valorFinal);
                    
                    // Delay escalonado
                    setTimeout(function() {
                        animarContador(contador, valorFinal);
                    }, indice * 300);
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(contador);
    });
    
    console.log('✅ Contadores configurados');
}

function animarContador(elemento, valorFinal) {
    console.log('⏰ Animando contador hasta: ' + valorFinal);
    
    let valorActual = 0;
    const duracion = 2500; // 2.5 segundos
    const pasos = 50;
    const incremento = valorFinal / pasos;
    const tiempoPorPaso = duracion / pasos;
    
    const intervalo = setInterval(function() {
        valorActual += incremento;
        
        if (valorActual >= valorFinal) {
            elemento.textContent = valorFinal;
            clearInterval(intervalo);
            console.log('✅ Contador completado: ' + valorFinal);
        } else {
            elemento.textContent = Math.floor(valorActual);
        }
    }, tiempoPorPaso);
}

// Funciones de prueba globales
window.probarAnimaciones = function() {
    console.log('🧪 === PROBANDO TODAS LAS ANIMACIONES ===');
    
    // Revelar todos los elementos
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(function(elemento, indice) {
        setTimeout(function() {
            elemento.classList.add('revealed');
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
            console.log('✨ Revelado elemento ' + (indice + 1));
        }, indice * 200);
    });
    
    // Animar todos los contadores
    const contadores = document.querySelectorAll('[data-count]');
    contadores.forEach(function(contador, indice) {
        const valor = parseInt(contador.getAttribute('data-count')) || 0;
        setTimeout(function() {
            animarContador(contador, valor);
        }, indice * 400);
    });
};

window.reiniciarAnimaciones = function() {
    console.log('🔄 === REINICIANDO ANIMACIONES ===');
    
    // Reiniciar reveals
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(function(elemento) {
        elemento.classList.remove('revealed');
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
    });
    
    // Reiniciar contadores
    const contadores = document.querySelectorAll('[data-count]');
    contadores.forEach(function(contador) {
        contador.textContent = '0';
    });
    
    console.log('✅ Animaciones reiniciadas');
};

console.log('✅ Script de animaciones cargado correctamente');