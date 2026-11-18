// полоска прокрутки сверху
const bar = document.createElement("div");
bar.style.cssText = "position:fixed;top:0;left:0;height:6px;width:100%;background:var(--acc);transform-origin:0 50%;transform:scaleX(0);z-index:10;pointer-events:none";
document.body.appendChild(bar);

let lastScroll = scrollY;

addEventListener("scroll", () => {
    // при скролле кубик крутится быстрее
    const diff = scrollY - lastScroll;
    lastScroll = scrollY;
    speedY += Math.max(-8, Math.min(8, diff * 0.08));

    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });
