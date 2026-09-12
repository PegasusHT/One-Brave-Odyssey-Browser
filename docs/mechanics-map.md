# Mechanics map — original Swords and Souls (2015)

Research checked 9 September 2026. This targets the original browser game, not Neverseen. Exact original numerical balance is not assumed.

## Sources

- [SoulGame’s Newgrounds listing](https://www.newgrounds.com/portal/view/664964): developer feature list and controls; five training activities, arena, survival, equipment, skills, home, museum, later turbo training and survival checkpoints.
- [Kongregate listing](https://www.kongregate.com/en/games/soulgame/swords-and-souls): developer description and updates corroborate the loop and a later strength difficulty adjustment.
- [JayIsGames review, 20 October 2015](https://jayisgames.com/review/swords-and-souls.php): training is the main leveling activity; arena is primarily a money source. Describes automatic attacks, manual skills/consumables, critical timing, museum income and home bonuses.
- [GoGy full gameplay walkthrough, 28 October 2015](https://www.youtube.com/watch?v=05XbrcXqocc): sampled around 3 minutes; observed separate statistics, skills and talents panels, a points-allocation tutorial, and equipment-bearing hero. Further playback was stopped by the user. No claim to have watched the full video or independently timed every original minigame.
- The local CLAUDE.md provides the accepted mobile adaptations for all five grounds. These are design requirements, not additional evidence about the original.

## Short mechanics map

| System | Original structure / confidence | Browser prototype adaptation |
| --- | --- | --- |
| Town | Central hub connects training, arena, hero, equipment and long-term upgrades. Listings + review. | Original Skyhaven floating-island hub with direct thumb-friendly navigation. |
| Training | Five reflex minigames increase stats and experience. Sessions can continue through mistakes; progress and missions encourage practice. Listings + review. | Indefinite Strength, Dodge, Block and Critical practice plus 30-second Accuracy. Critical uses the approved tap-anywhere cue/jump/strike sequence with polished poses and effects. Block uses the approved joystick interaction with shield/impact/star effects. All training entrances last 1.5 active seconds without countdown text. No life-based game-over. Strength/Dodge/Block contact resets the multiplier to ×1 but keeps main-goal points. Ordinary actions raise it by one, stars by two. Empty swings and skipped stars preserve main progress. Replay or bank partial rewards on exit. |
| Strength | Detailed input timing not independently verified in footage; follow the project’s established reaction-trainer design. | Visible right-thumb High/Low/Mid slash buttons and a left-thumb Kick button; an original orchard partner throws practice fruit, with parabolic high throws and falling sparks. |
| Accuracy | Mouse-based aiming is corroborated by developer’s crosshair update; exact rules not timed. | Tap to throw when the moving sight overlaps the target. |
| Dodge / Block / Crit | These stat roles and touch adaptations come from project notes; exact original scoring is not claimed. | Stick evasion (high → tuck, low → jump, mid → back) with a perfect-star timing bonus; joystick-aimed shield around a centered hero against all-direction oranges, with unblocked star pickups and neutral deflection of shielded stars; Tap-anywhere Critical dummy fake cue (ignore for +1 combo), jump cue (+1 combo) and airborne landing cue (star, +2 combo); either missed real cue or a tap outside a real cue resets combo, preserving earned points; a variable airborne wait separates the two cues. |
| Stats | Training drives leveling; points and skill/talent panels are visible in sampled footage. | Training directly raises the chosen stat; XP levels grant 3 spendable stat points and 1 skill point. Timed Accuracy grants another skill point for completed sessions with 8 hits. Strength, Dodge, Block and Critical instead bank fixed chosen-stat/XP payouts for weighted stat goals and increasing payouts for numbered side missions, with no session skill award. |
| Arena | Auto-attacks, manually activated skills/consumables and timed critical enhancement. Review. Original has 30+ encounters and survival per developer listings. | First chapter: 12 original encounters, 3 waves each, increasing opponents; repeat wins pay reduced coins. Survival opens after encounter 12. |
| Skills | Unlockable abilities supplement the automatic fight. Listings + review. | Sunflare damage, Windguard mitigation, Second wind heal; cooldown buttons plus critical tap windows. |
| Equipment | Purchasable gear enhances the hero. Listings. | Weapon and armor slots from day one, three visible tiers each, stable IDs and separate rendering descriptors. |
| Upgrades | Home, training progression and museum create additional growth. Listings + review. | Five levels per training ground; lodge improves arena coins; trophy gallery produces capped passive income. |
| Rewards | Training favors XP/stat growth; arena favors money; collection contributes income. Review. | Separate training and battle reward screens, first-clear skill points, persistent records. |
| Pacing | Repeated training and battles form the central rhythm; later turbo and survival extend play. Listings + review. | Player-controlled Strength, Dodge, Block and Critical cash-out and short Accuracy sessions, with immediate replay; no paid boosts, energy, ads, or monetization. The established trainers start at 1.35× the prior pace, retaining capped ramps and Dodge hit windows; Critical uses separate 650 ms / 350 ms cue windows. Balance numbers are original playtest tuning. |

## Scope and originality

This is a playable first chapter, not a complete feature-for-feature recreation. Full campaign length, additional mission types, secrets, a large item catalog, advanced talent trees, and full survival checkpoints are expansion work. No original-game assets, names, story, dialogue, music, UI layout or maps were reused. No Unity assets were read or copied. All in-game art is new procedural Canvas artwork; sound effects are synthesized. The user approved a sky-island town and teal-scarf adventurer.
