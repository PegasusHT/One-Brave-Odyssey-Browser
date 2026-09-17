# Armory integration

## Progression

Starter → Set A → Set B → Set C → Set D → Set F maps to tier IDs 1–6. Armor, weapons and shields advance independently through one upgrade button per slot. Buying the next item automatically equips it; owned or lower tiers and skipped tiers cannot be purchased. Loading an existing save equips its highest owned tier in each slot. No migration charge or refund is needed for this change.

Earlier equipment values remain unchanged. New values below are initial tuning, not playtested balance. Bonuses are the item's total bonus, not an amount added on top of the earlier tier.

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

Appearance descriptors live in `art.js`; no art selection is encoded into combat statistics. Per-frame source crops, roots, reference heights, sword grips, fist masks and far-hand positions fit the received drawings. Existing world display heights and the shared 1.4× sword multiplier stay in use. Supplied source proportions are not resized independently by silhouette.

Town and menu portraits use complete standing outfits. Arena uses standing and attack keys. Critical uses crouch, airborne, strike and landing keys on its existing world trajectory. The shared `equippedHero` route covers Strength, Accuracy, Dodge and Block. Strength uses the supplied attack keys for slashes and crouch/landing for kick feedback; there is no dedicated kick drawing in this batch. Dodge keeps its original translations and tuck transform. Block draws the complete outfit without a sword or duplicate held shield and uses the equipped shield on its original aiming path. Scoring, controls, collision geometry, timing and reward settlement are unchanged.

Shield back views attach behind the body; front views supply shop thumbnails. Armor thumbnails show the complete outfit. Starter uses its original complete idle, six-frame attack and jump/landing sheets, including when later weapons or shields are equipped. Modular rendering remains for legacy A/B fitting and other outfit image-loading fallbacks; Starter does not fall back to the rigged body.

## Preview and release scope

The source review and one representative outfit preview do not establish animation polish, purchase-flow correctness, game balance, offline installation or device compatibility. Jimmy will playtest later. No automated tests were run. Cache `obo-game-2026-09-16-17` includes the fifteen new files and the existing starter sprite sheets; updates still require the existing explicit safe activation and do not reload active runs. This is a local revision, not a published release.
