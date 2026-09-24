# Blood report compare

Standalone prototype, separate from the React app in `app/`. It shares no code
or build with it.

Open `index.html` in a browser (double-click works, no server or install).
`index.html` is the page; `engine.js` holds the reference data and all the
matching, range and formula logic; `styles.css` is shared styling. Keep the
three files together.
Set the profile (age, sex, pregnancy, fasting, altitude, and the lab analyzer if known: Roche, Abbott or Siemens, which switches thyroid tests to that method's ranges), then upload or paste a
lab sheet. Each value is compared with an age- and sex-specific reference range
and shown as in range / below / above, with guideline notes (ADA, ACG, AHA)
and calculated values (EKFC eGFR, LDL Friedewald + Sampson, anion gap,
corrected calcium, non-HDL, transferrin saturation).

`sample-patient.csv` is a fictional patient (use age 42, female, not pregnant).

## Input

CSV or JSON with `marker, value, unit` and an optional `range` column holding
the range printed on the lab report (`3.5-5.0`, `<200`). A lab-printed range
takes priority over the built-in one; the research range is still shown next
to it and a "Research range disagrees" label appears when the two verdicts
differ. Annotated ranges as Romanian/Moldovan labs print them are understood
(`3.33-5.54: Normal ...`, `< 8 (negativ) ...`, `Adulti: <20.5 Copii ...`).
Units are matched in conventional or SI form and converted, including
spellings such as `mii/µL`, `mil./µL` and `µUI/mL`. Values like `<8` are read
as just below 8.

BUN given in mmol/L is not converted, because labs use that unit for
different quantities; the Urea result (mmol/L) is checked instead.

## Reference data

Built into `index.html` (`REF`), taken from the clinical research document.
"Download current reference JSON" exports it; edit and load it back to try
other ranges. Pediatric ranges come mainly from CALIPER. Age brackets the research does not cover show as "unmatched".

## Self-check

Open the browser console on the page and run `selfTest()`.

Informational only, not a diagnosis.
