// Evidence-based lifestyle and clinical nutrition/exercise recommendations catalog.
// Sources: AHA/ACC (Lipids), ADA (Glycemia), WHO (Anemia/Iron), ACG (Liver), Endocrine Society (Vitamins).

export const CLINICAL_RULES = {
  // --- LIPIDS (AHA / ACC guidelines) ---
  ldl: {
    high: [
      {
        kind: 'nutrition',
        title: 'Cut saturated fats, add soluble fiber',
        detail: 'Keep saturated fat under 6% of daily calories. Add 5–10g soluble fiber daily (oats, barley, psyllium, legumes) to actively trap cholesterol in the gut.',
        evidence: 'AHA/ACC 2019 Prevention Guidelines',
      },
      {
        kind: 'nutrition',
        title: 'Include plant stanols and nuts',
        detail: 'Handful of unsalted walnuts or almonds (30g) and plant sterols can reduce circulating LDL by up to 8–10%.',
        evidence: 'National Lipid Association (NLA)',
      },
      {
        kind: 'exercise',
        title: '150 min aerobic cardio weekly',
        detail: 'Moderate-to-vigorous aerobic sessions (brisk walking, cycling, lap swimming) 30 min × 5 days accelerates LDL clearance.',
        evidence: 'AHA Physical Activity Guidelines',
      },
      {
        kind: 'exercise',
        title: 'Progressive resistance training',
        detail: 'Two resistance sessions weekly with major muscle groups improves lipid particle density and metabolic clearance.',
        evidence: 'Circulation 2024 / AHA Scientific Statement',
      },
    ],
  },
  hdl: {
    low: [
      {
        kind: 'nutrition',
        title: 'Prioritize monounsaturated fats',
        detail: 'Swap butter for extra virgin olive oil and avocado. Eat omega-3 fatty fish (salmon, sardines) twice weekly to improve reverse cholesterol transport.',
        evidence: 'AHA Dietary Guidelines',
      },
      {
        kind: 'exercise',
        title: 'Aerobic intervals and brisk pacing',
        detail: 'Vigorous interval cardio increases ApoA-I and HDL particle efficiency more than steady-state walking.',
        evidence: 'American College of Sports Medicine (ACSM)',
      },
    ],
  },
  tg: {
    high: [
      {
        kind: 'nutrition',
        title: 'Restrict added sugars and simple carbs',
        detail: 'Cut sugar-sweetened drinks, fructose, and refined flours; excess carbohydrates are rapidly converted to triglycerides by hepatic lipogenesis.',
        evidence: 'Endocrine Society / AHA Scientific Statement',
      },
      {
        kind: 'nutrition',
        title: 'Pause alcohol consumption',
        detail: 'Even light-to-moderate alcohol intake can acutely spike serum triglycerides in susceptible individuals.',
        evidence: 'AHA Clinical Guidance',
      },
      {
        kind: 'exercise',
        title: 'Zone 2 cardio for fat oxidation',
        detail: '40–45 minutes of conversational aerobic cardio activates lipoprotein lipase, lowering circulating triglycerides.',
        evidence: 'AHA Exercise Recommendations',
      },
    ],
  },

  // --- GLYCEMIA & METABOLISM (ADA guidelines) ---
  glu: {
    high: [
      {
        kind: 'nutrition',
        title: 'Adopt the diabetes plate method',
        detail: 'Fill 1/2 of your plate with non-starchy vegetables (greens, broccoli), 1/4 with lean protein, and 1/4 with high-fiber complex carbs.',
        evidence: 'ADA Standards of Care 2026',
      },
      {
        kind: 'nutrition',
        title: 'Pair carbs with protein and fat',
        detail: 'Never eat bare carbohydrates; combining carbs with healthy fats and protein flattens post-meal glucose spikes.',
        evidence: 'ADA Nutrition Therapy Consensus',
      },
      {
        kind: 'exercise',
        title: '10–15 min post-meal walk',
        detail: 'Walking immediately after lunch or dinner pulls glucose directly into muscles via insulin-independent GLUT4 translocation.',
        evidence: 'Sports Medicine / ADA 2025 Meta-Analysis',
      },
      {
        kind: 'exercise',
        title: 'Twice-weekly compound strength work',
        detail: 'Squats, lunges, and push-pull movements expand muscle glycogen storage capacity and increase systemic insulin sensitivity.',
        evidence: 'ADA Physical Activity Guidelines',
      },
    ],
  },
  hba1c: {
    high: [
      {
        kind: 'nutrition',
        title: 'Prioritize low-glycemic Mediterranean pattern',
        detail: 'Base meals on whole grains, legumes, leafy greens, and nuts. Avoid fruit juices and processed snacks.',
        evidence: 'ADA Standards of Medical Care',
      },
      {
        kind: 'exercise',
        title: 'Consistent daily activity blocks',
        detail: 'Break up sedentary time every 30 minutes with 2 minutes of light activity; prevents insulin resistance progression.',
        evidence: 'Diabetes Care / ADA Guideline',
      },
    ],
  },

  // --- IRON & ANEMIA (WHO / Hematology) ---
  ferr: {
    low: [
      {
        kind: 'nutrition',
        title: 'Pair iron with Vitamin C',
        detail: 'Combine iron sources (lentils, beans, pumpkin seeds, lean meat) with Vitamin C (citrus, bell peppers) to boost absorption up to 3×.',
        evidence: 'WHO Anemia Management Guidelines',
      },
      {
        kind: 'nutrition',
        title: 'Space tea, coffee & dairy by 2 hours',
        detail: 'Tannins in tea/coffee and calcium in dairy bind dietary iron and drastically inhibit absorption.',
        evidence: 'American Journal of Clinical Nutrition',
      },
      {
        kind: 'exercise',
        title: 'Low-impact pacing during repletion',
        detail: 'Stick to walking, yoga, or easy cycling while ferritin is low. Avoid strenuous eccentric running that causes foot-strike hemolysis.',
        evidence: 'British Journal of Sports Medicine',
      },
    ],
  },
  hgb: {
    low: [
      {
        kind: 'nutrition',
        title: 'Include bioavailable heme iron & folate',
        detail: 'Eat dark leafy greens (spinach, kale), legumes, and bioavailable protein. Discuss targeted iron therapy with your clinician.',
        evidence: 'WHO Guidelines on Hemoglobin Assessment',
      },
      {
        kind: 'exercise',
        title: 'Adequate rest between exercise bouts',
        detail: 'Allow 48 hours recovery between workouts to prevent red blood cell turnover and excessive fatigue while hemoglobin recovers.',
        evidence: 'Hematology & Sports Science Reviews',
      },
    ],
  },

  // --- LIVER & ENZYMES (ACG guidelines) ---
  alt: {
    high: [
      {
        kind: 'nutrition',
        title: 'Mediterranean diet for liver support',
        detail: 'Limit ultra-processed foods, high-fructose corn syrup, and industrial trans fats. Extra virgin olive oil supports liver enzyme normalization.',
        evidence: 'ACG Clinical Guideline for Abnormal Liver Chemistries',
      },
      {
        kind: 'nutrition',
        title: '2–3 cups of filtered black coffee',
        detail: 'Regular filtered coffee intake is clinically documented to protect hepatocytes and reduce steatosis progression.',
        evidence: 'AASLD / ACG Liver Health Guidelines',
      },
      {
        kind: 'exercise',
        title: 'Aerobic exercise to reduce hepatic fat',
        detail: '150–200 min weekly of moderate aerobic exercise reduces liver fat content even without significant body weight change.',
        evidence: 'Hepatology / ACG Guidelines',
      },
    ],
  },
  ast: {
    high: [
      {
        kind: 'nutrition',
        title: 'Zero alcohol during recovery',
        detail: 'Completely abstain from alcohol while transaminases are elevated to avoid additive stress on hepatocytes.',
        evidence: 'ACG Liver Guidelines',
      },
      {
        kind: 'exercise',
        title: 'Moderate intensity; avoid extreme overtraining',
        detail: 'Very strenuous eccentric weightlifting can cause benign muscular AST release; calibrate exertion to moderate.',
        evidence: 'Clinical Biochemistry / ACG Reviews',
      },
    ],
  },

  // --- INFLAMMATION (AHA / Rheumatology) ---
  crp: {
    high: [
      {
        kind: 'nutrition',
        title: 'Polyphenol-rich anti-inflammatory foods',
        detail: 'Increase dark berries (blueberries, blackberries), turmeric, green tea, and cruciferous vegetables to downregulate inflammatory cascades.',
        evidence: 'Harvard Medical School Anti-inflammatory Nutrition',
      },
      {
        kind: 'exercise',
        title: 'Consistent moderate daily movement',
        detail: 'Regular moderate exercise reduces systemic cytokines (IL-6, TNF-a) and decreases basal hs-CRP.',
        evidence: 'AHA Cardiovascular Prevention Consensus',
      },
    ],
  },
  hscrp: {
    high: [
      {
        kind: 'nutrition',
        title: 'Heart-healthy anti-inflammatory protocol',
        detail: 'Emphasize high omega-3 intake (chia seeds, walnuts, wild salmon) and minimize refined carbohydrates.',
        evidence: 'AHA Secondary Prevention Guidelines',
      },
      {
        kind: 'exercise',
        title: 'Zone 2 cardio and daily mobility',
        detail: 'Low-to-moderate intensity sustained movement reduces vascular inflammation without causing stress response.',
        evidence: 'AHA Exercise Recommendations',
      },
    ],
  },

  // --- THYROID (ATA / Endocrine Society) ---
  tsh: {
    high: [
      {
        kind: 'nutrition',
        title: 'Include dietary selenium & zinc cofactors',
        detail: 'Brazil nuts (1–2 daily), pumpkin seeds, and fish provide selenium and zinc, vital for peripheral thyroid hormone conversion and balance.',
        evidence: 'American Thyroid Association (ATA) / Endocrine Reviews',
      },
      {
        kind: 'nutrition',
        title: 'Balanced dietary iodine, cook crucifers',
        detail: 'Ensure adequate iodized salt intake without excessive seaweed megadoses. Lightly steam or cook cruciferous vegetables (broccoli, cabbage).',
        evidence: 'ATA Management Guidelines for Thyroid Dysfunction',
      },
      {
        kind: 'exercise',
        title: 'Moderate aerobic pacing, avoid severe overtraining',
        detail: 'Maintain steady moderate aerobic activity; avoid chronic exhaustive volume which can disrupt the hypothalamic-pituitary-thyroid axis.',
        evidence: 'Thyroid / Sports Endocrinology Consensus',
      },
    ],
    low: [
      {
        kind: 'nutrition',
        title: 'Limit stimulants and excess caffeine',
        detail: 'Moderate or reduce espresso, energy drinks, and high-dose stimulants to protect heart rate and cardiovascular load.',
        evidence: 'Endocrine Society Clinical Practice Guidelines',
      },
    ],
  },
  ft4: {
    high: [
      {
        kind: 'nutrition',
        title: 'Adequate hydration and micronutrient density',
        detail: 'Focus on balanced electrolyte intake and wholesome meals. Re-test alongside TSH in 6–8 weeks as mild spikes can be transient.',
        evidence: 'European Thyroid Association (ETA) Guidelines',
      },
      {
        kind: 'exercise',
        title: 'Low-to-moderate zone workouts',
        detail: 'Listen to resting heart rate; keep workouts at low-to-moderate intensity while thyroid hormone levels stabilize.',
        evidence: 'American Thyroid Association',
      },
    ],
  },

  // --- VITAMINS & MICRONUTRIENTS (Endocrine Society) ---
  vitd: {
    low: [
      {
        kind: 'nutrition',
        title: 'Fatty fish and fortified foods',
        detail: 'Salmon, mackerel, sardines, and fortified plant/dairy milks are prime dietary sources of cholecalciferol (D3).',
        evidence: 'Endocrine Society Clinical Practice Guidelines',
      },
      {
        kind: 'nutrition',
        title: 'Take vitamin D with healthy fats',
        detail: 'Vitamin D is fat-soluble; take any prescribed supplement alongside meals containing olive oil, avocado, or nuts.',
        evidence: 'Journal of the Academy of Nutrition and Dietetics',
      },
      {
        kind: 'exercise',
        title: '20 min outdoor midday daylight',
        detail: 'Expose arms and legs to natural midday light when UV index > 3 to stimulate endogenous cutaneous synthesis.',
        evidence: 'Endocrine Society / Dermato-Endocrinology',
      },
      {
        kind: 'exercise',
        title: 'Weight-bearing bone loading',
        detail: 'Brisk walking, stair climbing, and strength training preserve bone mineral density while Vitamin D levels normalize.',
        evidence: 'National Osteoporosis Foundation',
      },
    ],
  },
  b12: {
    low: [
      {
        kind: 'nutrition',
        title: 'Dietary B12 or sublingual repletion',
        detail: 'Eggs, yogurt, fish, and fortified nutritional yeast provide bioavailable cobalamin. Consult clinician on oral repletion.',
        evidence: 'Mayo Clinic Nutritional Guidelines',
      },
      {
        kind: 'exercise',
        title: 'Gradual cardio pacing',
        detail: 'Low B12 impacts neurological pacing and stamina; begin with low-impact sessions and increase volume as levels stabilize.',
        evidence: 'American College of Physicians',
      },
    ],
  },
};

// Fallback recommendations when all values are optimal
export const OPTIMAL_RECOMMENDATIONS = [
  {
    kind: 'nutrition',
    title: 'Maintain Mediterranean dietary baseline',
    detail: 'All blood markers are in their target ranges. Maintain high dietary diversity with seasonal produce, legumes, and lean proteins.',
    marker: 'General Health',
  },
  {
    kind: 'nutrition',
    title: 'Hydration and micronutrient stability',
    detail: 'Keep drinking 2–2.5L water daily to support renal clearance and cellular electrolyte balance.',
    marker: 'General Health',
  },
  {
    kind: 'exercise',
    title: '150 min moderate activity + 2 strength days',
    detail: 'Keep your active routine: consistent cardiovascular and resistance workouts sustain optimal metabolic markers.',
    marker: 'General Health',
  },
  {
    kind: 'exercise',
    title: 'Daily mobility and sleep hygiene',
    detail: '7–8 hours of consistent sleep and joint mobility work maintain low inflammatory markers and peak recovery.',
    marker: 'General Health',
  },
];

/**
 * Builds personalized nutrition & exercise recommendations based on analyzed blood markers.
 * @param {Array} analyzedMarkers - List of marker objects with { id, name, status, value, unit }
 * @returns {Array} List of { kind, title, detail, marker, evidence }
 */
export function generateRecommendations(analyzedMarkers) {
  const recommendations = [];
  const seenTitles = new Set();

  for (const m of analyzedMarkers) {
    if (!m.id || m.status === 'normal' || m.status === 'none') continue;
    const ruleSet = CLINICAL_RULES[m.id];
    if (!ruleSet) continue;

    const tips = ruleSet[m.status] || [];
    for (const tip of tips) {
      if (!seenTitles.has(tip.title)) {
        seenTitles.add(tip.title);
        recommendations.push({
          ...tip,
          marker: m.name,
        });
      }
    }
  }

  return recommendations.length > 0 ? recommendations : OPTIMAL_RECOMMENDATIONS;
}
