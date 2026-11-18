// пиксельный пейзаж, одна буква = один пиксель
const map = [
    "............................",
    "..................oo........",
    ".................oooo.......",
    ".................oooo.......",
    "..................oo........",
    "........rr..................",
    ".......rrrr......t..........",
    "......rrrrrr....ttt.........",
    "......hhhhhh...ttttt........",
    "......hhdhhh.....b..........",
    "ggggggggggggggggbggggggggggg",
    "gGgggGgggGgggGggbgggGgggGggg",
    "GGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    "GGGGGGGGGGGGGGGGGGGGGGGGGGGG"
];

const colors = {
    o: "#f2b632",
    r: "#a9cc82",
    h: "#fbf6ea",
    d: "#1b1a17",
    t: "#2f7d6b",
    b: "#6b4a2b",
    g: "#5aa468",
    G: "#2f7d6b"
};

const scene = $("scene");
let pixels = "";

map.forEach((line, y) => {
    line = line.padEnd(28, ".");
    for (let x = 0; x < line.length; x++) {
        const c = line[x];
        if (!colors[c]) continue;
        // на пиксели солнца можно кликнуть
        const sun = c === "o" ? ' data-sun="1"' : "";
        pixels += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${colors[c]}"${sun}/>`;
    }
});
scene.innerHTML = pixels;


// клик по пейзажу, на солнце меняет тему
scene.addEventListener("click", (e) => {
    const fill = e.target.getAttribute && e.target.getAttribute("fill");

    if (e.target.dataset && e.target.dataset.sun) $("theme").click();

    burst(e.clientX, e.clientY, fill ? [fill] : null);
});
