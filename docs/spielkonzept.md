# Spielkonzept und verbindlicher Arbeitsplan

Stand: 5. November 2026 · Version 1

## Arbeitsgrundlage und Rückkehrpunkt

Der Nutzer hat die Ausarbeitung dieses Plans und anschließend die Umsetzung auf einem neuen Zweig autorisiert. Grundlage ist `master` bei Commit `afa492a`. Die Entwicklung erfolgt auf `feature/spielmechaniken`; master bleibt für die Rückkehr zum bisherigen Spiel erhalten. Kein Merge und keine neue APK sind Bestandteil dieser Freigabe.

Dieses Dokument ist die maßgebliche Planung. Der frühere Entwurf `spielkonzept-fluss-und-tempo.md` ist historische Vorarbeit, keine parallele Aufgabenliste. Neue Erkenntnisse werden hier eingetragen. Aufgaben werden erst nach Umsetzung und Prüfung abgehakt. Vorschläge sind keine bereits vorhandenen Funktionen.

## Leitbild

Schöne Mosaike durch verständliche Farbentscheidungen abtragen. Richtige Entscheidungen öffnen Zugänge, schaffen Platz und ermöglichen sichtbaren Fortschritt. Geordnete, natürliche Bewegung bleibt wesentlich. Reines Warten zählt nicht als Schwierigkeit. Kleine schnelle Motive wechseln mit größeren Planungsrätseln ab.

Das bevorzugte Originaldesign bleibt Grundlage: dunkler Hintergrund, sandfarbenes Spielfeld, zwei flache klare Treppenstufen, vorhandene Schatullen und Tunnelbucht. Keine neue alternative Spieloberfläche. Editor und Gestaltung auf dem PC; Smartphone nur Spiel, Katalog und separat erreichbare Testeinstellungen. Bestehende Motive und Nutzerdaten bleiben erhalten.

## Bestehende Grundregeln

- Ein normaler Bot holt einen Stein seiner Farbe über einen freien Zugang und liefert ihn ab.
- Vier aktive Stellplätze; davor vier Schatullenspalten mit verdeckten Folgepositionen.
- Schatullenmenge zählt Steine. Reservierungen dürfen keine Doppelabholung erlauben.
- Unabhängiger Startabstand pro Box. Globaler Abstand bleibt Vergleichsoption.
- Teamgrenze und Gesamtgrenze sind Testparameter, keine festgelegten endgültigen Spielregeln. Ausgangsvergleich ohne zusätzliche Gesamtbegrenzung; kein künstliches Limit als angeblich bewährte Konkurrenzregel darstellen.
- Arbeitsplatzfreigabe und Pfade verwenden die vorhandenen Einstellungen. Mechaniktests verändern sie nicht stillschweigend.
- Rückgängig, Hinweis, Neustart und Vorspulen bleiben erhalten. Automatischer Solver ist Testhilfe.

## Erste Mechanikfassung

### M1: Schlüsselstein und verschlossene Auswahlspalte

Ein bestehender Stein trägt ein klar erkennbares Schlüsselsymbol. Seine erste erfolgreiche Aufnahme öffnet eine bezeichnete Auswahlspalte sofort, ohne zusätzliche Wartezeit oder zweite Fahrt. Steinfarbe, Steinmenge und normale Abholregeln bleiben bestehen. Gesperrte Spalte und zugehöriger Schlüssel erhalten dieselbe Kennzeichnung; Farbe allein genügt nicht.

Die erste Studie verwendet eine verschlossene der vier vorhandenen Spalten, keine zusätzliche fünfte Spalte. Freie Stellplätze bleiben vier. Der Schlüssel muss über die anfangs verfügbaren Farben erreichbar sein. Keine Zufallsplatzierung in bestehenden Motiven. Referenzversion desselben Testmotivs ohne Sperre zum Vergleich.

Prüfung: Spalte vorher nicht wählbar; Aufnahme öffnet genau einmal; Lieferung nicht erforderlich; kein falscher Schlüssel; Rückgängig stellt Sperre und Schlüsselzustand wieder her; Speichern/Export/Import/Spielübergabe erhalten Daten; ein vollständiger Lösungsweg vorhanden. Hinweis und Solver berücksichtigen Sperren.

### M2: Verbundene Schatullen

Zwei konkret verknüpfte Schatullen werden gemeinsam gewählt und belegen atomar zwei freie Stellplätze. Bei nur einem freien Platz startet keine von beiden. Danach arbeiten und schließen beide unabhängig ab. Mengen und Farben können verschieden sein. Eine sichtbare Verbindung erklärt das Paar vor der Auswahl.

Erste Studie: beide Partner gleichzeitig vorn in zwei Spalten; keine versteckte Partnersuche tief in einer Warteschlange. Eine Auswahl und ein Rückgängig-Schritt für das gesamte Paar. Partner dürfen nicht einzeln durch Hinweis oder automatischen Test gestartet werden.

Prüfung: null/ein/zwei freie Plätze; unterschiedliche Mengen; unabhängige Freigabe; Wartezustand einer Farbe; Rückgängig; Serialisierung; vollständige Lösbarkeit.

### M3: Bonus-Schatulle mit Doppeltransport

Besonders markierte Schatulle: maximal zwei gleichfarbige Steine pro Fahrt. Normale Schatullen bleiben bei einem. Die zweite Aufnahme ist nur erlaubt, wenn sie nach der ersten über die normalen Zugangsregeln erreichbar ist; keine fremden Farben durchdringen und keine entfernten Steine überspringen. Nur unmittelbar benachbarte Steine bilden das erste Testpaket. Restmenge eins ergibt Einzeltransport.

Beide Zielsteine müssen vor Start eindeutig reserviert werden. Mengen, Fortschritt und Gewinn zählen Steine, nicht Fahrten. Optisch kompaktes Doppelpaket ohne Verdoppelung der Figurengröße. Kein Geschwindigkeitsbonus zusätzlich. Erste Studie getrennt vom Schlüssel; Kombination erst nach bestandenem Einzeltest.

Prüfung: ungerade Mengen, fehlender zweiter Stein, konkurrierende Teams, tatsächliche Erreichbarkeit, keine Doppelreservierung, exakte Mengen, Lieferung beider Steine, Rückgängig, gleicher Levelvergleich mit Einzeltransport. Erst danach als mögliche Schlüsselbelohnung kombinieren.

## Später wieder aufgreifen

| ID | Idee | Status und Bedingung |
| --- | --- | --- |
| M4 | Verdeckte Schatullen | Zurückgestellt. Nur Folgepositionen verborgen; vor unmittelbarer Auswahl sichtbar. Fairness und Hinweise prüfen. |
| M5 | Versiegelter Motivbereich mit Werkzeugstein | Zurückgestellt bis M1–M3 bewertet. Muss neue Zugänge belohnen; keine bloße Wartebarriere. |
| M6 | Kleine zusätzliche Bildebene | Zurückgestellt. Vorankündigung nötig; zusätzliche Steinmenge ins Zeitbudget rechnen. |
| M7 | Pakete mit drei/vier Steinen | Offener Versuch erst nach M3; nicht automatisch auf alle normalen Bots übertragen. |
| P1 | Abschlussanimation und nächstes Rätsel | Nach Mechanikprüfung: kurze klare letzte Lieferung, kein langer zusätzlicher Warteabschluss. |
| P2 | Motivsammlung/Themenfortschritt | Spätere Produktphase; keine Monetarisierungs- oder Freischaltpflicht derzeit. |

Vorerst ausgeschlossen: Timer, reine Wartezeitsperren und mehrfach zu treffende Standardsteine. Keine Kombination mehrerer unbekannter Sonderregeln im ersten Testlevel.

## Technische Umsetzung

Gemeinsamer PlaySession-Kern für Originalspiel und Editor. Optionale versionierte Mechanikdaten im Motivdokument; alte Dokumente ohne diese Daten spielen unverändert. Mechanikzustand gehört in Spielstände und Rückgängig-Snapshots. Import validiert Koordinaten, IDs, Verknüpfungen und Mengen. Automatische Warteschlangen dürfen keine Mechanikdaten still löschen. Rasterwechsel mit markierten Steinen benötigt eine explizite Behandlung, keine ungeprüfte Koordinatenübernahme.

Studien erhalten eigene IDs und Kategorie; bestehende Motive werden nicht ersetzt. Auswahl, Hinweise, automatische Lösung und Spielübergabe müssen dieselben Regeln verwenden. Der Editor erhält passende Kennzeichnungen und Bearbeitungsmöglichkeiten pro eingeführter Mechanik. Erst nach Übergabeprüfung gilt eine Mechanik als fertig.

## Reihenfolge und Aufgaben

- [x] B0: Ausgangsstand `afa492a` festhalten und Entwicklungszweig erstellen.
- [x] B1: Konzept, Regeln, Prüfkriterien und zurückgestellte Ideen dokumentieren.
- [x] B2: Testauswertung für Simulationsdauer, Fortschritt und aktive Bots implementieren und prüfen.
- [ ] B3: Sechs feste Referenzmotive und identische Vergleichseinstellungen dokumentieren; kleine/mittlere/große und offene/geschlossene Formen.
- [x] M1a: Datenformat, Schlüsselzustand und Spaltensperre im gemeinsamen Kern.
- [x] M1b: Original-UI, Editor, Hinweis/Solver, Import/Export und eigene Vergleichsstudie.
- [ ] M1c: Regeltests und vollständiger Spieldurchlauf; Nutzerbewertung festhalten.
- [ ] M2a: Paar-Daten und atomarer Doppelstart mit Rückgängig.
- [ ] M2b: Sichtbare Verknüpfung, Editor und vollständige Vergleichsstudie.
- [ ] M3a: Doppelreservierung, legale zweite Aufnahme und exakte Mengenabrechnung.
- [ ] M3b: Lesbare Darstellung, Editor und Zeitvergleich.
- [ ] K1: Nach Einzelprüfungen Schlüssel + Bonus in einem gestalteten Rätsel kombinieren.
- [ ] K2: Abwechslungsreiche kurze Testfolge; Regeln einzeln einführen und menschlich spielen.
- [ ] K3: Ergebnisse mit Nutzer bewerten; anschließend M4–M6 ausdrücklich wieder aufgreifen oder begründet streichen.

Jeder Baustein erhält einen separaten Commit. Nach Unterbrechung hier und im Arbeitsstand nachsehen; nicht erneut ein alternatives Konzept beginnen. Bei geänderter Reihenfolge den Grund im Entscheidungsprotokoll notieren.

## Test und Bewertung

Automatische Lösbarkeit und angenehmes menschliches Spielgefühl sind getrennte Kriterien. Erfassen: Simulationsdauer bei 1×, tatsächliche Wallclock/FPS gesondert, abgelieferte Steine, aktive Bots und deren Spitze, Stillstände ohne Fortschritt. Keine Hochgeschwindigkeitssimulation als Mobilperformance ausgeben. Zwei bis drei Minuten für mittlere Rätsel sind eine vorläufige Zielrichtung, kein nachgewiesenes Optimum oder verbindliches Versprechen.

Vergleich immer mit identischen Motiven, Mengen, Startbedingungen und Bewegungseinstellungen; je Versuch nur die untersuchte Mechanik ändern. Bestehende manuelle Erreichbarkeit, feste Laufpfade, natürliche Ausfahrt, zwei Stufen und Nutzereinstellungen regressionsprüfen. Smartphoneleistung erst auf Gerät messen. APK erst auf ausdrückliche Anforderung.

## Entscheidungsprotokoll

- 2026-11-05: Nutzer autorisiert dokumentierten Plan, danach Bau auf neuem GitHub-Zweig. Reihenfolge B2, M1, M2, M3.
- 2026-11-05: Globaler Startabstand war unbeabsichtigte Bremse, bereits vor diesem Zweig korrigiert. Bunte Balance: 412,8 s global gegen 329,6 s je Box, 1999 Steine, 90 px/s, 0,16 s, Team128/Gesamt0. Ruhige Grenze24: 571,2 s. Einzelvergleich, kein allgemeines Tempoergebnis.
- 2026-11-05: Keine belastbare Aussage über Bot-Obergrenzen in Food Hunt. Unsere Grenzen sind eigene Testparameter.

## Nächster konkreter Schritt

B2 abgeschlossen: aufklappbare Testauswertung im Originalscreen, gemeinsamer Telemetrie-Kern und Tests für Fortschritt, aktive Bots und Rückgängig. B3 und danach M1a beginnen. Offene Gestaltungsdetails innerhalb der oben festgelegten Studien ausarbeiten und protokollieren.

### Umsetzung M1 am 5. November

Spielbare Studien `study-key-on` und `study-key-off` ergänzt, vorhandenes Eichelmotiv als identischer Bildaufbau. Schlossspalte2, markierter schwarzer Stein am linken Fuß; Start mit schwarzer Box. Sperre, Hinweisfilter und automatischer Test verwenden dieselbe Regel. Schlüssel öffnet bei Aufnahme. Eigener Rückgängig-Zustand, validierte optionale Motivdaten. PC-Editor: Schlüsselkoordinaten und Zielspalte setzen/entfernen, JSON erhalten; Rasterwechsel mit Markierungen wird abgelehnt. Nutzerbewertung M1c bleibt offen. Vollständiger Test 1573 Steine sowie Browser-Sperre, Aufnahme vor Lieferung und Rückgängig bestanden. Noch keine verbundenen oder Bonus-Schatullen implementiert.

### Spielerverständlichkeit M1

Goldener Schlüsselmarker mit Zeiger auf den Zielstein; einheitliches gezeichnetes Schloss statt Emoji und technischer Spaltennummer. Gesperrter Nachschub als zusammenhängender Bereich, kurzer Spielhinweis ohne zusätzliche Bildschirmhöhe. Bei Aufnahme fliegt ein Schlüssel zum Schloss; Bereich wird sofort nutzbar und kurz hervorgehoben. Animation blockiert keinen Verkehr; reduzierte Bewegung wird berücksichtigt. Browserprüfung: Sperre, freigegebene Auswahl, Rückmeldung, Fluganimation und Rückgängig. Titel im Spiel: Der goldene Schlüssel.

### Korrektur Abgabeanfahrt und Ausrichtung

Die Bildschirmprojektion verzerrte die im Raster geglättete Anfahrt bis in Parkplätze und Seitenwände. Gemeinsamer Editor-/Original-Connector richtet die Rückfahrt jetzt oberhalb von Parkplatzoberkanten und Garagenmund mittig aus. Die letzte Strecke liegt gerade auf der Fahrbahnmitte. Die Figur folgt der gemessenen Rückkurve mit konstantem Projektionsabstand statt einer Frame-Historie und richtet sich nach ihrer lokalen Kurventangente statt zur Ladung aus. Kein zusätzlicher Stopp. Browserregression: sieben Richtungen, 1407 Positionsproben mit Hindernisabstand, 184 Tangenten-/Wiederholungsproben, 89,50–90,46 px/s bei Vorgabe90. Normale Originalgrößen geprüft; extrem vergrößerte Figuren können weiterhin breiter als die physische Fahrbahn sein. Ausfahrt aller vier Slots in fünf Pfadmodi und Spielübergabe bestehen.

### Einfahrtsspuren

Unter Aufnahme und Einfahrt stehen Mittig, 2 Spuren und 3 Spuren zur Auswahl. Drei ist die neue Vorgabe für diesen Vergleich; explizit gespeicherte Auswahl bleibt erhalten. Die Anfahrtsseite bestimmt den Versatz, der pro Bot beim Planen festgelegt und bei Rückweg-Neuberechnung beibehalten wird. Einfahrt hinter der Abdeckung bleibt auf derselben Spur, ohne erneutes Zentrieren. Verfügbarer Versatz aus schmalster Fahrbahnbreite abzüglich Bot-/Würfelausdehnung und Sicherheitsrand; bei zu wenig Breite Zusammenfallen zur Mitte. Optische Spuren, keine neue gegenseitige Bot-Kollisionsregel. Gemeinsame Einstellung und Transportlogik für Editor und Originalspiel. Browser: alle drei Varianten, Links/Mitte/Rechts, Wandabstand, feste Spur bei Neuplanung, kein Zentrieren bei Einfahrt; bisherige Geschwindigkeits-/Parkplatz-/Ausrichtungsprüfung besteht. Alle52 Optionen im Originalscreen vorhanden.
