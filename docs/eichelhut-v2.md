# Eichelhut: Konturvergleich bei Verkehr B

Stand: 9. November 2026. Vergleichsfassung, keine neue Standardeinstellung und noch keine Spielerfreigabe.

## Spielbarer Vergleich

V1: `flow-v1-acorn-key`. V2: `flow-v2-acorn-key`, „Eichelhut · gezielte Bonusboxen“. Im Originalspiel unter „Eichelhut · Konturvergleich bei B“ umschaltbar. Beide Schaltflächen starten neu und setzen Verkehr B; alle anderen aktuellen Einstellungen bleiben erhalten.

Unverändert bleiben das Motiv mit 1573 Steinen, alle 47 Boxen samt Mengen und Reihenfolge sowie Schlüssel und Schloss. Vier schwarze Konturboxen erhalten die bereits vorhandene ×2-Regel: Auftrag 8 hinter dem Schloss sowie die späten Aufträge 42, 43 und 44. Der Bot kann zwei benachbarte gleichfarbige Steine transportieren; ohne passenden zweiten Stein bleibt es bei einem. Keine neue Mechanik, keine Geschwindigkeits- oder Pfadänderung.

## Messung

Deterministische Simulation, Zeitschritt 0,1 Sekunden, Bretttempo 130, zwölf ausfahrende/aufnehmende Bots pro Box, kein globales Limit, Startabstand 0,16 Sekunden pro Box, Öffnungszeit 0,35 Sekunden, Aufnahme 0,18 Sekunden. Doppelrahmen mit Abständen 2/1, Rückweg ab Aufnahme lokal festgelegt. Das sind Simulationssekunden bei 1×, keine gemessenen Browser-Wartezeiten. Drei Auswahlstrategien sind Stichproben, kein Beweis für jede mögliche Auswahlfolge.

| Auswahlstrategie | V1 gesamt | V2 gesamt | V1 letzte 10 % | V2 letzte 10 % | V1 nach letzter Auswahl | V2 nach letzter Auswahl |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Geplante automatische Folge | 215,7 s | 206,9 s | 24,6 s | 19,7 s | 12,6 s | 10,3 s |
| Größte erreichbare Menge bevorzugt | 188,0 s | 187,4 s | 19,2 s | 18,1 s | 9,3 s | 8,2 s |
| Letzte geeignete Auswahl bevorzugt | 222,8 s | 213,9 s | 16,5 s | 15,4 s | 8,6 s | 7,1 s |

Alle sechs Durchläufe lösen vollständig. Der Gewinn ist klein und abhängig von der Auswahlfolge. Das Level dauert weiterhin ungefähr drei Minuten; V2 löst dieses grundsätzliche Längenproblem nicht allein.

Die Schlüsselfreigabe bleibt unverändert: in der geplanten Folge bei 32,1 Sekunden, erste Nutzung der geöffneten Spalte bei 41,5 Sekunden. Die 9,4 Sekunden bis zum Nutzen bleiben ein weiterer Prüfpunkt. In den beiden anderen Folgen liegen Freigabe und Nutzung bei 53,3 und 57,2 Sekunden.

## Bewusst verworfene Versuche

Größere Boxen, veränderte Spaltenverteilung und eine frühere Schlüsselposition wurden ausprobiert. Sie waren über mehrere Folgen nicht verlässlich besser. Kleinere Endaufträge verkürzten teilweise nur die Zeit nach der letzten Auswahl, verschoben diese Auswahl aber nach hinten und erforderten zusätzliche Eingaben. Deshalb wurden sie nicht übernommen. Zwei weitere ×2-Boxen brachten im Referenzlauf nur etwa 0,4 Sekunden zusätzlich; die Fassung bleibt bei vier.

Die Skripte in `tools/experiments/` dokumentieren diese Designversuche und sind keine Abnahmetests: auch verworfene oder unlösbare Kandidaten werden dort untersucht.

## Prüfung und nächster Schritt

`tests/acorn-v2.cjs` prüft vollständige Lösungen, Mengen, Schlüssel und reproduzierbare Erzeugung. `tests/acorn-v2-browser.cjs` prüft Original-UI, B, identische Einstellungen und Motiv, Umschalten sowie Schlüssel/Rücknahme. Der vorhandene Katalog bleibt erhalten; V2 wird zusätzlich angelegt. Rohdaten: [Messwerte](eichelhut-v2-messwerte.json).

Verkehr B ist nach Nutzerfeedback die bevorzugte Grundlage weiterer Levelvergleiche. A und gespeicherte Nutzerprofile bleiben erhalten. Jetzt V1 und V2 mit denselben persönlichen Einstellungen spielen und beurteilen, ob die vier sichtbaren Bonusboxen den Ablauf tatsächlich angenehmer machen. Weitere Mechaniken werden daraus nicht automatisch abgeleitet.
