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