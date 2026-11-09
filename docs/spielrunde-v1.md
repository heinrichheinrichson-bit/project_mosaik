# Spielrunde: verständliche Folge im Originalscreen

9. November 2026. PC-Testkapitel mit sechs Referenzrätseln, noch keine endgültige Reihenfolge der Store-Level.

## Gemeinsamer Ablauf

Die Spielrunde ist im Originalscreen über `/?journey=start` erreichbar. Der Katalog bleibt vollständig zugänglich. Alle Stationen sind für die Entwicklung direkt anwählbar. Der Start setzt Verkehr B und übernimmt die übrigen laufenden Einstellungen; gespeicherte Vergleichsprofile werden nicht verändert.

Eine kurze Startkarte erklärt jede neue Regel einmal. Bis zur Bestätigung stehen die Bots still und die Bedienelemente des Spielscreens sind gesperrt. Die Karte lässt sich über „Regel noch einmal ansehen“ erneut öffnen. Während des Spiels liegt kein Erklärungstext auf Motiv oder Schatullen. Brett, Treppe, Module und Botbewegung bleiben unverändert.

Nach vollständiger Lieferung führt „Weiter“ zur nächsten Station. Erst eine selbst gespielte Lösung erhält einen Haken. Automatische Testläufe dürfen weitergeschaltet werden, zählen aber nicht als selbst gelöst; auch ein zwischenzeitlich ausgeschalteter Testlauf bleibt als Test erkannt. Haken, bestätigte Erklärungen und zuletzt gewählte Station werden lokal gespeichert. Beim Fortsetzen beginnt diese Station neu; ein exakter Zwischenstand laufender Botfahrten wird in dieser Stufe noch nicht gespeichert. Speicherfehler lassen das Spielen zu und werden im Fortschrittshinweis angezeigt.

## Stationen und Entscheidungen

| Station | Ziel und sichtbarer Hinweis | Hilfreiche Entscheidung | Vermeidbarer Fehler |
| --- | --- | --- | --- |
| Wal | Erreichbare Farben und vier Stellplätze kennenlernen | Eine äußere Farbe öffnet die nächste; einen Platz zum Weiterarbeiten behalten | Alle Plätze mit noch eingeschlossenen Farben belegen |
| Eichelhut mit Schlüssel | Schlüssel in der Vorschau und zugeordnete Kette erkennen | Vorgänger sinnvoll abarbeiten, Schlüssel auswählen, offene Spalte nutzen | Die Öffnungsroute mit wartenden Teams versperren |
| Tag trifft Nacht mit Paar | Eckige Klammer, zwei Partner vorne | Zwei Plätze für das Paar freihalten; danach arbeiten beide unabhängig | Nur noch einen freien Stellplatz lassen |
| Bunte Balance mit ×2 | Markierung einer gezielten Bonusbox | Nützliche zusammenhängende Farbe mit weniger Fahrten abräumen | ×2 als zweite Farbe oder doppelte Botzahl missverstehen |
| Tag trifft Nacht mit versetztem Paar | Ein Partner vorne, der andere in Reihe zwei | Zuerst den schwarzen Vorgänger in Spalte zwei wählen; danach beide starten | Einen frühen Tap auf das noch unvollständige Paar für einen gültigen Start halten |
| Bestätigter Eichelhut V2 | Bekannter Schlüssel plus vier gezielte ×2-Konturboxen | Die geöffnete Spalte als Belohnung nutzen, Kontur zum Schluss zügiger auflösen | Annehmen, jeder Auftrag sei jetzt automatisch doppelt |

Für das versetzte Paar wird ausschließlich eine neue Variante `flow-v2-sunmoon-pair-depth` ergänzt. Auftrag 0 wandert vor den Partner in Spalte zwei. Alle 54 Jobs, Mengen, Farben und die geplante chronologische Folge bleiben erhalten. Das Paar liegt in Reihe eins und zwei, und der Vorgänger ist ohne das Paar startbar. Die bisherige Paarfassung bleibt unverändert.

## Umfang und Grenzen

Dies verbindet die vorhandenen Mechaniken zu einem überprüfbaren Spielablauf. Es ersetzt nicht die geplante kürzere Einführung mit Entlastungslevels und fein abgestufter Schwierigkeit. Die großen Referenzmotive dauern noch deutlich länger als fertige Anfangslevels sollten. Ein Haken ist ein lokal gespeicherter Abschluss, keine Bewertung von Schwierigkeit oder Spielspaß.

Schlüssel, Klammern, Doppeltransport und die spätere Abräumbonus-Stufe bleiben im Gesamtkonzept. Die spätere Stufe wird nicht ungeprüft zusätzlich eingebaut. Die Nutzerbestätigung „V2 ist gut“ ist für Eichelhut V2 dokumentiert; sie gilt nicht pauschal als Abnahme aller anderen Stationen.

## Nachweise

`tests/journey.cjs`: Zustandsvalidierung, alle sechs vollständigen Lösungen bei B, drei Auswahlstrategien für das neue versetzte Paar, abgewiesener Frühstart und atomare Rücknahme. `tests/journey-browser.cjs`: Erklärkarte/Pause, Klammerdarstellung und Freigabe, Einstellungsübernahme, echte vollständige Lösung, gespeicherter Fortschritt nach Neuladen, Ausschluss automatischer Tests und Weiter-Schalten.

Messwerte werden nach bestandenem vollständigen Durchlauf in `outputs/spielrunde-messwerte.json` ausgegeben und als [Referenzdaten](spielrunde-messwerte.json) dokumentiert. Zeiten sind Simulationswerte ohne Denkpausen, keine garantierten persönlichen Spielzeiten und keine Smartphone-Leistungsmessung.
