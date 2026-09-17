# Equipment art direction — full Armor outfits

Latest sword/shield request: the supplied Sword A is integrated at `weapon_t2`, with global equipped-sword scale 1.4×. Use the [longer blade and straight-on shield prompts](sword-length-and-shield-view-prompts.md) for the next art edits. The shield's three-quarter view below is superseded by orthographic outside/inside views; keep Set A's round silhouette circular.

Jimmy's current direction supersedes the independent helmet and bottoms plan below. **No helmets. Armor is one complete outfit of clothes, pants and shoes**, with matching gloves optional later. Shop has **Armor sets, Weapons, Shields and Fairy**. Weapons remain separate; Shields and Fairy are marked Coming soon. Existing armor IDs, prices and bonuses remain unchanged.

The four received A/B armor and bottoms PNGs supply the current two outfits: `set-a-armor.png` + `set-a-bottoms.png` for `armor_t2`, and the matching B files for `armor_t3`. Their file split supports the existing rig; it does not create separate purchases. The two received helmet PNGs are retired reference assets and are not rendered. The original complete starter sprites remain in use for base armor.

Set A is practical brown leather, cream cloth and bronze. Set B is steel with navy cloth, restrained teal details and brass trim. The current cutout rig stays in place while Jimmy uses the authorized [hero editor](hero-editor.md) to review fitting. No new image generation is requested in this revision.

## Future full-body option

Complete body frames per Armor set could remove visible cutout seams, but require consistent frame-by-frame action sequences. One picture per action is not an animation replacement. Every sequence needs the same canvas, character proportions, scale, facing and root/ground anchors, with coherent intermediate poses and transitions.

**Future full-body art must keep the original starter hero's hairstyle and identity. Do not use the temporary bald modular head and do not add a helmet.** Begin with one approved Set A full-body neutral master before planning idle, attack, jump and landing frames. The [next-art brief](hero-rig-next-art.md) contains the future master-image prompt and reference files. Frame counts, timings and packing are later integration decisions after approving the master and action plan.

Swords and future shields remain separate layers, with per-frame hand/grip anchors so they can swap independently of the outfit. Shield art will need coherent outer and inner views; no hands should be baked into either weapon or shield images. Fairy is a later separate companion, not part of an Armor image.

## Archived modular prompt pack — superseded, not a current generation request

The following prompts preserve the origin and layout of the supplied cutout assets. They originally described separate armor, helmet and bottoms purchases and an editor deferred until later. Those product decisions are superseded by the full-outfit model and authorized editor above. **Do not regenerate helmets or follow the old independent-slot/fitting-order instructions.** The old bald-head rule applies only to the retired helmet brief, never to future complete-body art. Shield and sword prompts are retained as possible later references, not tasks to run now.

## References and workflow

- [Upper parts](../dist/assets/hero-rig/upper.png): bald head, torso, central hips, near/far arm pieces. The source is 1254×1254.
- [Lower parts](../dist/assets/hero-rig/lower.png): near/far thighs, shins and feet. The source is 1254×1254. Its hair is unused.
- The approved leather armor design may also be attached to Prompt 1 as a design reference. The supplied body parts control fitting; the leather reference controls only garment styling.
- Armor A/B, helmets A/B and bottoms A/B have been received. Use those results alongside the body references for the remaining shield and sword batches to keep A/B consistent. Each remaining prompt is complete and can be copied separately.
- Save outputs using the suggested names, without replacing existing runtime PNGs. Return each batch for visual fitting. No animation sheets or equipment combinations are requested.
- Source parts were scaled independently during rig fitting. Match each garment piece to its corresponding source body part, not to a newly invented common pixel scale. Piece positions and joint anchors matter; armor may extend beyond the old silhouette. A generated file still needs inspection and fitting before reuse.
- Base clothes and uncovered feet will be replaced or masked where the equipped art takes over. Piling equipment on top of the complete gray outfit is not the final rendering plan.

## Prompt 1 — two torso armor kits

Received; retained as a reference. Attach the upper sheet and the approved leather design, if available. Output names: `set-a-armor.png`, `set-b-armor.png`.

```text
Create exactly TWO separate transparent PNGs for One Brave Odyssey:
one modular torso-armor parts sheet for Set A and one for Set B.
Each sheet is one complete Armor item, made of THREE movable pieces.
Do not put both designs into one image.

Use the attached UPPER body-parts sheet as the fitting reference.
Match its rounded fantasy proportions, clean dark outer outlines,
warm painted shading and right-facing three-quarter view.
NEAR is the viewer-facing arm in row two; FAR is the arm in row three.

SET A
Practical brown leather jerkin, cream short sleeves, compact bronze
shoulder reinforcement and simple bronze fastenings. Follow the
approved leather armor reference if supplied. No scarf.

SET B
Compact steel breastplate over navy cloth, short navy sleeves,
small articulated steel shoulder guards, restrained teal details
and thin brass trim. A clear upgrade without oversized shoulders,
spikes, glowing effects or a different body shape.

OUTPUT LAYOUT — EACH PNG
Use a 1254×1254 transparent canvas corresponding to the upper sheet.
1. Top-middle torso location: the vest/breastplate, collar and torso
   clothing only, fitted to the reference torso's position and scale.
2. Middle-left near upper-arm location: near short sleeve and compact
   shoulder guard together as ONE movable piece.
3. Bottom-left far upper-arm location: far short sleeve and compact
   shoulder guard together as ONE movable piece.
Leave all other locations transparent.

Match EACH piece to its corresponding source body part, preserving
its shoulder or torso attachment position and resting orientation.
Do not enlarge small pieces to fill space. Do not independently
recenter the garment pieces. Allow padding for armor thickness.

Reconstruct the hidden cloth/armor beneath overlapping pieces.
Provide rounded concealed overlap where sleeves meet the torso.
Keep outlines on outer silhouettes, not across hidden joint cuts.
Keep the collar compact and the hem close to the waist so helmets
and separately equipped bottoms can move without interference.

Include only these three garment pieces. No skin, neck, head, hands,
forearm guards, gloves, belt, pants, boots, helmet, shield, weapon,
scarf, cape or long hanging skirt. The waist belt belongs to Bottoms.

Return genuine alpha transparency, with no painted checkerboard,
grid, labels, shadows between parts, assembled hero or animation.
```

## Prompt 2 — two helmets

Received; retained as a reference. Attach the upper sheet and both armor results. Output names: `set-a-helmet.png`, `set-b-helmet.png`.

```text
Create exactly TWO separate transparent helmet PNGs for the same
One Brave Odyssey hero: one Set A helmet and one Set B helmet.
One helmet per image; no assembled character or equipment sheet.

Use the BALD head in the supplied UPPER body-parts sheet as the exact
fitting reference. Match its right-facing three-quarter view, skull
proportions, perspective, outlines and warm painted lighting.
The attached A/B armor sheets establish matching materials and colors.

SET A
A fitted brown leather adventurer helmet with a compact bronze brow
plate and small bronze reinforcements. Practical and open-faced.

SET B
A fitted steel open-face helmet with restrained navy/teal accents,
thin brass trim and compact cheek protection. Match Set B armor.
No horns, oversized crest, plume, crown or dangling decorations.

FITTING AND OUTPUT
Each PNG uses the upper reference's 1254×1254 canvas.
Place the helmet over the reference head's ORIGINAL top-left position
and scale, with enough transparent margin for the helmet shell.
Do not move or resize the head-fitting area or center it on the canvas.
Show ONLY helmet pixels. Remove the reference head from the output.
The open face area must be transparent so the existing face can show
through. Do not paint skin, eyes, ears, neck or a replacement face.

The game uses a bald head under upgraded helmets. Show NO hair,
including bangs, side locks, tuft or rear hair. Fit the skull rather
than making an oversized shell shaped around the old hairstyle.
Keep the eyes and main facial expression unobstructed.
Avoid a long neck guard that would interfere with a separate collar.

Keep the same head attachment and viewing angle for both designs,
so either helmet can be combined with either armor set.
Match the rounded painted fantasy art style and clear outer outlines.
Use genuine alpha transparency. No checkerboard, labels, background,
cast shadow, glow, extra angles or animation frames.
```

## Prompt 3 — two bottoms kits: pants, belt and boots

Received; retained as a reference. Attach both body sheets and both armor results. Output names: `set-a-bottoms.png`, `set-b-bottoms.png`.

```text
Create exactly TWO separate transparent PNGs for One Brave Odyssey:
one complete modular Bottoms item for Set A and one for Set B.
Bottoms means the waist belt, pants and boots together as one shop item.
Each item must contain SEVEN separate movable pieces in its PNG.

Use the supplied upper and lower body-part sheets as fitting references.
Match the right-facing three-quarter view, proportions, outlines,
painted lighting and the materials in the attached A/B armor sheets.

SET A
Dark warm-gray trousers, a simple brown leather belt with bronze
buckle, modest stitched reinforcement and practical brown boots.

SET B
Navy trousers, a dark leather belt with brass buckle, compact steel
leg protection and reinforced boots with matching brass details.
Keep the knee and ankle areas flexible, without large projecting plates.

OUTPUT LAYOUT — EACH PNG
Use one 1254×1254 transparent canvas arranged like the lower sheet.
Rows one and two follow the corresponding source parts' locations,
individual scales and neutral orientations:

Row 1: near thigh pants; near lower-leg pants and boot shaft; near boot foot.
Row 2: far thigh pants; far lower-leg pants and boot shaft; far boot foot.
Row 3 left: the separate central waist/belt/hip/crotch piece.
Row 3 middle and right: empty transparency. Include NO hair.

The waist piece uses the UPPER sheet's pelvis as its fitting reference.
Move this piece into the lower-left spare area, around x=45–370,
y=900–1200. Keep its scale relative to that source pelvis.
It owns only central hip/crotch coverage, NOT two complete hanging
pants legs. Each thigh piece owns its own pants-leg section.

Each thigh runs from hip to knee. Each lower-leg piece runs from knee
to ankle and includes the boot shaft/cuff. Each boot-foot piece covers
the foot only, with a short hidden ankle overlap. Do not fuse the boot
shaft and foot into one rigid piece: the ankle must be able to bend.

Provide generous concealed overlap at hips, knees and ankles.
Do not place black outlines across hidden internal joins.
Make cloth patterns and boot construction continue naturally across
overlapping pieces when assembled. Keep A/B attachment locations alike.

Both boot feet must suit the same RIGHT-facing hero. Correct the old
lower sheet's left-pointing far foot; do not reproduce that mistake.
Keep near/far perspective and lighting distinct and plausible.

Only garment and boot pixels: no skin, bare feet, torso armor, head,
hands, weapons, shield or assembled character. Preserve real alpha
transparency. No checkerboard, grid, labels, scenery or animation.
```

## Prompt 4A — Set A shield: outer and inner faces

Attach the received Set A armor and the bald hero preview for style/size context. Output names: `set-a-shield-outer.png`, `set-a-shield-inner.png`.

```text
Create exactly TWO separate transparent PNGs showing opposite faces of
ONE physical Set A shield for the right-facing One Brave Odyssey hero.
Do not create two different shield designs or combine the views.

DESIGN
A compact round wooden shield with a bronze rim and boss, brown leather
details and one simple original engraved emblem. Match the attached
Set A armor: rounded fantasy shapes, clean dark outer outlines and
warm painted shading, readable at small game size.

IMAGE 1 — OUTER / FRONT FACE, FOR THE SHOP
Show the outward-facing wooden face, bronze boss, rim and emblem as a
clear item illustration. Use mild three-quarter perspective, with no
extreme foreshortening. This is the shield's exterior, not the held view.

IMAGE 2 — INNER / BACK FACE, FOR THE HELD FAR-HAND SPRITE
Show the inside of that exact shield in a mild three-quarter angle
suited to the hero's far/off hand. Include its complete leather grip
and forearm straps, the wooden inner face and coherent bronze fittings.
The separate game hand will overlap the grip. Do not copy the exterior
emblem onto the inside unless it is physically part of the construction.

Keep the same outline, dimensions, rim thickness, materials and physical
design across both faces; perspective must describe the same object.
Use matching lighting. Each image uses a 768×768 transparent canvas.
Keep the shield upright with clear padding. Place the inner hand-grip
center at (384,384), and align the outer view to the corresponding
projected attachment center. Show no pivot marker.

Draw shield pixels only. No baked hand, palm, fingers, arm or hero.
Do not reproduce the current incorrect far hand in the shield art.
Deliver two separate PNGs with genuine alpha transparency.
No checkerboard, text, labels, grid, cast shadow, glow or animation.
```

## Prompt 4B — Set B shield: outer and inner faces

Attach the received Set B armor and the bald hero preview for style/size context. Output names: `set-b-shield-outer.png`, `set-b-shield-inner.png`.

```text
Create exactly TWO separate transparent PNGs showing opposite faces of
ONE physical Set B shield for the right-facing One Brave Odyssey hero.
Do not create two different shield designs or combine the views.

DESIGN
A compact rounded kite shield in steel with a navy/teal painted panel,
brass edging and a restrained original emblem. Match the attached
Set B armor: rounded fantasy shapes, clean dark outer outlines and
warm painted shading, readable at small game size.

IMAGE 1 — OUTER / FRONT FACE, FOR THE SHOP
Show the outward-facing steel and painted face, brass rim and emblem as
a clear item illustration. Use mild three-quarter perspective, with no
extreme foreshortening. This is the shield's exterior, not the held view.

IMAGE 2 — INNER / BACK FACE, FOR THE HELD FAR-HAND SPRITE
Show the inside of that exact shield in a mild three-quarter angle
suited to the hero's far/off hand. Include its complete leather hand
grip, padded forearm straps, inner steel surface and matching fixtures.
The separate game hand will overlap the grip. Do not copy the exterior
emblem onto the inside unless it is physically part of the construction.

Keep the same outline, dimensions, rim thickness, materials and physical
design across both faces; perspective must describe the same object.
Use matching lighting. Each image uses a 768×768 transparent canvas.
Keep the shield upright with clear padding and at a practical size
comparable to Set A. Place the inner hand-grip center at (384,384), and
align the outer view to the corresponding projected attachment center.
Show no pivot marker.

Draw shield pixels only. No baked hand, palm, fingers, arm or hero.
Do not reproduce the current incorrect far hand in the shield art.
Deliver two separate PNGs with genuine alpha transparency.
No checkerboard, text, labels, grid, cast shadow, glow or animation.
```

## Prompt 5 — two one-handed swords

Attach both armor results and the existing blade as an optional style reference. Output names: `set-a-sword.png`, `set-b-sword.png`.

```text
Create exactly TWO separate transparent ONE-HANDED sword PNGs for
One Brave Odyssey: one sword matching Set A and one matching Set B.
These are new coordinated designs, not equipment already mapped to
the game's existing item IDs. Do not put both swords in one image.

SET A
A practical straight steel arming sword with a brown leather grip,
modest bronze crossguard and compact bronze pommel. Early adventurer gear.

SET B
A refined one-handed steel sword with a navy grip, brass crossguard,
small teal inset and a slightly stronger blade silhouette. More advanced
but still practical. No giant blade, two-handed grip or magic effects.

Match the hero and armor references: rounded readable fantasy shapes,
clean dark outlines, warm painted materials and consistent lighting.
Use a clear side view of each sword's broad blade face, with minimal
perspective distortion, so the game can rotate the whole item naturally.

Each PNG uses a 1536×512 transparent canvas.
The sword lies exactly HORIZONTAL with its sharp tip pointing RIGHT.
Place the center of the leather hand-grip at (384,256) in BOTH images.
The handle extends left from the crossguard; the blade extends right.
Keep the entire pommel, grip, guard and blade within the canvas with
generous padding. Keep the overall length and grip thickness comparable
between designs so both fit the same hero hand without changing anatomy.
Do not draw any visible pivot or alignment marker.

Show ONLY the sword, including its complete grip beneath where fingers
will eventually overlap it. No hands, fingers, character, scabbard,
shield, slash trail, impact effect, glow, text, labels or ground shadow.
Use genuine alpha transparency, not a checkerboard painted into the art.
Return exactly two separate PNGs, one design per image.
```

## Return and fitting order

Continue visually reviewing the six integrated armor, helmet and bottoms PNGs through poses and mixed combinations. Shields and swords follow later: generate the two Set A shield views as one batch, the two Set B shield views as a second batch, and the two swords as the unchanged final batch. Use each shield’s outer/front face for Shop presentation and its matching inner/back face with grip and straps for the held far-hand sprite. Keep equipment appearance separate from game stats. Jimmy chose separate purchases: helmets and bottoms now have independent saved Shop slots alongside weapons and armor. Shield mechanics and its Shop slot remain later work.

Fit both designs through the existing motions, then mix A/B across slots. The head/neck, near-side alignment and far-hand issues remain explicit follow-ups. A far-palm prompt should use the actual shield/grip orientation once available; no hand is baked into these items. Save the proposed visual editor for its later task.
