// частицы на canvas
const canvas = document.createElement("canvas");
canvas.setAttribute("aria-hidden", "true");
canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let particles = [];
let animId = 0;

function resizeCanvas() {
    // на телефоне при скролле меняется высота (адресная строка), это игнорим
    if (innerWidth === canvas.width && Math.abs(innerHeight - canvas.height) < 160) return;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resizeCanvas();
addEventListener("resize", resizeCanvas);

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life--;
        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;

        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    animId = particles.length ? requestAnimationFrame(drawParticles) : 0;
}

function spawnParticles(x, y, count, palette, speed, gravity) {
    if (reducedMotion) return;

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 6.28;
        const s = Math.random() * speed;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * s,
            vy: Math.sin(angle) * s - 1,
            gravity: gravity,
            life: 40,
            maxLife: 40,
            size: i % 2 ? 6 : 8,
            color: palette[i % palette.length]
        });
    }

    // чтобы не лагало
    const max = hasMouse ? 300 : 150;
    if (particles.length > max) particles.splice(0, particles.length - max);

    if (!animId) animId = requestAnimationFrame(drawParticles);
}

const defaultColors = ["#a9cc82", "#f2b632", "#2f7d6b", "#2aabee"];

function burst(x, y, palette) {
    spawnParticles(x, y, hasMouse ? 16 : 10, palette || defaultColors, 4, 0.18);
}

// пиксели при клике на кнопки в шапке (только настоящие клики)
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (e.isTrusted) burst(e.clientX, e.clientY);
    });
});
