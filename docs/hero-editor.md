# Hero editor

Open **Hero → Animation preview → Open hero editor**, or [the local editor](http://127.0.0.1:4173/hero-editor.html) while the game's visible Terminal server is running. Use the same browser and origin as the game whose fit you want to change. See [local startup](../README.md#run-locally) if the server is stopped.

The existing editor now previews complete armory sets using the same full-body artwork as the game. Its legacy modular renderer remains available for separate-part fitting. It does not generate artwork, change source PNGs, buy equipment or edit progression.

The current equipment direction is **complete Armor outfits**, comprising clothes, pants and shoes. There are no helmets. One **Armory set** dropdown selects Starter, A, B, C, D or F together with its matching sword and shield. These are preview choices; the Shop separately advances equipped gear through upgrades.

## Start with a fit

1. Choose an **Armory set**. The default **Game art** preview displays the complete outfit. Choose a pose and use Play, Pause, Facing or Zoom. These choices do not buy gear or change saved equipment.
2. For legacy A/B fitting, select **Part fitting** under Preview, then choose **Standing** and a part on the canvas or in **Selected part**. Starter/C/D/F have complete drawings only, so separate limb and pose-joint controls are hidden.
3. Drag the part to move its artwork. Drag the round handle to rotate it. Use **Horizontal**, **Vertical**, **Rotation · °**, **Scale**, and the two flip controls for precise adjustments.
4. Inspect **Raised arm**, **Attack**, **Airborne**, and **Landing**. The same part fit applies across all poses. Zoom and Guides affect only the editor view.
5. Use **Play** to inspect available animation clips, and **Pause** to hold a frame. Crouch, Windup and Reach are also available as individual pose targets. Playback follows the motion preference; a disabled Play button does not prevent static fitting.

The selected part's outline and pivot show what is being edited. Arrow keys nudge it; `[` and `]` rotate it. Hold Shift for a larger step. Undo/Redo and the usual Command/Ctrl-Z shortcuts restore recent draft edits. Escape cancels an active drag.

## Part fit and pose joints do different jobs

| Control | Use it for | Scope |
|---|---|---|
| Part fit | Align a palm, boot, sleeve or other image with its attachment | That part across every pose |
| Pose joints | Raise an arm, bend a wrist, move a hip or move a foot target | The selected pose and transitions using it |
| Facing | Turn the whole hero left or right | Complete artwork and modular hero |

Part fit changes the artwork around an existing attachment; it does not move the connected limb's joints. For example, moving the forearm image alone does not move the wrist target. Use **Pose joints** to move the arm chain. Hip and foot targets control the leg placement while the existing thigh and shin lengths remain in use.

The near palm carries the sword: moving, rotating, scaling or flipping that palm carries its grip and weapon attachment with it. Select **Sword** to adjust the sword relative to the hand. Head fitting moves the head artwork; no helmet layer is active in the current design.

Base body-part fits are shared when that part is used. Garment fits belong to the selected Armor appearance, and weapon fits belong to the selected sword. Check both armor sets after changing shared body parts. A fit that looks right while standing may expose a joint in a raised or bent pose.

## Draft, apply and export

Edits automatically save a **local draft**. They do not affect the game until **Apply to game on this device** is pressed. Applying saves facing and legacy modular fits in this browser and origin; reload another open game tab to see them. Complete outfit images retain their original proportions and do not respond to individual limb edits. It does not publish source changes or transfer them to another phone, browser or hosted origin.

**Revert applied fit** restores the game's default fit while keeping the draft. **Reset selected part**, **Reset selected pose** and **Reset draft to defaults** change the draft and can be undone during the editor session. They do not clear progression. Complete sprites and outfits keep their source artwork; individual part fits affect modular rendering only. Facing also applies to the complete outfits.

Use **Download JSON** or **Copy JSON** to keep a portable copy. **Choose file** or **Import JSON** loads a configuration into the draft, ready for review and a separate Apply action. If browser storage is unavailable, download the JSON before leaving.

To make a fit the default for everyone, give the exported `one-brave-odyssey-hero-fit.json` to the project agent. The agent must review it, integrate the approved values into the source and publish a release. Export and Apply do not perform those steps automatically.

## Source and storage

- `dist/hero-editor.html`, `hero-editor.css` and `hero-editor.js` provide the editor controls and canvas interaction.
- `dist/rig-art.js` supplies the same rendering and attachment transforms used by the game, plus bounds and pivots for selection.
- `dist/rig-config.js` validates configuration version 1 and manages the applied fit.
- `dist/art.js` supplies the default rig, poses, source crops and Armor appearance descriptors.
- Draft key: `one-brave-odyssey.hero-fit-draft.v1`.
- Applied-fit key: `one-brave-odyssey.hero-fit.v1`.
- Progression remains separate under `one-brave-odyssey.browser.v1`.

The interface displays all angles in degrees. In exported JSON, part-fit `rotation` is in degrees, while pose-joint angle values are stored in radians. Do not interchange those units when editing JSON manually. Unknown fields, invalid numbers and unsupported configuration versions are rejected rather than silently applied.

## Armor back correction

The supplied torso images contain opaque shoulder sockets and underarm fabric. Earlier clipping removed these areas along with the baked shoulder plates, exposing the scenery when a sleeve lifted. The corrected descriptors preserve the body shell: Set A trims only its top shoulder plates while retaining the socket and cream lining; Set B retains its complete padded socket. The original PNGs remain unchanged and no new artwork was generated.

## Complete-body artwork

Starter and sets A/B/C/D/F now have standing, attack and jump/landing artwork. Starter uses its original six-frame idle and attack sheets and original jump/landing sheet. The later sets use quiet breathing while standing; actions use the received key drawings. The game keeps sword and shield layers separate and attaches them through the fitted per-frame hand anchors. The editor uses the same images and helpers at its existing display scale and baseline.

No separate limb editing is implied for complete images. Dedicated kick, hit and defeat art are not supplied in this batch. See [armory integration](armory-integration.md) for current scene routes and limits.

## Verification status

The C/D/F revision received a focused desktop visual preview only. No automated tests, purchase flow, gameplay, offline installation, responsive matrix or physical-phone checks were run for it. The review described below predates this revision.

Desktop visual review covered 844×390, 667×375 and 568×320 editor layouts, selected drag/rotation/pose controls, sword attachment, facing, Undo and Apply/Revert/Reset. Latest full-outfit Raised arm and Airborne previews were reviewed at 1100×600. No automated tests, gameplay/migration, offline-editor or physical-phone checks were run. See [validation](validation.md) for the exact reviewed interactions and limits.
