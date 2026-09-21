# Blood report compare

Standalone prototype, separate from the React app in `app/`. It shares no code
or build with it.

Open `index.html` in a browser (double-click works, no server or install).
Set the profile (age, sex, pregnancy, fasting, altitude), then upload or paste a
lab sheet. Each value is compared with an age- and sex-specific reference range
and shown as in range / below / above, with guideline notes (ADA, ACG, AHA)
and calculated values (EKFC eGFR, LDL Friedewald + Sampson, anion gap,
corrected calcium, non-HDL, transferrin saturation).

`sample-patient.csv` is a fictional patient (use age 42, female, not pregnant).

## Input

CSV or JSON with `marker, value, unit` and an optional `range` column holding
the range printed on the lab report (`3.5-5.0`, `<200`). A lab-printed range
takes priority over the built-in one. Units are matched in conventional or SI
form and converted.

## Reference data

Built into `index.html` (`REF`), taken from the clinical research document.
"Download current reference JSON" exports it; edit and load it back to try
other ranges. Age brackets the research does not cover show as "unmatched".

## Self-check

Open the browser console on the page and run `selfTest()`.

Informational only, not a diagnosis.
