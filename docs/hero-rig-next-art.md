# Next hero art requests

The **six received PNGs—armor A/B, helmets A/B and bottoms A/B—are integrated locally**. Jimmy chose separate purchases: armor, helmets and bottoms are independently bought, saved and equipped. Existing `armor_t2`/`armor_t3` use armor A/B with unchanged prices and bonuses; new helmet and bottoms slots have base/A/B choices. Shields and swords follow later. The complete [two-set equipment pack](equipment-two-set-prompts.md) contains **12 PNGs**, with **six remaining: four shield views and two swords**. Jimmy is satisfied enough with the motion to proceed; the neck/head connection, near-side diagonal alignment and far palm remain known follow-ups, not a requirement to regenerate the whole base before starting. A visual editor is a later task.

Each shield needs an **outer/front face for Shop** and a separate **inner/back face with grip and straps for the held far-hand sprite**. Both views must depict the same physical shield, with coherent outline, rim and design, and no baked hands. Generate Set A outer + inner as one two-image batch, then Set B outer + inner as another. The two-sword batch is unchanged.

The repair prompts below are retained for later targeted fixes. They do not replace the current two-set equipment request.

Review **Hero → Animation preview** first. These are targeted repair prompts for the supplied body sheets. The current source copies are unchanged; the prototype mirrors the far foot, clips the pelvis, and limits limb ends at overlapping joints. Those code adjustments are a fitting aid, not finished artwork corrections. Hero motion uses a bald base for helmet fitting. The gray kit is a base-body preview, not the final equipped outfit. The existing starter sprite artwork is already a complete set; this modular preview needs no starter hair or starter outfit recreation.

Use these two repairs after reviewing the standing, raised-arm, attack, airborne and landing poses. Save each result as a new PNG so the originals remain available.

## 1. Repair the lower sheet

Attach [the current lower sheet](</Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser/dist/assets/hero-rig/lower.png>). Its canvas is **1254 × 1254**. The far foot is the smaller left-pointing foot in row two, right column. The two unused hair pieces at the bottom can remain unchanged. They are not used by the modular preview, and this repair needs no hair recreation or fitting.

Copy this prompt:

> Edit the attached LOWER body-parts sheet for a modular 2D character. Return a transparent PNG at exactly 1254 × 1254 pixels. Keep the exact layout, piece positions, piece scales, proportions, colors, shading and art style. Do not rearrange or resize any part. Repair the smaller far foot in row two, right column so its toes point RIGHT, matching the top-row foot; keep it in its existing sheet slot and at its existing scale. At the thigh-to-shin and shin-to-foot connections, make the hidden joint ends overlap smoothly when assembled and bent. Remove black lines running across those internal knee and ankle joins; retain the visible outer contour. Preserve the existing gray shorts on BOTH thigh pieces, including their hems and side stripes. Leave both hair pieces unchanged. Add no new parts, labels, background, checkerboard, shadows or assembled character.

For identifying the current pieces, the source crop rectangles below use `(left, top, width, height)` in pixels from the upper-left corner. These are reference locations, not instructions to export separate crops.

| Piece | Current crop |
|---|---|
| Near thigh / shin / foot | `(135, 69, 227, 346)` / `(560, 97, 159, 302)` / `(928, 238, 238, 177)` |
| Far thigh / shin / foot | `(131, 479, 224, 324)` / `(560, 496, 156, 281)` / `(930, 648, 200, 143)` |

## 2. Repair the central pelvis

Attach [the current upper sheet](</Users/jimmybui/Downloads/Projects/Games/One Brave Odyssey Browser/dist/assets/hero-rig/upper.png>) and the lower sheet above as a reference. Edit only the upper sheet. Its canvas is also **1254 × 1254**; the pelvis is the shorts piece at the top right, currently cropped from `(875, 206, 325, 252)`.

Copy this prompt:

> Edit only the top-right pelvis piece in the attached UPPER sheet. Use the LOWER sheet only to understand how its separate moving thighs already carry the gray shorts legs. Return the UPPER sheet as a transparent PNG at exactly 1254 × 1254 pixels, preserving every other piece unchanged. Replace the current complete shorts with ONE central pelvis piece: preserve the waist, waistband, central hip volume, crotch, color, shading, style, position and scale. Remove the two hanging shorts legs and exposed leg stubs from this pelvis piece. Keep enough rounded hip coverage to overlap the separate thigh pieces during raised knees and a deep crouch, without doubled shorts or a black seam across the hidden joins. Do not alter the shorts on the LOWER sheet. Do not move or resize the pelvis, add body parts, or assemble the hero. No labels, background or checkerboard.

If the image agent cannot leave the rest of the upper sheet unchanged, request **only the replacement pelvis on an otherwise transparent 1254 × 1254 canvas, at the same original position and scale**. Keep the original upper sheet as the alignment reference.

## After the repairs

Fit the returned parts into the existing preview and review the same five poses. A changed sheet layout or joint position will need fitting before reuse; the prompt alone does not guarantee compatibility.

The two coordinated armor, helmet and bottoms sets use the bald body and shared rig. Continue reviewing their fitting through idle, attack, jump and landing, including combinations mixed across independently equipped slots. Use the equipment prompt pack above for the remaining shields and swords. Keep the complete existing starter sprite set. No modular starter hair or outfit recreation is needed. A larger tier catalog follows successful fitting and mixing of these two sets.

## Helmet fitting rule

Fit upgraded helmets directly to the bald modular head. Hero motion has no hair layers, and helmets show no hair. Hair requests and hair fitting are unnecessary; the existing complete starter sprite set remains separate.

For any later helmet-art correction, retain this clause:

> Fit this upgraded helmet directly to the approved bald modular head. Show no hair: no bangs, tuft, side hair or rear hair. Keep the approved head position, proportions and attachment alignment.

The two received helmet images now use the independent saved helmet slot and Shop category. No replacement helmet images are requested here; the bald-head rule continues to apply.
