// мышь: наклон пейзажа и карточек + след из пикселей
let mouseX = 0;
let mouseY = 0;
let waiting = false;
let lastTrail = 0;
let hovered = null;

function mouseFrame(time) {
    waiting = false;

    const ry = (mouseX / innerWidth - 0.5) * 18;
    const rx = -(mouseY / innerHeight - 0.5) * 14;
    scene.style.transform = `perspective(900px) rotateY(${ry}deg) rotateX(${rx}deg)`;

    if (hovered) {
        const box = hovered.getBoundingClientRect();
        const cx = (mouseX - box.left) / box.width - 0.5;
        const cy = (mouseY - box.top) / box.height - 0.5;
        hovered.style.transform = `perspective(600px) rotateX(${-cy * 14}deg) rotateY(${cx * 14}deg) translate(3px,3px)`;
    }

    // след не чаще чем 
    if (time - lastTrail > 80) {
        lastTrail = time;
        spawnParticles(mouseX, mouseY, 1, ["#a9cc82"], 0.4, 0.05);
    }
}

if (hasMouse && !reducedMotion) {
    addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!waiting) {
            waiting = true;
            requestAnimationFrame(mouseFrame);
        }
    }, { passive: true });
}

document.querySelectorAll(".link, .cc").forEach((card) => {
    card.addEventListener("pointerenter", (e) => {
        if (e.pointerType === "mouse" && !reducedMotion) {
            hovered = card;
            card.style.willChange = "transform";
        }
    });

    card.addEventListener("pointerleave", () => {
        card.style.transform = "";
        card.style.willChange = "";
        hovered = null;
    });

    card.addEventListener("click", (e) => burst(e.clientX, e.clientY));
});
