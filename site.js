const languageButton = document.querySelector("[data-language-toggle]");
const languageOption = document.querySelector("[data-language-option]");
const languageStatus = document.querySelector("#language-status");
const menuButton = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const translations = [...document.querySelectorAll("[data-fr][data-en]")];
const currentYear = document.querySelector("#current-year");
const mobileNavigation = window.matchMedia("(max-width: 62rem)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const languagePreferenceKey = "ecole-chretienne-daniel-language";

function readLanguagePreference() {
  try {
    return {
      language: window.localStorage.getItem(languagePreferenceKey) === "en" ? "en" : "fr",
      available: true
    };
  } catch (error) {
    if (!(error instanceof DOMException)) {
      throw error;
    }

    return { language: "fr", available: false };
  }
}

function saveLanguagePreference(language) {
  try {
    window.localStorage.setItem(languagePreferenceKey, language);
    return true;
  } catch (error) {
    if (!(error instanceof DOMException)) {
      throw error;
    }

    return false;
  }
}

function announceLanguagePreference(language) {
  languageStatus.textContent = language === "fr"
    ? "La langue a changé, mais ce navigateur ne peut pas mémoriser ce choix."
    : "Your language changed, but this browser cannot save the preference.";
}

function setLanguage(language) {
  for (const element of translations) {
    element.textContent = element.getAttribute(`data-${language}`);
  }

  const pageTitle = document.querySelector("title");
  if (pageTitle) {
    document.title = pageTitle.textContent;
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  const localizedDescription = metaDescription?.getAttribute(`data-${language}-content`);
  if (metaDescription && localizedDescription) {
    metaDescription.content = localizedDescription;
  }

  for (const element of document.querySelectorAll("[data-fr-aria-label][data-en-aria-label]")) {
    element.setAttribute("aria-label", element.getAttribute(`data-${language}-aria-label`));
  }

  document.documentElement.lang = language;
  languageOption.textContent = language === "fr" ? "English" : "Français";
  languageButton.setAttribute(
    "aria-label",
    language === "fr" ? "Passer en anglais" : "Switch to French"
  );
  languageStatus.textContent = language === "fr" ? "Langue sélectionnée : français" : "Language selected: English";
  if (menuButton) {
    setMenuOpen(menuButton.getAttribute("aria-expanded") === "true");
  }
}

function setMenuOpen(isOpen) {
  if (!menuButton || !primaryNavigation) {
    return;
  }

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    document.documentElement.lang === "fr"
      ? isOpen ? "Fermer le menu" : "Ouvrir le menu"
      : isOpen ? "Close menu" : "Open menu"
  );
  primaryNavigation.classList.toggle("is-open", isOpen);
}

languageButton.addEventListener("click", () => {
  const language = document.documentElement.lang === "fr" ? "en" : "fr";
  setLanguage(language);
  if (!saveLanguagePreference(language)) {
    announceLanguagePreference(language);
  }
});

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  const link = event.target instanceof Element
    ? event.target.closest("a")
    : null;

  if (!(link instanceof HTMLAnchorElement) || !mobileNavigation.matches) {
    return;
  }

  setMenuOpen(false);
  const target = link.getAttribute("href");
  const destination = target?.startsWith("#")
    ? document.querySelector(target)
    : null;
  if (destination instanceof HTMLElement) {
    destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const openDropdown = primaryNavigation.querySelector(".nav-dropdown[open]");
  if (openDropdown) {
    openDropdown.open = false;
    openDropdown.querySelector("summary").focus();
    return;
  }

  if (menuButton?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

mobileNavigation.addEventListener("change", (event) => {
  if (!event.matches && menuButton) {
    setMenuOpen(false);
  }
});

const mottoDrawing = document.querySelector(".motto-drawing");
if (mottoDrawing) {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    mottoDrawing.classList.add("is-drawn");
  } else {
    const mottoSection = mottoDrawing.closest(".motto-section");
    if (mottoSection) {
      const mottoObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          mottoDrawing.classList.add("is-drawn");
          observer.disconnect();
        }
      }, { threshold: 0.2 });
      document.documentElement.classList.add("motion-ready");
      mottoObserver.observe(mottoSection);
    } else {
      mottoDrawing.classList.add("is-drawn");
    }
  }
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
const languagePreference = readLanguagePreference();
setLanguage(languagePreference.language);
if (!languagePreference.available) {
  announceLanguagePreference(languagePreference.language);
}
ScrollCraft.mount(document.body);
document.documentElement.classList.add("scroll-ready");
