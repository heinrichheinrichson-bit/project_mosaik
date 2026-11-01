# Bewegungsvergleich – sieben Vollbildrätsel

Sechs neue 24 × 24 Testrätsel ergänzen die Sonnenblume. Alle 576 Zellen des Bildes sind anfangs mit Steinen gefüllt. Die Figurenkörper nutzen dieselbe Farbe wie ihre Einheit.

## Ergebnis

Alle 21 vollständigen Simulationsläufe bestanden: sieben Motive mit durchlässiger Bewegung, dieselben sieben mit Kollisionen sowie sieben zusätzliche Durchläufe mit häufiger, wechselnder Boxenauswahl und mehreren gleichzeitig arbeitenden Teams. Insgesamt wurden 12.096 Steine korrekt abgeliefert.

| Rätsel | Durchlässig (s) | Kollisionen (s) | Kürzere Laufzeit | Warte-Beobachtungen alt / neu |
|---|---:|---:|---:|---:|
| Sonnenblume im Vollbild | 331.6 | 345.1 | 3.9 % | 172 / 0 |
| Farbringe | 290.2 | 309.2 | 6.1 % | 270 / 0 |
| Spiralgarten | 262.1 | 291.6 | 10.1 % | 379 / 0 |
| Verzahnte Kämme | 269.2 | 277.3 | 2.9 % | 331 / 0 |
| Mosaikviertel | 201 | 242.7 | 17.2 % | 303 / 0 |
| Schmetterling | 237 | 245.7 | 3.5 % | 250 / 0 |
| Stadtlabyrinth | 270.6 | 283.6 | 4.6 % | 268 / 0 |

Zeiten sind Simulationssekunden bei 1×, keine gemessenen Handy-Laufzeiten. Die Vergleichsläufe verwenden dieselbe automatische Lösungsstrategie; deren tatsächliche Boxenstarts können sich durch unterschiedlich schnelles Freigeben der Startplätze ändern. Warte-Beobachtungen werden alle 0,5 Simulationssekunden pro Figur gezählt und sind keine Anzahl einzelner Staus. Aufnehmen und der zeitliche Abstand beim Auslaufen bleiben erhalten.

## Geprüft

- Alle Steine vollständig abgeliefert, genau eine gestartete Figur pro Stein.
- Steinanzahl bleibt erhalten: Brett + getragene Steine + abgegebene Steine = 576.
- Keine doppelte Vergabe eines noch nicht aufgenommenen Zielsteins.
- Figuren bewegen sich auf freiem Boden; Steine bleiben Hindernisse.
- Im durchlässigen Modus keine geplanten Wartefelder außer beim Aufnehmen.
- Im strengen Vergleich keine überlappenden Figuren bei den Stichproben.
- Alle sechs Motive im Browser auswählbar; Spielscreen, Startplätze und Abgabe werden angezeigt.

## Einschätzung

Die durchlässige Bewegung ist für den nächsten Prototyp die bessere Grundlage. Auch bei den fragmentierten Motiven verschwindet das gegenseitige Blockieren. In den zusätzlichen parallelen Läufen waren bis zu 40 Figuren gleichzeitig aktiv. Sichtbare Überschneidungen treten weiterhin auf und sind in dieser Studie beabsichtigt. Für Engstellen würde ich vorerst keine Wartepflicht ergänzen.

Die Rätsel sind Belastungsmotive, noch keine fertig abgestimmte Levelserie. Die Tests beweisen nicht, dass jede beliebige Boxenwahl lösbar ist, und ersetzen keine Android-Leistungsmessung oder Spieltests zur wahrgenommenen Ruhe. Die farbigen Platzhalter bleiben sehr klein; bei getragenen Steinen wird ein Teil des Körpers verdeckt. Eine spätere Figur sollte ihre Teamfarbe auch seitlich deutlich zeigen.
