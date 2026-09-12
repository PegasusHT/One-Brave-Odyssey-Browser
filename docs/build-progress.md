# Browser build progress

Last updated: 11 September 2026

## Purpose and direction

The goal is a sellable, playable, fully completed game that meets market expectations and can be published on the App Store. Mobile landscape is the primary experience, with iPhone 17 Pro Max as the current target phone. Broader responsive support will be developed in a future iteration; existing compact landscape checks remain regression coverage.

JavaScript and the browser currently provide a fast development path for a playable MVP, gameplay experiments and concrete layout references. AI agents can iterate efficiently here. The production goal remains a polished commercial game. Jimmy wants direct control over UI placement, scene objects and animations, and is evaluating Unity for the polished version. Preserve this browser build as the playable behavior and layout reference if production moves to Unity.

A Unity conversion remains a production option, including when its visual editing workflow better supports Jimmy’s design process or when expanded content/browser limitations justify it. If needed, use the browser behavior as the reference and port complete vertical slices deliberately. There is no commitment to a Unity port before release; packaging, device performance, release content, polish and App Store readiness still need to be completed and validated.

The current loop includes town, five training minigames, stat and skill growth, mostly automatic arena battles with tap events, coins, equipment, training-ground upgrades, lodge/gallery progression, twelve encounters and endless survival. The setting, names, procedural art and interface are original. The accepted visual direction is a colorful sky-island town with a small teal-scarf adventurer.

## Current working build

- Authored source is in `dist/`; there is no compilation step.
- `dist/core.js` owns player data, save normalization, progression, rewards, economy and fixed pools.
- `dist/training.js` owns all five training simulations.
- `dist/strength-layout.js` owns Strength placement; `dist/strength-art.js` renders it in the game and the layout workbench.
- `dist/layout-editor.html` is a standalone visual placement tool with a separate local draft and JSON export.
- `dist/battle.js` owns arena and survival combat.
- `dist/art.js` owns replaceable procedural Canvas art and equipment appearance descriptors.
- `dist/game.js` owns screens, input, settlement, saving, lifecycle and optional WebMCP tools.
- Progress persists in `localStorage` under `one-brave-odyssey.browser.v1`.
- Stable equipment IDs are `weapon_t1` through `weapon_t3` and `armor_t1` through `armor_t3`.
- Twenty-four Node tests cover progression, saves, all trainers, combat and the revised Strength rules. Run `npm test`; see `docs/validation.md` for the latest execution results.

## Running and phone testing

- Double-click `start-game.command` to start a visible macOS Terminal server, or run `npm start` in Jimmy’s own terminal from this folder. Open `http://127.0.0.1:4173`. Control-C stops the server; rerun the launcher or `npm start` to restart. The previously hidden agent server was stopped and replaced with the existing visible launcher on 11 September.
- Source edits appear after refreshing the page; the server normally does not need a restart.
- The landlord network isolates local devices, so `start-phone-test.command` opens an ephemeral Cloudflare Quick Tunnel to the local server. It requires the local server to be running. The public URL changes each time, has no account/backend requirement, and exists only while both Terminal windows remain open.
- Do not record an old Quick Tunnel URL as permanent hosting.
- Physical phone play has been confirmed through the tunnel, but the full device matrix and detailed touch feel still need testing.

## Completed Strength revision

Implemented the revision in `docs/next-strength-training-prompt.md`:

- Strength now continues until the player chooses to bank and leave. The other four trainers retain their existing 30-second sessions.
- Immersive Strength hides the global header and navigation. Town, combo and a compact streak-goal meter remain above the scene. There are no permanent training titles, in-world lane labels, distance rings, travel guides, hit counter, timer or manual Pause button.
- Updated on 11 September to follow Jimmy’s layout sketch: visible High above Low, with Mid to Low’s right, plus a visible Kick button at the left thumb. Blank play-area taps do not attack. The hero and partner are smaller and sit within the central play area. Equipment appearance remains tied to stable item IDs.
- An original orchard partner throws orange practice fruit from the right. High throws use analytic parabolic coordinates shared by rendering and hit detection; Mid travels horizontally at y=340; Low travels horizontally at y=470 near the feet. Only High has an arc. The partner briefly crouches and lowers the throwing hand to match the Low release position. Throw and slash/kick animations show the action.
- First-visit instructions last approximately four active seconds, including the opening countdown, fading over the final half-second. The dedicated `tutorials.strength` save flag is normalized for old saves and persisted immediately on entry.
- Streak goals begin at 4 consecutive hits and increase by 2 after each completion. Initial tuning grants +1 pending Strength and +6 pending XP per goal. Completing a goal starts fresh progress toward the next; misses reset current progress and combo while preserving all earned hits and bonuses. Ground upgrades scale ordinary hit yield; goal bonuses are fixed additions.
- Town immediately opens a pause dialog. Bank & leave settles once and shows Strength, XP, best combo and included goal bonuses, with Back to Town and Train again actions. Strength no longer grants a timed-session skill point; normal XP level-ups still grant skill points.
- Visibility and orientation suspend simulation. Page hiding banks pending rewards once and ends that session; returning from the back-forward cache restores Town. Object and effect pools remain bounded, and speed/cadence ramping caps after two minutes.

## Visual layout workflow — 11 September

- The original invisible spatial controls changed the intended interaction. The new explicit controller layout supersedes that part of the 10 September brief.
- The standalone workbench at `/layout-editor.html` supports dragging both characters and all four action buttons, numeric position/size editing, undo, three landscape preview sizes, animated throw previews, local drafts, and JSON import/export.
- Workbench drafts use `one-brave-odyssey.strength-layout-draft.v1`, separate from progression. Export a draft for an agent to review and apply to `dist/strength-layout.js`; drafts do not silently change the running game.
- Character/projectile/effect placement shares one presentation mapping. Simulation timing, hit windows, reward rules and settlement remain unchanged. The default presentation retains the parabolic high throw and hand-aligned launch.
- Unity MCP tools are available, but a read-only connection check on 11 September found zero connected editor instances. No Unity project was changed.
- See `docs/layout-workbench.md` for using exports as a browser/Unity handoff.

## Next requested work

Review the explicit controller layout, try the workbench to express further placement changes, and phone-test Strength on the target iPhone. Tune timing, readability, spawn cadence and reward rate from actual play. The fixed goal reward is the initial implementation assumption pending Jimmy's preference; it can be adjusted without changing save or session structure.

## Near-term goals

1. Phone-test and polish the revised Strength trainer on iPhone 17 Pro Max.
2. Tune its spawn cadence, hit windows, parabolic high throw and cash-out rate from real play.
3. Apply the successful indefinite-session and first-visit tutorial patterns to the other four trainers where appropriate.
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
