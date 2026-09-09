# One Brave Odyssey — Browser prototype

A separate mobile-first browser project. No Unity files or hero assets are required or reused.

## Run locally

Double-click `start-game.command` to open a normal macOS Terminal window and start the server. Keep that window open while playing and press Control-C inside it to stop.

You can also open a terminal in this folder and run:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://127.0.0.1:4173. On a phone connected to the same Wi-Fi, use the phone URL printed by the launcher. Rotate the phone to landscape.

No package installation or build step is required. `dist/` contains the authored source, not disposable output. Optional Google Fonts have local serif/sans-serif fallbacks.

## Play

Train to improve stats, spend skill points in Hero, and enter arena encounters for coins. The forge sells visible weapon and armor upgrades. The lodge increases battle income; gallery trophies earn passive coins. Tap the golden opening during auto-battles. Training lasts 30 seconds and can be paused; leaving banks earned hits. Twelve encounters unlock endless survival.

Progress is stored in localStorage under `one-brave-odyssey.browser.v1`. It belongs to the current browser/device and origin. Local and hosted previews have separate saves. Browser storage failure produces an in-game message. Audio is off initially and can be enabled in Settings.

## Source map

- `dist/core.js`: player data, save validation, progression, items, economy, reward settlement and fixed object pools.
- `dist/training.js`: five touch minigames.
- `dist/battle.js`: automatic turns, critical windows, skills, waves and survival.
- `dist/art.js`: original procedural Canvas art; separate weapon/armor visual descriptors.
- `dist/game.js`: screens, Pointer Events, responsive canvas, lifecycle, settings and optional WebMCP navigation/read tools.
- `dist/style.css`: safe-area and landscape layout; short-screen rules.
- `docs/mechanics-map.md`: sourced research, adaptations and deliberately limited first-chapter scope.
- `tests/game.test.js`: meaningful reward, save, economy, combat and input tests. Run `node --test tests/*.test.js`.

## Swapping placeholder art

Stable item IDs are `weapon_t1` through `weapon_t3` and `armor_t1` through `armor_t3`. Gameplay stats live in `ITEMS`; appearance descriptors live in `EQUIPMENT_ART`. Replace the `hero`, `enemy` and `drawWorld` rendering functions with sprite or atlas renderers while retaining their arguments. Hero drawing uses feet as its origin, with independent weapon and armor layers. No gameplay logic depends on any asset filenames or shape details.

## First-pass scope

This is a complete playable prototype loop, not a complete recreation of the reference. The full 30+ encounter campaign, mission ladders, extensive talents/consumables, secrets, expanded enemy roster, music and survival checkpoints are future work. All balance numbers are initial mobile-oriented tuning. Physical iOS Safari and Android Chrome playtesting remains necessary.
