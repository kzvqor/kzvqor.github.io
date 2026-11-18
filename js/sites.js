// блок с сайтами: 3d окно крутится за мышкой
const sites = $("sites");
const win3d = sites.querySelector(".b3d");

if (hasMouse && !reducedMotion) {
    sites.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const box = sites.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width - 0.5;
        const y = (e.clientY - box.top) / box.height - 0.5;
        win3d.style.setProperty("--ry", x * 50 + "deg");
        win3d.style.setProperty("--rx", -y * 36 + "deg");
    });

    sites.addEventListener("pointerleave", () => {
        win3d.style.removeProperty("--ry");
        win3d.style.removeProperty("--rx");
    });
}

sites.addEventListener("click", (e) => burst(e.clientX, e.clientY));
