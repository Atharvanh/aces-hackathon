import { homeVideo, homeVideoClose } from "../../shared/dom.js";
import { state } from "../../shared/state.js";
import { bgMusic, fadeMusic, syncMusicState } from "../../shared/audio.js";

export function playHomeVideo() {
  if (!homeVideo) return;
  state.isHomeVideoPlaying = true;
  homeVideo.hidden = false;
  void homeVideo.offsetWidth;
  homeVideo.classList.add("is-active");
  if (homeVideoClose) homeVideoClose.hidden = false;
  homeVideo.currentTime = 0;
  homeVideo.muted = state.isMuted;

  // Duck background music while the video plays
  fadeMusic(0, 180, () => {
    try {
      bgMusic.pause();
    } catch (_) {}
  });

  const p = homeVideo.play();
  if (p) {
    p.catch(() => {
      homeVideo.muted = true;
      homeVideo.play().catch(() => {});
    });
  }
}

export function stopHomeVideo() {
  if (!homeVideo || !state.isHomeVideoPlaying) return;
  state.isHomeVideoPlaying = false;
  homeVideo.classList.remove("is-active");
  if (homeVideoClose) homeVideoClose.hidden = true;
  try {
    homeVideo.pause();
    homeVideo.currentTime = 0;
  } catch (_) {}
  setTimeout(() => {
    if (!state.isHomeVideoPlaying && homeVideo) {
      homeVideo.hidden = true;
    }
  }, 350);

  syncMusicState();
}

export function initHomeVideo() {
  if (!homeVideo) return;
  homeVideo.addEventListener("ended", () => {
    stopHomeVideo();
  });
  homeVideo.addEventListener("error", () => {
    stopHomeVideo();
  });
  homeVideoClose?.addEventListener("click", (e) => {
    e.stopPropagation();
    stopHomeVideo();
  });
}
