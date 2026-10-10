import { state } from "../../shared/state.js";
import {
  aboutOverlay,
  creditsPanel,
  faqOverlay,
  notice,
} from "../../shared/dom.js";
import { syncMusicState } from "../../shared/audio.js";

export function closeCredits() {
  if (state.creditsAnimation) state.creditsAnimation.cancel();
  state.creditsAnimation = null;
  creditsPanel.hidden = true;
  syncMusicState();
}

export function startCreditsRoll() {
  const viewport = creditsPanel.querySelector(".credits-viewport");
  const roll = creditsPanel.querySelector(".credits-roll");
  const playback = creditsPanel.querySelector(".credits-playback");
  if (state.creditsAnimation) state.creditsAnimation.cancel();
  viewport.scrollTop = 0;
  const height = viewport.clientHeight;
  roll.style.setProperty("--credits-height", height + "px");
  playback.textContent = "Pause";
  playback.setAttribute("aria-label", "Pause scrolling credits");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  playback.hidden = reduced;
  viewport.classList.toggle("manual-credits", reduced);
  if (reduced) {
    state.creditsAnimation = null;
    return;
  }
  const distance = Math.max(0, roll.scrollHeight - height);
  state.creditsAnimation = roll.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(-" + distance + "px)" },
    ],
    {
      delay: 0,
      duration: (distance / 32) * 1000,
      easing: "linear",
      fill: "forwards",
    },
  );
  state.creditsAnimation.onfinish = () => {
    playback.textContent = "Replay";
    playback.setAttribute("aria-label", "Replay credits");
  };
}

export function openCredits() {
  notice.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  faqOverlay.hidden = true;
  creditsPanel.hidden = false;
  startCreditsRoll();
  creditsPanel.querySelector(".credits-close").focus({ preventScroll: true });
  syncMusicState();
}

export function creditsPlayback() {
  if (!state.creditsAnimation) return;
  const control = creditsPanel.querySelector(".credits-playback");
  if (state.creditsAnimation.playState === "finished") {
    startCreditsRoll();
    return;
  }
  if (state.creditsAnimation.playState === "paused") {
    state.creditsAnimation.play();
    control.textContent = "Pause";
    control.setAttribute("aria-label", "Pause scrolling credits");
  } else {
    state.creditsAnimation.pause();
    control.textContent = "Resume";
    control.setAttribute("aria-label", "Resume scrolling credits");
  }
}
