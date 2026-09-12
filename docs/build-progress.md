# Browser build progress

Last updated: 12 September 2026

## Purpose and direction

The goal is a sellable, playable, fully completed game that meets market expectations and can be published on the App Store. Mobile landscape is the primary experience, with iPhone 17 Pro Max as the current target phone. Broader responsive support will be developed in a future iteration; existing compact landscape checks remain regression coverage.

JavaScript and the browser currently provide a fast development path for a playable MVP, gameplay experiments and concrete layout references. AI agents can iterate efficiently here. The production goal remains a polished commercial game. Jimmy wants direct control over UI placement, scene objects and animations, and is evaluating Unity for the polished version. Preserve this browser build as the playable behavior and layout reference if production moves to Unity.

A Unity conversion remains a production option, including when its visual editing workflow better supports Jimmy’s design process or when expanded content/browser limitations justify it. If needed, use the browser behavior as the reference and port complete vertical slices deliberately. There is no commitment to a Unity port before release; packaging, device performance, release content, polish and App Store readiness still need to be completed and validated.

The current loop includes town, five training minigames, stat and skill growth, mostly automatic arena battles with tap events, coins, equipment, training-ground upgrades, lodge/gallery progression, twelve encounters and endless survival. The setting, names, procedural art and interface are original. The accepted visual direction is a colorful sky-island town with a small teal-scarf adventurer.

## Current working build

- Authored source is in `dist/`; there is no compilation step.
- `dist/core.js` owns player data, save normalization, progression, rewards, economy and fixed pools.
- `dist/training.js` owns all five training simulations, including Critical’s approved cue/jump/landing game.
- `dist/critical-art.js` renders Critical’s original dummy, cue bubbles, jump/strike/return animation and effects. `CRITICAL_TIMING` in `core.js` owns timings; `CRITICAL_ART` in `art.js` owns appearance positions and scale.
- `dist/strength-layout.js` owns Strength placement and the controller positions reused by Dodge; `dist/strength-art.js` renders Strength in the game and the layout workbench.
- `dist/block-art.js` renders the centered Block scene; `BLOCK_RULES` in `core.js` defines its collision geometry and initial pacing. The white joystick is bound in `game.js`.
- `dist/dodge-art.js` renders Dodge at fixed 40%/60% character positions. Dodge timing descriptors live in `dist/core.js`; attack resolution and rewards use `dist/training.js` and `settleTraining`.
- `dist/layout-editor.html` is a standalone visual placement tool with a separate local draft and JSON export.
- `dist/battle.js` owns arena and survival combat.
- `dist/art.js` owns replaceable procedural Canvas art and equipment appearance descriptors.
- `dist/game.js` owns screens, input, settlement, saving, lifecycle and optional WebMCP tools.
- Progress persists in `localStorage` under `one-brave-odyssey.browser.v1`.
- Stable equipment IDs are `weapon_t1` through `weapon_t3` and `armor_t1` through `armor_t3`.
- Last tested release: all 59 gameplay tests and six mobile-cache tests passed, including Critical’s fake-avoidance credit, miss/no-cue penalties, delayed airborne cue, lifetime mission normalization and once-only settlement. Chrome touch checks pass at 844×390, 667×375 and 568×320 with no runtime errors or overflow. These are desktop-emulated checks; physical iPhone playtesting remains.

## Running and phone testing

- Double-click `start-game.command` to start a visible macOS Terminal server, or run `npm start` in Jimmy’s own terminal from this folder. Open `http://127.0.0.1:4173`. Control-C stops the server; rerun the launcher or `npm start` to restart. The previously hidden agent server was stopped and replaced with the existing visible launcher on 11 September.
- Source edits appear after refreshing the page; the server normally does not need a restart.
- The landlord network isolates local devices, so `start-phone-test.command` opens an ephemeral Cloudflare Quick Tunnel to the local server. It requires the local server to be running. The public URL changes each time, has no account/backend requirement, and exists only while both Terminal windows remain open.
- Do not record an old Quick Tunnel URL as permanent hosting.
- Physical phone play has been confirmed through the tunnel, but the full device matrix and detailed touch feel still need testing.

## Completed Strength revision

Implemented the revision in `docs/next-strength-training-prompt.md`:

- Strength now continues until the player chooses to bank and leave. Dodge and Block now follow this pattern too; Accuracy retains its existing 30-second session; Critical now uses the indefinite cue sequence described below.
- Immersive Strength hides the global header and navigation. Town, combo and a compact streak-goal meter remain above the scene. There are no permanent training titles, in-world lane labels, distance rings, travel guides, hit counter, timer or manual Pause button.
- Updated on 11 September to follow Jimmy’s layout sketch: visible High above Low, with Mid to Low’s right, plus a visible Kick button at the left thumb. Blank play-area taps do not attack. The hero and partner are smaller and sit within the central play area. Equipment appearance remains tied to stable item IDs.
- An original orchard partner throws orange practice fruit from the right. High throws use analytic parabolic coordinates shared by rendering and hit detection; Mid travels horizontally at y=340; Low travels horizontally at y=470 near the feet. Only High has an arc. The partner briefly crouches and lowers the throwing hand to match the Low release position. Throw and slash/kick animations show the action.
- First-visit instructions last approximately four active seconds, including the entrance animation, fading over the final half-second. The dedicated `tutorials.strength` save flag is normalized for old saves and persisted immediately on entry.
- Main stat goals require 4, 6, 8… weighted points within each session. Actions add the current multiplier, then increase it: ordinary successes +1 multiplier, stars +2. Contact resets the multiplier to ×1 while retaining all main-goal points. Every completed main goal grants a fixed +1 stat/+6 XP, with overflow carried forward. Ground upgrades multiply goal points. See the latest scoring/mission section below.
- Town immediately opens a pause dialog. Bank & leave settles once and shows only total Strength and XP, with Back to Town and Train again actions. Strength no longer grants a timed-session skill point; normal XP level-ups still grant skill points.
- Visibility and orientation suspend simulation. Page hiding banks pending rewards once and ends that session; returning from the back-forward cache restores Town. Object and effect pools remain bounded, and speed/cadence ramping caps after two minutes.

## Visual layout workflow — 11 September

- The original invisible spatial controls changed the intended interaction. The new explicit controller layout supersedes that part of the 10 September brief.
- The standalone workbench at `/layout-editor.html` supports dragging both characters and all four action buttons, numeric position/size editing, undo, three landscape preview sizes, animated throw previews, local drafts, and JSON import/export.
- Workbench drafts use `one-brave-odyssey.strength-layout-draft.v1`, separate from progression. Export a draft for an agent to review and apply to `dist/strength-layout.js`; drafts do not silently change the running game.
- Character/projectile/effect placement shares one presentation mapping. Simulation timing, hit windows, reward rules and settlement remain unchanged. The default presentation retains the parabolic high throw and hand-aligned launch.
- Unity MCP tools are available, but a read-only connection check on 11 September found zero connected editor instances. No Unity project was changed.
- See `docs/layout-workbench.md` for using exports as a browser/Unity handoff.

## Completed Dodge revision — 11 September

- Reuses the immersive Strength HUD, controller spacing, streak meter and bank-and-leave flow. The hero stands at horizontal 40%, partner at 60%, with their feet at the existing 68% vertical position.
- The original partner holds a wooden practice stick instead of fruit; the fruit basket is omitted in Dodge. A short high/mid/low cue and arm/stick windup telegraph the attack, followed by a strike and recovery.
- High → Tuck, Low → Jump, Mid → Back. Jump is above Tuck; Back uses the left-side Strength Kick position. There is no Kick button in Dodge. Actions use pointer-down and show a brief corresponding pose.
- Dodge sessions continue until the player banks and leaves. The first-visit tutorial uses its own normalized `tutorials.dodge` save flag, independent of Strength.
- Ordinary successful dodges increase the multiplier by one; perfect dodges display a brief star and increase it by two. Both Strength stars and perfect dodges award two weighted action credits. For example, ×4 → ×6 adds 4 + 5 main-goal points.
- Dodge shares the fixed +1 stat/+6 XP main-goal payout and retains main-goal progress on contact. No extra stat-per-four-hits reward remains in Strength/Dodge. Empty inputs do not penalize; contact resets only the multiplier and any active avoid-hit/combo side-mission attempt.
- Initial tuning: 320 ms safe input window before impact, final 180 ms perfect, 420 ms action cooldown, 540 ms pose duration and 450 ms partner recovery. Attack windup/cadence ramps cap at two minutes. One attack is active at a time and resolves once. These numbers are playtest starting points.
- Perfect-star credits checkpoint together, preserving the brief stat-gain message when either credit crosses a goal. The star stays above the hero during the evasive pose and briefly fades.
- Page hiding, Town cash-out, repeated exits, retry and save reload preserve once-only rewards. Dodge has no 30-second skill award; normal XP level-ups still grant skill points.
- Strength was fixed first: empty slashes/kicks and skipped stars leave combo and rewards intact; only orange contact penalizes the hero. High keeps its parabola, Mid/Low remain horizontal and the low throwing animation is retained.
- No additional editor, app or scene-layout tooling was built. The stopped server was reopened through the existing launcher in visible macOS Terminal for verification.

## Weighted goals and lifetime side missions — prior revision

- Jimmy approved the Dodge scene, then requested Back on the left and Jump above Tuck. Character positions and the stick mechanics remain as approved. The perfect window is now 180 ms before impact (previously 100 ms); the overall safe window remains 320 ms.
- The multiplier starts at ×1 and represents the next action’s points. An orange hit or ordinary dodge adds its current value, then raises it by one. Stars count as two steps: at ×4 they add 4 + 5 points and leave ×6. A hit resets only the multiplier to ×1, keeping main-goal points. Empty inputs and missed stars do not reduce main progress.
- Main-goal targets remain 4, 6, 8… points, with overflow retained. Each completed goal grants a fixed +1 trained stat/+6 XP. Ground upgrades multiply earned goal points, preserving their benefit without changing the fixed payout. The old additional stat-per-four-hits payout is removed for Strength/Dodge; each ordinary action credit still yields 3 XP and a star gives two credits. Main-goal state resets on scene entry.
- A compact bottom-left mission panel sits beside the left thumb control. It shows the lifetime mission number, objective and progress. Reward previews are hidden. Brief stat-gain feedback appears above the characters.
- Strength rotation: avoid hits for 6 seconds → collect 5 stars → collect 5 consecutive stars → reach ×12 → complete 3 main stat goals. Dodge rotation: avoid hits for 6 seconds → collect 5 stars → complete 3 main goals → reach ×12.
- After each full rotation, targets increase by +2 seconds, +2 total stars, +1 consecutive star, +4 multiplier and +1 main goal respectively. Initial reward tuning is mission #N → +N trained stat and +6N XP. Data lives in `TRAINING_MISSIONS` / `trainingMission()` in `core.js` so more types can be added later without a separate tooling project.
- Jimmy explicitly chose: save the mission number/difficulty, restart that mission’s progress on scene exit/retry/reload. Each trainer has an independent `player.trainingMissions` number, defaulting to 1 for old saves. No partial attempt progress is saved. Pause/resume preserves attempts and counts no paused time.
- A contact resets avoid-hit timing and the active combo attempt; cumulative star and main-goal counts survive contact. Skipping a Strength star resets only an active consecutive-star mission, leaving main combo/points intact. Completing one mission cannot apply the same action to the following mission.
- `checkpointTraining()` applies only newly earned rewards, records the completed mission number and marks those totals banked. Main-goal/side-mission completion requests a save; visibility changes also checkpoint active revised trainers. `settleTraining()` flushes remaining totals and ends/counts the session once. The results summarize the full session, including rewards already saved. Mission number and payout are written in the same save.
- Thirty-eight Node tests and Chrome touch checks at all three prescribed landscape sizes pass. Mission progress reset on retry/reload, independent lifetime numbering, immediate reward checkpoints, repeated pagehide and unchanged timed-trainer flows are covered. No scene editor or server manager was added. The existing local server handled initial checks; final layout checks served project files directly inside Playwright after the server stopped.

## Training UI cleanup — prior revision

- Followed Jimmy’s supplied compact goal-bar reference: a pale-blue capsule with the multiplier in the same component at its right edge. Removed the main goal title/number, points fraction, reward footer and separate “next points” box. The semantic progress element retains its accessible value description.
- Side missions still show their number, objective and progress. Removed their stat/XP reward footers and shortened mission-completion feedback to “+N Strength” or “+N Dodge”.
- Removed normal-action combo messages and contact/reset messages in Strength/Dodge. Perfect Dodge still shows its star; stat increases show only “+N Stat”. Timing, scoring, mission progression, payout amounts and saves are unchanged.
- All five training result dialogs show only the total trained stat and XP, plus Back to Town and Train again. Removed titles, explanations, combo summaries, reward breakdowns and mission notes. Settlement and skill-point awards are unchanged.
- All 38 existing Node tests pass. Chrome checks at 844×390, 667×375 and 568×320 verified the compact bar, absent labels, totals-only dialogs, control bounds, scoring, mission persistence and idempotent banking. Inspected screenshots against the supplied reference. Checks served actual project files through Playwright routes; no server or editor was started.

## Block MVP — approved interaction

Jimmy requested a playable draft before animation work or testing. The new behavior replaces the old timed, tap-to-block crystal trainer.

- Hero centered at simulation (700, 350), with a simple shield arc around the body. Oranges and stars approach along random straight rays from all directions. No partner or action-button cluster is present.
- One white circular joystick sits at the right thumb. Pointer-down and dragging set shield direction; dragging outside the circle remains captured and clamps the knob. A small center dead zone avoids accidental direction changes. Releasing recenters the knob and keeps the shield at its last angle. Screen-to-canvas conversion keeps its visible direction aligned with the drag. Focused arrow keys offer basic cardinal aiming.
- Orange interception within the shield arc gives one ordinary success. Orange contact with the hero resets the multiplier to ×1 but preserves main-goal points. Each projectile resolves once.
- Original MVP behavior, superseded below: stars ignored the shield and collected automatically on reaching the hero. They give two weighted credits (+2 multiplier) and the shared brief star indicator. They count toward the collect-stars mission.
- Reuses the compact main-goal bar, multiplier, bottom-left mission panel, +N Block feedback, first-visit instructions, indefinite session, pause/banking flow and totals-only result dialog. Goals give +1 Block/+6 XP. Mission rotation matches Dodge: avoid hits 6s → collect 5 stars → complete 3 goals → reach ×12, with existing cycle difficulty and mission-number payout scaling.
- Adds independent `trainingMissions.block` and `tutorials.block` defaults for old saves. Only mission number/difficulty persists; partial mission progress restarts on reentry. Block rewards use the existing checkpoint/settlement path and no longer use timed-session stat/skill payouts.
- Initial tuning in `BLOCK_RULES`: radius 108, shield arc ±0.55 radians (about 63° total), body radius 52, roughly 2.1 seconds from spawn edge to shield, 1.25-second spawn interval. Stars have a 22% spawn chance. Speed/cadence rise to a cap of 1.5× after two minutes. Existing object pool remains bounded at 20.
- Uses simple existing hero art, plain fruit/stars and a shield arc. No custom character animation, hit-shake polish, editor, dependency or server was added.
- Testing and animation work were deferred for the original draft as requested. Jimmy subsequently approved the interaction and requested the polish described below.

## Block polish and training entrances — prior revision

Jimmy approved the Block interaction and requested animation/effect polish, a new shield image and a shorter, text-free training start.

- The shield is now an original teal-and-brass procedural design with an inlaid crest, rim, facets and rivets. Replaceable visual descriptors and drawing live in `BLOCK_SHIELD_ART` / `trainingShield()` in `art.js`; gameplay remains in `BLOCK_RULES`. No generated/paid art, dependency, editor or Unity content was used.
- Hero assumes a guard pose with the sword hidden during Block, turns toward the aimed shield and braces briefly on interception. The shield recoils and flashes, a short guard ripple spreads outward, and fruit rebounds with sparks. Incoming fruit rotates with a short trail. Stars glow and collect automatically with a rising star and expanding ring; body contacts give a brief directional flinch and warm impact ring. No new permanent text or HUD boxes were added.
- Rebound fruit and particles use the existing bounded 32-slot effects pool, cannot collide or award again, and expire. Shield aiming remains immediate; recoil only changes presentation. Accepted block angles, collision rules, star credits, missions, goal payouts and idempotent settlement are retained.
- Existing optional audio now distinguishes blocks from stars. The in-game motion setting and system reduced-motion preference suppress Block movement effects while retaining the shield direction, contact cue and star indicator.
- All five trainers and retries now use `TRAINING_INTRO = 1.5` seconds. Removed the numeric countdown element. Main goal/HUD appears first, followed by hero, partner where present, mission panel and controls in a short fade/settle animation. Shared `Training.entrance()` easing drives DOM opacity/offsets and Canvas character transforms through `appearTraining()`.
- Entrance time uses the active simulation clock: no action scoring, attack spawning or side-mission time during preparation; pause, visibility and orientation stop it. Reduced motion shows the layout immediately but keeps the 1.5-second preparation interval. Training character idle motion also uses active elapsed time, avoiding jumps during pause.
- Joystick pointer capture handles outside-circle drags and cancellation; release or focus loss recenters the knob while retaining shield direction. First-visit instructions sit above the characters to avoid the lower mission/control panels.
- All 44 Node tests pass. Desktop Chrome touch checks at 844×390, 667×375 and 568×320 cover all five entrances, retry, captured drags, angle mapping, cancellation, real Block/star scoring, missions, +3 Block/+33 XP banking, repeated pagehide, pause/visibility/orientation and reduced motion. Screenshots inspected for shield, effects and transition composition. Checks load project files through browser routes; no HTTP server was started. No physical-phone validation is claimed.

## Block star rules, faster training and combo feedback — prior revision

- Stars now collide with the Block shield like oranges and rebound as stars. Blocking one gives no action credits, XP, stats, combo increase/reset, hit penalty or success pulse. Only stars that reach the hero without interception grant the normal two credits and collection effect. Deflections resolve once and use the existing bounded effects pool.
- Blocking a star sends `skipStar` to the mission system. Total-star missions and the main combo/progress are preserved; a mission explicitly configured as `perfectCombo` resets its consecutive-star attempt. Block’s current mission sequence remains unchanged to preserve existing lifetime numbering; no new mission was inserted. This exception is covered with a temporarily configured consecutive-star test.
- `TRAINING_PACE = 1.35` in `core.js` raises starting pace for all five trainers. Strength fruit starts at 472.5 simulation units/s, falling stars at 222.75; Strength/Block base spawn spacing is approximately 0.93 seconds. Block base flight time to the shield is approximately 1.56 seconds. Dodge windup/strike/extra spacing divide by 1.35, preserving the 320 ms safe window, 180 ms perfect window and recovery. Accuracy and Critical’s shared phase runs 35% faster. Existing two-minute ramp caps are retained.
- Success feedback now pulses the existing combo number for 0.42 active seconds: a small mint pulse for a normal success and a larger gold pulse for a collected star/perfect Dodge. Every training scene uses this feedback. Removed floating success/stat-gain text and mission-payout messages; bar-completion highlights and the totals-only bank dialog remain. Contact cancels the success pulse; reduced motion uses a color cue without scaling.
- The shield’s collision radius moves from 108 to 70 simulation units. Its art stays closer to the hand, with an additional inward offset and a small crouch for low guarding. Shield tilt stays within ±90° so the crest is upright below the body. The forearm connects to the low shield, following the reference’s held pose without copying its art. Joystick direction remains immediate and radial.
- All 48 Node tests pass, including unchanged rewards and neutral-star handling, the consecutive-star exception, faster initial timing, bounded effects and combo feedback. Chrome touch checks at 844×390, 667×375 and 568×320 pass with no runtime errors. Checked low/diagonal/side shield screenshots, mint/gold combo cues in all five trainers, neutral star deflection, +2 unblocked pickup, unchanged +3 Block/+33 XP banking, retry, pause, orientation, visibility and repeated pagehide. Checks read project files through browser routes; no HTTP server was started.

## Foreground shield and direct training results — prior revision

- Block now draws the shield after the hero and forearm at every angle. Raising it covers the head, matching how a lowered shield covers the legs. Shield placement, tilt, collision rules, controls and effects retain their accepted behavior.
- Clicking Town during any active training run immediately calls the existing once-only settlement and opens the totals-only results. Removed the intermediate pause/Bank & leave confirmation from this path. Results retain Back to Town and Train again. The Town control’s accessible label now describes finishing practice and showing results.
- Automatic visibility/orientation pausing, explicit Pause controls and arena retreat still use their existing pause flow. This change targets training Town navigation only.
- All 48 gameplay tests pass. Chrome touch checks at 844×390, 667×375 and 568×320 verify direct results for all five trainers, correct full-session totals, no confirmation controls, stopped simulation, empty exits during the entrance, retry, return to Town and repeated pagehide without duplicate rewards. Upper/diagonal shield and compact results screenshots were inspected. No runtime errors occurred, and no HTTP server was started.

## Critical cue-and-strike MVP — approved interaction, 12 September

Jimmy requested an MVP of a dummy training game guided by four supplied screenshots. The references guide the sequence and broad poses only; the dummy is original procedural art and no referenced art or Unity content is reused.

- Critical is now an indefinite practice using the compact main-goal bar, bottom-left mission card, one right-side Hit button, 1.5-second entrance and direct Town results. The old timed pulse/Focus minigame is replaced.
- The first sequence shows a red FAKE cue above the dummy. Tapping it counts as a miss, resets the combo to ×1 and restarts an active avoid-mistakes mission without clearing main-goal points. Ignoring it leads through a short gap into a green HIT! cue. Later sequences have a 50% fake chance; otherwise they start on the real cue.
- Tapping the first HIT! begins the jump and immediately grants one weighted action credit (+1 combo). A second HIT! appears during the airborne hold. Tapping during that window starts the landing strike; its completion grants the star’s two weighted credits (+2 combo). The full sequence adds +3 combo; for example, ×1 → ×2 → ×4.
- Jimmy explicitly chose: missing the second cue keeps the jump’s +1 and gives no star. An early airborne tap after the short input debounce also ends the attempt without a star, preserving that credit. A missed second cue emits `skipStar` for future consecutive-star missions. Waiting/recovery taps and ignoring the first real cue are harmless. Only a fake tap penalizes the main combo in this MVP.
- Initial timings in `CRITICAL_TIMING`: fake 550 ms, gap 320 ms, first HIT window 650 ms, rise 300 ms, second HIT window 350 ms, landing 180 ms, recovery 450 ms and next-sequence interval 700 ms. Input debounce is 160 ms. These are review tuning, not a validated balance pass; the other trainers retain their existing pace.
- One active sequence uses explicit fake/gap/ready/rise/finish/land/recovery phases. The simulation clock drives deadlines, pauses with the scene and resolves each landing once. No delayed callbacks or unbounded objects are added. Leaving during a jump banks earned credits; an unfinished strike has not awarded its star yet.
- Simple poses show the hero at left, jumping toward the dummy and landing with the sword down. Red/green cue bubbles and a brief star communicate the stages. No custom polish/effect pass was done. The first-visit hint clears when the first cue starts so it cannot cover the timed cue.
- Adds `tutorials.crit`, `trainingMissions.crit` and `bonusCrit` through existing normalization, checkpoints and settlement. Critical goals grant the same fixed +1 Critical/+6 XP, with regular 3 XP action credits. Its mission rotation is avoid mistakes 6s → collect 5 stars → complete 3 goals → reach ×12, using existing difficulty/reward scaling. Only the mission number persists; partial progress resets on entry. No timed-session skill award remains in Critical.
- No test suite, syntax check or browser/phone validation was run for this MVP. The prior 48 passing tests and prior screenshots are historical. No new editor, dependency or HTTP server was created.

## Critical polish and tap-anywhere input — prior revision, 12 September

Jimmy approved the Critical MVP and requested polish with no visible Hit button. Tap any open part of the scene to act. The transparent full-scene semantic control accepts primary pointer-down input and keyboard Space/Enter, while Town, the main goal and the mission card remain separate. Held keys, touch release, additional fingers and right-clicks do not create extra hits. Intro, pause, results and portrait mode block gameplay input through the existing lifecycle.

The original adventurer now compresses before takeoff, tucks his legs in the air, swings the equipped sword into the dummy, compresses on landing and returns smoothly to his starting position. The dummy has shaded burlap, stitched details and a straw tuft; fake cues twitch it, and successful landings produce recoil, a brief local highlight, straw fragments, dust, a ground ring and a rising star. The shared combo indicator remains the only numeric action feedback. The two cue bubbles pop into view; the real cue carries a shrinking timing line. No reward text, visible action button, timer text or confirmation step was added.

Approved rules remain: fake tap resets combo to ×1 while retaining main-goal points; the first correct tap grants +1; the airborne correct tap grants its star/+2 only on landing; early/missed second input preserves the first +1. Initial windows remain 650 ms and 350 ms, with a 300 ms rise and 180 ms landing. A 360 ms return phase uses part of the previous 700 ms between-round delay, followed by 340 ms idle. Input during recovery/return is harmless. Main goals, fixed payouts, independent lifetime mission numbers, partial mission reset on reentry, the 1.5-second entrance and totals-only results remain shared.

`CRITICAL_TIMING` owns simulation durations. `CRITICAL_ART` owns positions/scale; optional pose parameters in `hero()` control the Critical leg, lean, squash and sword poses without changing existing callers or equipment IDs. `critical-art.js` computes presentation from the paused simulation clock. Particles reuse the 32-slot pool. Reduced motion keeps readable cues and discrete action poses, suppresses decorative particles, trails, recoil and scaling, and retains identical scoring. Sound-enabled play distinguishes the landing star from an ordinary jump.

Validation: 55 Node gameplay tests pass. Browser touch checks cover both sides of the play area, keyboard input, simultaneous fingers, held/released inputs, protected HUD/Town taps, early/missed/valid second cues, total +3 combo, once-only rewards, retry, visibility pausing in seven phases and portrait pausing at all three landscape sizes. Inspected entrance, fake/real cue, airborne, strike, star and reduced-motion screenshots plus the other four trainers. No runtime errors or document overflow occurred. Modified JavaScript passes syntax checks and `git diff --check` is clean. No server, dependency or scene editor was added; checks used browser routes reading actual local source files. Physical-phone feel remains to be validated.

## Critical penalties, airborne wait and main-goal fill — prior revision, 12 September

Jimmy revised the approved Critical rules: ignoring a real cue now loses combo, and a fresh tap when no real cue is showing also loses combo. This supersedes the earlier keep-combo-on-missed-second behavior. Both first and airborne HIT timeouts reset the multiplier to ×1, once per expired cue. Fake cues, idle gaps, takeoff, airborne waiting, landing, recovery and returning are invalid tap phases. Distinct rapid double-taps are judged individually; the old 160 ms Critical input debounce no longer hides an early tap. Existing touch-release, held-key and additional-finger suppression remains. Preparation, pause, orientation blocking, results and separate HUD/Town controls remain exempt.

Earned main-goal points, stat increases and XP are never reversed by these mistakes. Early takeoff/wait taps abort the attempt without a star. An extra tap while a successful landing is pending cancels that pending star, while letting the landing animation finish. A valid completed sequence still earns +1 for the jump and +2 for the star. Mistakes reset an active avoid-mistakes mission; total-star mission progress is retained.

After the 300 ms rise, a new wait phase holds the hero airborne without any cue for a randomly chosen 250–450 ms. Thus the second HIT appears 550–750 ms after the first valid tap; its hit window remains 350 ms, and the first window remains 650 ms. The wait uses the simulation clock and pauses normally. Gameplay durations remain in `CRITICAL_TIMING`; the separate landing strike flag preserves a continuous pose when a pending reward is forfeited.

The shared main-goal bar now renders a flat-edged fill clipped inside its rounded track, retaining a native hidden progress element for accessibility. This removes the detached rounded-dot look at low progress. Goal completion briefly shows a full bar for 240 ms before showing overflow toward the next goal; the completion highlight remains. Combo space is reserved so going from ×9 to ×10 does not shrink the bar. Points, targets and payouts are unchanged. A reproduced level-5 ×19 case is legitimately 2/38 toward the next goal after completing 17 goals; that small remainder now has an explicit completion/rollover presentation. Applied to Strength, Dodge, Block and Critical.

Validation: all 57 Node tests pass. Chrome touch checks at 844×390, 667×375 and 568×320 cover rapid double-taps, early airborne taps, both real-cue timeouts, the cue-free wait and pausing it, successful star timing, protected HUD/Town taps, keyboard-repeat and multi-touch suppression, results/retry/pagehide, portrait pause and reduced motion. For all four practice scenes, checked full completion followed by the exact 2/38 fill at ×19, and empty/half/nearly-full bars. Inspected screenshots at all three sizes; no runtime errors or overflow occurred. JavaScript syntax checks and `git diff --check` pass. No server, dependency or editor was added. Physical iPhone testing remains.

## Moving goal diamond and fake-avoidance credit — prior revision, 12 September

Jimmy clarified that the diamond marks the current progress rather than the end of the track. It now sits at the visible fill edge in all four practice scenes, using the same progress variable and 120 ms transition as the fill. Its center stays aligned at empty, low, partial and full values, during movement, and through the existing goal-completion flash/rollover. The accessible native progress value remains unchanged.

In Critical, letting the entire 550 ms fake cue pass without tapping now earns exactly one ordinary success: +1 combo, current-multiplier goal points (including ground upgrade scaling), and 3 XP. This uses the normal combo pulse and goal/mission handling, without a star or perfect-mission credit. A fake followed by both successful real cues earns +4 combo total; the two real hits alone still earn +3. Tapping the fake cancels that avoidance reward and resets combo as before. Leaving before the fake ends grants no avoidance reward; pausing freezes its timer. Missing real cues and tapping outside real cues keep their existing penalties.

Validation: 59 gameplay tests pass. Browser checks at 844×390, 667×375 and 568×320 confirm marker/fill alignment for all four practice scenes at 0%, 5%, 50%, near-full and full values, during transitions and goal rollover, and with reduced motion. Inspected low/midpoint and successful-fake screenshots. Fake rewards, tapped-fake penalties, paused fake timers, retry and once-only +3 XP settlement pass with no runtime errors or document overflow. Syntax checks and `git diff --check` pass. No server, dependency, editor or other app was added. Physical iPhone testing remains.

## Home Screen installation and offline play — prior revision, 12 September

Jimmy wants a stable way to play on his iPhone with a Home Screen icon before an App Store release. The existing Site `appgprj_6aa106580cb08191b6936046473d90f4` is reused with its owner-only access. The Cloudflare Quick Tunnel remains a temporary local preview option, not the installation URL. Publishing uses the existing Sites manifest and exact tested source; the native deployment response supplies the permanent URL.

Added a standalone landscape manifest, iPhone Home Screen metadata, and 512/192/180-pixel icons rendered from the game’s original procedural hero. No generated/third-party art or new runtime dependency was added. `mobile.js` registers the service worker, reports readiness in Settings and offers Install game update only when a version is waiting. `sw.js` caches the complete runtime shell and icons. Failed installs discard the incomplete new cache while retaining the previous version. Offline requests use the cached version consistently; non-game paths and third-party requests remain outside the cache.

Updates wait for an explicit Settings action after a run finishes. The page saves before activation/reload, and the worker refuses activation while another window of this game remains open. This keeps new code out of an active run. Private-site sign-in and first offline setup still require connectivity; physical iPhone installation and offline-launch verification remain Jimmy’s next checks. Existing save storage stays local to each origin/installation, so tunnel or separate-browser saves are not migrated automatically. A storage reset requires downloading the game again.

Cache identifier for the first published release: `obo-game-2026-09-12-1`. Every future release that changes runtime files must bump `CACHE_NAME`; new runtime modules/assets must be added to `FILES`. Keep updates out of active runs. `npm test` runs the 59 gameplay tests and four mobile tests.

Validation: all 63 Node tests pass. Real service-worker browser checks against the existing local HTTP server pass at 844×390, 667×375 and 568×320: initial caching, complete offline reloads, all five trainers, arena, settlement and saved progress. Settings reports Ready for offline play. An isolated update fixture verifies waiting during a run, blocked activation with another game window, a single reload after applying in Town, and offline launch of the updated cache. The fixture was removed before packaging. No runtime errors or horizontal overflow occurred. These are desktop Chrome checks, not physical iOS certification. No additional server was started.

## Mobile home UI — latest local revision, 12 September

Jimmy confirmed that the published game opens from his iPhone Home Screen icon. The home screen now uses the full available landscape height. Removed the bottom destination tab bar throughout the application, the game-name brand, introductory/promotional copy, destination subtitles and the wallet's coins label. SkyHaven is centered at the top. The map has four single-label buttons: Training, Arena, Shop and Legacy. Shop retains the existing forge route and equipment IDs. The hero card shows only name, level, an XP bar with numeric progress, and View hero >. Long names truncate within the card. Gold uses an original shaded gold-ingot SVG and Settings uses a gear icon; both retain accessible labels.

Other destination screens keep their Town buttons. Accuracy and arena retain their Pause/exit flows; the four immersive practice scenes keep their existing Town/results flow. No gameplay or settlement rules changed. No opening scene or other-screen redesign was added.

The last published runtime cache identifier is `obo-game-2026-09-12-5`. The home revisions and local-refresh correction were published at Jimmy’s request on 12 September 2026. Editing files or pushing to GitHub does not deploy the Site. Publish the tested revision to the existing private Site, then launch the phone app online and use Settings → Install game update when it becomes available. An active run cannot apply an update. Local browsers still controlled by an older worker need to apply this update once; a refresh alone can continue to show the old cached release until then. The new worker loads current source from a running loopback server on subsequent refreshes.

Validation: all 63 existing Node tests pass. Chrome touch checks at 956×440, 844×390, 667×375 and 568×320 verify labels, no bottom navigation, centered title, non-overlapping home controls with at least 44-pixel targets, all five destination routes and returns, Settings, all five trainer exits, offline reload and long-name/large-gold rendering. Inspected home screenshots at 844×390 and 568×320. No runtime errors or document overflow. These checks are desktop emulation, not physical iPhone validation. Reused the existing local server; no server or new editor was started.

### Home placement refinement

The hero card is now roughly 20% narrower with reduced padding, type and XP-bar height. Destination labels start below their building/ground bases, with a six-pixel offset; Shop is centered directly beneath its building. Legacy's building moves slightly left so its label and Training remain separate at compact widths. Its building is drawn in front of the neighboring trees. Labels remain 48-pixel touch targets. Short-screen hero spacing prevents the Legacy label from overlapping it at 568×320.

Chrome touch checks at 956×440, 844×390, 667×375 and 568×320 cover non-overlapping home controls, destination navigation/returns, Settings, offline reload, long names and large gold totals. Inspected 844×390 and 568×320 screenshots. This is a local presentation refinement; no gameplay rules changed and it is not yet published.

### Smaller map labels and visible town hero

Destination labels now use approximately 30-pixel-high visible boxes, widths of 76–112 pixels and 12–15-pixel text. Their transparent button areas remain at least 44 pixels high for touch input. The six-pixel visual gap beneath each building/ground is retained. The town hero moves from world coordinates (816, 382) to (700, 276), above the training targets and left of the arena building, clear of its label. The hero summary card retains the previously approved compact layout.

Chrome touch checks pass at 956×440, 844×390, 667×375 and 568×320: small visible labels with larger touch areas, no home-control overlap or label covering the hero, all destination routes/returns, Settings, offline reload, long names and large gold totals. Inspected 844×390 and 568×320 screenshots. No runtime errors or document overflow. This local presentation change is not yet published; physical iPhone checking remains.

### Local refresh correction and requested publication

Jimmy reported that refreshing localhost still showed the old UI and requested updating the existing online game. The original worker used cache-first loading on every origin. The worker now uses network requests without the HTTP cache on localhost, 127.0.0.1 and IPv6 loopback, with the installed cache as an offline fallback. Hosted origins retain the complete installed version until an explicit Settings update. Local previews already on an older worker must apply this update once; no save storage needs to be cleared.

All 65 Node tests pass, including new checks for live loopback source, local offline fallback and unchanged hosted cache behavior. Actual Chrome checks at localhost and 127.0.0.1 distinguish deliberately marked cached code from current server code: an online refresh uses the server, an offline reload uses the cache, and the home screen works in both cases. No page errors. Existing home-layout checks cover four mobile landscape sizes. The existing server is reused.

For the phone, finish any run, close other game tabs/windows, and reopen the same installed icon while online. Open Settings and choose Install game update once the download is ready. The app saves and reloads; wait for Ready for offline play before disconnecting. This release requires no new icon or local-data reset. Publishing targets the same owner-private Site. Publication succeeded at 09:28:30 UTC on 12 September 2026. The existing URL remains https://one-brave-odyssey-skyhaven.jimmybui1995.chatgpt.site and owner-only access is preserved. Published source commit: `8a6e998b11f8d3f935324310703083d24a6d27c8`; saved Site version 2. Jimmy still needs to apply the update on his existing phone installation and any local browser with the older worker.

## Arena selection layout — local preview, 12 September

Jimmy asked to extend the compact, minimal-text home-screen style to Arena and explicitly requested no tests unless he asks. That standing preference is also recorded in AGENTS.md. This pass changes the Arena selection screen; combat and settlement behavior are not redesigned.

Arena now fills the landscape scene with a centered Arena heading, a compact Town return, gold and Settings. Twelve small encounter tiles sit on the left, with gold selection, numeric locked stages and small lock/clear icons. The equipped hero and selected opponent stand in the arena. Visible detail is limited to the opponent name, gold/XP amounts, Fight and the survival symbol when unlocked. Removed duplicate headings, wave/explanation copy and the large battle card. Visible controls are compact with at least 44-pixel authored tap areas. Enemy preview scale is an optional canvas attribute; other enemy canvases retain their existing default.

A single 956×440 local browser screenshot was captured to show the layout. No tests, scripted assertions, regression passes or device matrix were run, as requested. This is a layout preview, not validation. No server was started. Current local cache identifier is `obo-game-2026-09-12-6`; this Arena revision has not been published.

## Training, Shop, Hero and Legacy menus — local preview, 12 September

Jimmy approved the Arena selection design and asked to apply it to the other scenes. The same full-height landscape header, scenery, short Town control and compact buttons now cover Training selection, Shop, Hero and Legacy. The existing Home/Arena designs and approved training gameplay layouts are retained.

Training has five original illustrated stations, stat totals, ground levels/yield, Train and a compact upgrade price. Accuracy's 30-second duration remains visible beside its level. Shop displays the equipped hero, six equipment illustrations with names/bonuses and purchase/equip controls, plus a compact tonic row. Hero displays the equipped character, name edit, level/XP, derived combat totals, five allocatable stats and three skills with concise effects/costs. Legacy shows Lodge/Gallery illustrations, level/benefit numbers, build/upgrade/collect actions and a compact records panel. Settings and Appearance lose their introductory copy; offline readiness, updates and save errors remain visible.

`menuIllustration()` in `art.js` renders original Canvas props, gear and buildings from the existing appearance palette. No paid generation, downloaded assets, dependency or editor was added. The menu helpers in `game.js` build shared compact buttons, gold amounts, portraits and destination shells. Existing `data-*` action handlers and stable equipment IDs remain in use; no economy, combat, progression or settlement functions were changed. Short-screen menus retain internal scrolling, and action controls are authored with at least 44-pixel touch areas.

Previews of all four menus were captured at one 956×440 viewport. No tests, assertions, gameplay checks or responsive/device matrix were run, per Jimmy's preference. These are visual layout previews only. The existing server was reused. Current local cache identifier is `obo-game-2026-09-12-7`; Arena and these menu changes have not been published. The last published release remains Site version 2/cache `obo-game-2026-09-12-5`.

## Next requested work

Review the Training, Shop, Hero and Legacy menu layouts with Jimmy and apply his visual feedback. Do not run tests unless he asks. Keep the compact style and all approved gameplay rules. Publish the accepted menu changes to the existing private Site when requested.

A fresh chat can use this file and `AGENTS.md` as the handoff. Preserve the commercial mobile-game goal, original art, focused scope and visible-terminal requirement.

## Near-term goals

1. Phone-playtest Critical and the other approved trainers on iPhone 17 Pro Max, then adjust timing and effects from Jimmy’s feedback.
2. Tune fruit cadence, stick telegraphs, dodge/perfect windows, animations and cash-out rates from real play.
3. Apply the successful indefinite-session and first-visit tutorial patterns to the remaining Accuracy trainer when its intended behavior is supplied.
4. Continue combat, progression and economy tuning without expanding content until the core loop feels good.
5. Replace procedural placeholders through a stable asset/animation manifest after gameplay is settled.

## Future work

- Remaining trainer revisions and richer mission goals.
- More arena content, enemy behaviors, skills, equipment and consumables.
- Animation, authored sound and configurable visual effects.
- Save export/import if progression ever needs to move between browser origins or into Unity.
- Complete release content, onboarding, progression balance, animation/audio polish, persistence and recovery, device performance, iOS packaging and App Store preparation. These are remaining production tasks, not completed capabilities.
- Expand responsive layouts beyond the current target phone after its experience is settled.
- Consider a Unity production port only if game expansion or browser constraints justify it: pure C# progression first, then Town → Strength → settlement, arena combat, shop/equipment and other trainers.

## Guardrails

- Keep changes focused. Ask before building a separate editor, app or substantial tool for a scene adjustment.
- Always show the actual terminal for any server started, or give Jimmy the command to run in his own VS Code/macOS terminal. Do not leave hidden agent servers running.

- Keep the game mobile-landscape-first with Pointer Events, safe areas, large targets and bounded pools.
- Preserve save compatibility and idempotent reward settlement.
- Do not copy the reference game's art, characters, room, icons, typography or UI styling. Screenshots may guide only broad mechanics and composition.
- Keep other trainers and the arena working while revising Strength.
- Update this file, `README.md`, `docs/validation.md` and relevant tests after completing the next task.
