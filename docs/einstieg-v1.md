# Kleine Einstiegsrätsel · erste spielbare Folge

10. November 2026. Sechs zusätzliche Levelentwürfe im Originalscreen. Direktstart: `/?journey=intro#journeyPanel`. Die große Referenzrunde bleibt unter `/?journey=start` erhalten. Im Spielrundenbereich lässt sich zwischen beiden Kapiteln wechseln.

## Gestaltung und Regeln

Die Motive stammen aus den vorhandenen kompakten Atelier-Rasterfassungen mit 32 × 32 Feldern. Ihre Pixel und Paletten werden exakt übernommen, ohne neue Farben, Bildausschnitte oder Veränderungen der großen Originalmotive. Jede Einstiegsfassung hat eine eigene ID und eine neue, gezielt geprüfte Schatullenfolge. Persönliche Bearbeitungen anderer Fassungen werden nicht ersetzt.

Bevor neue Regeln hinzukommen, werden zwei reine Farbrätsel gespielt. Nach dem Schlüssel folgt eine normale Zwischenrunde. Erst danach kommen ein vorderes Klammerpaar und eine einzelne ×2-Schatulle. Die Erklärung erscheint pro Regel und Kapitel einmal; normale Folgerätsel verlangen keine erneute Bestätigung derselben Erklärung. Erklärungen sind erneut aufrufbar. Klammer-, Schloss-, Bot- und Brettgestaltung bleiben Bestandteil des bestehenden gemeinsamen Designs.

| Level | Motiv / ID | Entscheidung und sichtbarer Hinweis | Hilfreiche Folge | Vermeidbarer Fehler |
| --- | --- | --- | --- | --- |
| 1 | Sommerlaune / `intro-v1-icepop` | Schwarzer Umriss öffnet bunte Flächen; keine Sonderregel | Erst zugängliche Kontur, anschließend passende sichtbare Farbe | Eingeschlossene Folgefarben wählen und alle Stellplätze belegen |
| 2 | Freches Früchtchen / `intro-v1-pear` | Blatt, Frucht und Umriss brauchen passende Reihenfolge | Neu zugängliche Farbe nachlegen, einen Platz behalten | Eine wartende Box mit einer bereits arbeitenden Farbe verwechseln |
| 3 | Tee mit Schlüssel / `intro-v1-teapot-key` | Schlüssel in Reihe zwei, Kette an Spalte vier | Vorgänger wählen, Schlüssel auswählen, geöffnete Spalte nutzen | Den letzten Stellplatz belegen, bevor die Schlüsselbox gewählt werden kann |
| 4 | Süße Spritztour / `intro-v1-roller` | Normale Zwischenrunde ohne Sonderregel | Bekannte Farbzugänge selbstständig nutzen | Eine Zusatzregel suchen, die hier gar nicht vorhanden ist |
| 5 | Doppelt frech / `intro-v1-cherries-pair` | Beide verbundenen Schatullen stehen vorne | Kontur zugänglich machen, zwei Plätze freihalten, Paar gemeinsam wählen | Nur einen Platz für zwei verbundene Schatullen lassen |
| 6 | Wellenreiter / `intro-v1-orca-bonus` | Eine sichtbar markierte ×2-Box für die große schwarze Fläche | Zwei benachbarte schwarze Steine pro Fahrt abräumen | ×2 als zweite Farbe oder doppelte Botanzahl verstehen |

Die normale Portionsgröße wird pro Motiv abgestimmt. Überwiegend entstehen größere zusammenhängende Aufträge statt vieler kleiner Nachfüllschritte. Beim Orca fasst die einzelne ×2-Box 120 Steine der großen schwarzen Fläche; mit zwei Steinen pro Fahrt entspricht das höchstens 60 voll beladenen Fahrten. Diese gezielte Ausnahme ist kein Standard für normale Anfangsboxen. Kleine exakte Restmengen bleiben erhalten; Mengen werden nicht durch zusätzliche Motivpixel passend gemacht.

## Reproduzierbare Messung

Gemeinsamer Kern: 130 Bildpunkte/s, Verkehr B, zwölf ausfahrende/aufnehmende Bots je Box, kein globales Limit, Startabstand 0,16 Sekunden je Box, Öffnen 0,35 Sekunden, Aufnahme 0,18 Sekunden, Stellplatz frei nach letzter Ausfahrt. Getrennte adaptive Hin-/Rückwege mit Abständen 2/1. Keine Erhöhung von Geschwindigkeit oder Botlimit für diese Folge.

Die Tabelle enthält Simulationssekunden bei 1× ohne Denkpausen. Das Originalspiel projiziert dieselben Wege auf seine tatsächliche Bildschirmgeometrie; persönliche Einstellungen und Eingabepausen beeinflussen die tatsächliche Dauer.

| Motiv | Steine | Schatullen / Auswahlen | Geplanter Lauf | Andere geprüfte Folgen |
| --- | ---: | ---: | ---: | ---: |
| Sommerlaune | 300 | 12 / 12 | 55,8 s | 48,6 / 51,2 s |
| Freches Früchtchen | 368 | 12 / 12 | 52,3 s | 50,3 / 50,1 s |
| Tee mit Schlüssel | 342 | 10 / 10 | 58,5 s | 57,4 / 57,4 s |
| Süße Spritztour | 318 | 12 / 12 | 53,1 s | 51,8 / 51,3 s |
| Doppelt frech | 463 | 11 / 10 | 57,3 s | 60,1 / 63,5 s |
| Wellenreiter | 436 | 9 / 9 | 58,7 s | 57,5 / 65,6 s |

Alle 18 Durchläufe lösen vollständig. Das sind Stichproben legaler Auswahlfolgen, kein Beweis, dass jede beliebige Auswahl gewinnt. Das Schlüsselereignis liegt in allen drei Läufen bei 20,6 Sekunden und 19,9 % aufgenommenen Steinen. Erste tatsächliche Auswahl der geöffneten Spalte: 27,1 bzw. 28,6 Sekunden. Es gibt keine zusätzliche programmierte Wartezeit nach der Freigabe.

Ein identischer Orca-Kontrolllauf ohne ×2 dauert 74,3 statt 58,7 Sekunden. Das ist eine gemessene lokale Wirkung dieser Bonusposition, kein allgemeines Beschleunigungsversprechen.

Die Zeit nach der letzten Auswahl bleibt teilweise länger als zehn Sekunden: beispielsweise 17,1 Sekunden bei einer Sommerlaune-Folge und 18,8 Sekunden bei einer Orca-Folge. Die letzten zehn Prozent dieser Läufe dauern dagegen 7,1 und 10,7 Sekunden. Diese Auslaufphasen bleiben für die Spielerbewertung offen; sie werden nicht durch einen bedeutungslosen zusätzlichen letzten Tap kaschiert.

## Fortschritt und Prüfung

Einführung und Referenzrunde verwenden getrennte Speicherschlüssel und getrennte Abschlusshaken. Kapitelwechsel behalten die übrigen laufenden Spieleinstellungen. Nach Neuladen startet die zuletzt gewählte Station dieses Kapitels neu. Ein exakter laufender Zwischenstand wird weiterhin noch nicht gespeichert. Automatische Testlösungen bleiben vom selbst erspielten Abschluss getrennt.

`tools/build-intro.cjs` erzeugt reproduzierbar ausschließlich die sechs neuen IDs. `tests/intro.cjs` prüft Originalpixel, Mengen, alle 18 vollständigen Lösungen, Schlüssel-/Paarereignisse und einen zusätzlichen Bonus-Kontrolllauf. `tests/intro-browser.cjs` prüft Originalscreen, reale vollständige Lösung, Weiter-Schalten, Neuladen, unabhängige Kapitel, Einstellungen, Schlüssel/Rücknahme und atomaren Paarstart. Rohdaten: [Messwerte](einstieg-messwerte.json).

Nächste Abnahme: Verständlichkeit, Motivqualität in der tatsächlichen Spielansicht und empfundenes Tempo selbst spielen. Diese technische Prüfung ist noch keine Nutzerfreigabe und legt die endgültige Store-Reihenfolge nicht fest. Der spätere Abräumbonus sowie weitere zurückgestellte Konzeptpunkte bleiben im Hauptplan enthalten.
