const STYLE_LAB_STORAGE_KEY = "cureedmd-style-lab-state";
const STYLE_LAB_MESSAGE_READY = "cureedmd-style-lab:ready";
const STYLE_LAB_MESSAGE_UPDATE = "cureedmd-style-lab:update";
const STYLE_LAB_PREVIEW_URL = "index.html?theme=classic&styleLab=1";

const VIEWPORTS = {
  desktop: { label: "Desktop", width: 1440 },
  tablet: { label: "Tablet", width: 834 },
  mobile: { label: "Mobile", width: 390 }
};

const COLOR_CONTROLS = [
  { id: "bg", label: "Background" },
  { id: "ink", label: "Text" },
  { id: "inkSoft", label: "Muted text" },
  { id: "card", label: "Surface" },
  { id: "line", label: "Border" },
  { id: "accentA", label: "Accent A" },
  { id: "accentB", label: "Accent B" },
  { id: "accentC", label: "Accent C" }
];

const DEPTH_CONTROLS = [
  { id: "surfaceRadius", label: "Surface radius", min: 8, max: 28, step: 1, unit: "px" },
  { id: "cardShadowStrength", label: "Card shadow strength", min: 0, max: 100, step: 1, unit: "%" },
  { id: "buttonShadowStrength", label: "Button shadow strength", min: 0, max: 100, step: 1, unit: "%" }
];

const ATMOSPHERE_CONTROLS = [
  { id: "pageGlowIntensity", label: "Page glow intensity", min: 0, max: 100, step: 1, unit: "%" },
  { id: "headerTintOpacity", label: "Header tint opacity", min: 0, max: 100, step: 1, unit: "%" },
  { id: "footerTintIntensity", label: "Footer tint intensity", min: 0, max: 100, step: 1, unit: "%" }
];

const CSS_EXPORT_ORDER = [
  "--bg",
  "--ink",
  "--ink-soft",
  "--sea",
  "--coral",
  "--sun",
  "--card",
  "--line",
  "--shadow",
  "--sea-rgb",
  "--coral-rgb",
  "--sun-rgb",
  "--ink-rgb",
  "--page-glow-1",
  "--page-glow-2",
  "--page-glow-3",
  "--top-rail-start",
  "--top-rail-end",
  "--header-bg",
  "--header-shadow",
  "--surface-radius",
  "--surface-shadow",
  "--btn-solid-start",
  "--btn-solid-end",
  "--btn-solid-shadow",
  "--btn-solid-shadow-hover",
  "--hero-backdrop-start",
  "--hero-backdrop-end",
  "--footer-bg-start",
  "--footer-bg-end",
  "--footer-border",
  "--footer-link",
  "--footer-link-underline"
];

const DEFAULT_STATE = {
  colors: {
    bg: "#fcf7f9",
    ink: "#241c25",
    inkSoft: "#625667",
    card: "#ffffff",
    line: "#ead8df",
    accentA: "#3aafdc",
    accentB: "#e94f58",
    accentC: "#859ebc"
  },
  sliders: {
    surfaceRadius: 16,
    cardShadowStrength: 55,
    buttonShadowStrength: 60,
    pageGlowIntensity: 60,
    headerTintOpacity: 92,
    footerTintIntensity: 70
  },
  viewport: "desktop"
};

const refs = {
  paletteControls: document.querySelector("#paletteControls"),
  depthControls: document.querySelector("#depthControls"),
  atmosphereControls: document.querySelector("#atmosphereControls"),
  viewportButtons: document.querySelector("#viewportButtons"),
  previewFrame: document.querySelector("#styleLabPreview"),
  cssExport: document.querySelector("#cssExport"),
  resetLab: document.querySelector("#resetLab"),
  openPreviewTab: document.querySelector("#openPreviewTab"),
  copyCss: document.querySelector("#copyCss"),
  downloadPreset: document.querySelector("#downloadPreset"),
  status: document.querySelector("#labStatus")
};

const controlRefs = {
  colors: {},
  sliders: {},
  viewportButtons: {}
};

let styleState = loadState();
let detachedPreviewWindow = null;
let statusTimerId = null;

function getDefaultState() {
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(value, digits = 3) {
  return String(Number(value.toFixed(digits)));
}

function normalizeHex(value) {
  const raw = String(value || "").trim().replace(/^#/, "");
  if (!raw) return "";

  if (/^[0-9a-f]{3}$/i.test(raw)) {
    return `#${raw
      .split("")
      .map((char) => `${char}${char}`)
      .join("")
      .toLowerCase()}`;
  }

  if (/^[0-9a-f]{6}$/i.test(raw)) {
    return `#${raw.toLowerCase()}`;
  }

  return "";
}

function hexToRgbArray(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return [0, 0, 0];

  return [
    Number.parseInt(normalized.slice(1, 3), 16),
    Number.parseInt(normalized.slice(3, 5), 16),
    Number.parseInt(normalized.slice(5, 7), 16)
  ];
}

function rgbCsv(hex) {
  return hexToRgbArray(hex).join(", ");
}

function rgba(hex, alpha) {
  const [r, g, b] = hexToRgbArray(hex);
  return `rgba(${r}, ${g}, ${b}, ${formatNumber(clamp(alpha, 0, 1))})`;
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHex(firstHex, secondHex, ratio) {
  const t = clamp(ratio, 0, 1);
  const [r1, g1, b1] = hexToRgbArray(firstHex);
  const [r2, g2, b2] = hexToRgbArray(secondHex);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

function buildDualShadow({ y, blur, blur2, alpha1, alpha2, neutralHex, accentHex }) {
  return `0 ${Math.round(y)}px ${Math.round(blur)}px ${rgba(neutralHex, alpha1)}, 0 3px ${Math.round(blur2)}px ${rgba(accentHex, alpha2)}`;
}

function normalizeState(candidate) {
  const next = getDefaultState();
  const source = candidate && typeof candidate === "object" ? candidate : {};

  if (source.viewport && Object.prototype.hasOwnProperty.call(VIEWPORTS, source.viewport)) {
    next.viewport = source.viewport;
  }

  COLOR_CONTROLS.forEach(({ id }) => {
    const normalized = normalizeHex(source.colors?.[id]);
    if (normalized) {
      next.colors[id] = normalized;
    }
  });

  [...DEPTH_CONTROLS, ...ATMOSPHERE_CONTROLS].forEach(({ id, min, max }) => {
    const value = Number(source.sliders?.[id]);
    if (Number.isFinite(value)) {
      next.sliders[id] = clamp(value, min, max);
    }
  });

  return next;
}

function loadState() {
  try {
    const stored = window.localStorage.getItem(STYLE_LAB_STORAGE_KEY);
    if (!stored) return getDefaultState();
    return normalizeState(JSON.parse(stored));
  } catch {
    return getDefaultState();
  }
}

function persistState() {
  try {
    window.localStorage.setItem(STYLE_LAB_STORAGE_KEY, JSON.stringify(styleState));
  } catch {
    // Ignore storage errors in the local tool.
  }
}

function buildResolvedVariables(state) {
  const { colors, sliders } = state;
  const glowRatio = sliders.pageGlowIntensity / 100;
  const headerOpacity = sliders.headerTintOpacity / 100;
  const footerRatio = sliders.footerTintIntensity / 100;
  const shadowRatio = sliders.cardShadowStrength / 100;
  const buttonRatio = sliders.buttonShadowStrength / 100;

  const accentA = colors.accentA;
  const accentB = colors.accentB;
  const accentC = colors.accentC;
  const glowBlend = mixHex(accentB, accentC, 0.62);
  const topRailStart = mixHex(accentB, accentC, 0.35);
  const headerTintBase = mixHex(colors.bg, colors.card, 0.78);
  const buttonEnd = mixHex(accentB, accentC, 0.35);

  const surfaceShadow = buildDualShadow({
    y: 8 + sliders.cardShadowStrength * 0.18,
    blur: 16 + sliders.cardShadowStrength * 0.36,
    blur2: 6 + sliders.cardShadowStrength * 0.11,
    alpha1: 0.04 + shadowRatio * 0.08,
    alpha2: 0.02 + shadowRatio * 0.06,
    neutralHex: colors.ink,
    accentHex: accentA
  });

  const buttonShadow = buildDualShadow({
    y: 8 + sliders.buttonShadowStrength * 0.1,
    blur: 16 + sliders.buttonShadowStrength * 0.2,
    blur2: 6 + sliders.buttonShadowStrength * 0.1,
    alpha1: 0.08 + buttonRatio * 0.12,
    alpha2: 0.05 + buttonRatio * 0.09,
    neutralHex: accentB,
    accentHex: accentC
  });

  const buttonShadowHover = buildDualShadow({
    y: 12 + sliders.buttonShadowStrength * 0.1,
    blur: 20 + sliders.buttonShadowStrength * 0.2,
    blur2: 8 + sliders.buttonShadowStrength * 0.1,
    alpha1: 0.12 + buttonRatio * 0.12,
    alpha2: 0.07 + buttonRatio * 0.09,
    neutralHex: accentB,
    accentHex: accentC
  });

  return {
    "--bg": colors.bg,
    "--ink": colors.ink,
    "--ink-soft": colors.inkSoft,
    "--sea": accentA,
    "--coral": accentB,
    "--sun": accentC,
    "--card": colors.card,
    "--line": colors.line,
    "--shadow": surfaceShadow,
    "--sea-rgb": rgbCsv(accentA),
    "--coral-rgb": rgbCsv(accentB),
    "--sun-rgb": rgbCsv(accentC),
    "--ink-rgb": rgbCsv(colors.ink),
    "--page-glow-1": rgba(accentB, 0.02 + glowRatio * 0.1),
    "--page-glow-2": rgba(accentA, 0.03 + glowRatio * 0.15),
    "--page-glow-3": rgba(glowBlend, 0.02 + glowRatio * 0.1),
    "--top-rail-start": topRailStart,
    "--top-rail-end": accentC,
    "--header-bg": rgba(headerTintBase, headerOpacity),
    "--header-shadow": `0 ${Math.round(4 + sliders.cardShadowStrength * 0.11)}px ${Math.round(12 + sliders.cardShadowStrength * 0.29)}px ${rgba(colors.ink, 0.04 + shadowRatio * 0.04)}`,
    "--surface-radius": `${Math.round(sliders.surfaceRadius)}px`,
    "--surface-shadow": surfaceShadow,
    "--btn-solid-start": accentB,
    "--btn-solid-end": buttonEnd,
    "--btn-solid-shadow": buttonShadow,
    "--btn-solid-shadow-hover": buttonShadowHover,
    "--hero-backdrop-start": rgba(accentB, 0.1 + glowRatio * 0.2),
    "--hero-backdrop-end": rgba(accentA, 0.06 + glowRatio * 0.2),
    "--footer-bg-start": rgba(accentB, 0.03 + footerRatio * 0.128571),
    "--footer-bg-end": rgba(accentA, 0.04 + footerRatio * 0.2),
    "--footer-border": rgba(accentC, 0.08 + footerRatio * 0.285714),
    "--footer-link": rgba(colors.ink, 0.48 + footerRatio * 0.34),
    "--footer-link-underline": rgba(colors.ink, 0.1 + footerRatio * 0.17)
  };
}

function buildCssExport(variables) {
  const lines = CSS_EXPORT_ORDER.map((name) => `  ${name}: ${variables[name]};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

function setStatus(message) {
  if (!refs.status) return;
  refs.status.textContent = message;

  if (statusTimerId) {
    window.clearTimeout(statusTimerId);
  }

  statusTimerId = window.setTimeout(() => {
    refs.status.textContent = "";
  }, 2400);
}

function syncColorControl(id) {
  const ref = controlRefs.colors[id];
  if (!ref) return;

  const value = styleState.colors[id];
  ref.color.value = value;
  ref.hex.value = value.toUpperCase();
}

function syncSliderControl(id) {
  const ref = controlRefs.sliders[id];
  if (!ref) return;

  const value = styleState.sliders[id];
  ref.input.value = String(value);
  ref.output.textContent = `${Math.round(value)}${ref.unit}`;
}

function syncViewportButtons() {
  Object.entries(controlRefs.viewportButtons).forEach(([id, button]) => {
    const isActive = id === styleState.viewport;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  if (refs.previewFrame) {
    refs.previewFrame.style.width = `${VIEWPORTS[styleState.viewport].width}px`;
  }
}

function syncControls() {
  COLOR_CONTROLS.forEach(({ id }) => syncColorControl(id));
  [...DEPTH_CONTROLS, ...ATMOSPHERE_CONTROLS].forEach(({ id }) => syncSliderControl(id));
  syncViewportButtons();
}

function sendPreviewUpdate(targetWindow = null) {
  const message = {
    type: STYLE_LAB_MESSAGE_UPDATE,
    payload: {
      variables: buildResolvedVariables(styleState),
      viewport: styleState.viewport
    }
  };

  const targets = targetWindow ? [targetWindow] : [refs.previewFrame?.contentWindow, detachedPreviewWindow];
  targets.forEach((currentWindow) => {
    if (!currentWindow || currentWindow.closed) return;
    currentWindow.postMessage(message, "*");
  });
}

function syncExportAndPreview() {
  const variables = buildResolvedVariables(styleState);
  if (refs.cssExport) {
    refs.cssExport.value = buildCssExport(variables);
  }
  sendPreviewUpdate();
}

function commitState({ persist = true, announce = "" } = {}) {
  syncControls();
  syncExportAndPreview();

  if (persist) {
    persistState();
  }

  if (announce) {
    setStatus(announce);
  }
}

function setColorValue(id, value) {
  const normalized = normalizeHex(value);
  if (!normalized) return false;

  styleState.colors[id] = normalized;
  commitState();
  return true;
}

function setSliderValue(id, value) {
  const definition = [...DEPTH_CONTROLS, ...ATMOSPHERE_CONTROLS].find((item) => item.id === id);
  if (!definition) return;

  styleState.sliders[id] = clamp(Number(value), definition.min, definition.max);
  commitState();
}

function setViewport(viewport) {
  if (!Object.prototype.hasOwnProperty.call(VIEWPORTS, viewport)) return;
  styleState.viewport = viewport;
  commitState();
}

function resetToDefaults() {
  styleState = getDefaultState();
  commitState({ announce: "Reset to the current v3 defaults." });
}

function handlePreviewReady(event) {
  if (!event.data || event.data.type !== STYLE_LAB_MESSAGE_READY) return;

  const source = event.source;
  if (source === refs.previewFrame?.contentWindow || source === detachedPreviewWindow) {
    sendPreviewUpdate(source);
  }
}

function copyCssExport() {
  if (!refs.cssExport) return;

  const text = refs.cssExport.value;
  if (!text) return;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => setStatus("Copied the resolved CSS block."))
      .catch(() => {
        refs.cssExport.select();
        document.execCommand("copy");
        setStatus("Copied the resolved CSS block.");
      });
    return;
  }

  refs.cssExport.select();
  document.execCommand("copy");
  setStatus("Copied the resolved CSS block.");
}

function downloadPreset() {
  const preset = {
    colors: styleState.colors,
    sliders: styleState.sliders,
    viewport: styleState.viewport
  };

  const blob = new Blob([JSON.stringify(preset, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cureedmd-style-lab-preset.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStatus("Downloaded the raw preset JSON.");
}

function openDetachedPreview() {
  detachedPreviewWindow = window.open(STYLE_LAB_PREVIEW_URL, "cureedmd-style-lab-preview");

  if (!detachedPreviewWindow) {
    setStatus("The preview tab was blocked by the browser.");
    return;
  }

  detachedPreviewWindow.focus();
  window.setTimeout(() => sendPreviewUpdate(detachedPreviewWindow), 250);
  setStatus("Opened the homepage preview in a new tab.");
}

function createColorControl(definition) {
  const field = document.createElement("div");
  field.className = "control-field";

  const labelRow = document.createElement("div");
  labelRow.className = "control-label";

  const label = document.createElement("label");
  label.setAttribute("for", `color-${definition.id}`);
  label.textContent = definition.label;
  labelRow.appendChild(label);

  const inputs = document.createElement("div");
  inputs.className = "color-inputs";

  const colorInput = document.createElement("input");
  colorInput.id = `color-${definition.id}`;
  colorInput.className = "native-color";
  colorInput.type = "color";

  const hexInput = document.createElement("input");
  hexInput.id = `hex-${definition.id}`;
  hexInput.className = "hex-input";
  hexInput.type = "text";
  hexInput.inputMode = "text";
  hexInput.spellcheck = false;
  hexInput.setAttribute("aria-label", `${definition.label} hex value`);

  colorInput.addEventListener("input", () => {
    setColorValue(definition.id, colorInput.value);
  });

  const commitHex = () => {
    if (!setColorValue(definition.id, hexInput.value)) {
      hexInput.value = styleState.colors[definition.id].toUpperCase();
    }
  };

  hexInput.addEventListener("change", commitHex);
  hexInput.addEventListener("blur", commitHex);
  hexInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      hexInput.blur();
    }
  });

  inputs.append(colorInput, hexInput);
  field.append(labelRow, inputs);

  controlRefs.colors[definition.id] = { color: colorInput, hex: hexInput };
  syncColorControl(definition.id);

  return field;
}

function createSliderControl(definition) {
  const field = document.createElement("div");
  field.className = "control-field";

  const header = document.createElement("div");
  header.className = "slider-header";

  const label = document.createElement("label");
  label.setAttribute("for", `slider-${definition.id}`);
  label.textContent = definition.label;

  const output = document.createElement("output");
  output.className = "slider-value";
  output.setAttribute("for", `slider-${definition.id}`);

  header.append(label, output);

  const input = document.createElement("input");
  input.id = `slider-${definition.id}`;
  input.className = "slider-input";
  input.type = "range";
  input.min = String(definition.min);
  input.max = String(definition.max);
  input.step = String(definition.step);
  input.addEventListener("input", () => {
    setSliderValue(definition.id, input.value);
  });

  field.append(header, input);

  controlRefs.sliders[definition.id] = { input, output, unit: definition.unit };
  syncSliderControl(definition.id);

  return field;
}

function renderControls() {
  COLOR_CONTROLS.forEach((definition) => {
    refs.paletteControls?.appendChild(createColorControl(definition));
  });

  DEPTH_CONTROLS.forEach((definition) => {
    refs.depthControls?.appendChild(createSliderControl(definition));
  });

  ATMOSPHERE_CONTROLS.forEach((definition) => {
    refs.atmosphereControls?.appendChild(createSliderControl(definition));
  });

  Object.entries(VIEWPORTS).forEach(([id, data]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lab-action";
    button.textContent = `${data.label} ${data.width}`;
    button.addEventListener("click", () => {
      setViewport(id);
    });

    refs.viewportButtons?.appendChild(button);
    controlRefs.viewportButtons[id] = button;
  });

  syncViewportButtons();
}

function bindActions() {
  refs.resetLab?.addEventListener("click", () => {
    resetToDefaults();
  });

  refs.openPreviewTab?.addEventListener("click", () => {
    openDetachedPreview();
  });

  refs.copyCss?.addEventListener("click", () => {
    copyCssExport();
  });

  refs.downloadPreset?.addEventListener("click", () => {
    downloadPreset();
  });

  refs.previewFrame?.addEventListener("load", () => {
    window.setTimeout(() => sendPreviewUpdate(refs.previewFrame?.contentWindow), 120);
  });

  window.addEventListener("message", handlePreviewReady);
}

function init() {
  renderControls();
  bindActions();
  commitState({ persist: false });
}

init();
