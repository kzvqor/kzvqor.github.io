const $ = (id) => document.getElementById(id);

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasMouse = matchMedia("(pointer: fine)").matches;
