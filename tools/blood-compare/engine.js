// Shared blood-report engine: reference data, matching, classification, formulas, table rendering.
// Used by index.html and validation.html.
// Reference data, from "Blood Test App Clinical Data" research (2026).
// unit = conventional unit; SI = conventional * siFactor + (siOffset || 0).
// Ranges are in the conventional unit. ageMin inclusive, ageMax exclusive, in years. null = open.
// sex "M"|"F"|null, pregnancy 1|2|3|null. strict: true means bounds are "<"/">" instead of "≤"/"≥".
// tiers: soft guideline labels checked in order; conditions gt/gte/lt/lte in conventional unit.
const D = 1 / 365.25, W = 7 / 365.25, MO = 1 / 12;
const r = (ageMin, ageMax, low, high, x = {}) => ({ ageMin, ageMax, low, high, ...x });
const M = { sex: "M" }, F = { sex: "F" }, LT = { strict: true };
const CELLS = { unit: "10^3/uL", siUnit: "10^9/L", siFactor: 1 };
const LAB = "Mayo Clinic / Quest / LabCorp";

let REF = { version: "research-2026-09", markers: [
  // CBC
  { id: "hgb", name: "Hemoglobin", loinc: "718-7", aliases: ["hb", "hgb", "haemoglobin", "hemoglobina"], unit: "g/dL", siUnit: "g/L", siFactor: 10, altitude: true, source: LAB, ranges: [
    r(0, 15 * D, 13.4, 20.0), r(15 * D, 5 * W, 10.0, 15.3), r(5 * W, 8 * W, 8.9, 12.7), r(8 * W, 6 * MO, 9.6, 12.4), r(6 * MO, 2, 10.1, 12.5),
    r(3, 6, 11.4, 14.3), r(6, 11, 11.5, 14.7), r(11, 15, 12.4, 15.7), r(15, 18, 13.3, 16.9, M), r(15, 18, 11.9, 14.8, F),
    r(18, null, 13.2, 16.6, M), r(18, null, 11.6, 15.0, F),
    r(null, null, 11.0, null, { ...F, pregnancy: 1, source: "CDC pregnancy cutoff" }), r(null, null, 10.5, null, { ...F, pregnancy: 2, source: "CDC pregnancy cutoff" }), r(null, null, 11.0, null, { ...F, pregnancy: 3, source: "CDC pregnancy cutoff" }) ] },
  { id: "hct", name: "Hematocrit", loinc: "4544-3", aliases: ["hct", "haematocrit", "pcv", "hematocrit"], unit: "%", siUnit: "L/L", siFactor: 0.01, source: LAB, ranges: [
    r(0, 15 * D, 39.6, 57.2), r(6 * MO, 2, 30.8, 37.9), r(15, 18, 40.0, 50.0, M), r(15, 18, 35.0, 43.0, F), r(18, null, 38.3, 48.6, M), r(18, null, 35.5, 44.9, F) ] },
  { id: "rbc", name: "RBC", loinc: "789-8", aliases: ["red blood cells", "erythrocytes", "red cell count", "eritrocite", "numar eritrocite"], unit: "10^6/uL", siUnit: "10^12/L", siFactor: 1, source: LAB, ranges: [
    r(6 * MO, 2, 4.03, 5.07), r(18, null, 4.35, 5.65, M), r(18, null, 3.92, 5.13, F) ] },
  { id: "mcv", name: "MCV", loinc: "787-2", aliases: ["mean corpuscular volume", "vem", "volum eritrocitar mediu"], unit: "fL", siUnit: "fL", siFactor: 1, source: LAB, ranges: [
    r(0, 15 * D, 91.3, 106.4), r(6 * MO, 2, 69.5, 81.7), r(3, 6, 77.2, 89.5), r(18, null, 78.2, 97.9) ] },
  { id: "mch", name: "MCH", loinc: "785-6", aliases: ["mean corpuscular hemoglobin", "hem", "hemoglobina eritrocitara medie"], unit: "pg", siUnit: "pg", siFactor: 1, source: LAB, ranges: [r(18, null, 27.0, 32.0)] },
  { id: "mchc", name: "MCHC", loinc: "786-4", aliases: ["chem", "concentratie medie a hb/eritrocit"], unit: "g/dL", siUnit: "g/L", siFactor: 10, source: LAB, ranges: [r(18, null, 31.5, 35.5)] },
  { id: "rdw", name: "RDW-CV", loinc: "788-0", aliases: ["rdw", "red cell distribution width", "largimea distributiei eritrocitare"], unit: "%", siUnit: "%", siFactor: 1, source: LAB, ranges: [
    r(0, 15 * D, 14.6, 17.3), r(3, 6, 11.3, 13.4), r(18, null, 11.8, 14.5, M), r(18, null, 12.2, 16.1, F) ] },
  { id: "wbc", name: "WBC", loinc: "6690-2", aliases: ["white blood cells", "leukocytes", "white cell count", "leucocite", "numar leucocite"], ...CELLS, source: LAB, ranges: [
    r(0, 15 * D, 8.0, 15.4), r(2, 3, 5.1, 13.4), r(6, 18, 3.8, 10.4), r(18, null, 3.4, 9.6) ] },
  { id: "neut", name: "Neutrophils (abs)", loinc: "751-8", aliases: ["neutrophils", "anc", "neu#", "neutrofile", "neutrofil"], ...CELLS, source: LAB, ranges: [r(18, null, 1.5, 8.0)] },
  { id: "lymph", name: "Lymphocytes (abs)", loinc: "731-0", aliases: ["lymphocytes", "lym#", "limfocite", "limfocit"], ...CELLS, source: LAB, ranges: [r(18, null, 1.0, 4.8)] },
  { id: "mono", name: "Monocytes (abs)", loinc: "742-7", aliases: ["monocytes", "mon#", "monocite", "monocit"], ...CELLS, source: LAB, ranges: [r(18, null, 0.2, 0.8)] },
  { id: "eos", name: "Eosinophils (abs)", loinc: "711-2", aliases: ["eosinophils", "eos#", "eozinofile", "eozinofil"], ...CELLS, source: LAB, ranges: [r(18, null, 0.0, 0.5)] },
  { id: "baso", name: "Basophils (abs)", loinc: "704-7", aliases: ["basophils", "bas#", "bazofile", "bazofil"], ...CELLS, source: LAB, ranges: [r(18, null, 0.0, 0.2)] },
  { id: "plt", name: "Platelets", loinc: "777-3", aliases: ["plt", "platelet count", "thrombocytes", "trombocite", "numar trombocite"], ...CELLS, source: LAB, ranges: [
    r(0, 15 * D, 144, 449), r(6 * MO, 2, 206, 459), r(14, 18, 139, 320), r(18, null, 135, 317, M), r(18, null, 157, 371, F) ],
    tiers: [{ lt: 50, label: "< 50: needs bleeding-risk review" }, { lt: 100, label: "< 100: actionable low" }] },
  { id: "mpv", name: "MPV", loinc: "32623-1", aliases: ["mean platelet volume", "volum trombocitar mediu", "vtm"], unit: "fL", siUnit: "fL", siFactor: 1, source: LAB, ranges: [r(18, null, 8.5, 12.0)] },

  // Metabolic panel
  { id: "na", name: "Sodium", loinc: "2951-2", aliases: ["na", "sodiu"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB, ranges: [r(18, null, 135, 145)] },
  { id: "k", name: "Potassium", loinc: "2823-3", aliases: ["k", "potasiu"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB + " (falsely high if sample hemolyzed)", ranges: [r(18, null, 3.5, 5.2)] },
  { id: "cl", name: "Chloride", loinc: "2075-0", aliases: ["cl", "clor"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB, ranges: [r(1, 18, 102, 112), r(18, null, 98, 107)] },
  { id: "hco3", name: "Bicarbonate", loinc: "1963-8", aliases: ["hco3", "co2", "total co2", "bicarb"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB, ranges: [r(1, 4, 18, 25), r(18, null, 22, 29)] },
  // BUN in mmol/L is not comparable between labs (some print urea × 28/60), so it is not converted. Urea is checked instead.
  { id: "bun", name: "BUN", loinc: "3094-0", aliases: ["urea nitrogen", "blood urea nitrogen"], unit: "mg/dL", siUnit: null, siFactor: null, source: LAB,
    unitNote: "BUN in mmol/L means different things at different labs; the Urea result is checked instead.", ranges: [
    r(1, 18, 7, 20), r(18, null, 8, 24, M), r(18, null, 6, 21, F) ] },
  // Urea mmol/L = BUN mg/dL × 0.357, so these are the BUN ranges above, converted.
  { id: "urea", name: "Urea", loinc: "22664-7", aliases: ["uree", "urea serica", "serum urea"], unit: "mmol/L", siUnit: null, siFactor: null, source: "BUN research range × 0.357", ranges: [
    r(1, 18, 2.50, 7.14), r(18, null, 2.86, 8.57, M), r(18, null, 2.14, 7.50, F) ] },
  { id: "crea", name: "Creatinine", loinc: "2160-0", aliases: ["creat", "serum creatinine", "creatinina"], unit: "mg/dL", siUnit: "umol/L", siFactor: 88.4, source: LAB, ranges: [
    r(0, 1, 0.17, 0.42), r(1, 6, 0.19, 0.49), r(6, 11, 0.26, 0.61), r(11, 15, 0.35, 0.86), r(15, null, 0.74, 1.35, M), r(15, null, 0.59, 1.04, F) ] },
  { id: "ca", name: "Calcium (total)", loinc: "17861-6", aliases: ["ca", "calcium", "total calcium", "calciu"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.2495, source: LAB, ranges: [
    r(0, 1, 8.7, 11.0), r(1, 18, 9.3, 10.6), r(18, 60, 8.6, 10.0), r(60, null, 8.8, 10.2) ] },
  { id: "mg", name: "Magnesium", loinc: "19123-9", aliases: ["mg", "magneziu"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.411, source: LAB, ranges: [r(18, null, 1.6, 2.3)] },
  { id: "phos", name: "Phosphate", loinc: "2777-1", aliases: ["phosphorus", "po4", "fosfor"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.323, source: LAB, ranges: [r(18, null, 2.5, 4.5)] },
  { id: "glu", name: "Glucose (fasting)", loinc: "1558-6", aliases: ["glucose", "fasting glucose", "fbg", "glycemia", "glicemie", "glucoza"], fasting: true, unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0555, source: "ADA", ranges: [r(18, null, 70, 99)],
    tiers: [{ gte: 126, label: "≥ 126: diabetes range (ADA)" }, { gte: 100, label: "100–125: prediabetes (ADA)" }] },
  { id: "glur", name: "Glucose (random)", loinc: "2345-7", aliases: ["glucose", "random glucose", "glycemia", "glicemie", "glucoza"], fasting: false, unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0555, source: "ADA", ranges: [r(18, null, 70, 140)],
    tiers: [{ gte: 200, label: "≥ 200: diabetes range if symptomatic (ADA)" }] },
  { id: "tp", name: "Total protein", loinc: "2885-2", aliases: ["protein", "proteine totale"], unit: "g/dL", siUnit: "g/L", siFactor: 10, source: LAB, ranges: [r(1, null, 6.3, 8.2)] },
  { id: "alb", name: "Albumin", loinc: "1751-7", aliases: ["alb", "albumina"], unit: "g/dL", siUnit: "g/L", siFactor: 10, source: LAB, ranges: [r(1, null, 3.5, 5.0)] },

  // Liver
  { id: "alt", name: "ALT", loinc: "1743-4", aliases: ["1742-6", "alanine aminotransferase", "sgpt", "tgp", "alat", "gpt", "alaninaminotransferaza"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: "Lab range; ACG healthy limit shown as note", ranges: [
    r(18, null, 7, 55, M), r(18, null, 7, 45, F) ],
    tiers: [{ sex: "M", gte: 33, label: "Above ACG healthy limit (< 33)" }, { sex: "F", gte: 25, label: "Above ACG healthy limit (< 25)" }] },
  { id: "ast", name: "AST", loinc: "30239-8", aliases: ["1920-8", "aspartate aminotransferase", "sgot", "tgo", "asat", "got", "aspartataminotransferaza"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: LAB, ranges: [
    r(1, 14, 8, 60), r(18, null, 8, 48, M), r(18, null, 8, 43, F) ] },
  { id: "alp", name: "ALP", loinc: "6768-6", aliases: ["alkaline phosphatase", "alk phos", "fosfataza alcalina"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: LAB + " (high in growing children)", ranges: [
    r(0, 15 * D, 83, 248), r(1, 11, 142, 335), r(13, 16, 116, 468, M), r(19, null, 40, 129) ] },
  { id: "ggt", name: "GGT", loinc: "2324-2", aliases: ["gamma-glutamyl transferase", "gamma gt", "gama-glutamiltransferaza", "gama glutamiltransferaza"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: LAB, ranges: [
    r(0, 1, null, 178, LT), r(1, 7, null, 21, LT), r(18, null, 8, 61, M), r(18, null, 5, 36, F) ] },
  { id: "tbil", name: "Total bilirubin", loinc: "1975-2", aliases: ["bilirubin", "bilirubina totala", "tbil"], unit: "mg/dL", siUnit: "umol/L", siFactor: 17.1, source: LAB + " (mild isolated rise often Gilbert's)", ranges: [r(18, null, 0.1, 1.2)] },
  { id: "dbil", name: "Direct bilirubin", loinc: "1968-7", aliases: ["conjugated bilirubin", "bilirubina directa", "dbil"], unit: "mg/dL", siUnit: "umol/L", siFactor: 17.1, source: LAB, ranges: [r(18, null, 0.0, 0.3)] },

  // Lipids (pediatric = AAP/NHLBI "acceptable", adult = AHA "desirable")
  { id: "tc", name: "Total cholesterol", loinc: "2093-3", aliases: ["cholesterol", "chol", "total chol", "colesterol total"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0259, source: "AHA / NHLBI / AAP", ranges: [
    r(2, 20, null, 170, LT), r(20, null, null, 200, LT) ] },
  { id: "ldl", name: "LDL cholesterol", loinc: "13457-7", aliases: ["ldl", "ldl-c", "ldl colesterol"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0259, source: "AHA (high-risk target < 70 or < 55)", ranges: [
    r(2, 20, null, 110, LT), r(20, null, null, 100, LT) ] },
  { id: "hdl", name: "HDL cholesterol", loinc: "2085-9", aliases: ["hdl", "hdl-c", "hdl colesterol"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0259, source: "AHA / AAP", ranges: [
    r(2, 20, 45, null, LT), r(20, null, 40, null, { ...M, ...LT }), r(20, null, 50, null, { ...F, ...LT }) ] },
  { id: "tg", name: "Triglycerides", loinc: "2571-8", aliases: ["tg", "trig", "trigliceride"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0113, source: "AHA / NHLBI (fasting)", ranges: [
    r(0, 10, null, 75, LT), r(10, 20, null, 90, LT), r(20, null, null, 150, LT) ] },
  { id: "nonhdl", name: "Non-HDL cholesterol", loinc: "43396-1", aliases: ["non-hdl", "non hdl"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0259, source: "AHA / NHLBI", ranges: [
    r(2, 20, null, 120, LT), r(20, null, null, 130, LT) ] },
  { id: "apob", name: "ApoB", loinc: "1884-6", aliases: ["apolipoprotein b", "apo b"], unit: "mg/dL", siUnit: "g/L", siFactor: 0.01, source: "AHA (high-risk target < 70 or < 55)", ranges: [r(18, null, null, 90, LT)] },
  // Lp(a): mass and molar are separate on purpose. Converting between them is unreliable (KIV-2 size variation).
  { id: "lpa", name: "Lp(a)", loinc: "10835-7", aliases: ["lipoprotein(a)", "lipoprotein a", "lpa"], unit: "mg/dL", siUnit: null, siFactor: null, source: "EAS / ACC", ranges: [r(18, null, null, 30, LT)],
    tiers: [{ gt: 50, label: "> 50 mg/dL: high risk" }] },
  { id: "lpam", name: "Lp(a) (molar)", loinc: "43583-4", aliases: ["lp(a)", "lipoprotein(a)", "lipoprotein a", "lpa"], unit: "nmol/L", siUnit: null, siFactor: null, source: "EAS / ACC", ranges: [r(18, null, null, 75, LT)],
    tiers: [{ gt: 125, label: "> 125 nmol/L: high risk" }] },

  // Thyroid
  { id: "tsh", name: "TSH", loinc: "11579-0", aliases: ["3016-3", "thyrotropin", "thyroid stimulating hormone"], unit: "mIU/L", siUnit: "uIU/mL", siFactor: 1, source: "Quest / ATA", ranges: [
    r(18, null, 0.45, 4.50),
    r(null, null, 0.10, 2.50, { ...F, pregnancy: 1, source: "ATA; up to 4.0 acceptable if TPO-Ab negative" }),
    r(null, null, 0.20, 3.00, { ...F, pregnancy: 2, source: "ATA; up to 4.0 acceptable if TPO-Ab negative" }),
    r(null, null, 0.30, 3.00, { ...F, pregnancy: 3, source: "ATA; up to 4.0 acceptable if TPO-Ab negative" }) ] },
  { id: "ft4", name: "Free T4", loinc: "3024-7", aliases: ["ft4", "free thyroxine", "t4 liber"], unit: "ng/dL", siUnit: "pmol/L", siFactor: 12.87, source: LAB, ranges: [
    r(18, null, 0.8, 1.8), r(null, null, 0.8, 1.7, { ...F, pregnancy: 1 }) ] },
  { id: "ft3", name: "Free T3", loinc: "3026-2", aliases: ["ft3", "free triiodothyronine", "t3 liber"], unit: "pg/mL", siUnit: "pmol/L", siFactor: 1.536, source: LAB, ranges: [r(18, null, 2.0, 4.4)] },
  { id: "tpo", name: "TPO antibodies", loinc: "8099-4", aliases: ["anti-tpo", "tpo ab", "atpo"], unit: "IU/mL", siUnit: "kIU/L", siFactor: 1, source: "Assay dependent", ranges: [r(18, null, null, 9.0, LT)] },
  { id: "tgab", name: "Thyroglobulin antibodies", loinc: "8098-6", aliases: ["tgab", "anti-tg", "atg"], unit: "IU/mL", siUnit: "kIU/L", siFactor: 1, source: "Assay dependent", ranges: [r(18, null, null, 4.0, LT)] },

  // Vitamins / iron
  { id: "vitd", name: "Vitamin D (25-OH)", loinc: "62288-6", aliases: ["1989-3", "vitamin d", "25-oh vitamin d", "25(oh)d", "calcidiol", "vitamina d"], unit: "ng/mL", siUnit: "nmol/L", siFactor: 2.496, source: "Endocrine Society", ranges: [r(18, null, 30, 100)],
    tiers: [{ lt: 20, label: "< 20: deficient" }, { lt: 30, label: "20–29: insufficient" }] },
  { id: "b12", name: "Vitamin B12", loinc: "2132-9", aliases: ["b12", "cobalamin", "vitamina b12"], unit: "pg/mL", siUnit: "pmol/L", siFactor: 0.738, source: "Mayo Clinic Laboratories", ranges: [r(18, null, 200, 1100)],
    tiers: [{ gte: 200, lte: 400, label: "200–400: possible subclinical deficiency (check MMA)" }] },
  { id: "folate", name: "Folate", loinc: "2284-8", aliases: ["folic acid", "acid folic", "folat"], unit: "ng/mL", siUnit: "nmol/L", siFactor: 2.266, source: "Mayo Clinic Laboratories", ranges: [r(18, null, 4.0, null, LT)] },
  { id: "ferr", name: "Ferritin", loinc: "22702-5", aliases: ["2276-4", "ferritina"], unit: "ng/mL", siUnit: "ug/L", siFactor: 1, source: "Mayo Clinic (rises with inflammation)", ranges: [
    r(18, null, 24, 336, M), r(18, null, 11, 307, F) ] },
  { id: "iron", name: "Serum iron", loinc: "2498-4", aliases: ["iron", "fe", "sideremie", "fier"], unit: "ug/dL", siUnit: "umol/L", siFactor: 0.179, source: "Mayo Clinic", ranges: [
    r(18, null, 65, 176, M), r(18, null, 50, 170, F) ] },
  { id: "tibc", name: "TIBC", loinc: "2500-7", aliases: ["total iron binding capacity"], unit: "ug/dL", siUnit: "umol/L", siFactor: 0.179, source: "Mayo Clinic", ranges: [r(18, null, 250, 450)] },
  { id: "tsat", name: "Transferrin saturation", loinc: "2502-3", aliases: ["tsat", "iron saturation"], unit: "%", siUnit: "fraction", siFactor: 0.01, source: "Mayo Clinic", ranges: [r(18, null, 20, 50)] },

  // Inflammatory / other
  { id: "hscrp", name: "hs-CRP", loinc: "30522-7", aliases: ["hscrp", "high sensitivity crp", "crp hs"], unit: "mg/L", siUnit: "mg/L", siFactor: 1, source: "AHA (cardiovascular risk)", ranges: [r(18, null, null, 3.0, LT)] },
  { id: "esr", name: "ESR", loinc: "4538-4", aliases: ["sed rate", "vsh", "sedimentation rate"], unit: "mm/h", siUnit: "mm/hr", siFactor: 1, miller: true, source: "Lab range, raised to Miller age limit when higher", ranges: [
    r(18, null, 0, 15, M), r(18, null, 0, 20, F) ] },
  { id: "hba1c", name: "HbA1c", loinc: "4548-4", aliases: ["a1c", "glycated hemoglobin", "hemoglobin a1c", "hemoglobina glicata"], unit: "%", siUnit: "mmol/mol", siFactor: 10.929, siOffset: -23.5, source: "ADA", ranges: [r(18, null, 4.0, 5.6)],
    tiers: [{ gte: 6.5, label: "≥ 6.5: diabetes range (ADA)" }, { gte: 5.7, label: "5.7–6.4: prediabetes (ADA)" }] },
  { id: "uric", name: "Uric acid", loinc: "3084-1", aliases: ["urate", "acid uric"], unit: "mg/dL", siUnit: "umol/L", siFactor: 59.48, source: LAB, ranges: [
    r(18, null, 4.0, 8.5, M), r(18, null, 2.7, 7.3, F) ] }
] };

const $ = id => document.getElementById(id);
const norm = s => String(s ?? "").toLowerCase().replace(/µ|μ/g, "u").replace(/[\s_]/g, "").replace(/^x/, "");
// Unit spellings seen on real reports (Romanian labs) mapped to the spelling used in REF.
const UNIT_SYN = { "mii/ul": "10^3/ul", "mil./ul": "10^6/ul", "mil/ul": "10^6/ul", "ui/ml": "iu/ml", "uui/ml": "uiu/ml", "pg/cell": "pg", "ui/l": "iu/l" };
const normUnit = u => UNIT_SYN[norm(u)] ?? norm(u);
// "Hemoglobina {Hb}", "Fier (sideremie)" -> "hemoglobina", "fier"
const stripNote = s => String(s ?? "").replace(/\s*[({[].*?[)}\]]/g, "");

const fitsProfile = (x, p) =>
  (x.sex == null || x.sex === p.sex) &&
  (x.ageMin ?? 0) <= p.age && p.age < (x.ageMax ?? 200) &&
  (x.pregnancy == null || x.pregnancy === p.trimester);

// Returns value in the marker's conventional unit, or null if the unit is unknown.
function toConventional(m, value, unit) {
  const u = normUnit(unit);
  if (!u || u === normUnit(m.unit)) return value;
  if (m.siFactor && u === normUnit(m.siUnit)) return (value - (m.siOffset || 0)) / m.siFactor;
  return null;
}

// Inverse of toConventional: a conventional value expressed in `unit`.
function fromConventional(m, value, unit) {
  const u = normUnit(unit);
  if (value == null || !u || u === normUnit(m.unit)) return value;
  if (m.siFactor && u === normUnit(m.siUnit)) return value * m.siFactor + (m.siOffset || 0);
  return null;
}

// Name match first. When several markers share a name (glucose, Lp(a)), prefer unit fit, then fasting state.
function findMarker(name, unit, p) {
  const match = n => REF.markers.filter(m => [m.name, m.id, m.loinc, ...(m.aliases || [])].some(a => norm(a) === n));
  let hits = match(norm(name));
  if (!hits.length) hits = match(norm(stripNote(name)));
  const score = m => (toConventional(m, 1, unit) != null ? 2 : 0) + (m.fasting == null || m.fasting === p.fasting ? 1 : 0);
  return hits.sort((a, b) => score(b) - score(a))[0];
}

// Most specific range wins: pregnancy > sex > age-bounded. Gaps in the research stay unmatched.
function pickRange(m, p) {
  const score = x => (x.pregnancy ? 4 : 0) + (x.sex ? 2 : 0) + (x.ageMin != null || x.ageMax != null ? 1 : 0);
  const best = m.ranges.filter(x => fitsProfile(x, p)).sort((a, b) => score(b) - score(a))[0];
  if (!best) return null;
  const out = { ...best };
  if (m.miller && out.high != null) {
    const miller = p.sex === "M" ? p.age / 2 : (p.age + 10) / 2;
    if (miller > out.high) { out.high = miller; out.source = "Miller age-adjusted limit"; }
  }
  // ponytail: linear altitude rule from the research (~0.5 g/dL per 1000 m above 1500 m); WHO table if precision matters.
  if (m.altitude && p.altitude > 1500) {
    const add = 0.5 * (p.altitude - 1500) / 1000;
    if (out.low != null) out.low += add;
    if (out.high != null) out.high += add;
    out.source = `Adjusted +${add.toFixed(2)} ${m.unit} for ${p.altitude} m altitude`;
  }
  return out;
}

function classify(v, x) {
  if (x.low != null && (x.strict ? v <= x.low : v < x.low)) return "low";
  if (x.high != null && (x.strict ? v >= x.high : v > x.high)) return "high";
  return "normal";
}

function pickTier(m, v, p) {
  return (m?.tiers || []).find(t => fitsProfile(t, p) &&
    (t.gt == null || v > t.gt) && (t.gte == null || v >= t.gte) &&
    (t.lt == null || v < t.lt) && (t.lte == null || v <= t.lte))?.label || null;
}

// "<8" means below 8, so nudge censored values just past the bound they name.
function parseNumber(x) {
  const s = String(x ?? "").trim();
  const n = parseFloat(s.replace(",", ".").replace(/^[<>≤≥=\s]+/, ""));
  if (!Number.isFinite(n)) return null;
  const nudge = Math.max(Math.abs(n), 1) * 1e-6;
  return s[0] === "<" ? n - nudge : s[0] === ">" ? n + nudge : n;
}

// Lab-printed range. Plain: "3.5-5.0", "3,5 - 5,0", "<200", ">40", "≤ 5".
// Annotated, as real reports print them: "3.33-5.54: Normal 5.55-6.99: ...", "< 8 (negativ) 8-20 (echivoc) ...",
// "Adulti: <20.5 Copii > 1 luna: < 17.1" (picked by age).
const RANGE_TOKEN = String.raw`(-?\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?|[<>≤≥]=?\s*\d+(?:\.\d+)?)`;
function parseRange(s, age = 18) {
  s = String(s ?? "").trim().replace(/(\d),(\d)/g, "$1.$2");
  if (!s) return null;
  const pick = re => { const m = s.match(new RegExp(re, "i")); return m && plainRange(m[1]); };
  return plainRange(s)
    || pick(RANGE_TOKEN + String.raw`\s*:?\s*\(?\s*(?:normal|negativ)`)
    || pick((age >= 18 ? String.raw`adult\w*` : "copii[^:]*") + String.raw`\s*:\s*` + RANGE_TOKEN);
}
function plainRange(s) {
  s = s.trim();
  const between = s.match(/^(-?[\d.]+)\s*[-–]\s*([\d.]+)$/);
  if (between) return { low: +between[1], high: +between[2], source: "Lab report range" };
  const one = s.match(/^([<>≤≥])=?\s*([\d.]+)$/);
  if (!one) return null;
  const strict = one[1] === "<" || one[1] === ">", upper = one[1] === "<" || one[1] === "≤";
  return { low: upper ? null : +one[2], high: upper ? +one[2] : null, strict, source: "Lab report range" };
}

function splitCSVLine(line, sep) {
  const cells = []; let cur = "", q = false;
  for (const c of line) {
    if (c === '"') q = !q;
    else if (c === sep && !q) { cells.push(cur.trim()); cur = ""; }
    else cur += c;
  }
  return [...cells, cur.trim()];
}

function parseLab(text) {
  text = text.trim();
  if (!text) return [];
  if (text[0] === "[" || text[0] === "{") {
    const j = JSON.parse(text);
    return (Array.isArray(j) ? j : j.results || []).map(x => ({ marker: x.marker ?? x.name ?? x.test, value: x.value ?? x.result, unit: x.unit ?? "", range: x.range ?? "" }));
  }
  const first = text.split(/\r?\n/)[0];
  const sep = first.includes("\t") ? "\t" : first.includes(";") ? ";" : ","; // ";" files often use comma decimals
  const rows = text.split(/\r?\n/).filter(l => l.trim()).map(l => splitCSVLine(l, sep));
  if (parseNumber(rows[0][1]) == null) rows.shift(); // header row
  return rows.map(([marker, value, unit, range]) => ({ marker, value, unit: unit || "", range: range || "" }));
}

// Calculated measurements. Inputs in conventional units.
const CALC = {
  // EKFC (Pottel et al., Ann Intern Med 2021). Ages 2+. Q = median creatinine of healthy population (µmol/L).
  ekfcQ(age, sex) {
    if (age >= 25) return sex === "F" ? 62 : 80;
    const L = Math.log(age);
    return Math.exp(sex === "F"
      ? 3.080 + 0.177 * age - 0.223 * L - 0.00596 * age ** 2 + 0.0000686 * age ** 3
      : 3.200 + 0.259 * age - 0.543 * L - 0.00763 * age ** 2 + 0.0000790 * age ** 3);
  },
  egfr(scrMgDl, age, sex) {
    if (age < 2) return null;
    const x = scrMgDl * 88.4 / CALC.ekfcQ(age, sex);
    return 107.3 * x ** (x < 1 ? -0.322 : -1.132) * (age > 40 ? 0.990 ** (age - 40) : 1);
  },
  anionGap: (na, cl, hco3) => na - (cl + hco3),
  correctedCa: (ca, alb) => ca + 0.8 * (4 - alb),
  ldlFriedewald: (tc, hdl, tg) => tg >= 400 ? null : tc - hdl - tg / 5,
  // Sampson / NIH equation 2 (JAMA Cardiol 2020). Valid TG ≤ 800 mg/dL.
  ldlSampson: (tc, hdl, tg) => tg > 800 ? null : tc / 0.948 - hdl / 0.971 - (tg / 8.56 + tg * (tc - hdl) / 2140 - tg ** 2 / 16100) - 9.44
};
const ckdStage = g => g >= 90 ? "G1" : g >= 60 ? "G2" : g >= 45 ? "G3a" : g >= 30 ? "G3b" : g >= 15 ? "G4" : "G5";

function analyse(rows, p) {
  const out = rows.map(x => {
    const m = findMarker(x.marker, x.unit, p), raw = parseNumber(x.value);
    const o = { name: m ? m.name : x.marker, sub: m ? "LOINC " + m.loinc : "", input: x, raw, id: m?.id };
    if (raw == null) return { ...o, status: "none", why: "Value not numeric" };
    const v = m ? toConventional(m, raw, x.unit) : null;
    o.v = v;
    const labR = parseRange(x.range, p.age);
    if (labR) {
      // Lab range wins. The research range still runs alongside so disagreements are visible.
      Object.assign(o, { dv: raw, du: x.unit, range: labR });
      const rr = m && v != null && pickRange(m, p);
      if (rr) {
        const rs = classify(v, rr);
        o.research = `Research: ${rangeText(rr, m.unit)} → ${rs}`;
        o.disagree = rs !== classify(raw, labR);
      }
    }
    else if (!m) return { ...o, status: "none", why: "No reference entry" };
    else if (v == null) return { ...o, status: "none", why: m.unitNote || `Unknown unit "${x.unit}" (expected ${m.unit}${m.siUnit ? " or " + m.siUnit : ""})` };
    else {
      const range = pickRange(m, p);
      if (!range) return { ...o, status: "none", why: "No research range for this age/sex" };
      Object.assign(o, { dv: v, du: m.unit, range });
      if (x.unit && normUnit(x.unit) !== normUnit(m.unit)) o.conv = `${raw} ${x.unit} → ${fmt(v)} ${m.unit}`;
    }
    o.status = classify(o.dv, o.range);
    o.source = o.range.source || m?.source || "";
    o.tier = v != null ? pickTier(m, v, p) : null;
    return o;
  });

  const val = id => out.find(o => o.id === id && o.v != null)?.v;
  const has = (...ids) => ids.every(id => val(id) != null);
  const calc = [];
  const add = (name, v, unit, note, asId, range) => {
    if (v == null || !Number.isFinite(v)) return;
    const m = asId && REF.markers.find(x => x.id === asId);
    const rg = range || (m && pickRange(m, p));
    calc.push({ name, sub: note, dv: v, du: unit, range: rg, status: rg ? classify(v, rg) : "none",
      why: rg ? "" : "Interpretation in note", tier: m ? pickTier(m, v, p) : null, source: rg?.source || m?.source || "" });
  };
  if (has("crea")) {
    const g = CALC.egfr(val("crea"), p.age, p.sex);
    add("eGFR (EKFC)", g, "mL/min/1.73m²", g ? `KDIGO ${ckdStage(g)}. G1 ≥ 90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 < 15` : "", null, g ? { low: 60, high: null, source: "KDIGO: < 60 for 3 months = CKD" } : null);
  }
  if (has("na", "cl", "hco3")) add("Anion gap", CALC.anionGap(val("na"), val("cl"), val("hco3")), "mmol/L", "Na − (Cl + HCO3), without K", null, { low: 7, high: 15, source: "Range for formula without K" });
  if (has("ca", "alb") && val("alb") < 4) add("Corrected calcium", CALC.correctedCa(val("ca"), val("alb")), "mg/dL", "Ca + 0.8 × (4 − albumin); shown when albumin < 4 g/dL", "ca");
  if (!has("ldl") && has("tc", "hdl", "tg")) {
    add("LDL (Friedewald)", CALC.ldlFriedewald(val("tc"), val("hdl"), val("tg")), "mg/dL", "TC − HDL − TG/5; invalid when TG ≥ 400", "ldl");
    add("LDL (Sampson/NIH)", CALC.ldlSampson(val("tc"), val("hdl"), val("tg")), "mg/dL", "Valid up to TG 800; better when TG high or LDL < 70", "ldl");
  }
  if (!has("nonhdl") && has("tc", "hdl")) add("Non-HDL cholesterol", val("tc") - val("hdl"), "mg/dL", "TC − HDL", "nonhdl");
  if (!has("tsat") && has("iron", "tibc")) add("Transferrin saturation", val("iron") / val("tibc") * 100, "%", "Iron / TIBC × 100", "tsat");
  if (has("ast", "alt")) add("AST/ALT ratio", val("ast") / val("alt"), "", "> 2 suggests alcohol-associated liver disease (ACG)", null, { low: null, high: 2, source: "ACG" });
  return { out, calc };
}

const fmt = x => x == null ? "–" : +x.toFixed(2);
function rangeText(x, u) {
  const [lo, hi] = x.strict ? [">", "<"] : ["≥", "≤"];
  if (x.low != null && x.high != null) return `${fmt(x.low)}–${fmt(x.high)} ${u}`;
  return x.low != null ? `${lo} ${fmt(x.low)} ${u}` : `${hi} ${fmt(x.high)} ${u}`;
}

function barHTML(o) {
  const { low, high } = o.range, v = o.dv;
  const lo = low ?? 0, hi = high ?? low * 2;
  const span = hi - lo || 1;
  const min = Math.min(lo - span * 0.5, v), max = Math.max(hi + span * 0.5, v);
  const pct = x => ((x - min) / (max - min)) * 100;
  const bandL = low == null ? 0 : pct(low), bandR = high == null ? 100 : pct(high);
  return `<div class="bar" role="img" aria-label="${esc(`${o.status}: ${fmt(v)} against ${rangeText(o.range, o.du)}`)}">
      <div class="band" style="left:${bandL}%;width:${bandR - bandL}%"></div>
      <div class="dot ${o.status}" style="left:${Math.min(98, Math.max(2, pct(v)))}%"></div></div>
    <div class="scale"><span>${fmt(min)}</span><span>${fmt(max)}</span></div>`;
}

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
function rowHTML(o) {
  const value = o.dv != null ? `${fmt(o.dv)} ${esc(o.du)}` : `${esc(o.raw ?? o.input?.value)} ${esc(o.input?.unit)}`;
  return `<tr>
    <td><b>${esc(o.name)}</b><div class="small">${esc(o.sub)}</div></td>
    <td class="num">${value}${o.conv ? `<div class="small">${esc(o.conv)}</div>` : ""}</td>
    <td class="num">${o.range ? rangeText(o.range, esc(o.du)) : "–"}<div class="small">${esc(o.source)}</div>${o.research ? `<div class="small">${esc(o.research)}</div>` : ""}</td>
    <td>${o.range ? barHTML(o) : `<span class="small">${esc(o.why)}</span>`}</td>
    <td><span class="chip ${o.status}">${o.status === "none" ? "unmatched" : o.status}</span>${o.tier ? `<br><span class="chip tier">${esc(o.tier)}</span>` : ""}${o.disagree ? `<br><span class="chip tier">Research range disagrees</span>` : ""}</td></tr>`;
}
const tableHTML = rows => `<div class="tablewrap"><table><thead><tr><th>Marker</th><th>Value</th><th>Reference</th><th style="width:28%">Position</th><th>Status</th></tr></thead>
  <tbody>${rows.map(rowHTML).join("") || `<tr><td colspan="5" class="small">Nothing in this group.</td></tr>`}</tbody></table></div>`;


// Self-check: open index.html#test, or call selfTest() from the console.
function selfTest() {
  const eq = (a, b, tol = 0.5) => a != null && Math.abs(a - b) <= tol;
  const P = (x = {}) => ({ age: 35, sex: "M", trimester: 0, fasting: true, altitude: 0, ...x });
  const byId = id => REF.markers.find(m => m.id === id);
  const hgb = byId("hgb");
  const checks = [
    ["alias lookup", findMarker("haemoglobin", "", P())?.id === "hgb"],
    ["fasting picks fasting glucose", findMarker("Glucose", "mg/dL", P())?.id === "glu"],
    ["non-fasting picks random glucose", findMarker("Glucose", "mg/dL", P({ fasting: false }))?.id === "glur"],
    ["Lp(a) nmol/L picks molar entry", findMarker("Lp(a)", "nmol/L", P())?.id === "lpam"],
    ["SI to conventional", eq(toConventional(byId("glu"), 5.5, "mmol/L"), 99.1)],
    ["HbA1c IFCC to %", eq(toConventional(byId("hba1c"), 48, "mmol/mol"), 6.54, 0.05)],
    ["unknown unit rejected", toConventional(byId("glu"), 5.5, "g/L") === null],
    ["pregnancy range wins", pickRange(hgb, P({ sex: "F", trimester: 2 })).low === 10.5],
    ["neonate 10 days", pickRange(hgb, P({ age: 10 * D })).low === 13.4],
    ["age gap stays unmatched (Hb 2.5 y)", pickRange(hgb, P({ age: 2.5 })) === null],
    ["altitude raises Hb", eq(pickRange(hgb, P({ altitude: 2500 })).low, 13.7, 0.001)],
    ["ESR Miller for 70 y male", pickRange(byId("esr"), P({ age: 70 })).high === 35],
    ["strict '<200': 200 is high", classify(200, { high: 200, strict: true }) === "high" && classify(199, { high: 200, strict: true }) === "normal"],
    ["ALT soft tier female", pickTier(byId("alt"), 30, P({ sex: "F" })) != null && pickTier(byId("alt"), 30, P()) == null],
    ["vit D tier order", pickTier(byId("vitd"), 15, P()).startsWith("< 20")],
    ["EKFC male 50 y Scr 1.0", eq(CALC.egfr(1.0, 50, "M"), 86.7)],
    ["EKFC Q at 25 y continuous", eq(CALC.ekfcQ(24.99, "M"), 80, 1.5)],
    ["EKFC under 2 y = null", CALC.egfr(0.3, 1, "M") === null],
    ["Sampson LDL", eq(CALC.ldlSampson(200, 50, 150), 123.4)],
    ["Friedewald TG limit", CALC.ldlFriedewald(200, 50, 450) === null],
    ["anion gap", CALC.anionGap(140, 104, 24) === 12],
    ["corrected Ca", eq(CALC.correctedCa(8.0, 2.0), 9.6, 0.001)],
    ["lab range parse", parseRange("3,5 - 5,1").high === 5.1 && parseRange("<200").strict === true && parseRange("≥40").low === 40],
    ["CSV ; with comma decimals", parseLab("marker;value;unit\nK;4,1;mmol/L")[0].value === "4,1" && parseNumber("4,1") === 4.1],
    ["quoted CSV cell", parseLab('marker,value,unit\n"Iron, serum",60,ug/dL')[0].marker === "Iron, serum"],
    ["aria-label escapes unit", !barHTML({ status: "high", dv: 5, du: 'g/dL" onmouseover="x', range: { low: 1, high: 2 } }).includes('" onmouseover')],
    ["'<' values sit just below the bound", parseNumber("<0.5") < 0.5 && parseNumber("<0.5") > 0.4999 && classify(parseNumber("<8"), { high: 8, strict: true }) === "normal"],
    ["annotated range: age-picked", parseRange("Adulti: <20.5 Copii > 1 luna: < 17.1", 20).high === 20.5 && parseRange("Adulti: <20.5 Copii > 1 luna: < 17.1", 10).high === 17.1],
    ["annotated range: Normal band", parseRange("glicemie bazala (ADA): 3.33-5.54: Normal 5.55-6.99: modificata").high === 5.54],
    ["annotated range: negativ", parseRange("< 8 (negativ) Nu indica 8-20 (echivoc) >20 (pozitiv)").high === 8],
    ["BUN mmol/L not converted, urea checked", toConventional(byId("bun"), 1.5, "mmol/L") === null && findMarker("Urea", "mmol/L", P())?.id === "urea" && pickRange(byId("urea"), P()).low === 2.86],
    ["lab range wins, research disagreement kept", (o => o.status === "high" && o.disagree === true)(analyse([{ marker: "FT4", value: "21.7", unit: "pmol/L", range: "11.9 - 21.6" }], P()).out[0])],
    ["Romanian names + braces", findMarker("Hemoglobina {Hb}", "g/L", P())?.id === "hgb" && findMarker("Fier (sideremie)", "µmol/L", P())?.id === "iron"],
    ["Lp(a) not broken by note stripping", findMarker("Lp(a)", "mg/dL", P())?.id === "lpa"],
    ["unit synonyms", toConventional(byId("wbc"), 7.2, "mii/µL") === 7.2 && toConventional(byId("tsh"), 4.5, "µUI/mL") === 4.5],
    ["fromConventional round trip", eq(fromConventional(byId("crea"), toConventional(byId("crea"), 75, "µmol/L"), "µmol/L"), 75, 1e-9)]
  ];
  const bad = checks.filter(c => !c[1]);
  if ($("testout")) $("testout").textContent = checks.map(([n, ok]) => `${ok ? "PASS" : "FAIL"}  ${n}`).join("\n") + `\n\n${bad.length ? bad.length + " FAILED" : "ALL PASS"}`;
  return bad.length ? bad.map(b => b[0]) : "ALL PASS";
}
