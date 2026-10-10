/**
 * Fullscreen & Orientation Management
 * Automatically attempts fullscreen on landscape switch when permitted,
 * provides dedicated fullscreen buttons, and hides them when in fullscreen mode.
 */

let pendingAutoFullscreen = false;
let userExitedFullscreen = false;

export function isFullscreen() {
  return Boolean(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
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

    if (screen.orientation && typeof screen.orientation.lock === "function") {
      screen.orientation.lock("landscape").catch(() => {});
    }
    return true;
  } catch (err) {
    return false;
  }
}

export function isLandscape() {
  if (screen.orientation && screen.orientation.type) {
    return screen.orientation.type.startsWith("landscape");
  }
  return window.innerWidth > window.innerHeight;
}

export function updateFullscreenUI() {
  const active = isFullscreen();
  document.body.classList.toggle("is-fullscreen", active);

  const toggleBtn = document.getElementById("fullscreen-toggle-btn");
  const portraitBtn = document.getElementById("portrait-fullscreen-btn");

  if (toggleBtn) {
    toggleBtn.hidden = active;
  }
  if (portraitBtn) {
    portraitBtn.hidden = active;
  }
}

function handleOrientationChange() {
  const landscape = isLandscape();
  if (landscape && !isFullscreen() && !userExitedFullscreen) {
    requestFullscreen().then((success) => {
      if (!success) {
        pendingAutoFullscreen = true;
      }
    });
  }
  updateFullscreenUI();
}

function handleUserGesture() {
  if (pendingAutoFullscreen && isLandscape() && !isFullscreen() && !userExitedFullscreen) {
    pendingAutoFullscreen = false;
    requestFullscreen();
  }
}

function onFullscreenChange() {
  const active = isFullscreen();
  if (!active) {
    userExitedFullscreen = true;
  } else {
    userExitedFullscreen = false;
    pendingAutoFullscreen = false;
  }
  updateFullscreenUI();
}

export function initFullscreen() {
  const toggleBtn = document.getElementById("fullscreen-toggle-btn");
  const portraitBtn = document.getElementById("portrait-fullscreen-btn");

  const enterFS = (e) => {
    e?.stopPropagation?.();
    userExitedFullscreen = false;
    pendingAutoFullscreen = false;
    requestFullscreen();
  };

  toggleBtn?.addEventListener("click", enterFS);
  portraitBtn?.addEventListener("click", enterFS);

  // Fullscreen change events across all vendor prefixes
  ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].forEach((evt) => {
    document.addEventListener(evt, onFullscreenChange);
  });

  // Orientation change listeners
  if (screen.orientation) {
    screen.orientation.addEventListener("change", handleOrientationChange);
  }
  window.addEventListener("orientationchange", handleOrientationChange);
  window.matchMedia("(orientation: landscape)").addEventListener("change", handleOrientationChange);
  window.addEventListener("resize", updateFullscreenUI);

  // User gesture listener for pending auto-fullscreen on mobile
  ["pointerdown", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, handleUserGesture, { passive: true });
  });

  updateFullscreenUI();
}
