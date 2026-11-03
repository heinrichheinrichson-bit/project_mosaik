# Mosaik Test · Galaxy S22

Offline-Test-App für den aktuellen Rätselkatalog und die bestehende Editor-Spielengine.

- Hochformat, 50 neue Atelier-II-Motive und optional alle 66 Atelier-Motive.
- Manuelle Schatullenauswahl, Automatik, Pause, Rücknahme und Vorspulen.
- Bestehende Figuren, Module, Pfadvarianten, Beladungsanzeigen und Größenregler.
- Voreinstellung: 1×, 90 Bildpunkte/s, maximal 6 je Team, Hinbahn 2 / Rückbahn 1, lokale feste Rückroute bei Aufnahme, direkter Anfahrtsbogen, heller Würfelrand.
- Einstellungen und abgeschlossene Rätsel werden auf diesem Gerät lokal gespeichert.
- Die App hat einen eigenen Speicher. Browserbearbeitungen vom PC werden nicht automatisch übertragen.
- Keine Internet-, Kamera-, Kontakt- oder Speicherberechtigung. Kein Server nötig.
- Kleine signierte Debug-APK zum internen Testen; keine Play-Store-Veröffentlichung.

Build: tools/build-android-test.py mit installiertem Android SDK 35, Build-Tools 35 und Android-Studio-JBR. Java-Quellen und Ressourcen liegen hier. Das bestehende editor.html und mobile.js werden gemeinsam eingebettet; die Spiellogik wird nicht kopiert oder neu implementiert. Die lokale HTTPS-Basis von loadDataWithBaseURL ermöglicht einen stabilen Browser-Speicherursprung.

Build-Ausgaben und der lokale Test-Signaturschlüssel sind von Git ausgeschlossen. Derselbe Schlüssel ermöglicht spätere Test-Updates ohne Deinstallation.
