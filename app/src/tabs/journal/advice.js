// Advice shown on the Journal tab, built from the latest blood test.
// Owned by: Journal epic.
//
// Placeholder data for the design. The real logic should produce an object
// of this same shape from the blood results; AdvicePage only renders it.
//
//   source           which test the advice is based on
//   markers[]        blood values; status is 'low' | 'normal' | 'high'
//   recommendations  kind is 'nutrition' | 'exercise'; marker names the
//                    blood value the tip responds to (shown as a tag)

export const ADVICE = {
  source: { test: 'Blood test', date: '12 May 2026', reviewedBy: 'Dr. Mette Holm' },
  markers: [
    { name: 'Vitamin D', value: '38', unit: 'nmol/L', range: '50–125', status: 'low' },
    { name: 'Ferritin', value: '85', unit: 'µg/L', range: '30–300', status: 'normal' },
    { name: 'HbA1c', value: '34', unit: 'mmol/mol', range: '< 42', status: 'normal' },
    { name: 'LDL', value: '2.6', unit: 'mmol/L', range: '< 3.0', status: 'normal' },
  ],
  recommendations: [
    { kind: 'nutrition', title: 'Fatty fish twice a week', detail: 'Salmon, herring or mackerel are the richest food sources of vitamin D.', marker: 'Vitamin D' },
    { kind: 'nutrition', title: 'Keep the daily supplement', detail: '38 µg of vitamin D every day through the winter, as your doctor advised.', marker: 'Vitamin D' },
    { kind: 'nutrition', title: 'Eggs and fortified dairy', detail: 'Easy daily top-ups. Choose lactose-free fortified milk.', marker: 'Vitamin D' },
    { kind: 'exercise', title: '20 minutes outside in daylight', detail: 'A brisk walk around midday helps your skin make vitamin D.', marker: 'Vitamin D' },
    { kind: 'exercise', title: 'Strength training twice a week', detail: 'Weight-bearing exercise keeps bones strong while vitamin D is low.', marker: 'Vitamin D' },
  ],
}
