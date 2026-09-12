# Strength layout workbench

This is a small visual placement tool for communicating the gameplay composition. It shares the original Canvas character/projectile renderer with the game. It does not author animation clips, replace art, edit gameplay rules or build Unity scenes.

## Use

1. Start the existing local server and open `http://127.0.0.1:4173/layout-editor.html`.
2. Select or drag the main adventurer, throwing partner, High, Low, Mid or Kick. The inspector also accepts positions and sizes. Arrow keys nudge the selection; Shift increases the nudge.
3. Preview 844×390, 667×375 and 568×320. Control targets have a 52 px minimum and the right cluster resolves overlapping buttons. Character and projectile previews move together.
4. Use Undo or Reset to game layout when needed. Draft changes persist separately in this browser and origin; unavailable storage is reported.
5. Use Copy layout or Download JSON. Give the exported layout to the agent implementing the next change. Imports validate finite values, supported fields, sizes and normalized coordinates.

The export is the same versioned data shape as `STRENGTH_LAYOUT` in `dist/strength-layout.js`. Character x/y coordinates mark the feet; control x/y coordinates mark their requested centers. Positions are fractions of the available play area, inside the browser safe-area insets. Button width/height are CSS pixels; character scale uses the game's 1400×700 drawing space. The compact controller layout can adjust actual centers to preserve separation, so review the smallest preview too.

Drafts are stored under `one-brave-odyssey.strength-layout-draft.v1`. The game ignores that key and continues using the authored source layout until an agent applies an export. No progression data is written by the editor.

## Implementation

`strength-layout.js` contains placement data, touch-target packing and projection from the existing Strength simulation coordinates. `strength-art.js` draws the actors, projectiles, impact effects and feedback using that placement. High/mid/low input IDs remain `0`, `1`, `2`; rear action remains `kick`. The visible arrangement is High above Low, with Mid to the right of Low.

The original simulation still determines travel duration, lane, hit windows, cadence and rewards. The presentation maps the partner's release hand to the hero's action area; both impacts and moving objects use that mapping. The authored default uses matching vertical scales so the projected high throw retains its parabola. Exports with changed actor sizes or extreme placements need visual review before adoption.

`layout-editor.js` uses a fresh, isolated training instance for previews. Its bounded undo history and draft storage are independent of progression. Exported drafts are layout specifications, not executable scripts.

## Unity handoff

Keep this browser build as the playable MVP and behavior reference if Unity becomes the production implementation. Carry over stable equipment IDs, reward expectations, tests, tutorial behavior and the accepted layout. Reimplement one slice—Town → Strength → banked results—before porting the remaining systems. Canvas drawing and DOM controls require native Unity implementations; copying coordinates alone does not port the game.

For a workflow centered on placing GameObjects and animating controls, Canvas/uGUI is a reasonable first choice for the gameplay HUD. Unity's 6.3 documentation lists uGUI for UI requiring keyframed animation; UI Toolkit's UI Builder provides visual editing of UXML/USS layouts. Choose against the actual project version and existing UI setup before implementation.

- [Unity UI system comparison](https://docs.unity3d.com/6000.3/Documentation/Manual/UI-system-compare.html)
- [Unity UI Builder](https://docs.unity3d.com/6000.3/Documentation/Manual/UIBuilder.html)

The Unity MCP toolset in this environment includes scene, object, UI, script and animation operations. On 11 September 2026 its instances resource returned zero connected editors. Open the intended Unity project and connect its MCP integration before any Unity implementation work. The browser layout task did not modify that project.
