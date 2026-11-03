# Originalscreen is the primary game surface

The user explicitly chose the existing game UI shown in `reference-game-design.png`.
The primary browser entry is `/` (`index.html`). Do not substitute `game.html`
or an editor play dialog when the user asks for their game.

The actual existing `.screen-study .phone` DOM, CSS, board/stair functions,
garage, parking pads, box renderer, queue and controls remain in place. The
catalogue is an additional panel in the desktop study sidebar.

`editor-src/original-catalogue.js` adapts the shared `EditorPlaySession` to that
screen. Images use their actual raster and palette, fitted within the original
312-unit picture area. Movement projects to the original screen's real parking
and garage positions. The original screen draws the board, stairs, parking and
garage directly; they are not approximated by a new phone component.

All built-in seeds are offered, along with documents in the editor's IndexedDB
store (or local-storage backup). Use **Editor-Stand laden** after editing in
another tab. **Im Spiel öffnen** in the editor transfers the current snapshot,
including its queue and settings, to `/?fromEditor=1`.

Direct link: `/?motif=studio-v2-hermit`. Selection persists for future reloads.
Legacy studies still work and can be selected using their original controls.

Build: `node tools/build-original-catalogue.cjs`. `build-editor.cjs` also invokes
this builder, keeping the embedded catalogue/runtime up to date. The marker
block at the end of index.html is generated; edit the source module instead.

Browser regression: `tests/original-catalogue-browser.cjs`, using the dedicated
debug browser on 9224 and local server on 8765. It checks original DOM identity,
six motifs, exact document pixels, dispatch/undo/reset, playback, character
selection and editor handoff.

APK 0.2.0 predates this original-screen integration and is not an updated build.
Future Android work must use this chosen surface, not silently package the
rejected substitute surface again.
