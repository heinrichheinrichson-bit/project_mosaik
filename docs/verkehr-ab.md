# Verkehr A/B · Wartephasen und Abschluss

9. November 2026. PC-Browser, Originalscreen. Die bisherigen Regeln und Einstellungen bleiben als Variante A erhalten.

## Was geändert wurde

**A – gesamte Runde:** Das Teamlimit zählt alle noch nicht abgelieferten Bots einer Box, einschließlich Rückweg. Das ist die bisherige Regel und bleibt der Standard bei alten gespeicherten Einstellungen.

**B – Hinweg und Aufnahme:** Das gleiche Limit zählt nur Bots, deren Aufnahme noch nicht abgeschlossen ist. Sobald ein Bot seinen Stein aufgenommen hat und zurückfährt, darf ein neuer Bot starten. Der Startabstand gilt weiterhin. Eine zusätzliche Gesamtgrenze zählt weiterhin alle unterwegs befindlichen Bots und wird nicht umgangen.

Damit steigen weder Fahrgeschwindigkeit noch Nutzlast. Wege, Einfahrt, Arbeitsplätze, Schatullenfolge, Mengen und Schlüssel bleiben gleich. Mehr Bots können gleichzeitig unterwegs sein; das ist der erkennbare Preis für weniger Startpausen. Das ist eine eigene Vergleichseinstellung, keine behauptete Konkurrenzregel.

## Wo umschalten?

Im Katalogbereich unter **Spielpaket · Fluss und Auswahl → Verkehr A/B**. Beide Schaltflächen übernehmen alle laufenden Einstellungen und ändern genau `teamLimitScope`. Sie starten das Rätsel neu; die aktive Variante erhält einen goldenen Rand. Gespeicherte Nutzerprofile werden dadurch nicht überschrieben.

Die gleiche Auswahl steht im gemeinsamen Einstellungseditor unter **Bewegung und Verkehr → Teamlimit zählt**. Sie wird beim Speichern/Exportieren der Einstellungen erhalten. Alte Einstellungen ohne das Feld verwenden A.

## Gemessener Vergleich

Gemeinsames Kernprofil: 130 Bildpunkte/s, 12 Bots je Box, kein Gesamtlimit, 0,16 s Startabstand je Box, 0,35 s Öffnung, 0,18 s Aufnahme, Freigabe nach Ausfahrt, getrennte Rahmenwege und lokaler Rückweg bei Aufnahme. Geplanter Solver, identische Motive und Schatullenfolgen. Simulationszeit ohne menschliche Denkpausen; keine garantierte Browser-Wandzeit.

| Messung | Wal A | Wal B | Eichelhut mit Schlüssel A | Eichelhut mit Schlüssel B |
| --- | ---: | ---: | ---: | ---: |
| Gesamtdauer | 118,5 s | 76,8 s | 289,8 s | 215,7 s |
| Nach der letzten Auswahl | 9,9 s | 8,8 s | 16,4 s | 12,6 s |
| Vom letzten Abtrag bis zum Ende | 2,2 s | 2,3 s | 2,1 s | 2,0 s |
| Beobachtete Spitze unterwegs | 43 | 49 | 48 | 60 |

Die Spitzen sind Stichproben im Abstand von 0,1 Simulationssekunden. Die deutlich größere Verbesserung liegt vor der letzten Auswahl. Der letzte Rückweg dauert bereits nur ungefähr zwei Sekunden; er wird nicht übersprungen oder vorzeitig als Lieferung gezählt. Auch B macht aus dem großen Eichelmotiv noch kein kurzes Ein-Minuten-Level.

Die JSON-Diagnose enthält außerdem `blockedBoxSeconds`: pro Box summierte Stichproben, bei denen das volle bisherige Rundenzähllimit allein durch Nichtmitzählen der Rückkehrer unterschritten wäre. Diese Zeiten können sich zwischen Boxen überlappen und zugleich mit anderen Wartegründen zusammenfallen. Sie sind weder reine globale Leerlaufzeit noch direkt eingesparte Sekunden.

## Prüfung und Grenzen

- Beide Referenzmotive mit A und B vollständig gelöst, gleiche Steinmengen.
- Hinweg-/Aufnahmegrenze, Überlappung mit Rückkehrern und unveränderte globale Grenze geprüft.
- Keine doppelten Reservierungen; korrekte Lieferung, Rückgängig und Übertragung der Einstellungen.
- Paar mit Bonusboxen bei allen drei Arbeitsplatz-Freigabemodi geprüft. Wenn kein zweiter Nachbar frei ist, bleibt Einzeltransport erlaubt.
- Konstantes Fahrtempo und bestehender per-Box-Startabstand regressionsgeprüft.
- Browser: A/B ändert nur das eine Feld, startet neu und zeigt aktive Wahl sowie passenden Einstellungswert.
- Alle 58 gemeinsamen Einstellungen im Originalscreen vorhanden; keine deaktivierten Felder oder Browserfehler im Einstellungsdurchlauf.

Noch offen: subjektiver Eindruck bei mehr Verkehr und Browserleistung während eines längeren manuellen Spiels. B wird deshalb nicht still als neuer Standard gesetzt. Es gibt keine zusätzliche Endspiel-Sonderregel.

Reproduktion: `tests/traffic-diagnosis.cjs`, `tests/team-limit-scope.cjs`, `tests/traffic-scope-browser.cjs`. Messdaten: `verkehr-ab-messwerte.json` im selben Dokumentationsverzeichnis.
