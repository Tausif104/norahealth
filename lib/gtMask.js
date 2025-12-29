// gtMask.js
let maskEl = null;

export function showGtMask() {
  if (typeof document === "undefined") return;

  if (!maskEl) {
    maskEl = document.createElement("div");
    maskEl.className = "gt-mask";
    maskEl.setAttribute("aria-hidden", "true");
  }

  if (!document.body.contains(maskEl)) {
    document.body.appendChild(maskEl);
  }
}

export function hideGtMask() {
  if (typeof document === "undefined") return;
  if (maskEl && document.body.contains(maskEl)) {
    document.body.removeChild(maskEl);
  }
}
