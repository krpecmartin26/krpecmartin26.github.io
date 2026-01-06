// 1. Binární čítač - běží hned
const binaryContainer = document.getElementById('binary-loader');
const binaryInterval = setInterval(() => {
    if (binaryContainer) {
        let b = "";
        for (let i = 0; i < 12; i++) {
            b += Math.round(Math.random());
        }
        binaryContainer.innerText = b;
    }
}, 80);

// 2. Hlavní funkce pro schování preloaderu
function hidePreloader() {
    clearInterval(binaryInterval);
    const loader = document.getElementById('preloader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Spustí se, až když je úplně vše (včetně obrázků) načteno
window.addEventListener('load', () => {
    // Necháme animaci MK aspoň 2 sekundy vyniknout
    setTimeout(hidePreloader, 2000);
});

// POJISTKA: Pokud by se načítání zaseklo, po 5s preloader zmizí silou
setTimeout(hidePreloader, 5000);

// 3. Ostatní funkce (Lightbox a Scroll Reveal)
function openModal(imgSrc) {
    document.getElementById("modalImg").src = imgSrc;
    document.getElementById("imageModal").style.display = "flex";
}
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Zastaví okamžitý skok

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 80; // -80px kvůli sticky menu
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1800; // RYCHLOST V MILISEKUNDÁCH (1.5 sekundy)
            let start = null;

            // Funkce pro plynulý pohyb (Ease-in-out)
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const run = ease(progress, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (progress < duration) window.requestAnimationFrame(step);
            }

            // Matematická křivka pro plynulý rozjezd a dojezd
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            window.requestAnimationFrame(step);
        }
    });
});