# Town and temporary Home

The supplied Town image is copied unchanged to `dist/assets/town/town-facilities.png` (1844 × 853, 2,311,455 bytes). The sample interface and level bar were used only for loose information hierarchy; their artwork is not included in the game.

## Shared layout

`TOWN_ART` in `art.js` owns the replaceable background, destination anchors and hero stage position. `townPlacement()` computes one centered cover transform for both Canvas rendering and the semantic HTML targets. The artwork keeps its aspect ratio, fills the landscape viewport, and crops outer scenery on narrower screens. The hero uses the existing equipped renderer on the circular stage beside Training. Its reference height is 188 pixels (increased from 150), with the original foot anchor and source proportions retained; the target reads the same descriptor.

Town retains its existing `home-screen` CSS class. The new temporary Home uses `title-screen`; it is unrelated to `player.home`, which remains the Lodge upgrade level. Only these two layouts use the new artwork and full-bleed placement. Training gameplay and other destination layouts remain unchanged.

| Target | Artwork landmark | Existing route |
| --- | --- | --- |
| Shop | Left building | `forge` |
| Legacy | Upper hall | `legacy` |
| Training | Central practice yard | `train` |
| Arena | Right arena | `arena` |
| Hero | Circular stage beside Training | `hero` |

Home is an icon-only transparent 48-pixel target at the safe-area-aware top left; the existing Settings control stays at the top right. The same persistent wallet and `#coins` element move to the bottom right on Town. The bottom-left badge and native experience progress use `player.level`, `player.xp` and `xpNeeded(player)`. Town rebuilds from current state whenever navigation returns to it. No additional progression or persistence system is introduced.

Every Town entry recreates a name-only announcement from `TOWN_ART.name` (currently SkyHaven). It fades in and out over 3.2 seconds, then its own DOM node is removed. With motion disabled it appears immediately and disappears at the same deadline. Navigation cancels the previous removal timer; persistent destination headings are never targeted. The announcement does not intercept input or use the reserved bottom area.

The bottom center is deliberately empty. No advertisement, banner or reserved-space placeholder is rendered. Gold and experience stay bounded to the lower corners.

Below 600 pixels wide, Shop uses a 64 × 48 pixel target to maintain separation from the Hero hit area. Its artwork anchor stays unchanged.

## Temporary Home

The existing navigation dispatcher has one additional `home` destination. Home displays the game name, a working Play Game button returning to Town, and disabled Credits/Achievements placeholders. The Town artwork supplies its temporary backdrop. It has no new save state, unlock logic or separate application.

## Planned campaign direction

Jimmy plans 30 battles across three campaign stages, ten per stage, with a distinct town for each. The present prototype still has one town and twelve encounters. The other town names/art and progression migration are follow-up work; the new announcement displays only the current island name, without a stage number.

The existing delegated pointer-down and keyboard handlers, Settings dialog, run pause/settlement rules, orientation/visibility handling and localStorage logic remain in use. The offline cache includes the new background; update activation still requires the existing safe user action and never reloads an active run.

This revision is a visual layout pass. No automated tests or physical-phone validation were requested. See `validation.md` for the exact preview scope.
