// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('p');
    const container = document.querySelector('.container');
    
    // Add interactive hover effects
    if (title) {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.textShadow = '0 0 20px rgba(74, 144, 226, 0.5)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Add click interaction to title
    if (title) {
        title.addEventListener('click', function() {
            // Create ripple effect
            createRipple(this, event);
            
            // Cycle through different greetings
            const greetings = [
                'Hello, World! 👋',
                'Bonjour, Monde! 🇫🇷',
                'Hola, Mundo! 🇪🇸',
                'Hallo, Welt! 🇩🇪',
                'こんにちは、世界！🇯🇵',
                'Привет, мир! 🇷🇺'
            ];
            
            const currentText = this.textContent;
            const currentIndex = greetings.findIndex(greeting => greeting === currentText);
            const nextIndex = (currentIndex + 1) % greetings.length;
            
            // Animate text change
            this.style.opacity = '0';
            setTimeout(() => {
                this.textContent = greetings[nextIndex];
                this.style.opacity = '1';
            }, 200);
        });
    }
    
    // Add floating animation to container
    if (container) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = container.style.transform || 'translateY(0px)';
            const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)px\)/) || [0, 0])[1];
            
            if (currentY >= 10) floatDirection = -1;
            if (currentY <= -10) floatDirection = 1;
            
            container.style.transform = `translateY(${currentY + (floatDirection * 0.5)}px)`;
        }, 50);
    }
    
    // Add particle effect on page load
    createParticles();
    
    // Add keyboard interaction
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            changeBackgroundGradient();
        }
    });
    
    // Add accessibility announcement
    announceToScreenReader('Hello World page loaded successfully');
});

// Create ripple effect function
function createRipple(element, event) {
    try {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    } catch (error) {
        console.warn('Ripple effect failed:', error);
    }
}

// Create floating particles
function createParticles() {
    try {
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(74, 144, 226, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                pointer-events: none;
                z-index: -1;
                animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 15000);
        }
    } catch (error) {
        console.warn('Particle creation failed:', error);
    }
}

// Change background gradient
function changeBackgroundGradient() {
    try {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        ];
        
        const currentGradient = document.body.style.background;
        let newGradient;
        
        do {
            newGradient = gradients[Math.floor(Math.random() * gradients.length)];
        } while (newGradient === currentGradient);
        
        document.body.style.background = newGradient;
        document.body.style.transition = 'background 1s ease';
    } catch (error) {
        console.warn('Background gradient change failed:', error);
    }
}

// Screen reader announcement
function announceToScreenReader(message) {
    try {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        
        document.body.appendChild(announcement);
        announcement.textContent = message;
        
        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.parentNode.removeChild(announcement);
            }
        }, 1000);
    } catch (error) {
        console.warn('Screen reader announcement failed:', error);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
        }
    }
    
    .particle {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(style);

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
        createParticles(); // Add fresh particles
    }
});

// Handle resize events
window.addEventListener('resize', debounce(function() {
    // Recreate particles for new screen size
    const existingParticles = document.querySelectorAll('.particle');
    existingParticles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
    createParticles();
}, 250));

// Debounce utility function
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

// Error handling for unhandled promises
window.addEventListener('unhandledrejection', function(event) {
    console.warn('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Service worker registration for offline capability (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Only register if service worker file exists
        fetch('/sw.js', { method: 'HEAD' })
            .then(() => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            })
            .catch(() => {
                // Service worker file doesn't exist, skip registration
            });
    });
}