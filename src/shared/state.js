// Mutable state shared by section controllers and console controls.
export const state = {
  isPreloaderActive: false,
  isHomeVideoPlaying: false,
  selected: 0,
  activeProblem: 0,
  activeDomain: 0,
  activeChoice: 0,
  creditsAnimation: null,
  fadeTimer: null,
  duckTimer: null,
  lastHover: -Infinity,
  keyboardNavigation: false,
  isMuted: false,
};
