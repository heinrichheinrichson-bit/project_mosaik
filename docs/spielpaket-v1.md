# Spielpaket V1 · Fluss und Auswahl

6. November 2026. Ausschließlich PC-Browser, im bestehenden Originalscreen. Keine APK. Alle164vorhandenen Katalogmotive bleiben unverändert; sieben Vergleichsdokumente sind hinzugekommen.

## Direkt spielen

Im Originalspiel befindet sich im Katalogbereich die aufklappbare Gruppe **Spielpaket · Fluss und Auswahl**. Ihre Schaltflächen starten das gewählte Rätsel mit den aktuellen Einstellungen neu. Der gesonderte Profilknopf aktiviert das gemeinsame Vergleichsprofil, ohne gespeicherte Nutzerprofile zu überschreiben.

| Motiv | Vorher | Neue Folge | Sondervergleich |
| --- | --- | --- | --- |
| Wal · kompakte Formen | 460Steine /27Schatullen | 460/18 | Grundspiel |
| Eichelhut | 1573/81 | 1573/47 | identische neue Folge mit Schlüssel in Spalte2, Position3; öffnet Spalte4 |
| Tag trifft Nacht | 1831/95 | 1831/54 | zwei vordere Partner, türkis30 und orange50; identische Folge ohne Verbindung |
| Bunte Balance | 1999/100 | 1999/56 | eine rote60er-Box mit ×2 im mittleren Verlauf; identische Folge mit Einzeltransport |

IDs: `flow-v1-whale`, `flow-v1-acorn`, `flow-v1-acorn-key`, `flow-v1-sunmoon`, `flow-v1-sunmoon-pair`, `flow-v1-balance`, `flow-v1-balance-bonus`.

Kein Motivstein und keine Palette wurden für diese Fassungen verändert. Die Mengen stammen aus tatsächlich abrufbaren Farbabschnitten; große Abschnitte werden mit bewusst größeren Mengen abgeteilt. Restmengen bleiben exakt. Die Reihenfolge ist reproduzierbar im Werkzeug `tools/build-flow-studies.cjs` festgehalten. Dieses erzeugt nur die neuen IDs und ersetzt keine bestehenden Motive.

## Neue Schlüsselregel

Jobdaten tragen `keyLane` (0–3); der passende Sperreintrag lautet `{kind:'box',lane:…}`. Erfolgreiche Auswahl öffnet sofort die bezeichnete Spalte. Kein Schlüssel auf dem Motiv, kein zusätzlicher Lieferbot, keine zusätzliche Steinmenge. Ein ungültiger Tap oder fehlender Stellplatz öffnet nichts. Bei einem Paar muss erst die gesamte gemeinsame Auswahl legal sein. Rückgängig restauriert den Zustand vor der Auswahl.

Die Darstellung verwendet die vorhandenen gestaltbaren Schlüssel-/Schlossformen. Schlüsselabzeichen in der Vorschau, Kette an der gesperrten Spalte, kurzer Flug zur Freigabe. Keine permanente Erfolgsmeldung über dem Spielfeld. Boden- und Steinschlüssel bleiben unverändert als getrennte Studien.

Der PC-Editor kann Schlüssel an einer Schatulle setzen oder entfernen. Spielübergabe/Export behalten `keyLane` und die Sperre. Rasteränderung oder automatische Neugenerierung verlangt vorheriges Entfernen der Sonderdaten. Validierung verwirft ungültige Zielspalten, fehlende/mehrfache Schlüssel und Schlüsselkreise ohne offenen Zugang in der Auswahl.

## Vergleich und Aussagegrenzen

Gemeinsame Kernsimulation:130Bildpunkte/s, Team12, Gesamt0, Abstand0,16s je Box, Öffnen0,35s, Aufnahme0,18s, Freigabe nach Ausfahrt, adaptiver Rahmen mit getrennten Hin-/Rückwegen und lokalem Rückweg bei Aufnahme.

Die Zahlen sind Simulationszeiten ohne manuelle Denkpausen, keine gemessenen Browser-Wandzeiten. Das Originalspiel verwendet zusätzlich seine reale Bildschirmprojektion und Einfahrtgeometrie. Deshalb sind die Werte für relative Vergleiche nützlich, aber keine garantierten Zeiten beim eigenen Spielen. Zeichnungsgröße und persönliche übrige Einstellungen bleiben beim Variantenwechsel erhalten.

Bereits geprüfter Grundvergleich mit geplantem Solverweg:

| Motiv | Bisherige Folge | Neue Folge |
| --- | --- | --- |
| Wal | 132,7s /27Boxen | 118,5s /18Boxen |
| Eichelhut | 298,8s /81Boxen | 289,8s /47Boxen |

Die Eingabezahl sinkt stärker als die Dauer. Weniger Nachlegen allein beseitigt die Transportzeit nicht. Der Eichel-Schlüssel öffnet im geplanten Durchlauf bei38,5s und165gelieferten Steinen (10,5%). Zwei alternative Auswahlstrategien öffnen bei46s und226Steinen (14,4%). Das liegt deutlich vor dem alten späten Bodenschlüssel; ein großer taktischer Vorteil ist damit noch nicht bewiesen.

Die erste Bonusposition (gelb50, Auftrag2) brachte im geplanten Durchlauf keinen Gesamtgewinn:300,8s gegenüber298,7s ohne Bonus. Daraufhin wurden drei weitere Positionen mit identischem Profil gemessen: Auftrag6 mit299,2s, Auftrag22 mit286,6s und Auftrag46 mit296,0s. Gewählt wurde Auftrag22, rot60: frühere Freigabe einer für den weiteren Ablauf relevanten Farbe, rund12s Unterschied in diesem geplanten Vergleich. Die Wirkung ist positionsabhängig; kein allgemeines Versprechen einer bestimmten Beschleunigung.

Zusätzlich werden pro neuer Fassung drei Strategien vollständig geprüft: geplanter Solverweg, größte aktuell vollständig bedienbare Menge zuerst, sowie die letzte solche Option in der sortierten Liste. Gibt es keine vollständig bedienbare Option und keine laufenden Bots, dürfen die alternativen Strategien eine teilweise bedienbare Box starten. Ein solcher Start kann gerade die nächste benötigte Farbe freilegen. Das sind konkrete alternative Durchläufe, kein Beweis, dass jede beliebige Auswahlfolge gewinnt.

Die vollständigen Ergebnisse stehen außerhalb des Repositorys in `outputs/fluss-vergleich-messwerte.json`. Kern- und Browserprüfungen stehen in `tests/box-key.cjs`, `tests/box-key-browser.cjs`, `tests/flow-ui-browser.cjs` und `tests/flow-studies.cjs`.

Ergebnis:23vollständige erfolgreiche Durchläufe, davon je drei Strategien für alle sieben neuen Fassungen plus zwei bisherige Grundvergleiche. Tag trifft Nacht:290,1s ohne Paar und292,1s mit Paar im geplanten Lauf. Bunte Balance:298,7s ohne Bonus und286,6s mit der gewählten roten Bonusbox. Auch beide alternativen Strategien lösen beide Varianten; ihre Zeiten stehen in der JSON-Auswertung. Die reine Auslaufphase ist bei mehreren großen Motiven noch länger als das Zehn-Sekunden-Prüfziel. Die großen Motive erreichen den angestrebten normalen Zeitkorridor noch nicht.

## Was beim Spielen beurteilt werden soll

- Entsteht weniger wiederholtes Nachlegen, ohne dass Farben zu lange fehlen?
- Ist die Schlüssel-Schatulle rechtzeitig sichtbar und sinnvoll erreichbar? Hilft die geöffnete Spalte wirklich?
- Ist beim Paar klar, warum zwei Plätze erforderlich sind? Bleibt daneben eine sinnvolle Handlung?
- Ist die lokale Wirkung der einzelnen Bonusbox sichtbar, ohne alle anderen Boxen zu entwerten?
- Wo wird noch bloß gewartet, und wie lang läuft das Rätsel nach der letzten Entscheidung aus?

Das Paket ist spielbar zum Vergleichen, noch keine ästhetische oder spielerische Abnahme. Das nächste Paket darf erst auf den konkreten Beobachtungen aufbauen.
