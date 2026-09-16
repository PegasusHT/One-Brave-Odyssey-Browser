# Independent equipment integration — visual preview only, 16 September 2026

- Local desktop previews covered Set A Standing/Raised at 844×390; both complete sets Standing at 1100×600; Set B Raised/Airborne/Landing; and Set A armor with Set B helmet/bottoms in Attack. The four Shop categories and new item images were also visually reviewed at 844×390. Screenshots `equipment-set-a.png`, `equipment-set-b.png` and `equipment-shop.png` are in the thread's 16 September visualization directory. This is not a claim that every combination or animation transition has been reviewed.
- Six supplied armor/helmet/bottoms A/B PNGs are copied unchanged into `dist/assets/hero-equipment/`. `MODULAR_EQUIPMENT_ART` supplies their garment-part attachments to the shared rig. The base sheets and complete starter sprites are retained; modular rendering has no hair, and the weapon arm stays in front of the head.
- Source review confirms four independent shop categories, saved helmet/bottoms slots with base defaults for older saves, and additive armor/helmet/bottoms HP. Existing armor IDs, prices and bonuses remain stable. This is source inspection, not purchase, migration or save-persistence testing.
- Shared render entry points now cover previews, portraits and item illustrations; `hero-art.js` routes town/training and `action-art.js` routes Critical/Arena for equipped upgrades. Live gameplay, purchase/re-equip persistence, animation transitions and loading fallbacks were not exercised. The reviewed static poses and mixed outfit do not establish gameplay correctness.
- No tests, scripted assertions, responsive matrix, offline checks, deployment or physical-device checks were run. Cache `obo-game-2026-09-16-4` lists the new hero wrapper and six equipment PNGs; update activation behavior is unchanged. This version is local only.
- Neck/head contact, near-side diagonal alignment, far-palm repair, later shields/swords and the proposed visual editor remain explicit follow-ups.

# Continuous lift and foreground arm — visual preview only, 16 September 2026

- Visually inspected the bald Raised arm pose with both swords and started the revised attack playback at 844×390. The near arm, hand and sword now draw over the head. Captured `hero-rig-foreground-no-hair.png` in the current thread visualization directory. No browser errors appeared during the preview.
- Removed intermediate lift/takeoff waypoints whose per-segment easing stopped the arm midway, plus the extra duplicate windup hold. The upward intervals now use one continuous smoothstep segment with the same unwrapped counterclockwise direction. This is a source-based timing correction and visual preview, not a frame-rate benchmark or gameplay test.
- Hair calls and descriptors are removed from the rig; original source sheets and the approved full starter sprites are retained. Upgraded outfit fitting uses the bald modular head.
- No tests, scripted assertions, responsive matrix, offline checks or physical-device checks were run. Existing server reused. Cache `obo-game-2026-09-16-3` is local only and unpublished.

# Counterclockwise preparation and helmet rule — visual preview only, 16 September 2026

- At 844×390, viewed Raised arm with both sword samples, Airborne with the supplied blade pointing behind the head, the horizontal forward attack endpoint, and attack playback entering its front lift. The same head/hair now occludes the cocked hand. These are visual previews, not a gameplay or physical-device test.
- Source review confirms the weapon arm and wrist use unwrapped authored angles, preserving counterclockwise preparation. Grip position, fist rotation and blade rotation share one hand transform. Final attack/landing mounting angles remain horizontal.
- The helmet preference is documented and both hair layers honor a supplied helmet attachment ID. Helmet art/equipment UI does not yet exist, so no equipped-helmet visual result is claimed.
- No tests, scripted assertions, responsive matrix or offline checks were run. Existing local server reused. Cache `obo-game-2026-09-16-2` is local and unpublished; no new assets or dependencies.

# Modular body assembly — visual preview only, 16 September 2026

- Added Hero → Animation preview inside the existing app. Inspected actual local renders at 844×390 for Standing, Raised arm, Attack, Airborne and Landing. Viewed attack playback and Play/Pause, then left the jump/landing preview available. Both procedural tier-1 and supplied tier-3 swords were viewed on the same hand attachment. No browser errors were reported during the preview.
- Inspected the supplied upper/lower sheets and their alpha bounds; copies are unchanged. Fitting uses explicit component crops, independent initial scales, neck/pelvis clipping, separate hair alignment, mirrored far foot, internal limb-end clipping and temporary skin-colored joint fills. These prove assembly and expose art limitations; they do not certify finished anatomy, perfect grip in every frame or polished motion.
- This is a base-body and weapon prototype. No armor/helmet/bottom/shield swap or gameplay migration is claimed. Landing is a compression pose awaiting art/motion review; it is not a completed ground-contact strike. Existing portrait and action renderers remain in use outside the preview.
- Source review covered chained arm/hand transforms, current leg reach, shortest-path angle interpolation and preview clock guards. Visibility, orientation and reduced-motion handling were read, not exercised as a regression suite. No tests, scripted assertions, syntax-test commands, responsive matrix, offline check or physical-phone check was run, per Jimmy's preference.
- Reused the running local server. No separate editor, paid generation, dependency or new server was added. Cache `obo-game-2026-09-16-1` includes `rig-art.js` and the two source sheets. Local only; not published. Targeted repair prompts are in `docs/hero-rig-next-art.md`.

# Horizontal sword refinement — visual preview only, 15 September 2026

Set idle, Critical descent/landing and Arena strike/follow-through/recovery sword angles to horizontal. Inspected a single frozen three-pose comparison rendered with the real sprite helpers and tier-3 sword; no tests, gameplay checks or physical-device checks were run. The temporary preview page was removed. Cache `obo-game-2026-09-15-3` is local and unpublished.

# Critical/Arena supplied action art — visual preview only, 15 September 2026

- No test suite, scripted gameplay assertions, responsive matrix or physical-device checks were run for this revision, following Jimmy’s default preference. The prior 65-test result below belongs to the idle integration.
- Desktop browser snapshots at 844×390 show Critical airborne/ground impact poses and Arena normal-attack follow-through, including the separate tier-3 blade. These use a temporary in-memory game fixture with frozen presentation states, so they demonstrate composition rather than live input, animation smoothness or scoring correctness. The fixture was removed and did not change the persistent player save. No browser error logs appeared during these previews.
- Inspected one composite of the jump runtime sheet: all six silhouettes retain the cream clothing and eyes, and the checkerboard gaps are transparent. Pixel component inspection identified and excluded neighboring art in attack frames 3 and 6.
- A focused source review found the normal attack timestamp is assigned only on automatic hero turns; action rendering follows existing Critical phases and active battle time. Gameplay timing, damage, inputs and settlement code paths were retained. This is source review, not execution-based regression coverage.
- Cache `obo-game-2026-09-15-2` includes both new action assets and the new renderer. Not published. Jimmy should review live takeoff/landing transitions, sword attachment and the Arena windup/strike/recovery sequence before further art tuning.

# Idle portrait art integration — 15 September 2026

- Explicitly requested `npm test`: all 65 existing tests pass (59 gameplay and six mobile-cache tests). No tests were added or changed. `game.js` and the new `portrait-art.js` pass syntax checks; diff whitespace checks pass.
- One focused browser pass displayed the first Shop placement at 844×390, then used a temporary copy of the game with in-memory storage and 1,000 test coins to exercise the unchanged Forge actions. Bought tier 3 for 650 coins and saw the supplied image; equipped tier 1 and saw the procedural fallback; bought tier 2 for 180 coins; re-equipped the owned tier 3 for free and opened Hero with that same supplied blade. The final test balance was 170 and equipped ID was `weapon_t3`. No browser error logs appeared. The temporary fixture was removed and did not write the persistent player save.
- The isolated Shop/Hero screenshots used the browser’s default 1280×720 viewport. No extended visual iteration, responsive matrix, action-animation integration or physical phone testing was performed. Hero size, frame cadence, sword size/angle and grip placement await Jimmy’s visual feedback.
- Runtime PNGs were copied unchanged after confirming existing alpha transparency and actual sizes: idle 1536×1024, blade 2172×724. Cache `obo-game-2026-09-15-1` lists both images and `portrait-art.js`. Existing update activation behavior is retained. This change has not been published.

# Installable mobile game and offline updates — 12 September 2026

- All **63 Node tests pass**: 59 gameplay tests and four mobile tests covering real precache files/icon dimensions, offline shell/module responses, atomic failure without deleting the previous cache, explicit activation, other-window protection and cache cleanup limited to this game.
- Real service-worker checks on the existing local server pass at **844×390, 667×375 and 568×320**. After the initial download, browser network access is disabled and the game reloads successfully. All five trainers and arena work offline; rewards bank and saved progress survives another offline reload. Settings displays Ready for offline play. No runtime errors or document overflow occurred.
- An isolated replacement worker confirms the new version waits during training, Settings disables applying it during a run, another open game window blocks activation, and applying from Town saves and reloads exactly once. The updated version also launches offline. The temporary test worker was removed before publication.
- Inspected the original hero icon and Settings/training screenshots. JavaScript syntax checks and `git diff --check` pass. No new dependency or server was added; the existing local server was reused.
- These results are desktop Chrome emulation. Actual Home Screen installation, private-site sign-in, iOS offline relaunch and storage behavior still need the target iPhone check. A permanent hosted origin/install does not automatically import saves from an earlier temporary tunnel origin.

# Moving goal diamond and fake-avoidance reward — 12 September 2026

- All **59 gameplay tests pass**. Coverage includes one ordinary reward exactly at an untouched fake cue’s deadline at 30/60/120 Hz, no reward before that deadline, no reward for a tapped/interrupted fake, no perfect-mission credit, +4 across a fake plus both real hits, and once-only settlement. Existing timing, penalties, missions and progression checks pass.
- Chrome touch checks at **844×390, 667×375 and 568×320** verify the diamond’s center stays on the actual fill edge in all four practice scenes at empty, low, half, near-full and full values, during animation, rollover and reduced motion. Inspected screenshots of marker positions and fake avoidance.
- A safely ignored fake takes ×1 to ×2 and banks **+0 Critical / +3 XP** when exited immediately; repeated pagehide cannot repay it. Tapped fakes award nothing and reset combo. Pausing freezes a partially elapsed fake; retry resets the run. No runtime errors or document overflow occurred.
- Modified JavaScript passes syntax checks; `git diff --check` is clean. No server, dependency or editor was added. Checks load local source through browser routes and use desktop touch emulation, not a physical iPhone.

# Critical penalties, delayed cue and main-goal rendering — 12 September 2026

- All **57 gameplay tests pass**. Added/revised expectations for both real-cue timeouts, every no-cue phase, same-moment double-taps and early inputs, cancelled pending stars, retained points/stats, once-only expiry, 550–750 ms delay bounds, successful +3 sequences, cue boundaries at 30/60/120 Hz, all-phase settlement, star missions, indefinite play and reduced motion. Earlier keep-combo-on-missed-second expectations are superseded by Jimmy’s latest request.
- Chrome touch checks pass at **844×390, 667×375 and 568×320**. Actual taps verify rapid double-tap and waiting-phase penalties, first/second real-cue expiry, valid star timing and no cue announcement while waiting. Earned points are retained. Visibility pause stops the new wait clock; resume continues it. Town/HUD taps, held keys, second fingers and touch release do not create gameplay mistakes. Retry, repeated pagehide, portrait pause and reduced motion work.
- All four practice scenes show the brief full-bar completion, followed by the exact **2/38** remainder in the level-5 **×19** reproduction. The visible fill’s measured width matches the accessible progress value. Empty, half-full and nearly-full states are also checked. The low fill is clipped into the track with no independent rounded end; screenshots were inspected at all three sizes. No HUD overflow or JavaScript errors occurred.
- Modified modules pass syntax checks and `git diff --check` is clean. No server or new dependency/tool/editor was added. Browser routes read actual local source files; these are desktop emulation results, not physical iPhone testing.

# Critical polish and tap-anywhere input — 12 September 2026

- All **55 gameplay tests pass**. Updated obsolete Critical pulse/timed-completion and save-shape expectations. Added fake/ignored cues, exact cue boundaries at multiple frame rates, duplicate inputs, +1 takeoff/+2 landing, early/missed second-cue retention, star missions, checkpoint/exit in every phase, independent save normalization, indefinite play and bounded effects. Shared mission/goal tests now include Critical. Accuracy retains its timed completion reward.
- Chrome touch emulation passes at **844×390, 667×375 and 568×320**. Blank-space taps on either side act on pointer-down. Town, the goal meter and the mission card do not hit. No visible Hit button remains. Right-clicks, second simultaneous fingers, held Enter and touch release do not add credits; fresh Space/Enter and touch presses work.
- Actual UI input verifies the fake penalty, jump credit, second-cue strike and +3 total combo, with star credits awarded only on landing. Early or missed second input retains the earned +1. A completed first sequence banks **+1 Critical / +15 XP**; Town opens totals directly, retry restarts the 1.5-second entrance, and repeated pagehide cannot pay again.
- Visibility pause/resume is checked during fake, ready, rise, finish, land, recovery and reset. Portrait rotation pauses play; input while paused does not alter the sequence. System reduced motion preserves +3 scoring and color feedback while removing combo scaling and decorative effects.
- Inspected screenshots of entrance, fake/real cues, takeoff, airborne cue, sword descent, landing/star and reduced motion. HUD and mission panels stay in bounds. Other trainers retain their controls and direct Town results, and blank-space taps do not trigger their actions. No runtime errors or horizontal document overflow occurred.
- Modified JavaScript modules pass syntax checks; `git diff --check` is clean. No HTTP server, dependency, editor or additional app was started or added. Browser routes loaded the actual local `dist/` source. These are desktop-emulated checks, **not physical iPhone testing**; final touch/timing and animation feel need device play.

# Critical MVP — prior revision, validation was deferred

Jimmy requested the same MVP-first workflow used for Block. The Critical cue/jump/landing sequence, original dummy, one Hit button and shared progression are implemented as an interaction draft. Jimmy confirmed that a missed second cue keeps the +1 earned from the jump and gives no star.

No tests, syntax checks or browser/phone checks were run for this draft. The 48-test result below predates Critical’s replacement; existing pulse-game, timed completion and exact save-shape expectations require updates after approval. Follow-up coverage should include fake taps, ignored first cues, valid jumps, early/missed/valid second taps, exactly +3 combo across a full sequence, once-only landing rewards, pause/exit during each phase, independent Critical mission/save defaults, retries and all three landscape sizes. The shared entry/exit and rewards code was extended but is not revalidated for this MVP.

No server, editor or new dependency was started or added.

# Foreground shield and direct training results — prior revision

- All 48 existing gameplay tests pass; `game.js` passes syntax checking and `git diff --check` is clean.
- Chrome touch checks at 844×390, 667×375 and 568×320 verify that Town in each of the five trainers immediately shows only total stats, XP, Back to Town and Train again. No intermediate confirmation or Resume/Bank & leave controls appear on this route.
- Checked +3 stat/+33 XP practice totals and +2 stat/+24 XP timed-trainer partial totals; simulation stops after settlement. Retry and an immediate exit during the 1.5-second entrance produce zero new rewards and preserve the previous save. Repeated pagehide after results does not pay again, and both result buttons remain in bounds.
- Inspected actual touch-aimed upper, upper-diagonal and lower Block screenshots. The shield overlays the head/body at every angle. Automatic visibility pause still opens its existing Resume flow.
- No runtime errors occurred. Browser routes served the actual local project files; no HTTP server was started. These checks are desktop emulation, not physical-phone testing.

# Block star rules, pacing and combo feedback — prior revision

- `node --test --test-reporter=spec tests/game.test.js`: all 48 tests pass. Added blocked-star neutrality, one-time deflection and total-star mission preservation; the explicit consecutive-star exception; initial pace across all five trainers; and combo pulse/reduced-text behavior. Updated shield-radius and old star-pass-through expectations. Existing progress, save, mission, safe/perfect timing, pool and settlement tests pass.
- Browser touch checks pass at 844×390, 667×375 and 568×320. Actual successful inputs in all five trainers produce the combo highlight/scale cue with no floating success text. A collected Block star produces the stronger gold cue; a blocked star triggers neither a new combo cue nor any reward/penalty. Main and mission progress remain unchanged by neutral deflection.
- Inspected screenshots of low, lower-left, lower-right and side guard poses, retained shield artwork, mint/gold combo cues and deflected stars. The low shield stays upright and close to the hand/body. Existing controls, progress bars and instructions stay in bounds.
- Browser checks retain the +3 Block/+33 XP settlement case, independent saved mission number, fresh partial progress on retry, touch capture/release/cancel, paused entrances, portrait/visibility pausing and idempotent pagehide. Reduced motion retains color feedback without scaling. No JavaScript runtime errors or document overflow occurred.
- `game.js` passes syntax checking and `git diff --check` is clean. No HTTP server or new tool/editor was started; browser routes read the actual project files.

These checks use desktop Chrome emulation. Faster timing and low-guard feel still need physical iPhone playtesting.

# Block polish and 1.5-second entrances — prior revision

- `node --test tests/game.test.js`: all 44 tests pass. Updated obsolete timed-Block and two-trainer save expectations, extended weighted goals and all mission types to Block, and added directional/wrapped-angle interception, late-shield rejection, automatic stars, once-only banking, Block mission persistence, bounded pacing/effects and reduced-motion scoring coverage.
- Entrance tests cover every trainer, no scoring/spawns/mission time during the 1.5-second preparation, correct remaining-time handling, retry reset and reduced-motion presentation.
- Chrome touch emulation passes at 844×390, 667×375 and 568×320. Actual touch drags cover cardinal and diagonal directions, dragging beyond the joystick bounds, release and cancellation. All compact HUD/mission/control bounds fit without overlap; no countdown element remains.
- Browser checks exercise three successful blocks, a star passing through the shield before collection, contact retaining goal points, mission #1 saving independently, +3 Block/+33 XP settlement, repeated pagehide, and retry with a saved mission number and fresh partial progress. No duplicate rewards or runtime errors were observed.
- All five trainers show the 1.5-second entrance and restart it on retry. Pause, portrait rotation and simulated visibility changes stop the entrance. System reduced motion displays the panels immediately while preserving preparation time. Desktop screenshots cover Block composition, rebound/impact effects, star collection and Strength/Dodge entrances.
- `game.js` passes syntax checking and `git diff --check` is clean. Browser checks read actual project files via Playwright routes; no HTTP server was started.

These are desktop-emulated checks, not physical iPhone testing. Final touch feel, audio feel and long-term balance still need target-device play.

# Compact training UI — previous revision

- All 38 existing Node tests pass. The existing stat-gain message assertion now expects the shortened “+1 Dodge” text. Scoring, mission payouts, saves and timing are unchanged.
- `game.js` and `training.js` pass syntax checks; `git diff --check` is clean.
- Chrome touch emulation at 844×390, 667×375 and 568×320 verifies the main bar contains only its graphical progress and multiplier, with no separate combo box, title, numeric fraction or reward footer. Side-mission reward footers are absent. Main progress remains accessible through the native progress element and its value description.
- All five trainer result dialogs contain exactly their total trained-stat gain, total XP and the Back to Town / Train again buttons. Checked actual result totals against session settlement, including +3 Dodge / +33 XP. Buttons remain reachable, and returning/retrying works.
- Inspected screenshots of both revised scenes and the compact result dialog against Jimmy’s reference. Controls, main bar and side mission fit without overlapping at all three sizes. Contact text is absent and stat gains read only “+N Stat”.
- Existing browser scoring, mission progression/reload, pause/orientation/visibility and repeated pagehide checks pass with no runtime errors. Browser waits synchronize with rendered frames before reading checkpointed saves. The check loads project files through Playwright routes and starts no HTTP server.

These are desktop browser checks, not physical iPhone testing.

# Weighted stat goals and lifetime missions — previous revision

- `node --test tests/game.test.js`: all 38 tests pass. Coverage includes increasing point weights; stars taking ×4 to ×6; retained main-goal points after contact; fixed stat payouts; ground upgrades speeding progress; all nine trainer/mission combinations; increasing targets and payouts; widened perfect timing boundaries; and prior progression/combat regressions.
- Mission tests verify active-time-only avoidance, contact resets for avoidance/combo, cumulative star counts, consecutive-star resets only on skipped stars, main-goal completion counts, one action not advancing two side missions, and independent lifetime mission numbering. Old/malformed saves normalize missing numbers to 1.
- Checkpoint tests verify mission number and reward are saved together, repeated checkpoints do not duplicate rewards, exit/pagehide settlement remains idempotent, and partial mission progress starts at zero on the next entry while the saved mission number stays unchanged.
- Chrome desktop touch emulation passes at 844×390, 667×375 and 568×320: Dodge Back matches the left Kick position, Jump is above Tuck, controls remain at least 52×52 CSS pixels, and the mission panel stays inside the viewport without overlapping controls. Inspected screenshots of both scenes, mission completion and the compact result dialog.
- Browser interactions exercise actual orange trajectories, empty inputs, Strength stars/skipped stars, contact preserving main points, the widened 150 ms perfect-dodge case, mission #1 auto-checkpoint, cumulative stars, consecutive stars, combo-mission completion, partial progress restarting on entry and mission number surviving reload. A session with three ordinary actions, one star and the first side mission banks +3 trained stat/+33 XP; results and saved state agree.
- Town pause/resume, portrait rotation, simulated visibility changes, repeated pagehide, persisted pageshow, retry and all three remaining timed trainers pass browser checks. No JavaScript runtime errors or horizontal document overflow occurred. Initial checks reused the existing visible server. After it stopped, final checks fulfilled browser requests from the actual `dist/` files through Playwright routes, without starting an HTTP server.
- Modified JavaScript modules pass `node --check`; `git diff --check` is clean. No dependencies, scene editor or server manager were added.

Current tuning: safe Dodge input within 320 ms before impact; perfect within the last **180 ms**, widened from 100 ms. Main goals remain 4, 6, 8… weighted points with fixed +1 stat/+6 XP and retained overflow. Side mission #N gives +N trained stat/+6N XP. These are desktop-emulated checks; phone timing feel and long-term mission/reward balance still need playtesting.

# Dodge revision and Strength penalties — 11 September 2026

- `npm test`: all 31 Node tests pass. Added coverage for harmless Strength empty swings/skipped stars; all three Dodge mappings; safe/perfect timing boundaries; wrong, early and late actions; action cooldown; one resolution per stick attack; perfect-star extra credits; goal-message preservation; upgraded yield; once-only settlement; old-save tutorial compatibility; and continued Dodge play beyond two minutes with capped cadence and bounded pools.
- Modified JavaScript modules and the new `dodge-art.js` pass `node --check`; `git diff --check` is clean.
- Desktop Chrome touch emulation at 844×390, 667×375 and 568×320 exercised the actual High/Mid/Low Strength paths and hit buttons, all four empty actions, skipped stars and orange contact. High remains parabolic, Mid/Low horizontal. Three earned hits still bank 9 XP after subsequent empty inputs and an orange collision.
- At all three sizes, Dodge’s Tuck/Jump/Back buttons are in bounds, at least 52×52 CSS pixels, and use the requested right-side arrangement. The immersive scene has no timer or Kick button. Inspected the 40%/60% character composition, stick and all three evasive poses in screenshots, including the perfect star and compact reward dialog.
- Browser-controlled attacks exercised all three correct dodge inputs, an additional perfect dodge, goal completion and a cash-out of +2 Dodge/+21 XP for five credits (three ordinary dodges plus one perfect). The star bonus, combo, goal meter and saved totals agree. A perfect dodge that crosses a goal preserves the goal-completion message.
- Verified countdown blocks input, first-visit instructions appear, retry skips them, Town freezes simulation and Resume continues, portrait rotation and simulated visibility changes pause play, repeated pagehide after cash-out does not change the save, and pagehide before manual cash-out banks the pending perfect reward exactly once. A simulated persisted pageshow restores Town.
- Opened, paused and banked all three remaining timed trainers at every size; arena entry, health HUD and retreat remain functional. No JavaScript runtime errors occurred in these flows. There is no horizontal document overflow.
- Used the existing `start-game.command` to reopen the stopped server in a visible macOS Terminal. No new scene editor, server manager, project dependency or build step was added.

Initial Dodge timing is a 320 ms safe window before impact, with the final 100 ms perfect. Perfect stars add one ordinary hit credit, matching Strength stars. Streak goals award +1 Dodge/+6 XP at 4, 6, 8… credits. Timing feel, animation quality and reward pacing still require playtesting on the target iPhone; these checks are desktop emulation, not physical iOS testing.

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

## Mobile home UI — 12 September 2026

- All 63 existing gameplay and service-worker tests pass; JavaScript syntax and diff whitespace checks pass.
- Desktop Chrome touch viewports: 956×440, 844×390, 667×375, 568×320. Verified home labels, absence of bottom tabs, on-screen non-overlapping controls and minimum 44-pixel targets, every destination/return route, Settings, all five trainer exits and offline reload. Exercised an 18-character name and 999,999,999 gold.
- Inspected 844×390 and 568×320 screenshots. No page errors or document overflow. Existing gameplay rules are unchanged. The existing local server was reused.
- Prepared cache `obo-game-2026-09-12-2`; home changes are not yet published. Phone installation of the preceding release was confirmed by Jimmy; this revision has not been physically tested on iPhone.

### Home placement refinement

Checked the smaller hero card and labels below buildings at 956×440, 844×390, 667×375 and 568×320 in desktop Chrome. Corrected a slight Legacy/hero-card overlap at the smallest viewport. Home controls remain separated and at least 44 pixels, with destination routes, Settings and offline reload intact. Long-name and large-gold rendering were rechecked. No runtime errors; JavaScript syntax and diff whitespace checks pass. Prepared local cache `obo-game-2026-09-12-3`; not published or physically iPhone-tested.

### Smaller map labels and town hero placement

Desktop Chrome checks pass at 956×440, 844×390, 667×375 and 568×320. Verified 30–34-pixel visible label heights, text no larger than 15 pixels, at least 44-pixel button targets, separated home controls and no label over the town hero. Destination navigation/returns, Settings, offline reload, long names and large gold totals remain functional. Inspected screenshots at 844×390 and 568×320; no runtime errors or document overflow. Syntax and diff whitespace checks pass. Local cache is `obo-game-2026-09-12-4`; not published or physically iPhone-tested.

### Local refresh correction and home release

All 65 Node tests pass (59 gameplay, six mobile cache). New worker checks cover network-first localhost/127.0.0.1/IPv6 refreshes with offline fallback and unchanged cache-first hosted behavior. In actual Chrome at localhost and 127.0.0.1, marked cached JavaScript is skipped on an online reload and used on an offline reload. The latest home screen loads in both cases without page errors. No save storage was reset; no server was started. Release cache: `obo-game-2026-09-12-5`. Previously installed workers need one explicit update before the local-refresh correction takes effect. Physical phone update verification remains with Jimmy.

## Arena selection layout — preview only

At Jimmy’s request, no tests were run for this revision. A single 956×440 browser screenshot was captured to present the local layout, without assertions or gameplay/regression checks. No physical-device validation or responsive matrix is claimed. Arena navigation, stage selection, battle start and rewards retain their existing handlers; the new presentation has not been tested. Local cache `obo-game-2026-09-12-6` is not yet published.

## Shared destination menus — preview only

Training selection, Shop, Hero and Legacy layouts were displayed for 956×440 screenshots. Settings and Appearance copy was shortened. No tests, scripted assertions, purchases, upgrades, skill/stat spending, gameplay checks or responsive/device matrix were run, at Jimmy's request. The screenshots are visual previews only. No runtime or physical-device validation is claimed. Existing action handlers and core progression functions are retained. Local cache `obo-game-2026-09-12-7` is not yet published.

## Menu release publication — 12 September 2026

The native Sites deployment reported success at 09:49:44 UTC for Site version 3, source `148ec4b67631e23acb071bff95ec2ea781367f5b`, cache `obo-game-2026-09-12-7`. No tests or additional browser QA were run for publication. Existing owner-private access was retained. Actual phone update and gameplay remain unverified.
