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


## Raster character prototype
A generated overhead furry workshop creature is embedded into the game and corridor preview. Runtime recoloring keeps cream areas and maps teal fur to the team color. The sprite uses a small sway while moving; this is not yet a rigged walk cycle. The body width is 0.693 tiles and its length is 1.134 tiles. Existing shape studies remain archived in the figure panel. Carry offsets now reduce near occupied cells.


## Compact machine comparison
Five raster machine prototypes now have deterministic alpha-bounds scaling: entire machine at most 0.52 cells wide and 0.70 cells long, cargo stays 0.94 cells wide. Includes forks, tracks, wheels and grippers. This is a silhouette/scale comparison; the images do not yet have rigged joint animations. Previous character studies remain archived.


## Compact pad carrier
A new compact pad carrier is selectable and active in the in-game study. Alpha-cropped sprite bounds are limited to 0.76 cells wide and 0.90 cells long; cargo remains 0.94 cells wide. Teal panels are recolored to the team color, ivory remains. Previous studies remain archived. This prototype follows routes and pickup/drop transitions; the raster limbs do not yet have an independent animation cycle. Browser preview and the 576-stone conservation test passed.


## Isolated pivot mechanism study
A separate canvas model demonstrates the common cross-axis, two fixed-length arms, forward-facing suction pads, attached cube rotation and reverse departure. Pause, scrub and overhead/side cameras are available. The underlying game code was verified unchanged before saving this checkpoint. The model is deliberately simplified and does not replace the current game character.
Validation: node tests/isolated-pivot.cjs checks 181 rotation poses for rigid arm length, pad-to-cube rear-face contact, floor clearance and cube-to-hull clearance. Browser scrub, pause and camera controls were checked.


## Rounded carrier visual comparison
The actual game now offers a rounded ivory carrier with a team-colored shell and short suction pads. The first design remains selectable. This checkpoint changes graphics and comparison controls; pickup mechanics remain the previous prototype and are not claimed complete. The separate pivot model remains available. Inline scripts passed syntax checks; the live game and preview were checked in the browser without console errors.


## In-game carrier appearance study
Three code-rendered body variants can be previewed and tested in the real puzzle. No swing arms or overhead transfer: fixed front pads and forward cargo. The default remains the original placeholder; rejected studies are archived. Validation: 576-stone routing and conservation check passed. These remain visual prototypes, not final character art or a validated long-body corner collision model.


## Rounded sprite bodies
Replaced the flat procedural body drawings with alpha-cropped, shaded toy sprites, recolored by team. Same runtime painter in the appearance study and gameplay. Swing arms remain absent. Current bodies are directional sprites rotated in 2D; they are visual prototypes, not full 3D turnarounds. Front cargo clearance increased to keep the face visible.


## Flat front contact extraction study
The active character study now demonstrates a flush bumper contact at the only accessible face of an embedded cube. It approaches, contacts and pulls backward with the cargo on the floor. No arms or forks. The study uses the existing character sprites, includes scrubbing and an actual-size view. Full-game trial is hidden: cornering and route integration are not validated. node tests/flat-contact.cjs checks 1001 poses for contact continuity and non-penetration against the robot and neighboring stones. Rejected mechanism HTML snapshots remain in the local work archive.


## Forward travel after extraction
Loaded characters now reverse only until the planned turning area. A conservative free circle around the assembly center is checked against occupied board cells; a six-step stationary turn rotates the body and cube together, preserving contact. Afterwards the character faces its route direction and carries the cube ahead. Picked trips with a planned turn retain that route so replanning cannot invalidate the turn timing. This applies to the current free-traffic character test. Full-game tight-corner footprint behavior remains experimental.
Validation: node tests/forward-carry-levels.cjs completed 576 deliveries and 576 planned turns on each of levels 3, 4 and 6. A separate 1448-pose geometry check verified fixed pivot, continuous motion, constant contact distance and final forward heading.


## Original transport paths with forward-facing sprites
Supersedes the previous reversing/turning trials. Removed planned turn holds and reverse orientation. Cargo is painted unrotated at the original route anchor, as with the placeholders. The body follows the already-traversed cargo trail, which also survives route replanning. This deliberately prioritizes calm movement over exact pickup/contact mechanics, per user instruction. No additional traffic waits. Validation: original 576-stone free-movement check passed; node tests/carrier-trail.cjs checks 121 corner samples for forward orientation, continuous body motion and staying on the traversed path.


## Accepted interim settings and solid garage entry
Keep all three character choices and every study. Character selection now stays active in the puzzle and is remembered locally. Startup settings match the supplied screenshots: balanced screen, compact centered queues, center garage between two pairs of bays, light walking offsets, transport animation, 3x playback and small waiting-box symbol.
The center garage now keeps cargo and character fully opaque and full-size. Six additional delivery steps move the unit behind the existing hood; delivery commits only afterwards. No traffic waits are added. Before the final approach the existing path/trail renderer is unchanged. A comparison button retains the previous fading entry, and an enlarged scrubbable preview uses the exact same shell/hood painting functions as the live garage.
Validation: node tests/garage-entry.cjs completed levels 3, 4 and 6 with 576 full entry tails and 576 deliveries each, stone conservation and zero traffic waits. node tests/garage-occlusion.cjs checks 201 poses for full opacity/size and rear-body clearance before removal. Browser checks cover screenshot settings, remembered character selection and intermediate/final occlusion. A separate render-wrapper regression check ensures actor/trail caches survive the temporary arrival flags.


## Constant-speed garage arrival
Supersedes the fixed six-step entry duration: the garage continues at the last incoming projected route speed. Arc-length sampling preserves speed while centering under the hood. The engine tail is sized to that distance and speed; cargo and body remain opaque and full-size until occluded. All approved studies/settings remain. Validation: three 576-delivery levels with zero added traffic waits; tests/garage-speed.cjs checks speed within 1.5% on left/center/right entries at 80 and 150 px/s.

## Garage appearance study
Four runtime choices preserve the original garage and add soft/flat sides, clearer depth, and quiet mint finishes. All share the same footprint, entry roof boundary, arrival speed and routing. The live puzzle and enlarged scrub preview use the same painters. Browser-checked all new choices with no console errors.

## Distinct garage silhouettes
Added options 05 open wedge, 06 short parallel-sided tunnel, and 07 inset oval. Previous options remain available. Same route and roof occlusion boundary. Verified actual selected state and rendered shape of all three in browser, plus final full occlusion in enlarged preview; no console errors.

## Garage screen composition studies
Options 08 curved collector bay with extended walls, 09 compact tunnel bay, 10 shared parking plinth. Previous designs retained. Existing arrival timing/occlusion unchanged. Enlarged preview fits the extended forms. All three selected and visually inspected in the full screen; collector entry preview inspected with cargo.

## Center garage origin correction
Center live shell/hood now draw directly at the arrival/occlusion origin rather than reprojecting the old single-intake origin. This removes the stale translation relative to actor clipping. Restored cream front trim after mistaken recoloring; option 09 is the interim default.

## Perimeter-route comparison
New default for free-traffic full boards: straight from source to the one-cell perimeter centerline, along that ring, then shortest available inner approach. Retrace the same inner approach, follow the ring to the bottom, then a direct discrete diagonal to the intake. Replanning disabled for these trips to preserve the chosen return path. Current routing remains selectable; switching restarts the level. Tests/perimeter-paths.cjs clears levels 3, 6 and 9 (576 stones each), checks exact inner-route reversal, adjacent route steps, reservation conservation and zero traffic waits. Browser visual verification blocked by browser-control kernel initialization failure.

## Initial catalogue studies
Eight original 24x24 drawings, thumbnail selection and per-color portions. These are rough art studies, not accepted final catalogue art; user requests finer more composed pictures. All eight completed 576 deliveries under original routing.

## Relaxed border routing
Third comparison mode, selected on reload: prefer a straight clear approach from the ring when available; otherwise use an inner BFS path. Return independently via the least-cost combination of inner escape and perimeter route to the bottom, then directly to intake. Preserve planned trips without geometric replans. Strict retracing and original free routes remain selectable. Tests/relaxed-border-paths.cjs checks complete delivery, continuous routes, declared straight approaches, conservation and no traffic waits. Browser verification remains blocked by browser-control initialization failure.

## Warm-white perimeter surface
Full-board outer walking margin now uses a warm-white surface, excluding the exact 24x24 image interior so cleared floor stays sand colored. Both lower stair treads use matching white shading with darker risers. Existing geometry, routes and timing unchanged. Study toggle retains the previous sand finish; switches without restarting. Inline scripts syntax checked; browser visual verification still unavailable.

## First detailed mosaic art study
Original 40x40 raccoon/doughnut night scene with 15 colors, stored as catalogue pixel data. The detail study compares 24 and 40 cells on the same 312px board with the production stone painter; a larger stone preview is included. Explicitly an art study, not a playable 40-cell level. Activating pauses/resets the sunflower, disables box interactions and changes title/count; return or level selection restores gameplay. Offline rendered both resolutions using the exact renderStone function with @napi-rs/canvas; 576/1600 cell and palette validation passed. Browser UI verification blocked by kernel initialization error. Existing playable routes and studies retained.

## Revised freestanding raccoon study
Redrawn silhouette, separated eye masks and hands, defined doughnut contour, 12 colors, 833 occupied cells on a 40x40 grid. Null cells remain empty, including the doughnut hole. Art study switches between cutout and previous night scene at either resolution. Counters count occupied cells. Both versions rendered and visually inspected using the actual renderStone painter offline; browser UI verification remains unavailable. Not a playable 40x40 level yet.

## Generated-source production pilot
Five original transparent illustrations generated with built-in imagegen: raccoon, frog, wizard, toast and abstract sun/waves. Full prompts and source PNGs are in assets/production-test. tools/prepare-production-art.py uses Pillow: alpha-bounds crop, common margins, Lanczos sampling, alpha threshold, visible-pixel median-cut palette reduction with no dithering. Produces 32/40/48/56 grids with 12/16/20 colors (60 variants). Nulls preserve empty board. Connected-color singleton counts expose potential cleanup work; not automatic art approval. UI compares source/mosaic, optional quieter tile style, actual-board art preview, and exports JSON. These are art prototypes only, not playable new-grid levels. Existing game and studies retained. All 60 variants validated by tests/production-art.cjs; actual renderStone offline montage inspected. Browser UI verification remains unavailable due to control-kernel error.

## Fixed eight-color frog experiment
New original pixel-art frog source generated with built-in imagegen; exact prompt and source retained in assets/eight-color-test. Conversion maps pixels to eight fixed swatches before majority-vote cell reduction, using nearest sampling and binary alpha; no averaged output colors or dithering. Four resolutions available. Added flat/current/quiet material comparison; fixed-palette source disables color-count selection. Export remains art-study JSON, not playable levels. Eight palette entries and valid cell counts checked at every resolution, all inline scripts compile, exact production painter comparison visually inspected offline. Browser UI verification still unavailable.

## Black outline and bold palette comparison
Same eight-color frog silhouette, remapped to higher-contrast swatches with near-black contour cells. Every occupied four-neighbor boundary cell is black in actual pixel data, not a renderer overlay. Preserves occupied fields and stone counts at each resolution. Previous frog retained. Default art-preview selection is the new version with quieter tiles; flat/current remain available. Boundary/occupancy invariants checked and exact renderStone comparison visually inspected offline. Art study only.

## Local 48-cell frog pixel cleanup
Separate art variant with 169 explicit cell changes, retained in changes.json. Crown/feet reshaped and hind-leg green noise simplified; established face region and eight-color palette asserted unchanged. Resolution selector locked to 48 for this revision instead of pretending unedited variants were reviewed. Previous bold frog retained. Actual tile painter before/after rendered and visually inspected offline; UI browser verification still unavailable. Art study only.

## Rejected frog cleanup removed
User rejected the crown/feet reshaping. Removed the cleaned-frog study script and selection from the active app; bold black-outline frog is again the default art selection. Rejected assets remain only as historical files, not selectable or loaded by the app. No further pixel modifications made.

## User-selected black spot correction
Changed only cells (33,11) and (34,11), zero-based in the 48x48 bold frog, from black to surrounding bright green. All remaining cells asserted identical. Eye whites, pupil, silhouette, crown, feet and palette untouched. Original remains selectable; corrected version default in art study. Exact tile renderer before/after inspected offline.

## Compact whale motif trial
New generated pixel-art source selected for broad silhouette and fins instead of fine digits. Fixed six-entry palette, nearest sampling/majority-cell reduction, black occupied boundary. Original source and prompt retained. 40-cell default uses 460 stones; 32/48/56 remain available. Frog variants hidden from active production choices, historical data retained. Fixed-palette label now reflects palette length. Data/painter checked offline; browser interaction remains unverified. Art trial only, not a playable level.


## Katalog und Pixel-Editor

`editor.html` öffnen (oder im Spiel auf **Katalog & Editor öffnen**). Zwölf bearbeitbare Vorlagen; eigene Motive, PNG-Import und JSON-Sicherungen. Pipette auswählen oder Alt-Klick / Rechtsklick auf einen Stein: exakte Palettenfarbe aufnehmen, danach andere Steine bemalen. Leere Zellen bleiben transparent. Rückgängig und Füllen sind verfügbar.

**Vor Bearbeitung spielen** verwendet die gespeicherte Vergleichsbasis, **Aktuellen Stand spielen** die aktuellen Pixel und Schatullen. Fehlende Schatullen werden für den Test neu erzeugt. Vier Startplätze, manuelle Auswahl und automatischer Test, drei Figuren, drei Pfadmodi und Tempoauswahl. Eigene Testansicht für Raster 8–96; die festen ursprünglichen Level bleiben erhalten. Automatik prüft bewusst seriell, manuelles Spielen erlaubt mehrere aktive Teams.

Änderungen werden lokal im Browser gespeichert. Regelmäßig **Katalog sichern** als JSON verwenden: Browserdaten sind keine GitHub-Sicherung. Vergleichsbasis kann ausdrücklich neu gesetzt werden.

Bauen: `node tools/build-editor.cjs`. Modelltests: `node tests/editor.cjs`.


### Neue Pixelmotive und Rastervarianten

Sechs zusätzliche direkt im Raster gestaltete Motive: Geist, Rakete, Vulkan, Toast, Mond und Kugelfisch. Schwarze Außenkonturen, 4–7 feste Farben, freier Hintergrund. Jedes neue Motiv hat Varianten in 32, 40, 48 und 56. Über **Motivraster / Palette → Variante öffnen** sind außerdem die ursprünglichen Größen und 12/16/20-Farbvarianten der bisherigen Bildvorlagen verfügbar. Jede geöffnete Variante ist separat bearbeitbar und spielbar; Variantenwechsel überschreibt keine Bearbeitungen. Beim Laden werden nur fehlende neue Motive ergänzt. Eigene gespeicherte Motive bleiben erhalten.

Prüfung: `node tests/new-motifs.cjs`, `node tests/editor-ui.cjs`, `node tests/editor-migration.cjs`. UI-Tests verwenden eine DOM-Simulation mit gemocktem Canvas. Die Vorschautafel in `docs/neue-motive-spielsteine.png` wurde mit dem echten Steinrenderer erzeugt.


## Atelier 01 · 16 zusätzliche Motive

Im Editor **Motivübersicht** öffnen; der Gruppenfilter steht auf **Neue Motivserie**. Sechs Tiere, drei menschliche Figuren, drei Gegenstände, zwei Essensmotive und zwei abstrakte Bilder. Die Entwürfe wurden mit Imagegen gestaltet und in begrenzte feste Pixelpaletten übertragen. Schwarze Konturen, freie Außenflächen und bei Teekanne/Schleife auch freie Innenöffnungen. Jede Vorlage hat 32/40/48/56/64-Varianten, standardmäßig 56 × 56.

Bestehende Browser-Bearbeitungen bleiben beim Ergänzen erhalten. Über **Alle Motive und bisherigen Studien** ist der ältere Katalog erreichbar. **Bildauswahl** im Motivstatus dient zum Vormerken. Die große Übersicht unterstützt flache Pixel und den originalen Steinrenderer. Die separat aufgebaute Spielansicht bleibt ein bekannter offener Unterschied zum Originalspiel; die Atelier-Erweiterung behauptet keine identische Spielintegration.

Quellen und Prompts liegen unter `assets/catalogue-atelier-v1`. `tools/rasterize-atelier.py` erzeugt die Daten aus diesen Quellen (Python mit Pillow und NumPy); `tools/import-atelier.cjs` übernimmt die Vorlagen in die ausgelieferten Seeds. Browserstände werden dabei nicht angefasst. Editor bauen: `node tools/build-editor.cjs`. Tests: `node tests/studio-catalogue.cjs`, `node tests/editor-ui.cjs`, `node tests/editor-migration.cjs`. UI-Tests simulieren den DOM und ersetzen keine Browser-Sichtprüfung.


## Spielvergleich frei einstellen

Im Editor ein Motiv mit **Aktuellen Stand spielen** oder **Vor Bearbeitung spielen** öffnen. Figurengröße: Basis **Feste Originalgröße** oder **mit der Steinbreite skalieren**, 25–800 Prozent. Die Größe ist rein visuell; sie ändert weder Pfadbreite noch Fahrtempo oder Reservierungen. Ladungsgröße und Abstand sind getrennt regelbar.

Zusätzlich: Fahrtempo, globale Startabstände, Öffnungszeit, Figuren je Team, Parkplatzfreigabe, serielle/parallele Automatik, drei Pfadmodi und optionale Abkürzungen bei freien Wegen, sichere sichtbare Laufversätze, Aufnahmezeit/-darstellung, Einfahrttempo/-tiefe/-kurve, sämtliche ursprünglichen Garagenformen, Boxen-/Sockelgröße und Anordnung sowie Steinoberfläche.

**Bildwerte wirken sofort. Bewegungs- und Layoutwerte** werden mit **Übernehmen & Neustart** aktiv, damit bestehende Routen nicht rückwirkend versetzt werden. A und B speichern vollständige Vergleiche, einschließlich Figur, Pfadmodus und Vorspultempo. Die Einstellungen bleiben lokal erhalten und können separat als JSON gesichert und geladen werden. Vorher/Nachher verwendet denselben aktiven Parametersatz.

**Originalnah** verwendet Originalgrafiken, 13-Bildpunkte-Größenbasis, 130 Bildpunkte pro Sekunde auf geraden Brettstrecken bei 1×, sechs gleichzeitig aktive Figuren je Team, 0,1 s Startabstand und 0,55 s Öffnungszeit. **Bisheriger Editor** stellt die früheren Grundwerte ein. **Groß & ruhig** ist ein weiterer Versuch. Diese Vorlagen sind keine Behauptung einer identischen Engine: die Editor-Pfadfindung ist weiterhin separat. Das Originalspiel wird durch die Regler nicht verändert.

Originalgrafiken und reine Zeichenfunktionen werden mit `node tools/extract-play-visuals.cjs` aus `index.html` übernommen. Danach `node tools/build-editor.cjs`. Prüfungen: `node tests/play-lab.cjs`. Optionaler Render-/DOM-Test mit `@napi-rs/canvas`: `node tests/play-lab-render.cjs`; er ist keine Browserautomatisierung.

### Beweglicher Laufrahmen im Editor-Spiel
Unter **Laufrahmen vergleichen** starten vier Varianten: 1 oder 2 freie Steinbreiten Abstand, Nachrücken in 4er-Schritten und Uhrzeigersinn. Größe, Tempo und übrige Einstellungen bleiben erhalten; Laufversätze werden für den Vergleich auf 0 gesetzt. Der rechteckige Rahmen umschließt die äußersten verbliebenen Steine. Neue Starts erhalten den aktuellen Rahmen, laufende Figuren behalten ihren zugewiesenen Rahmen und ihre vollständige Route. Innenwege umgehen bei Bedarf Hindernisse; ab dem unteren Rahmen geht es direkt zur Abgabe. Abstand, Nachrückschritt, Rückzugang, Richtung und Hilfslinien sind separat einstellbar und in A/B sowie JSON enthalten. Streng, Locker und Frei bleiben verfügbar. Diese Varianten betreffen den Editor-Spieltest.
Prüfung: node tests/moving-frame.cjs (12 Variantenläufe und zwei vollständige Atelier-Motive; eingefrorene Routen, freie Wege, Abstand, Nachrückschritte und Steinbilanz).

**Aufnahme als neuer Routenstart:** Unter Rückweg innerhalb des Bildes → Bei Aufnahme · aktuellen Rahmen neu vergeben wird nach der Aufnahme (und Entfernung des Zielsteins) genau einmal eine neue Rückroute geplant. Sie verwendet den dann aktuellen Laufrahmen und bleibt anschließend fest. Der Hinweg bleibt unverändert. Ist die Figur bereits außerhalb des geschrumpften Rahmens, führt ein freier Zugang zurück zu dessen Rand. Beim letzten Stein geht es direkt zur Abgabe. Test: node tests/pickup-frame.cjs.

**Konstantes sichtbares Fahrtempo:** Hin- und Rückwege werden anhand ihrer projizierten Bildschirm-Weglänge zeitlich parametrisiert, einschließlich diagonaler Abschnitte und des gestreckten Arbeitsbereichs. Die Aufnahme behält ihre eigene Dauer. Die Einfahrt verwendet Fahrtempo × Einfahrtsfaktor. Der Figurenabstand zur Ladung wird in sichtbarer Steinbreite gemessen. Prüfung: node tests/constant-speed.cjs (gerade, diagonal, Projektionsübergang, Einfahrt).

**Weiche Anfahrt vom beweglichen Laufrahmen:** Der letzte freie Abschnitt zur Abgabe folgt einem Bogen, der früh zur Garagenmitte einlenkt und in ein gerades Schlussstück nach Süden übergeht. Damit passt die Anfahrtrichtung zur anschließenden Garagenfahrt. Die Bogenlänge wird adaptiv für gleichmäßiges sichtbares Tempo vermessen. Routen und Rahmen innerhalb des Rätsels bleiben erhalten. Prüfung: node tests/smooth-approach.cjs sowie tests/constant-speed.cjs.
