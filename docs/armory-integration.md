# Armory integration

Current first-release scope, 21 September 2026: 20 active armor ranks, reduced from 30, with matching weapon and shield ranks. The six original appearances remain; ranks 7–20 reuse A/B/C/D/F with +N names. `ARMORY_SETS` exposes these 20 active choices. `ITEMS` retains descriptors through rank 30 so older owned equipment, stable IDs and values survive loading, while purchases and new offers stop at rank 20. Current prices and bonuses are documented in [economy design](economy-design.md).

## Progression

Starter → Set A → Set B → Set C → Set D → Set F maps to tier IDs 1–6. Armor, weapons and shields advance independently through one upgrade button per slot. Buying the next item automatically equips it; owned or lower tiers and skipped tiers cannot be purchased. Loading an existing save equips its highest owned tier in each slot. No migration charge or refund is needed for this change.

Local Version 30 removes battle-clear requirements from both individual equipment upgrades and the matching-set action. Enough gold is the only progression requirement for the next purchase: set 15 can be bought before battle 14 is cleared. Rank prices are unchanged, upgrades remain sequential through active rank 20, and affordability, duplicate-purchase and maximum-rank guards remain in place. A matching-set purchase charges only for its missing pieces. Skill and training-ground unlock requirements are separate and unchanged.

The values below record the earlier C/D/F art integration and are superseded by the percentage-based equipment economy. They are historical, not current shop prices or bonuses.

| Set | Weapon gold / ATK bonus | Armor gold / HP bonus | Cosmetic shield gold |
| --- | --- | --- | --- |
| C | 1,400 / +45 | 1,250 / +145 | 950 |
| D | 2,800 / +72 | 2,500 / +220 | 1,900 |
| F | 5,200 / +105 | 4,600 / +310 | 3,500 |

`ARMORY_SETS` in `core.js` provides the matching preview equipment for both the in-game Hero motion menu and the existing Hero editor. Selecting a preview set does not write equipped progression or buy anything. Hero editor Apply saves facing and legacy part fits only.

## Art and scene routes

Each supplied folder contains five PNGs. Runtime copies are unchanged, with predictable names for each letter `c`, `d` or `f`:

- `assets/hero-equipment/set-{letter}-full.png`: 1086 × 1448 standing master.
- `assets/hero-actions/set-{letter}-attack.png`: 1254 × 1254 four-pose attack sheet.
- `assets/hero-actions/set-{letter}-jump-land.png`: 1774 × 887 four-pose jump and landing sheet.
- `assets/hero-equipment/sword-{letter}-long.png`: 2172 × 724 separate sword.
- `assets/hero-equipment/shield-{letter}.png`: 1774 × 887 front and back shield views.

Appearance descriptors live in `art.js`; no art selection is encoded into combat statistics. Per-frame source crops, roots, reference heights, sword grips, fist masks and far-hand positions fit the received drawings. The shared 1.4× sword multiplier stays in use. The later scene-size pass below increases complete heroes together with their attached equipment. Supplied source proportions are not resized independently by silhouette.

Town and menu portraits use complete standing outfits. Arena uses standing and attack keys. Critical uses crouch, airborne, strike and landing keys on its existing world trajectory. The shared `equippedHero` route covers Strength, Accuracy, Dodge and Block. Strength uses the supplied attack keys for slashes and crouch/landing for kick feedback; there is no dedicated kick drawing in this batch. Dodge keeps its original translations and tuck transform. Block draws the complete outfit without a sword or duplicate held shield and uses the equipped shield on its original aiming path. Scoring, controls, collision geometry, timing and reward settlement are unchanged.

Shield back views attach behind the body; front views supply shop thumbnails. Armor thumbnails show the complete outfit. Starter uses its original complete idle, six-frame attack and jump/landing sheets, including when later weapons or shields are equipped. Modular rendering remains for legacy A/B fitting and other outfit image-loading fallbacks; Starter does not fall back to the rigged body.

## Scene size and image sampling

Town's reference hero height is now 188 pixels in the 1844 × 853 artwork, up from 150 (about 25%). Its aspect-preserving cover transform and foot anchor are unchanged, and the HTML Hero target uses the same size descriptor. `HERO_SCENE_ART` applies a 1.2 factor to Arena and all five training hero renderers without changing gameplay descriptors.

The existing gameplay world fills the viewport by scaling width and height independently. `placeSceneHero()` compensates for that difference around the hero's foot anchor, using the vertical scene scale for both sprite axes. It runs before local facing, rotation and deliberate animation pose transforms, so viewport proportions cannot widen or squeeze the artwork. Existing breathing, Dodge tuck and Block guard animations remain. Town already uses a uniform scene scale and does not need this compensation.

Direct Arena and Critical rendering paths and their fallbacks receive the same correction. Strength's `STRENGTH_LAYOUT.hero.scale` remains unchanged because it also controls projectile placement through `strengthPoint()`. Training partners, scenery, target/collision geometry and controls keep their existing sizes and positions. Head feedback moves upward to keep its clearance. Arena's ward follows the larger hero. Block's independent shield keeps its aiming anchor and 104-unit size, receives the aspect correction, and its connecting arm follows the larger torso.

The world canvas samples the original PNGs with smoothing enabled and high-quality downsampling; no smaller intermediate sprite cache is introduced. The backing resolution follows device pixel ratio up to 3× instead of 2×, giving high-density phones more pixels for the artwork. This increases backing-pixel work on 3× displays; phone performance remains for Jimmy's playtest. Original asset files and crop proportions are unchanged.

## Preview and release scope

The source review and brief visual previews do not establish animation polish, purchase-flow correctness, game balance, offline installation or device compatibility. Jimmy will playtest later. No automated tests were run. Cache `obo-game-2026-09-16-20` includes the art and updated renderers; updates still require the existing explicit safe activation and do not reload active runs. This is a local revision, not a published release.
