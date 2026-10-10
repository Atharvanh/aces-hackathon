import {
  aboutOverlay,
  buttons,
  faqOverlay,
  guide,
  notice,
  prizePage,
  psPage,
} from "../../shared/dom.js";
import { choose, setHomeInert } from "../../shared/navigation.js";
import { syncMusicState } from "../../shared/audio.js";

export function openPrizes() {
  notice.hidden = true;
  guide.hidden = true;
  psPage.hidden = true;
  faqOverlay.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  prizePage.hidden = false;
  setHomeInert(true);
  prizePage.querySelector(".prize-close").focus({ preventScroll: true });
  syncMusicState();
}

export function closePrizes() {
  prizePage.hidden = true;
  setHomeInert(false);
  choose(0);
  buttons[2].focus({ preventScroll: true });
  syncMusicState();
}
