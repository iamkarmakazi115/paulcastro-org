// Home page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializeAnimations();
    initializeQuoteMovement();
    initializeParticles();
    initializeVideoFallback();
});

// Initialize main animations
function initializeAnimations() {
    // Add entrance animations to elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Staggered animation for floating runes
    const runes = document.querySelectorAll('.floating-rune');
    runes.forEach((rune, index) => {
        rune.style.opacity = '0';
        setTimeout(() => {
            rune.style.transition = 'opacity 1s ease-in-out';
            rune.style.opacity = '0.3';
        }, 1000 + (index * 200));
    });
}

// Enhanced quote movement
function initializeQuoteMovement() {
    const quote = document.getElementById('bouncingQuote');
    if (!quote) return;
    
    let position = { x: 0, y: 0 };
    let velocity = { x: 2, y: 1.5 };
    const container = quote.parentElement;
    
    function moveQuote() {
        const containerRect = container.getBoundingClientRect();
        const quoteRect = quote.getBoundingClientRect();
        
        // Update position
        position.x += velocity.x;
        position.y += velocity.y;
        
        // Bounce off edges
        if (position.x <= 0 || position.x >= containerRect.width - quoteRect.width) {
            velocity.x *= -1;
            // Add some randomness to prevent predictable patterns
            velocity.x += (Math.random() - 0.5) * 0.5;
        }
        
        if (position.y <= 0 || position.y >= containerRect.height - quoteRect.height) {
            velocity.y *= -1;
            velocity.y += (Math.random() - 0.5) * 0.5;
        }
        
        // Constrain position within bounds
        position.x = Math.max(0, Math.min(position.x, containerRect.width - quoteRect.width));
        position.y = Math.max(0, Math.min(position.y, containerRect.height - quoteRect.height));
        
        // Apply position
        quote.style.transform = `translate(${position.x}px, ${position.y}px)`;
        
        requestAnimationFrame(moveQuote);
    }
    
    // Start the movement after a delay
    setTimeout(moveQuote, 2000);
}

// Create magical particle effects
function initializeParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        const symbols = ['✦', '✧', '★', '✯', '✰', '⚡', '🌟'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.textContent = symbol;
        particle.style.cssText = `
            position: absolute;
            color: #FCBA04;
            font-size: ${Math.random() * 10 + 10}px;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}vw;
            top: 100vh;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 10 + 15}s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
    
    // Add CSS for particle animation
    if (!document.querySelector('#particleStyles')) {
        const style = document.createElement('style');
        style.id = 'particleStyles';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create particles periodically
    setInterval(createParticle, 3000);
    
    // Create initial burst
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 500);
    }
}

// Video fallback and optimization
function initializeVideoFallback() {
    const video = document.getElementById('backgroundVideo');
    if (!video) return;
    
    video.addEventListener('error', function() {
        console.log('Video failed to load, applying fallback background');
        document.body.style.background = `
            linear-gradient(45deg, 
                rgba(37, 0, 1, 0.9) 0%,
                rgba(89, 0, 4, 0.8) 25%,
                rgba(165, 1, 4, 0.7) 50%,
                rgba(89, 0, 4, 0.8) 75%,
                rgba(37, 0, 1, 0.9) 100%
            ),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23FCBA04" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23A50104" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23F3F3F3" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')
        `;
    });
    
    // Optimize video playback
    video.addEventListener('loadeddata', function() {
        console.log('Background video loaded successfully');
    });
    
    // Pause video when page is not visible to save resources
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            video.pause();
        } else {
            video.play();
        }
    });
}

// Add smooth scrolling for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add interactive hover effects for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic title effect
function addDynamicTitleEffect() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const text = title.textContent;
    title.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.1}s`;
        span.style.display = 'inline-block';
        span.style.animation = 'letterGlow 2s ease-in-out infinite alternate';
        title.appendChild(span);
    });
    
    // Add letter glow animation
    if (!document.querySelector('#letterGlowStyles')) {
        const style = document.createElement('style');
        style.id = 'letterGlowStyles';
        style.textContent = `
            @keyframes letterGlow {
                0% { 
                    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 20px rgba(252, 186, 4, 0.3);
                    transform: translateY(0);
                }
                100% { 
                    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 30px rgba(252, 186, 4, 0.8);
                    transform: translateY(-2px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize dynamic title effect after a delay
setTimeout(addDynamicTitleEffect, 1500);