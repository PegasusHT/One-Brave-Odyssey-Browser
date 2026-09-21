# Arena layouts

## Arena selection

The supplied 1448 × 1086 PNG is copied unchanged to `dist/assets/arena/arena-hall.png` (1,178,154 bytes). `ARENA_ART` in `art.js` owns its source dimensions and focal alignment. `drawWorld()` uses centered horizontal cover and 25% vertical alignment for the `arena` menu only, preserving the original image ratio and showing the gates and floor. Active combat uses the Default Gameplay Layout below over its existing scenery. Training retains its approved layouts and scenery.

Arena uses Town's corner hierarchy: an icon-only Back to Town target at top left, the existing Settings button at top right, the same wallet at bottom right, and the shared `levelProgress()` markup at bottom left. No second gold or experience state is introduced. The hero and opponent canvases retain proportional rendering; no visible character names or reward preview is rendered. Fight uses the same compact dark button treatment as Town. Legacy-unlocked Endless remains available through its existing icon action.

The central stage panel has ten numbered battle buttons in two rows for each active stage, with previous/next stage arrows. `CAMPAIGN_STAGES`, `BATTLES_PER_STAGE` and `TOTAL_BATTLES` in `core.js` define 20 available encounters across Stages 1 and 2. Stage 3 retains its descriptor with `comingSoon:true` and displays Coming soon without playable battle choices. Changing an active page chooses its highest unlocked battle, or its first locked battle when none are unlocked. Locked battles and Fight remain disabled, and `startBattle()` separately enforces unlock/range checks. Paging changes only transient UI selection; it does not spend gold, grant progression or create a save field. Battle results select the next available battle and corresponding page.

## Default Gameplay Layout

**Default Gameplay Layout** is the reusable name for the arena combat design introduced in Version 28 and refined in local Version 29. Request it with **“Use the Default Gameplay Layout for [scene]”.** Apply it to other scenes only when requested; the approved training gameplay layouts remain unchanged.

| Element | Placement and behavior |
|---|---|
| Scenery | Full landscape scene, without a black top strip. |
| Back | Top-left corner. In arena combat it pauses the run and offers Resume or Retreat. |
| Settings | Top-right corner. Opening it pauses an active fight. |
| Level and XP | Bottom-left corner, using the existing player progression. |
| Gold | Bottom-right corner, using the existing wallet icon and number, without a visible currency name. |
| Skills and tonic | Centered along the bottom, with visible availability, cooldowns and remaining charges. |
| Place name | Cloudring and the battle number in a compact top-center plaque. Three connected monster markers beneath it show cleared/current/upcoming opponents; the final marker is a boss skull, and an arrow points at the current opponent. |
| Fighter information | Each name and HP bar sits beneath its character image. The third-wave enemy has a Boss label beside its HP bar. |

Keep the fight readable with compact status labels such as Stunned, Poisoned and Guarded. Remove the narrative description of each combat event. The short victory or defeat scene still plays before results. The result dialog uses a short outcome title, actual reward amounts and compact return actions instead of explanatory paragraphs. Reward settlement, progression and pause/update protections remain unchanged.

Use safe-area spacing and generous touch targets. Keep the lower corner panels clear of the centered skill controls on short landscape screens. This pattern is a presentation convention, not a separate editor or a new progression system.

## Progression compatibility

`player.stage` remains the next unlocked encounter ID. Save version 4 keeps the existing localStorage key and still accepts saved next-encounter IDs 1–31 and cleared IDs 1–30, preserving progress earned before Stage 3 was deferred. New battles and settlement are restricted to encounters 1–20. Earlier high-tier equipment and exact currency remain intact; future gear is excluded from active offers. Records count only active encounters toward the displayed 20. Existing encounter statistics, three-wave fights, rewards and once-only settlement remain stable; their tuning still needs playtesting.

`survivalUnlocked` records Endless access. Older version-1 saves beyond battle 12 and all later earned unlocks retain access. New saves earn it after battle 20; loading an existing save that has passed encounter 20 also unlocks it. Reading an old save normalizes it in memory, and the ordinary save path persists version 4. Existing equipment, cleared battles, training and currency remain in the same save.

Additional towns and Stage 3 encounters remain follow-up work; this change does not invent names or artwork for other islands. Existing pointer-down/keyboard actions, safe-area padding, orientation/visibility pausing and explicit offline update activation remain in use.

These changes are published as game Version 1.0.0.1 at Jimmy's request. Future publication still requires an explicit request. No automated tests or gameplay sessions were run for these layout revisions. See `validation.md` for the exact visual preview scope and outstanding checks.

The marker row reflects the actual three-monster encounter, not the four positions in the supplied visual reference. Endless reuses three-position groups and exposes the absolute monster number to assistive technology. Currency names remain in accessible labels and exact-value tooltips; visible wallet, standard price and battle-reward amounts use the denomination-colored icon plus number. Town’s Shop anchor is now (215,358) in the source image, 20 pixels farther left and 15 pixels down from Version 29's (235,343), following Jimmy's placement adjustment.
