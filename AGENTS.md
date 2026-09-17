# One Brave Odyssey — Browser project

This folder is the independent browser game. Do not edit the neighboring Unity project or reuse its art. The accepted art direction is an original sky-island town and teal-scarf adventurer. Gameplay research and prototype boundaries are in docs/mechanics-map.md; current checks are in docs/validation.md; current status and the next requested change are in docs/build-progress.md.

Use plain ES modules, Canvas 2D and semantic HTML controls. The authored application source lives in dist/ and must be tracked; it is not disposable build output. Run with python3 -m http.server 4173 --directory dist. Run node --test tests/game.test.js for gameplay changes. Keep code free of comments and place architecture explanations in documentation.

Mobile landscape is primary. Use pointer-down, large targets, safe-area padding, bounded object pools, visibility/orientation pausing, no browser scroll in active gameplay, and localStorage persistence. Menu panels may scroll internally on short screens. Test 844×390, 667×375 and 568×320. Do not claim physical phone testing from desktop emulation.

Keep weapon_t1/armor_t1 and later tiers stable. Gameplay descriptors are in core.js and replaceable appearance descriptors are in art.js. Do not use paid AI generation. Keep first-clear and session reward settlement idempotent.

The existing .openai/hosting.json identifies the private Site; reuse it. Do not register another Site. Follow Sites skills for hosting. Current scope is a first-chapter prototype with five trainers, 12 arena encounters, skills, gear, lodge/gallery upgrades and endless survival. Further campaign content, additional mission types, advanced talents and new art are follow-up work.

Keep changes focused. Ask Jimmy before implementing a separate app, editor, or substantial tool for adjusting a scene; do not expand a UI change into a tooling project without agreement. Whenever starting a server, show its actual running terminal so Jimmy can stop/restart it, or provide the command for Jimmy to run in his own VS Code/macOS terminal. Do not leave a server running only in a hidden agent process.

Mobile offline files are listed in `dist/sw.js`. Bump `CACHE_NAME` for each release that changes cached game files, and keep the file list aligned with runtime modules and icons. Updates must not reload an active training or arena run; implementation details belong in documentation.

Jimmy’s current preference: do not run tests unless he explicitly asks. For UI revisions, implement the layout and show a visual preview first. This supersedes the earlier default test commands for this workflow.

For equipment and animation art updates, keep review brief and focused on the changed asset. Do not run an exhaustive preview of every outfit, pose or animation after each request. One representative visual preview is enough by default; expand only for a concrete reported issue or Jimmy’s explicit request. Prompt-only work needs no browser or animation review.

Menu design preference: follow the approved Home/Arena style across destinations—full landscape scenery, centered short title, small Town return, gold and Settings, compact visible controls with generous tap areas, and minimal text. Keep prices, effects and progression numbers needed for decisions. Preserve approved training gameplay layouts while redesigning their selection menus.
