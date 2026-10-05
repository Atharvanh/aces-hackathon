const screen=document.getElementById('screen'), guide=document.getElementById('guide'), notice=document.getElementById('notice'), buttons=[...document.querySelectorAll('[data-page]')];let selected=0;
const psPage=document.getElementById('ps-page'), psCards=[...document.querySelectorAll('[data-problem]')];
const faqOverlay=document.getElementById('faq-overlay');
function setHomeInert(value){document.querySelector('.game-topbar').inert=value;document.querySelector('.game-layout').inert=value;}
function openFaqs(){notice.hidden=true;guide.hidden=true;psPage.hidden=true;faqOverlay.hidden=false;setHomeInert(true);faqOverlay.querySelector('.faq-scroll').scrollTop=0;faqOverlay.querySelector('.faq-close').focus({preventScroll:true});}
function closeFaqs(){faqOverlay.hidden=true;setHomeInert(false);choose(0);buttons[0].focus({preventScroll:true});}
function closeProblems(){psPage.hidden=true;choose(0);buttons[0].focus({preventScroll:true});}
function openProblems(){notice.hidden=true;guide.hidden=true;psPage.hidden=false;psPage.querySelector('.ps-scroll').scrollTop=0;psPage.querySelector('.ps-close').focus({preventScroll:true});}

function showNotice(text){document.getElementById('notice-text').textContent=text;notice.hidden=false;}
function choose(index,activate=false){selected=(index+buttons.length)%buttons.length;buttons.forEach((button,i)=>{button.classList.toggle('selected',i===selected);if(i===selected)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')});notice.hidden=true;if(activate&&selected===3){openFaqs();return;}if(activate&&selected===1){openProblems();return;}if(activate&&selected!==0)showNotice(buttons[selected].textContent+' — page coming next.');}
function action(name){if(name==='close-faq'){closeFaqs();return;}if(!faqOverlay.hidden){if(name==='home'||name==='back')closeFaqs();else if(name==='next'||name==='prev')faqOverlay.querySelector('.faq-scroll').scrollBy({top:name==='next'?150:-150,behavior:'smooth'});return;}if(name==='close-ps'){closeProblems();return;}if(!psPage.hidden&&(name==='home'||name==='back')){closeProblems();return;}if(!psPage.hidden&&(name==='next'||name==='prev')){const current=psCards.findIndex(card=>card===document.activeElement);const next=(current+(name==='next'?1:-1)+psCards.length)%psCards.length;psCards[next].focus();return;}if(name==='sleep'||name==='quit'){screen.classList.toggle('sleeping');return;}screen.classList.remove('sleeping');if(name==='prev')choose(selected-1);if(name==='next')choose(selected+1);if(name==='select')choose(selected,true);if(name==='home'||name==='back'){choose(0);guide.hidden=true;}if(name==='dismiss')notice.hidden=true;if(name==='help'){guide.hidden=!guide.hidden;document.getElementById('help-button').setAttribute('aria-expanded',String(!guide.hidden));}if(name==='register')showNotice('Registration link coming soon.');if(name==='credits')showNotice('Credits — your club and team details will go here.');if(name==='animation'){document.querySelector('.space-animation').classList.toggle('animation-hidden');}}
buttons.forEach((button,i)=>button.addEventListener('click',()=>choose(i,true)));document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>action(button.dataset.action)));document.querySelectorAll('[data-social]').forEach(button=>button.addEventListener('click',()=>showNotice(button.dataset.social+' — club link coming soon.')));
document.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey)return;if(!faqOverlay.hidden){if(event.key==='Escape'||event.key==='Home'){event.preventDefault();closeFaqs();}else if(event.key==='Tab'){event.preventDefault();const close=faqOverlay.querySelector('.faq-close'),content=faqOverlay.querySelector('.faq-scroll');(document.activeElement===close?content:close).focus();}return;}if(!psPage.hidden&&event.key==='Enter'&&!event.target.closest('button')){event.preventDefault();psCards[0].focus();return;}const keyActions={ArrowUp:'prev',ArrowLeft:'prev',ArrowDown:'next',ArrowRight:'next',Escape:'back',Home:'home','-':'sleep'};if(event.key==='Enter'&&!event.target.closest('button,a')){event.preventDefault();action('select');return;}if(keyActions[event.key]){event.preventDefault();action(keyActions[event.key]);}});document.getElementById('help-button').setAttribute('aria-expanded','false');

psCards.forEach(card=>card.addEventListener('click',()=>{psCards.forEach(other=>other.setAttribute('aria-pressed',String(other===card)));}));

// UI sounds belong only to buttons inside the game screen.
(() => {
  const hover = new Audio('assets/ui-hover.mp3');
  const select = new Audio('assets/ui-select.mp3');
  hover.preload = select.preload = 'auto';
  hover.volume = 0.45;
  select.volume = 0.65;
  let keyboardNavigation = false;
  let lastHover = -Infinity;

  function play(sound) {
    try {
      sound.pause();
      sound.currentTime = 0;
      const pending = sound.play();
      if (pending) pending.catch(() => {}); // Browsers may block audio before the first gesture.
    } catch (_) { /* Missing or blocked audio must never interrupt navigation. */ }
  }
  function hoverSound() {
    const now = performance.now();
    if (now - lastHover < 70) return;
    lastHover = now;
    play(hover);
  }
  function selectSound() {
    hover.pause();
    play(select);
  }
  function buttonAt(target) {
    const button = target instanceof Element ? target.closest('button') : null;
    return button && screen.contains(button) && !button.disabled && button.getAttribute('aria-disabled') !== 'true' ? button : null;
  }

  document.addEventListener('pointerdown', () => { keyboardNavigation = false; }, true);
  document.addEventListener('pointerover', event => {
    if (event.pointerType === 'touch') return;
    const button = buttonAt(event.target);
    if (!button || (event.relatedTarget instanceof Node && button.contains(event.relatedTarget))) return;
    keyboardNavigation = false;
    hoverSound();
  });
  document.addEventListener('focusin', event => {
    if (keyboardNavigation && buttonAt(event.target)) hoverSound();
  });
  // Capture before click handlers move focus or replace the visible screen.
  document.addEventListener('click', event => {
    keyboardNavigation = false;
    if (buttonAt(event.target)) selectSound();
  }, true);
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    keyboardNavigation = true;
    if (event.repeat || event.target.closest('.controller')) return;
    // Native Enter/Space activation uses the click listener. Controller shortcuts stay silent.
    // Enter/Space on a button produces a native click, which plays select once.
  }, true);
})();
