# One Brave Odyssey — Browser game

An original mobile-first game developed in JavaScript for rapid iteration toward a polished, sellable App Store release. The current target is iPhone 17 Pro Max in landscape; broader responsive support comes later. This first-chapter build is a development milestone toward a fully completed game. Unity is an optional future production path if content growth or browser limitations require it. No Unity files or hero assets are required or reused.

## Run locally

Double-click `start-game.command` to open a normal macOS Terminal window and start the server. Keep that window open while playing and press Control-C inside it to stop. Double-click the launcher again to restart. In your own VS Code or macOS terminal, run `npm start` from this project folder; Control-C stops it and `npm start` starts it again.

You can also open a terminal in this folder and run:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://127.0.0.1:4173. On a phone connected to the same Wi-Fi, use the phone URL printed by the launcher. Rotate the phone to landscape.

No package installation or build step is required. `dist/` contains the authored source, not disposable output. Optional Google Fonts have local serif/sans-serif fallbacks.

## Play

Train to improve stats, spend skill points in Hero, and enter arena encounters for coins. The forge sells visible weapon and armor upgrades. The lodge increases battle income; gallery trophies earn passive coins. Tap the golden opening during auto-battles. Strength practice continues until you choose to leave; the other four trainers last 30 seconds and can be paused. Leaving banks earned progress. Twelve encounters unlock endless survival.

In Strength, use the visible High, Low and Mid buttons on the right to slash fruit as it reaches your hero. High sits above Low; Mid sits to the right of Low. Use Kick on the left for falling sparks. Both characters occupy the central play area, with the partner throwing toward the hero. Only High fruit follows an arc. Mid travels horizontally at the middle height; Low travels horizontally near the feet, with a short crouch-and-release motion from the partner. Instructions appear for about four seconds on the first visit only. Town opens a pause dialog; Bank & leave saves gains and shows a result with a Back to Town button. Backgrounding or portrait rotation also pauses play.

The streak meter starts at four consecutive hits, then asks for six, eight and so on. Each goal adds +1 Strength and +6 XP to pending rewards. Misses reset combo and current goal progress, keeping all earned progress. Ordinary hits yield 3 XP each and one Strength per four hits before ground upgrades. Results show total banked Strength and XP, best combo and the included goal bonuses. Strength has no timed-session skill-point award; XP level-ups still grant skill points. This is initial balance for phone playtesting.

Progress is stored in localStorage under `one-brave-odyssey.browser.v1`. It belongs to the current browser/device and origin. Local and hosted previews have separate saves. Browser storage failure produces an in-game message. Audio is off initially and can be enabled in Settings.

## Visual layout editing

Open [the layout workbench](http://127.0.0.1:4173/layout-editor.html) while the local server is running. Drag each character or action button, adjust its position and size, and check the landscape preview sizes. Undo, local draft saving, JSON import and export are included.

Use **Copy layout** or **Download JSON**, then give the layout to an agent to apply. The workbench is a placement tool: it shares the game's renderer, but draft edits do not modify the shipped game or its progression save. It also provides a concrete visual specification for a later Unity implementation. [Workflow and handoff notes](docs/layout-workbench.md).

## Source map

- `dist/core.js`: player data, save validation, progression, items, economy, reward settlement and fixed object pools.
- `dist/training.js`: five touch minigames.
- `dist/strength-layout.js`: replaceable Strength character placement and controller layout.
- `dist/strength-art.js`: Strength rendering shared by the game and layout workbench.
- `dist/layout-editor.html`: standalone drag-and-drop layout workbench; see `docs/layout-workbench.md`.
- `dist/battle.js`: automatic turns, critical windows, skills, waves and survival.
- `dist/art.js`: original procedural Canvas art; separate weapon/armor visual descriptors.
- `dist/game.js`: screens, Pointer Events, responsive canvas, lifecycle, settings and optional WebMCP navigation/read tools.
- `dist/style.css`: safe-area and landscape layout; short-screen rules.
- `docs/mechanics-map.md`: sourced research, adaptations and deliberately limited first-chapter scope.
- `tests/game.test.js`: meaningful reward, save, economy, combat and input tests. Run `node --test tests/*.test.js`.

## Swapping placeholder art

Stable item IDs are `weapon_t1` through `weapon_t3` and `armor_t1` through `armor_t3`. Gameplay stats live in `ITEMS`; appearance descriptors live in `EQUIPMENT_ART`. Replace the `hero`, `enemy` and `drawWorld` rendering functions with sprite or atlas renderers while retaining their arguments. Hero drawing uses feet as its origin, with independent weapon and armor layers. No gameplay logic depends on any asset filenames or shape details.

## Current milestone and release direction

The current first chapter provides a playable core loop. The production goal remains a fully completed, market-standard mobile game; release content, polish, device performance and App Store packaging/submission still require work. The full 30+ encounter campaign, mission ladders, extensive talents/consumables, secrets, expanded enemy roster, music and survival checkpoints are future work. All balance numbers are initial mobile-oriented tuning. Physical iOS Safari and Android Chrome playtesting remains necessary.
