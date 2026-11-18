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

function showPage(name) {
    const credits = name === "credits";

    $("p-links").hidden = credits;
    $("p-credits").hidden = !credits;
    $("n-links").setAttribute("aria-pressed", String(!credits));
    $("n-credits").setAttribute("aria-pressed", String(credits));

    scrollTo({ top: 0, behavior: "instant" });

    // блоки новой страницы сразу показываем
    document.querySelectorAll(credits ? "#p-credits .rv" : "#p-links .rv").forEach((el) => {
        el.classList.add("in");
    });
}

$("n-links").onclick = () => showPage("links");
$("n-credits").onclick = () => showPage("credits");
$("lang").onclick = () => setLanguage(lang === "ru" ? "en" : "ru");

$("theme").onclick = () => {
    const root = document.documentElement;
    const systemDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (systemDark ? "dark" : "light");
    root.dataset.theme = current === "dark" ? "light" : "dark";
};
