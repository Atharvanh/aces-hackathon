import { state } from "../../shared/state.js";
import { syncMusicState } from "../../shared/audio.js";

// Keep the intro brief, and never block entry on a slow third-party resource.
const INTRO_DURATION = 3400;
const MAX_WAIT = 7000;

export function initPreloader() {
  const overlay = document.getElementById("aces-preloader");
  if (!overlay) return;
  const main = document.querySelector("main");
  const bar = overlay.querySelector(".preloader-bar");
  const label = overlay.querySelector(".preloader-percentage");
  const caption = overlay.querySelector(".preloader-caption");
  const skip = overlay.querySelector(".preloader-skip");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const duration = reducedMotion ? 0 : INTRO_DURATION;
  const startedAt = performance.now();
  let ready = document.readyState === "complete";
  let frame;
  let finished = false;
  let lastProgress = -1;
  const previousInert = main.inert;

  state.isPreloaderActive = true;
  main.inert = true;
  overlay.hidden = false;

  function render(value) {
    const progress = Math.round(value);
    if (progress === lastProgress) return;
    lastProgress = progress;
    overlay.style.setProperty("--load-progress", `${progress}%`);
    bar.setAttribute("aria-valuenow", String(progress));
    label.textContent = `${progress}%`;
  }

  function finish() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frame);
    clearTimeout(failsafe);
    window.removeEventListener("load", onReady);
    window.removeEventListener("keydown", onKey, true);
    skip.removeEventListener("click", finish);
    render(100);
    caption.textContent = "Crew ready. Let's go!";
    window.setTimeout(
      () => {
        overlay.classList.add("is-leaving");
        main.inert = previousInert;
        state.isPreloaderActive = false;
        if (overlay.contains(document.activeElement)) {
          document
            .querySelector('[data-page="0"]')
            .focus({ preventScroll: true });
        }
        syncMusicState();
        window.setTimeout(
          () => {
            overlay.hidden = true;
          },
          reducedMotion ? 0 : 280,
        );
      },
      reducedMotion ? 0 : 180,
    );
  }

  function onReady() {
    ready = true;
  }

  function onKey(event) {
    // Prevent console shortcuts from activating the page behind the intro.
    if (event.key === "Escape") {
      event.preventDefault();
      finish();
    }
    event.stopPropagation();
  }

  function tick(now) {
    const elapsed = now - startedAt;
    const fraction = duration ? Math.min(elapsed / duration, 1) : 1;
    // This is intro progress; the last step waits for the page load event.
    render((1 - Math.pow(1 - fraction, 1.2)) * (ready ? 100 : 90));
    if (fraction === 1 && ready) finish();
    else frame = requestAnimationFrame(tick);
  }

  const failsafe = window.setTimeout(finish, MAX_WAIT);
  window.addEventListener("load", onReady, { once: true });
  window.addEventListener("keydown", onKey, true);
  skip.addEventListener("click", finish);
  frame = requestAnimationFrame(tick);
}
