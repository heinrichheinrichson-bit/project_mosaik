# Startabstand je Box

Der Startabstand gilt standardmaessig pro Box. Global bleibt als Vergleich einstellbar. Alle Teams werden im gleichen Simulationsschritt bedient; jede Box haelt ihren eigenen Abstand. maxActive begrenzt alle unterwegs befindlichen Bots (0 = unbegrenzt), maxPerTeam bleibt separat. Bestehende gespeicherte Werte bleiben erhalten; neue Optionen erhalten Box / unbegrenzt als Vorgabe.

Tests: unabhängige Starts, eigener Mindestabstand, globaler Vergleich, Gesamtgrenze, gespeicherte Team-Zeitpunkte; sechs Katalogmotive vollständig (10104 Steine); manuelle Erreichbarkeit; Spieltransfer; Ausfahrt aller vier Parkplätze in fünf Pfadmodi; Browser: alle 51 Einstellungsfelder vorhanden und Originalmodule funktionsfähig.

Reproduzierbarer Vergleich tests/launch-pacing.cjs: Bunte Balance, 1999 Steine, 90px/s, .16s Abstand, Teamlimit128, Gesamtlimit0, automatische Lösung. Global: 412.8 simulierte Sekunden, Spitze52 Bots. Je Box: 329.6 Sekunden, Spitze88 Bots. Kein Smartphone-/FPS-Benchmark.

Die ruhige Empfehlung (12 je Team, insgesamt24) benötigt dagegen 571.2 Sekunden, Spitze24. Sie ist keine Tempoempfehlung. Weniger gleichzeitig aktive Bots begrenzen weiterhin den Durchsatz. Die neue Gesamtgrenze wird deshalb nicht automatisch auf gespeicherte Nutzereinstellungen angewandt.
