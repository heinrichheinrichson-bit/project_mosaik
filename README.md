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

