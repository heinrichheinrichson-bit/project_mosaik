# Projekt Mosaik

Spielbarer Browser-Prototyp und erhaltene Ingame-Designstudien für ein mobiles Mosaikrätsel.

## Start

`index.html` im Browser öffnen. Die Grafiken sind eingebettet, es werden keine externen Abhängigkeiten benötigt.

## Zwischenstand

- Vollbildrätsel mit 576 Steinen und zeitlich reservierten Laufwegen.
- Farbige geschlossene Auswahlboxen, Startplätze und Freigabe nach dem letzten Herauslaufen.
- Erhaltene Stein-, Boxen-, Unterlagen-, Abgabe- und Screenstudien.
- Vergleich zwischen ausgerichteter und kompakter Boxenauswahl.

Dieses Repository dient zunächst der nachvollziehbaren Sicherung des Prototyps. Noch keine Android-/Play-Store-Version.

## Design checkpoint: proportions
The default screen now uses larger boxes and parking pads, a compact centered queue, clearer numbers, and quieter navy/cream surfaces. Use the Gesamtbild comparison to return to the previous version. All earlier studies remain available.

Validation: 31 inline script blocks pass JavaScript syntax checks; browser comparison switching, reset, and running gameplay were checked. This is a playable design prototype, not an Android release.


## Movement comparison
The default is now permeable actor movement everywhere. Actors still obey board geometry, reserve unique stones, leave in sequence, and keep straight launch paths. The previous collision mode is preserved in the movement study; switching resets the puzzle.
Run node tests/free-movement.cjs to verify the full 576-stone puzzle, stone conservation, unique targets, empty-ground movement and absence of traffic holds.


## Expanded movement study
Six additional full 24x24 puzzles are selectable in the game-screen study (05–10). Placeholder bodies now use their team color. All previous studies remain.
Comparison results and interpretation: docs/bewegungsvergleich.md. Reproduce with node tests/compare-movement.cjs and node tests/compare-burst.cjs. The first run compares both modes on seven motifs; the second exercises concurrent teams with changing box choices. These are simulation checks, not Android frame-rate measurements.


## Movement and transport polish
The new study compares safe visual lane offsets, eased pickup with small gripper movements, and a longer visible descent into the existing intake. These do not add traffic waiting or alter target ownership. Offsets fade at the board entrance, stop during pickup, and shrink near occupied stones. The prior presentation remains selectable.

Playback choices are 1.5x / 2x / 3x, also cycled by the button beside pause in the game header. Waiting boxes can be compared without a hint, with a subtle outline pulse, or with a small clock symbol. The waiting-box example places a brown team in front of the enclosed sunflower center.

Validation: node tests/visual-clearance.cjs solves all seven full boards and checks visual clearance; 62,728 nonzero offset observations passed. The sunflower gameplay conservation test and browser playback/comparison controls also passed.

## Five character directions
The character study shows beetle carriers, soft workshop creatures, mini robots, crabs and clay creatures, plus the prior placeholder. All cards animate concurrently, with empty and loaded views at small and enlarged scales. Clicking a card switches the actual puzzle actors without resetting the puzzle. Team colors are retained. These are early canvas shape studies. The new carriers hold the stone forward to expose more of their body.
Validation: JavaScript syntax, all six in-game character switches, and the 576-stone gameplay conservation test passed.

