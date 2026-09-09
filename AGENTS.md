# One Brave Odyssey — Browser project

This folder is the independent browser game. Do not edit the neighboring Unity project or reuse its art. The accepted art direction is an original sky-island town and teal-scarf adventurer. Gameplay research and prototype boundaries are in docs/mechanics-map.md; current checks are in docs/validation.md.

Use plain ES modules, Canvas 2D and semantic HTML controls. The authored application source lives in dist/ and must be tracked; it is not disposable build output. Run with python3 -m http.server 4173 --directory dist. Run node --test tests/game.test.js for gameplay changes. Keep code free of comments and place architecture explanations in documentation.

Mobile landscape is primary. Use pointer-down, large targets, safe-area padding, bounded object pools, visibility/orientation pausing, no browser scroll in active gameplay, and localStorage persistence. Menu panels may scroll internally on short screens. Test 844×390, 667×375 and 568×320. Do not claim physical phone testing from desktop emulation.

Keep weapon_t1/armor_t1 and later tiers stable. Gameplay descriptors are in core.js and replaceable appearance descriptors are in art.js. Do not use paid AI generation. Keep first-clear and session reward settlement idempotent.

The existing .openai/hosting.json identifies the private Site; reuse it. Do not register another Site. Follow Sites skills for hosting. Current scope is a first-chapter prototype with five trainers, 12 arena encounters, skills, gear, lodge/gallery upgrades and endless survival. Further campaign content, missions, advanced talents and new art are follow-up work.
