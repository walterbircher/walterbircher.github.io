# v4 validation

Validated locally with Playwright using installed Microsoft Edge in headless mode.

## Passed

- Static links/assets/anchors: 13 HTML pages checked
- All HTML pages load; public footers have copyright
- All 9 languages: carousel text and both destinations; v3 storage unchanged
- Automatic carousel rotation updates actions
- Registry ordering/anchor, visible strategy/Valdez, keyboard bio disclosure, mobile/desktop checks
- No JavaScript page errors; corrected medical tiles in all 9 languages
- JavaScript disabled: mission fallback and copyright visible
- v3 unchanged: SHA-256 comparison of all 52 files passed

- New Valdez profile supports the existing keyboard-accessible research disclosure and exposes its description/source link when expanded.
- JavaScript syntax checks passed for the shared script and v4 translation overlay.
- v4 uses separate language, theme and style-lab storage keys and style-lab messages.
- Image inventory contains 65 local assets and remote image sources, including unused inherited artwork.

## Preview

Open `index.html` from this directory, or serve the repository root with `python -m http.server 8000` and visit `http://localhost:8000/sandbox/v4/`. All v4 navigation stays within its directory unless linking to external resources. v3 remains at `/sandbox/v3/`.

## Verification limits

- External media and fonts were blocked during browser interaction checks to keep results independent of third-party network availability. These checks verify local navigation, local assets and anchors, not the availability of external photos, registry services or every external researcher link.
- Desktop (1440px) and mobile (390px) checks found no horizontal overflow on the five edited content pages. They do not cover every device or all inherited theme combinations.
- Translation overrides cover corrected mission/medical/research/UI copy in eight non-English languages; Ann’s supplied biography remains marked as English. Human language and medical review are still listed in FEEDBACK-CHECKLIST.md.
- Photo licenses and releases were not supplied. IMAGE-CLEARANCE.csv records unresolved permissions rather than certifying them.
- No site was published, no messages were sent, and no shared storage or access grants were created.

## Disclosure-motion update

- Registry image dimensions stay fixed through single and multiple accordion expansions at desktop/mobile sizes.
- Registry and researcher disclosures show intermediate heights during both opening and closing; rapid reversals settle correctly.
- Bio switching animates the shared panel height and fades the incoming content; one bio always remains selected, including during rapid clicks and keyboard activation.
- Reduced-motion mode skips the new animations; native disclosures and research copy remain accessible with JavaScript disabled.
- New mobile navigation transitions use a short fade/slide; intrinsic-height disclosure animation progressively enhances browsers supporting interpolate-size and ::details-content.
