// ===== VIDEO LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingVideo = document.getElementById('loadingVideo');
    const progressBar = document.getElementById('progressBar');
    
    if (!loadingScreen || !loadingVideo || !progressBar) {
        console.warn('Loading screen elements not found');
        return;
    }

    let progress = 0;
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;

    // Simulate loading progress
    const progressInterval = setInterval(() => {
        progress += increment;
        progressBar.style.width = Math.min(progress, 100) + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Hide loading screen with fade effect
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.remove('loading');
                }, 500);
            }, 500);
        }
    }, interval);

    // Handle video load error
    loadingVideo.addEventListener('error', function() {
        console.warn('Video failed to load, skipping loading screen');
        loadingScreen.style.display = 'none';
        document.body.classList.remove('loading');
    });

    // Ensure video plays
    loadingVideo.addEventListener('canplay', function() {
        loadingVideo.play().catch(function(error) {
            console.warn('Video autoplay failed:', error);
        });
    });

    // Add loading class to body
    document.body.classList.add('loading');
});