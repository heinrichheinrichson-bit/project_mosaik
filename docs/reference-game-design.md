# Accepted visual reference

`reference-game-design.png` is the user's accepted reference, supplied on
2026-11-03. The original playable study remains in `index.html`.

Preserve its dark blue, sand-coloured raised board, two shallow steps, cream
parking pads, original box sprites and intake. Smartphone layout improvements,
top icons and correctly centred box numerals are compatible with this reference.
Do not substitute a new material or colour direction for this design.

The shared game's board and stairs now use the actual source functions from
`index.html`, extracted by `tools/extract-reference-board.cjs` into
`editor-src/reference-board.js`. They are fitted to the available board bounds;
they are not approximations using two rounded strips. The renderer is cached.
The source-vs-extracted pixel comparison covers both original and S22 sizes.

The original study still contains its historical design alternatives. The
accepted screenshot is the visual target, not every possible study setting.
