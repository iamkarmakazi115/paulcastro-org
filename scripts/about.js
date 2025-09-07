// About page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeStoryCards();
    initializeMagicalEffects();
});

// Initialize entrance animations
function initializeAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const storyCards = document.querySelectorAll('.story-card');
    const quoteSection = document.querySelector('.inspirational-quote');
    
    // Hero entrance animation
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Staggered story card animations
    storyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-100px)';
        
        setTimeout(() => {
            card.style.transition = 'all 1s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 800 + (index * 400));
    });
    
    // Quote section animation
    if (quoteSection) {
        quoteSection.style.opacity = '0';
        quoteSection.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            quoteSection.style.transition = 'all 1s ease-out';
            quoteSection.style.opacity = '1';
            quoteSection.style.transform = 'scale(1)';
        }, 2500);
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
                
                // Trigger special effects for story cards
                if (entry.target.classList.contains('story-card')) {
                    triggerCardEffect(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all story cards
    document.querySelectorAll('.story-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe quote section
    const quoteSection = document.querySelector('.inspirational-quote');
    if (quoteSection) {
        observer.observe(quoteSection);
    }
}

// Enhanced story card interactions
function initializeStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach((card, index) => {
        // Add unique ID for targeting
        if (!card.id) {
            card.id = `story-card-${index}`;
        }
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(252, 186, 4, 0.5)';
            
            // Add magical particle burst
            createParticleBurst(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(252, 186, 4, 0.2)';
        });
        
        // Click effect for mobile
        card.addEventListener('click', function() {
            this.style.animation = 'cardPulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Add card pulse animation
    if (!document.querySelector('#cardPulseStyles')) {
        const style = document.createElement('style');
        style.id = 'cardPulseStyles';
        style.textContent = `
            @keyframes cardPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create particle burst effect
function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const symbols = ['✦', '✧', '⚡', '🌟', '✯'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.textContent = symbol;
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            color: #FCBA04;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 1001;
            animation: particleBurst 1s ease-out forwards;
        `;
        
        // Random direction
        const angle = (i / 8) * 2 * Math.PI;
        const distance = 100 + Math.random() * 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.style.setProperty('--end-x', `${endX}px`);
        particle.style.setProperty('--end-y', `${endY}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
    
    // Add particle burst animation if not exists
    if (!document.querySelector('#particleBurstStyles')) {
        const style = document.createElement('style');
        style.id = 'particleBurstStyles';
        style.textContent = `
            @keyframes particleBurst {
                0% {
                    opacity: 1;
                    transform: translate(0, 0) scale(0.5);
                }
                50% {
                    opacity: 1;
                    transform: translate(
                        calc(var(--end-x) - 50vw), 
                        calc(var(--end-y) - 50vh)
                    ) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(
                        calc(var(--end-x) - 50vw), 
                        calc(var(--end-y) - 50vh)
                    ) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Trigger special effects for story cards
function triggerCardEffect(card) {
    // Add a subtle glow effect when card becomes visible
    card.style.boxShadow = '0 8px 25px rgba(252, 186, 4, 0.3), 0 0 50px rgba(252, 186, 4, 0.1)';
    
    // Animate the card icon
    const icon = card.querySelector('.card-icon');
    if (icon) {
        icon.style.animation = 'iconEntrance 1.5s ease-out';
    }
    
    // Add entrance animation for paragraphs
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            p.style.transition = 'all 0.6s ease-out';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

// Initialize magical background effects
function initializeMagicalEffects() {
    // Create floating magical symbols
    createFloatingSymbols();
    
    // Add interactive cursor effects
    initializeCursorEffects();
    
    // Create ambient light effects
    createAmbientLights();
}

function createFloatingSymbols() {
    const symbols = ['✦', '✧', '✯', '⚡', '🌟', '✰'];
    const container = document.body;
    
    function createSymbol() {
        const symbol = document.createElement('div');
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.cssText = `
            position: fixed;
            color: rgba(252, 186, 4, 0.2);
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            pointer-events: none;
            z-index: 1;
            animation: symbolFloat ${Math.random() * 15 + 20}s linear infinite;
        `;
        
        container.appendChild(symbol);
        
        setTimeout(() => {
            if (symbol.parentNode) {
                symbol.parentNode.removeChild(symbol);
            }
        }, 35000);
    }
    
    // Add symbol float animation
    if (!document.querySelector('#symbolFloatStyles')) {
        const style = document.createElement('style');
        style.id = 'symbolFloatStyles';
        style.textContent = `
            @keyframes symbolFloat {
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
                    transform: translateY(-120vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create symbols periodically
    setInterval(createSymbol, 4000);
    
    // Initial burst
    for (let i = 0; i < 3; i++) {
        setTimeout(createSymbol, i * 1000);
    }
}

function initializeCursorEffects() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trailing sparkles occasionally
        if (Math.random() < 0.05) {
            createSparkle(mouseX, mouseY);
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #FCBA04, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1002;
            animation: sparkleLife 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
    
    // Add sparkle animation
    if (!document.querySelector('#sparkleLifeStyles')) {
        const style = document.createElement('style');
        style.id = 'sparkleLifeStyles';
        style.textContent = `
            @keyframes sparkleLife {
                0% {
                    opacity: 1;
                    transform: scale(0);
                }
                50% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createAmbientLights() {
    const lightContainer = document.createElement('div');
    lightContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(lightContainer);
    
    // Create multiple ambient lights
    for (let i = 0; i < 3; i++) {
        const light = document.createElement('div');
        light.style.cssText = `
            position: absolute;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(252, 186, 4, 0.03), transparent);
            border-radius: 50%;
            animation: ambientFloat ${15 + i * 5}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        lightContainer.appendChild(light);
    }
    
    // Add ambient float animation
    if (!document.querySelector('#ambientFloatStyles')) {
        const style = document.createElement('style');
        style.id = 'ambientFloatStyles';
        style.textContent = `
            @keyframes ambientFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(100px, -50px) scale(1.2);
                    opacity: 0.5;
                }
                50% {
                    transform: translate(-50px, 100px) scale(0.8);
                    opacity: 0.2;
                }
                75% {
                    transform: translate(-100px, -100px) scale(1.1);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add icon entrance animation
if (!document.querySelector('#iconEntranceStyles')) {
    const style = document.createElement('style');
    style.id = 'iconEntranceStyles';
    style.textContent = `
        @keyframes iconEntrance {
            0% {
                transform: translateY(-30px) rotate(-180deg) scale(0.5);
                opacity: 0;
            }
            50% {
                transform: translateY(10px) rotate(0deg) scale(1.2);
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

// Smooth scrolling for any internal links
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