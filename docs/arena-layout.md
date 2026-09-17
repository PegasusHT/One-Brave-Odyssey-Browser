# Arena selection

The supplied 1448 × 1086 PNG is copied unchanged to `dist/assets/arena/arena-hall.png` (1,178,154 bytes). `ARENA_ART` in `art.js` owns its source dimensions and focal alignment. `drawWorld()` uses centered horizontal cover and 25% vertical alignment for the `arena` menu only, preserving the original image ratio and showing the gates and floor. Active combat and training retain their existing layouts and scenery.

Arena uses Town's corner hierarchy: an icon-only Back to Town target at top left, the existing Settings button at top right, the same wallet at bottom right, and the shared `levelProgress()` markup at bottom left. No second gold or experience state is introduced. The hero and opponent canvases retain proportional rendering; no visible character names or reward preview is rendered. Fight uses the same compact dark button treatment as Town. Legacy-unlocked Endless remains available through its existing icon action.

The central stage panel has ten numbered battle buttons in two rows, with previous/next stage arrows. `CAMPAIGN_STAGES`, `BATTLES_PER_STAGE` and `TOTAL_BATTLES` in `core.js` define stages 1–3 and battles 1–30. Changing a page chooses its highest unlocked battle, or its first locked battle when none are unlocked. Locked battles and Fight remain disabled, and `startBattle()` separately enforces unlock/range checks. Paging changes only transient UI selection; it does not spend gold, grant progression or create a save field. Battle results select the next available battle and corresponding page.

## Progression compatibility

`player.stage` remains the next unlocked encounter ID. Version 2 normalization accepts IDs 1–31 and cleared battles 1–30, while keeping the existing localStorage key. IDs 1–12, enemy statistics, three-wave fights, rewards and once-only settlement remain stable. Battles 13–30 cycle the existing roster and continue the same stat/reward formulas; these values are provisional until playtested.

`survivalUnlocked` records Endless access. Older version-1 saves beyond battle 12 retain their earned access, and new version-2 saves earn it after battle 30. Reading an old save normalizes it in memory; the ordinary save path persists version 2. New stage-2 saves do not get mistaken for completed legacy saves on later loads. Existing equipment, cleared battles, training and currency remain in the same save.

Three distinct towns are still planned; this change does not invent names or artwork for the other islands. Existing pointer-down/keyboard actions, safe-area padding, orientation/visibility pausing and explicit offline update activation remain in use.

No automated tests or gameplay sessions were run for this revision. See `validation.md` for the exact visual preview scope.
