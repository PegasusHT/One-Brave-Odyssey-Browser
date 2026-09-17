# Set A — jump, landing, hit and defeat prompts

Latest: the two key poses received at 08:17 plus frames 1 and 6 of the 07:56 sheet are accepted and integrated into Set A's local jump preview and Critical training. The jump prompt and batch plan below are historical; do not regenerate them. The current [pose-reference notes](set-a-reference-pose-prompts.md) correct preparation to “fold the wrist/palm back, keeping the elbow toward screen-right.” Hit/defeat remain proposed future work.

Jimmy requested the next jump/landing batch and economical hit/defeat coverage. Use one prompt per sprite sheet, as preferred. No new standing master, idle sheet or complete-head asset is needed. The existing full Set A master and received four-pose attack sheet remain the references.

## Proposed art budget and reuse

- Jump/landing: one 3-column × 2-row sheet, six key poses: crouch, takeoff, airborne hold, airborne downswing, strike landing, ordinary landing.
- Hit/defeat: one 2×2 sheet, four key poses: recoil, stagger, knees buckling, seated defeated hold.
- Ordinary grounded hit: use the recoil pose briefly, with optional code-driven tint and small offset, then return to the appropriate pose. Start defeat from that same recoil drawing. The next three poses form the defeat follow-through; hold the last frame rather than looping.
- During an airborne action, start with a brief tint on the current action drawing rather than substituting the grounded recoil and snapping the legs to the floor. No separate hit sheet for every action is requested.
- Reuse the exact standing master before/after a completed jump. Reuse approved attack recovery only if body/hand registration fits; it is not a replacement for a bent-knee landing. Add selective in-betweens after actual playback review, not a full batch upfront.

These are ten new key drawings across two sheets. They cover distinct poses, not a guarantee of smooth animation. Full-body outfits still need their own artwork for the same poses; runtime timing, jump travel, effects and sprite-loading behavior can be shared across outfits. Test the Set A pipeline before commissioning other outfits. Import only the needed runtime assets; future larger catalogs can load equipped outfit sheets on demand rather than preloading every sheet.

## Attachments and registration

For both prompts attach the original `setA.png` (runtime copy: `dist/assets/hero-equipment/set-a-full.png`) and the received attack sheet (runtime copy: `dist/assets/hero-actions/set-a-attack.png`). The original master controls identity and costume. The attack sheet is a secondary reference for rendering style, near-hand identity and raised grip. Do not allow either reference to be independently redesigned.

Canvas dimensions below are targets. Inspect the actual returned pixel dimensions, alpha and cell layout, and calibrate a common character scale against the master. Never independently stretch each cell's silhouette to the same height: crouching and defeat should be shorter because of the pose. Keep original PNGs unchanged and register cells in runtime descriptors. Sheet prompts alone cannot guarantee proportions, exact alignment or smooth playback.

Generate the jump sheet first and review it before commissioning the reaction sheet. Both copy-ready prompts follow so Jimmy can see the complete art plan.

## Prompt 1 — jump and landing (`set-a-jump-land-sheet.png`)

```text
Create ONE transparent sprite sheet with SIX full-body jump and landing
key poses of the exact hero in attached setA.png.

REFERENCE AND STYLE
The original setA.png is the permanent identity and costume reference.
Match its exact face, chestnut-brown hair with upward curl, head/body
proportions, brown leather armor, cream sleeves, buckles, dark gray
trousers with brown knee patches, and cuffed brown boots. Keep bare hands.
No scarf, gloves or helmet. Draw the entire connected character, including
one complete head with hair, face and ears, in each cell.
Use the attached attack sheet only as a secondary reference for style,
near-arm identity and the raised gripping hand. Preserve the same painted
shading, dark outlines, colors, light direction and right-facing
three-quarter camera. Do not redesign the outfit or rearrange hair locks.

SHEET AND ALIGNMENT
Exactly THREE columns and TWO rows, six equal square cells, read left to
right across the top row, then the bottom row. Target 3072×2048 pixels,
with 1024×1024 cells. True PNG alpha; no grid lines, borders or labels.
Use one character scale for every cell. In each cell, a standing version
of the master would have its highest hair tip near y=192, lowest sole
at y=896, and ground origin x=512. Do not actually add a standing pose.
Do not resize a crouch or bent-leg pose to fill the cell. Grounded poses
keep the original boot contact locations. Keep every limb fully visible.

IMPORTANT: THESE ARE IN-PLACE BODY POSES.
The game supplies all upward/downward jump travel and forward movement.
Do not draw the character following a jump arc across the sheet.
For airborne poses keep the pelvis near the standing master's pelvis
position within the cell; fold or extend the legs around that body root.
Do not shift the whole airborne character upward, forward or to the floor.
Grounded crouch and landing lower the pelvis naturally toward the fixed
floor. Do not squash or shorten the actual body parts.

ARMS AND WEAPONS
The near arm, appearing on the left side of the standing master, is the
weapon arm closest to the viewer. Never swap near and far arms.
Raise the near fist counterclockwise as viewed on screen: from low at the
hip, forward toward screen-right, then up toward the near ear.
For airborne preparation, the fist is beside the ear, slightly toward the
back of the head in screen position, but the near arm and fist remain
IN FRONT of the hair/head wherever they overlap. Orient its gripping
hand for an imaginary blade pointing behind the hero toward screen-left.
Keep a readable thumb and consistent bare gripping fist.
Draw NO sword, handle or shield. Keep the far hand curled and consistent
so a separate shield can be attached later; do not use it to grip a sword.

TOP-LEFT — 01: CROUCH
A modest grounded anticipation. Knees bend; pelvis lowers naturally.
Both boots stay planted. Near hand begins its forward/upward lift.
This is controlled preparation, not an exaggerated deep squat.

TOP-MIDDLE — 02: TAKEOFF
Legs extend from the crouch, ankles pushing off with heels raised.
Torso nearly upright. Near hand continues lifting toward head level.
Keep the body near its standing root; do not add upward travel.

TOP-RIGHT — 03: AIRBORNE PREPARATION / HOLD
Fold the knees slightly below the body, with both boots clear of their
standing floor contacts. Near fist beside the ear, grip ready for a blade
pointing back-left. Keep the pose balanced and readable for an indefinite
hold. Do not draw motion blur or a duplicate settling pose.

BOTTOM-LEFT — 04: AIRBORNE DOWNSWING
From the hold, the near arm begins swinging forward/down toward the
screen-right target. The fist travels in front of the upper torso;
wrist supports an imaginary blade angled forward/down. Legs begin
extending for contact. Keep the same airborne pelvis anchor as pose 03.
Do not move the whole hero down inside this cell.

BOTTOM-MIDDLE — 05: STRIKE LANDING
Both boots contact their original floor positions. Knees bend to absorb
impact; torso leans slightly forward. Near arm completes the strike
forward at waist level, with grip ready for a HORIZONTAL right-pointing
blade. Keep the face visible and anatomy naturally connected.

BOTTOM-RIGHT — 06: ORDINARY LANDING, NO STRIKE
Both boots planted at the same floor positions, knees slightly bent and
torso nearly upright. Lower the near fist toward its relaxed position.
No attacking arm extension. This is the safe landing after a missed or
cancelled jump and can also settle back toward the standing master.

Return one sheet with exactly these six complete poses. No weapons,
scenery, ground shadows, effects, glow, speed lines, motion blur,
checkerboard, text, guides, extra limbs or additional characters.
```

## Prompt 2 — hit and defeat (`set-a-hit-defeat-sheet.png`)

```text
Create ONE transparent sprite sheet with FOUR full-body reaction poses
of the exact hero in attached setA.png: one hit reaction followed by
three stages of a short battle defeat.

REFERENCE AND STYLE
The original setA.png controls the exact face, brown hairstyle and upward
curl, proportions, brown leather armor, cream sleeves, buckles, dark gray
trousers with brown knee patches and cuffed brown boots. Keep bare hands;
no scarf, gloves or helmet. Preserve costume details, painted shading,
dark outlines, colors and lighting. Draw each complete head and body
naturally connected, not assembled from separate parts.
Use the attached attack sheet as a secondary style and hand reference.
Keep the same right-facing three-quarter camera throughout. Expression
may change as described; head size, facial construction and hair design
must remain the same.

LAYOUT
Exactly TWO columns and TWO rows, read top-left, top-right, bottom-left,
bottom-right. Target 2048×2048 pixels, four 1024×1024 cells, true PNG alpha.
No visible grid, borders or labels. Maintain one character scale.
In every cell, the standing master would have highest hair near y=192,
lowest sole y=896 and ground origin x=512. Keep the floor fixed.
As the hero kneels or sits, let his silhouette become shorter naturally;
do not enlarge or recenter the fallen pose to fill its cell.
Keep the complete hair, head, hands, knees and boots inside each cell.

EQUIPMENT
Draw no sword, handle, shield or other equipment held in the hands.
Keep the near weapon hand as a readable closed grip throughout, so its
separate sword can stay attached. Do not open that hand or throw anything.
The far hand remains consistent and lightly curled. Neither hand needs
to support the body on the ground. Keep near limbs in front when they
cross the torso/head. Do not swap arms or face the opposite direction.

TOP-LEFT — 01: HIT RECOIL
A small readable reaction to a hit arriving from screen-right.
Torso and head lean slightly back toward screen-left; knees soften;
both boots remain grounded. Eyes briefly squeeze shut with a restrained
wince. Near fist stays low and close to the body's original ready pose,
with grip suitable for an imaginary right-pointing blade.
This single pose must work both for ordinary damage and as the first
frame of defeat. No wounds, impact flash or exaggerated knockback.

TOP-RIGHT — 02: STAGGER
Continue from recoil: balance starts to fail, shoulders drop and knees
bend further. Torso begins returning forward, head lowers slightly.
Keep feet close to their original positions; do not walk or spin.
Maintain the near gripping hand, lowering it with the body.

BOTTOM-LEFT — 03: KNEES BUCKLE
The hero sinks into a low kneel, one knee contacting the fixed floor
while the other leg folds naturally. Shoulders and head droop.
Show a clear intermediate stage between stagger and seated defeat.
Keep original limb lengths and head size; do not shrink the hero.
Keep the near fist low, away from the face, still gripping imaginary gear.

BOTTOM-RIGHT — 04: DEFEATED HOLD
The hero has settled into a compact seated slump on the floor, knees
bent, shoulders dropped, head bowed and eyes closed. Clearly defeated
and exhausted. This final pose must look stable when held indefinitely.
Keep the near gripping fist low beside the lap, with an imaginary blade
pointing right approximately parallel to the ground. Keep the far hand
resting near the other knee. No weapon dropping or independent effects.

Return one sheet with exactly these four complete poses. No blood,
wounds, weapons, background, ground shadow, stars, glow, motion blur,
text, grid, guides, checkerboard, extra limbs or extra poses.
```

## Integration notes for the next implementation

Critical already has rise, airborne wait/finish, land, recovery and reset phases. Its existing world-position function supplies the arc and horizontal travel. Use the airborne hold in both waiting phases; use the ordinary landing when a jump fails or is interrupted, including a partial-rise landing. Keep root calibration separate from visible foot positions and never apply the world jump twice. Existing particles and shadows remain code-drawn.

Battle currently marks `done` on zero HP, stops its simulation clock and opens the result dialog immediately. A later defeat integration needs a presentation timer separate from combat simulation: stop attacks/input immediately, settle and save exactly once, play the short defeat presentation, then show the loss result. Reduced motion can show the final pose directly. Visibility/orientation pauses and once-only result presentation must remain correct. Retreat should not show a death/defeat collapse. Do not defer reward persistence solely to an animation callback.

For ordinary hits, use a short recoil with a restrained tint/offset if motion is enabled. Avoid changing to a grounded pose during a jump; retain the current action sprite and tint it initially. Sword/shield anchors must follow any displayed reaction body. Use the last defeat pose for the result background too, avoiding a separately generated defeat portrait. Final timings and any missing in-between drawings are determined after the supplied sheets are reviewed.

This document is an art prompt handoff, not an implemented jump/hit/defeat system. No runtime, editor, tests, Git or publishing changes are requested for this handoff.
