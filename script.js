// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navigation mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Toggle du menu mobile
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Effet de scroll sur la navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling pour les liens d'ancrage
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

    // Animations au scroll avec Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation avec délai pour les cartes
                if (entry.target.hasAttribute('data-delay')) {
                    const delay = entry.target.getAttribute('data-delay');
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.skill-card, .timeline-item, .experience-card, .interest-card, .contact-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        // Ajouter les classes d'animation
        el.classList.add('fade-in');
        
        // Ajouter un délai basé sur l'index pour un effet en cascade
        if (!el.hasAttribute('data-delay')) {
            el.setAttribute('data-delay', index * 100);
        }
        
        observer.observe(el);
    });

    // Animation spéciale pour le titre principal
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        // Ajouter l'attribut data-text pour l'effet de texte
        heroName.setAttribute('data-text', heroName.textContent);
        
        // Animation d'écriture du nom
        const originalText = heroName.textContent;
        heroName.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < originalText.length) {
                heroName.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }


    // Animation des éléments flottants
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        // Animation continue avec des paramètres différents
        element.style.setProperty('--delay', index * 2 + 's');
    });

    // Effet de hover amélioré pour les cartes
    const cards = document.querySelectorAll('.skill-card, .experience-card, .interest-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Ajouter un effet de lueur
            this.style.boxShadow = '0 20px 50px rgba(255, 105, 180, 0.3), 0 0 30px rgba(0, 217, 217, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Retirer l'effet de lueur
            this.style.boxShadow = '';
        });
    });

    // Animation des icônes au survol
    const skillIcons = document.querySelectorAll('.skill-icon, .interest-icon');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Effet de clic sur les boutons
    const buttons = document.querySelectorAll('.cta-button, .cv-download');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Créer un effet de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animation d'apparition progressive des sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });

    // Effet de typing pour certains textes
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Gestionnaire d'événements pour les liens de navigation actifs
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Animation de chargement de la page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animer l'apparition du héros
        const heroElements = document.querySelectorAll('.hero-name, .hero-details, .hero-cta');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Performance: Réduire les animations sur les appareils moins puissants
    if (window.devicePixelRatio > 2 || navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }

    console.log('🎨 Portfolio de Dimitri PAPE chargé avec succès!');
    console.log('✨ Animations et interactions activées');
    console.log('🌟 Thème Miku/Femboy appliqué');
});

// Styles CSS pour l'effet ripple (à ajouter dynamiquement)
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.nav-link.active {
    background: linear-gradient(135deg, var(--primary-cyan), var(--primary-pink));
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-light);
}

.loaded .hero-name,
.loaded .hero-details,
.loaded .hero-cta {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
}
`;

// Ajouter les styles au document
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);