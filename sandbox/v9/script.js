const railMessages = [
  "EDMD Conference planned for April 2-4, 2027 at Hyatt Centric Chicago; room-block interest is open now",
  "Registry participation drive active for eligible EDMD families",
  "Research partner updates and milestones posted quarterly"
];

const heroSlides = [
  {
    title: "Cure EDMD Together",
    actions: [["Who We Are", "who-we-are.html"], ["Research", "research.html"]],
    text: "Singularly focused on developing treatments and cures for EDMD.",
    image:
      "beach-dinner-table.jpg",
    backgroundImage: "man_daughter_zoo.webp",
    alt: "Family walking together outdoors"
  },
  {
    title: "Clear\nGuidance",
    actions: [["Learn About EDMD", "what-is-edmd.html"], ["Resources", "resources.html"]],
    text: "Plain-language education, practical tools, and next steps for care.",
    image:
      "hospital-iv-drip.jpg",
    backgroundImage: "Marie_cureEDMD.webp",
    alt: "Group of people collaborating around a table"
  },
  {
    title: "Research Progress",
    actions: [["Research", "research.html"], ["Join a Registry", "resources.html#registries"]],
    text: "Patient registries, study participation, and research partnerships help fuel EDMD discoveries.",
    image:
      "researcher-in-medical-laboratory.jpg",
    backgroundImage: "practical_tools.webp",
    alt: "Practical tools and resources illustration"
  }
];

const milestones = [
  {
    year: "2024",
    title: "Cardiac monitoring guidance emphasized",
    body: "Community education reinforced routine ECG/Holter/echo monitoring because cardiac risk is central in EDMD care."
  },
  {
    year: "2025",
    title: "Registry outreach expansion",
    body: "Patient and caregiver messaging focused on why registry enrollment helps treatment development in rare disease."
  },
  {
    year: "2026",
    title: "Research partner communication refresh",
    body: "Featured research narratives updated in plain language to help families understand treatment pathways."
  },
  {
    year: "2027",
    title: "Trial readiness focus",
    body: "Planned emphasis on natural history readiness, data quality, and patient education for future studies."
  }
];

const stories = [
  {
    quote:
      "Once someone explained EDMD in plain language, we felt less overwhelmed and more ready to act.",
    byline: "Parent caregiver",
    image: "man_daughter_zoo.webp"
  },
  {
    quote:
      "I needed resources for adult life, not just childhood care. Peer support filled that gap.",
    byline: "Adult living with EDMD",
    image: "stethoscope-and-laptop.jpg"
  },
  {
    quote:
      "Families ask the same early questions. A simple diagnosis guide and registry explanation helps right away.",
    byline: "Neuromuscular clinic coordinator",
    image: "mother-and-daughter-with-toy.jpg"
  }
];

const regions = {
  na: {
    title: "North America",
    desc: "Registry onboarding and cardiac education events are being prioritized.",
    stat: "Community circles: active"
  },
  eu: {
    title: "Europe",
    desc: "Cross-border patient navigation work is being expanded.",
    stat: "Community circles: active"
  },
  sa: {
    title: "South America",
    desc: "Community-led awareness campaigns are growing with local clinicians.",
    stat: "Community circles: active"
  },
  me: {
    title: "Middle East",
    desc: "Referral networks for genetics and neuromuscular care are developing.",
    stat: "Community circles: active"
  },
  apac: {
    title: "Asia-Pacific",
    desc: "Digital support and specialist finder resources are in planning.",
    stat: "Community circles: active"
  }
};

const translationCatalog = window.CURE_TRANSLATIONS || null;
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_STORAGE_KEY = "cureedmd-v8-language";
const PREVIEW_THEME_QUERY_KEY = "theme";
const PREVIEW_THEME_STORAGE_KEY = "cureedmd-v8-preview-theme";
const STYLE_LAB_QUERY_KEY = "styleLab";
const STYLE_LAB_MESSAGE_READY = "cureedmd-v8-style-lab:ready";
const STYLE_LAB_MESSAGE_UPDATE = "cureedmd-v8-style-lab:update";
const isStyleLabPreview = new URLSearchParams(window.location.search).get(STYLE_LAB_QUERY_KEY) === "1";
const supportedLanguages = translationCatalog?.languages || [{ code: "en", label: "English" }];
const supportedLanguageCodes = new Set(supportedLanguages.map(({ code }) => code));
const PREVIEW_THEMES = {
  harbor: "Harbor Calm",
  meadow: "Meadow Ledger",
  ember: "Ember Signal I",
  "ember-beacon": "Ember Signal II",
  "ember-stride": "Ember Signal III",
  "ember-bloom": "Ember Signal IV",
  "ember-pulse": "Ember Signal V",
  nocturne: "Nocturne Studio",
  linen: "Linen Atlas"
};
const LANGUAGE_META = {
  en: { label: "English", flagSrc: "flag-united-states.png" },
  es: { label: "Espa\u00f1ol", flagSrc: "flag-spain.png" },
  fr: { label: "Fran\u00e7ais", flagSrc: "flag-france.png" },
  pt: { label: "Portugu\u00eas", flagSrc: "flag-brazil.png" },
  de: { label: "Deutsch", flagSrc: "flag-germany.png" },
  it: { label: "Italiano", flagSrc: "flag-italy.png" },
  zh: { label: "\u4e2d\u6587 (\u7b80\u4f53)", flagSrc: "flag-china.png" },
  ja: { label: "\u65e5\u672c\u8a9e", flagSrc: "flag-japan.png" },
  ko: { label: "\ud55c\uad6d\uc5b4", flagSrc: "flag-south-korea.png" }
};

let railIndex = 0;
let heroIndex = 0;
let milestoneIndex = 0;
let storyIndex = 0;
let heroTimerId = null;
let heroIsTransitioning = false;
let currentLanguage = DEFAULT_LANGUAGE;
let currentLocale = "en-US";
let currentPreviewTheme = "";
let languagePickers = [];
let languagePickerEventsBound = false;

const HERO_TRANSITION_MS = 320;
const HERO_INTERVAL_MS = 6200;

const railEl = document.querySelector("#railMessage");
const heroSection = document.querySelector("#home");
const heroTitle = document.querySelector("#heroTitle");
const heroText = document.querySelector("#heroText");
const heroPhoto = document.querySelector("#heroPhoto");
const heroDots = document.querySelector("#heroDots");
const milestoneView = document.querySelector("#milestoneView");
const storyCard = document.querySelector("#storyCard");
const regionPanel = document.querySelector("#regionPanel");
const donationRangeInput = document.querySelector("#donationRange");
const donationResult = document.querySelector("#donationResult");
const newsletterForm = document.querySelector("#newsletterForm");
const newsletterStatus = document.querySelector("#newsletterStatus");

function normalizeTranslationKey(value) {
  if (translationCatalog?.normalizeKey) {
    return translationCatalog.normalizeKey(value);
  }

  return String(value || "").replace(/\s+/g, " ").trim();
}

function getLocaleTag(language = currentLanguage) {
  return translationCatalog?.locales?.[language] || "en-US";
}

function normalizePreviewTheme(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized || ["default", "classic", "none", "base"].includes(normalized)) {
    return "";
  }

  return Object.prototype.hasOwnProperty.call(PREVIEW_THEMES, normalized) ? normalized : "";
}

function getStoredPreviewTheme() {
  try {
    return normalizePreviewTheme(window.localStorage.getItem(PREVIEW_THEME_STORAGE_KEY));
  } catch {
    return "";
  }
}

function storePreviewTheme(theme) {
  try {
    if (theme) {
      window.localStorage.setItem(PREVIEW_THEME_STORAGE_KEY, theme);
      return;
    }

    window.localStorage.removeItem(PREVIEW_THEME_STORAGE_KEY);
  } catch {
    // Ignore storage failures and keep the current in-memory theme.
  }
}

function getPreviewTheme() {
  if (isStyleLabPreview) {
    return "";
  }

  const url = new URL(window.location.href);

  if (url.searchParams.has(PREVIEW_THEME_QUERY_KEY)) {
    return normalizePreviewTheme(url.searchParams.get(PREVIEW_THEME_QUERY_KEY));
  }

  return getStoredPreviewTheme();
}

function applyPreviewTheme(theme) {
  currentPreviewTheme = theme;

  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  document.documentElement.style.colorScheme = theme === "nocturne" ? "dark" : "light";
}

function syncPreviewThemeLinks() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const originalHref = link.dataset.originalHref || link.getAttribute("href");
    if (!originalHref) return;

    if (!link.dataset.originalHref) {
      link.dataset.originalHref = originalHref;
    }

    if (/^(?:#|mailto:|tel:|javascript:|https?:)/i.test(originalHref)) return;
    if (!/\.html(?:$|[?#].*)/i.test(originalHref)) return;

    const url = new URL(link.dataset.originalHref, window.location.href);

    if (currentPreviewTheme) {
      url.searchParams.set(PREVIEW_THEME_QUERY_KEY, currentPreviewTheme);
    } else {
      url.searchParams.delete(PREVIEW_THEME_QUERY_KEY);
    }

    link.setAttribute("href", url.toString());
  });
}

function renderPreviewChip() {
  const existingChip = document.querySelector(".preview-chip");

  if (!currentPreviewTheme) {
    existingChip?.remove();
    return;
  }

  const chip = existingChip || document.createElement("a");
  chip.className = "preview-chip";
  chip.dataset.originalHref = "design-preview.html";
  chip.innerHTML = `<span>Preview</span><strong>${PREVIEW_THEMES[currentPreviewTheme]}</strong>`;

  if (!existingChip) {
    document.body.appendChild(chip);
  }

  syncPreviewThemeLinks();
}

function initPreviewTheme() {
  if (isStyleLabPreview) {
    applyPreviewTheme("");
    renderPreviewChip();
    return;
  }

  const theme = getPreviewTheme();
  storePreviewTheme(theme);
  applyPreviewTheme(theme);
  syncPreviewThemeLinks();
  renderPreviewChip();
}

function postStyleLabReady() {
  const message = { type: STYLE_LAB_MESSAGE_READY };

  if (window.parent && window.parent !== window) {
    window.parent.postMessage(message, "*");
  }

  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(message, "*");
  }
}

function applyStyleLabVariables(variables) {
  if (!variables || typeof variables !== "object") return;

  Object.entries(variables).forEach(([name, value]) => {
    if (!/^--[a-z0-9-]+$/i.test(name) || typeof value !== "string") return;
    document.documentElement.style.setProperty(name, value);
  });
}

function preventStyleLabNavigation() {
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;

      const href = (link.getAttribute("href") || "").trim();
      if (!href || href.startsWith("#")) return;

      event.preventDefault();
    },
    true
  );

  document.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
    },
    true
  );
}

function initStyleLabPreview() {
  if (!isStyleLabPreview) return;

  window.addEventListener("message", (event) => {
    const message = event.data;
    if (!message || message.type !== STYLE_LAB_MESSAGE_UPDATE) return;

    applyStyleLabVariables(message.payload?.variables);
  });

  preventStyleLabNavigation();
  postStyleLabReady();
}

function getStoredLanguage() {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && supportedLanguageCodes.has(storedLanguage)) {
      return storedLanguage;
    }
  } catch {
    return DEFAULT_LANGUAGE;
  }

  return DEFAULT_LANGUAGE;
}

function storeLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore storage failures and keep the current in-memory language.
  }
}

function translateValue(value, language = currentLanguage) {
  if (!translationCatalog || language === DEFAULT_LANGUAGE) return value;

  const key = normalizeTranslationKey(value);
  return translationCatalog.text?.[language]?.[key] || value;
}

function getLocalizedCollection(name, fallback) {
  return translationCatalog?.dynamic?.[currentLanguage]?.[name] || fallback;
}

function getLocalizedRegions() {
  return translationCatalog?.dynamic?.[currentLanguage]?.regions || regions;
}

function getSlideButtonLabel(index) {
  const template = translationCatalog?.dynamic?.[currentLanguage]?.slideButtonLabel || "Show slide {n}";
  return template.replace("{n}", String(index));
}

function formatCounterValue(value, format) {
  if (format === "plain") return String(Math.round(value));

  if (format === "currency") {
    return value.toLocaleString(currentLocale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    });
  }

  return value.toLocaleString(currentLocale);
}

function formatCurrency(amount) {
  return amount.toLocaleString(currentLocale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function getLanguageMeta(code, fallbackLabel = "English") {
  const meta = LANGUAGE_META[code];
  if (meta) return meta;

  return {
    label: fallbackLabel,
    flagSrc: LANGUAGE_META.en.flagSrc
  };
}

function getDonationMessage(amount) {
  return translateValue("{amount} helps fund EDMD research and conferences.")
    .replace("{amount}", formatCurrency(amount));
}

function syncLanguageSelectors() {
  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = currentLanguage;
  });

  languagePickers.forEach((picker) => {
    const meta = getLanguageMeta(currentLanguage);
    picker.flag.src = meta.flagSrc;
    picker.flag.alt = "";
    picker.label.textContent = meta.label;
    picker.toggle.setAttribute("aria-label", `${translateValue("Select language")}: ${meta.label}`);
    picker.menu.setAttribute("aria-label", translateValue("Select language"));

    picker.options.forEach(({ button, code }) => {
      const isActive = code === currentLanguage;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  });
}

function setLanguagePickerOpen(picker, isOpen) {
  picker.root.classList.toggle("open", isOpen);
  picker.toggle.setAttribute("aria-expanded", String(isOpen));
}

function closeAllLanguagePickers(exceptPicker = null) {
  languagePickers.forEach((picker) => {
    if (picker !== exceptPicker) {
      setLanguagePickerOpen(picker, false);
    }
  });
}

function applyDocumentTranslations() {
  const root = document.documentElement;
  if (!root.hasAttribute("data-i18n-original-title")) {
    root.setAttribute("data-i18n-original-title", document.title);
  }

  const originalTitle = root.getAttribute("data-i18n-original-title") || document.title;
  document.title = currentLanguage === DEFAULT_LANGUAGE ? originalTitle : translateValue(originalTitle);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) return;

  const originalAttributeName = "data-i18n-original-content";
  if (!metaDescription.hasAttribute(originalAttributeName)) {
    metaDescription.setAttribute(originalAttributeName, metaDescription.getAttribute("content") || "");
  }

  const originalContent = metaDescription.getAttribute(originalAttributeName) || "";
  const translatedContent =
    currentLanguage === DEFAULT_LANGUAGE ? originalContent : translateValue(originalContent);

  metaDescription.setAttribute("content", translatedContent);
}

function applyRichHtmlTranslations() {
  const richElements = document.querySelectorAll("[data-i18n-rich]");

  richElements.forEach((element) => {
    if (!element.hasAttribute("data-i18n-original-html")) {
      element.setAttribute("data-i18n-original-html", element.innerHTML);
    }

    const key = element.getAttribute("data-i18n-rich");
    const translatedHtml = translationCatalog?.richHtml?.[currentLanguage]?.[key];

    element.innerHTML =
      currentLanguage === DEFAULT_LANGUAGE || !translatedHtml
        ? element.getAttribute("data-i18n-original-html") || ""
        : translatedHtml;
  });
}

function shouldSkipStaticTranslation(element) {
  return (
    element.closest(".entry-toggle") ||
    element.closest("[data-i18n-rich]") ||
    element.closest(".language-picker") ||
    element.closest(".preview-chip") ||
    element.closest("#storyCard") ||
    element.closest("#milestoneView") ||
    element.closest("#regionPanel") ||
    element.closest("#heroDots") ||
    element.matches("#railMessage, #heroTitle, #heroText, #heroPrimaryAction, #heroSecondaryAction, #donationResult")
  );
}

// Remember each original node so language changes never translate a translation.
const originalTextNodes = new WeakMap();
function applyTextTranslations() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!parent || parent.closest('script, style, noscript, .language-picker, .preview-chip, [aria-hidden="true"], [data-count], [data-copyright-year]') || shouldSkipStaticTranslation(parent)) continue;
    if (!normalizeTranslationKey(node.nodeValue)) continue;
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    const key = normalizeTranslationKey(original);
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    node.nodeValue = currentLanguage === DEFAULT_LANGUAGE ? original : leading + translateValue(key) + trailing;
  }
}

function applyAttributeTranslations() {
  const translatableAttributes = [
    { selector: "[aria-label]", attribute: "aria-label" },
    { selector: "img[alt]", attribute: "alt" },
    { selector: "[placeholder]", attribute: "placeholder" },
    { selector: "[title]", attribute: "title" }
  ];

  translatableAttributes.forEach(({ selector, attribute }) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (element.matches("#heroPhoto") || element.closest("#heroDots") || element.closest(".language-picker")) {
        return;
      }

      const originalAttributeName = `data-i18n-original-${attribute}`;
      if (!element.hasAttribute(originalAttributeName)) {
        const originalValue = element.getAttribute(attribute);
        if (!originalValue) return;
        element.setAttribute(originalAttributeName, originalValue);
      }

      const originalValue = element.getAttribute(originalAttributeName) || "";
      const translatedValue =
        currentLanguage === DEFAULT_LANGUAGE ? originalValue : translateValue(originalValue);

      element.setAttribute(attribute, translatedValue);
    });
  });
}

function syncCountersToLocale() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = Number(counter.dataset.count);
    const format = counter.dataset.format || "number";
    counter.textContent = formatCounterValue(target, format);
  });
}

function updateDonationResultText() {
  if (!donationRangeInput || !donationResult) return;
  donationResult.textContent = getDonationMessage(Number(donationRangeInput.value));
}

function renderRegionPanel(regionKey) {
  if (!regionPanel) return;

  const localizedRegions = getLocalizedRegions();
  const data = localizedRegions[regionKey];
  if (!data) return;

  regionPanel.innerHTML = `<h3>${data.title}</h3><p>${data.desc}</p><p>${data.stat}</p>`;
}

function syncActiveRegionPanel() {
  const activeRegionButton = document.querySelector(".region.active") || document.querySelector(".region");
  if (!activeRegionButton) return;

  activeRegionButton.classList.add("active");
  renderRegionPanel(activeRegionButton.dataset.region);
}

function syncLocalizedDynamicContent({ syncCounters = false } = {}) {
  renderRail();
  if (heroTitle && heroText && heroPhoto) {
    applyHeroSlide(heroIndex);
  }
  updateMilestone();
  updateStory();
  syncActiveRegionPanel();
  updateDonationResultText();
  if (syncCounters) {
    syncCountersToLocale();
  }
}

function applyLanguage(language, { persist = true, syncCounters = true } = {}) {
  const nextLanguage = supportedLanguageCodes.has(language) ? language : DEFAULT_LANGUAGE;

  currentLanguage = nextLanguage;
  currentLocale = getLocaleTag(nextLanguage);
  document.documentElement.lang = nextLanguage;

  if (persist) {
    storeLanguage(nextLanguage);
  }

  syncLanguageSelectors();
  applyDocumentTranslations();
  applyRichHtmlTranslations();
  syncLocalizedDynamicContent({ syncCounters });
  applyTextTranslations();
  applyAttributeTranslations();
  syncResearchBioControls();
}

function syncResearchBioControls() {
  document.querySelectorAll('.research-entry .entry-toggle').forEach((button) => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.textContent = translateValue(expanded ? 'Show less' : 'Read more');
  });
}

function initResearchBios() {
  const entries = document.querySelectorAll('.research-entry:not([hidden])');
  if (!entries.length) return;
  document.documentElement.classList.add('research-accordion-ready');
  entries.forEach((entry, index) => {
    const header = entry.querySelector('.entry-header > div');
    if (!header) return;
    header.classList.add('entry-copy');
    const meta = entry.querySelector('.entry-meta');
    if (meta) header.appendChild(meta);
    const body = document.createElement('div');
    body.className = 'research-entry-body';
    body.id = `research-entry-body-${index}`;
    body.inert = true;
    Array.from(entry.children).forEach((child) => {
      if (!child.classList.contains('entry-header')) body.appendChild(child);
    });
    entry.appendChild(body);
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'entry-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', body.id);
    toggle.addEventListener('click', () => {
      const expanded = entry.classList.toggle('is-expanded');
      toggle.setAttribute('aria-expanded', String(expanded));
      body.inert = !expanded;
      syncResearchBioControls();
    });
    header.appendChild(toggle);
  });
  syncResearchBioControls();
}

function initLanguageSelector() {
  const selects = document.querySelectorAll(".language-select");
  if (!selects.length) return;

  languagePickers = [];

  selects.forEach((select) => {
    if (!select.options.length) {
      supportedLanguages.forEach(({ code, label }) => {
        const meta = getLanguageMeta(code, label);
        const option = document.createElement("option");
        option.value = code;
        option.textContent = meta.label;
        select.appendChild(option);
      });
    }

    select.value = currentLanguage;
    select.classList.add("language-select-native");
    select.setAttribute("aria-hidden", "true");
    select.tabIndex = -1;

    const picker = document.createElement("div");
    picker.className = "language-picker";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "language-picker-toggle";
    toggle.setAttribute("aria-haspopup", "listbox");
    toggle.setAttribute("aria-expanded", "false");

    const flag = document.createElement("img");
    flag.className = "language-picker-flag";
    flag.width = 20;
    flag.height = 15;

    const label = document.createElement("span");
    label.className = "language-picker-text";

    const chevron = document.createElement("span");
    chevron.className = "language-picker-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "▾";

    toggle.append(flag, label, chevron);

    const menu = document.createElement("div");
    menu.className = "language-picker-menu";
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-label", translateValue("Select language"));

    const pickerOptions = [];

    supportedLanguages.forEach(({ code, label: rawLabel }) => {
      const meta = getLanguageMeta(code, rawLabel);
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.className = "language-picker-option";
      optionButton.dataset.language = code;
      optionButton.setAttribute("role", "option");

      const optionFlag = document.createElement("img");
      optionFlag.className = "language-picker-flag";
      optionFlag.src = meta.flagSrc;
      optionFlag.alt = "";
      optionFlag.width = 20;
      optionFlag.height = 15;

      const optionLabel = document.createElement("span");
      optionLabel.className = "language-picker-text";
      optionLabel.textContent = meta.label;

      optionButton.append(optionFlag, optionLabel);
      optionButton.addEventListener("click", () => {
        applyLanguage(code);
        setLanguagePickerOpen(pickerRef, false);
        toggle.focus();
      });

      menu.appendChild(optionButton);
      pickerOptions.push({ button: optionButton, code });
    });

    picker.append(toggle, menu);
    select.insertAdjacentElement("afterend", picker);

    const pickerRef = {
      root: picker,
      toggle,
      menu,
      flag,
      label,
      options: pickerOptions,
      select
    };

    toggle.addEventListener("click", () => {
      const willOpen = !picker.classList.contains("open");
      closeAllLanguagePickers(willOpen ? pickerRef : null);
      setLanguagePickerOpen(pickerRef, willOpen);
    });

    picker.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setLanguagePickerOpen(pickerRef, false);
        toggle.focus();
      }
    });

    languagePickers.push(pickerRef);
  });

  if (!languagePickerEventsBound) {
    document.addEventListener("click", (event) => {
      languagePickers.forEach((picker) => {
        if (!picker.root.contains(event.target)) {
          setLanguagePickerOpen(picker, false);
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAllLanguagePickers();
      }
    });

    languagePickerEventsBound = true;
  }
}

function initFooter() {
  document.querySelectorAll("[data-copyright-year]").forEach((year) => { year.textContent = String(new Date().getFullYear()); });
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const badges = footer.querySelector(".footer-badges");
  if (badges && !badges.querySelector("img[src*='.png']")) {
    badges.innerHTML = `
      <a href="https://globalgenes.org/" target="_blank" rel="noreferrer" aria-label="Global Genes member">
        <img src="global_genes.png" alt="Global Genes" />
      </a>
      <a href="https://rarediseases.org/" target="_blank" rel="noreferrer" aria-label="NORD member">
        <img src="nord_member.png" alt="NORD Member" />
      </a>
      <a href="https://everylifefoundation.org/" target="_blank" rel="noreferrer" aria-label="EveryLife Foundation member">
        <img src="community_congress_member.png" alt="EveryLife Foundation" />
      </a>
    `;
  }
}

function renderRail() {
  if (!railEl) return;
  const localizedMessages = getLocalizedCollection("railMessages", railMessages);
  railEl.textContent = localizedMessages[railIndex];
}

function cycleRail() {
  const localizedMessages = getLocalizedCollection("railMessages", railMessages);
  railIndex = (railIndex + 1) % localizedMessages.length;
  renderRail();
}

function renderHeroDots() {
  if (!heroDots) return;

  if (!heroDots.children.length) {
    heroSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => {
        goToHero(index);
      });
      heroDots.appendChild(dot);
    });
  }

  Array.from(heroDots.children).forEach((dot, index) => {
    const isActive = index === heroIndex;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-label", getSlideButtonLabel(index + 1));
    dot.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function applyHeroSlide(index) {
  if (!heroTitle || !heroText || !heroPhoto || !heroSection) return;

  const localizedSlides = getLocalizedCollection("heroSlides", heroSlides);
  const current = localizedSlides[index];

  heroTitle.textContent = current.title;
  heroText.textContent = current.text;
  heroPhoto.src = current.image;
  heroPhoto.alt = current.alt;

  if (current.backgroundImage) {
    heroSection.style.backgroundImage = `url('${current.backgroundImage}')`;
  } else {
    heroSection.style.backgroundImage = "url('man_daughter_zoo.webp')";
  }

  const actions = heroSlides[index].actions;
  ["heroPrimaryAction", "heroSecondaryAction"].forEach((id, actionIndex) => {
    const link = document.getElementById(id);
    if (!link) return;
    const [label, destination] = actions[actionIndex];
    link.textContent = translateValue(label);
    link.href = destination;
    link.setAttribute("data-i18n-original-text", label);
  });
  renderHeroDots();
}

function updateHero({ immediate = false } = {}) {
  if (!heroTitle || !heroText || !heroPhoto) return false;

  if (immediate) {
    applyHeroSlide(heroIndex);
    return true;
  }

  if (heroIsTransitioning) return false;

  heroIsTransitioning = true;
  heroSection?.classList.add("is-transitioning");

  window.setTimeout(() => {
    applyHeroSlide(heroIndex);
    requestAnimationFrame(() => {
      heroSection?.classList.remove("is-transitioning");
      window.setTimeout(() => {
        heroIsTransitioning = false;
      }, HERO_TRANSITION_MS);
    });
  }, HERO_TRANSITION_MS);

  return true;
}

function restartHeroCycle() {
  if (!heroTitle || !heroText || !heroPhoto) return;
  if (heroTimerId) window.clearInterval(heroTimerId);
  heroTimerId = window.setInterval(cycleHero, HERO_INTERVAL_MS);
}

function goToHero(index, { immediate = false } = {}) {
  if (!heroSlides.length) return false;

  const nextIndex = (index + heroSlides.length) % heroSlides.length;
  if (!immediate && (heroIsTransitioning || nextIndex === heroIndex)) return false;

  heroIndex = nextIndex;
  const didUpdate = updateHero({ immediate });

  if (didUpdate && !immediate) {
    restartHeroCycle();
  }

  return didUpdate;
}

function cycleHero() {
  goToHero(heroIndex + 1);
}

function preloadHeroImages() {
  if (!heroSection) return;

  heroSlides.forEach((slide) => {
    const img = new Image();
    img.src = slide.image;
  });
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".path-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === target);
      });
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const seen = new WeakSet();
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;

        seen.add(entry.target);
        entry.target.closest(".stat-card")?.classList.add("is-visible");
        const target = Number(entry.target.dataset.count);
        const format = entry.target.dataset.format || "number";
        const startValue =
          Number(String(entry.target.textContent || "").replace(/[^0-9-]/g, "")) || 0;
        const duration = 1500;
        let startTime;

        const tick = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(startValue + (target - startValue) * easedProgress);
          entry.target.textContent = formatCounterValue(current, format);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function updateMilestone() {
  if (!milestoneView) return;
  const localizedMilestones = getLocalizedCollection("milestones", milestones);
  const data = localizedMilestones[milestoneIndex];
  milestoneView.innerHTML = `<h3>${data.year} - ${data.title}</h3><p>${data.body}</p>`;
}

function updateStory() {
  if (!storyCard) return;
  const localizedStories = getLocalizedCollection("stories", stories);
  const story = localizedStories[storyIndex];
  const storyImage = stories[storyIndex]?.image;
  storyCard.style.backgroundImage = `url('${storyImage}')`;
  storyCard.innerHTML = `
    <div class="story-copy">
      <p class="story-quote">&ldquo;${story.quote}&rdquo;</p>
      <p class="story-byline">${story.byline}</p>
      <a class="story-read-more" href="stories.html">${translateValue("READ THE FULL STORY")}</a>
    </div>`;
}

function initRegions() {
  const buttons = document.querySelectorAll(".region");
  if (!buttons.length || !regionPanel) return;

  if (!document.querySelector(".region.active")) {
    buttons[0].classList.add("active");
    renderRegionPanel(buttons[0].dataset.region);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderRegionPanel(button.dataset.region);
    });
  });
}

function initDonationRange() {
  if (!donationRangeInput || !donationResult) return;

  donationRangeInput.addEventListener("input", () => {
    updateDonationResultText();
  });

  updateDonationResultText();
}

function initMobileMenu() {
  const toggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initReveals() {
  // Long permanent sections must remain readable without scroll-triggered animation.
  if (document.querySelector('.who-page, .research-strategy, .resources-page')) return;
  const sections = document.querySelectorAll("main > section");
  if (!sections.length) return;

  sections.forEach((section) => section.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}

currentLanguage = getStoredLanguage();
currentLocale = getLocaleTag(currentLanguage);
currentPreviewTheme = getPreviewTheme();

initPreviewTheme();

if (heroTitle && heroText && heroPhoto) {
  preloadHeroImages();
}

initFooter();
initResearchBios();
initLanguageSelector();
applyLanguage(currentLanguage, { persist: false, syncCounters: false });
initTabs();
initCounters();
initRegions();
initDonationRange();
initMobileMenu();
initReveals();

if (railEl) {
  window.setInterval(cycleRail, 4500);
}

if (heroTitle && heroText && heroPhoto) {
  restartHeroCycle();
}

const prevMilestoneButton = document.querySelector("#prevMilestone");
const nextMilestoneButton = document.querySelector("#nextMilestone");
const prevStoryButton = document.querySelector("#prevStory");
const nextStoryButton = document.querySelector("#nextStory");

if (prevMilestoneButton) {
  prevMilestoneButton.addEventListener("click", () => {
    milestoneIndex = (milestoneIndex - 1 + milestones.length) % milestones.length;
    updateMilestone();
  });
}

if (nextMilestoneButton) {
  nextMilestoneButton.addEventListener("click", () => {
    milestoneIndex = (milestoneIndex + 1) % milestones.length;
    updateMilestone();
  });
}

if (prevStoryButton) {
  prevStoryButton.addEventListener("click", () => {
    storyIndex = (storyIndex - 1 + stories.length) % stories.length;
    updateStory();
  });
}

if (nextStoryButton) {
  nextStoryButton.addEventListener("click", () => {
    storyIndex = (storyIndex + 1) % stories.length;
    updateStory();
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const formData = new FormData(newsletterForm);

    if (submitButton) {
      submitButton.disabled = true;
    }
    if (newsletterStatus) {
      newsletterStatus.textContent = translateValue("Signing you up...");
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          website: formData.get("website"),
        }),
      });

      if (!response.ok) {
        throw new Error("Newsletter submission failed");
      }

      newsletterForm.reset();
      if (newsletterStatus) {
        newsletterStatus.textContent = translateValue("Thanks for signing up for cureEDMD updates!");
      }
    } catch (error) {
      if (newsletterStatus) {
        newsletterStatus.textContent = translateValue("We couldn't sign you up right now. Please try again.");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

initStyleLabPreview();

