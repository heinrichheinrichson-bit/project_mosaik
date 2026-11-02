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
