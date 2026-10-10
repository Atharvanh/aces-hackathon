// Run with node src/sections/problem-statements/characters/generate.mjs.
// Hand-drawn vector parts: one shared crewmate rig, ten mission-specific outfits.
import { writeFileSync } from 'node:fs';

const coin = `<circle cx="182" cy="100" r="18" fill="#ffcf4b"/><circle cx="182" cy="100" r="12" fill="none" stroke="#bd7923" stroke-width="2"/><path d="M177 93h10m-10 5h10m-10-5c12 0 10 11 0 10l10 8" fill="none" stroke="#7b471e" stroke-width="2.5"/>`;
const chip = `<rect x="96" y="59" width="27" height="22" rx="4" fill="#163f4a"/><path d="M101 54v5m8-5v5m8-5v5m-16 22v5m8-5v5m8-5v5" stroke="#8cf6ec" stroke-width="3"/><path d="M102 65h15v10h-15z" fill="#80ece3" stroke="none"/>`;
const document = `<path d="M159 125h34l13 14v49h-47z" fill="#e7f0d8"/><path d="M193 125v14h13M167 149h29m-29 9h23m-23 9h16" fill="none" stroke="#587779" stroke-width="3"/>`;
const lock = `<rect x="173" y="159" width="24" height="22" rx="4" fill="#ffd269"/><path d="M179 159v-7a6 6 0 0 1 12 0v7" fill="none" stroke="#ffe3a6" stroke-width="4"/><circle cx="185" cy="169" r="3" fill="#293c40" stroke="none"/>`;
const leaf = `<path d="M174 152q-15-35 12-40 20 26-12 40z" fill="#a0e44a"/><path d="m173 168 10-43" fill="none" stroke="#325f2c" stroke-width="3"/>`;

const crew = [
  {
    id: 'fintech-escrow', name: 'Escrow Pilot', color: '#17cbd2', shade: '#14737f',
    alt: 'Cyan payment crewmate with a microchip, rupee coin and secure payment terminal',
    hat: chip,
    outfit: `<path d="m81 150 23 14 30-14v27H81z" fill="#25444e"/><path d="m109 159 6 10-6 20-6-20z" fill="#ffd268" stroke-width="2"/>`,
    prop: `<g class="float">${coin}</g><rect x="153" y="135" width="48" height="62" rx="7" fill="#273f48"/><rect x="160" y="143" width="34" height="28" rx="3" fill="#8ef0db" stroke-width="2"/><path class="signal" d="m166 157 7 7 15-15" fill="none" stroke="#147362" stroke-width="4"/><path d="M163 182h6m7 0h6m6 0h3" stroke="#d3e4da" stroke-width="3"/>`,
  },
  {
    id: 'fintech-risk', name: 'Credit Scout', color: '#8763e6', shade: '#493689',
    alt: 'Purple credit analyst crewmate with a headset and animated financial risk gauge',
    hat: `<path d="M67 112V92c0-47 80-47 80 0v28" fill="none" stroke="#262d40" stroke-width="9"/><rect x="139" y="102" width="17" height="28" rx="7" fill="#ffd36d"/><path d="M149 129v10h-17" fill="none" stroke="#ffd36d" stroke-width="4"/>`,
    outfit: `<path d="m80 147 27 16 29-17v34H80z" fill="#283650"/><path d="m103 161 6 7 6-7-6 28z" fill="#75e6c7" stroke-width="2"/>`,
    prop: `<rect x="149" y="139" width="62" height="52" rx="8" fill="#22333f"/><path d="M158 168a22 22 0 0 1 44 0" fill="none" stroke="#85e1b0" stroke-width="6"/><path class="needle" d="m180 169 12-15" stroke="#ffe4a0" stroke-width="4"/><circle cx="180" cy="169" r="4" fill="#e8f6e8"/><path d="M158 181h16m5 0h22" stroke="#708e9f" stroke-width="3"/><g class="float"><path d="m176 98 9-10 10 5 15-17" fill="none" stroke="#a7e9c8" stroke-width="4"/><path d="m201 76 10-2-1 11" fill="none" stroke="#a7e9c8" stroke-width="3"/></g>`,
  },
  {
    id: 'legal-contract', name: 'Clause Sentinel', color: '#5e8bea', shade: '#324e91',
    alt: 'Blue legal crewmate with a judicial wig and a magnifying glass scanning a contract',
    hat: `<path d="M68 96V78q4-23 40-23t40 23v17l-16-9H83z" fill="#e8e1cf"/><path d="M76 75q8-13 16 0m0-5q8-13 16 0m0 0q8-13 16 0m0 5q8-13 16 0" fill="none" stroke="#ada99c" stroke-width="4"/>`,
    outfit: `<path d="m80 149 28 13 28-13v38H80z" fill="#27313f"/><path d="m97 157 11 6 11-6-3 24h-16z" fill="#eee5d0" stroke-width="2"/>`,
    prop: `${document}<g class="scan"><circle cx="180" cy="153" r="17" fill="#90e0e580" stroke="#e1ba60" stroke-width="6"/><path d="m192 168 15 17" stroke="#e1ba60" stroke-width="7"/></g>`,
  },
  {
    id: 'legal-evidence', name: 'Proof Keeper', color: '#d69b40', shade: '#835b28',
    alt: 'Amber evidence keeper with a legal cap, sealed certificate and a glowing security lock',
    hat: `<path d="m64 73 45-18 45 18-45 17z" fill="#283d3e"/><path d="M83 83v12q26 9 50 0V83" fill="#375757"/><path d="M146 76v29" stroke="#f0ce76" stroke-width="4"/>`,
    outfit: `<path d="M85 149v33h43v-33" fill="#305453"/><path d="m109 155 12 5v13l-12 9-12-9v-13z" fill="#e9cb7b" stroke-width="2"/>`,
    prop: `${document}<path d="m168 177-3 22 10-5 8 5-3-22" fill="#cc6b60" stroke-width="2"/><circle cx="174" cy="176" r="10" fill="#f4cf76" stroke-width="2"/><g class="float">${lock}</g><path class="signal" d="m175 92 11-6 12 6v16l-12 9-11-9z" fill="none" stroke="#89e9cb" stroke-width="3"/>`,
  },
  {
    id: 'healthcare-triage', name: 'Triage Medic', color: '#ef677c', shade: '#9b344b',
    alt: 'Coral emergency medic with a medical cap, stethoscope and a pulsing heart monitor',
    hat: `<path d="M70 88V61q38-17 76 0v27z" fill="#edf4e8"/><path d="M102 60h13v9h9v13h-9v9h-13v-9h-9V69h9z" fill="#e75d72" stroke="none"/>`,
    outfit: `<path d="M83 147v21q0 23 22 23t22-23v-21" fill="none" stroke="#253c47" stroke-width="5"/><circle cx="126" cy="168" r="7" fill="#c8e8de" stroke-width="3"/>`,
    prop: `<rect x="151" y="141" width="59" height="47" rx="7" fill="#f0e9d8"/><rect x="157" y="148" width="47" height="30" rx="3" fill="#253f46" stroke-width="2"/><path class="heartbeat" d="M160 164h9l5-9 6 18 5-13 5 4h10" fill="none" stroke="#8af1c7" stroke-width="3"/><g class="pulse"><path d="M183 113s-24-14-17-26q8-11 17 0 9-11 17 0 7 12-17 26z" fill="#ff7d8c" stroke-width="3"/></g>`,
  },
  {
    id: 'healthcare-vault', name: 'Records Guardian', color: '#f1f2da', shade: '#8aaba8',
    alt: 'White medical records crewmate wearing a teal medical band and holding a locked health record',
    hat: `<path d="M71 86q37-19 74 0v-16q-37-19-74 0z" fill="#3aa6a2"/><circle cx="109" cy="70" r="15" fill="#d5eee1"/><circle cx="109" cy="70" r="6" fill="#82afb2" stroke-width="2"/>`,
    outfit: `<path d="m80 149 28 13 29-13v34H80z" fill="#319e9d"/><path d="M103 166h11m-5-5v11" stroke="#e4f5db" stroke-width="4"/>`,
    prop: `<path d="M153 131h25l7 9h22v56h-54z" fill="#76ccba"/>${lock}<path d="M161 147h12m-6-6v12" stroke="#f3f5df" stroke-width="4"/><g class="float"><path d="m179 91 14-7 14 7v15l-14 12-14-12z" fill="#34515a"/><path class="signal" d="m185 99 6 6 10-12" fill="none" stroke="#abefc7" stroke-width="3"/></g>`,
  },
  {
    id: 'spacetech-orbit', name: 'Orbit Watcher', color: '#516ee3', shade: '#303b8c',
    alt: 'Indigo orbital crewmate with antenna headgear, a radar panel and a drifting satellite',
    hat: `<path d="M99 77V53l-17-11" fill="none" stroke="#c2d6dc" stroke-width="5"/><circle class="signal" cx="80" cy="40" r="7" fill="#95efc2"/><path d="M124 80V62" stroke="#c2d6dc" stroke-width="5"/>`,
    outfit: `<path d="M83 155h45v30H83z" fill="#d6ded8"/><circle cx="94" cy="169" r="4" fill="#ffbb66" stroke-width="2"/><path d="M107 165h14m-14 8h10" stroke="#3d5967" stroke-width="3"/>`,
    prop: `<rect x="150" y="140" width="58" height="52" rx="8" fill="#263c4f"/><circle cx="179" cy="165" r="19" fill="#254c54" stroke="#89dcd4" stroke-width="2"/><path d="M160 165h38m-19-19v38" stroke="#89dcd4" stroke-width="1"/><path class="radar" d="m179 165 15-11-5-6z" fill="#9af0bf" stroke="none"/><g class="satellite"><path d="M158 88h19v17h-19zm37 0h19v17h-19z" fill="#71add2" stroke-width="3"/><path d="M177 91h18v12h-18z" fill="#e4dfad" stroke-width="3"/><path d="m186 91 4-10" stroke="#e4dfad" stroke-width="3"/></g>`,
  },
  {
    id: 'spacetech-rover', name: 'Rover Ranger', color: '#f28a3b', shade: '#a24829',
    alt: 'Orange rover engineer with a communications headset and a little rolling exploration rover',
    hat: `<path d="M70 94V83q5-24 37-24t37 25v29" fill="none" stroke="#d5ddcb" stroke-width="7"/><rect x="138" y="99" width="19" height="25" rx="6" fill="#344b54"/><path d="m146 97 5-27" stroke="#d5ddcb" stroke-width="3"/><circle class="signal" cx="152" cy="66" r="5" fill="#93edc4"/>`,
    outfit: `<path d="M82 154h47v32H82z" fill="#d8dbbd"/><path d="M91 159v23m27-23v23" stroke="#4d5c65" stroke-width="4"/><rect x="99" y="164" width="12" height="10" fill="#7dcdd7" stroke-width="2"/>`,
    prop: `<g class="rover"><path d="m149 178 12-18h39l11 18v21h-62z" fill="#dcc9a1"/><path d="M179 160v-23h14v13h-14" fill="#6bcfd9" stroke-width="4"/><path d="m163 163 7-15h-19" fill="none" stroke="#dcc9a1" stroke-width="4"/><circle cx="160" cy="198" r="10" fill="#34464f"/><circle cx="198" cy="198" r="10" fill="#34464f"/><path class="wheels" d="M155 198h10m-5-5v10m33-5h10m-5-5v10" stroke="#8bacae" stroke-width="3"/></g><path class="signal" d="M175 116q15-12 30 0m-23 6q8-6 16 0" fill="none" stroke="#a2e9df" stroke-width="3"/>`,
  },
  {
    id: 'agritech-crop', name: 'Crop Scout', color: '#75c64e', shade: '#38733a',
    alt: 'Lime crop scientist in a straw hat scanning a leaf with a magnifying glass',
    hat: `<path d="m78 76 10-26h41l10 26" fill="#e5be71"/><path d="M61 77q48-19 96 0l-4 12H65z" fill="#f1d38d"/><path d="M82 69h54" stroke="#9a693e" stroke-width="6"/>`,
    outfit: `<path d="M83 149h12v12h26v-12h12v43H83z" fill="#376d72"/><path d="M98 172h20v13H98z" fill="#519494" stroke-width="2"/>`,
    prop: `${leaf}<path d="M159 170h38l-5 27h-28z" fill="#c78150"/><g class="scan"><circle cx="185" cy="139" r="18" fill="#bcf4de55" stroke="#e6d590" stroke-width="6"/><path d="m198 153 12 15" stroke="#e6d590" stroke-width="6"/></g><path class="signal" d="m167 96 7 7 14-15" fill="none" stroke="#a9ed91" stroke-width="4"/>`,
  },
  {
    id: 'agritech-irrigation', name: 'Rain Maker', color: '#edc741', shade: '#a07929',
    alt: 'Yellow irrigation crewmate with a sprout cap and a watering can pouring animated droplets',
    hat: `<path d="M74 85V71q36-25 68 0v15z" fill="#4d9471"/><path d="M133 81h26q7 11-15 12" fill="#4d9471"/><path d="M108 65V44m0 11q-22 0-18-17 18 0 18 17zm0-7q0-20 19-17 0 17-19 17z" fill="#a4d972" stroke-width="3"/>`,
    outfit: `<path d="M84 149h12v13h24v-13h12v42H84z" fill="#476f61"/><rect x="98" y="173" width="19" height="11" rx="2" fill="#b3dbbc" stroke-width="2"/>`,
    prop: `<path d="M159 146q-20-14-19 9t23 16" fill="none" stroke="#9ed2cb" stroke-width="6"/><path d="M157 147h31v39h-31z" fill="#6db9b2"/><path d="m187 165 14-17 10 7-23 26" fill="#6db9b2"/><path d="m202 144 13 8" stroke="#b7e4d3" stroke-width="6"/><g class="drops" fill="#9be8ef" stroke="none"><path d="m208 168-4 8a5 5 0 0 0 8 0z"/><path d="m197 186-4 8a5 5 0 0 0 8 0z"/><path d="m214 190-4 8a5 5 0 0 0 8 0z"/></g><path class="signal" d="M170 112v-14m9 14V88m9 24V99" stroke="#a4e7be" stroke-width="5"/>`,
  },
];

function svg(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 270" role="img" aria-labelledby="title"><title id="title">${c.alt}</title>
<style>
.crew{animation:bob 1.3s ease-in-out infinite;transform-origin:115px 220px}
.foot-a{animation:step 1.3s ease-in-out infinite;transform-origin:92px 192px}.foot-b{animation:step 1.3s ease-in-out -.65s infinite;transform-origin:125px 192px}
.float,.satellite{animation:float 2.8s ease-in-out infinite}.satellite{transform-origin:186px 97px}
.signal,.pulse{animation:pulse 1.8s ease-in-out infinite}.pulse{transform-origin:183px 98px}
.scan{animation:scan 3s ease-in-out infinite}.needle{animation:needle 3s ease-in-out infinite;transform-origin:180px 169px}
.heartbeat{stroke-dasharray:65;animation:trace 1.8s linear infinite}.radar{animation:spin 4s linear infinite;transform-origin:179px 165px}
.rover{animation:roll 2s ease-in-out infinite}.drops{animation:rain 1.2s linear infinite}
@keyframes bob{50%{transform:translateY(-5px) rotate(-2deg)}}@keyframes step{50%{transform:rotate(13deg) translateY(-3px)}}
@keyframes float{50%{transform:translateY(-9px) rotate(4deg)}}@keyframes pulse{50%{opacity:.55;transform:scale(.96)}}
@keyframes scan{50%{transform:translate(-7px,7px)}}@keyframes needle{50%{transform:rotate(-65deg)}}
@keyframes trace{0%{stroke-dashoffset:65}70%,100%{stroke-dashoffset:0}}@keyframes spin{to{transform:rotate(360deg)}}
@keyframes roll{50%{transform:translateX(-6px) rotate(-2deg)}}@keyframes rain{0%{transform:translateY(-4px);opacity:0}30%{opacity:1}100%{transform:translateY(12px);opacity:0}}
@media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style>
<ellipse cx="119" cy="239" rx="68" ry="11" fill="${c.color}" opacity=".13"/>
<g class="crew" stroke="#080f15" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
<rect x="131" y="113" width="32" height="76" rx="12" fill="${c.shade}"/><path d="M143 122h10v48h-10" fill="${c.color}" stroke="none"/>
<path class="foot-b" d="M112 182h29v39q-9 7-28 2z" fill="${c.shade}"/>
<path class="foot-a" d="M77 181h30v43q-11 12-30 2z" fill="${c.shade}"/>
<path d="M73 112q-2-39 34-39 39 0 40 40v49q0 39-38 39-35 0-36-29z" fill="${c.shade}"/>
<path d="M79 108q-1-28 27-29 30 0 33 31v38q0 34-31 35-22 0-29-17z" fill="${c.color}" stroke="none"/>
${c.outfit}
<path d="M68 102q15-12 52-7 16 3 15 19-1 20-23 21H79q-19-1-19-16 0-10 8-17z" fill="#496a7b"/>
<path d="M69 106q17-9 48-6 10 1 10 10-3 12-37 11-23 0-21-15z" fill="#8fcbdc" stroke="none"/>
<path d="M78 105q10-4 28-2" fill="none" stroke="#effcff" stroke-width="7"/>
${c.hat}${c.prop}
<path d="M146 167q-11-5-13 5t13 13l10-4v-10z" fill="${c.color}" stroke-width="5"/>
</g></svg>`;
}

for (const c of crew) writeFileSync(new URL(`./${c.id}.svg`, import.meta.url), svg(c));
writeFileSync(new URL('./index.js', import.meta.url), `// Generated by generate.mjs; entries follow domainList and problem order.\nexport const missionCharacters = [\n${crew.map(c => `  { name: ${JSON.stringify(c.name)}, alt: ${JSON.stringify(c.alt)}, src: new URL("./${c.id}.svg", import.meta.url).href },`).join('\n')}\n];\n`);
