import { sampleProblems } from "./data.js";
import { state } from "../../shared/state.js";
import {
  aboutOverlay,
  buttons,
  faqOverlay,
  guide,
  notice,
  problemDetail,
  psCards,
  psPage,
} from "../../shared/dom.js";
import { choose, setHomeInert } from "../../shared/navigation.js";
import { syncMusicState } from "../../shared/audio.js";

export function openProblemDetail(index) {
  const problem = sampleProblems[index];
  if (!problem) return;
  state.activeProblem = index;
  document.getElementById("problem-detail-title").textContent =
    "Problem Statement " + (index + 1) + ":";
  document.getElementById("problem-name").textContent = problem.name;
  document.getElementById("problem-summary").textContent = problem.summary;
  document.getElementById("problem-challenge").textContent = problem.challenge;
  document.getElementById("problem-demo").textContent = problem.demo;
  const list = document.getElementById("problem-deliverables");
  list.replaceChildren(
    ...problem.deliverables.map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    }),
  );
  document.getElementById("problem-character-label").textContent =
    "CREWMATE " + String(index + 1).padStart(2, "0");
  psPage.inert = true;
  setHomeInert(true);
  problemDetail.hidden = false;
  problemDetail.querySelector(".problem-description").scrollTop = 0;
  problemDetail.querySelector(".ps-close").focus({ preventScroll: true });
}

export function closeProblemDetail() {
  problemDetail.hidden = true;
  psPage.inert = false;
  setHomeInert(false);
  psCards[state.activeProblem].focus({ preventScroll: true });
}

export function closeProblems() {
  psPage.hidden = true;
  choose(0);
  buttons[0].focus({ preventScroll: true });
  syncMusicState();
}

export function openProblems() {
  notice.hidden = true;
  guide.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  faqOverlay.hidden = true;
  psPage.hidden = false;
  state.activeProblem = 0;
  psCards.forEach((card) => card.setAttribute("aria-pressed", "false"));
  psPage.querySelector(".ps-scroll").scrollTop = 0;
  psPage.querySelector(".ps-close").focus({ preventScroll: true });
  syncMusicState();
}
