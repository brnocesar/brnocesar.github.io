let i18nCache = {};
let currentLang = localStorage.getItem("lang") || "en";

async function loadLanguage(lang) {
    if (!i18nCache[lang]) {
        const response = await fetch(`js/i18n/${lang}.json`);
        i18nCache[lang] = await response.json();
    }
    return i18nCache[lang];
}

async function applyLanguage(lang) {
    const dict = await loadLanguage(lang);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const text = dict[element.getAttribute("data-i18n")];
        if (text === undefined) return;

        const attribute = element.getAttribute("data-i18n-attr");
        if (attribute) {
            element.setAttribute(attribute, text);
        } else if (element.hasAttribute("data-i18n-html")) {
            element.innerHTML = text;
        } else {
            element.textContent = text;
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
    currentLang = lang;
}

function toEnglish(){
    applyLanguage("en");
}

function toPortuguese(){
    applyLanguage("pt");
}

document.addEventListener("DOMContentLoaded", () => applyLanguage(currentLang));