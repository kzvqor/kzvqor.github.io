let lang = "en";

function setLanguage(l) {
    lang = l;
    document.documentElement.lang = l;
    // на кнопке показываем язык, на который переключим
    $("lt").textContent = l === "ru" ? "EN" : "RU";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const t = texts[l][el.dataset.i18n];
        if (t) el.innerHTML = t;
    });
}

const pages = ["links", "sites", "projects", "credits"];

function showPage(name) {
    if (!pages.includes(name)) return;

    pages.forEach((p) => {
        $("p-" + p).hidden = p !== name;
        $("n-" + p).setAttribute("aria-pressed", String(p === name));
    });

    // на file:// браузер может запретить менять адрес, это не критично
    try { history.replaceState(null, "", "#" + name); } catch (e) {}
    scrollTo({ top: 0, behavior: "instant" });

    // блоки новой страницы сразу показываем
    document.querySelectorAll("#p-" + name + " .rv").forEach((el) => {
        el.classList.add("in");
    });
}

pages.forEach((p) => {
    $("n-" + p).onclick = () => showPage(p);
});

addEventListener("hashchange", () => showPage(location.hash.slice(1)));
$("lang").onclick = () => setLanguage(lang === "ru" ? "en" : "ru");

$("theme").onclick = () => {
    const root = document.documentElement;
    const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (systemDark ? "dark" : "light");
    root.dataset.theme = current === "dark" ? "light" : "dark";
};
