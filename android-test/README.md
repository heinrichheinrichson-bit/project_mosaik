# Mosaik Android test 0.2.0

The APK packages game.html instead of the editor. The phone markup/styles come
from the original index.html; session, settings, renderer and animation are shared
with the editor play mode. The original study is retained.

Editor: Im Spiel öffnen sends an exact snapshot through same-origin browser
storage. Für Spiel / APK exportieren produces a mosaic-game-puzzle JSON file.
The game/APK imports that file through Rätsel importieren and stores it under
Eigene Rätsel. Pixels, dimensions, palette, queues and settings are preserved.
Later edits require a new handoff/export. PC and phone storage remain separate.

Build:
    node tools/build-editor.cjs
    node tools/build-game.cjs
    python tools/build-android-test.py

Requires SDK build-tools 35.0.0, android-35 and Android Studio JBR.
Debug signed, versionCode 2, same package/key as 0.1.0; install over the old app.
Preserve the ignored debug.keystore for subsequent updates. WebView debugging is
enabled in this test. No internet or storage permissions. Individual content URIs
are granted through Android's document picker. Includes 66 offline Atelier motifs.

Verified: transfer/session parity, exact incremental/full board render parity,
Android WebView installation/catalogue/gameplay/portrait layout/settings/back,
and real JSON import through the native document picker. Emulator performance
samples do not prove performance on a physical S22. That still needs testing.

The old mobile.js remains for its historical regression test; it is not packaged.
