import {
  aboutOverlay,
  buttons,
  faqOverlay,
  guide,
  notice,
  psPage,
} from "../../shared/dom.js";
import { choose, setHomeInert } from "../../shared/navigation.js";
import { syncMusicState } from "../../shared/audio.js";

export function openAbout() {
  notice.hidden = true;
  guide.hidden = true;
  psPage.hidden = true;
  faqOverlay.hidden = true;
  aboutOverlay.hidden = false;
  setHomeInert(true);
  aboutOverlay.querySelector(".faq-scroll").scrollTop = 0;
  aboutOverlay.querySelector(".faq-close").focus({ preventScroll: true });
  syncMusicState();
}

export function closeAbout() {
  aboutOverlay.hidden = true;
  setHomeInert(false);
  choose(0);
  buttons[0].focus({ preventScroll: true });
  syncMusicState();
}
