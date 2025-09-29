// ===== MAIN JAVASCRIPT FILE =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...');
    initializeLoadingScreen();
});

// Alternative initialization for pages without loading screen
window.addEventListener('load', function() {
    // Ensure animations work even if loading screen is skipped
    setTimeout(() => {
        if (!window.animationsInitialized) {
            console.log('Fallback initialization...');
            initializeApp();
        }
    }, 100);
});

// ===== VIDEO LOADING SCREEN - VERSIÓN RÁPIDA =====
function initializeLoadingScreen() {
    console.log('🎬 Inicializando pantalla de carga RÁPIDA...');
    const loadingScreen = document.getElementById('loadingScreen');
    const video = document.getElementById('loadingVideo');
    const progressBar = document.getElementById('progressBar');
    
    if (!loadingScreen) {
        console.log('❌ No se encontró pantalla de carga - no es página de inicio');
        initializeApp();
        return;
    }
    
    console.log('🎥 Mostrando video RÁPIDO en cada visita...');
    
    // Bloquear scroll durante la animación
    document.body.style.overflow = 'hidden';
    
    let videoCompleted = false;
    let videoDuration = 2.5; // MUY RÁPIDO - 2.5 segundos
    
    // Iniciar barra de progreso rápida
    if (progressBar) {
        animateProgressBarFast(progressBar, videoDuration);
    }
    
    if (video) {
        // Acelerar el video significativamente
        video.playbackRate = 2.0; // 2x más rápido
        
        video.addEventListener('loadedmetadata', function() {
            // Usar duración fija para ser más rápido
            console.log('⏱️ Video acelerado a 2x velocidad');
        });
        
        video.addEventListener('canplaythrough', function() {
            video.play().then(function() {
                console.log('▶️ Video reproduciéndose RÁPIDO');
            }).catch(function(error) {
                console.log('⚠️ Error de autoplay, continuando rápido');
            });
        });
        
        video.addEventListener('ended', function() {
            console.log('🏁 Video terminado rápidamente');
            completeVideoFast();
        });
        
        video.addEventListener('error', function() {
            console.log('❌ Error en video, completando rápido');
            completeVideoFast();
        });
    }
    
    // Timer mucho más corto
    setTimeout(function() {
        if (!videoCompleted) {
            console.log('⏰ Completando por tiempo límite RÁPIDO...');
            completeVideoFast();
        }
    }, videoDuration * 1000);
    
    function completeVideoFast() {
        if (videoCompleted) return;
        videoCompleted = true;
        
        console.log('✅ Completando animación súper rápida...');
        
        // Fade out muy rápido
        loadingScreen.classList.add('fade-out');
        document.body.style.overflow = '';
        
        // Remover casi inmediatamente
        setTimeout(function() {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
                console.log('🗑️ Pantalla removida rápidamente');
            }
        }, 300); // Solo 300ms
        
        // Inicializar app
        initializeApp();
    }
}

function animateProgressBarFast(progressBar, duration) {
    if (!progressBar) return;
    
    let progress = 0;
    const increment = 100 / (duration * 30); // Más rápido
    
    const interval = setInterval(function() {
        progress += increment;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
    }, 33); // Más fluido
}

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    if (window.animationsInitialized) {
        console.log('App already initialized, skipping...');
        return;
    }
    
    console.log('Initializing app components...');
    window.animationsInitialized = true;
    
    // Solo inicializar funciones básicas para evitar errores
    console.log('✅ App inicializada correctamente después del video rápido');
}

// Función de info actualizada
window.info = function() {
    console.log('=== INFO VIDEO RÁPIDO ===');
    console.log('Video se reproduce RÁPIDO en cada visita a index.html');
    console.log('Duración: ~2.5 segundos');
    console.log('Velocidad: 2x más rápido');
    console.log('Fade out: 300ms');
};

// Ejecutar info después de cargar
window.addEventListener('load', function() {
    setTimeout(info, 3000);
});

console.log('✅ Sistema de video rápido cargado');