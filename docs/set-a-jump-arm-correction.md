# Set A jump sheet — arm correction

Historical repair brief, superseded by the accepted 08:17 key poses and frames 1/6 of the 07:56 sheet. Those four cells now drive Set A's local jump and landing. Use the current [reference notes](set-a-reference-pose-prompts.md) for the wrist/palm and elbow correction; do not regenerate this older six-frame repair.

Latest instruction: lower the far/shield arm beside the body like frame 2. This supersedes the earlier instruction to retain frame 4's forward far-arm position. Frame numbering reads across the top row (1–3), then the bottom row (4–6).

The weapon arm is the arm attached to the larger viewer-left pauldron and raised in frames 2/3. The user called it the rear arm; prompts use “Arm A — near/weapon arm” to avoid confusing it with the far/shield arm. In the received sheet, frames 4/5 pull this arm backward and use the other arm to reach forward. That is the motion to repair.

The source is `ChatGPT Image Sep 16, 2026 at 07_38_41 AM.png`, 1536×1024 RGBA, arranged as three columns and two rows. Read-only alpha inspection confirms real transparency; the brown RGB seen in the attachment preview is not evidence of an opaque painted background. Preserve source transparency rather than asking for broad background removal. The sheet has not been integrated into the game.

Attach the received jump sheet, original `setA.png`, and the new schematic `set-a-jump-arm-guide.png` from the thread's visualization directory. The guide is an original arm-only diagram; it does not edit the supplied artwork. Its orange/blue coding controls arm identity, not the final colors or body proportions.

## Correction prompt

```text
EDIT the attached six-pose Set A jump sheet. Do not create a new character
or redesign the poses. Use the original setA.png for identity and the
colored schematic ONLY for arm identity, movement and palm direction.
Do not copy its gray body, colors, labels, arrows or simplified anatomy.

Keep the existing 1536×1024 canvas, 3-column × 2-row layout, cell placement,
character scale, transparency, face, hair, outfit, lighting, torso and legs.
Number frames left to right: top row 1/2/3, bottom row 4/5/6.
Leave frames 1 and 6 unchanged. Correct the arms in frames 2–5, including
only the sleeve/shoulder folds needed to make those arm changes natural.

LOCK ARM IDENTITIES
ARM A, orange in the guide: the NEAR WEAPON ARM attached to the larger
viewer-left pauldron. It is the arm already raised beside the head in
frames 2 and 3. That SAME shoulder–upper arm–forearm–hand chain must
perform the strike in frames 4 and 5.
ARM B, blue in the guide: the FAR SHIELD ARM on the opposite side.
Keep B lowered beside the body in frames 2–5, matching the relaxed bend,
hand orientation and shoulder-relative position of B in the CURRENT
FRAME 2. It follows the torso naturally; do not freeze it in absolute
sheet coordinates. Do not extend B forward or use it to strike.

FRAMES 2 AND 3 — ARM A PREPARATION
Give A a more pronounced, natural shoulder/forearm rotation and elbow
bend. Keep its closed gripping fist beside the near ear, slightly toward
the back of the head in screen position. Turn the forearm and wrist so
the PALM SIDE faces inward toward the hero's own head/torso. The back
of the fist/knuckles should read toward the viewer. Keep natural thumb
placement and wrist anatomy; do not merely mirror the hand.
Orient the grip for an imaginary blade pointing behind him, screen-left.
Keep the nearer arm and fist IN FRONT of the hair/head where they overlap.

FRAME 4 — ARM A DOWNSWING
Swing that same A arm forward/down from its raised preparation, bringing
the near fist in front of the body toward screen-right. It must no longer
be pulled backward toward screen-left as in the current frame 4.
Use a believable bent elbow and continuous shoulder connection.
The imaginary blade would point forward/down. Keep B lowered like frame 2.
Preserve the existing airborne legs, torso position and expression.

FRAME 5 — ARM A LANDING STRIKE
Continue A's swing into a forward extension toward screen-right at waist
height, with a slight natural elbow bend. Its grip supports an imaginary
blade pointing horizontally right. Keep A in the foreground.
B remains lowered beside the body like frame 2, not extended to attack.
Preserve the existing landing crouch, boot contacts and torso position.

Keep consistent bare gripping hands. No sword, handle, shield, extra arms,
new elements, guide marks or text. Preserve real alpha transparency.
Return ONE corrected full-body six-frame sprite sheet, with frames 1 and
6 unchanged and only the requested arm corrections in frames 2–5.
```

No image generation, runtime changes, editor work, tests, Git commands or publication were performed for this correction handoff. The schematic is for Jimmy's external image-agent request.
