// Blood test advice data and dynamic analysis provider.
// Integrates bloodEngine reference data with clinical advice rules.

import { useState } from 'react';
import { parseLab, analyse, rangeText } from '../../shared/bloodEngine.js';
import { generateRecommendations } from './adviceRules.js';

const STORAGE_KEY = 'mc_blood_advice_data';

export const DEFAULT_PATIENT_PROFILE = {
  age: 35,
  sex: 'M',
  fasting: true,
  trimester: 0,
  altitude: 0,
  method: null,
};

export const DEFAULT_LAB_CSV = `marker,value,unit
Vitamin D,18,ng/mL
LDL cholesterol,138,mg/dL
Total cholesterol,215,mg/dL
HDL cholesterol,46,mg/dL
Triglycerides,165,mg/dL
Glucose,94,mg/dL
Ferritin,85,ug/L
Hemoglobin,14.8,g/dL
ALT,28,U/L
Creatinine,0.95,mg/dL`;

/**
 * Runs raw lab text through bloodEngine and generates clinical advice.
 */
export function processBloodReport(rawText, profile = DEFAULT_PATIENT_PROFILE, source = null) {
  const p = { ...DEFAULT_PATIENT_PROFILE, ...profile };
  const rows = parseLab(rawText);
  const { out, calc } = analyse(rows, p);

  const rawMarkers = out.map((o) => ({
    id: o.id,
    name: o.name,
    value: o.dv != null ? String(+o.dv.toFixed(1)) : String(o.raw ?? o.input?.value ?? '–'),
    unit: o.du || o.input?.unit || '',
    range: o.range ? rangeText(o.range, o.du) : '–',
    status: o.status,
    tier: o.tier,
    isCalculated: false,
  }));

  const calcMarkers = calc.map((c) => ({
    id: c.id,
    name: c.name,
    value: c.dv != null ? String(+c.dv.toFixed(1)) : '–',
    unit: c.du || '',
    range: c.range ? rangeText(c.range, c.du) : c.sub || '–',
    status: c.status,
    tier: c.tier,
    isCalculated: true,
  }));

  const allMarkers = [...rawMarkers, ...calcMarkers];
  const recommendations = generateRecommendations(allMarkers);

  return {
    source: source || {
      test: 'Comprehensive Metabolic & Lipid Panel',
      date: '12 May 2026',
      reviewedBy: 'Dr. Mette Holm',
    },
    profile: p,
    rawText,
    markers: allMarkers,
    recommendations,
  };
}

export const ADVICE = processBloodReport(DEFAULT_LAB_CSV, DEFAULT_PATIENT_PROFILE);

/**
 * React hook to manage blood test report state and persistence in localStorage.
 */
export function useBloodAdvice() {
  const [advice, setAdvice] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.rawText && parsed?.profile) {
          return processBloodReport(parsed.rawText, parsed.profile, parsed.source);
        }
      }
    } catch (e) {
      console.warn('Failed to load blood advice from localStorage:', e);
    }
    return ADVICE;
  });

  const uploadReport = (rawText, customProfile, customSource) => {
    const newAdvice = processBloodReport(
      rawText,
      customProfile || advice.profile,
      customSource || {
        test: 'Imported Lab Report',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        reviewedBy: 'Auto-Analyzed (Clinical Research Ranges)',
      }
    );
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          rawText,
          profile: newAdvice.profile,
          source: newAdvice.source,
        })
      );
    } catch (e) {
      console.warn('Failed to persist blood advice:', e);
    }
    setAdvice(newAdvice);
  };

  const resetReport = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear blood advice:', e);
    }
    setAdvice(ADVICE);
  };

  return {
    advice,
    uploadReport,
    resetReport,
  };
}
