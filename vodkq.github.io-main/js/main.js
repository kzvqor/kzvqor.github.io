// показываем блоки когда доскроллили до них
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".rv").forEach((el) => observer.observe(el));


setLanguage("en");

showPage(location.hash.slice(1));
