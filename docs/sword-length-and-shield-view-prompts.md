# Longer swords and straight-on shields

Jimmy's supplied `sword_a.png` is integrated as the first weapon upgrade (`weapon_t2`, Cloudsteel saber). All equipped swords use 1.4× their original attachment scale. This is separate from extending the blade in the artwork. Keep the supplied sword unchanged until the longer result is approved. Shield generation remains an art handoff; the received angled shield is not integrated.

## Longer Sword A

Attach only `/Users/jimmybui/Downloads/sword_a.png`. Reuse this prompt separately with each other sword's own reference to retain its design. The suggested extension is 30% of blade length, not 30% enlargement of the whole object.

```text
EDIT this exact sword into a longer version of the same design.

Increase ONLY the blade's guard-to-tip length to 130% of its current
length. Add length through the straight middle section; retain the
original point design, blade width, bevels and thickness. Extend the
central fuller naturally. Keep the brown leather grip, bronze guard
and bronze pommel unchanged in size, shape and position. Do not enlarge
or stretch the whole sword, and do not make a two-handed grip.

Keep the same broad blade face shown straight-on, perfectly horizontal,
with the tip pointing right. No perspective tilt or foreshortening.
Match the existing painted shading, metal colors, leather texture,
outlines and lighting.

Extend the transparent canvas toward the RIGHT to fit the longer blade;
do not shrink the sword to fit the old canvas. The source is 2172×724;
approximately 2600×724 gives suitable room. Preserve the hilt's original
pixel size and location, with the grip center near (447,358), where the
game's hand attaches. Keep the whole sword visible with clear padding.

Output one genuine transparent PNG. No hand, character, scabbard,
background, cast shadow, glow, effects, labels or checkerboard.
```

Save as `sword-a-long.png`, keeping the existing file. After generation, check actual dimensions and hilt registration before importing it; prompts cannot guarantee exact coordinates. If the source coordinates shift, refit the grip instead of resizing away the intended extra blade length.

## Set A shield — outside and inside, viewed straight-on

Attach in order:

1. `/Users/jimmybui/Downloads/ChatGPT Image Sep 16, 2026 at 01_51_32 PM.png` — shield design/materials only; its camera angle is rejected.
2. `/Users/jimmybui/Downloads/sword_a.png` — flat, unforeshortened presentation and shared painted style only; do not copy its horizontal orientation onto the shield.

```text
Correct the CAMERA VIEW of the shield in reference 1. Preserve its round
wooden shield design, bronze rim and boss, emblem, leather grip/strap,
painted shading, palette and outlines.

Create two STRAIGHT-ON ORTHOGRAPHIC views of the SAME shield: OUTSIDE/FRONT
on the left for the Shop, INSIDE/BACK on the right for the hero's far hand.
The camera must be perpendicular to each shield face. Use reference 2's
flat broad-face presentation: zero perspective foreshortening, zero
sideways turn, zero camera tilt. This is not a three-quarter view or an
edge-on side view. Keep the shield upright.

This shield is physically ROUND. Both views must have a CIRCULAR outer
silhouette, equal width and height, matching diameter, center and rim
thickness. Do not reproduce the narrow oval or unequal side-edge exposure
from reference 1. Surface shading may show the domed boss and raised
fittings, but must not angle or distort the shield's face.

Left: exterior wooden face, bronze boss, rim and original emblem.
Right: matching interior wooden face, complete horizontal leather hand
grip and lower forearm strap with coherent fittings. Put the grip center
at the center of the right cell. No exterior emblem on the inside.
The separate game hand will overlap the grip; draw no hand or arm.

Output one genuine transparent 2048×1024 PNG: two equal 1024×1024 cells,
one centered shield in each, identical size and generous padding.
No hero, scenery, floor shadow, glow, labels, grid or checkerboard.
```

Save as `shield-a-front-back.png`. This replaces the older shield prompts' mild three-quarter perspective. For a future Set B kite shield, preserve its intended kite shape while applying the same straight-on camera rule; do not turn that design into a circle.
