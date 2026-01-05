document.addEventListener('DOMContentLoaded', () => {
    initialiserNavigation();
    initialiserAnimationTitre();
    initialiserEffetBoutons();
    initialiserApparitionScroll();
    initialiserChargement();
    initialiserElementsFlottants();
    initialiserLightbox();
    initialiserAge();
    initialiserTransitions();
});

function initialiserAge() {
    const elementAge = document.getElementById('age');
    if (elementAge) {
        const dateNaissance = new Date('2006-03-19');
        const maintenant = new Date();
        let age = maintenant.getFullYear() - dateNaissance.getFullYear();
        const mois = maintenant.getMonth() - dateNaissance.getMonth();

        if (mois < 0 || (mois === 0 && maintenant.getDate() < dateNaissance.getDate())) {
            age--;
        }

        elementAge.textContent = age;
    }
}


function initialiserNavigation() {
    const hamburger = document.getElementById('hamburger');
    const menuNavigation = document.getElementById('nav-menu');

    if (hamburger && menuNavigation) {
        hamburger.addEventListener('click', () => {
            menuNavigation.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(lien => {
            lien.addEventListener('click', () => {
                menuNavigation.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

function initialiserAnimationTitre() {
    const nomHeros = document.querySelector('.hero-name');
    if (nomHeros) {
        nomHeros.setAttribute('data-text', nomHeros.textContent);
        const texteOriginal = nomHeros.textContent;
        nomHeros.textContent = '';

        let index = 0;
        const machineEcrire = setInterval(() => {
            if (index < texteOriginal.length) {
                nomHeros.textContent += texteOriginal.charAt(index);
                index++;
            } else {
                clearInterval(machineEcrire);
            }
        }, 100);
    }
}


function initialiserEffetBoutons() {
    const boutons = document.querySelectorAll('.cta-button, .cv-download');
    boutons.forEach(bouton => {
        bouton.addEventListener('click', function (e) {
            const onde = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const taille = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - taille / 2;
            const y = e.clientY - rect.top - taille / 2;

            onde.style.width = onde.style.height = taille + 'px';
            onde.style.left = x + 'px';
            onde.style.top = y + 'px';
            onde.classList.add('ripple');

            this.appendChild(onde);
            setTimeout(() => onde.remove(), 600);
        });
    });
}

function initialiserApparitionScroll() {
    const sections = document.querySelectorAll('section');
    const observateurSection = new IntersectionObserver((entrees) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.style.opacity = '1';
                entree.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease-out';
        observateurSection.observe(section);
    });
}

function initialiserChargement() {
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });
}

function initialiserElementsFlottants() {
    const elementsFlottants = document.querySelectorAll('.floating-element');
    const tailleMin = 40;

    elementsFlottants.forEach((element) => {
        let largeurZone = window.innerWidth;
        let hauteurZone = window.innerHeight;
        let x = Math.random() * (largeurZone - tailleMin);
        let y = Math.random() * (hauteurZone - tailleMin);
        let dx = (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random());
        let dy = (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random());
        let rotation = Math.random() * 360;
        let vitesseRotation = (0.5 + Math.random() * 1.5);

        element.style.top = `${y}px`;
        element.style.left = `${x}px`;

        function deplacer() {
            largeurZone = window.innerWidth;
            hauteurZone = window.innerHeight;
            x += dx;
            y += dy;
            rotation += vitesseRotation;

            if (x < 0 || x > largeurZone - tailleMin) dx *= -1;
            if (y < 0 || y > hauteurZone - tailleMin) dy *= -1;

            element.style.top = `${y}px`;
            element.style.left = `${x}px`;
            element.style.transform = `rotate(${rotation}deg)`;
        }

        setInterval(deplacer, 20 + Math.random() * 20);
    });
}

function initialiserLightbox() {
    const elementsGalerie = document.querySelectorAll('.gallery-item');

    if (elementsGalerie.length > 0) {
        if (!document.querySelector('.lightbox')) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <span class="lightbox-close">&times;</span>
                <img src="" alt="">
            `;
            document.body.appendChild(lightbox);

            const imageLightbox = lightbox.querySelector('img');
            const boutonFermer = lightbox.querySelector('.lightbox-close');

            elementsGalerie.forEach(item => {
                item.addEventListener('click', () => {
                    const img = item.querySelector('img');
                    if (img) {
                        imageLightbox.src = img.src;
                        imageLightbox.alt = img.alt || 'Image';
                        lightbox.classList.add('active');
                    }
                });
            });

            boutonFermer.addEventListener('click', () => {
                lightbox.classList.remove('active');
                imageLightbox.classList.remove('zoomed');
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    imageLightbox.classList.remove('zoomed');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                    imageLightbox.classList.remove('zoomed');
                }
            });

            imageLightbox.addEventListener('click', (e) => {
                e.stopPropagation();
                imageLightbox.classList.toggle('zoomed');
            });
        }
    }
}

function initialiserTransitions() {
    // Add fade-in on load
    setTimeout(() => {
        document.body.classList.add('fade-in');
    }, 50);

    // Intercept clicks on links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetUrl = this.getAttribute('href');

            // Ignore if new tab, hash link, or mailto/tel
            if (this.target === '_blank' ||
                targetUrl.startsWith('#') ||
                targetUrl.startsWith('mailto:') ||
                targetUrl.startsWith('tel:')) {
                return;
            }

            e.preventDefault();
            document.body.classList.remove('fade-in');
            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 150); // Match CSS transition duration
        });
    });

    // Also handle onclick attributes on project cards
    document.querySelectorAll('.projet-card').forEach(card => {
        // We need to remove the inline onclick and handle it via listener to allow transition
        const onclickValue = card.getAttribute('onclick');
        if (onclickValue) {
            const urlMatch = onclickValue.match(/window\.location\.href='([^']+)'/);
            if (urlMatch && urlMatch[1]) {
                card.removeAttribute('onclick');
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    document.body.classList.remove('fade-in');
                    document.body.classList.add('fade-out');
                    setTimeout(() => {
                        window.location.href = urlMatch[1];
                    }, 150);
                });
            }
        }
    });

    // Handle back button (history)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('fade-out');
            document.body.classList.add('fade-in');
        }
    });
}
