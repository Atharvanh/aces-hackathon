# Hackseries website

An interactive hackathon website built with HTML, CSS, JavaScript, and Vite.

## Run locally

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. To check the production website:

```sh
npm run build
npm run preview
```

## Where to make changes

Each website section has its own folder inside `src/sections/`:

- `home/`: main menu, top bar, floating crewmates, and home video.
- `problem-statements/`: problem cards, individual problem views, and problem text in `data.js`.
- `prize-pool/`: trophy, prize amount, background styling, and close behavior.
- `faqs/`: questions and answers, plus FAQ navigation.
- `about/`: event information, venue map, and About navigation.
- `credits/`: team names, credit styling, and scrolling playback.
- `preloader/`: ACES loading screen, progress bar, and supplied animated runner in `assets/runner.svg`. Intro duration and maximum wait are in `controller.js`.

Start with a section's `index.html` to edit its content, `styles.css` to edit its appearance, and `controller.js` to edit its behavior. Problem Statements also has `detail.html` and `detail.css`; Home has `video.css`.

## Shared files

- `index.html`: document title, metadata, and entry points.
- `src/main.js`: application startup and shared event listeners.
- `src/shared/console/`: outer console, controllers, orientation notice, and responsive styles.
- `src/shared/tablet/styles.css`: tablet appearance shared by FAQs and About; edit here to update both.
- `src/shared/navigation.js`: menu selection, keyboard/controller actions, and page routing.
- `src/shared/audio.js`: background music, mute, and button sounds.
- `src/shared/dom.js`: shared references to page elements.
- `src/shared/state.js`: current selection, playback, and audio state.
- `src/styles/index.css`: stylesheet import order. Keep this order unless deliberately changing the cascade.
- `assets/`: images, video, fonts, and audio shared by the site. Asset paths inside HTML sections are relative to the root page, not to the section folder.

## How the sections fit together

`vite.config.js` replaces `<!-- include:src/.../index.html -->` comments with the corresponding HTML during local development and production builds. Includes can contain other includes, so the Home section includes Credits. Editing a section's HTML reloads the local preview automatically.

The final website is still one complete HTML page. It does not fetch sections at runtime. Run the site through Vite rather than opening a partial HTML file directly. Keep existing element IDs and `data-action` attributes when changing content because the controllers use them.

## Before publishing changes

1. Run `npm run build` and resolve any errors.
2. Run `npm run preview` and check Home, all five problem cards and their detail pages, Prize Pool, FAQs, About and its map, and Credits.
3. Check close buttons, keyboard/console navigation, mute, the home video, and a narrow landscape viewport.
4. Confirm the portrait rotate notice still appears on phones.

Build output goes into `dist/`. Edit the source files, not the generated output.
