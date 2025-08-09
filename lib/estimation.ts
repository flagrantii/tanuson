// filepath: /Users/tanusondeachaboonchana/Work/personal/tanusonPage/lib/estimation.ts
export interface StructuredFormInput {
  projectType: string; // e.g. web-app, landing, script, mobile
  pages: number; // number of unique pages / screens
  complexity: 'low' | 'medium' | 'high';
  auth: boolean;
  adminPanel: boolean;
  aiFeatures: 'none' | 'basic' | 'advanced';
  timeline: 'flexible' | 'normal' | 'rushed';
  notes?: string;
}

export interface EstimateBreakdownItem { label: string; amount: number; description?: string }
export interface EstimateResult {
  min: number;
  max: number;
  currency: string;
  hours: number; // estimated hours
  timelineWeeks: number;
  breakdown: EstimateBreakdownItem[];
  assumptions: string[];
  suggestions?: string[];
}

// Basic rule-based model (can be tuned further)
export function computeRuleEstimate(input: StructuredFormInput): EstimateResult {
  const currency = 'USD';
  const breakdown: EstimateBreakdownItem[] = [];
  let base = 0;
  let hours = 0;

  // Base per project type
  const typeBaseMap: Record<string, { base: number; hours: number }> = {
    'landing': { base: 600, hours: 12 },
    'script': { base: 400, hours: 8 },
    'web-app': { base: 1500, hours: 30 },
    'mobile': { base: 1800, hours: 36 },
    'default': { base: 1000, hours: 20 },
  };
  const typeEntry = typeBaseMap[input.projectType] || typeBaseMap.default;
  base += typeEntry.base;
  hours += typeEntry.hours;
  breakdown.push({ label: 'Base (' + input.projectType + ')', amount: typeEntry.base });

  // Pages / Screens
  if (input.pages > 0) {
    const extraPages = Math.max(0, input.pages - 3); // assume 3 included
    const perPage = 120;
    const perPageHours = 2.2;
    const pagesAmount = extraPages * perPage;
    const pagesHours = extraPages * perPageHours;
    base += pagesAmount;
    hours += pagesHours;
    breakdown.push({ label: 'Additional Pages (' + extraPages + ')', amount: pagesAmount });
  }

  // Complexity multiplier
  const complexityMultiplier = { low: 1, medium: 1.35, high: 1.75 }[input.complexity];

  // Feature flags
  if (input.auth) {
    base += 400; hours += 8; breakdown.push({ label: 'Authentication', amount: 400 });
  }
  if (input.adminPanel) {
    base += 600; hours += 12; breakdown.push({ label: 'Admin Panel', amount: 600 });
  }
  if (input.aiFeatures === 'basic') { base += 500; hours += 10; breakdown.push({ label: 'Basic AI Features', amount: 500 }); }
  if (input.aiFeatures === 'advanced') { base += 1200; hours += 24; breakdown.push({ label: 'Advanced AI Features', amount: 1200 }); }

  // Apply complexity multiplier at end (excluding base line items maybe) -> multiply subtotal
  const preComplexity = base;
  base = Math.round(base * complexityMultiplier);
  const complexityAddition = base - preComplexity;
  if (complexityAddition !== 0) breakdown.push({ label: 'Complexity uplift (' + input.complexity + ')', amount: complexityAddition });

  // Timeline surcharge
  let timelineWeeks = Math.round(hours / 15); // assume 15 focused hours / week part-time freelance
  let timelineMultiplier = 1;
  if (input.timeline === 'rushed') { timelineMultiplier = 1.25; }
  if (input.timeline === 'flexible') { timelineMultiplier = 0.95; }
  const preTimeline = base;
  base = Math.round(base * timelineMultiplier);
  if (timelineMultiplier !== 1) breakdown.push({ label: 'Timeline adjustment', amount: base - preTimeline });
  if (input.timeline === 'rushed') timelineWeeks = Math.max(1, Math.round(timelineWeeks * 0.75));
  if (input.timeline === 'flexible') timelineWeeks = Math.round(timelineWeeks * 1.1);

  // Range +/- 12%
  const min = Math.round(base * 0.88);
  const max = Math.round(base * 1.12);

  const assumptions: string[] = [
    'Includes responsive UI and basic accessibility best practices',
    'One design iteration per page/screen included',
    'Content copy provided by client',
  ];
  if (input.adminPanel) assumptions.push('Admin panel includes CRUD, basic role management');
  if (input.aiFeatures !== 'none') assumptions.push('AI feature cost assumes using hosted API (e.g. OpenAI) billed separately');

  const suggestions: string[] = [];
  if (!input.auth) suggestions.push('Add authentication later to reduce initial scope');
  if (input.pages > 10) suggestions.push('Consider phased delivery splitting pages into milestones');
  if (input.timeline === 'rushed') suggestions.push('Extending the timeline could reduce cost by ~20%');

  return { min, max, currency, hours: Math.round(hours), timelineWeeks, breakdown, assumptions, suggestions };
}
