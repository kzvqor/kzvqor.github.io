// 3d кубик
const cube = document.querySelector(".cube");
let rotX = -20;
let rotY = 30;
let speedX = 0;
let speedY = 0.4;
let dragging = false;
let lastX = 0;
let lastY = 0;

function animateCube() {
    if (!dragging) {
        rotY += speedY;
        rotX += speedX;
        speedX *= 0.95;
        // совсем не останавливается, всегда крутится медленно
        if (Math.abs(speedY) < 0.4) {
            speedY = speedY < 0 ? -0.4 : 0.4;
        } else {
            speedY *= 0.95;
        }
    }

    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    if (!reducedMotion) requestAnimationFrame(animateCube);
}
animateCube();

cube.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    cube.setPointerCapture(e.pointerId);
    cube.style.cursor = "grabbing";
});

cube.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    speedY = (e.clientX - lastX) * 0.5;
    speedX = -(e.clientY - lastY) * 0.5;
    rotY += speedY;
    rotX += speedX;
    lastX = e.clientX;
    lastY = e.clientY;
});

addEventListener("pointerup", () => {
    dragging = false;
    cube.style.cursor = "grab";
});

cube.addEventListener("click", (e) => burst(e.clientX, e.clientY));
