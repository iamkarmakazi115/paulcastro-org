// Social page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializePlatformEffects();
    initializeFacebookFallback();
    initializeUpdatesFeature();
    initializeMagicalEffects();
    initializeScrollEffects();
});

// Initialize entrance animations
function initializeAnimations() {
    const heroSection = document.querySelector('.hero-section');
    const socialPlatforms = document.querySelectorAll('.social-platform');
    
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
    
    // Staggered platform animations
    socialPlatforms.forEach((platform, index) => {
        platform.style.opacity = '0';
        platform.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            platform.style.transition = 'all 0.8s ease-out';
            platform.style.opacity = '1';
            platform.style.transform = 'translateY(0) scale(1)';
        }, 600 + (index * 200));
    });
}

// Initialize platform interactive effects
function initializePlatformEffects() {
    const socialPlatforms = document.querySelectorAll('.social-platform');
    
    socialPlatforms.forEach((platform, index) => {
        // Enhanced hover effects
        platform.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(252, 186, 4, 0.5)';
            
            // Add magical burst effect
            createPlatformBurst(this);
            
            // Animate platform icon
            const icon = this.querySelector('.platform-icon');
            if (icon) {
                icon.style.animation = 'iconEnhanced 2s ease-in-out infinite';
            }
        });
        
        platform.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(252, 186, 4, 0.2)';
            
            // Reset icon animation
            const icon = this.querySelector('.platform-icon');
            if (icon) {
                icon.style.animation = 'iconBounce 3s ease-in-out infinite';
            }
        });
        
        // Click effect for mobile
        platform.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                createPlatformBurst(this);
                this.style.animation = 'platformPulse 0.6s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 600);
            }
        });
    });
    
    // Add enhanced icon animation
    if (!document.querySelector('#iconEnhancedStyles')) {
        const style = document.createElement('style');
        style.id = 'iconEnhancedStyles';
        style.textContent = `
            @keyframes iconEnhanced {
                0%, 100% { 
                    transform: translateY(0) rotate(0deg) scale(1); 
                    text-shadow: 0 0 10px rgba(252, 186, 4, 0.5);
                }
                25% { 
                    transform: translateY(-15px) rotate(5deg) scale(1.2); 
                    text-shadow: 0 0 20px rgba(252, 186, 4, 0.8);
                }
                50% { 
                    transform: translateY(-10px) rotate(0deg) scale(1.3); 
                    text-shadow: 0 0 25px rgba(252, 186, 4, 1);
                }
                75% { 
                    transform: translateY(-15px) rotate(-5deg) scale(1.2); 
                    text-shadow: 0 0 20px rgba(252, 186, 4, 0.8);
                }
            }
            
            @keyframes platformPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create magical burst effect for platforms
function createPlatformBurst(platform) {
    const rect = platform.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        const symbols = ['✦', '✧', '⚡', '🌟', '💫', '✨', '🔮', '⭐'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.textContent = symbol;
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            color: #FCBA04;
            font-size: ${Math.random() * 10 + 15}px;
            pointer-events: none;
            z-index: 1001;
            animation: socialBurst ${0.8 + Math.random() * 0.4}s ease-out forwards;
        `;
        
        const angle = (i / 10) * 2 * Math.PI;
        const distance = 80 + Math.random() * 80;
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
    
    // Add social burst animation
    if (!document.querySelector('#socialBurstStyles')) {
        const style = document.createElement('style');
        style.id = 'socialBurstStyles';
        style.textContent = `
            @keyframes socialBurst {
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

// Initialize Facebook fallback functionality
function initializeFacebookFallback() {
    // Check if Facebook SDK loads successfully
    setTimeout(() => {
        const fbPage = document.querySelector('.fb-page');
        const fallback = document.querySelector('.facebook-fallback');
        
        if (fbPage && fallback) {
            // Check if Facebook plugin loaded
            const fbContent = fbPage.querySelector('iframe, .fb-page-content');
            
            if (!fbContent || fbContent.offsetHeight === 0) {
                // Facebook plugin failed to load, show fallback
                fbPage.style.display = 'none';
                fallback.style.display = 'block';
                
                console.log('Facebook plugin failed to load, showing fallback content');
            }
        }
    }, 3000); // Wait 3 seconds for Facebook SDK to load
    
    // Add click tracking for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Social link clicked:', this.href);
            
            // Add click effect
            this.style.transform = 'translateY(-5px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 200);
        });
    });
}

// Initialize updates feed features
function initializeUpdatesFeature() {
    const updatePosts = document.querySelectorAll('.update-post');
    const updatesFeed = document.querySelector('.updates-feed');
    
    // Animate update posts on hover
    updatePosts.forEach((post, index) => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(252, 186, 4, 0.3)';
            
            // Animate tags
            const tags = this.querySelectorAll('.tag');
            tags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1)';
                    tag.style.background = 'rgba(252, 186, 4, 0.4)';
                }, tagIndex * 100);
            });
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(252, 186, 4, 0.1)';
            
            // Reset tags
            const tags = this.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.style.transform = 'scale(1)';
                tag.style.background = 'rgba(252, 186, 4, 0.2)';
            });
        });
        
        // Add entrance animation
        post.style.opacity = '0';
        post.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            post.style.transition = 'all 0.6s ease-out';
            post.style.opacity = '1';
            post.style.transform = 'translateX(0)';
        }, 1200 + (index * 200));
    });
    
    // Add scroll indicator for updates feed
    if (updatesFeed) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '↓ Scroll for more updates ↓';
        scrollIndicator.style.cssText = `
            text-align: center;
            color: rgba(252, 186, 4, 0.7);
            font-size: 0.9rem;
            margin-top: 1rem;
            animation: scrollHint 2s ease-in-out infinite;
        `;
        
        updatesFeed.parentNode.appendChild(scrollIndicator);
        
        // Hide scroll indicator when scrolled
        updatesFeed.addEventListener('scroll', function() {
            if (this.scrollTop > 50) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // Add scroll hint animation
    if (!document.querySelector('#scrollHintStyles')) {
        const style = document.createElement('style');
        style.id = 'scrollHintStyles';
        style.textContent = `
            @keyframes scrollHint {
                0%, 100% { 
                    opacity: 0.7; 
                    transform: translateY(0);
                }
                50% { 
                    opacity: 1; 
                    transform: translateY(5px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize magical background effects
function initializeMagicalEffects() {
    createFloatingNetworkNodes();
    createSocialAura();
    initializeInteractiveCursor();
}

function createFloatingNetworkNodes() {
    const nodes = ['🔗', '💬', '📱', '💻', '🌐', '📡', '✉️', '📢'];
    
    function createNode() {
        const node = document.createElement('div');
        node.textContent = nodes[Math.floor(Math.random() * nodes.length)];
        node.style.cssText = `
            position: fixed;
            color: rgba(252, 186, 4, 0.15);
            font-size: ${Math.random() * 12 + 18}px;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            pointer-events: none;
            z-index: -1;
            animation: nodeFloat ${Math.random() * 18 + 22}s linear infinite;
        `;
        
        document.body.appendChild(node);
        
        setTimeout(() => {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }, 40000);
    }
    
    // Add node float animation
    if (!document.querySelector('#nodeFloatStyles')) {
        const style = document.createElement('style');
        style.id = 'nodeFloatStyles';
        style.textContent = `
            @keyframes nodeFloat {
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
                    transform: translateY(-120vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create nodes periodically
    setInterval(createNode, 2500);
    
    // Initial nodes
    for (let i = 0; i < 3; i++) {
        setTimeout(createNode, i * 800);
    }
}

function createSocialAura() {
    const auraContainer = document.createElement('div');
    auraContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(auraContainer);
    
    // Create connection lines effect
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            width: 2px;
            height: 200px;
            background: linear-gradient(180deg, transparent, rgba(252, 186, 4, 0.1), transparent);
            animation: connectionLine ${20 + i * 3}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            transform-origin: center;
        `;
        
        auraContainer.appendChild(line);
    }
    
    // Add connection line animation
    if (!document.querySelector('#connectionLineStyles')) {
        const style = document.createElement('style');
        style.id = 'connectionLineStyles';
        style.textContent = `
            @keyframes connectionLine {
                0%, 100% {
                    transform: rotate(0deg) scale(1);
                    opacity: 0.1;
                }
                25% {
                    transform: rotate(90deg) scale(1.5);
                    opacity: 0.3;
                }
                50% {
                    transform: rotate(180deg) scale(0.8);
                    opacity: 0.1;
                }
                75% {
                    transform: rotate(270deg) scale(1.2);
                    opacity: 0.2;
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
        
        // Create connection trails occasionally
        if (Math.random() < 0.02) {
            createConnectionTrail(mouseX, mouseY);
        }
    });
    
    function createConnectionTrail(x, y) {
        const trail = document.createElement('div');
        const symbols = ['🔗', '✦', '💫'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        trail.textContent = symbol;
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: rgba(252, 186, 4, 0.5);
            font-size: ${Math.random() * 6 + 10}px;
            pointer-events: none;
            z-index: 1001;
            animation: connectionTrailLife 2s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 2000);
    }
    
    // Add connection trail animation
    if (!document.querySelector('#connectionTrailStyles')) {
        const style = document.createElement('style');
        style.id = 'connectionTrailStyles';
        style.textContent = `
            @keyframes connectionTrailLife {
                0% {
                    opacity: 1;
                    transform: scale(0.5);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1) translateY(-30px);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.3) translateY(-60px);
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
                
                // Trigger special effects
                if (entry.target.classList.contains('social-platform')) {
                    triggerPlatformAppearance(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all social platforms
    document.querySelectorAll('.social-platform').forEach(platform => {
        observer.observe(platform);
    });
}

function triggerPlatformAppearance(platform) {
    // Add glow effect when platform appears
    platform.style.boxShadow = '0 10px 30px rgba(252, 186, 4, 0.3)';
    
    // Animate feature cards
    const featureCards = platform.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate stats
    const statItems = platform.querySelectorAll('.stat-item');
    statItems.forEach((stat, index) => {
        const number = stat.querySelector('.stat-number');
        if (number) {
            number.style.animation = `statCountUp 1s ease-out ${index * 0.2}s forwards`;
        }
    });
}

// Add stat count-up animation
if (!document.querySelector('#statCountUpStyles')) {
    const style = document.createElement('style');
    style.id = 'statCountUpStyles';
    style.textContent = `
        @keyframes statCountUp {
            0% {
                transform: scale(0) rotate(180deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(1) rotate(0deg);
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

// Newsletter form enhancement
const subscriptionForm = document.querySelector('.subscription-form');
if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', function(e) {
        const button = this.querySelector('.subscribe-btn');
        button.innerHTML = 'Subscribing...';
        button.style.background = 'linear-gradient(135deg, #A50104 0%, #590004 100%)';
        
        setTimeout(() => {
            button.innerHTML = 'Thank You!';
            button.style.background = 'linear-gradient(135deg, #FCBA04 0%, #A50104 100%)';
        }, 1000);
    });
}