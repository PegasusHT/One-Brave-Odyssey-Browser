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

## Install on iPhone

Use the permanent HTTPS link returned by the Sites deployment, rather than a changing Quick Tunnel address. The site retains its existing private access, so sign in with the owning account if prompted. In Safari, choose Share → Add to Home Screen, keep Open as Web App enabled and tap Add. Open the new Brave Odyssey icon while online, then check Settings → Ready for offline play before disconnecting. The existing landscape rotation prompt still applies.

The game files are cached on this phone after successful setup. Town, every trainer and arena play can then launch offline. Progress remains local to the installation; an old tunnel URL or a different browser installation does not automatically transfer its saved hero. Browser storage can be cleared by the user or device, so this is personal playtesting rather than cloud-backed save storage.

Reopen the installed app while online to check for a new release. Settings shows Install game update when one is ready. Finish an active training/arena run first; updates are disabled during it. Close other windows of this game before applying an update. The game saves and reloads once, keeping the current hero. Offline files are replaced only after the complete new version downloads successfully. Optional online fonts have offline fallbacks.

For future releases, bump `CACHE_NAME` in `dist/sw.js` whenever cached game files change, and keep its file list synchronized with runtime imports and icons. Publish the exact source to the same Site. `npm test` includes both gameplay and mobile-cache checks.

## Play

Every training run and retry now starts with a **1.5-second entrance**, with no countdown text. The goal bar, hero, partner where present, mission panel and controls briefly fade/settle into place. Attacks, scoring and mission timers wait until the entrance ends. Pausing, backgrounding or portrait rotation also freezes the entrance. Reduced motion shows the scene immediately while keeping the same 1.5-second preparation time.

Train to improve stats, spend skill points in Hero, and enter arena encounters for coins. The forge sells visible weapon and armor upgrades. The lodge increases battle income; gallery trophies earn passive coins. Tap the golden opening during auto-battles. Strength, Dodge, Block and Critical continue until you choose to leave; Accuracy lasts 30 seconds and can be paused. Leaving banks earned progress. Twelve encounters unlock endless survival.

In Strength, use the visible High, Low and Mid buttons on the right to slash fruit as it reaches your hero. High sits above Low; Mid sits to the right of Low. Use Kick on the left for falling sparks. Both characters occupy the central play area, with the partner throwing toward the hero. Only High fruit follows an arc. Mid travels horizontally at the middle height; Low travels horizontally near the feet, with a short crouch-and-release motion from the partner. Instructions appear for about four seconds on the first visit only. Town immediately banks the run and shows the total stats and XP, with Back to Town and Train again buttons; there is no confirmation step. Backgrounding or portrait rotation also pauses play.

The main goal display is a compact pale-blue bar with the multiplier at its right edge, matching the supplied reference. It has no title, numeric points fraction, reward footer or separate multiplier box. Side missions retain their number, objective and progress bar; reward previews are hidden. Successful actions briefly enlarge and highlight the existing combo number; collected stars use a stronger gold pulse. There are no floating stat-gain or mission-payout messages. Main-goal and mission completions still highlight their bars. A completed main goal briefly fills the bar for 240 ms, then shows its retained overflow toward the next goal. The fill is clipped inside the track, so low values do not render as a detached rounded dot. The diamond follows the fill edge, including during completion and rollover. Reduced motion keeps the brief color cue without scaling. Training results show only total stats and XP, with **Back to Town** and **Train again** buttons.

Strength, Dodge, Block and Critical use a growing multiplier to fill the main stat-goal bar. It starts at ×1: an ordinary orange hit, successful block/dodge or correctly cued Critical jump adds the current multiplier in points, then increases it by one. The next success adds 2 points, then 3, and so on. A collected Strength/Block star, perfect Dodge or Critical landing counts as two steps: at ×4 it adds 4 + 5 points and leaves the multiplier at ×6. Getting hit resets only the multiplier to ×1, preserving all main-goal points. Empty swings and skipped stars leave main progress and combo untouched.

Main goals require 4, 6, 8… points within each session, retaining overflow toward the next goal. Every completion gives a fixed +1 in the trained stat and +6 XP. Ground upgrades multiply points toward these goals, so they speed up stat gains without changing the fixed payout. Ordinary action credits still give 3 XP; stars give two credits. Strength, Dodge, Block and Critical no longer award an additional stat per four action credits. Completed rewards save during practice and are included once in the exit summary.

In Dodge, the hero stands at horizontal 40% and the partner at 60%. Jump over Low, Tuck under High, and step Back from Mid. **Jump is above Tuck on the right; Back uses Strength’s left-side Kick position.** The partner telegraphs each wooden-stick strike. A correct move within 320 ms before impact succeeds; the final **180 ms** counts as perfect and displays a brief star above the hero. This widens the previous 100 ms perfect window. Missing the perfect window is harmless if the dodge itself succeeds.

In **Block**, the hero stays in the center while oranges and stars approach in straight lines from all directions. Drag the white circular joystick on the right to aim the shield around the hero; releasing it centers the thumb control while leaving the shield facing its last direction. There are no action buttons. Block oranges with the shield, and move it out of the path of stars. An unblocked star collects at the hero for two action credits and a brief star marker. A blocked star bounces away with no reward, penalty, combo pulse or total-star mission credit; it emits a missed-star event for any mission explicitly requiring consecutive stars. Only orange contact resets the multiplier. Block uses the same main goals, numbered missions and totals-only bank/retry flow. The shield has a teal-and-brass face and follows the joystick immediately. It sits closer to the hand and remains upright in a low, slightly crouched guard, rather than turning upside down below the feet. The shield always draws in front of the hero, covering the head when raised and the legs when lowered. The hero turns toward it and braces on contact; oranges rebound with sparks, missed blocks show a brief hurt response, and stars glow and collect with a small ring and rising star. Sound-enabled play uses distinct block and star tones. Extra motion follows the in-game setting and the system’s reduced-motion preference.

In **Critical**, tap any open part of the scene to respond to the original straw dummy’s cues. There is no visible Hit button; the full play area accepts pointer-down input, with Town and the progress panels excluded. Keyboard users can focus the play area and use Space or Enter. Let the red **FAKE** cue finish without tapping to earn one ordinary success (+1 combo, weighted goal points and 3 XP, without a star). Tapping it resets the multiplier to ×1 while keeping earned main-goal points. Tap the first green **HIT!** cue to jump and gain +1 combo. After takeoff and a short variable wait, a second **HIT!** appears while airborne. Tap it to land a sword strike and earn a star for +2 more combo: the two-hit sequence gains +3 total, or +4 when it also includes a safely ignored fake. Missing either real cue or tapping without **HIT!** resets the combo to ×1. This includes rapid double-taps, fake cues, the airborne wait, landing, recovery and the time between rounds. An early airborne tap forfeits the star; extra taps during a pending landing also cancel its star. Earned goal points, stats and XP remain banked. Preparation, pause, results and UI controls are excluded. The first sequence includes a fake; later sequences may begin directly with the real cue.

Initial Critical windows are 650 ms for the first cue and 350 ms for the second, with a 300 ms rise plus a random 250–450 ms airborne wait before the second cue (550–750 ms after takeoff). A short landing completes the star award. Critical reuses fixed stat-goal payouts, combo pulses, its own saved mission number, the 1.5-second entrance and immediate Town results. Missions rotate through avoiding mistakes for 6 seconds, collecting 5 stars, completing 3 goals and reaching ×12. The polished scene includes a crouch and takeoff, tucked airborne pose, sword trail, landing compression, dummy recoil, straw and dust particles, a rising star and a smooth return to the start. Cue bubbles pop into view; the real cue has a shrinking timing line. Reduced motion keeps the cue and action states without trails, particles, recoil or scaling. Extra fingers, held keys and release clicks are ignored; each separate fresh tap is judged against the visible cue.

A small mission bar sits along the bottom left, beside the left thumb control where present. Strength missions rotate through avoiding hits for 6 seconds, collecting 5 stars, catching 5 consecutive stars, reaching ×12, and completing 3 main stat goals. Dodge and Block rotate through avoiding hits for 6 seconds, collecting 5 stars, completing 3 main goals, and reaching ×12. Each new cycle raises those targets: +2 seconds, +2 cumulative stars, +1 consecutive star (Strength), +4 multiplier, or +1 main goal. Mission #N pays +N in the trained stat and +6N XP as initial tuning.

Each trainer saves its own lifetime mission number. Leaving, retrying or reloading keeps the number/difficulty but starts that mission’s progress at zero, as requested. Ordinary pause/resume preserves the current attempt and does not count paused time. Getting hit restarts an avoid-hit timer and resets the active combo mission to ×1; skipping a Strength star restarts only a consecutive-star mission. Total-star and stat-goal mission progress survives hits. A single action cannot count toward two successive side missions.

Side-mission numbers and their rewards checkpoint together, preventing skipped missions or duplicate payouts after reload. Main-goal progress and the multiplier start fresh on entry. Town goes straight to banked results in every trainer; visibility/orientation pauses play and page hiding settles once. None of these four trainers awards a timed-session skill point; XP level-ups keep their normal rewards. Timing, mission difficulty and payouts remain initial phone-playtest tuning.

Progress is stored in localStorage under `one-brave-odyssey.browser.v1`. It belongs to the current browser/device and origin. Local and hosted previews have separate saves. Browser storage failure produces an in-game message. Audio is off initially and can be enabled in Settings.

Strength, Dodge, Block and Accuracy retain the **1.35× pace** revision. Strength fruit/stars move faster and throws arrive more often; Block travel to the shield takes about 1.56 seconds initially, with spawns about every 0.93 seconds. Dodge windup/strike and attack spacing are quicker, with its 320 ms safe / 180 ms perfect windows retained. Accuracy’s sight moves 35% faster. Critical uses its separate 650 ms / 350 ms cue windows. Strength/Dodge/Block retain their existing capped speed ramps and the 1.5-second entrance.

## Visual layout editing

Open [the layout workbench](http://127.0.0.1:4173/layout-editor.html) while the local server is running. Drag each character or action button, adjust its position and size, and check the landscape preview sizes. Undo, local draft saving, JSON import and export are included.

Use **Copy layout** or **Download JSON**, then give the layout to an agent to apply. The workbench is a placement tool: it shares the game's renderer, but draft edits do not modify the shipped game or its progression save. It also provides a concrete visual specification for a later Unity implementation. [Workflow and handoff notes](docs/layout-workbench.md).

## Source map

- `dist/core.js`: player data, save validation, progression, items, economy, reward checkpoints/settlement, mission definitions and fixed object pools.
- `dist/training.js`: five touch minigames.
- `dist/strength-layout.js`: replaceable Strength character placement and controller layout.
- `dist/strength-art.js`: Strength rendering shared by the game and layout workbench.
- `dist/dodge-art.js`: Dodge character placement, stick telegraphs, evasive poses and perfect-star rendering.
- `dist/block-art.js`: centered guard poses, rotating shield, fruit rebounds, hit effects and star collection; tuning is in `BLOCK_RULES` in `core.js`.
- `dist/critical-art.js`: original dummy, fake/hit cues, jump/strike/return animation and effects; timings are in `CRITICAL_TIMING` in `core.js`.
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

The current first chapter provides a playable core loop. The production goal remains a fully completed, market-standard mobile game; release content, polish, device performance and App Store packaging/submission still require work. The full 30+ encounter campaign, additional mission types, extensive talents/consumables, secrets, expanded enemy roster, music and survival checkpoints are future work. All balance numbers are initial mobile-oriented tuning. Physical iOS Safari and Android Chrome playtesting remains necessary.

## Mobile home screen and updates

The home screen provides Training, Arena, Shop, Legacy and the hero card; destination pages return through Town. There is no bottom tab bar. The header shows SkyHaven, gold and Settings. Small destination labels sit below their buildings with larger invisible touch areas. The town hero stands above Training and left of the arena; the compact hero card stays in the lower-left corner. Landscape layouts are checked down to 568×320; physical iPhone verification remains separate.

Local edits and GitHub pushes do not update the published phone app. Publish a tested version to the existing private Site, bumping the runtime cache identifier, then open the installed app online and choose Settings → Install game update once available. Finish any active run and close other game windows first. Apply the current update once in any local browser still using the old worker. Afterward, localhost, 127.0.0.1 and IPv6 loopback previews load current source on refresh while the server is running, falling back to their last installed cache when offline. The hosted phone app continues to use explicit updates.

## Arena layout preview

The Arena selection screen uses compact numbered encounters, a central hero/opponent display, reward totals and Fight. The explanatory card and duplicate headings are removed. The latest Arena work is a local layout preview; it has not been published. Jimmy requested visual previews first and no tests unless explicitly asked.

## Shared destination layouts

Training, Shop, Hero and Legacy now follow the approved Arena style: open landscape scenery, compact controls, original Canvas illustrations and concise decision information. Training keeps stat/level/yield values; Shop keeps gear bonuses and costs; Hero keeps stats, skill effects and XP; Legacy keeps building benefits and collection totals. Settings and Appearance are also shortened. Menu actions use the existing progression and purchase handlers.

These changes are local layout previews and have not been published. No tests were run, as requested. Previews were captured at a single 956×440 desktop-browser viewport; this does not establish gameplay correctness or physical-phone readiness.
