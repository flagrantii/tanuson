// filepath: /Users/tanusondeachaboonchana/Work/personal/tanusonPage/app/api/estimate/route.ts
import OpenAI from 'openai';
import { computeRuleEstimate, StructuredFormInput } from '@/lib/estimation';
import { z } from 'zod';

// Security: ensure this endpoint is not statically cached (user input could leak)
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

// Basic in-memory IP rate limiter (non-durable, adequate for low-volume)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_LIMIT_MAX = 20; // requests per window
const ipHits: Map<string, { count: number; start: number }> = new Map();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec) { ipHits.set(ip, { count: 1, start: now }); return true; }
  if (now - rec.start > RATE_LIMIT_WINDOW_MS) { ipHits.set(ip, { count: 1, start: now }); return true; }
  if (rec.count >= RATE_LIMIT_MAX) return false;
  rec.count += 1;
  return true;
}

// Input validation schemas
const MAX_DESC_CHARS = 2000;
const FreeformSchema = z.object({
  mode: z.literal('freeform'),
  description: z.string().min(5).max(MAX_DESC_CHARS)
});
const StructuredSchema = z.object({
  mode: z.literal('structured'),
  projectType: z.enum(['landing','web-app','script','mobile','other']),
  pages: z.number().int().positive().max(200),
  complexity: z.enum(['low','medium','high']),
  auth: z.boolean(),
  adminPanel: z.boolean(),
  aiFeatures: z.enum(['none','basic','advanced']),
  timeline: z.enum(['flexible','normal','rushed']),
  notes: z.string().max(500).optional().default('')
});
const UnifiedSchema = z.union([FreeformSchema, StructuredSchema]);

function safeParseJSON<T>(text: string): T | null { try { return JSON.parse(text) as T; } catch { return null; } }

// Basic origin allow list (optional). Set ALLOWED_ORIGINS="https://example.com,https://foo.bar".
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
function isOriginAllowed(origin: string | null): boolean {
  if (!allowedOrigins.length) return true; // no restriction configured
  if (!origin) return false;
  try { const o = new URL(origin); return allowedOrigins.includes(`${o.origin}`); } catch { return false; }
}

export async function POST(req: Request) {
  try {

    // Basic origin / referrer check (best-effort, not a substitute for auth)
    const ref = req.headers.get('referer');
    if (!isOriginAllowed(ref)) {
      return Response.json({ error: 'Origin not allowed' }, { status: 403 });
    }

    // Rate limiting
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (!rateLimit(ip)) {
      return Response.json({ error: 'Too Many Requests' }, { status: 429, headers: { 'Retry-After': '600' } });
    }

    // Size guard (body length) ~ 16KB max
    const bodyText = await req.text();
    if (bodyText.length > 16 * 1024) {
      return Response.json({ error: 'Payload too large' }, { status: 413 });
    }
    const raw = safeParseJSON<unknown>(bodyText);
    if (!raw) return Response.json({ error: 'Invalid JSON' }, { status: 400 });

    const parsedUnion = UnifiedSchema.safeParse(raw);
    if (!parsedUnion.success) {
      return Response.json({ error: 'Validation failed', issues: parsedUnion.error.issues }, { status: 400 });
    }
    const body = parsedUnion.data;

    if (body.mode === 'structured') {
      const estimate = computeRuleEstimate(body as StructuredFormInput);
      return Response.json({ source: 'rule', estimate });
    }

    // Freeform path (AI)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'OPENAI_API_KEY not configured', suggestion: 'Provide key server-side to enable AI parsing.' }, { status: 500 });
    }

    const client = new OpenAI({ apiKey });
    const description = body.description; // already length validated
    const prompt = `You are an assistant that extracts project scoping attributes from a free-form software project description for a freelance fullstack/AI engineer.\nReturn a JSON object with fields:\nprojectType (landing|web-app|script|mobile|other), pages (integer), complexity (low|medium|high), auth (boolean), adminPanel (boolean), aiFeatures (none|basic|advanced), timeline (flexible|normal|rushed), notes (short summary of key features).\nIf uncertain, make reasonable assumptions and note them in notes. Base choices on description below.\nDescription: """${description.replace(/[`$]/g,'')}"""`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You extract structured estimation inputs as valid JSON only. No prose.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' } as any // hint, ignored if model unsupported
    });

    const content = completion.choices[0]?.message?.content || '{}';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : content;
    const aiParsed = safeParseJSON<StructuredFormInput>(jsonText);
    if (!aiParsed) return Response.json({ error: 'AI parsing failed', raw: content }, { status: 502 });

    const normalized: StructuredFormInput = {
      projectType: aiParsed.projectType && ['landing','web-app','script','mobile','other'].includes(aiParsed.projectType) ? aiParsed.projectType : 'web-app',
      pages: typeof aiParsed.pages === 'number' && aiParsed.pages > 0 ? Math.min(aiParsed.pages, 200) : 3,
      complexity: ['low','medium','high'].includes(aiParsed.complexity as any) ? aiParsed.complexity : 'medium',
      auth: !!aiParsed.auth,
      adminPanel: !!aiParsed.adminPanel,
      aiFeatures: ['none','basic','advanced'].includes(aiParsed.aiFeatures as any) ? aiParsed.aiFeatures : 'none',
      timeline: ['flexible','normal','rushed'].includes(aiParsed.timeline as any) ? aiParsed.timeline : 'normal',
      notes: (aiParsed.notes || '').slice(0,500)
    };

    const estimate = computeRuleEstimate(normalized);
    return Response.json({ source: 'ai+rule', inputs: normalized, estimate });
  } catch (e: any) {
    console.error('Estimate error', e?.message);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
