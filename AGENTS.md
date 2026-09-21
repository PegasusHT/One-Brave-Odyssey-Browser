# One Brave Odyssey — Browser project

This folder is the independent browser game. Do not edit the neighboring Unity project or reuse its art. The accepted art direction is an original sky-island town and teal-scarf adventurer. Gameplay research and prototype boundaries are in docs/mechanics-map.md; current checks are in docs/validation.md; current status and the next requested change are in docs/build-progress.md.

Use plain ES modules, Canvas 2D and semantic HTML controls. The authored application source lives in dist/ and must be tracked; it is not disposable build output. Run with python3 -m http.server 4173 --directory dist. Run node --test tests/game.test.js for gameplay changes. Keep code free of comments and place architecture explanations in documentation.

Mobile landscape is primary. Use pointer-down, large targets, safe-area padding, bounded object pools, visibility/orientation pausing, no browser scroll in active gameplay, and localStorage persistence. Menu panels may scroll internally on short screens. Test 844×390, 667×375 and 568×320. Do not claim physical phone testing from desktop emulation.

Keep weapon_t1/armor_t1 and later tiers stable. Gameplay descriptors are in core.js and replaceable appearance descriptors are in art.js. Do not use paid AI generation. Keep first-clear and session reward settlement idempotent.

Equipment upgrades require enough gold, with no battle-clear gate for either individual items or matching sets. Keep next-rank purchasing sequential through the active rank-20 limit, with existing prices, affordability and duplicate-purchase guards. Skill and training-ground requirements are separate.

The existing .openai/hosting.json identifies the private Site; reuse it. Do not register another Site. Follow Sites skills for hosting. Continue the browser version toward the first release: five trainers, 20 arena encounters grouped into two active stages of ten, Stage 3 marked Coming soon, skills, 20 active matching weapon/armor/shield ranks, lodge/gallery upgrades and endless survival after encounter 20. Preserve older saved progression and equipment beyond the active limit. The other two towns, Stage 3 encounters, additional mission types, advanced talents and further art are follow-up work.

Publish only when Jimmy explicitly asks. Keep ordinary changes local; a previous publication request does not authorize publishing later revisions.

Keep changes focused. Ask Jimmy before implementing a separate app, editor, or substantial tool for adjusting a scene; do not expand a UI change into a tooling project without agreement. Whenever starting a server, show its actual running terminal so Jimmy can stop/restart it, or provide the command for Jimmy to run in his own VS Code/macOS terminal. Do not leave a server running only in a hidden agent process.

Mobile offline files are listed in `dist/sw.js`. Bump `CACHE_NAME` for each release that changes cached game files, and keep the file list aligned with runtime modules and icons. Updates must not reload an active training or arena run; implementation details belong in documentation.

Jimmy’s current preference: do not run tests unless he explicitly asks. For UI revisions, implement the layout and show a visual preview first. This supersedes the earlier default test commands for this workflow.

For equipment and animation art updates, keep review brief and focused on the changed asset. Do not run an exhaustive preview of every outfit, pose or animation after each request. One representative visual preview is enough by default; expand only for a concrete reported issue or Jimmy’s explicit request. Prompt-only work needs no browser or animation review.

Menu design preference: follow the approved Home/Arena style across destinations—full landscape scenery, centered short title, small Town return, gold and Settings, compact visible controls with generous tap areas, and minimal text. Keep prices, effects and progression numbers needed for decisions. Preserve approved training gameplay layouts while redesigning their selection menus.

The reusable gameplay design is named **Default Gameplay Layout**, documented in `docs/arena-layout.md`. Apply it when Jimmy asks to use that name: full scenery with no black top strip, Back top left, Settings top right, level/XP bottom left, gold icon and number without a currency name bottom right, and skills bottom center. The arena implementation places Cloudring and its battle number at the top center with connected monster progress dots and a boss marker, places names/HP beneath their images, shows Boss beside the final-wave HP bar, and keeps combat statuses with concise rewards. Only arena combat currently uses it; preserve approved training gameplay layouts unless Jimmy asks to apply it there.

Use dotted game release versions from **1.0.0.1** onward: `major.feature.patch.revision`. Increment the last component for ordinary small updates; larger releases may increment an earlier component and reset the components after it. Keep the Settings label, offline cache identifier and current release notes aligned. These display versions are separate from the saved-player schema version and the hosting provider’s release number.
