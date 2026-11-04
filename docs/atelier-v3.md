# Atelier III and mixed catalogue queues

30 additional original motifs, 150 raster variants (32/40/48/56/64), standard 56. Existing motifs and browser edits are retained. Image sources use the built-in image generation tool; prompts are documented by the shared art direction and per-subject specs in assets/catalogue-atelier-v3/specs.json. Fixed eight-colour palettes, neutral-white exterior removal, majority voting, continuous black boundaries and the existing raster pipeline are used. Sources, previews and raster documents are saved in the project.

Editor series URL: /editor.html?serie=atelier3. All motifs also run in the actual original game screen, with an Atelier III optgroup. There are 114 seed motifs plus 18 original levels, before saved custom documents.

Queue generation now removes one reachable portion at a time, then prefers colours not used recently. Four balanced columns favour a different colour from the box directly above. Jobs retain their serial dependency order; colour-region targeting follows this portion plan. Closed outlines can still require black first, and late leftovers can still repeat. No pixels or colours are changed.

The previous whole-run column packing was rejected: it produced monochrome columns. Its black-box statistic did not measure useful mixing. The replacement audit measures vertical repetitions and diversity in each of the first three visible rows. The three reported motifs are explicitly checked for at least two colours per column in those rows.

Known untouched generated queue versions are migrated, including stored raster variants. Custom queues that differ from those versions remain unchanged. Exact canonical pixels/palette can reuse the checked plan without recomputing it at startup. IndexedDB updates replace only still-matching queue data, preserving concurrent edits. Generating queues manually in the editor uses the new packer.

Parallel workers previously could steal tiles from a later region of the same colour when another team exposed it early. PlaySession now derives colour regions from the valid serial queue plan and finishes the current region before targeting a later one. Active reservations are deducted from automatic availability. Region membership is static; its active region follows the current board, so undo works without serializing Sets. Custom plans without a reconstructible ordered solution retain the previous unrestricted target behavior.

Validation: tests/atelier-v3.cjs checks all 150 grids, palettes, outlines and serial plans; tests/queue-mixing.cjs checks migration/custom preservation and old/new visible mix; tests/queue-regions.cjs checks newly opened later regions and undo; tests/queue-mixing-play.cjs simulates complete play (with --after/--before ranges); tests/atelier-v3-browser.cjs verifies all 30 editor cards and actual original-screen opening. Existing original screen/settings, game transfer, editor and departure regressions remain applicable. No APK is rebuilt here.

Final complete-play result: all 114 seed motifs completed with six workers per team in the frame-path stress simulation (600 px/s, zero launch/open/pickup delays, parallel automatic teams), 164,177 stones delivered. The per-motif record is docs/queue-mix-play-results.txt. This is a concrete tested configuration, not an exhaustive test of every settings combination.
