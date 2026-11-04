# Atelier III and mixed catalogue queues

30 additional original motifs, 150 raster variants (32/40/48/56/64), standard 56. Existing motifs and browser edits are retained. Image sources use the built-in image generation tool; prompts are documented by the shared art direction and per-subject specs in assets/catalogue-atelier-v3/specs.json. Fixed eight-colour palettes, neutral-white exterior removal, majority voting, continuous black boundaries and the existing raster pipeline are used. Sources, previews and raster documents are saved in the project.

Editor series URL: /editor.html?serie=atelier3. All motifs also run in the actual original game screen, with an Atelier III optgroup. There are 114 seed motifs plus 18 original levels, before saved custom documents.

Queue packing keeps complete reachable colour runs together and puts successive runs into other columns. Documents record the tested packing style (balanced or rotating); independent quantities and serial dependency order are preserved. This reduces black across the first three visible rows while retaining upcoming colours for planning. A closed contour can still require a black first move.

The audit covers the 84 prior seed motifs: 694 black boxes in the first three visible rows before, 287 after; average visible colours 1.96 before, 3.94 after. Full quantities and serial removal are checked for all 114 seeds. No random recolouring or picture changes are used.

Known untouched generated queue versions are migrated, including stored raster variants. Custom queues that differ from those versions remain unchanged. Exact canonical pixels/palette can reuse the checked plan without recomputing it at startup. IndexedDB updates replace only still-matching queue data, preserving concurrent edits. Generating queues manually in the editor uses the new packer.

Parallel workers previously could steal tiles from a later region of the same colour when another team exposed it early. PlaySession now derives colour regions from the valid serial queue plan and finishes the current region before targeting a later one. Active reservations are deducted from automatic availability. Region membership is static; its active region follows the current board, so undo works without serializing Sets. Custom plans without a reconstructible ordered solution retain the previous unrestricted target behavior.

Validation: tests/atelier-v3.cjs checks all 150 grids, palettes, outlines and serial plans; tests/queue-mixing.cjs checks migration/custom preservation and old/new visible mix; tests/queue-regions.cjs checks newly opened later regions and undo; tests/queue-mixing-play.cjs simulates complete play (with --after/--before ranges); tests/atelier-v3-browser.cjs verifies all 30 editor cards and actual original-screen opening. Existing original screen/settings, game transfer, editor and departure regressions remain applicable. No APK is rebuilt here.

Final complete-play result: all 114 seed motifs completed with six workers per team in the frame-path stress simulation (600 px/s, zero launch/open/pickup delays, parallel automatic teams), 164,177 stones delivered. The per-motif record is docs/queue-mix-play-results.txt. This is a concrete tested configuration, not an exhaustive test of every settings combination.
