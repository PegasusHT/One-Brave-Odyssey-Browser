# Economy and progression

Updated 17 September 2026. Jimmy requested implementation without tests. These are authored tuning targets, not measured completion times or win rates.

## The intended loop

Clear a new battle, buy the next matching equipment set, spend earned stat/skill points, practise each of the five disciplines, then return to the Arena. Strong execution, earlier overtraining and different builds can change the order. There is no timer that forces a loss, compulsory training checklist, energy system or required offline wait.

The campaign has 30 encounters in three stages of ten. Battles 10, 20 and 30 are preparation peaks. The original five-hour budget included about 145 minutes of ordinary training (29 intervals × five trainers × one minute), 100–110 minutes of combat, and 45–55 minutes for boss preparation, upgrades and navigation. The 17 September request replaces long fights with short 2–3-hit normals and approximately five-action elites, so the old combat-time allocation and five-hour total are no longer supported estimates. Five hours across three days remains a broader pacing goal to revisit after manual feedback; this pass adds no extra grind or waiting. Two or three extra practice runs before a boss are a design intention, not a guaranteed requirement.

## Sources and spending

The first-clear reward for battle n is exactly `100 × 10^(n−1)` gold. The Lodge does not multiply first-clear rewards, so the tenfold sequence stays exact. Replaying a cleared encounter pays 15% of that encounter's first-clear reward, increased by the Lodge. An older encounter remains tied to its own reward; low-level farming never pays the latest encounter's prize.

| Purchase | Budget |
| --- | --- |
| Next weapon rank | 30% of the preceding battle's first-clear reward |
| Next armor rank | 30% |
| Next shield rank | 10% |
| Complete next matching set | 70%, less pieces already bought |
| Training-ground upgrade | 5% of the latest cleared battle's first-clear reward |
| Skill rank upgrade | 2%, plus skill points |
| Tonic | 2%; at most two uses in an encounter |
| Lodge or Gallery upgrade | 10% |

Equipment prices are fixed by rank. Training, skill, tonic and Legacy prices follow current campaign progress. This keeps small purchases relevant after the wallet grows. Buying the full set is a convenience action over the existing three equipment slots; individual upgrades still work. New gear ranks require the corresponding battle clear, preventing idle wealth from skipping the equipment sequence.

| New victory | First-clear reward | Next full set |
| --- | --- | --- |
| Battle 1 | 100 Gold | 70 Gold |
| Battle 2 | 1k Gold | 700 Gold |
| Battle 5 | 1 Emerald | 700k Gold |
| Battle 10 | 100k Emerald | 70k Emerald |
| Battle 20 | 1k Ruby | 700 Ruby |
| Battle 30 | 10 Star | Campaign equipment complete |

## One wallet, readable denominations

Gold → Emerald → Sapphire → Ruby → Diamond → Star. Each denomination represents one million of the preceding one; `k` means one thousand. These are automatic display units of one balance, not separate resources, premium currencies or a conversion shop. Prices and the wallet use the same formatter. A title exposes the exact gold equivalent.

Thirty tenfold rewards exceed JavaScript's safe integer range. Currency therefore uses BigInt for arithmetic and decimal strings in JSON saves. The conversion never rounds a purchase balance to a displayed denomination. Existing numeric saves are accepted; precision already lost in an old numeric save cannot be reconstructed. Currency utilities live in `economy.js`, while reward, price and gameplay rules remain in `core.js`.

## Training that remains meaningful

All five trainers award direct stats only for a completed main bar or side mission. Each completion grants +1 to that discipline and 6 XP. Raw hits and elapsed time do not grant XP, stats or skill points. Every three completed main bars earns an allocatable stat point, and every five earns a skill point. Those counters persist across trainers and sessions. Level-ups still grant their existing points, but training XP must first come from a completed objective.

Main-bar cost is `ceil(base × sqrt(1 + max(0, stat−5)/200))`. Bases are Strength 18, Accuracy 16, Dodge 20, Block 18 and Critical 24, reflecting their different opportunity rates. The effective stat includes this run's completed rewards. Restarting does not reset a high stat to an easy bar. Unfinished main-bar points persist; leaving without a completion preserves progress but awards no stat.

Successful actions contribute up to four combo credits, multiplied by ground yield. Stars still count as two successful credits. The visible combo can keep rising, but its reward contribution is capped, preventing quadratic payouts from overwhelming the increasing bar cost. Grounds have five levels, with 25% more yield per upgrade; upgrades open after battles 1, 7, 14 and 21.

Side-mission rewards stay at +1 rather than growing with the mission number. Mission difficulty growth is bounded. Avoid-damage missions require successful actions before time can count, so standing idle cannot start completing them. Accuracy keeps its existing target/throw controls, now has a 60-second run, and shows its stat bar and mission in the existing HUD area. The approved gameplay layouts of the other four trainers remain intact.

## Combat, equipment and skills

Combat power grows far more slowly than currency. Weapon and armor multipliers grow 3.5% per equipment rank; shield ranks add 0.6 percentage points of incoming-damage reduction, up to 17.4%. All 30 ranks have gameplay value. Original tiers 1–6 retain their appearance IDs; later ranks cycle through A/B/C/D/F art with +N names. No new artwork is required.

Each battle has a fixed reference stat target. The baseline advances by 20 per encounter, which budgets both direct training gains and allocated points. Stage transitions retain an additional 28-point step, and bosses add 28 points. Enemy strength never reads the actual player's current stats. Attack and health depend on trained stats and equipment; hit, dodge, block and critical probabilities compare the relevant stat with the encounter target. Training therefore keeps helping beyond the old early-game caps.

### Short-fight balance — 17 September

`COMBAT_BALANCE` in `core.js` holds the attack/HP growth, training-round size and hit budgets. The stat growth rates and hero health remain unchanged. The attack base is now 30 rather than 24, giving about 25% more real hero damage; enemy HP retains a separate reference base of 24 so the attack improvement is not cancelled by larger enemies. Enemy values are fixed from the encounter reference stats and matching equipment tier; they never read the current hero. Normal wave HP is 2.5 and 2.8 times the rounded reference attack, replacing the former roughly 65-times multiplier. Prepared heroes generally need two or three successful strikes; misses, overtraining and critical hits can change the count.

The third wave is an elite in every encounter. After battle 1, its HP retains the earlier five-action budget on the separate enemy reference curve: one use of each available offensive skill at the encounter's rank cap, with the remaining actions as basic strikes at the reference 25% critical chance. Poison contributes only its first four ticks to this short-fight budget, not an instantaneous eight-second payout; its actual duration remains eight seconds. A Poison cast is one offensive action, and its ticks are not separate player actions. Golden openings, cooldown availability, critical variance and the order of casts mean five is an approximate target, not a scripted hit gate. Sunflare deals 200% attack at rank one and 245% at rank ten. With the later hero attack increase, it can one-shot some normal enemies; the 2–3-hit target refers to basic strikes, with skills and criticals allowed to shorten fights. Bash, Poison, defensive skills and cooldown progression retain their existing effects.

A training round is twenty points per stat in the reference progression. Elite attack is `ceil(ceil(behindHP / 3) / (1 − referenceShieldMitigation))`, from battle 2 onward, where behindHP uses reference defensive stats minus twenty (minimum one) and the encounter's matching armor. Double rounding ensures three unblocked hits are lethal after shield reduction. The prepared reference generally survives three such hits from full health; accumulated normal-wave damage still matters. Normal attacks remove about 8% of prepared reference HP before blocks/dodges. Dodges, blocks, Bash, Windguard, tonics and healing can extend survival. There is no forced-loss condition, adaptive enemy scaling or stat reset.

Battle 1 is an introductory exception: its elite has 150 HP and deals 14% of reference hero HP, rounded up (26 damage for a fresh hero). A fresh hero has 31 ATK and 183 HP; normal enemies retain 63/70 HP, and the elite needs five ordinary landed hits without criticals or skills. This avoids assuming that a new hero has already learned Sunflare or completed a full twenty-point training round. Later elites keep their existing HP, so increased hero attack also helps those fights; the five-action skill budget is now a ceiling-oriented target rather than an exact count. These numbers are derived from the formulas, not a gameplay test.

The existing boss preparation steps and Endless wave multiplier remain. Currency, rewards, equipment prices, saves and training payouts are unchanged. The Prepared and Skip recent training checkpoints share these rules; the latter is exactly twenty points behind even at bosses/stage boundaries. These formulas have received source review only, without executing tests or simulations.

| Skill | Availability | Role |
| --- | --- | --- |
| Sunflare | Start | Immediate burst damage |
| Shield Bash | After battle 3 and Sunflare | Damage plus stopping one enemy attack |
| Poison | After battle 6 and Bash | Damage each second for eight seconds; refreshes, never stacks |
| Windguard | After battle 10 | Reduce damage from a limited number of hits |
| Second wind | After battle 20 | Emergency healing with a long cooldown |

Skills have ten ranks, with a visible current-to-next effect comparison. Windguard shortens its cooldown at every rank and gains another protected hit every third upgrade. Campaign milestones limit the maximum purchasable rank, and higher ranks cost more skill points. The first-clear bonus supplies eight allocatable stat points and three skill points, in addition to XP. Healing has a limited budget: two tonics per encounter, plus a 60-second Second wind cooldown. This preserves the value of defensive training. Poison and stun clear when a wave ends; damage cannot spill from a defeated enemy into the replacement.

## Idle income and returning players

Idle income starts after the first clear without requiring a Gallery purchase. At Gallery level zero, 24 hours earns 35% of the latest cleared battle's first-clear reward. Each Gallery level adds 30% to that rate; level five therefore earns 87.5% per day. Up to 72 hours can accumulate. Idle income supports gear, facilities, skills and tonics; it does not directly train stats or clear battles. Legacy shows a Collect-only button, without an accrued resource amount or daily currency total. Successful collection requires at least five minutes since the previous manual collection and a positive whole-coin balance. Early or empty attempts change nothing.

Before a new first clear or Gallery upgrade changes the earning rate, accrued income is banked at the previous rate, without crediting the wallet or resetting the manual collection timer. This prevents an old absence from being valued at a newly unlocked, tenfold-higher reward. Offline earnings use the existing local timestamp; this remains a local prototype, not a server-authoritative economy.

Existing equipment, earned stats, unlocked skills, clears and Endless access are preserved. Currency saves migrate to version 4 under the existing storage key. Version 4 adds pending idle currency and a separate manual-collection timestamp; the catch-up wallet adjustment remains limited to saves older than version 3. Legacy learned skills start at rank one. Existing cleared saves receive a one-time wallet floor of 78% of their highest first-clear reward, sufficient to catch up through missing sequential sets, because their earlier victories paid the old rewards. First-clear and session settlement guards remain in place.

## Why these choices

Kongregate's original idle-game math discussion distinguishes currency growth from production and exchange rates, and shows why exponential costs need matching income and milestone changes. Here, tenfold rewards deliver the requested large jumps, while matching equipment prices control affordability and a separate combat curve keeps the fights readable. [Anthony Pecorella, The Math of Idle Games, Part I](https://www.kongregate.com/en/pages/the-math-of-idle-games-part-i)

Unity's economy guide emphasizes mapping sources and sinks together and avoiding pacing that becomes either tedious or trivial. The percentages above form one shared spending budget rather than separately chosen shop prices. Replays and offline income provide ways to recover from a poor spending choice. [Unity, Building an in-game economy](https://activation.unity3d.com/how-to/building-game-economy-guide-part-2)

The technical choice of exact integer currency follows BigInt's ability to represent integers beyond Number's safe range. JSON conversion is explicit because JSON.stringify does not serialize BigInt directly. [MDN, BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

## Manual tuning priorities

No tests, combat simulations or gameplay runs were performed for this pass. The first useful observations are actual stats earned in a minute by each trainer, encounter duration, health remaining when a prepared hero wins, skill usage, and the wallet remaining after buying the next set. Compare the first few battles and each boss before judging late-campaign pacing. Tune reward rates, enemy pressure and prices separately so a correction to one does not destabilize all three.

This implementation supports the intended loop but does not guarantee losing whenever one minute of training is skipped. Such a guarantee would require an explicit gate or scripted loss; strong play and preparation are allowed to succeed sooner. Five hours is the desired calibration point, not a claim established without playtesting.

## Fast manual workflow

[Economy testing](economy-testing.md) describes the in-game test save, battle/loadout presets, test-victory rewards, idle time advancement, and cache/update instructions. Those controls allow focused checks without replaying the complete campaign.
