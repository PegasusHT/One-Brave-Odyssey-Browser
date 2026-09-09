# Prototype validation — 9 September 2026

- 14 Node tests pass: save round trips, corrupt/unavailable storage, equipment costs and equips, upgrade yields, reward idempotency, partial training, XP/skill/stat spending, arena unlocks and repeat rewards, survival payouts, passive-income cap, fixed pools, valid/missed inputs in all five trainers, session countdown/end, combat cooldowns/healing and wave completion.
- All JavaScript modules pass syntax checks; all module import paths and the static hosting entrypoint resolve.
- Browser UI tested at landscape 844×390, 667×375, and 568×320. Measured combat targets remain inside the viewport, at least 53 px high; training targets are at least 44 px high. Five training entry buttons fit at 844×390. Forge width matches its scrollable content at 568×320.
- Found and fixed training buttons below the fold, instructions covering a hit zone, shrinking hero sections overlapping skill cards, and narrow forge horizontal overflow.
- Browser interaction verified: start strength trainer, pause, bank partial rewards, return; learn Sunflare; enter encounter 1; activate Sunflare and observe 12s cooldown; complete three waves; receive 48 coins, 33 XP and a skill point; reload and read back the persisted arena clear and 168 coin balance; purchase armor_t2 for 150 coins and observe 131 maximum HP and equipped state.
- No browser runtime errors observed during the tested journey.
- Both optional WebMCP tools registered with expected schemas; progress read and destination navigation succeeded; invalid destination and unexpected read arguments were rejected.

These are desktop-browser viewport tests, not physical-device certification. iOS Safari / Android Chrome touch feel, actual notch insets, safe-area behavior, audio unlock and mobile task-switch behavior still need on-device playtesting. All five trainer scoring paths are covered in logic tests; only strength was manually exercised in the browser during this pass. Local test progression is separate from the fresh hosted game save.
