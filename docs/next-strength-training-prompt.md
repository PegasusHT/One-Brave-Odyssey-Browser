# Prompt for the next AI — revise browser Strength training

Work directly in:

`/Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser`

Implement the requested Strength training revision end to end. Do not stop after describing a plan. First read `AGENTS.md`, `docs/build-progress.md`, `docs/mechanics-map.md`, `README.md`, `dist/training.js`, `dist/game.js`, `dist/art.js`, `dist/style.css`, `dist/core.js` and `tests/game.test.js`.

This is the independent browser prototype. Do not edit the neighboring Unity project. Keep the existing plain ES-module, Canvas 2D and semantic HTML approach. `dist/` is authored source. Do not add a build system, paid service, paid asset, copied reference-game asset or unnecessary dependency. Preserve mobile landscape behavior, Pointer Events, safe areas, bounded pools, localStorage compatibility and idempotent settlement. Keep code free of comments and put explanations in documentation.

The user supplied this layout reference:

`/Users/jimmybui/Desktop/Screenshot 2026-09-10 at 2.13.28 AM.png`

Use it only to understand the broad training composition: player at the left, throwing partner at the right, an object travelling between them, a compact temporary goal meter near the top center and a Town/back control at the top left. Do not copy its character, dummy, room, colors, icons, text, typography, UI skin or other assets. Continue One Brave Odyssey's original colorful sky-island and teal-scarf visual direction.

## Required Strength-session behavior

1. Remove the visible yellow hit-distance circles, dashed or segmented projectile travel lines, and the in-world `HIGH`, `MID`, `LOW` and `KICK` labels from Strength training. The player should judge timing and distance from the moving objects and character animation. Keep touch input usable and accessible; invisible or icon-based controls must retain useful `aria-label` text.

2. Add an original training partner on the right side who visibly throws oranges or similarly readable original practice fruit toward the hero. The partner must be visually distinct from the screenshot character. The fruit should originate near the partner's throwing hand.

3. Make the high throw follow a clear parabola like a tossed ball. It must not travel on a horizontal line. Use frame-rate-independent motion and actual projectile coordinates so visuals and hit detection stay aligned. Mid and low throws may remain flatter if they remain distinct and readable. Do not draw trajectory guides.

4. Remove the 30-second limit from Strength training. It should continue until the player chooses to leave. Remove the time metric and any automatic completion at 30 seconds. Change the Strength entry button so it no longer says `30s`.

5. Add a clear, thumb-friendly Town/back button at the top-left of the Strength session. Pressing it must immediately opening a pause dialog. Retain safe handling for page hiding, accidental navigation and repeated settlement so rewards cannot duplicate.

6. Remove the Strength pause button. Backgrounding the browser or rotating to portrait may still suspend simulation automatically for lifecycle safety, but there should be no visible manual pause control in this session.

7. Remove the persistent `TRAINING GROUNDS`, `Strength` and slash/kick instruction text from the Strength play screen. Hide the normal global header and bottom navigation during this immersive Strength session if needed to achieve the requested minimal layout; restore them correctly on exit. Do not unintentionally alter other screens.

8. Show the Strength instructions only on the player's first visit for approximately four seconds, then fade/remove them. Suggested concise copy: `Tap a throw's height to slash. Tap the rear action for falling sparks. Return to Town anytime to bank your gains.` Persist a dedicated first-visit flag through save normalization so the tutorial stays dismissed after reload. Existing saves must continue to load.

9. Remove the visible `good hits` box. The only ongoing score shown should be combo, plus the temporary goal meter. Successful hits may remain an internal value for reward calculation and records. Misses reset combo but must not erase already earned cash-out progress.

10. Add a compact top-center goal meter that presents a temporary objective and progress toward a bonus. Do not copy the reference meter's skin or wording. Before fixing the reward rule, completion grant a temporary multiplier? Everything else can be implemented while waiting. use an escalating combo target beginning at four consecutive hits; completion adds bonus pending Strength and XP, produces clear feedback, then rolls to a harder target. Missing resets current meter progress without removing completed bonuses.

11. Remove the old `complete a 30-second round with 8 hits` skill-point condition and all result/menu text that refers to a full timed round. Do not leave a now-impossible timer-dependent reward rule. Adapt the result dialog to show banked Strength, XP, best combo and goal bonuses. Do not invent an aggressive repeatable skill-point farm.

12. Preserve the existing hero equipment rendering, sound setting, reduced-motion preference, fixed projectile/effect pools and the other four training games. Shared code changes must be checked against those modes.

## Touch behavior

Keep the input scheme playable on phones after removing labels. Prefer spatial input: tapping the upper, middle or lower play region triggers the matching slash, while a separate large rear-action icon near the left thumb triggers the kick. If changing the current buttons would create a larger unrelated refactor, retain the buttons as minimal icons for this pass. Do not add tiny targets, keyboard requirements, hover instructions or scrolling/drag gestures inside gameplay.

## Validation and completion

- Replace the existing timer test with a test showing Strength remains active past 30 seconds.
- Test that first-visit tutorial state survives save normalization and a save round trip.
- Test direct Town exit and repeated/pagehide settlement cannot duplicate rewards.
- Test or structure the high projectile trajectory so its vertical position demonstrably changes along a parabola while remaining hittable.
- Add goal-meter tests after Jimmy selects the reward rule.
- Run `npm test` and syntax-check changed modules.
- Check at 844×390, 667×375 and 568×320 landscape sizes. Do not claim physical-device testing unless Jimmy performs it.
- Update `README.md`, `docs/validation.md` and `docs/build-progress.md` to match the completed behavior.
- Report what changed, how it was tested and any remaining tuning decision. Keep the local server and phone-tunnel workflow intact; source changes should appear after refreshing the browser.
