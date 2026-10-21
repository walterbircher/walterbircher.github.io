# v5 validation

Created from v4; v4 files remain unchanged.

Changes:
- Dedicated conference page with Chicago skyline, planned April 2–4, 2027 dates, hotel/agenda placeholders, and registration-coming-soon button. No registration integration.
- Conference linked from primary navigation, home page, and news.
- Laura Bordone added after Walter with a photo placeholder and supplied background. Ray is not listed in the source team page.
- Featured researchers sorted by surname: Lammerding, Valdez, Wallrath, Worman.
- Complete Lammerding and Worman text restored from https://www.cureedmd.org/research-1 with short card summaries and existing expandable controls.
- Drug repurposing and gene therapy descriptions copied from the same source into native expandable details. Corrected the source typo LMMA to LMNA. Added its further drug-development discussion.

Passed:
- Local file links and anchors across all HTML pages.
- Headless Microsoft Edge checks at 1440px and 390px for home, conference, team, research, and news pages.
- Conference navigation, researcher order, profile expansion, strategy disclosures, Laura bio selection, and no horizontal overflow.
- No JavaScript page errors during these checks.

Limits:
- External media/fonts blocked during browser checks; external service availability not verified.
- Newly supplied detailed content remains in English; inherited translation catalogs retained.
- Hotel link, agenda, registration, and Laura photo await supplied content.
- Saved locally; not deployed.

## v5 follow-up
Conference is first and highlighted across primary navigation. Worman uses howard_worman.png. Research cards expand independently; introductory copy moved beneath heading and trailing note moved into details. Relevant progress and primer paragraphs now sit inside their respective approach details. Saved 38 remote images locally with IMAGE-SOURCES.json provenance; unavailable Antoine Muchir image in hidden profile uses a local placeholder. Desktop/mobile browser checks passed for navigation, overflow, independent expansion, and Worman image loading; all HTML image references are local and present. JavaScript syntax check passed.
