// пасхалка: набрать "vodkq"
let typed = "";

addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-5);

    if (typed === "vodkq") {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                spawnParticles(Math.random() * innerWidth, -10, 6, defaultColors, 1.5, 0.25);
            }, i * 120);
        }
    }
});
