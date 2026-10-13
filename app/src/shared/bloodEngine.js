// ES Module wrapper for blood report comparison engine.
// Reference data from "Blood Test App Clinical Data" research (2026).

const D = 1 / 365.25, W = 7 / 365.25, MO = 1 / 12;
const r = (ageMin, ageMax, low, high, x = {}) => ({ ageMin, ageMax, low, high, ...x });
const M = { sex: "M" }, F = { sex: "F" }, LT = { strict: true };
const CELLS = { unit: "10^3/uL", siUnit: "10^9/L", siFactor: 1 };
const LAB = "Mayo Clinic / Quest / LabCorp";
const CAL = { source: "CALIPER (pediatric)" };
const METHODS = { roche: "Roche Elecsys (ECLIA)", abbott: "Abbott Alinity/Architect (CMIA)", siemens: "Siemens Atellica" };
const mr = (method, low, high, x = {}) => r(18, null, low, high, { method, source: METHODS[method] + " insert", ...x });
const T1 = { sex: "F", pregnancy: 1, ageMin: null };
const pm4 = x => x / 12.87, pm3 = x => x / 1.536; // FT4 / FT3 pmol/L to ng/dL / pg/mL

export const REF = { version: "research-2026-09", markers: [
  // CBC
  { id: "hgb", name: "Hemoglobin", loinc: "718-7", aliases: ["hb", "hgb", "haemoglobin", "hemoglobina"], unit: "g/dL", siUnit: "g/L", siFactor: 10, altitude: true, source: LAB, ranges: [
    r(2, 3, 10.2, 13.8, CAL),
    r(0, 15 * D, 13.4, 20.0), r(15 * D, 5 * W, 10.0, 15.3), r(5 * W, 8 * W, 8.9, 12.7), r(8 * W, 6 * MO, 9.6, 12.4), r(6 * MO, 2, 10.1, 12.5),
    r(3, 6, 11.4, 14.3), r(6, 11, 11.5, 14.7), r(11, 15, 12.4, 15.7), r(15, 18, 13.3, 16.9, M), r(15, 18, 11.9, 14.8, F),
    r(18, null, 13.2, 16.6, M), r(18, null, 11.6, 15.0, F),
    r(null, null, 11.0, null, { ...F, pregnancy: 1, source: "CDC pregnancy cutoff" }), r(null, null, 10.5, null, { ...F, pregnancy: 2, source: "CDC pregnancy cutoff" }), r(null, null, 11.0, null, { ...F, pregnancy: 3, source: "CDC pregnancy cutoff" }) ] },
  { id: "hct", name: "Hematocrit", loinc: "4544-3", aliases: ["hct", "haematocrit", "pcv", "hematocrit"], unit: "%", siUnit: "L/L", siFactor: 0.01, source: LAB, ranges: [
    r(15 * D, 3 * MO, 27.6, 38.8, CAL), r(2, 15, 31.0, 42.6, CAL),
    r(0, 15 * D, 39.6, 57.2), r(6 * MO, 2, 30.8, 37.9), r(15, 18, 40.0, 50.0, M), r(15, 18, 35.0, 43.0, F), r(18, null, 38.3, 48.6, M), r(18, null, 35.5, 44.9, F) ] },
  { id: "rbc", name: "RBC", loinc: "789-8", aliases: ["red blood cells", "erythrocytes", "red cell count", "eritrocite", "numar eritrocite"], unit: "10^6/uL", siUnit: "10^12/L", siFactor: 1, source: LAB, ranges: [
    r(0, 6 * MO, 3.05, 5.22, CAL), r(2, 18, 3.90, 5.40, CAL),
    r(6 * MO, 2, 4.03, 5.07), r(18, null, 4.35, 5.65, M), r(18, null, 3.92, 5.13, F) ] },
  { id: "mcv", name: "MCV", loinc: "787-2", aliases: ["mean corpuscular volume", "vem", "volum eritrocitar mediu"], unit: "fL", siUnit: "fL", siFactor: 1, source: LAB, ranges: [
    r(15 * D, 6 * MO, 72.0, 98.9, CAL), r(2, 3, 73.5, 85.3, CAL), r(6, 18, 77.4, 97.3, CAL),
    r(0, 15 * D, 91.3, 106.4), r(6 * MO, 2, 69.5, 81.7), r(3, 6, 77.2, 89.5), r(18, null, 78.2, 97.9) ] },
  { id: "mch", name: "MCH", loinc: "785-6", aliases: ["mean corpuscular hemoglobin", "hem", "hemoglobina eritrocitara medie"], unit: "pg", siUnit: "pg", siFactor: 1, source: LAB, ranges: [
    r(0, 18, 23.3, 34.0, CAL), r(18, null, 27.0, 32.0)] },
  { id: "mchc", name: "MCHC", loinc: "786-4", aliases: ["chem", "concentratie medie a hb/eritrocit"], unit: "g/dL", siUnit: "g/L", siFactor: 10, source: LAB, ranges: [
    r(0, 18, 31.9, 34.5, CAL), r(18, null, 31.5, 35.5)] },
  { id: "rdw", name: "RDW-CV", loinc: "788-0", aliases: ["rdw", "red cell distribution width", "largimea distributiei eritrocitare"], unit: "%", siUnit: "%", siFactor: 1, source: LAB, ranges: [
    r(15 * D, 3, 12.7, 17.7, CAL), r(6, 18, 12.5, 15.6, CAL),
    r(0, 15 * D, 14.6, 17.3), r(3, 6, 11.3, 13.4), r(18, null, 11.8, 14.5, M), r(18, null, 12.2, 16.1, F) ] },
  { id: "wbc", name: "WBC", loinc: "6690-2", aliases: ["white blood cells", "leukocytes", "white cell count", "leucocite", "numar leucocite"], ...CELLS, source: LAB, ranges: [
    r(15 * D, 2, 5.75, 13.5, CAL), r(3, 6, 4.92, 11.8, CAL),
    r(0, 15 * D, 8.0, 15.4), r(2, 3, 5.1, 13.4), r(6, 18, 3.8, 10.4), r(18, null, 3.4, 9.6) ] },
  { id: "neut", name: "Neutrophils (abs)", loinc: "751-8", aliases: ["neutrophils", "anc", "neu#", "neutrofile", "neutrofil"], ...CELLS, source: LAB, ranges: [
    r(0, 18, 1.25, 6.75, CAL), r(18, null, 1.5, 8.0)] },
  { id: "lymph", name: "Lymphocytes (abs)", loinc: "731-0", aliases: ["lymphocytes", "lym#", "limfocite", "limfocit"], ...CELLS, source: LAB, ranges: [
    r(0, 18, 1.13, 3.96, CAL), r(18, null, 1.0, 4.8)] },
  { id: "mono", name: "Monocytes (abs)", loinc: "742-7", aliases: ["monocytes", "mon#", "monocite", "monocit"], ...CELLS, source: LAB, ranges: [
    r(0, 18, 0.16, 0.74, CAL), r(18, null, 0.2, 0.8)] },
  { id: "eos", name: "Eosinophils (abs)", loinc: "711-2", aliases: ["eosinophils", "eos#", "eozinofile", "eozinofil"], ...CELLS, source: LAB, ranges: [
    r(0, 18, 0.01, 0.45, CAL), r(18, null, 0.0, 0.5)] },
  { id: "baso", name: "Basophils (abs)", loinc: "704-7", aliases: ["basophils", "bas#", "bazofile", "bazofil"], ...CELLS, source: LAB, ranges: [r(18, null, 0.0, 0.2)] },
  { id: "plt", name: "Platelets", loinc: "777-3", aliases: ["plt", "platelet count", "thrombocytes", "trombocite", "numar trombocite"], ...CELLS, source: LAB, ranges: [
    r(15 * D, 6 * MO, 249, 696, CAL), r(2, 14, 206, 434, CAL),
    r(0, 15 * D, 144, 449), r(6 * MO, 2, 206, 459), r(14, 18, 139, 320), r(18, null, 135, 317, M), r(18, null, 157, 371, F) ],
    tiers: [{ lt: 50, label: "< 50: needs bleeding-risk review" }, { lt: 100, label: "< 100: actionable low" }] },
  { id: "mpv", name: "MPV", loinc: "32623-1", aliases: ["mean platelet volume", "volum trombocitar mediu", "vtm"], unit: "fL", siUnit: "fL", siFactor: 1, source: LAB, ranges: [
    r(0, 18, 8.0, 11.5, CAL), r(18, null, 8.5, 12.0)] },

  // Metabolic panel
  { id: "na", name: "Sodium", loinc: "2951-2", aliases: ["na", "sodiu"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB, ranges: [
    r(0, 18, 136, 145, CAL), r(18, null, 135, 145)] },
  { id: "k", name: "Potassium", loinc: "2823-3", aliases: ["k", "potasiu"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB + " (falsely high if sample hemolyzed)", ranges: [
    r(0, 18, 3.5, 5.1, CAL), r(18, null, 3.5, 5.2)] },
  { id: "cl", name: "Chloride", loinc: "2075-0", aliases: ["cl", "clor"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB, ranges: [
    r(0, 1, 98, 107, CAL), r(1, 18, 102, 112), r(18, null, 98, 107)] },
  { id: "hco3", name: "Bicarbonate", loinc: "1963-8", aliases: ["hco3", "co2", "total co2", "bicarb"], unit: "mmol/L", siUnit: "mEq/L", siFactor: 1, source: LAB, ranges: [
    r(0, 1, 19, 26, CAL), r(4, 18, 19, 26, CAL), r(1, 4, 18, 25), r(18, null, 22, 29)] },
  { id: "bun", name: "BUN", loinc: "3094-0", aliases: ["urea nitrogen", "blood urea nitrogen"], unit: "mg/dL", siUnit: null, siFactor: null, source: LAB,
    unitNote: "BUN in mmol/L means different things at different labs; the Urea result is checked instead.", ranges: [
    r(0, 1, 3.0, 12.0, CAL),
    r(1, 18, 7, 20), r(18, null, 8, 24, M), r(18, null, 6, 21, F) ] },
  { id: "urea", name: "Urea", loinc: "22664-7", aliases: ["uree", "urea serica", "uree serica", "serum urea"], unit: "mmol/L", siUnit: "mg/dL", siFactor: 6.006, source: "Tietz", ranges: [
    r(1, 18, 2.50, 7.14, { source: "BUN pediatric range × 0.357" }),
    r(18, null, 1.8, 7.1, { source: "Tietz (BUN-derived would be 2.86–8.57 M / 2.14–7.50 F)" }) ] },
  { id: "crea", name: "Creatinine", loinc: "2160-0", aliases: ["creat", "serum creatinine", "creatinina"], unit: "mg/dL", siUnit: "umol/L", siFactor: 88.4, source: LAB, ranges: [
    r(0, 1, 0.17, 0.42), r(1, 6, 0.19, 0.49), r(6, 11, 0.26, 0.61), r(11, 15, 0.35, 0.86), r(15, null, 0.74, 1.35, M), r(15, null, 0.59, 1.04, F) ] },
  { id: "ca", name: "Calcium (total)", loinc: "17861-6", aliases: ["ca", "calcium", "total calcium", "calciu"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.2495, source: LAB, ranges: [
    r(0, 1, 8.7, 11.0), r(1, 18, 9.3, 10.6), r(18, 60, 8.6, 10.0), r(60, null, 8.8, 10.2) ] },
  { id: "mg", name: "Magnesium", loinc: "19123-9", aliases: ["mg", "magneziu"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.411, source: LAB, ranges: [
    r(0, 18, 1.6, 2.5, CAL), r(18, null, 1.6, 2.3)] },
  { id: "phos", name: "Phosphate", loinc: "2777-1", aliases: ["phosphorus", "po4", "fosfor"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.323, source: LAB, ranges: [
    r(0, 18, 3.1, 6.0, CAL), r(18, null, 2.5, 4.5)] },
  { id: "glu", name: "Glucose (fasting)", loinc: "1558-6", aliases: ["glucose", "fasting glucose", "fbg", "glycemia", "glicemie", "glucoza"], fasting: true, unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0555, source: "ADA", ranges: [
    r(0, 18, 60, 100, CAL), r(18, null, 70, 99)],
    tiers: [{ gte: 126, label: "≥ 126: diabetes range (ADA)" }, { gte: 100, label: "100–125: prediabetes (ADA)" }] },
  { id: "glur", name: "Glucose (random)", loinc: "2345-7", aliases: ["glucose", "random glucose", "glycemia", "glicemie", "glucoza"], fasting: false, unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.0555, source: "ADA", ranges: [r(18, null, 70, 140)],
    tiers: [{ gte: 200, label: "≥ 200: diabetes range if symptomatic (ADA)" }] },
  { id: "tp", name: "Total protein", loinc: "2885-2", aliases: ["protein", "proteine totale"], unit: "g/dL", siUnit: "g/L", siFactor: 10, source: LAB, ranges: [
    r(0, 1, 5.1, 7.3, CAL), r(1, null, 6.3, 8.2)] },
  { id: "alb", name: "Albumin", loinc: "1751-7", aliases: ["alb", "albumina"], unit: "g/dL", siUnit: "g/L", siFactor: 10, source: LAB, ranges: [
    r(0, 1, 3.3, 4.9, CAL), r(1, null, 3.5, 5.0)] },

  // Liver
  { id: "alt", name: "ALT", loinc: "1743-4", aliases: ["1742-6", "alanine aminotransferase", "sgpt", "tgp", "alat", "gpt", "alaninaminotransferaza", "tgp/alat"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: "Lab range; ACG healthy limit shown as note", ranges: [
    r(0, 18, 13, 50, CAL),
    r(18, null, 7, 55, M), r(18, null, 7, 45, F) ],
    tiers: [{ sex: "M", gte: 33, label: "Above ACG healthy limit (< 33)" }, { sex: "F", gte: 25, label: "Above ACG healthy limit (< 25)" }] },
  { id: "ast", name: "AST", loinc: "30239-8", aliases: ["1920-8", "aspartate aminotransferase", "sgot", "tgo", "asat", "got", "aspartataminotransferaza", "tgo/asat"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: LAB, ranges: [
    r(0, 1, 28, 52, CAL), r(14, 18, 17, 36, CAL),
    r(1, 14, 8, 60), r(18, null, 8, 48, M), r(18, null, 8, 43, F) ] },
  { id: "alp", name: "ALP", loinc: "6768-6", aliases: ["alkaline phosphatase", "alk phos", "fosfataza alcalina"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: LAB + " (high in growing children)", ranges: [
    r(15 * D, 1, 138, 347, CAL), r(11, 13, 104, 438, { ...F, ...CAL }), r(13, 19, 57, 373, { ...F, ...CAL }), r(16, 19, 53, 184, { ...M, ...CAL }),
    r(0, 15 * D, 83, 248), r(1, 11, 142, 335), r(13, 16, 116, 468, M), r(19, null, 40, 129) ] },
  { id: "ggt", name: "GGT", loinc: "2324-2", aliases: ["gamma-glutamyl transferase", "gamma gt", "gama-glutamiltransferaza", "gama glutamiltransferaza"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: LAB, ranges: [
    r(7, 18, 9, 31, CAL),
    r(0, 1, null, 178, LT), r(1, 7, null, 21, LT), r(18, null, 8, 61, M), r(18, null, 5, 36, F) ] },
  { id: "tbil", name: "Total bilirubin", loinc: "1975-2", aliases: ["bilirubin", "bilirubina totala", "tbil"], unit: "mg/dL", siUnit: "umol/L", siFactor: 17.1, source: LAB + " (mild isolated rise often Gilbert's)", ranges: [
    r(0, 18, 0.3, 1.0, CAL), r(18, null, 0.1, 1.2)] },
  { id: "dbil", name: "Direct bilirubin", loinc: "1968-7", aliases: ["conjugated bilirubin", "bilirubina directa", "dbil"], unit: "mg/dL", siUnit: "umol/L", siFactor: 17.1, source: LAB, ranges: [
    r(0, 18, 0.1, 0.3, CAL), r(18, null, 0.0, 0.3)] },

  // Lipids
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
  { id: "lpa", name: "Lp(a)", loinc: "10835-7", aliases: ["lipoprotein(a)", "lipoprotein a", "lpa"], unit: "mg/dL", siUnit: null, siFactor: null, source: "EAS / ACC", ranges: [r(18, null, null, 30, LT)],
    tiers: [{ gt: 50, label: "> 50 mg/dL: high risk" }] },
  { id: "lpam", name: "Lp(a) (molar)", loinc: "43583-4", aliases: ["lp(a)", "lipoprotein(a)", "lipoprotein a", "lpa"], unit: "nmol/L", siUnit: null, siFactor: null, source: "EAS / ACC", ranges: [r(18, null, null, 75, LT)],
    tiers: [{ gt: 125, label: "> 125 nmol/L: high risk" }] },

  // Thyroid
  { id: "tsh", name: "TSH", loinc: "11579-0", aliases: ["3016-3", "thyrotropin", "thyroid stimulating hormone"], unit: "mIU/L", siUnit: "uIU/mL", siFactor: 1, source: "Quest / ATA", ranges: [
    r(0, 7 * D, 0.70, 15.20, CAL), r(7 * D, 18, 0.50, 4.30, CAL),
    mr("roche", 0.27, 4.20), mr("roche", 0.01, 4.10, T1), mr("abbott", 0.35, 4.94), mr("abbott", 0.05, 2.53, T1), mr("siemens", 0.35, 4.00), mr("siemens", 0.10, 2.80, T1),
    r(18, null, 0.45, 4.50),
    r(null, null, 0.10, 2.50, { ...F, pregnancy: 1, source: "ATA; up to 4.0 acceptable if TPO-Ab negative" }),
    r(null, null, 0.20, 3.00, { ...F, pregnancy: 2, source: "ATA; up to 4.0 acceptable if TPO-Ab negative" }),
    r(null, null, 0.30, 3.00, { ...F, pregnancy: 3, source: "ATA; up to 4.0 acceptable if TPO-Ab negative" }) ] },
  { id: "ft4", name: "Free T4", loinc: "3024-7", aliases: ["ft4", "free thyroxine", "t4 liber"], unit: "ng/dL", siUnit: "pmol/L", siFactor: 12.87, source: LAB, ranges: [
    r(0, 18, 0.9, 1.7, CAL),
    mr("roche", pm4(11.9), pm4(21.6)), mr("roche", pm4(10.7), pm4(21.2), T1), mr("abbott", pm4(11.5), pm4(22.7)), mr("abbott", pm4(11.35), pm4(17.35), T1), mr("siemens", pm4(10.3), pm4(21.9)), mr("siemens", pm4(11.2), pm4(20.1), T1),
    r(18, null, 0.8, 1.8), r(null, null, 0.8, 1.7, { ...F, pregnancy: 1 }) ] },
  { id: "ft3", name: "Free T3", loinc: "3026-2", aliases: ["ft3", "free triiodothyronine", "t3 liber"], unit: "pg/mL", siUnit: "pmol/L", siFactor: 1.536, source: LAB, ranges: [
    r(0, 18, 2.3, 4.9, CAL),
    mr("roche", pm3(3.9), pm3(6.8)), mr("roche", pm3(3.59), pm3(5.59), T1), mr("abbott", pm3(2.76), pm3(6.45)), mr("abbott", pm3(2.37), pm3(8.02), T1), mr("siemens", pm3(3.5), pm3(6.5)), mr("siemens", pm3(3.1), pm3(6.2), T1), r(18, null, 2.0, 4.4)] },
  { id: "tpo", name: "TPO antibodies", loinc: "8099-4", aliases: ["anti-tpo", "tpo ab", "atpo"], unit: "IU/mL", siUnit: "kIU/L", siFactor: 1, source: "Assay dependent", ranges: [
    mr("roche", null, 34, { strict: true, source: "Roche insert < 34; Synevo (Roche) prints < 8 negative, 8–20 equivocal" }), mr("abbott", null, 5.61, LT), mr("siemens", null, 60, LT), r(18, null, null, 9.0, LT)] },
  { id: "tgab", name: "Thyroglobulin antibodies", loinc: "8098-6", aliases: ["tgab", "anti-tg", "atg"], unit: "IU/mL", siUnit: "kIU/L", siFactor: 1, source: "Assay dependent", ranges: [
    mr("roche", null, 115, LT), mr("abbott", null, 4.11, LT), mr("siemens", null, 60, LT), r(18, null, null, 4.0, LT)] },

  // Vitamins / iron
  { id: "vitd", name: "Vitamin D (25-OH)", loinc: "62288-6", aliases: ["1989-3", "vitamin d", "25-oh vitamin d", "25(oh)d", "calcidiol", "vitamina d"], unit: "ng/mL", siUnit: "nmol/L", siFactor: 2.496, source: "Endocrine Society", ranges: [
    r(0, 18, 30, 100, CAL), r(18, null, 30, 100)],
    tiers: [{ lt: 20, label: "< 20: deficient" }, { lt: 30, label: "20–29: insufficient" }] },
  { id: "b12", name: "Vitamin B12", loinc: "2132-9", aliases: ["b12", "cobalamin", "vitamina b12"], unit: "pg/mL", siUnit: "pmol/L", siFactor: 0.738, source: "Mayo Clinic Laboratories", ranges: [
    r(0, 18, 200, 900, CAL), r(18, null, 200, 1100)],
    tiers: [{ gte: 200, lte: 400, label: "200–400: possible subclinical deficiency (check MMA)" }] },
  { id: "folate", name: "Folate", loinc: "2284-8", aliases: ["folic acid", "acid folic", "folat"], unit: "ng/mL", siUnit: "nmol/L", siFactor: 2.266, source: "Mayo Clinic Laboratories", ranges: [
    r(0, 18, 4.0, 24.0, CAL), r(18, null, 4.0, null, LT)] },
  { id: "ferr", name: "Ferritin", loinc: "22702-5", aliases: ["2276-4", "ferritina", "feritina", "feritina serica"], unit: "ng/mL", siUnit: "ug/L", siFactor: 1, source: "Mayo Clinic (rises with inflammation)", ranges: [
    r(0, 18, 14, 150, CAL),
    r(18, null, 24, 336, M), r(18, null, 11, 307, F) ] },
  { id: "iron", name: "Serum iron", loinc: "2498-4", aliases: ["iron", "fe", "sideremie", "fier"], unit: "ug/dL", siUnit: "umol/L", siFactor: 0.179, source: "Mayo Clinic", ranges: [
    r(0, 18, 40, 120, CAL),
    r(18, null, 65, 176, M), r(18, null, 50, 170, F) ] },
  { id: "tibc", name: "TIBC", loinc: "2500-7", aliases: ["total iron binding capacity"], unit: "ug/dL", siUnit: "umol/L", siFactor: 0.179, source: "Mayo Clinic", ranges: [
    r(0, 18, 250, 400, CAL), r(18, null, 250, 450)] },
  { id: "tsat", name: "Transferrin saturation", loinc: "2502-3", aliases: ["tsat", "iron saturation"], unit: "%", siUnit: "fraction", siFactor: 0.01, source: "Mayo Clinic", ranges: [
    r(0, 18, 15, 45, CAL), r(18, null, 20, 50)] },

  // Inflammatory / other
  { id: "hscrp", name: "hs-CRP", loinc: "30522-7", aliases: ["hscrp", "high sensitivity crp", "crp hs"], unit: "mg/L", siUnit: "mg/L", siFactor: 1, source: "AHA (cardiovascular risk)", ranges: [r(18, null, null, 3.0, LT)] },
  { id: "esr", name: "ESR", loinc: "4538-4", aliases: ["sed rate", "vsh", "sedimentation rate"], unit: "mm/h", siUnit: "mm/hr", siFactor: 1, miller: true, source: "Lab range, raised to Miller age limit when higher", ranges: [
    r(0, 18, 0, 20, { source: "Tietz (pediatric)" }),
    r(18, null, 0, 15, M), r(18, null, 0, 20, F) ] },
  { id: "hba1c", name: "HbA1c", loinc: "4548-4", aliases: ["a1c", "glycated hemoglobin", "hemoglobin a1c", "hemoglobina glicata"], unit: "%", siUnit: "mmol/mol", siFactor: 10.929, siOffset: -23.5, source: "ADA", ranges: [
    r(0, 18, 4.0, 5.6, CAL), r(18, null, 4.0, 5.6)],
    tiers: [{ gte: 6.5, label: "≥ 6.5: diabetes range (ADA)" }, { gte: 5.7, label: "5.7–6.4: prediabetes (ADA)" }] },
  { id: "uric", name: "Uric acid", loinc: "3084-1", aliases: ["urate", "acid uric"], unit: "mg/dL", siUnit: "umol/L", siFactor: 59.48, source: LAB, ranges: [
    r(0, 18, 2.0, 6.0, CAL),
    r(18, null, 4.0, 8.5, M), r(18, null, 2.7, 7.3, F) ] },
  { id: "neutp", name: "Neutrophils (%)", loinc: "770-8", aliases: ["neutrophils", "neutrophils %", "neutrofile", "neutrofil", "neu%", "neut%"], unit: "%", siUnit: "%", siFactor: 1, source: "CALIPER", ranges: [
    r(0, 1, 8.7, 57.9), r(1, 5, 17.6, 68.6), r(5, 15, 28.9, 68.6), r(15, 19, 39.6, 76.1) ] },
  { id: "lymphp", name: "Lymphocytes (%)", loinc: "736-9", aliases: ["lymphocytes", "lymphocytes %", "limfocite", "limfocit", "lym%"], unit: "%", siUnit: "%", siFactor: 1, source: "CALIPER", ranges: [
    r(0, 1, 24.9, 62.3), r(1, 5, 26.2, 57.4), r(5, 19, 23.4, 59.2) ] },
  { id: "monop", name: "Monocytes (%)", loinc: "5905-5", aliases: ["monocytes", "monocytes %", "monocite", "monocit", "mon%"], unit: "%", siUnit: "%", siFactor: 1, source: "CALIPER", ranges: [r(0, 18, 3.5, 11.2), r(18, null, 3.5, 12.0)] },
  { id: "eosp", name: "Eosinophils (%)", loinc: "713-8", aliases: ["eosinophils", "eosinophils %", "eozinofile", "eozinofil", "eos%"], unit: "%", siUnit: "%", siFactor: 1, source: "CALIPER", ranges: [r(0, 18, 0.3, 6.8), r(18, null, 0.5, 6.0)] },
  { id: "basop", name: "Basophils (%)", loinc: "705-4", aliases: ["basophils", "basophils %", "bazofile", "bazofil", "bas%"], unit: "%", siUnit: "%", siFactor: 1, source: "Generic", ranges: [r(0, 18, 0, 2.0), r(18, null, 0, 2.0)] },
  { id: "pdw", name: "PDW", loinc: "32207-3", aliases: ["platelet distribution width", "largimea distributiei trombocitare"], unit: "fL", siUnit: "fL", siFactor: 1, source: "CALIPER (Mindray)", ranges: [r(0, 18, 9.0, 17.0)] },
  { id: "pdwp", name: "PDW (%)", loinc: "32207-3", aliases: ["pdw", "platelet distribution width", "largimea distributiei trombocitare"], unit: "%", siUnit: "%", siFactor: 1, source: "Generic", ranges: [r(0, 18, 10.0, 18.0)] },
  { id: "crp", name: "CRP", loinc: "1988-5", aliases: ["c-reactive protein", "proteina c reactiva", "pcr"], unit: "mg/L", siUnit: "mg/L", siFactor: 1, source: "CALIPER", ranges: [r(0, 18, null, 3.0, LT)] },
  { id: "amyp", name: "Pancreatic amylase", loinc: "1805-1", aliases: ["p-amylase", "amilaza pancreatica", "amilaza pancreatica in ser"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: "IFCC / Tietz", ranges: [r(0, 18, 13, 53)] },
  { id: "amy", name: "Amylase (total)", loinc: "1798-8", aliases: ["amylase", "amilaza", "amilaza totala"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: "CALIPER", ranges: [r(0, 18, 28, 100)] },
  { id: "lipase", name: "Lipase", loinc: "3040-3", aliases: ["lipaza"], unit: "U/L", siUnit: "IU/L", siFactor: 1, source: "CALIPER", ranges: [r(0, 18, 13, 60), r(18, null, 13, 60)] },
  { id: "ibil", name: "Indirect bilirubin", loinc: "1971-1", aliases: ["unconjugated bilirubin", "bilirubina indirecta"], unit: "mg/dL", siUnit: "umol/L", siFactor: 17.1, source: "Tietz", ranges: [
    r(0, 7 * D, 0.2, 12.0, { source: "Tietz physiologic newborn range; AAP 2022 phototherapy lines are separate treatment thresholds" }), r(7 * D, null, 0.2, 0.7) ] },
  { id: "ica", name: "Ionized calcium", loinc: "17863-2", aliases: ["calciu ionic", "ca ionic", "ica", "calcium ionized"], unit: "mg/dL", siUnit: "mmol/L", siFactor: 0.25, source: "Tietz", ranges: [r(18, null, 4.5, 4.9)] },
] };

export const norm = s => String(s ?? "").toLowerCase().replace(/µ|μ/g, "u").replace(/[\s_]/g, "").replace(/^x/, "");
export const UNIT_SYN = { "mii/ul": "10^3/ul", "mil./ul": "10^6/ul", "mil/ul": "10^6/ul", "ui/ml": "iu/ml", "uui/ml": "uiu/ml", "pg/cell": "pg", "ui/l": "iu/l" };
export const normUnit = u => UNIT_SYN[norm(u)] ?? norm(u);
export const stripNote = s => String(s ?? "").replace(/\s*[({[].*?[)}\]]/g, "");

export const fitsProfile = (x, p) =>
  (x.sex == null || x.sex === p.sex) &&
  (x.ageMin ?? 0) <= p.age && p.age < (x.ageMax ?? 200) &&
  (x.pregnancy == null || x.pregnancy === p.trimester) &&
  (x.method == null || x.method === p.method);

export function toConventional(m, value, unit) {
  const u = normUnit(unit);
  if (!u || u === normUnit(m.unit)) return value;
  if (m.siFactor && u === normUnit(m.siUnit)) return (value - (m.siOffset || 0)) / m.siFactor;
  return null;
}

export function fromConventional(m, value, unit) {
  const u = normUnit(unit);
  if (value == null || !u || u === normUnit(m.unit)) return value;
  if (m.siFactor && u === normUnit(m.siUnit)) return value * m.siFactor + (m.siOffset || 0);
  return null;
}

export function findMarker(name, unit, p) {
  const match = n => REF.markers.filter(m => [m.name, m.id, m.loinc, ...(m.aliases || [])].some(a => norm(a) === n));
  let hits = match(norm(name));
  if (!hits.length) hits = match(norm(stripNote(name)));
  const score = m => (toConventional(m, 1, unit) != null ? 2 : 0) + (m.fasting == null || m.fasting === p.fasting ? 1 : 0);
  return hits.sort((a, b) => score(b) - score(a))[0];
}

export function pickRange(m, p) {
  const score = x => (x.pregnancy ? 8 : 0) + (x.method ? 4 : 0) + (x.sex ? 2 : 0) + (x.ageMin != null || x.ageMax != null ? 1 : 0);
  const span = x => (x.ageMax ?? 200) - (x.ageMin ?? 0);
  const best = m.ranges.filter(x => fitsProfile(x, p)).sort((a, b) => score(b) - score(a) || span(a) - span(b))[0];
  if (!best) return null;
  let { low, high, strict, source } = best;
  if (m.altitude && p.altitude >= 1000 && low != null) {
    const km = p.altitude / 1000;
    const bump = -0.03 + 0.32 * km + 0.05 * km ** 2; // WHO 2011 altitude adjustment (g/dL)
    low += bump; if (high != null) high += bump;
    source = (source ? source + "; " : "") + `raised +${bump.toFixed(1)} g/dL for ${p.altitude} m (WHO)`;
  }
  if (m.miller && p.age > 50 && p.sex) {
    const millerHi = p.sex === "M" ? p.age / 2 : (p.age + 10) / 2;
    if (high == null || millerHi > high) { high = millerHi; source = (source ? source + "; " : "") + `Miller formula for age ${p.age}`; }
  }
  return { low, high, strict: !!strict, source };
}

export function classify(v, x) {
  if (x == null || v == null) return "none";
  if (x.low != null && (x.strict ? v <= x.low : v < x.low)) return "low";
  if (x.high != null && (x.strict ? v >= x.high : v > x.high)) return "high";
  return "normal";
}

export function pickTier(m, v, p) {
  if (!m.tiers) return null;
  for (const t of m.tiers) {
    if (t.sex && t.sex !== p.sex) continue;
    if (t.lt != null && v < t.lt) return t.label;
    if (t.lte != null && v <= t.lte) return t.label;
    if (t.gt != null && v > t.gt) return t.label;
    if (t.gte != null && v >= t.gte) return t.label;
  }
  return null;
}

export function parseNumber(x) {
  if (x == null) return null;
  const s = String(x).trim().replace(/,/g, ".");
  const m = s.match(/^[<>≤≥]?\s*([0-9]+(?:\.[0-9]+)?)/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (s[0] === "<") return n - 1e-9;
  if (s[0] === ">") return n + 1e-9;
  return n;
}

export function parseRange(s, age = 18, sex = null) {
  if (!s) return null;
  s = String(s).trim();
  if (/(barbati|femei|copii|adulti|ani|luni|zile)/i.test(s)) {
    const parts = s.split(/(?=[A-Z][a-z]+:|\b(?:Barbati|Femei|Copii|Adulti)\b)/i).map(x => x.trim()).filter(Boolean);
    const pick = parts.find(p => {
      if (sex === "M" && /barbati/i.test(p)) return true;
      if (sex === "F" && /femei/i.test(p)) return true;
      if (age < 18 && /copii/i.test(p)) return true;
      if (age >= 18 && /adulti/i.test(p)) return true;
      return false;
    }) || parts[0];
    const r = plainRange(pick);
    if (r) return r;
  }
  const normMatch = s.match(/(?:normal|interval\s+biologic|valori\s+de\s+referinta)[^0-9<]*([0-9.,]+(?:\s*-\s*[0-9.,]+)?|[<≤>≥]\s*[0-9.,]+)/i);
  if (normMatch) { const r = plainRange(normMatch[1]); if (r) return r; }
  return plainRange(s);
}

export function plainRange(s) {
  s = s.replace(/,/g, ".").replace(/\s+/g, " ");
  let m = s.match(/([0-9]+(?:\.[0-9]+)?)\s*-\s*([0-9]+(?:\.[0-9]+)?)/);
  if (m) return { low: parseFloat(m[1]), high: parseFloat(m[2]), strict: false };
  m = s.match(/^(?:<=|[<≤])\s*([0-9]+(?:\.[0-9]+)?)/);
  if (m) return { low: null, high: parseFloat(m[1]), strict: s.startsWith("<") && !s.startsWith("<=") };
  m = s.match(/^(?:>=|[>≥])\s*([0-9]+(?:\.[0-9]+)?)/);
  if (m) return { low: parseFloat(m[1]), high: null, strict: s.startsWith(">") && !s.startsWith(">=") };
  return null;
}

export function splitCSVLine(line, sep) {
  const out = []; let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === sep && !inQ) { out.push(cur.trim()); cur = ""; }
    else cur += c;
  }
  out.push(cur.trim());
  return out;
}

export function parseLab(text) {
  text = (text || "").trim();
  if (!text) return [];
  if (text[0] === "[" || text[0] === "{") {
    const j = JSON.parse(text);
    return (Array.isArray(j) ? j : j.results || []).map(x => ({ marker: x.marker ?? x.name ?? x.test, value: x.value ?? x.result, unit: x.unit ?? "", range: x.range ?? "" }));
  }
  const first = text.split(/\r?\n/)[0];
  const sep = first.includes("\t") ? "\t" : first.includes(";") ? ";" : ",";
  const rows = text.split(/\r?\n/).filter(l => l.trim()).map(l => splitCSVLine(l, sep));
  if (parseNumber(rows[0][1]) == null) rows.shift(); // header row
  return rows.map(([marker, value, unit, range]) => ({ marker, value, unit: unit || "", range: range || "" }));
}

export const CALC = {
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
  ldlSampson: (tc, hdl, tg) => tg > 800 ? null : tc / 0.948 - hdl / 0.971 - (tg / 8.56 + tg * (tc - hdl) / 2140 - tg ** 2 / 16100) - 9.44
};

export const ckdStage = g => g >= 90 ? "G1" : g >= 60 ? "G2" : g >= 45 ? "G3a" : g >= 30 ? "G3b" : g >= 15 ? "G4" : "G5";

export function analyse(rows, p) {
  const out = rows.map(x => {
    const m = findMarker(x.marker, x.unit, p), raw = parseNumber(x.value);
    const o = { name: m ? m.name : x.marker, sub: m ? "LOINC " + m.loinc : "", input: x, raw, id: m?.id };
    if (raw == null) return { ...o, status: "none", why: "Value not numeric" };
    const v = m ? toConventional(m, raw, x.unit) : null;
    o.v = v;
    const labR = parseRange(x.range, p.age, p.sex);
    if (labR) {
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
    o.source = o.range?.source || m?.source || "";
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
      why: rg ? "" : "Interpretation in note", tier: m ? pickTier(m, v, p) : null, source: rg?.source || m?.source || "", isCalculated: true });
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

export const fmt = x => x == null ? "–" : +Number(x).toFixed(2);
export function rangeText(x, u) {
  if (!x) return "–";
  const [lo, hi] = x.strict ? [">", "<"] : ["≥", "≤"];
  if (x.low != null && x.high != null) return `${fmt(x.low)}–${fmt(x.high)} ${u}`;
  return x.low != null ? `${lo} ${fmt(x.low)} ${u}` : `${hi} ${fmt(x.high)} ${u}`;
}
