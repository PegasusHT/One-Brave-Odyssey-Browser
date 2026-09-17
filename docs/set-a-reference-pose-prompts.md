# Set A — two poses from Jimmy's screenshots

Accepted result, 16 September 2026: Jimmy approved both poses in `ChatGPT Image Sep 16, 2026 at 08_17_54 AM.png` and selected frames 1 and 6 of `ChatGPT Image Sep 16, 2026 at 07_56_23 AM.png` for crouch and landing. Those four drawings are now integrated into the local Set A jump preview and Critical training. The other four cells of the older sheet remain unused. Preserve the accepted drawings; no new generation is needed for this integration.

Jimmy corrected the preparation wording: fold the wrist/palm back while keeping the elbow toward screen-right. Do not use “fold the forearm back” as the pose instruction. The prompt below records that correction for any future selective repair.

Use only three attachments, in this order:

1. `/Users/jimmybui/Downloads/setA.png`: character identity, original hairstyle, full Set A outfit, proportions, materials and art style.
2. `/Users/jimmybui/Desktop/second click, hit.png`: airborne backswing/preparation pose only. Its visible blade points diagonally down-left, rather than horizontally left.
3. `/Users/jimmybui/Desktop/Screenshot 2026-09-16 at 7.54.43 AM.png`: strongly forward-leaning, low weapon-hand strike/follow-through pose only. Ground contact is not clearly visible; do not infer a planted squat from this reference.

Do not attach the rejected jump sheets or the previous schematic in this fresh request: their incorrect poses may compete with the new pose references. The screenshots' other character, costume, weapons, dummy, environment and effects are not appearance references. No need to edit or crop the originals for this prompt; identify the attacking character explicitly.

Confirmed latest far-arm preference: keep the far/shield arm lowered beside the body in both poses, rather than copying the screenshots' shield-arm extension. The screenshots control weapon-arm/body/leg mechanics, with this explicit exception.

## Single prompt for both key poses

```text
Create ONE sprite sheet with TWO full-body key poses of MY Set A hero,
using these three attachments in their stated roles.

REFERENCE 1 — setA.png
This is the ONLY reference for character identity and appearance.
Preserve this exact hero: original chestnut-brown hairstyle and upward
curl, face, skin tone, chibi proportions, brown leather armor, cream
sleeves, buckles, dark gray trousers with brown knee patches and cuffed
brown boots. Keep bare hands. No helmet, scarf or gloves.
Match its painted 2D shading, outlines, palette and lighting.
Draw the complete connected body and complete hair/face/head together.

REFERENCE 2 — second click, hit.png
Use ONLY the attacking character's airborne preparation pose: body lean,
shoulder/elbow/wrist relationship, weapon-hand position and bent legs.
The visible sword supplies the intended GRIP DIRECTION, not sword art.

REFERENCE 3 — Screenshot 2026-09-16 at 7.54.43 AM.png
Use ONLY the attacking character's strong forward lean, lowered striking
hand and bent/trailing legs. Ignore the dummy and effects.
Do not copy the other character's green hair, dark face, costume,
proportions, detached-limb construction or rendering style.

IMPORTANT EXCEPTION
My FAR/SHIELD ARM stays lowered beside the body in BOTH poses, carried
naturally with the torso. Do not copy the screenshots' raised/extended
shield arm. Keep its elbow relaxed and hand close to the hip.
The NEAR WEAPON ARM performs the entire attack. It is the arm attached
to the larger viewer-left shoulder plate in my standing master.
Never swap arms. Draw the near arm and fist IN FRONT of the head/hair
wherever they overlap, even when the fist is toward the back of the head
in screen position.

LEFT CELL — AIRBORNE BACKSWING / PREPARATION
Transfer the attacking pose from reference 2 to my hero.
Face screen-right. Torso mostly upright with a modest forward lean.
Lift the near weapon arm and keep its elbow pointing toward screen-right,
forward of the raised gripping hand. Fold the WRIST/PALM back toward the
head so the closed fist sits above and behind the near ear, on the
screen-left side of the elbow. Keep the elbow forward; do not pull it
back behind the torso. Use natural wrist anatomy rather than an extreme
joint bend. Do not substitute a simple fist held in front of the forehead.
Rotate the gripping hand inward toward the head, with natural thumb and
wrist anatomy. An attached sword would point DIAGONALLY DOWN-LEFT,
behind the hero, as in reference 2—not horizontally left or vertically up.
Both knees bend, feet below/behind the hips, one leg tucked higher.
Both feet are airborne. Far arm remains lowered beside the body.

RIGHT CELL — LOW DOWNWARD STRIKE / FOLLOW-THROUGH
Transfer the attacking pose from reference 3 to my hero.
Pitch the head and shoulders substantially forward toward screen-right.
Swing that SAME near weapon arm down and forward. Its closed gripping
fist finishes well BELOW the head, around hip/thigh height and close to
the lower edge of the body, as in the screenshot. Keep a natural elbow.
An attached sword would extend almost horizontally toward screen-right,
with only a slight downward angle, about 5–10 degrees.
Do not replace this with an upright shoulder-height punch.
Keep the legs bent/trailing behind the leaning body, following the
reference. Complete any cropped anatomy naturally and show both boots.
Do not substitute a symmetric planted squat for this dynamic pose.
The far arm stays lowered with its hand near the hip; it does not strike.

OUTPUT
One transparent PNG with TWO equal square cells arranged side by side.
Target 2048×1024 pixels, each cell 1024×1024. No visible dividing line.
Use one consistent character scale, head size and right-facing
three-quarter view based on my master. Do not enlarge the bent pose to
match the upright pose's visible height. Keep all hair, hands and boots
inside their cells. Keep the airborne pelvis registration consistent;
the game will supply actual jump height and travel.

Draw NO sword, handle or shield. Use the reference weapons only to orient
the closed gripping hands correctly; equipment will be attached separately.
No background, dummy, scenery, ground shadow, light burst, motion blur,
effects, labels, grids, guide marks, checkerboard or additional poses.
Return exactly these TWO finished Set A body sprites in one sheet.
```

Runtime copies are `assets/hero-actions/set-a-jump-keyposes.png` and `assets/hero-actions/set-a-jump-ground.png`. The low follow-through remains airborne; frame 6 provides the grounded landing. The renderer calibrates scale and grip separately for each source sheet and supplies jump travel in code. Review playback before requesting any selective intermediate drawing.

The original handoff generated no art. The subsequent authorized integration copies the source PNGs unchanged and renders only the four accepted cells. Editor work, tests, Git and publication remain outside this task.
