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
| Training | Five reflex minigames increase stats and experience. Sessions can continue through mistakes; progress and missions encourage practice. Listings + review. | Indefinite Strength, Dodge, Block and Critical practice plus 60-second Accuracy. Critical uses the approved tap-anywhere cue/jump/strike sequence with polished poses and effects. Block uses the approved joystick interaction with shield/impact/star effects. All training entrances last 1.5 active seconds without countdown text. No life-based game-over. Strength/Dodge/Block contact resets the multiplier to ×1 but keeps main-goal points. Ordinary actions raise it by one, stars by two. Empty swings and skipped stars preserve main progress. Completed goals bank rewards; unfinished main-bar progress persists across sessions. |
| Strength | Detailed input timing not independently verified in footage; follow the project’s established reaction-trainer design. | Visible right-thumb High/Low/Mid slash buttons and a left-thumb Kick button; an original orchard partner throws practice fruit, with parabolic high throws and falling sparks. |
| Accuracy | Mouse-based aiming is corroborated by developer’s crosshair update; exact rules not timed. | Tap to throw when the moving sight overlaps the target. |
| Dodge / Block / Crit | These stat roles and touch adaptations come from project notes; exact original scoring is not claimed. | Stick evasion (high → tuck, low → jump, mid → back) with a perfect-star timing bonus; joystick-aimed shield around a centered hero against all-direction oranges, with unblocked star pickups and neutral deflection of shielded stars; Tap-anywhere Critical dummy fake cue (ignore for +1 combo), jump cue (+1 combo) and airborne landing cue (star, +2 combo); either missed real cue or a tap outside a real cue resets combo, preserving earned points; a variable airborne wait separates the two cues. |
| Stats | Training drives leveling; points and skill/talent panels are visible in sampled footage. | All five trainers award +1 chosen stat and 6 XP only on completed main bars or missions. Bar costs grow with stats and contribution caps at four combo credits. Every three main bars grants a spendable stat point; every five grants a skill point, with lifetime counters. XP levels retain 3 stat points and 1 skill point. Partial bars persist; time/hits alone grant no progression. |
| Arena | Auto-attacks, manually activated skills/consumables and timed critical enhancement. Review. Original has 30+ encounters and survival per developer listings. | 30 encounters in three stages of ten, 3 waves each, with fixed encounter stat targets, stage bosses and the existing enemy roster. First clears pay an exact tenfold currency sequence; repeats pay 15% of their own base reward before Lodge bonuses. Survival opens after encounter 30; legacy completed-12 saves retain their prior unlock. |
| Skills | Unlockable abilities supplement the automatic fight. Listings + review. | Sunflare, Shield Bash, Poison, Windguard and Second wind in that unlock order, ten ranks each; cooldown buttons plus critical tap windows. Two tonic uses per encounter. |
| Equipment | Purchasable gear enhances the hero. Listings. | Weapon, armor and shield slots with 30 upgrade ranks. Stable original IDs and separate rendering descriptors; later +N ranks reuse existing appearances. Matching-set and individual next-tier purchases. |
| Upgrades | Home, training progression and museum create additional growth. Listings + review. | Five milestone-gated levels per training ground; Lodge improves replay coins; base idle income starts after the first clear, Gallery improves its rate, and up to 72 hours accumulates. |
| Rewards | Training favors XP/stat growth; arena favors money; collection contributes income. Review. | Separate training and battle rewards, first-clear +8 stat points/+3 skill points, persistent records and exact integer currency. Readable gem denominations share one wallet. |
| Pacing | Repeated training and battles form the central rhythm; later turbo and survival extend play. Listings + review. | Player-controlled Strength, Dodge, Block and Critical cash-out and short Accuracy sessions, with immediate replay; no paid boosts, energy, ads, or monetization. The established trainers start at 1.35× the prior pace, retaining capped ramps and Dodge hit windows; Critical uses separate 650 ms / 350 ms cue windows. Balance numbers are original playtest tuning. |

## Scope and originality

This is an original 30-encounter prototype, not a complete feature-for-feature recreation. Additional town art, mission types, secrets, advanced talent trees and full survival checkpoints remain expansion work. No original-game assets, names, story, dialogue, music, UI layout or maps were reused. No Unity assets were read or copied. In-game art uses original supplied images and procedural Canvas artwork; sound effects are synthesized. The user approved a sky-island town and teal-scarf adventurer.

## Current economy design

The authored 16 September pass is documented in [economy design](economy-design.md), including research sources, spending budgets, exact currency, skill order, increasing training costs and the unvalidated five-hour active-play target. No automated tests or gameplay balancing runs were requested for this pass.
