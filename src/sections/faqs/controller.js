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

export function openFaqs() {
  notice.hidden = true;
  guide.hidden = true;
  psPage.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  faqOverlay.hidden = false;
  setHomeInert(true);
  faqOverlay.querySelector(".faq-scroll").scrollTop = 0;
  faqOverlay.querySelector(".faq-close").focus({ preventScroll: true });
  syncMusicState();
}

export function closeFaqs() {
  faqOverlay.hidden = true;
  setHomeInert(false);
  choose(0);
  buttons[0].focus({ preventScroll: true });
  syncMusicState();
}
