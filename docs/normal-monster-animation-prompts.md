# Normal monster animation prompts

Status: copy-ready prompt pack only. These prompts do not generate, integrate, or publish artwork.

This pack covers the six approved reusable normal monsters:

- Slime
- Bat
- Bandit
- Boar
- Mushroom
- Golem

Each monster is created in four steps:

1. one approved master reference;
2. one four-frame idle sheet;
3. one four-frame attack sheet;
4. one four-frame defeat sheet.

Generate and approve the master before sending that monster's other prompts. Keep one image-agent conversation per monster. Attach the exact accepted master to every later request; do not ask the agent to recreate identity from memory.

The six master PNGs are working references. The intended runtime art is 18 sprite sheets: idle, attack, and defeat for each monster. A sheet contains four key poses, not a guarantee of perfectly smooth animation. Review one complete Slime pipeline first, then request only targeted in-betweens if actual playback needs them.

## Attachments and reference priority

For each master prompt, attach:

1. `ChatGPT Image Sep 16, 2026 at 06_41_41 PM.png` as the mood and rendering reference only.

For each animation prompt, attach:

1. that monster's accepted master PNG as the controlling identity, scale, camera, palette, markings, and anatomy reference;
2. the sky-island reference only if the image agent needs a secondary reminder of rendering finish.

The sky-island image does not authorize copying its hero, companion, dummy, buildings, or scenery. The monster designs must remain original.

Do not attach the dark three-panel story reference to these combat-asset requests.

## Shared output contract

- Masters: 1024 × 1024 RGBA PNG, one creature only.
- Animation sheets: 2048 × 2048 RGBA PNG, exactly two columns by two rows of 1024 × 1024 cells.
- Frame order: top-left 01, top-right 02, bottom-left 03, bottom-right 04.
- No visible grid, border, labels, guides, or checkerboard.
- Enemies face screen-left in the same three-quarter view in every frame.
- Grounded monsters use a virtual ground origin near `(512, 900)` inside every cell.
- Bat and Golem keep the prompt-specific hover anchor during active frames; their final defeated frame settles at the virtual floor.
- Preserve one scale across every frame. Never enlarge crouched, compressed, or defeated poses to fill a cell.
- Keep at least 82 pixels of transparent clearance from every edge.
- Use true clean alpha with no white fringe.
- Keep complete ears, wings, horns, cap, tail, feet, and floating pieces visible.
- Use at most four dominant colors plus small light accents.
- Use warm upper-left lighting, soft painted shading, and clean dark-teal outer lines.
- Make the silhouette readable at roughly 120–160 CSS pixels.
- Draw no scenery, floor, cast shadow, UI, name, `Lv. #`, badge, attack trail, hit flash, dust, particles, or sound-effect text. The game supplies movement, shadows, and effects.
- Attacks are in-place poses aimed toward screen-left. The game supplies horizontal lunge and recoil.
- Defeat means exhausted and unable to continue, not dead. No blood, wounds, gore, broken body parts, X-shaped eyes, horror, or disappearance.
- Frame 04 of every defeat sheet must be stable when held indefinitely.

## Suggested playback

| State | Order | Starting timing |
|---|---|---|
| Idle | 01 → 02 → 03 → 04 → 01 | 180–240 ms each; Bat may use 120–160 ms |
| Attack | 01 → 02 → 03 → 04 → idle 01 | 130 ms, 90 ms, 120 ms, 180 ms |
| Defeat | 01 → 02 → 03 → 04 hold | 120 ms, 160 ms, 220 ms, hold |

Timings are implementation starting points only. Do not bake motion blur or timing marks into the art.

---

## Slime

Files:

- `slime-master-reference.png`
- `slime-idle.png`
- `slime-attack.png`
- `slime-defeat.png`

### Slime master

```text
Create ONE original full-body master sprite for the normal monster
SLIME in the mobile fantasy game One Brave Odyssey.

STYLE REFERENCE
Use the attached bright sky-island artwork only for its cheerful chibi
proportions, warm sunlight, painterly 2D shading, clean dark outlines and
friendly adventure tone. Do not copy any attached character or scenery.

IDENTITY
Design a small mint-green cloud-jelly Slime. It has one cohesive opaque
jelly body, a squat rounded teardrop silhouette, two large dark oval eyes,
small coral cheek marks and one soft curl rising from the top. It has no
separate arms, legs, clothing, weapon or accessories. Keep the design
simple enough to read clearly at small mobile-game size. The jelly may
have one pale highlight, but it must not be glass-clear or semi-invisible.

POSE AND CAMERA
Calm ready pose, facing screen-left in a left-facing three-quarter view.
Body centered around x=512 with its lowest edge on the virtual floor at
y=900. It should occupy roughly half the cell height and leave generous
transparent space for squash and stretch. Preserve believable volume.

OUTPUT
One 1024×1024 RGBA PNG with genuine transparent background and at least
82 pixels of clear margin. One creature only. Warm light from upper left.
No floor, cast shadow, scenery, text, level marker, interface, effects,
glow cloud, particles, border, grid, checkerboard or extra poses.
```

### Slime idle sheet

```text
Using the attached approved Slime master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR gentle idle key poses.

Preserve the exact mint color, eyes, coral cheeks, top curl, painted style,
body volume, screen-left three-quarter facing and virtual ground origin.
Do not add limbs or change the face. Target 2048×2048 pixels with four
equal 1024×1024 cells, read top-left, top-right, bottom-left, bottom-right.
No visible cell lines. Use one scale and keep the lowest body edge near
y=900 in each cell.

01 TOP-LEFT — EXACT NEUTRAL
Reproduce the approved calm master pose and proportions.

02 TOP-RIGHT — GENTLE SQUASH
Body settles about 5% lower and wider. The curl bends slightly downward.
Keep the same volume and cheerful open eyes.

03 BOTTOM-LEFT — SOFT RISE
Body stretches about 5% taller and slightly narrower, as if breathing or
bouncing upward without leaving the floor. Curl lifts. Do not lengthen it
into a snake shape.

04 BOTTOM-RIGHT — SETTLE AND BLINK
Return almost to the neutral silhouette with both eyes softly closed for
one brief blink. This frame must transition naturally back to frame 01.

Return genuine transparent PNG alpha. No shadow, floor, splashes, bubbles,
motion blur, duplicate body, effects, text, grid, labels or extra frames.
```

### Slime attack sheet

```text
Using the attached approved Slime master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR in-place attack key poses.

Preserve the exact mint body, two eyes, cheek marks, single top curl,
painted style, volume and left-facing three-quarter camera. Target
2048×2048 with four equal 1024×1024 cells in reading order. Keep one scale
and the virtual ground origin near (512,900). The game supplies all forward
movement, so do not move the whole creature across the cells.

01 TOP-LEFT — ANTICIPATION
Compress slightly toward screen-right, away from the target. Lower the
body and bend the curl back while keeping both eyes focused screen-left.

02 TOP-RIGHT — FORWARD STRETCH
Stretch the front half toward screen-left into a short body-check shape.
Keep the rear attached and the full body inside the cell. Preserve volume.

03 BOTTOM-LEFT — CONTACT / FOLLOW-THROUGH
Front edge is broad and firm toward screen-left while the rear catches up.
Expression is determined, not angry or frightening. No impact effect.

04 BOTTOM-RIGHT — REBOUND
Body springs back slightly past neutral, curl wobbling upward, ready to
return to the exact idle frame 01. Do not create a second attack.

No detached droplets, splash, projectile, weapon, shadow, floor, glow,
speed lines, motion blur, text, grid, labels or additional poses.
```

### Slime defeat sheet

```text
Using the attached approved Slime master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR non-gory defeat poses.

The finishing hit arrives from screen-left, so the Slime reacts toward
screen-right. Preserve its exact mint color, eyes, cheek marks, single curl,
painted style and total body volume. Target 2048×2048 with four equal
1024×1024 cells in reading order. Keep one scale and a fixed floor at y=900.

01 TOP-LEFT — RECOIL
Body leans and ripples toward screen-right. Eyes squeeze shut briefly.

02 TOP-RIGHT — LOSING SHAPE
The Slime wobbles unevenly and sinks lower, still one connected body.
The curl droops. Do not split it into pieces.

03 BOTTOM-LEFT — COLLAPSE
Body settles into a low soft mound on the floor, exhausted rather than
injured. Keep all facial features present and naturally placed.

04 BOTTOM-RIGHT — DEFEATED HOLD
A stable low rounded mound with closed eyes, relaxed cheeks and drooping
curl. It remains clearly the same living Slime and can be held indefinitely.

No puddle separating from the body, liquid spray, blood, wound, X eyes,
disappearance, shadow, floor, effects, text, grid or extra poses.
```

---

## Bat

Files:

- `bat-master-reference.png`
- `bat-idle.png`
- `bat-attack.png`
- `bat-defeat.png`

### Bat master

```text
Create ONE original full-body master sprite for the normal monster BAT
in the mobile fantasy game One Brave Odyssey.

STYLE REFERENCE
Use the attached bright sky-island artwork only for cheerful chibi scale,
warm painterly shading, clean dark outlines and friendly fantasy tone.
Do not copy any attached character, companion or scenery.

IDENTITY
Design a small round sky Bat with a plum-colored furry body, lavender
kite-shaped wings, warm-gold eyes, two short ears and two tiny feet.
It has exactly TWO wings. Each wing has exactly THREE broad membrane
sections with simple teal inner markings. No extra wing fingers, arms,
horns, clothing, weapon or long tail. Keep the silhouette broad and clear.

POSE AND CAMERA
Hovering calm ready pose, facing screen-left in three-quarter view.
Body center fixed near (512,570), wings held midway through a flap.
The complete wingspan stays inside x=120–904 with ample margin.
The virtual floor remains y=900 but no body part touches it in this master.

OUTPUT
One 1024×1024 RGBA PNG with genuine transparency, clean alpha and at least
82 pixels of clear margin. Warm upper-left light. One creature only.
No cloud, floor, shadow, scenery, text, level marker, effects, motion blur,
border, grid, checkerboard or additional poses.
```

### Bat idle sheet

```text
Using the attached approved Bat master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR looping wingbeat poses.

Preserve the exact plum body, lavender wings, gold eyes, ear shape, tiny
feet, teal markings, TWO-wing count and THREE membrane sections per wing.
Never mirror or redesign it. Target 2048×2048 with four 1024×1024 cells
in reading order. Keep the body center near (512,570) in every cell; only
the wing joints and a very small body bob may change.

01 TOP-LEFT — MID FLAP
Match the approved master with wings at a comfortable middle angle.

02 TOP-RIGHT — UPSTROKE
Wings lift above the body with natural folds. Keep full tips visible.

03 BOTTOM-LEFT — DOWNSTROKE
Wings press down and outward. Body rises only a few pixels; do not move
the creature through the cell.

04 BOTTOM-RIGHT — RETURN
Wings return toward the master angle, body centered, with one soft blink.
This must loop naturally into frame 01.

No extra wings, changing membrane count, cloud trail, wind lines, shadow,
floor, glow, blur, text, grid, labels or additional poses.
```

### Bat attack sheet

```text
Using the attached approved Bat master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR in-place attack key poses.

Preserve its exact colors, face, TWO wings, THREE membrane sections per
wing, teal markings, two ears, two feet, scale and screen-left three-quarter
view. Target 2048×2048 with four 1024×1024 cells. Keep the body root near
(512,570); the game supplies the dive toward the hero, so do not translate
the whole Bat across the sheet.

01 TOP-LEFT — AIM
Pull wings slightly upward and back. Head and eyes angle toward screen-left.

02 TOP-RIGHT — DIVE POSTURE
Pitch the body diagonally down-left, wings swept back close to the body.
Keep the body root registered and all wing tips visible.

03 BOTTOM-LEFT — SWIPE / FOLLOW-THROUGH
Head and chest lead toward screen-left while the near wing opens in a
clear broad swipe. The other wing balances behind. No slash effect.

04 BOTTOM-RIGHT — BRAKE AND RECOVER
Body levels out and both wings open to brake, returning toward the exact
idle mid-flap pose. Do not add a second strike.

No projectile, bite close-up, speed lines, motion blur, extra wings or
feet, shadow, floor, text, grid, labels, effects or additional poses.
```

### Bat defeat sheet

```text
Using the attached approved Bat master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR family-friendly defeat
poses. The finishing hit comes from screen-left.

Preserve the exact face, palette, markings, TWO wings, membrane count,
ears and feet. Target 2048×2048 with four 1024×1024 cells in reading order.
Use one scale. Active frames begin from body root (512,570); the final pose
must settle naturally onto the virtual floor at y=900.

01 TOP-LEFT — AIRBORNE RECOIL
Body tips toward screen-right, eyes squeezed shut, wings thrown unevenly.

02 TOP-RIGHT — WINGS FALTER
The Bat loses lift, body lower, one wing partly folded and the other trying
to balance. Keep both wings anatomically attached and fully visible.

03 BOTTOM-LEFT — GENTLE LANDING
The Bat reaches the floor and folds its wings around its round body.
No crash debris or flattened anatomy.

04 BOTTOM-RIGHT — DEFEATED HOLD
Stable curled resting pose on the floor, wings folded, head lowered and
eyes closed. It looks exhausted, not dead, and can be held indefinitely.

No blood, broken wing, X eyes, stars, dust, disappearance, shadow, floor,
glow, motion blur, text, grid, labels or extra poses.
```

---

## Bandit

Files:

- `bandit-master-reference.png`
- `bandit-idle.png`
- `bandit-attack.png`
- `bandit-defeat.png`

### Bandit master

```text
Create ONE original full-body master sprite for the normal monster BANDIT
in the mobile fantasy game One Brave Odyssey.

STYLE REFERENCE
Use the attached bright sky-island artwork only for cheerful chibi
proportions, warm painted shading, clean dark outlines and friendly
adventure tone. Do not copy its hero, companion, dummy or scenery.

IDENTITY
Design a small raccoon-like sky Bandit, clearly a fantasy creature rather
than a human. It has gray-brown fur, a cream muzzle, a natural charcoal
eye mask, two rounded ears, one striped tail with exactly TWO dark bands,
and compact paw-like hands and feet. It wears a short deep-teal hood and
cowl, a simple brown belt and one small tan satchel hanging on its
SCREEN-RIGHT hip. No weapon, armor, cape, shoes or loose stolen objects.
Keep the face mischievous and appealing rather than cruel.

POSE AND CAMERA
Calm ready stance facing screen-left in three-quarter view, knees softly
bent and paws raised loosely. Ground origin near (512,900). Keep the
satchel on the screen-right hip and the tail curving behind toward
screen-right. The standing silhouette should occupy about two-thirds of
the cell height without oversized headwear.

OUTPUT
One 1024×1024 RGBA PNG with true transparent background and at least
82 pixels of clear margin. Warm upper-left lighting. One creature only.
No weapon, scenery, floor, cast shadow, text, level marker, coins, loot,
effects, border, grid, checkerboard or extra poses.
```

### Bandit idle sheet

```text
Using the attached approved Bandit master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR gentle idle key poses.

Preserve the exact raccoon face, natural eye mask, teal hood, belt, satchel
on the SCREEN-RIGHT hip, single tail with TWO bands, colors, proportions
and left-facing three-quarter view. Target 2048×2048 with four equal
1024×1024 cells in reading order. Keep one scale and both feet registered
to the same ground near y=900. Never mirror the satchel or swap limbs.

01 TOP-LEFT — EXACT READY POSE
Reproduce the approved master stance.

02 TOP-RIGHT — WEIGHT SHIFT
Shift weight slightly onto the rear, screen-right foot. Shoulders and hood
bob subtly; paws remain relaxed and visible.

03 BOTTOM-LEFT — CURIOUS LEAN
Lean a little toward screen-left as if watching the hero. Tail lifts a
small amount, but keeps the same shape and stripe count.

04 BOTTOM-RIGHT — SETTLE AND BLINK
Return almost to the master stance with a short blink and tiny ear dip,
ready to loop naturally into frame 01.

No weapon, stolen item, coin toss, bag opening, shadow, floor, effects,
motion blur, text, grid, labels, extra tail or additional poses.
```

### Bandit attack sheet

```text
Using the attached approved Bandit master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR in-place attack key poses.

Preserve the exact face, hood, belt, screen-right satchel, single two-band
tail, paw count, colors, scale and screen-left three-quarter camera.
Target 2048×2048 with four 1024×1024 cells. Keep the feet around the same
ground origin near (512,900). The game supplies forward lunge; do not move
the whole character across the cells and do not add a weapon.

01 TOP-LEFT — CROUCH AND WINDUP
Lower the knees and turn the shoulders slightly toward screen-right.
Raise the nearer paw beside the chest, preparing one quick swipe.

02 TOP-RIGHT — FORWARD PAW SWIPE
Extend that same nearer paw toward screen-left with a small forward torso
lean. Far paw stays close for balance. Keep both feet near their anchors.

03 BOTTOM-LEFT — FOLLOW-THROUGH
The swiping paw passes low across the front of the body. Tail counterbalances
toward screen-right. Expression is focused, not vicious.

04 BOTTOM-RIGHT — RECOVERY
Retract the same paw and return the torso toward the exact idle stance.
Satchel and hood settle naturally. No second attack.

No claws enlarged into weapons, slash trail, projectile, coin, dagger,
shadow, floor, motion blur, text, grid, labels or additional poses.
```

### Bandit defeat sheet

```text
Using the attached approved Bandit master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR non-gory defeat poses.
The finishing hit arrives from screen-left, so the Bandit loses balance
toward screen-right.

Preserve the exact creature face, teal hood, belt, screen-right satchel,
single tail with TWO bands, anatomy, palette and scale. Target 2048×2048
with four 1024×1024 cells in reading order. Keep the same ground at y=900.
Do not mirror accessories or add damage to the clothing.

01 TOP-LEFT — RECOIL
Torso leans toward screen-right, paws lift defensively, eyes squeeze shut.
Both feet still touch the floor.

02 TOP-RIGHT — STUMBLE
Knees bend and shoulders drop as balance fails. Tail lowers; satchel stays
attached to the same hip.

03 BOTTOM-LEFT — SIT DOWN
The Bandit settles into a compact seated slump, one paw near the floor and
the other near its lap. Keep the face visible and anatomy connected.

04 BOTTOM-RIGHT — DEFEATED HOLD
Stable seated exhausted pose, head bowed, eyes closed, paws relaxed and
tail curled beside the body. It can be held indefinitely.

No blood, wounds, X eyes, dropped loot, detached satchel, crying symbols,
stars, disappearance, shadow, floor, effects, text, grid or extra poses.
```

---

## Boar

Files:

- `boar-master-reference.png`
- `boar-idle.png`
- `boar-attack.png`
- `boar-defeat.png`

### Boar master

```text
Create ONE original full-body master sprite for the normal monster BOAR
in the mobile fantasy game One Brave Odyssey.

STYLE REFERENCE
Use the attached bright sky-island artwork only for cheerful chibi scale,
warm painterly shading, clean dark outlines and friendly fantasy tone.
Do not copy any attached character, target dummy or scenery.

IDENTITY
Design a stout small fantasy Boar with a rounded russet-brown body, darker
snout, exactly TWO short cream tusks, four compact dark hooves, two small
ears, one short curled tail and a leafy green tuft running over the top of
its head and shoulders. Large dark eyes and coral inner ears keep it cute
but determined. No saddle, armor, harness, horn, weapon or rider.

POSE AND CAMERA
Calm ready stance facing screen-left in three-quarter view, all four hooves
grounded. Center body mass near x=512 and use floor y=900. Keep the long
body fully inside the cell with room in front of both tusks and behind the
tail. The silhouette should be low, solid and easy to read.

OUTPUT
One 1024×1024 RGBA PNG with genuine transparency, clean alpha and at least
82 pixels of margin. Warm upper-left light. One creature only.
No floor, shadow, grass, dirt, scenery, text, level marker, effects, border,
grid, checkerboard or extra poses.
```

### Boar idle sheet

```text
Using the attached approved Boar master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR gentle idle key poses.

Preserve the exact russet body, darker snout, TWO cream tusks, four hooves,
two ears, one curled tail, leafy tuft, colors, scale and left-facing
three-quarter view. Target 2048×2048 with four 1024×1024 cells. Keep the
same ground at y=900 and never mirror the creature or change tusk count.

01 TOP-LEFT — EXACT NEUTRAL
Reproduce the approved calm master stance.

02 TOP-RIGHT — INHALE
Chest and shoulders rise subtly while the snout lifts a few pixels.
All hooves remain planted.

03 BOTTOM-LEFT — EAR AND HOOF SHIFT
One ear flicks and the front screen-left hoof lifts only slightly, with no
step across the cell. Tail and tuft respond gently.

04 BOTTOM-RIGHT — SETTLE
Hoof returns to its exact contact, body lowers to neutral and eyes blink.
This frame must loop smoothly into frame 01.

No dust, grass, breath cloud, extra tusk, missing hoof, shadow, floor,
motion blur, text, grid, labels or additional poses.
```

### Boar attack sheet

```text
Using the attached approved Boar master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR in-place charge poses.

Preserve the exact face, TWO tusks, four hooves, leafy tuft, curled tail,
colors, scale and screen-left three-quarter camera. Target 2048×2048 with
four equal cells in reading order. Keep the floor at y=900. The game moves
the Boar toward screen-left, so show pose change only and do not translate
the whole creature through the sheet.

01 TOP-LEFT — BRACE
Front legs bend, rear legs load and the head begins lowering toward the
screen-left target. Keep both tusks visible.

02 TOP-RIGHT — CHARGE POSTURE
Head and shoulders drive low toward screen-left, rear legs extending.
Keep all anatomy inside the cell and close to the original root.

03 BOTTOM-LEFT — TUSK FOLLOW-THROUGH
Snout and tusks are farthest forward, body compressed behind the shoulders.
This is one body charge, not a separate bite. No impact effect.

04 BOTTOM-RIGHT — RECOVERY
Head lifts and legs gather beneath the body, returning toward the exact
idle pose. Tail and leafy tuft settle naturally.

No dirt spray, speed lines, motion blur, enlarged tusks, extra legs,
shadow, floor, text, grid, labels or additional poses.
```

### Boar defeat sheet

```text
Using the attached approved Boar master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR family-friendly defeat
poses. The finishing hit arrives from screen-left.

Preserve the exact TWO tusks, four hooves, ears, tail, leafy tuft, palette,
scale and facing. Target 2048×2048 with four 1024×1024 cells in reading
order. Keep the same floor at y=900. Do not flip the Boar onto its unseen
side or alter the markings.

01 TOP-LEFT — RECOIL
Head and shoulders pull toward screen-right, eyes squeeze shut, front legs
soften while all hooves remain near the floor.

02 TOP-RIGHT — FRONT LEGS BUCKLE
The Boar lowers onto bent front knees while the rear remains raised.
Keep tusks clear of the floor and anatomy natural.

03 BOTTOM-LEFT — SETTLE
Body lowers onto its belly with legs folded safely beneath or beside it.
Head remains visible and begins resting near the ground.

04 BOTTOM-RIGHT — DEFEATED HOLD
Stable resting pose on the belly, head lowered, eyes closed, ears relaxed
and tail still. It looks exhausted and can be held indefinitely.

No blood, wounds, broken tusk, X eyes, tongue hanging out, dust burst,
disappearance, shadow, floor, effects, text, grid or extra poses.
```

---

## Mushroom

Files:

- `mushroom-master-reference.png`
- `mushroom-idle.png`
- `mushroom-attack.png`
- `mushroom-defeat.png`

### Mushroom master

```text
Create ONE original full-body master sprite for the normal monster
MUSHROOM in the mobile fantasy game One Brave Odyssey.

STYLE REFERENCE
Use the attached bright sky-island artwork only for cheerful chibi
proportions, warm painted shading, clean dark outlines and friendly
fantasy tone. Do not copy any attached creature, dummy or scenery.

IDENTITY
Design a small hopping Mushroom creature with a cream stem-shaped body,
a broad coral-orange parasol cap and exactly FIVE large cream spots in a
fixed pattern: one central, two toward the front rim and two toward the
rear rim. Give it two dark oval eyes, two short rounded arms and exactly
two simple brown feet. The cap is part of its body, not a removable hat.
No mouth is required. No clothing, weapon, basket, grass or extra fungi.

POSE AND CAMERA
Calm upright ready pose facing screen-left in three-quarter view. Both feet
use the virtual floor at y=900 with body center around x=512. Keep the full
cap inside the cell with ample side clearance. The silhouette should be
simple, top-heavy and clearly different from Slime.

OUTPUT
One 1024×1024 RGBA PNG with true transparent background, clean alpha and
at least 82 pixels of margin. Warm upper-left light. One creature only.
No floor, shadow, scenery, text, level marker, spores, glow, border, grid,
checkerboard or extra poses.
```

### Mushroom idle sheet

```text
Using the attached approved Mushroom master as the exact identity
reference, create ONE transparent 2×2 sprite sheet with FOUR idle poses.

Preserve the exact cream body, coral cap, fixed FIVE-spot pattern, two
eyes, two arms, two feet, palette, scale and left-facing three-quarter
view. Target 2048×2048 with four equal 1024×1024 cells in reading order.
Keep both feet registered to floor y=900. Never rotate the cap pattern,
add spots, remove limbs or mirror the creature.

01 TOP-LEFT — EXACT NEUTRAL
Reproduce the approved master pose.

02 TOP-RIGHT — CAP BOB
Body compresses slightly and the cap settles a few pixels lower. Feet stay
planted; arms move only a little.

03 BOTTOM-LEFT — LIGHT RISE
Stem straightens and cap lifts slightly with a small cheerful sway toward
screen-left. Keep both feet near their anchors rather than jumping.

04 BOTTOM-RIGHT — SETTLE AND BLINK
Return almost to neutral with the cap level and both eyes softly closed.
This must loop cleanly into frame 01.

No spores, dust, cap duplication, changing spot count, shadow, floor,
motion blur, text, grid, labels or additional poses.
```

### Mushroom attack sheet

```text
Using the attached approved Mushroom master as the exact identity
reference, create ONE transparent 2×2 sprite sheet with FOUR in-place
attack key poses.

Preserve the exact cap, fixed FIVE spots, cream body, two arms, two feet,
colors, scale and screen-left three-quarter view. Target 2048×2048 with
four 1024×1024 cells. Keep the virtual ground at y=900. The game supplies
the hop toward the hero; keep the body root registered inside each cell.

01 TOP-LEFT — COMPRESS
Stem and knees compress, cap lowering while both arms tuck close.

02 TOP-RIGHT — SPRING
Body extends into a small in-place hop posture, leaning toward screen-left.
Feet lift naturally but the root stays registered for game-driven travel.

03 BOTTOM-LEFT — CAP BASH
Tilt the broad cap forward-left as the body follows behind it. This is a
soft full-body bump, not a head detachment. Keep face and all spots visible.

04 BOTTOM-RIGHT — LAND AND RECOVER
Both feet return to the original floor contacts, knees softly bent and cap
settling toward the exact idle pose.

No spore projectile, poison cloud, detached cap, speed lines, blur, dust,
shadow, floor, text, grid, labels or additional poses.
```

### Mushroom defeat sheet

```text
Using the attached approved Mushroom master as the exact identity
reference, create ONE transparent 2×2 sprite sheet with FOUR non-gory
defeat poses. The finishing hit arrives from screen-left.

Preserve the exact cap shape and FIVE-spot pattern, cream body, two arms,
two feet, face, palette and scale. Target 2048×2048 with four equal cells
in reading order. Keep the same virtual floor at y=900. The cap remains
attached to the body in every frame.

01 TOP-LEFT — RECOIL
Cap and upper body tip toward screen-right, eyes squeezed shut, feet still
near their ground contacts.

02 TOP-RIGHT — LOSE BALANCE
One foot slides slightly right, stem bends and cap droops lower over the
face. Arms lower in exhaustion.

03 BOTTOM-LEFT — SINK DOWN
The Mushroom settles into a short seated crouch with cap tilted but intact.
Keep eyes and feet visible enough to read the same creature.

04 BOTTOM-RIGHT — DEFEATED HOLD
Stable low resting pose, cap gently drooped, eyes closed, arms relaxed and
feet tucked beside the body. It can be held indefinitely.

No broken cap, missing spots, detached pieces, blood, X eyes, spores,
disappearance, shadow, floor, effects, text, grid or extra poses.
```

---

## Golem

Files:

- `golem-master-reference.png`
- `golem-idle.png`
- `golem-attack.png`
- `golem-defeat.png`

### Golem master

```text
Create ONE original full-body master sprite for the normal monster GOLEM
in the mobile fantasy game One Brave Odyssey.

STYLE REFERENCE
Use the attached bright sky-island artwork only for cheerful chibi scale,
warm painterly shading, clean dark outlines and friendly fantasy tone.
Do not copy any attached dummy, building, creature or scenery.

IDENTITY
Design a squat floating-stone Golem made from exactly FIVE major pieces:
ONE large rounded central body stone with a simple brow and two small gold
eyes, TWO detached fist stones, and TWO detached foot stones. A small teal
diamond core is embedded in the center of the body stone. Use warm slate,
pale stone edges and restrained moss on only the upper-right shoulder area.
This normal Golem has NO carved runes and NO ring behind it, so the future
Rune Golem elite remains clearly more special. No mouth, weapon or armor.

POSE AND CAMERA
Calm hover facing screen-left in three-quarter view. Central body anchor
near (512,560); fists hover at its sides and feet below it, with the lowest
foot stone near y=820. Virtual floor is y=900. Keep all five pieces clearly
separated by small gaps but visually connected as one creature.

OUTPUT
One 1024×1024 RGBA PNG with true transparency, clean alpha and at least
82 pixels of clear margin. Warm upper-left light. One creature only.
No magic aura, ground shadow, floor, scenery, text, level marker, cracks,
debris, extra stones, border, grid, checkerboard or additional poses.
```

### Golem idle sheet

```text
Using the attached approved Golem master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR gentle hover poses.

Preserve exactly FIVE stones: one central body, two fists and two feet.
Preserve the small gold eyes, teal diamond core, upper-right moss patch,
colors, scale and screen-left three-quarter view. Target 2048×2048 with
four 1024×1024 cells. Keep central body anchor near (512,560); pieces may
float only a few pixels around their established sides. Never add runes,
a magic ring, extra rocks or swap the moss to the other side.

01 TOP-LEFT — EXACT NEUTRAL
Reproduce the approved master hover.

02 TOP-RIGHT — RISE
Central body and fists lift a few pixels while feet lag slightly below.

03 BOTTOM-LEFT — SETTLE
Body lowers a few pixels as fists drift outward a small amount. Core stays
the same shape and only becomes slightly brighter in color, without glow.

04 BOTTOM-RIGHT — RETURN
All five stones return almost to the exact master registration; gold eyes
blink to narrow slits. This must loop naturally into frame 01.

No aura, particles, new cracks, changing piece count, shadow, floor,
motion blur, text, grid, labels or additional poses.
```

### Golem attack sheet

```text
Using the attached approved Golem master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR in-place punch poses.

Preserve exactly FIVE stones, the same gold eyes, teal diamond core,
upper-right moss patch, palette, scale and screen-left three-quarter view.
Target 2048×2048 with four 1024×1024 cells. Keep the central body root near
(512,560). The SAME fist already nearest screen-left performs the attack;
the other fist and both feet keep their identities. The game supplies
forward travel, so do not move the whole Golem through the cells.

01 TOP-LEFT — DRAW BACK
The attacking screen-left fist pulls toward the body's screen-right side.
Central body rotates only slightly; other fist guards near the torso.

02 TOP-RIGHT — PUNCH
That same fist extends strongly toward screen-left. Keep it inside the cell
and keep all other stones registered around the body.

03 BOTTOM-LEFT — FOLLOW-THROUGH
Attacking fist remains forward while the central body leans a little left;
feet counterbalance below. No impact effect or new debris.

04 BOTTOM-RIGHT — REASSEMBLE
The attacking fist returns to its original side and all five stones settle
toward the exact idle master arrangement.

No second punch, thrown rock, rune, magic blast, aura, extra stone, crack,
shadow, floor, motion blur, text, grid, labels or additional poses.
```

### Golem defeat sheet

```text
Using the attached approved Golem master as the exact identity reference,
create ONE transparent 2×2 sprite sheet with FOUR non-gory defeat poses.
The finishing hit arrives from screen-left.

Preserve exactly FIVE major stones, the gold eyes, teal diamond core,
upper-right moss patch, colors and scale. Target 2048×2048 with four equal
1024×1024 cells in reading order. Active frames begin around body anchor
(512,560); the final compact arrangement settles onto virtual floor y=900.
Do not create chips, fragments, new cracks or missing pieces.

01 TOP-LEFT — RECOIL
Central body tips toward screen-right, attacking-side fist pushed back and
gold eyes squeezed narrow. All five stones remain airborne and visible.

02 TOP-RIGHT — HOVER FAILS
Body and fists lower; foot stones reach toward the floor as the formation
loosens slightly. Keep every piece on its original side.

03 BOTTOM-LEFT — SETTLE INTO PILE
The five intact stones lower into a compact, readable resting arrangement
on the floor. Central body remains upright enough to show the face and core.

04 BOTTOM-RIGHT — DEFEATED HOLD
Stable small stone pile using the same five pieces, gold eyes closed and
teal core dimmer in color but still visible. It can be held indefinitely.

No shattering, debris, dust cloud, extra stones, missing fist, blood,
explosion, disappearance, aura, shadow, floor, text, grid or extra poses.
```

---

## Focused review order

1. Generate and approve `slime-master-reference.png`.
2. Generate Slime idle, attack, and defeat sheets.
3. Review the four sheets together at source size, then check only Slime at representative combat size.
4. Correct identity, cell order, alpha, scale, anchor, or pose problems before starting Bat.
5. Repeat master-first for the remaining five monsters.
6. After all six are approved, use one focused combat preview containing Slime, Bandit, Bat, and Golem rather than exhaustively replaying every frame of every monster.

Reject and repair a returned asset if it has:

- the wrong facing direction;
- inconsistent scale or automatic recentering between cells;
- cropped anatomy or less than the requested padding;
- changing eye, marking, accessory, appendage, or stone counts;
- a visible background, checkerboard, shadow, text, level number, grid, or white alpha fringe;
- an attack that translates across the sheet instead of staying registered;
- a defeat frame that looks injured, dead, or unstable when held;
- extra effects that belong in runtime code.

## Targeted correction prompt

Attach the accepted master first and the defective sheet second. Replace the bracketed text with one precise issue.

```text
Correct only [ISSUE] in the attached animation sheet.

The attached approved master remains the controlling identity, palette,
anatomy, facing, scale and rendering reference. Preserve the existing 2×2
cell layout, frame order, transparent 2048×2048 canvas, registered roots
and every detail that is already correct. Do not redesign, mirror, zoom,
recenter or generate a different action. Return one corrected transparent
PNG with no new elements, text, grid, shadow, effects or extra frames.
```

## Later integration notes

- Keep the source PNGs unchanged and calibrate actual accepted cell rectangles, roots, scale, and state timing through appearance descriptors in `art.js`.
- Normal monster names, encounter roles, and battle-derived level labels remain gameplay descriptors in `core.js`.
- Runtime shadows, hit flashes, attack travel, and fade timing remain code-driven.
- Attack damage, cadence, rewards, battle order, and save data do not change with the artwork.
- Stop combat input and settle rewards exactly once before a victory presentation. Animation completion must never become the only save trigger.
- A defeated normal may hold frame 04 briefly, then use the existing fade. Boss cleansing remains a separate future presentation.
- Reduced motion may use idle frame 01, attack frame 03, and defeat frame 04 without looping.
- When approved art is integrated, add the runtime sheets to `dist/sw.js`, bump the dotted game release revision and cache name together, and record the release in project documentation.
- Do not publish until Jimmy explicitly asks.

No artwork, runtime source, test, server, save, cache, or published Site is changed by this prompt pack.
