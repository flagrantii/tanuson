// filepath: /Users/tanusondeachaboonchana/Work/personal/tanusonPage/components/Estimator.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { computeRuleEstimate, StructuredFormInput, EstimateResult } from '@/lib/estimation';
import jsPDF from 'jspdf';

interface ApiResponse {
  source: string;
  inputs?: StructuredFormInput;
  estimate: EstimateResult;
  error?: string;
  detail?: string;
  raw?: any;
}

const tooltipClass = 'text-xs text-gray-500 mt-1';

export default function Estimator() {
  const [mode, setMode] = useState<'freeform' | 'structured'>('freeform');
  const [description, setDescription] = useState('I need a web platform for booking massage appointments with user login, admin dashboard, 6-8 pages, maybe basic AI suggestions. Need in 6 weeks.');
  const [form, setForm] = useState<StructuredFormInput>({
    projectType: 'web-app',
    pages: 5,
    complexity: 'medium',
    auth: true,
    adminPanel: false,
    aiFeatures: 'none',
    timeline: 'normal',
    notes: ''
  });
  // Add a local state for the pages input as string
  const [pagesInput, setPagesInput] = useState(form.pages.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [resultSource, setResultSource] = useState<string>('');

  // suggestions for inconsistent input
  const [inlineSuggestions, setInlineSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('savedEstimates'); // legacy; no longer used
    if (raw) { /* ignore old saved data */ }
  }, []);

  useEffect(() => {
    const sugg: string[] = [];
    if (mode === 'structured') {
      if (form.pages <= 0) sugg.push('Pages should be at least 1.');
      if (form.pages > 25) sugg.push('Consider phasing large page counts.');
      if (form.complexity === 'high' && form.timeline === 'rushed') sugg.push('High complexity + rushed timeline may increase risk.');
    } else {
      if (description.length < 40) sugg.push('Add more detail: target users, main features, timeline.');
      if (!/auth|login|signup|sign up/i.test(description)) sugg.push('Specify if user accounts / authentication are needed.');
      if (!/admin|dashboard/i.test(description)) sugg.push('Mention if an admin dashboard is required.');
    }
    setInlineSuggestions(sugg);
  }, [mode, form, description]);

  // Sync pagesInput when form.pages changes (e.g. mode switch)
  useEffect(() => {
    setPagesInput(form.pages.toString());
  }, [form.pages]);

  function updateForm<K extends keyof StructuredFormInput>(k: K, v: StructuredFormInput[K]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function calculate() {
    setLoading(true); setError(null); setResult(null); setResultSource('');
    try {
      if (mode === 'freeform') {
        const res = await fetch('/api/estimate', { method: 'POST', body: JSON.stringify({ mode: 'freeform', description }) });
        const data: ApiResponse = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || 'Failed');
        setResult(data.estimate); setResultSource(data.source);
      } else {
        // Use API for consistent backend logic (could do client computeRuleEstimate(form))
        const res = await fetch('/api/estimate', { method: 'POST', body: JSON.stringify({ mode: 'structured', ...form }) });
        const data: ApiResponse = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || 'Failed');
        setResult(data.estimate); setResultSource(data.source);
      }
    } catch (e: any) {
      setError(e.message);
      if (mode === 'structured') {
        // Fallback to local compute
        const est = computeRuleEstimate(form);
        setResult(est); setResultSource('fallback-local');
      }
    } finally { setLoading(false); }
  }

  function numberFmt(n: number) { return new Intl.NumberFormat('en-US').format(n); }

  function exportInvoicePDF() {
    console.log('Exporting PDF', { result, form, mode, resultSource });
    if (!result) return;
    const doc = new jsPDF({ unit: 'pt' });
    const lineHeight = 16;
    let y = 60;
    const left = 50;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Project Estimate Invoice', left, y);
    y += 28;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, left, y); y += lineHeight;
    doc.text(`Mode: ${resultSource}`, left, y); y += lineHeight;
    if (form.notes) { doc.text(`Notes: ${form.notes.substring(0, 80)}`, left, y); y += lineHeight; }
    if (mode === 'freeform') { doc.text(`Summary: ${description.substring(0,120)}`, left, y); y += lineHeight; }

    y += 10;
    doc.setFont('helvetica','bold'); doc.text('Cost Range', left, y); y += lineHeight;
    doc.setFont('helvetica','normal');
    doc.text(`${result.currency} ${numberFmt(result.min)} - ${numberFmt(result.max)}`, left, y); y += lineHeight;
    doc.text(`Estimated Hours: ${result.hours}  | Timeline: ~${result.timelineWeeks} weeks`, left, y); y += lineHeight + 10;

    doc.setFont('helvetica','bold'); doc.text('Breakdown', left, y); y += lineHeight;
    doc.setFont('helvetica','normal');
    result.breakdown.forEach(b => {
      doc.text(`${b.label}`, left, y);
      const amount = `${result.currency} ${numberFmt(b.amount)}`;
      doc.text(amount, 550, y, { align: 'right' });
      y += lineHeight;
      if (y > 720) { doc.addPage(); y = 60; }
    });
    y += 10;
    doc.setFont('helvetica','bold'); doc.text('Assumptions', left, y); y += lineHeight;
    doc.setFont('helvetica','normal');
    result.assumptions.forEach(a => { doc.text(`- ${a}`, left, y); y += lineHeight; if (y>720){doc.addPage(); y=60;} });
    if (result.suggestions && result.suggestions.length) {
      y += 10; doc.setFont('helvetica','bold'); doc.text('Optimization Ideas', left, y); y += lineHeight; doc.setFont('helvetica','normal');
      result.suggestions.forEach(s => { doc.text(`- ${s}`, left, y); y += lineHeight; if (y>720){doc.addPage(); y=60;} });
    }
    y += 20;
    doc.setFontSize(8);
    doc.text('Non-binding estimate. Final quote subject to detailed scoping.', left, y);

    const fileBase = `estimate_${new Date().toISOString().slice(0,10)}`;
    doc.save(`${fileBase}.pdf`);
  }

  return (
    <div className="rounded-lg border p-6 bg-white">
      <h2 className="text-xl font-medium">Price Estimator</h2>
      <p className="text-sm text-gray-600 mt-1">Get a quick project cost range. Choose free-form or structured.</p>

      <div className="mt-4 flex gap-3 text-sm" aria-label="Estimator mode">
        <button onClick={() => setMode('freeform')} className={`px-4 py-1.5 rounded-full border ${mode==='freeform'?'bg-black text-white':'hover:bg-gray-100'}`}>Free-form</button>
        <button onClick={() => setMode('structured')} className={`px-4 py-1.5 rounded-full border ${mode==='structured'?'bg-black text-white':'hover:bg-gray-100'}`}>Structured Form</button>
      </div>

      {mode === 'freeform' && (
        <div className="mt-6">
          <label className="block text-sm font-medium">Describe your project</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={5} className="mt-1 w-full rounded border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. A 5 page marketing site with blog, contact form, and basic analytics." />
          <p className={tooltipClass}>Mention pages/screens, key features, auth, admin needs, timeline.</p>
        </div>
      )}

      {mode === 'structured' && (
        <form onSubmit={e=>{e.preventDefault(); calculate();}} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label htmlFor="projectType" className="block text-sm font-medium">Project Type</label>
            <select id="projectType" value={form.projectType} onChange={e=>updateForm('projectType', e.target.value)} className="mt-1 w-full border rounded p-2 text-sm" aria-describedby="projectTypeHelp">
              <option value="landing">Landing</option>
              <option value="web-app">Web App</option>
              <option value="script">Automation Script</option>
              <option value="mobile">Mobile</option>
            </select>
            <p id="projectTypeHelp" className={tooltipClass}>General category.</p>
          </div>
          <div>
            <label htmlFor="pages" className="block text-sm font-medium">Pages / Screens</label>
            <input
              id="pages"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              min={1}
              value={pagesInput}
              onChange={e => {
                // Allow empty string or only digits
                const val = e.target.value;
                if (/^\d*$/.test(val)) setPagesInput(val);
              }}
              onBlur={() => {
                // On blur, parse and update form.pages
                const n = parseInt(pagesInput, 10);
                if (!isNaN(n) && n > 0) {
                  updateForm('pages', n);
                  setPagesInput(n.toString());
                } else {
                  // fallback to previous valid value
                  setPagesInput(form.pages.toString());
                }
              }}
              className="mt-1 w-full border rounded p-2 text-sm"
              aria-describedby="pagesHelp"
            />
            <p id="pagesHelp" className={tooltipClass}>Unique pages or screen views.</p>
          </div>
          <div>
            <label htmlFor="complexity" className="block text-sm font-medium">Complexity</label>
            <select id="complexity" value={form.complexity} onChange={e=>updateForm('complexity', e.target.value as any)} className="mt-1 w-full border rounded p-2 text-sm" aria-describedby="complexityHelp">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p id="complexityHelp" className={tooltipClass}>Logic depth & integrations.</p>
          </div>
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium">Timeline</label>
            <select id="timeline" value={form.timeline} onChange={e=>updateForm('timeline', e.target.value as any)} className="mt-1 w-full border rounded p-2 text-sm" aria-describedby="timelineHelp">
              <option value="flexible">Flexible</option>
              <option value="normal">Normal</option>
              <option value="rushed">Rushed</option>
            </select>
            <p id="timelineHelp" className={tooltipClass}>Urgency affects price.</p>
          </div>
          <div className="flex items-center gap-2">
            <input id="auth" type="checkbox" checked={form.auth} onChange={e=>updateForm('auth', e.target.checked)} className="h-4 w-4" />
            <label htmlFor="auth" className="text-sm">Authentication</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="adminPanel" type="checkbox" checked={form.adminPanel} onChange={e=>updateForm('adminPanel', e.target.checked)} className="h-4 w-4" />
            <label htmlFor="adminPanel" className="text-sm">Admin Panel</label>
          </div>
          <div>
            <label htmlFor="aiFeatures" className="block text-sm font-medium">AI Features</label>
            <select id="aiFeatures" value={form.aiFeatures} onChange={e=>updateForm('aiFeatures', e.target.value as any)} className="mt-1 w-full border rounded p-2 text-sm" aria-describedby="aiFeaturesHelp">
              <option value="none">None</option>
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
            </select>
            <p id="aiFeaturesHelp" className={tooltipClass}>Chat, generation, etc.</p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium">Notes (optional)</label>
            <textarea id="notes" rows={3} value={form.notes} onChange={e=>updateForm('notes', e.target.value)} className="mt-1 w-full border rounded p-2 text-sm" placeholder="Extra context, external APIs, constraints" />
          </div>
        </form>
      )}

      {inlineSuggestions.length > 0 && (
        <div className="mt-4 text-xs text-gray-700 bg-gray-50 border rounded p-3" role="note">
          <span className="font-medium">Suggestions:</span>
          <ul className="list-disc ml-5 mt-1 space-y-0.5">
            {inlineSuggestions.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <button onClick={calculate} disabled={loading} className="px-5 py-2 rounded-full border border-black text-sm font-medium hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          {loading && <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" aria-hidden="true"/>}
          Calculate Price
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}

      {result && (
        <div className="mt-8" aria-live="polite">
          <h3 className="text-lg font-semibold">Estimated Range</h3>
          <p className="text-sm text-gray-600 mt-1">{resultSource === 'ai+rule' ? 'AI interpreted your description, then applied rules.' : resultSource === 'rule' ? 'Rule-based estimate.' : 'Local fallback estimate.'}</p>
          <div className="mt-3 flex flex-wrap gap-6">
            <div>
              <div className="text-2xl font-semibold">{result.currency} {numberFmt(result.min)} - {numberFmt(result.max)}</div>
              <p className="text-xs text-gray-500 mt-1">Approx {result.hours} hrs • ~{result.timelineWeeks} wks</p>
            </div>
            <div className="flex items-end">
              <button onClick={exportInvoicePDF} className="text-sm underline underline-offset-4">Export Invoice (PDF)</button>
            </div>
          </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-sm mb-2">Breakdown</h4>
                <ul className="text-sm space-y-1">
                  {result.breakdown.map(b => (
                    <li key={b.label} className="flex justify-between gap-4">
                      <span>{b.label}</span>
                      <span className="tabular-nums">{result.currency} {numberFmt(b.amount)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Assumptions</h4>
                <ul className="text-xs space-y-1 list-disc ml-5">
                  {result.assumptions.map(a => <li key={a}>{a}</li>)}
                </ul>
                {result.suggestions && result.suggestions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-1">Optimization Ideas</h4>
                    <ul className="text-xs space-y-1 list-disc ml-5">
                      {result.suggestions.map(s => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          <p className="text-[11px] text-gray-500 mt-6">This is a non-binding estimate. Final quote may adjust after detailed scoping.</p>
        </div>
      )}
    </div>
  );
}
