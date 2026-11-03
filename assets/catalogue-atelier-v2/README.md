# Atelier II · 50 neue Motivkandidaten

Eigenständige neue Serie; Atelier I und bestehende Nutzerbearbeitungen werden nicht ersetzt.

- Originalvorlagen: `*-source.png`, mit dem eingebauten image_gen-Tool erstellt.
- Vollständige Prompts: `prompts.json`; redaktionelle Angaben und feste Paletten: `specs.json`.
- Je Motiv 32, 40, 48, 56 und 64 Rasterzellen pro Seite. Standard: 56.
- Schwarze Außenkontur, freier Hintergrund und 6–10 feste Farben; kein Dithering.
- Rasterdaten: `seeds.json` und `variants.json`; editorfertige Schatullen entstehen beim Import.
- Erstellen: tools/rasterize-atelier-v2.py, danach tools/import-atelier-v2.cjs und tools/build-editor.cjs.
- Prüfen: node tests/atelier-v2.cjs --play.

Die vollständigen Spieltests verwenden die Editor-Engine mit beweglichem Rahmen, Rückweg-Neuvergabe bei Aufnahme, abgerundeten Übergängen und beschleunigten Modellwerten. Sie prüfen Erreichbarkeit, Reservierungen und Steinbilanz; sie ersetzen keine manuelle Bewertung von Motivästhetik oder Schwierigkeitskurve.

Status aller Motive: Entwurf zur Auswahl und Nachbearbeitung. Keine Behauptung, dass alle 50 Motive bereits redaktionell freigegebene Endlevel sind.
