# New equipment sets C, D and E

Generate **five images per set, fifteen images total**: a complete standing hero, a four-pose attack sheet, a four-pose jump/landing sheet, one sword, and one shield sheet containing both faces. The standing master supplies the quiet breathing idle in code; no extra idle frames, separate head/hair, helmet or body-part sheet is needed. Hit and defeat art remain a later batch.

Start with Set C and approve its standing master before making its other four images. Repeat for D and E. Use one consistent image-agent conversation per set, but attach the listed references to every request so their roles remain explicit. Save approved results with the names below. The labels are working art names; shop names, prices, bonuses and stable item IDs will be assigned during integration.

| Set | Working design brief | Output names |
| --- | --- | --- |
| C —  | Forest-teal cloth, warm ivory steel plates, antique brass edging, small jade-green stones and a simple curved wind emblem. Compact layered shoulders, fitted torso, matching pants and armored boots. | `set-c-full.png`, `set-c-attack.png`, `set-c-jump-land.png`, `sword-c.png`, `shield-c.png` |
| D — Ember Knight | Deep burgundy cloth, charcoal steel plates, warm copper-gold edging, small amber stones and a restrained sunburst emblem. Compact angular shoulders, fitted torso, matching pants and armored boots. | `set-d-full.png`, `set-d-attack.png`, `set-d-jump-land.png`, `sword-d.png`, `shield-d.png` |
| E — Astral Sentinel | Midnight-violet cloth, bright silver plates, pale-gold edging, small opal-blue stones and a simple four-point star emblem. Refined layered shoulders, fitted torso, matching pants and armored boots. | `set-e-full.png`, `set-e-attack.png`, `set-e-jump-land.png`, `sword-e.png`, `shield-e.png` |

These are suggested original sky-island fantasy designs. Keep the motifs painted or engraved: no emitted glow, fire, particles, floating decorations, giant spikes, wings, cape, scarf or trailing cloth. Hands stay bare for the current weapon and shield attachments.

## Reference files to attach

Use these accepted local files, not the rejected jump or angled-shield results:

| Reference | File |
| --- | --- |
| Hero identity and standing pose | [set-b-full.png](</Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser/dist/assets/hero-equipment/set-b-full.png>) |
| Four attack poses | [set-b-attack.png](</Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser/dist/assets/hero-actions/set-b-attack.png>) |
| Four merged jump/landing poses | [set-b-jump-land.png](</Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser/dist/assets/hero-actions/set-b-jump-land.png>) |
| Accepted long sword proportions | [sword-b-long.png](</Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser/dist/assets/hero-equipment/sword-b-long.png>) |
| Accepted straight-on shield faces | [shield-b.png](</Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser/dist/assets/hero-equipment/shield-b.png>) |

In the prompts below, replace `[SET]` with C, D or E and `[DESIGN BRIEF]` with that row's full brief. After approving the master, always attach that exact result for the same set. Do not regenerate the master between requests.

## 1. Complete standing hero

Attach only the accepted `set-b-full.png` reference above. Save the approved result as `set-[letter]-full.png`.

```text
Edit the attached complete standing hero into equipment Set [SET].

Design brief: [DESIGN BRIEF]

Change the complete outfit only: torso armor, short sleeves, shoulders,
belt, pants and boots. Make this one connected, fully clothed hero,
not separate parts. Establish a clear, consistent costume design that
can be transferred onto the same hero's action poses later.

Preserve the reference's original brown hairstyle, full head and face,
expression, skin tone, age, chibi body proportions, head size and right-
facing camera angle. Keep exactly the same stance, shoulder/elbow/wrist
positions, closed bare fists, legs, feet, baseline and placement. Fit the
new armor around this body without enlarging or stretching the anatomy.
Keep compact shoulders and a similar overall outfit silhouette.

Match the reference's painted shading, clean dark outlines, material
detail, light direction and finish. Keep ornaments readable at game size.
No helmet, hair accessory, scarf, cape, gloves, wings or trailing cloth.
No weapon or shield; the game attaches those separately.

Output ONE complete full-body sprite on a genuine transparent PNG.
Match the reference's 1086×1448 canvas, body scale and placement. Keep
all hair and boots visible. Do not independently crop, recenter or zoom.
No extra poses, detached pieces, scenery, ground shadow, glow, effects,
text, labels, grid or painted checkerboard.
```

Check the full head, original hair, fists, boots and costume before proceeding. A polished drawing with changed proportions is not yet the approved master.

## 2. Four attack poses

Attach in order:

1. The approved new `set-[letter]-full.png` — costume and materials.
2. The accepted `set-b-attack.png` — exact pose and placement template.

Save as `set-[letter]-attack.png`.

```text
Edit reference 2 into the SAME four attack poses wearing Set [SET].
Reference 1 controls the approved costume and materials. Reference 2
controls each pose, anatomy, expression, camera angle, body scale and
frame placement. Transfer the costume without reinterpreting the action.

Replace all Set B clothing with the exact torso, sleeves, shoulders,
belt, pants and boots from reference 1. Preserve those materials, trim,
ornaments, seams, colors and lighting consistently in all four drawings.

Preserve reference 2's original complete hairstyle and face, head size,
near/far arm identity, joint positions, fist position and grip rotation,
legs and feet. The near weapon arm stays in front of the head wherever
they overlap. Do not swap arms, change the swing, mirror any pose or
invent different hand gestures. Hands stay bare and closed.

Match the 1254×1254 canvas and 2×2 layout: top-left preparation,
top-right raised weapon hand, bottom-left forward strike, bottom-right
recovery. Follow the actual drawings exactly. Keep the same scale and
placement in each 627×627 cell. Do not resize each silhouette to fill
its cell; crouching or leaning must not make the character larger.

Output one genuine transparent PNG containing exactly four complete
heroes. No helmet, scarf, cape, gloves, sword, handle, shield, scenery,
ground shadow, glow, blur, effects, text, cell borders or checkerboard.
```

## 3. Four combined jump and landing poses

Attach in order:

1. The SAME approved new `set-[letter]-full.png`.
2. The accepted `set-b-jump-land.png` — exact merged four-pose template.

Save as `set-[letter]-jump-land.png`.

```text
Edit reference 2 into the SAME four jump/landing poses wearing Set [SET].
Reference 1 supplies the approved complete costume and materials.
Reference 2 controls exact anatomy, pose, camera, expression, body scale
and placement. Replace the clothing only; do not redesign the movement.

Keep reference 2's 1774×887 canvas and horizontal pose order:
1. Crouched jump preparation.
2. Airborne preparation, near weapon hand drawn back beside the head.
3. Forward-leaning airborne low strike with the near weapon hand forward.
4. Grounded bent-knee landing/recovery.

Preserve each drawing's exact size, location and relationship to the
others. The reference does not use four tightly cropped equal sprites:
do not redistribute them into a new grid, equalize their visible heights
or enlarge the crouched/bent poses. Match all original head, hip, hand
and boot landmarks and retain clear separation between the artwork.

For pose 2, preserve the elbow pointing toward screen-right with the
wrist/palm drawn back beside the head, exactly as shown. Do not move the
elbow behind the body or substitute a fist in front of the forehead.
For pose 3, preserve the strong forward torso lean, near-hand low strike
and trailing legs. Do not replace it with an upright punch.

The near weapon arm performs the action and stays in front of the head
where they overlap. Keep the far/shield arm close to the body in the
reference's position, including its existing occlusion. Do not raise it
or make it perform the attack. Preserve every fist's angle.

Keep the complete original brown hair, face, skin and body proportions.
Apply the SAME connected torso, shoulders, short sleeves, belt, pants
and boots from reference 1 throughout. Preserve its exact design and
painted finish. Bare hands; no helmet, scarf, cape or gloves.

Output one genuine transparent PNG with exactly these four complete
poses. No sword, handle, shield, background, ground shadow, glow, motion
blur, effects, labels, grid or checkerboard. Keep every boot visible.
```

## 4. Matching long sword

Attach in order:

1. Accepted `sword-b-long.png` — length, width, orientation and grip layout.
2. Approved new `set-[letter]-full.png` — matching materials and motifs.

Save as `sword-[letter].png`.

```text
Create the matching Set [SET] sword using these two references.
Reference 1 controls the already-approved LONG sword proportions,
horizontal orientation, broad-face camera view, grip placement and
canvas layout. Reference 2 controls the new set's colors, materials,
metal trim, stone colors and decorative motif.

Keep the same overall sword length, blade width, guard-to-tip length
and handle size as reference 1. It is already long enough: do not add
another length increase. Keep the pommel at the left and tip at the
right. Preserve the grip's center and its horizontal axis so the game
can attach it to the hero's closed fist.

Design a distinct matching guard, pommel and restrained blade engraving
using reference 2's materials and motif. Keep one straight, pointed,
double-edged steel blade with a readable bevel and central fuller.
Maintain comparable guard dimensions and a practical leather grip.
No giant guard spikes, chains, floating parts, serrations or effects.

Show the broad blade face STRAIGHT-ON ORTHOGRAPHIC, without three-quarter
rotation, tilt, foreshortening or an edge-on view. Match the established
painted shading, dark outline, light direction and detail level.

Output one complete sword on a genuine transparent 2172×724 PNG.
Match reference 1's scale and placement with clear padding. No hand,
character, scabbard, shield, ground shadow, background, glow, labels,
extra swords or checkerboard.
```

## 5. Matching shield, both faces

Attach in order:

1. Accepted `shield-b.png` — straight-on front/back layout and grip design.
2. Approved new `set-[letter]-full.png` — outfit materials and motif.
3. Approved new `sword-[letter].png` — matching metal, leather and finish.

Save as `shield-[letter].png`.

```text
Create a matching ROUND shield for equipment Set [SET], showing both
faces of the SAME physical shield. Reference 1 controls the straight-on
camera, circular silhouette, front/back layout, size and inner hardware.
References 2 and 3 control the new set's palette, materials, metal trim,
stone colors, decorative motif and painted finish.

LEFT: exterior/front face for the Shop. Design a distinct arrangement
of the set's emblem and materials around a central boss, with a sturdy
rim. Keep ornaments restrained and readable at small game size.
RIGHT: interior/back face for the hero's far hand. Show a centered
horizontal leather hand grip and a lower forearm strap. Match the same
rim, materials and construction. No exterior emblem painted inside.

Both cameras look directly perpendicular to the shield face: STRAIGHT-
ON ORTHOGRAPHIC, no three-quarter angle, yaw, tilt, perspective narrowing
or edge-on view. Both outer silhouettes must be circular, equal width
and height, with matching diameters, aligned centers and rim thickness.
Use shading for depth while keeping the camera straight-on.

Match reference 1's 1774×887 canvas with two side-by-side 887×887 cells,
outside on the left and inside on the right. Keep its shield scale and
placement. Preserve clear transparent margins and separation. Keep the
inside grip center in the same position relative to the shield center.

Output one genuine transparent PNG containing exactly these two views.
No hand, arm, hero, sword, scenery, ground shadow, glow, effects, labels,
grid or checkerboard. No helmet or new character art.
```

## Review and another-chat handoff

These prompts constrain consistency; they cannot guarantee exact registration. Compare each result with its pose template before accepting it. Check the hair/face identity, head scale, shoulders, wrist/fist angle, feet, outfit details and silhouette boundaries. Reject extra hands, shifted grips or a returning three-quarter shield view. If a particular drawing drifts, request a correction of that drawing with the same master and template instead of regenerating the whole set from memory.

Keep the original transparent files. Integration should inspect actual dimensions and fit changed root/grip coordinates as needed; requested output dimensions alone do not justify reusing all Set B coordinates. Keep the visual review brief: one representative preview, without replaying every outfit and animation after each request. Broaden only for a concrete issue or Jimmy's explicit request. Prompt-only work needs no browser review. No additional idle or intermediate frames are required before integration.

Attach the fifteen approved outputs to the next coding chat and use this handoff:

```text
Integrate these three new complete equipment sets C, D and E into One
Brave Odyssey Browser. Each set has five supplied PNGs: standing master,
four-frame 2×2 attack, four-pose horizontal jump/landing, long sword,
and shield with outside left / inside right.

Follow docs/new-equipment-sets-prompts.md and the current Set A/B runtime
as reference. Keep original hair and complete body sprites. Use gentle
runtime breathing on the standing master. Armor is one complete outfit;
weapons and shields remain independent purchases/equipment slots.
Use the shield outside in the Shop and inside when held by the far hand.
Use the long sword art without stretching it again; current equipped
sword multiplier is 1.4× unless I request a change.

Inspect the actual PNGs and calibrate per-frame body roots, grip anchors
and layering. Preserve pose order and existing animation timing. Keep
current item IDs and saved progress compatible; assign new stable IDs
for these sets after checking the current catalog. Working art names
are not approved prices or progression bonuses; surface the proposed
new catalog values before changing balance.

Do not add a helmet slot, separate hair, body-part editor or extra art
generation. Do not run tests, Git commands or publish unless I ask.
Implement locally and show one brief representative visual preview
without changing my save. Do not recheck every outfit, pose or animation
unless I specifically ask or report an issue. Prompt-only work needs
no browser or animation review.
```
