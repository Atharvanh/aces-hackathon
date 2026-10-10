# Mission crewmates

Ten standalone animated SVGs, one per problem statement. They share an Among Us style body and walking/bobbing rig with individual outfits, colors and animated mission tools. All animations stop when the visitor requests reduced motion.

Edit the shapes, palette or motion in `generate.mjs`, then run:

```
node src/sections/problem-statements/characters/generate.mjs
```

Commit the generator, generated SVGs and `index.js` together. The index follows the five domains in `data.js`, with problem 01 then problem 02 for each. If that order changes, update the generator order too.

- Fintech: Escrow Pilot (payment terminal / floating rupee coin), Credit Scout (animated credit gauge).
- Legal: Clause Sentinel (contract scanner), Proof Keeper (certificate / floating lock).
- Healthcare: Triage Medic (heart monitor), Records Guardian (locked health folder).
- Spacetech: Orbit Watcher (sweeping radar / satellite), Rover Ranger (moving rover / telemetry).
- Agritech: Crop Scout (leaf scanner), Rain Maker (watering can / falling droplets).

SVGs are loaded as images so their styles cannot affect the rest of the website. Vite bundles and fingerprints each asset for production.
