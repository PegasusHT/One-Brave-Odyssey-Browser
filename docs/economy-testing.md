# Fast economy testing

Open Settings → Economy testing → Enter test mode. These controls live inside the existing game; there is no separate editor or simulator.

## A short repeatable pass

1. Load battle 2 with Prepared. This starts after the first clear with the expected gear, skills and stats.
2. Use Award test victory, then buy the next full set in Shop. This exercises the real reward and purchase functions without waiting through combat. Repeat the same check at battles 10, 20 and 29. Replaying an already-cleared battle must give its reduced replay reward, not another first-clear bonus.
3. Load a boss with Prepared and fight it manually. Repeat with Skip recent training or Missing gear upgrades. Compare health remaining, tonic usage and fight duration. Extra boss practice supplies a stronger comparison. Sampling these cases takes a few fights rather than an entire campaign.
4. Load battle 10, open Economy testing and advance the idle clock by five minutes. Legacy should show only Collect. After a successful collection it is disabled for five minutes; returning later or reloading must not remove the cooldown. At very early progression, earning a whole coin can take longer than five minutes.
5. Use +24 hours or +72 hours to examine offline rewards immediately. These controls move only the test save's collection clocks; they do not change the device clock or automatically add money. Collect uses the normal game action.
6. Use Fresh test hero for the initial tutorial/economy experience, or Return to real save when finished.

Award test victory bypasses combat deliberately. It can check reward settlement, shop affordability and progression unlocks; it cannot prove that a build would win that battle. The four loadout presets also represent assumptions rather than a simulated campaign. Keep a small repeatable sample of real fights and one-minute training runs to calibrate those assumptions. A complete playthrough is still useful before a release, rather than after every small number change.

## Short-fight balance check

Start with Fresh test hero in battle 1 to exclude inherited training, gear and skills: the derived starting values are 31 ATK / 183 HP, normal HP 63/70 and elite HP 150. Five plain successful strikes defeat that elite; criticals and learned skills can shorten it. Its unblocked attack is 26 damage. Finish an existing battle and start a new one after reloading Version 25 because battle stats are captured when the run starts. No real save reset is needed.

Load battle 5 with Prepared: this uses tier-5 equipment, reference stats of 85 and rank-2 Sunflare/Bash. Count successful damage actions rather than misses; aim for 2–3 hits on each normal enemy and about five offensive actions on the elite while using skills. Poison, when available, counts as one cast rather than one action per tick. Critical hits, golden openings, skill timing and cooldowns can change the exact count.

Reload battle 5 with Skip recent training: each stat is 65 with the same equipment. Three full elite hits without dodge, block, Windguard or healing are enough to remove a full health bar; damage taken from the first two enemies may make defeat come sooner. Avoid assuming that three enemy turns must kill the hero when defensive effects intervene.

No automatic battle simulations or playtests were run for this tuning pass.

## What the presets contain

Every checkpoint marks preceding battles cleared, equips the expected rank, loads available skills at the current rank cap and supplies the matching training-ground levels. Prepared uses the battle's reference stat target. Skip recent training uses exactly twenty fewer points in each stat, clamped to a minimum of one. This remains one training round behind at bosses and stage transitions. Missing gear upgrades uses equipment three ranks behind. Extra boss practice adds forty to each reference stat. Available points, facilities and wallet are representative assumptions, not a recorded spending history.

The TEST SAVE badge stays visible. Test data uses `one-brave-odyssey.browser.test.v1`; the real `one-brave-odyssey.browser.v1` save remains separate. `?test=1` keeps the selected mode on reload. Returning to the real save removes that parameter. Presets and test victories replace or modify only test progress. These are local prototype tools, not competitive-server security controls.

Changing modes, loading presets and advancing clocks are unavailable during an active run. Finish or leave the run first. The preview uses the existing core reward, purchase and combat implementations.

## Getting the latest game files

This local revision shows Version 26 in Settings. The hosted offline cache for a future requested release is `obo-game-2026-09-17-26`.

For the hosted/installed game:

1. The revised files must first be published to the existing private Site. Local edits or GitHub pushes alone do not update it.
2. Finish the current run, go online and close other windows of this game.
3. Reopen the same game URL or installed icon. In Version 23, choose Settings → Check for updates. Older versions check on opening online.
4. Choose Install game update when it appears. This replaces game files and preserves saved progress. Applying an update prevents starting a new run until the reload completes.

Only publish when Jimmy explicitly requests it. Version 26 remains local. Game Version 23 was successfully published to the existing private Site on 17 September. Clearing a cache cannot retrieve unpublished changes.

For a local PC preview, keep start-game.command open in Terminal and refresh its localhost page. Version 26 disables offline workers for localhost, 127.0.0.1 and [::1], and unregisters only this game's existing scoped worker without deleting saved progress. If migrating from an old cached localhost page, finish the run, refresh while the server is running, then close and reopen the local game tabs to release the old worker. A stopped server should no longer silently serve stale game files. A device opening the same source over local Wi-Fi should use the launcher's phone URL; that origin has a separate save from the hosted game.

## Cache versus saved progress

The offline cache stores game code and artwork. localStorage stores the hero. The in-game update flow replaces the former without deleting the latter. Starting a Fresh test hero is the preferred way to inspect a new game while preserving the real save.

If you intentionally want to erase a site's data, Chrome exposes per-site deletion under Settings → Privacy and security → Third-party cookies → See all site data and permissions. Find only this game's domain. This can erase its saved hero as well as offline files. [Google's site-data instructions](https://support.google.com/chrome/answer/95647?hl=en), [what browsing-data deletion removes](https://support.google.com/chrome/answer/2392709?hl=en).

On iPhone, Safari website storage is under Settings → Apps → Safari → Advanced → Website Data. Use a site-specific control if offered for the game's domain; avoid Remove All Website Data for a single-game problem. An installed Home Screen app may have a separate storage container, so do not promise that Safari clearing also resets the installed copy. Prefer the installed game's own update flow. [Apple's Safari data guidance](https://support.apple.com/en-us/105082).

The implementation uses the browser's service-worker update check and explicit waiting-worker activation. [MDN update](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update), [MDN skipWaiting](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting).
