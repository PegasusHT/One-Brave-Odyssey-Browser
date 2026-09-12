# Strength projectile paths — 11 September 2026

- `npm test`: all 24 tests pass. Mid and Low keep constant simulation and projected heights across 20-step and 100-step flights, then accept the matching slash. Existing High parabola and shared gameplay tests pass.
- `art.js`, `training.js` and `strength-art.js` pass syntax checks.
- Focused Chrome touch checks at 844×390, 667×375 and 568×320 verified all three actual trajectories, successful button hits, banking the earned XP and returning to Town. No runtime errors occurred. Inspected the low-release pose near the partner’s feet. These checks use desktop emulation.
- The hidden agent server was stopped; the existing launcher now runs the server in visible macOS Terminal. No new server manager or editor was added for this change.

# Controller layout and workbench validation — 11 September 2026

- `npm test`: 23 tests pass. Added checks for the controller cluster at 844×390, 667×375 and 568×320, minimum targets, viewport bounds, hand-aligned projectile presentation and preservation of the parabolic high throw. Existing timing, scoring, rewards, saves and other trainer tests still pass.
- Changed and new JavaScript modules pass `node --check`.
- Desktop Chrome touch emulation at all three landscape sizes exercised the four visible action buttons, goal completion, misses, Town pause/resume, portrait and simulated visibility pausing, cash-out, repeated pagehide, reload and retry. Other trainers and arena entry/retreat remain functional. Controls remain at least 52 CSS pixels high.
- Inspected game screenshots at the landscape sizes. High is above Low, Mid is to its right, Kick is on the left, and the characters are within the middle play area. Scene tapping is no longer an attack input.
- Browser workbench checks passed: pointer drag, undo, numeric character movement, button resizing, reload of a local draft, invalid import rejection, valid JSON import, JSON download, animated preview and all preview sizes. Workbench interactions leave the game progression save untouched.
- No JavaScript runtime errors occurred in the checked browser flows. This is desktop emulation, not physical-device certification.
- Unity MCP read-only discovery returned zero connected Editor instances. Availability of tools is confirmed; actual Unity scene/UI editing was not attempted.

# Strength revision validation — 10 September 2026

- `npm test`: all 21 Node tests pass. Coverage includes Strength continuing and spawning past two minutes, bounded pools and capped speed, high-throw parabolic coordinates and hit detection, all three slash heights and rear sparks, escalating goals, miss resets that retain bonuses, tutorial save normalization/round trip, old saves, and idempotent cash-out. The other four trainers retain their timed completion and skill reward; existing progression and arena tests pass.
- Changed modules (`core.js`, `training.js`, `art.js`, `game.js`) pass `node --check`.
- Headless desktop Chrome with touch emulation checked 844×390, 667×375 and 568×320 landscape viewports. Strength's Town, kick and spatial slash targets are entirely inside the viewport and at least 52 CSS pixels high. The game document has no horizontal overflow. Inspected screenshots of live play and rewards at compact sizes; the compact result dialog has reduced spacing so its actions fit.
- Browser integration used controlled projectiles and actual touch taps to exercise high/middle/low slashes and the rear kick. Four hits complete the first goal, display the next target of six and bank +2 total Strength / +18 total XP. A following miss resets combo while retaining that bonus. Result totals and the saved Strength value agree.
- Verified Town immediately opens the pause dialog, elapsed simulation freezes until Resume, portrait rotation and a simulated visibility change suspend play, and menus/header restore on exit. Verified first-visit instructions disappear and do not reappear after a save/reload or retry.
- Verified repeated `pagehide` dispatch after cash-out leaves the serialized save unchanged. Also exercised `pagehide` before manual cash-out and a simulated persisted `pageshow` return to Town, preserving the earned reward exactly once.
- Opened, paused and exited all four other trainers at each size, confirming their visible header, timer and Pause controls. Arena entry, health HUD and retreat remain functional. No JavaScript runtime errors occurred in these checked flows.
- Browser checks used the locally available Playwright/Chrome runtime, without adding project dependencies or a build step. The existing local server and phone-tunnel launchers are unchanged.

Initial reward tuning is +1 Strength / +6 XP per completed goal, with targets 4, 6, 8… . Ground upgrades apply to ordinary hit rewards only. Strength grants no extra timed-session skill point; XP level-ups retain their existing rewards. Actual timing feel, reward pacing and longer-session balance need playtesting on Jimmy's iPhone 17 Pro Max.

These are desktop emulation and scripted lifecycle checks, not physical iPhone or Safari certification. Real notch/safe-area behavior, task switching, touch feel, audio unlock, thermal/performance behavior and App Store readiness remain unverified by this pass. The earlier physical phone play reported in build progress predates this revision.

# Earlier prototype validation — 9 September 2026

- 14 Node tests pass: save round trips, corrupt/unavailable storage, equipment costs and equips, upgrade yields, reward idempotency, partial training, XP/skill/stat spending, arena unlocks and repeat rewards, survival payouts, passive-income cap, fixed pools, valid/missed inputs in all five trainers, session countdown/end, combat cooldowns/healing and wave completion.
- All JavaScript modules pass syntax checks; all module import paths and the static hosting entrypoint resolve.
- Browser UI tested at landscape 844×390, 667×375, and 568×320. Measured combat targets remain inside the viewport, at least 53 px high; training targets are at least 44 px high. Five training entry buttons fit at 844×390. Forge width matches its scrollable content at 568×320.
- Found and fixed training buttons below the fold, instructions covering a hit zone, shrinking hero sections overlapping skill cards, and narrow forge horizontal overflow.
- Browser interaction verified: start strength trainer, pause, bank partial rewards, return; learn Sunflare; enter encounter 1; activate Sunflare and observe 12s cooldown; complete three waves; receive 48 coins, 33 XP and a skill point; reload and read back the persisted arena clear and 168 coin balance; purchase armor_t2 for 150 coins and observe 131 maximum HP and equipped state.
- No browser runtime errors observed during the tested journey.
- Both optional WebMCP tools registered with expected schemas; progress read and destination navigation succeeded; invalid destination and unexpected read arguments were rejected.

These are desktop-browser viewport tests, not physical-device certification. iOS Safari / Android Chrome touch feel, actual notch insets, safe-area behavior, audio unlock and mobile task-switch behavior still need on-device playtesting. All five trainer scoring paths are covered in logic tests; only strength was manually exercised in the browser during this pass. Local test progression is separate from the fresh hosted game save.
