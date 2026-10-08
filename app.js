import themeMusicUrl from './assets/01-among-us-theme_hlItXaiw.mp3';
import hoverSoundUrl from './assets/ui-hover.mp3';
import selectSoundUrl from './assets/ui-select.mp3';

const screen = document.getElementById('screen');
const guide = document.getElementById('guide');
const notice = document.getElementById('notice');
const buttons = [...document.querySelectorAll('[data-page]')];
let selected = 0;

const psPage = document.getElementById('ps-page');
const prizePage = document.getElementById('prize-page');
const psCards = [...document.querySelectorAll('[data-problem]')];
const problemDetail = document.getElementById('problem-detail');
const sampleProblems = [
  {
    "name": "Campus Lost & Found",
    "summary": "Help students reconnect with belongings lost around campus.",
    "challenge": "Lost items are currently reported across scattered chats and noticeboards. Design one place where students can report a missing item, browse found items, and arrange a safe handover.",
    "deliverables": [
      "A searchable feed with category, location, and date filters.",
      "Forms to report lost or found items using sample photos.",
      "A claim flow that verifies ownership without exposing private contact details."
    ],
    "demo": "Show a student reporting an item, finding a possible match, and completing a verified handover."
  },
  {
    "name": "Smart Campus Commute",
    "summary": "Make the journey to college simpler and more predictable.",
    "challenge": "Students juggle changing bus timings, crowded routes, and last-minute travel plans. Build a commute planner that helps them compare routes and plan their arrival using mock transport data.",
    "deliverables": [
      "A route search with estimated travel time and cost.",
      "A clear view of delays and alternative routes.",
      "Saved journeys and accessible travel information."
    ],
    "demo": "Walk through a morning journey with a simulated delay and show how the planner suggests an alternative."
  },
  {
    "name": "Less Waste, More Impact",
    "summary": "Help the campus understand and reduce everyday waste.",
    "challenge": "Bins overflow while reusable materials and leftover resources go unnoticed. Create a system for reporting waste hotspots and coordinating responsible collection or reuse.",
    "deliverables": [
      "A map or list of reported hotspots with status updates.",
      "A collection workflow for volunteers or campus staff.",
      "A dashboard summarizing improvements from sample records."
    ],
    "demo": "Follow a report from submission to collection and explain how the dashboard measures progress."
  },
  {
    "name": "Peer Learning Exchange",
    "summary": "Connect students who want to learn with students who can help.",
    "challenge": "Finding the right study partner is difficult when skills and availability are hidden in group chats. Build a peer-learning platform with useful matching and simple session planning.",
    "deliverables": [
      "Profiles listing skills offered, learning goals, and availability.",
      "A matching or search experience with clear explanations.",
      "Session requests and a feedback flow using fictional users."
    ],
    "demo": "Match two students, arrange a learning session, and show how both can share constructive feedback."
  },
  {
    "name": "Accessible Campus Navigator",
    "summary": "Make campus information easier for everyone to use.",
    "challenge": "New students and visitors may struggle to find rooms, services, or step-free routes. Design an accessible guide that brings practical campus navigation and support information together.",
    "deliverables": [
      "A searchable directory of rooms, facilities, and services.",
      "Route information with accessibility notes and clear landmarks.",
      "A way to flag incorrect or outdated information."
    ],
    "demo": "Help a fictional visitor locate a service, choose an accessible route, and report an unavailable entrance."
  }
];
let activeProblem = 0;
function openProblemDetail(index) {
  const problem = sampleProblems[index];
  if (!problem) return;
  activeProblem = index;
  document.getElementById('problem-detail-title').textContent = 'Problem Statement ' + (index + 1) + ':';
  document.getElementById('problem-name').textContent = problem.name;
  document.getElementById('problem-summary').textContent = problem.summary;
  document.getElementById('problem-challenge').textContent = problem.challenge;
  document.getElementById('problem-demo').textContent = problem.demo;
  const list = document.getElementById('problem-deliverables');
  list.replaceChildren(...problem.deliverables.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
  document.getElementById('problem-character-label').textContent = 'CREWMATE ' + String(index + 1).padStart(2, '0');
  psPage.inert = true;
  setHomeInert(true);
  problemDetail.hidden = false;
  problemDetail.querySelector('.problem-description').scrollTop = 0;
  problemDetail.querySelector('.ps-close').focus({preventScroll:true});
}
function closeProblemDetail() {
  problemDetail.hidden = true;
  psPage.inert = false;
  setHomeInert(false);
  psCards[activeProblem].focus({preventScroll:true});
}
const faqOverlay = document.getElementById('faq-overlay');
const aboutOverlay = document.getElementById('about-overlay');
const creditsPanel = document.getElementById('credits-panel');
let creditsAnimation = null;

// --- AUDIO SYSTEM ---
// The Among Us theme is the background music for the home/lander page.
// ui-hover and ui-select are button sound effects.
// Audio ducking, throttling, and smooth fades ensure audios never clash or merge.
const BG_VOLUME = 0.22;
const BG_DUCK_VOLUME = 0.08;
const HOVER_VOLUME = 0.38;
const SELECT_VOLUME = 0.60;

const bgMusic = new Audio(themeMusicUrl);
bgMusic.loop = true;
bgMusic.preload = 'auto';
bgMusic.volume = 0; // Starts at 0 for smooth fade-in

const hoverSound = new Audio(hoverSoundUrl);
hoverSound.preload = 'auto';
hoverSound.volume = HOVER_VOLUME;

const selectSound = new Audio(selectSoundUrl);
selectSound.preload = 'auto';
selectSound.volume = SELECT_VOLUME;

let fadeTimer = null;
let duckTimer = null;
let lastHover = -Infinity;
let keyboardNavigation = false;
let isMuted = false;

function updateMuteUI() {
  const muteBtn = document.getElementById('mute-button');
  if (!muteBtn) return;
  muteBtn.classList.toggle('is-muted', isMuted);
  muteBtn.setAttribute('aria-pressed', String(isMuted));
  muteBtn.setAttribute('aria-label', isMuted ? 'Unmute all audio' : 'Mute all audio');
  muteBtn.setAttribute('title', isMuted ? 'Unmute Audio (M)' : 'Mute Audio (M)');
}

function toggleMute() {
  isMuted = !isMuted;
  updateMuteUI();
  if (isMuted) {
    fadeMusic(0, 180, () => {
      try { bgMusic.pause(); } catch (_) {}
    });
  } else {
    syncMusicState();
    triggerSelect();
  }
}

function isSiteActive() {
  return (
    !screen.classList.contains('sleeping') &&
    document.visibilityState !== 'hidden'
  );
}

function fadeMusic(targetVol, duration = 300, onComplete) {
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
  const startVol = bgMusic.volume;
  const clampedTarget = Math.max(0, Math.min(1, targetVol));
  if (Math.abs(clampedTarget - startVol) < 0.01) {
    bgMusic.volume = clampedTarget;
    if (onComplete) onComplete();
    return;
  }
  const steps = 12;
  const intervalTime = Math.max(10, Math.floor(duration / steps));
  let step = 0;
  fadeTimer = setInterval(() => {
    step++;
    const progress = step / steps;
    bgMusic.volume = Math.max(0, Math.min(1, startVol + (clampedTarget - startVol) * progress));
    if (step >= steps) {
      clearInterval(fadeTimer);
      fadeTimer = null;
      bgMusic.volume = clampedTarget;
      if (onComplete) onComplete();
    }
  }, intervalTime);
}

function playBgMusic() {
  if (isMuted || !isSiteActive()) return;
  if (bgMusic.paused) {
    bgMusic.volume = 0;
    const playPromise = bgMusic.play();
    if (playPromise) {
      playPromise.then(() => {
        fadeMusic(BG_VOLUME, 400);
      }).catch(() => {
        // Autoplay blocked by browser policy; armed on window gesture
      });
    }
  } else if (Math.abs(bgMusic.volume - BG_VOLUME) > 0.02 && !duckTimer) {
    fadeMusic(BG_VOLUME, 300);
  }
}

function pauseBgMusic() {
  fadeMusic(0, 250, () => {
    if (isMuted || !isSiteActive()) {
      try { bgMusic.pause(); } catch (_) {}
    }
  });
}

function syncMusicState() {
  if (!isMuted && isSiteActive()) {
    playBgMusic();
  } else {
    pauseBgMusic();
  }
}

function duckMusic() {
  if (isMuted || bgMusic.paused || !isSiteActive()) return;
  if (duckTimer) clearTimeout(duckTimer);
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }
  bgMusic.volume = BG_DUCK_VOLUME;
  duckTimer = setTimeout(() => {
    duckTimer = null;
    if (!isMuted && isSiteActive() && !bgMusic.paused) {
      fadeMusic(BG_VOLUME, 250);
    }
  }, 220);
}

function playSfx(audio) {
  if (isMuted) return;
  try {
    audio.pause();
    audio.currentTime = 0;
    const p = audio.play();
    if (p) p.catch(() => {});
  } catch (_) {}
}

function triggerHover() {
  const now = performance.now();
  if (now - lastHover < 70) return;
  lastHover = now;
  playSfx(hoverSound);
}

function triggerSelect() {
  try {
    hoverSound.pause();
    hoverSound.currentTime = 0;
  } catch (_) {}
  duckMusic();
  playSfx(selectSound);
}

function buttonAt(target) {
  const button = target instanceof Element ? target.closest('button') : null;
  return button && screen.contains(button) && !button.disabled && button.getAttribute('aria-disabled') !== 'true' ? button : null;
}

// Unlock audio on first user gesture to comply with browser autoplay policies
function unlockAudio() {
  ['pointerdown', 'keydown', 'click', 'touchstart'].forEach(type => {
    window.removeEventListener(type, unlockAudio, true);
  });
  if (!isMuted && isSiteActive()) {
    playBgMusic();
  }
}
['pointerdown', 'keydown', 'click', 'touchstart'].forEach(type => {
  window.addEventListener(type, unlockAudio, { capture: true, once: true });
});

// Pause music when tab is hidden, resume when tab is active
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    fadeMusic(0, 200, () => {
      try { bgMusic.pause(); } catch (_) {}
    });
  } else {
    syncMusicState();
  }
});

// --- NAVIGATION & GAME SYSTEM ---
function setHomeInert(value) {
  document.querySelector('.game-topbar').inert = value;
  document.querySelector('.game-layout').inert = value;
}

function openFaqs() {
  notice.hidden = true;
  guide.hidden = true;
  psPage.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  faqOverlay.hidden = false;
  setHomeInert(true);
  faqOverlay.querySelector('.faq-scroll').scrollTop = 0;
  faqOverlay.querySelector('.faq-close').focus({ preventScroll: true });
  syncMusicState();
}

function openPrizes() {
  notice.hidden = true;
  guide.hidden = true;
  psPage.hidden = true;
  faqOverlay.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  prizePage.hidden = false;
  setHomeInert(true);
  prizePage.querySelector('.prize-close').focus({ preventScroll: true });
  syncMusicState();
}

function closePrizes() {
  prizePage.hidden = true;
  setHomeInert(false);
  choose(0);
  buttons[2].focus({ preventScroll: true });
  syncMusicState();
}

function closeFaqs() {
  faqOverlay.hidden = true;
  setHomeInert(false);
  choose(0);
  buttons[0].focus({ preventScroll: true });
  syncMusicState();
}

function openAbout() {
  notice.hidden = true;
  guide.hidden = true;
  psPage.hidden = true;
  faqOverlay.hidden = true;
  aboutOverlay.hidden = false;
  setHomeInert(true);
  aboutOverlay.querySelector('.faq-scroll').scrollTop = 0;
  aboutOverlay.querySelector('.faq-close').focus({ preventScroll: true });
  syncMusicState();
}

function closeAbout() {
  aboutOverlay.hidden = true;
  setHomeInert(false);
  choose(0);
  buttons[0].focus({ preventScroll: true });
  syncMusicState();
}

function closeProblems() {
  psPage.hidden = true;
  choose(0);
  buttons[0].focus({ preventScroll: true });
  syncMusicState();
}

function openProblems() {
  notice.hidden = true;
  guide.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  faqOverlay.hidden = true;
  psPage.hidden = false;
  activeProblem = 0;
  psCards.forEach(card => card.setAttribute('aria-pressed', 'false'));
  psPage.querySelector('.ps-scroll').scrollTop = 0;
  psPage.querySelector('.ps-close').focus({ preventScroll: true });
  syncMusicState();
}

function closeCredits() {
  if (creditsAnimation) creditsAnimation.cancel();
  creditsAnimation = null;
  creditsPanel.hidden = true;
  syncMusicState();
}

function startCreditsRoll() {
  const viewport = creditsPanel.querySelector('.credits-viewport');
  const roll = creditsPanel.querySelector('.credits-roll');
  const playback = creditsPanel.querySelector('.credits-playback');
  if (creditsAnimation) creditsAnimation.cancel();
  viewport.scrollTop = 0;
  const height = viewport.clientHeight;
  roll.style.setProperty('--credits-height', height + 'px');
  playback.textContent = 'Pause';
  playback.setAttribute('aria-label', 'Pause scrolling credits');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  playback.hidden = reduced;
  viewport.classList.toggle('manual-credits', reduced);
  if (reduced) { creditsAnimation = null; return; }
  const distance = Math.max(0, roll.scrollHeight - height);
  creditsAnimation = roll.animate(
    [{ transform: 'translateY(0)' }, { transform: 'translateY(-' + distance + 'px)' }],
    { delay: 0, duration: (distance / 32) * 1000, easing: 'linear', fill: 'forwards' }
  );
  creditsAnimation.onfinish = () => {
    playback.textContent = 'Replay';
    playback.setAttribute('aria-label', 'Replay credits');
  };
}

function openCredits() {
  notice.hidden = true;
  if (aboutOverlay) aboutOverlay.hidden = true;
  faqOverlay.hidden = true;
  creditsPanel.hidden = false;
  startCreditsRoll();
  creditsPanel.querySelector('.credits-close').focus({ preventScroll: true });
  syncMusicState();
}

function creditsPlayback() {
  if (!creditsAnimation) return;
  const control = creditsPanel.querySelector('.credits-playback');
  if (creditsAnimation.playState === 'finished') {
    startCreditsRoll();
    return;
  }
  if (creditsAnimation.playState === 'paused') {
    creditsAnimation.play();
    control.textContent = 'Pause';
    control.setAttribute('aria-label', 'Pause scrolling credits');
  } else {
    creditsAnimation.pause();
    control.textContent = 'Resume';
    control.setAttribute('aria-label', 'Resume scrolling credits');
  }
}

window.addEventListener('resize', () => {
  if (!creditsPanel.hidden) startCreditsRoll();
});

function showNotice(text) {
  document.getElementById('notice-text').textContent = text;
  notice.hidden = false;
}

function choose(index, activate = false) {
  if (activate) closeCredits();
  selected = (index + buttons.length) % buttons.length;
  buttons.forEach((button, i) => {
    button.classList.toggle('selected', i === selected);
    if (i === selected) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  notice.hidden = true;
  if (activate && selected === 4) { openAbout(); return; }
  if (activate && selected === 3) { openFaqs(); return; }
  if (activate && selected === 2) { openPrizes(); return; }
  // Keep the menu button visible while problem statements are unreleased.
  if (activate && selected === 1) { syncMusicState(); return; }
  if (activate && selected !== 0) showNotice(buttons[selected].textContent + ' — page coming next.');
  syncMusicState();
}

function action(name) {
  if (name === 'close-prize') { closePrizes(); return; }
  if (!prizePage.hidden && !['mute', 'sleep', 'quit'].includes(name)) {
    if (name === 'home' || name === 'back') closePrizes();
    return;
  }
  if (name === 'close-detail') { closeProblemDetail(); return; }
  if (!problemDetail.hidden) {
    if (name === 'back') closeProblemDetail();
    else if (name === 'home') { closeProblemDetail(); closeProblems(); }
    else if (name === 'next' || name === 'prev') problemDetail.querySelector('.problem-description').scrollBy({top:name === 'next' ? 150 : -150,behavior:'smooth'});
    return;
  }
  if (name === 'close-credits') { closeCredits(); choose(0); buttons[0].focus({ preventScroll: true }); return; }
  if (name === 'credits-playback') { creditsPlayback(); return; }
  if (!creditsPanel.hidden && (name === 'home' || name === 'back')) { closeCredits(); choose(0); return; }
  if (!creditsPanel.hidden && (name === 'next' || name === 'prev')) {
    if (creditsAnimation) {
      const duration = creditsAnimation.effect.getTiming().duration;
      creditsAnimation.currentTime = Math.max(0, Math.min(duration, Number(creditsAnimation.currentTime) + (name === 'next' ? 3000 : -3000)));
    } else creditsPanel.querySelector('.credits-viewport').scrollBy({ top: name === 'next' ? 150 : -150, behavior: 'smooth' });
    return;
  }
  if (name === 'close-faq') { closeFaqs(); return; }
  if (!faqOverlay.hidden) {
    if (name === 'home' || name === 'back') closeFaqs();
    else if (name === 'next' || name === 'prev') faqOverlay.querySelector('.faq-scroll').scrollBy({ top: name === 'next' ? 150 : -150, behavior: 'smooth' });
    return;
  }
  if (name === 'close-about') { closeAbout(); return; }
  if (aboutOverlay && !aboutOverlay.hidden) {
    if (name === 'home' || name === 'back') closeAbout();
    else if (name === 'next' || name === 'prev') aboutOverlay.querySelector('.faq-scroll').scrollBy({ top: name === 'next' ? 150 : -150, behavior: 'smooth' });
    return;
  }
  if (name === 'close-ps') { closeProblems(); return; }
  if (!psPage.hidden && (name === 'home' || name === 'back')) { closeProblems(); return; }
  if (!psPage.hidden && name === 'select') { openProblemDetail(activeProblem); return; }
  if (!psPage.hidden && (name === 'next' || name === 'prev')) {
    activeProblem = (activeProblem + (name === 'next' ? 1 : -1) + psCards.length) % psCards.length;
    psCards.forEach((card, index) => card.setAttribute('aria-pressed', String(index === activeProblem)));
    psCards[activeProblem].focus({ preventScroll: true });
    psCards[activeProblem].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    return;
  }
  if (name === 'sleep' || name === 'quit') {
    screen.classList.toggle('sleeping');
    syncMusicState();
    return;
  }
  if (screen.classList.contains('sleeping')) {
    screen.classList.remove('sleeping');
    syncMusicState();
  }
  if (name === 'prev') { choose(selected - 1); buttons[selected].focus({ preventScroll: true }); }
  if (name === 'next') { choose(selected + 1); buttons[selected].focus({ preventScroll: true }); }
  if (name === 'select') { choose(selected, true); }
  if (name === 'home' || name === 'back') { choose(0); guide.hidden = true; syncMusicState(); }
  if (name === 'dismiss') notice.hidden = true;
  if (name === 'help') {
    guide.hidden = !guide.hidden;
    document.getElementById('help-button').setAttribute('aria-expanded', String(!guide.hidden));
  }
  if (name === 'register') window.open('https://campusmeet.in/user/user_event-details.php?id=175', '_blank', 'noopener,noreferrer');
  if (name === 'credits') openCredits();
  if (name === 'mute' || name === 'animation') { toggleMute(); return; }
}

buttons.forEach((button, i) => button.addEventListener('click', () => choose(i, true)));
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => action(button.dataset.action)));
document.querySelectorAll('[data-social][data-url]').forEach(button => button.addEventListener('click', () => {
  window.open(button.dataset.url, '_blank', 'noopener,noreferrer');
}));

document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if ((event.key === 'm' || event.key === 'M') && !event.target.closest('input,textarea')) {
    event.preventDefault();
    toggleMute();
    return;
  }
  if (!problemDetail.hidden) {
    if (event.key === 'Escape' || event.key === 'Home') {
      event.preventDefault();
      closeProblemDetail();
      if (event.key === 'Home') closeProblems();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const close = problemDetail.querySelector('.ps-close');
      const content = problemDetail.querySelector('.problem-description');
      (document.activeElement === close ? content : close).focus();
    }
    return;
  }
  if (!faqOverlay.hidden) {
    if (event.key === 'Escape' || event.key === 'Home') {
      event.preventDefault();
      closeFaqs();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const close = faqOverlay.querySelector('.faq-close');
      const content = faqOverlay.querySelector('.faq-scroll');
      (document.activeElement === close ? content : close).focus();
    }
    return;
  }
  if (aboutOverlay && !aboutOverlay.hidden) {
    if (event.key === 'Escape' || event.key === 'Home') {
      event.preventDefault();
      closeAbout();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      const close = aboutOverlay.querySelector('.faq-close');
      const content = aboutOverlay.querySelector('.faq-scroll');
      (document.activeElement === close ? content : close).focus();
    }
    return;
  }
  if (!psPage.hidden && event.key === 'Enter' && !event.target.closest('button')) {
    event.preventDefault();
    psCards[0].focus();
    return;
  }
  const keyActions = {
    ArrowUp: 'prev',
    ArrowLeft: 'prev',
    ArrowDown: 'next',
    ArrowRight: 'next',
    Escape: 'back',
    Home: 'home',
    '-': 'sleep'
  };
  if (event.key === 'Enter' && !event.target.closest('button,a')) {
    event.preventDefault();
    action('select');
    return;
  }
  if (keyActions[event.key]) {
    event.preventDefault();
    action(keyActions[event.key]);
  }
});

document.getElementById('help-button').setAttribute('aria-expanded', 'false');

psCards.forEach(card => card.addEventListener('click', () => {
  psCards.forEach(other => other.setAttribute('aria-pressed', String(other === card)));
  openProblemDetail(Number(card.dataset.problem));
}));

document.addEventListener('pointerdown', () => { keyboardNavigation = false; }, true);
document.addEventListener('pointerover', event => {
  if (event.pointerType === 'touch') return;
  const button = buttonAt(event.target);
  if (!button || (event.relatedTarget instanceof Node && button.contains(event.relatedTarget))) return;
  keyboardNavigation = false;
  triggerHover();
});
document.addEventListener('focusin', event => {
  if (keyboardNavigation && buttonAt(event.target)) triggerHover();
});
document.addEventListener('click', event => {
  keyboardNavigation = false;
  if (buttonAt(event.target)) triggerSelect();
}, true);
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  keyboardNavigation = true;
  if (event.repeat || event.target.closest('.controller')) return;
}, true);

// Initialize background music and mute button UI
updateMuteUI();
syncMusicState();
