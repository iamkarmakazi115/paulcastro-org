// Works page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeBookEffects();
    initializeMagicalBackground();
    initializeScrollEffects();
});

// Initialize entrance animations
function initializeAnimations() {
    const heroSection = document.querySelector('.hero-section');
    const bookContainers = document.querySelectorAll('.book-container');
    
    // Hero section entrance
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'all 1s ease-out';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Staggered book container animations
    bookContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0) scale(1)';
        }, 800 + (index * 200));
    });
}

// Initialize book container effects
function initializeBookEffects() {
    const bookContainers = document.querySelectorAll('.book-container');
    
    bookContainers.forEach((container, index) => {
        const bookCard = container.querySelector('.book-card');
        let isSpinning = false;
        
        // Enhanced hover effect with rapid spinning
        container.addEventListener('mouseenter', function() {
            if (!isSpinning) {
                isSpinning = true;
                
                // Remove any existing animation
                bookCard.style.animation = 'none';
                
                // Force reflow
                bookCard.offsetHeight;
                
                // Apply rapid spin animation
                bookCard.style.animation = 'rapidSpin 1s ease-in-out';
                
                // Add magical particle effect
                createMagicalBurst(container);
                
                // Add glow effect
                container.style.boxShadow = '0 0 30px rgba(252, 186, 4, 0.6)';
                container.style.transform = 'translateY(-15px) scale(1.02)';
                
                // Reset after animation completes
                setTimeout(() => {
                    isSpinning = false;
                    bookCard.style.animation = '';
                }, 1000);
            }
        });
        
        container.addEventListener('mouseleave', function() {
            container.style.boxShadow = '';
            container.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click effect for mobile devices
        container.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                if (!isSpinning) {
                    isSpinning = true;
                    bookCard.style.animation = 'rapidSpin 1s ease-in-out';
                    createMagicalBurst(container);
                    
                    setTimeout(() => {
                        isSpinning = false;
                        bookCard.style.animation = '';
                    }, 1000);
                }
            }
        });
        
        // Add floating animation to book symbols
        const bookSymbol = container.querySelector('.book-symbol');
        if (bookSymbol) {
            bookSymbol.addEventListener('mouseenter', function() {
                this.style.animation = 'symbolEnhanced 2s ease-in-out infinite';
            });
            
            bookSymbol.addEventListener('mouseleave', function() {
                this.style.animation = 'symbolFloat 4s ease-in-out infinite';
            });
        }
    });
    
    // Add enhanced symbol animation
    if (!document.querySelector('#symbolEnhancedStyles')) {
        const style = document.createElement('style');
        style.id = 'symbolEnhancedStyles';
        style.textContent = `
            @keyframes symbolEnhanced {
                0%, 100% { 
                    transform: translateY(0) rotate(0deg) scale(1); 
                    text-shadow: 0 0 10px rgba(252, 186, 4, 0.5);
                }
                25% { 
                    transform: translateY(-15px) rotate(5deg) scale(1.1); 
                    text-shadow: 0 0 20px rgba(252, 186, 4, 0.8);
                }
                50% { 
                    transform: translateY(-10px) rotate(0deg) scale(1.2); 
                    text-shadow: 0 0 25px rgba(252, 186, 4, 1);
                }
                75% { 
                    transform: translateY(-15px) rotate(-5deg) scale(1.1); 
                    text-shadow: 0 0 20px rgba(252, 186, 4, 0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create magical particle burst effect
function createMagicalBurst(container) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create multiple bursts
    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                const symbols = ['✦', '✧', '★', '✯', '✰', '⚡', '🌟', '💫', '✨'];
                const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                
                particle.textContent = symbol;
                particle.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    color: #FCBA04;
                    font-size: ${Math.random() * 8 + 12}px;
                    pointer-events: none;
                    z-index: 1001;
                    animation: magicalBurst ${0.8 + Math.random() * 0.4}s ease-out forwards;
                `;
                
                // Random direction with varying distances
                const angle = (i / 12) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
                const distance = 80 + Math.random() * 100;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                particle.style.setProperty('--end-x', `${endX}px`);
                particle.style.setProperty('--end-y', `${endY}px`);
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1200);
            }
        }, burst * 100);
    }
    
    // Add magical burst animation if not exists
    if (!document.querySelector('#magicalBurstStyles')) {
        const style = document.createElement('style');
        style.id = 'magicalBurstStyles';
        style.textContent = `
            @keyframes magicalBurst {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(0.3) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: translate(
                        calc(var(--end-x) - 50vw), 
                        calc(var(--end-y) - 50vh)
                    ) scale(1.2) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: translate(
                        calc(var(--end-x) - 50vw), 
                        calc(var(--end-y) - 50vh)
                    ) scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize magical background effects
function initializeMagicalBackground() {
    createFloatingRunes();
    createAmbientGlow();
    initializeInteractiveCursor();
}

function createFloatingRunes() {
    const runes = ['◆', '◇', '◈', '◉', '◎', '●', '○', '◐', '◑', '◒', '◓'];
    
    function createRune() {
        const rune = document.createElement('div');
        rune.textContent = runes[Math.floor(Math.random() * runes.length)];
        rune.style.cssText = `
            position: fixed;
            color: rgba(252, 186, 4, 0.1);
            font-size: ${Math.random() * 15 + 20}px;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            pointer-events: none;
            z-index: -1;
            animation: runeFloat ${Math.random() * 20 + 25}s linear infinite;
        `;
        
        document.body.appendChild(rune);
        
        setTimeout(() => {
            if (rune.parentNode) {
                rune.parentNode.removeChild(rune);
            }
        }, 45000);
    }
    
    // Add rune float animation
    if (!document.querySelector('#runeFloatStyles')) {
        const style = document.createElement('style');
        style.id = 'runeFloatStyles';
        style.textContent = `
            @keyframes runeFloat {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.1;
                }
                100% {
                    transform: translateY(-120vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create runes periodically
    setInterval(createRune, 3000);
    
    // Initial set
    for (let i = 0; i < 4; i++) {
        setTimeout(createRune, i * 1000);
    }
}

function createAmbientGlow() {
    const glowContainer = document.createElement('div');
    glowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(glowContainer);
    
    // Create multiple glowing orbs
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.style.cssText = `
            position: absolute;
            width: ${200 + Math.random() * 200}px;
            height: ${200 + Math.random() * 200}px;
            background: radial-gradient(circle, rgba(252, 186, 4, 0.02), transparent);
            border-radius: 50%;
            animation: orbFloat ${20 + i * 5}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        glowContainer.appendChild(orb);
    }
    
    // Add orb float animation
    if (!document.querySelector('#orbFloatStyles')) {
        const style = document.createElement('style');
        style.id = 'orbFloatStyles';
        style.textContent = `
            @keyframes orbFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(200px, -100px) scale(1.2);
                    opacity: 0.4;
                }
                50% {
                    transform: translate(-100px, 200px) scale(0.8);
                    opacity: 0.1;
                }
                75% {
                    transform: translate(-200px, -200px) scale(1.1);
                    opacity: 0.3;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initializeInteractiveCursor() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trailing magic occasionally
        if (Math.random() < 0.03) {
            createMagicTrail(mouseX, mouseY);
        }
    });
    
    function createMagicTrail(x, y) {
        const trail = document.createElement('div');
        const symbols = ['✦', '✧', '⚡'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        trail.textContent = symbol;
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: rgba(252, 186, 4, 0.6);
            font-size: ${Math.random() * 8 + 8}px;
            pointer-events: none;
            z-index: 1001;
            animation: trailLife 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1500);
    }
    
    // Add trail life animation
    if (!document.querySelector('#trailLifeStyles')) {
        const style = document.createElement('style');
        style.id = 'trailLifeStyles';
        style.textContent = `
            @keyframes trailLife {
                0% {
                    opacity: 1;
                    transform: scale(0.5);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1) translateY(-20px);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.3) translateY(-40px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize scroll-based effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger special effect for books
                if (entry.target.classList.contains('book-container')) {
                    triggerBookAppearance(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all book containers
    document.querySelectorAll('.book-container').forEach(container => {
        observer.observe(container);
    });
}

function triggerBookAppearance(container) {
    // Add subtle glow when book appears
    container.style.boxShadow = '0 10px 30px rgba(252, 186, 4, 0.3)';
    
    // Animate book elements
    const symbol = container.querySelector('.book-symbol');
    const tagline = container.querySelector('.book-tagline');
    
    if (symbol) {
        symbol.style.animation = 'symbolEntrance 1.5s ease-out';
    }
    
    if (tagline) {
        tagline.style.opacity = '0';
        tagline.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            tagline.style.transition = 'all 0.8s ease-out';
            tagline.style.opacity = '1';
            tagline.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Add symbol entrance animation
if (!document.querySelector('#symbolEntranceStyles')) {
    const style = document.createElement('style');
    style.id = 'symbolEntranceStyles';
    style.textContent = `
        @keyframes symbolEntrance {
            0% {
                transform: translateY(-50px) rotate(-180deg) scale(0);
                opacity: 0;
            }
            50% {
                transform: translateY(10px) rotate(0deg) scale(1.3);
                opacity: 0.8;
            }
            100% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add reading progress indicator
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FCBA04, #A50104);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
}

// Initialize reading progress
addReadingProgress();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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