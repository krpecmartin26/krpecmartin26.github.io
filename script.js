// Binární čítač
function updateBinary() {
    const container = document.getElementById('binary-loader');
    if (container) {
        let b = "";
        for (let i = 0; i < 12; i++) { b += Math.round(Math.random()); }
        container.innerText = b;
    }
}
const binaryInterval = setInterval(updateBinary, 70);

// Načítání stránky
window.addEventListener('load', function() {
    setTimeout(() => {
        clearInterval(binaryInterval);
        const loader = document.getElementById('preloader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }
    }, 2500);
});

// Lightbox
function openModal(imgSrc) {
    document.getElementById("modalImg").src = imgSrc;
    document.getElementById("imageModal").style.display = "flex";
}
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('show'); }
        else { entry.target.classList.remove('show'); }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));