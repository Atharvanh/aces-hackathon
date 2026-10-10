/**
 * Fullscreen & Landscape Enforcement for Phones & Tablets
 * Shows a full-screen pop-up on mobile/tablet devices prompting them
 * to enter fullscreen landscape mode.
 * Desktops and laptops never see this popup.
 */

export function isMobileOrTablet() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent || "";
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  const isIPad = (navigator.platform === "MacIntel" || ua.includes("Macintosh")) && navigator.maxTouchPoints > 1;
  const isTouchDevice = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);
  const hasCoarsePointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  const hasFinePointerWithHover = window.matchMedia && window.matchMedia("(pointer: fine) and (hover: hover)").matches;

  // Direct mobile/tablet matching
  if (isMobileUA || isIPad) {
    return true;
  }

  // Pure touch screen device without mouse/hover capability
  if (isTouchDevice && hasCoarsePointer && !hasFinePointerWithHover) {
    return true;
  }

  return false;
}

export function isFullscreen() {
  return Boolean(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

export function isLandscape() {
  if (screen.orientation && screen.orientation.type) {
    return screen.orientation.type.startsWith("landscape");
  }
  return window.innerWidth > window.innerHeight;
}

export async function requestFullscreen(element = document.documentElement) {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
    }
  } catch (_) {}

  // Attempt forceful orientation lock to landscape
  if (screen.orientation && typeof screen.orientation.lock === "function") {
    screen.orientation.lock("landscape").catch(() => {});
  }
}

export function updatePopupVisibility() {
  const popup = document.getElementById("fullscreen-popup");
  if (!popup) return;

  // Rule 1: PC and Laptops NEVER see this popup
  if (!isMobileOrTablet()) {
    popup.hidden = true;
    popup.style.display = "none";
    document.body.classList.remove("has-fullscreen-popup");
    return;
  }

  // Rule 2: On Phone / Tablet:
  // If already in fullscreen AND in landscape: hide popup!
  const inFullscreen = isFullscreen();
  const inLandscape = isLandscape();

  if (inFullscreen && inLandscape) {
    popup.hidden = true;
    popup.style.display = "none";
    document.body.classList.remove("has-fullscreen-popup");
  } else {
    // Show popup to force/guide them into fullscreen landscape
    popup.hidden = false;
    popup.style.display = "flex";
    document.body.classList.add("has-fullscreen-popup");
  }
}

export function initFullscreen() {
  const actionBtn = document.getElementById("popup-fullscreen-btn");

  const handleAction = async (e) => {
    e?.stopPropagation?.();
    await requestFullscreen();
    // After entering fullscreen, update visibility
    setTimeout(updatePopupVisibility, 150);
  };

  actionBtn?.addEventListener("click", handleAction);
  actionBtn?.addEventListener("touchend", handleAction);

  // Fullscreen change events across all vendor prefixes
  ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach((evt) => {
    document.addEventListener(evt, updatePopupVisibility);
  });

  // Orientation changes
  if (screen.orientation) {
    screen.orientation.addEventListener("change", updatePopupVisibility);
  }
  window.addEventListener("orientationchange", updatePopupVisibility);
  window.matchMedia("(orientation: landscape)").addEventListener("change", updatePopupVisibility);
  window.addEventListener("resize", updatePopupVisibility);

  // Initial check
  updatePopupVisibility();
}
