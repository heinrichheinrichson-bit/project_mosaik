# Spielkonzept und Arbeitsplan

Stand: 10. November 2026 · Version 4.4 · ausgearbeitete Designentscheidung, noch keine behauptete Spielfreigabe

## 1. Geltung und Ziel

Dieses Dokument definiert eine zusammenhängende erste Spielfassung. Es ersetzt die widersprüchlich gewordenen Zwischenstände, ohne deren Inhalte zu löschen: [Historie bis Version 3](archiv/spielkonzept-bis-v3.md). Die [Recherche](vergleichsspiele-recherche.md) bleibt die Quellen- und Evidenzsammlung. Beobachtete Konkurrenzregeln, unsere bewussten Abweichungen und noch nicht umgesetzte Funktionen werden getrennt behandelt.

Der Spieler betrachtet ein schönes Mosaik, erkennt erreichbare Farben, entscheidet sich für Schatullen und sieht seine Planung durch flüssig arbeitende Bots aufgehen. Das Bild ist der Hauptinhalt. Die Schwierigkeit entsteht durch Zugänge, Mengen und die Reihenfolge des Nachschubs. Warten, lange Laufwege oder schlecht erkennbare Zustände sind keine Rätselschwierigkeit.

Die erste Fassung umfasst **Grundspiel, Schlüssel-Schatulle, verbundene Paare und einzelne Doppeltransport-Schatullen**. Diese vier Bausteine werden zu konkreten Leveln ausgearbeitet. Sie werden nicht nach jedem misslungenen Designversuch grundsätzlich infrage gestellt. Aus Beobachtungen dürfen spätere begründete Änderungen entstehen; sie müssen hier dokumentiert werden.

Ein Konzept kann eindeutig sein, bevor endgültige Tempowerte und Spielspaß auf dem Gerät bestätigt sind. Die unten genannten Zahlen sind ausdrücklich unsere Ausgangsziele. Sie sind weder Konkurrenzwerte noch bereits erreichte Messwerte.

## 2. Unveränderte Grundlage

- Originaldesign: dunkler Hintergrund, sandfarbenes großes Brett, zwei klare flache Stufen, bestehende Schatullen, vier Stellplätze und mittige Tunnelbucht.
- Vier Auswahlspalten; drei sichtbare Schatullen pro Spalte und Zahl des weiteren Nachschubs. Nur die vorderste freie Schatulle ist wählbar. Folgepositionen bleiben leicht ausgegraut, aber ihre Farben und Mengen erkennbar.
- Kein PC-Editor auf dem Smartphone. Dort nur Spiel, Katalog und separat zugängliche Testeinstellungen. Editor, Export und Originalspiel verwenden dieselben Motive und Regeln.
- Alle Motive und persönlichen Bearbeitungen erhalten. Neue Varianten haben eigene IDs. Alte Studien werden als Studien eingeordnet, nicht still zu fertigen Levels erklärt.
- Entwicklung auf `feature/spielmechaniken`; Ausgangsstand `master` bei `afa492a`. Kein Merge und keine APK durch diese Konzeptarbeit.

## 3. Exakte Grundregeln

### Auswahl und Arbeit

1. Eine ausgewählte Schatulle belegt einen freien Stellplatz. Die Auswahlspalte rückt sofort nach; die neue vordere Schatulle kann gewählt werden, sobald ein Stellplatz frei ist.
2. Ihre Zahl ist eine **Steinmenge**, nicht eine Botanzahl. Pro Fahrt transportiert ein normaler Bot einen Stein derselben Farbe. Für jeden transportierten Stein gibt es genau eine Reservierung.
3. Ein Stein ist erreichbar, wenn ein freier Weg von außen bis zu einer orthogonal angrenzenden Zelle besteht. Freigeräumte Innenwege sind erlaubt. Keine diagonalen Durchgänge durch berührende Ecken und kein Durchfahren verbleibender Steine.
4. Eine Farbe darf gewählt werden, obwohl nur ein Teil ihrer Menge zugänglich ist. Sie wartet auf neue Zugänge. Die Auswahl ist eine Verpflichtung; das Spiel korrigiert die Entscheidung nicht heimlich.
5. Neue Zugänge aktivieren wartende passende Teams ohne weiteren Tap. Es gibt keine angehängte Wartezeit.
6. Der Stellplatz wird frei, sobald der letzte Bot dieser Schatulle die Box verlassen hat. Solange noch nicht gestartete Steine offen sind, bleibt sie dort. Rückkehrende Bots benötigen keinen Stellplatz. Diese Regel übernimmt die schnelle vorhandene Ausfahrtfreigabe als unsere bewusste Festlegung; sie ist keine behauptete identische Regel aller Vorbilder.
7. Der kleine aktive Zähler zeigt die noch nicht ausgerückte Steinmenge. Fortschritt oben zählt erst tatsächlich gelieferte Steine. Bei Freigabe verschwindet die aktive Box, auch wenn ihre letzten Bots noch zurückkehren.

### Gewinn, Stillstand und Hilfe

Gewonnen ist erst nach Lieferung aller Steine und eventuell vorhandener Boden-Schlüssel. Keine zusätzliche Nacharbeit oder lange Erfolgspause. Keine automatische Auswahl weiterer Schatullen im normalen Spiel; Automatik bleibt ein Testwerkzeug.

Ein unbewegter Bot oder eine wartende Box bedeutet nicht sofort Niederlage. Solange ein Bot arbeitet, eine Lieferung aussteht, ein Schlüsselereignis bevorsteht oder eine erreichbare Farbkette normal weiterarbeiten kann, ist es kein endgültiger Stillstand. Endgültig blockiert ist der Zustand erst, wenn kein solcher Fortschritt mehr möglich ist und keine legale Auswahl Fortschritt eröffnen kann. Ein nicht startbares Paar allein ist kein Niederlagengrund.

Rückgängig nimmt eine ganze Auswahl einschließlich ihrer Folgewirkungen zurück. Ein Paar ist ein Schritt. Schlüssel und Lieferzustände werden mit restauriert. Hinweis zeigt eine sinnvolle legale Auswahl; er darf nicht nur einem versteckten ursprünglichen Plan folgen und alternative erreichbare Steine ignorieren. Kein Timer, keine Leben und kein Pflichtbooster im Kernkonzept.

### Bewegung

Vorhandene natürliche Nordausfahrt, abgerundete Übergänge, geordnete adaptive Hin-/Rückwege und feste Einfahrtsspur pro Bot bleiben Grundlage. Eine begonnene Strecke springt nicht wegen anderer Abholungen nach innen. Nur die blaue Fahrbahn des Einfahrtmoduls ist befahrbar; Ladung verschwindet vor dem Bot hinter der Abdeckung. Kameraruck, Schwenken oder Pfadfehler werden nicht als Regel kaschiert.

## 4. Schlüssel-Schatulle: ein Ziel in der Auswahlfolge

### Standardregel der ersten Fassung

- Eine normale Farbschatulle trägt zusätzlich einen gut erkennbaren Schlüssel. Eine konkret zugeordnete Auswahlspalte ist an ihrer vordersten Position mit Kette und Schloss blockiert. Die Sperre verbraucht keinen Stellplatz.
- Der Schlüssel gehört zu genau diesem Schloss. Keine Zufallszuordnung oder unsichtbare Links-nach-rechts-Priorität. Form/Kennzeichnung erklären die Zuordnung zusätzlich zur Farbe.
- Die Schlüssel-Schatulle kann in Reihe 2 oder 3 beginnen. Man muss die Schatullen davor sinnvoll wählen, damit sie nachrückt.
- **Die erfolgreiche Auswahl der Schlüssel-Schatulle löst die Freigabe aus.** Es muss ein Stellplatz frei sein; ein abgewiesener Tap öffnet nichts. Der Schlüssel fliegt kurz zum Schloss, die Sperre verschwindet sofort logisch, die Animation blockiert die Auswahl nicht.
- Die Farbschatulle arbeitet danach normal weiter. Ihr Schlüssel ist keine zusätzliche Steinmenge, erzeugt keinen weiteren Bot und verlangt keinen zweiten Bestätigungstap.
- Bei einem Paar mit Schlüssel werden erst beide Stellplätze atomar zugeteilt, dann wird entsperrt. Die Freigabe darf nicht rückwirkend einen illegalen Paarstart ermöglichen. In den ersten Referenzlevels werden Paar und Schlüssel jedoch getrennt eingeführt.

### Warum diese Festlegung

Ein Food-Hunt-Levelbericht beschreibt einen Schlüssel an einer nachrückenden Schatulle; Knit Out bestätigt Schlüssel-Sperren grundsätzlich. Unser genauer Auslöser ist eine Designentscheidung: sichtbar, leicht erklärbar und ohne zusätzliche Fahrt. Das Originalmotiv bleibt unversehrt. Die Entscheidung lautet: „Welche vorderen Boxen wähle ich, um an den Schlüssel zu kommen, und halte ich dafür Platz frei?“

### Levelgestaltung

Die Schlüsselroute muss mit den offenen Spalten funktionieren. Mindestens eine bald nützliche Farbe hinter dem Schloss macht das Öffnen lohnend. Der Schlüssel darf nicht alle nötigen Farben zum eigenen Öffnen einsperren. Vor Auswahl sind Schlüssel und Nutzen der gesperrten Spalte sichtbar.

Für die ersten Beispiele wird eine Freigabe bei ungefähr 15–35% abgetragenen Steinen angestrebt. **Das ist ein Gestaltungsziel, kein prozentgesteuerter Spielauslöser.** Gemessen wird der tatsächliche Zeitpunkt im vollständigen Durchlauf. Bei Einführung höchstens eine Sperre. Eine fast vollständige Lösung mit drei Spalten wie in der Schleifenstudie gilt nicht als gelungenes Schlüssellevel.

### Erhaltene Bodenvariante

Der vom Nutzer gewünschte Boden-Schlüssel bleibt als alternative Studie erhalten: Gegenstand in natürlicher Freifläche, neutraler Bot nach freiem Zugang, Öffnung erst nach Lieferung. Keine nachträglich ausgeschnittenen Gesichter und keine überdeckten Motivdetails. Er ist kein zufällig zwischen Varianten wechselnder Standard. Beide Regeln erhalten getrennte Studientitel. Ein späterer Einsatz dieser Variante benötigt einen ausdrücklich dafür gebauten Levelentwurf mit frühem Zugang.

## 5. Verbundene Paare: zwei Plätze bewusst einsetzen

- Genau zwei markierte Schatullen in unterschiedlichen Auswahlspalten gehören zusammen. Beide können in verschiedener Tiefe liegen.
- Start erst, wenn beide vorne und beide Spalten frei sind sowie zwei Stellplätze verfügbar sind. Auswahl einer startet beide atomar. Sonst keine Teilbewegung.
- Danach arbeiten sie unabhängig. Jede gibt ihren eigenen Stellplatz nach der normalen Ausfahrtregel frei. Kein gemeinsames Warten auf den langsameren Partner.
- Die eckige Verbindung erklärt das Paar in der Auswahl. Nach gemeinsamer Auswahl ist sie gelöst; sie verspricht keine physische Verbindung der fahrenden Bots.
- Farben und Mengen dürfen verschieden sein. Alle Steinmengen bleiben exakt erhalten.

Die Entscheidung lautet: „Sind zwei Plätze für diese Farbkombination sinnvoll, und wann öffne ich den Zugang zum tieferen Partner?“ Gute frühe Paare verbinden eine sofort nützliche Farbe mit einer nach deren Abtrag zugänglichen kleinen Folgefarbe. Kein Paar aus zwei unzugänglichen Farben ohne erkennbare Möglichkeit, daneben weiterzuarbeiten. Versetzte Partner erst nach einem verständlichen Beispiel mit beiden vorne.

Knit Out belegt gekoppelte Auswahl. Ein unabhängiger Pixel-Flow-Bericht beschreibt zusätzlich gemeinsames Belegen bis zum Abschluss beider Partner. Diese stärkere Bremse übernehmen wir ausdrücklich nicht. Das ist eine begründete Abweichung für unseren Spielfluss.

## 6. Doppeltransport: eine lokale Belohnung

- Nur ausgewählte Schatullen tragen das neutrale ×2-Schild. Eine normale Box bleibt normal. Das Symbol bezeichnet Nutzlast, keine zweite Farbe und keine doppelte Botanzahl.
- Ein Bot reserviert höchstens zwei gleichfarbige, orthogonal benachbarte Steine. Nach Entfernung des ersten muss der zweite über die frei gewordene Zelle erreichbar sein. Keine entfernten Steine zusammenziehen, keine fremde Farbe durchdringen.
- Ohne legalen zweiten Stein oder bei Restmenge eins wird ein Stein geholt. Kein Warten auf ein perfektes Zweierpaket.
- Zahl und Fortschritt zählen Steine; beide Reservierungen, Aufnahmen, Lieferungen und Rückgängig sind korrekt abzurechnen. Kein zusätzlicher Geschwindigkeitsmultiplikator.

Die Box belohnt das Erreichen einer nützlichen Farbe mit weniger Fahrten und sichtbarem Abräumen. Nicht jedes Auftreten muss eine eigene schwere Denksportaufgabe sein. Sie dient auch der Entlastung zwischen Entscheidungen. Gelegentlich steckt sie hinter dem Schlüssel und ist Teil dessen Belohnung. Alle-Boxen-×2 bleibt ein technischer Vergleich, kein endgültiges Levelrezept.

Diese genaue Regel ist unsere Umsetzung, kein nachgewiesener identischer Konkurrenzstandard. Ihr Zeitnutzen wurde bisher an einem Motiv gemessen; allgemeiner Spielspaß ist noch zu prüfen.

## 7. Schatullenfolge ist Leveldesign

Motiv, Farben, Mengen, Zugänge und Auswahlreihenfolge werden gemeinsam geprüft. Ein automatischer Generator liefert einen Entwurf, kein fertiges Rätsel. Schwarze Umrisse bleiben schwarz; die Gestaltung wird nicht für eine buntere Startauswahl beschädigt.

Vorrangige Füllmengen für neue Entwürfe: 10/20/30/40/50/60. Mengen 5 und kleine Restmengen sind erlaubt, wenn ein kurzer Zugang oder ein echter Restabschnitt sie begründet. Keine Mengen erzwingen, die blockieren; keine bloße Zufallsvariation von 19/21/34 als Ersatz für Gestaltung. Die Summe jeder Farbe entspricht exakt dem Mosaik. Keine überschüssigen Pflichtboxen nach vollständigem Abtrag.

Größere zusammenhängende Farbflächen bekommen weniger, sinnvoll größere Boxen. Kleine Boxen dienen als schnelle Brücken zu neuen Möglichkeiten. Eine große Box darf warten, aber daneben muss eine verständliche weiterführende Auswahl möglich sein.

Die vordere Auswahl soll in normalen Levels mindestens zwei ernsthaft nutzbare Optionen anbieten. Gleiche Farbe in einer Spalte drei Positionen hintereinander nur mit nachvollziehbarer Abräumfunktion; keine flächendeckenden schwarzen Dauerspalten aus Bequemlichkeit des Generators. Wenn die Bildstruktur nur eine Anfangsfarbe erlaubt, wird das als gezielte kurze Einführung gestaltet und nicht durch eine unlösbare Farbmischung verdeckt.

Aktueller Iststand als Anlass: Wal460Steine/27Boxen, Eichelhut1573/81, Schleife1640/84, Tag trifft Nacht1831/95, Bunte Balance1999/100. Diese Werte wurden am 6.11. aus dem Katalog gelesen. Sehr viele kleine Boxen erzeugen sehr viele Auswahlen. Neue Folgen werden deshalb zusätzlich nach Eingabezahl und Fortschritt pro Auswahl bewertet. Bestehende Folgen bleiben bis zur geprüften neuen Variante erhalten.

## 8. Tempo und Spielfluss

### Ausgangsprofil für reproduzierbare Vergleiche

130 Bildpunkte/s, 1×, Startabstand 0,16s **je Box**, Öffnung 0,35s, Aufnahme 0,18s, zwölf Bots gleichzeitig je Box, keine zusätzliche globale Botgrenze, Freigabe nach letzter Ausfahrt. Bestehende Bewegungs- und Größenprofile werden als vollständiger benannter Vergleich gespeichert, nicht still über Nutzereinstellungen geschrieben. Dieses Profil ist ein Messstart, keine erwiesene optimale Veröffentlichungseinstellung.

Ruhigeres Profil und freie Botzahl bleiben im Testeditor verfügbar. Ein Botlimit dient der Darstellung/Leistung, nicht dem Erzwingen einer schlechten Wartephase. Die aktuelle Entwicklung und Prüfung findet ausschließlich im PC-Browser statt; keine APK und keine Smartphone-Prüfung. Eine korrekt zur vergangenen Zeit laufende Simulation bleibt erforderlich.

Nach dem funktionalen Nutzerfeedback zum ersten Paket wurde [Verkehr A/B](verkehr-ab.md) ergänzt: A zählt alle Bots einer Box bis zur Lieferung, B nur bis zum Ende der Aufnahme. Die globale Grenze bleibt in beiden Fällen eine Grenze aller Bots. B verändert keine Wege oder Geschwindigkeiten, kann aber mehr Rückkehrer gleichzeitig zulassen. Alte Einstellungen und der bisherige Standard bleiben A; B ist eine bewusst wählbare Studie. Beide Referenzläufe werden getrennt von der subjektiven Spielerbewertung geführt.

### Eigene Zielkorridore bei 1×

| Typ | Ziel für flüssige Lösung ohne lange Denkpausen | Richtwert bewusster Auswahlen |
| --- | --- | --- |
| Einführung / kleines Motiv | 30–60 Sekunden | etwa 10–20 |
| Normales Rätsel | 60–120 Sekunden | etwa 20–40 |
| Größeres Anspruchsrätsel | 120–180 Sekunden | etwa 35–60 |

Das sind Entwicklungsziele, keine bewiesenen Marktstandards und keine Spielerzeitlimits. Ein umfangreiches Motiv darf diese Ziele nicht durch unlesbar rasende Bots erzwingen. Zuerst unnötige Boxaufteilungen, Unterbeschäftigung und Wege prüfen, danach erlaubte Mengen/Bonusanteile/Rastervarianten. Ein hochwertiges großes Sondermotiv kann bewusst länger sein, muss dann als solches eingeordnet werden.

Messbar sind: Gesamtzeit, Zeitpunkt letzter Auswahl, reine Auslaufphase, beschäftigte/wartende Plätze und Zeiträume ohne mögliche nützliche Eingabe. Mehr als zehn Sekunden reine Auslaufphase nach der letzten Auswahl wird geprüft. Ein geschlossener Wartezustand mit voll belegten Plätzen und mehr als fünf Sekunden ohne Abtrag trotz laufender Simulation wird untersucht; weder diese Prüfgrenzen noch Denkpausen sind automatische Niederlagen.

## 9. Levelaufbau und Einführung

Jedes neue Level bekommt vor seiner Umsetzung einen kurzen Entwurf mit einer benannten Entscheidung, ihrem sichtbaren Hinweis, einer absichtlichen hilfreichen Folge und einer vermeidbaren schlechten Folge. Mindestens ein vollständiger Lösungsweg und bewusst abweichende Auswahlen werden getestet. Der bekannte Solverweg allein beweist keine Fairness.

Aufbau: kurze verständliche Eröffnung → erste neue Möglichkeit → Entscheidung um Platz/Farbe oder Sonderregel → größerer sichtbarer Abtrag → kurze Auflösung. Nicht jede Phase benötigt eine Sonderfunktion.

Für die erste neue Folge:

Spielbarer Entwurf vom 10. November: [Kleine Einstiegsrätsel V1](einstieg-v1.md). Zwei normale Motive, Schlüssel, normale Zwischenrunde, vorderes Paar und einzelne ×2-Box sind als separates Kapitel umgesetzt. Alle sechs Referenzläufe liegen bei 52–59 Simulationssekunden ohne Denkpausen; zwei weitere Auswahlstrategien je Level lösen ebenfalls. Die größere Referenzrunde und ihre Abschlussdaten bleiben erhalten. Die folgende Reihenfolge bleibt das übergeordnete Lehrziel, einschließlich späterer Vertiefung und Kombination:

1. Zwei normale kurze Rätsel zum Lernen von Farbzugang und Arbeitsplatz.
2. Erstes Schlüssellevel mit sichtbarem Schlüssel in Reihe2; die geöffnete Spalte hilft sofort.
3. Ein normales Entlastungslevel ohne Sperre.
4. Erstes Paar mit beiden Partnern vorne; kurze gut erreichbare Partnerfarbe.
5. Einzelne ×2-Box auf einer gut erreichbaren größeren Fläche.
6. Vertiefung: Schlüssel in Reihe3 oder ein versetztes Paar; jeweils nur eine bekannte Regel anspruchsvoller machen.
7. Erste Kombination Schlüssel → nützliche ×2-Box, erst nach bestandenen Einzelvergleichen.

Das sind Lehrziele, keine unveränderliche globale Levelnummerierung. Wiederholungen ohne Sonderregel bleiben ein wesentlicher Teil des Katalogs. Anfangs höchstens eine Sonderregelfamilie pro Level. Unterschiedliche Mechaniken werden erst nach ihrer Einführung kombiniert.

## 10. Bewusst zurückgestellt und trotzdem festgehalten

| Baustein | Entscheidung |
| --- | --- |
| Aufladbarer großer Abräumbonus | Nächste geplante Konzeptstufe nach dem ersten Levelpaket. Vorbild Pixel Flows Fortschrittsladung ist belegt. Nicht zusätzlich in die erste Fassung drücken. Muss durch normale Arbeit verdient werden; kein Pflichtkauf und keine absichtliche Bremse ohne Bonus. |
| Verdeckte Folgeboxen | Späterer Informationsvergleich. Vor Auswahl sichtbar; kein Zufallszwang, keine versteckte einzig rettende Farbe. Im ersten Paket bleiben Vorschauen offen. |
| Versiegelter Bildbereich / Werkzeug | Später, mit klarer sichtbarer Öffnungsaktion. Keine zusätzliche Trefferarbeit an allen Standardsteinen. |
| Zweite Bildebene | Später, angekündigt und ins Zeitbudget gerechnet. Kein überraschend verdoppeltes langes Level. |
| Drei-/Vierer-Nutzlast | Erst nach ×2, nicht parallel einführen. |
| Timer, Bomben, Leben, Warteuhren | Nicht Bestandteil dieses Kernkonzepts. |
| Shop, Kaufbooster, Siegesserienzwang | Keine Voraussetzung für Balance, Lösung oder Tests. |

Diese Einordnung ist verbindlich für die erste Fassung: kein fortlaufendes Hinzufügen neuer Hindernisse beim Bauen. Die Ideen verschwinden nicht aus der Planung, haben aber keinen Vorrang vor guten Levels mit den vorhandenen Regeln.

## 11. Referenzpaket und Abnahme

| Referenz | Was wird geprüft? | Status |
| --- | --- | --- |
| Wal · kompakte Formen | kurzes Grundspiel, zugänglicher Einstieg, Mengen überarbeiten | neue Folge mit18statt27Boxen spielbar |
| Eichelhut | Grundspiel mit klarer Kontur; Schlüssel-Schatulle gegen identische Folge ohne Schloss | beide neuen47Boxen-Fassungen spielbar |
| Unmögliche Schleife | Design-/Transportvergleich des Boden-Schlüssels | spielbar, als taktisches Schlüssellevel verworfen |
| Tag trifft Nacht | ein vorn liegendes Paar; erreichbare Folgefarbe | beide54Boxen-Fassungen spielbar |
| Bunte Balance | ×2 auf sinnvoller zusammenhängender Farbfläche, Vergleich ohne Bonus | beide56Boxen-Fassungen spielbar; Bonus rot60nach Positionsvergleich |
| Eichelhut, zweite getrennte Variante | Schlüssel öffnet nützliche Bonusbox; Gesamtzeit und früher Nutzen | `flow-v2-acorn-key`: vier ×2-Konturboxen; Nutzerbewertung „V2 ist gut“, bevorzugte Eichelhut-Fassung bei B; V1 bleibt erhalten |
| Tag trifft Nacht, versetztes Paar | Ein Partner in Reihe zwei, erst Vorgänger wählen; zwei Plätze für atomaren Start | zusätzliche Variante `flow-v2-sunmoon-pair-depth` im Referenzkapitel; bisheriges Paar bleibt erhalten |

Die Motivnamen legen die Testbasis fest, behaupten aber keine bereits geprüfte neue Schatullenfolge. Reicht ein Motiv für die beabsichtigte Entscheidung nicht, wird ein geeigneteres unverändertes Motiv gewählt und hier protokolliert.

Abnahme pro Level:

- Exakte Farben/Mengen, keine doppelten Reservierungen, keine verlorenen Schlüssel und korrekte Rücknahme.
- Vollständige Lösung ohne Booster; zusätzlich mehrere abweichende legale Auswahlfolgen prüfen. Erkennbare Sackgassen erklären sich durch sichtbare Regeln.
- Früher tatsächlicher Schlüsselnutzen; keine Endspiel-Sperre aus Versehen. Freigabezeitpunkt relativ zu Abtrag und Gesamtzeit dokumentieren.
- Sonderregel, Zahl und Paarzuordnung im gewählten Hochformat-Referenzviewport am PC lesbar. Motiv nicht beschädigt oder überlagert.
- Identische Vergleichsbedingungen; jede Variante ändert nur den untersuchten Baustein.
- Zeit, Auswahlen, Stillstände und Auslaufphase protokollieren. Botanzahl und Mobil-FPS nicht miteinander verwechseln.
- Manuell spielen, nicht nur automatisch lösen. Nutzerbewertung ist eine eigene Freigabe; ein Testpass behauptet keinen Spaß.

## 12. Umsetzung in festgelegter Reihenfolge

- [x] Ausgangsstand sichern und Zweig erstellen.
- [x] Telemetrie, per-Box-Startabstand, Originalspiel-/Editor-Verknüpfung und erste Mechanikstudien.
- [x] Erste Quellenrecherche, Nachrecherche zu Paaren/Fairness und zusammenhängende Regeldefinition Version4.
- [ ] Referenzprofil vollständig speichern; Istwerte der Referenzmotive messen. Keine Nutzerprofile überschreiben.
- [x] Standard-Schlüsselbox mit klarer Zuordnung und atomarem Auslösezeitpunkt ergänzen; Bodenstudien behalten.
- [x] Wal und Eichelhut mit neuen Folgen ausarbeiten; normal/Schlüssel A/B technisch prüfen. Spielerbewertung bleibt separat offen.
- [x] Paar- und einzelne Bonuslevel mit den definierten Regeln als Vergleichsfassungen ausarbeiten und technisch prüfen. Spielerbewertung offen.
- [x] Erste Kombination und kurze Einführung technisch zusammenstellen. [Spielrunde V1](spielrunde-v1.md) enthält die große Referenzfolge einschließlich bestätigter Kombination. [Einstieg V1](einstieg-v1.md) ergänzt sechs kürzere Levelentwürfe mit zwei Grundrätseln, Schlüssel, Entlastungsrätsel, Paar und ×2; getrennte Kapitel, Erklärungen, Weiter-Schalten und Abschlussfortschritt. Nutzerabnahme und endgültige Store-Balance bleiben offen.
- [ ] PC-Browserleistung und Simulationszeit prüfen; danach Tempowerte vergleichen. Aktuell keine APK und keine Smartphone-Tests: Nutzerkorrektur vom 6. November.
- [ ] Nutzerbewertung des Pakets; abweichende Ergebnisse hier als konkrete Änderung dokumentieren.
- [ ] Danach Abräumbonus-Konzeptstufe aufgreifen. Weitere Regeln bleiben zurückgestellt.

Technischer Bestand: Die bisherigen Boden-/Steinschlüssel, Paar- und Bonusstudien bleiben erhalten. Die neue Schlüsselbox und sieben neue Vergleichsfassungen sind implementiert und in23vollständigen Durchläufen geprüft. Technische Abnahme ist keine Spielerbewertung. Messwerte und Grenzen stehen im [Spielpaket V1](spielpaket-v1.md); frühere technische Details bleiben im historischen Protokoll.

## 13. Warum das Konzept jetzt diese Form hat

Aktueller Verkehrsentscheid: B wurde vom Nutzer als passend bewertet und dient als Grundlage weiterer Vergleiche. A bleibt verfügbar; bestehende Nutzerprofile werden nicht überschrieben. Der [Eichelhut-V2-Vergleich](eichelhut-v2.md) dokumentiert gezielte vorhandene ×2-Boxen, Messwerte und verworfene Änderungen. Der Referenzlauf sinkt von 215,7 auf 206,9 Sekunden; bei einer anderen Auswahlfolge beträgt der Gewinn nur 0,6 Sekunden. Das ist eine begrenzte Verbesserung, keine abgeschlossene Lösung des Längenproblems. Schlüsselzeitpunkt und Bild bleiben unverändert. Anschließendes Nutzerfeedback: „V2 ist gut“. Damit ist diese Eichelhut-Fassung bevorzugt. Das neue Referenzkapitel wird separat beurteilt; die fertige Anfangslevel-Balance bleibt offen.

Der Store-Rahmen bleibt Teil der Planung: PC-Editor und ein gemeinsamer Spielkern, anschließend eine eigenständige Spieloberfläche ohne Entwicklungsregler, verständlicher Einstieg, gespeicherter Fortschritt, kurze Sieges-/Weiterführung und später Geräteprüfung. Das Referenzkapitel setzt erste Teile davon im bestehenden Design um. Es ist weder ein fertiger Veröffentlichungsbuild noch Anlass, Klammern oder die übrigen festgehaltenen Mechaniken aus der Planung zu verlieren.

Die Recherche stützt Reihenfolge und knappe Plätze als Kern, gekoppelte Auswahl als räumliche Entscheidung und Schlüssel als Freigabe von Nachschub. Sie zeigt auch kräftige Abräumaktionen als Gegenpol zu Einschränkungen. Daraus folgt eine begrenzte erste Fassung statt eines Sammelsuriums von Hindernissen. Konkrete Freigabezeitpunkte, Ausfahrtfreigabe, unabhängige Paararbeit und Doppeltransport sind bewusst für unser Spiel festgelegt.

An der klaren Regeldefinition wird gearbeitet und getestet; nicht bei jedem Detail zwischen unverträglichen Regeln gewechselt. Geprüft werden muss weiterhin, ob die damit gestalteten Levels die Ziele erreichen. Forschung kann das Spielkonzept begründen, aber menschliches Spielen nicht ersetzen.
