window.onload = () => {
    getContentSlide();
    document.querySelectorAll("#nav a").forEach((item) => {
        item.addEventListener("click", () => {
            getContentSlide();
        });
    });
    window.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const centerX = x - 75;
        const centerY = y - 75;
        const circle = document.getElementById("circle");
        setTimeout(() => {
            if (currentIndex === 0) {
                circle.style.transform = `translate(${centerX}px, ${centerY}px)`;
            } else if (currentIndex === 1) {
                circle.style.transform = `translate(${centerX}px, calc(${centerY}px + 100vh))`;
            } else if (currentIndex === 2) {
                circle.style.transform = `translate(${centerX}px, calc(${centerY}px + 200vh))`;
            }
        }, 100);
    });
};

let currentIndex = 0;
let isScrolling = false;
let touchStartY = 0;

window.addEventListener("wheel", scrollSlides);
window.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
});
window.addEventListener("touchmove", (e) => {
    const endTouchY = e.touches[0].clientY;
    scrollSlides({ deltaY: touchStartY - endTouchY });
});
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 38) { // Pfeil nach oben
        scrollSlides({ deltaY: -1 });
    } else if (e.keyCode === 40) { // Pfeil nach unten
        scrollSlides({ deltaY: 1 });
    }
});

function scrollSlides(e) {
    if (isScrolling) return;
    const slides = Array.from(document.querySelectorAll('.content'));
    if (e.deltaY < 0) { // up
        if (currentIndex !== 0) currentIndex--;
    } else { // down
        if (currentIndex < 2) currentIndex++;
    }

    isScrolling = true;
    slides[currentIndex].scrollIntoView({ behavior: 'smooth' });
    getContentSlide();

    setTimeout(() => {
        isScrolling = false;
    }, 500);
}

function getContentSlide() {
    const navitems = document.querySelectorAll(".navitem");
    navitems.forEach((item) => {
        item.classList.remove("selected");
    });
    navitems[currentIndex].classList.add("selected");
}

