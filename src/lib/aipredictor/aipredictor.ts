import type { AITextSession } from './chrome-ai.d.ts'; // ensure ambient types are loaded

/** Shape returned by analyzeSentiment */
export interface SceneAnalysis {
  color: string;
  intensity: number;
  wireframe: boolean;
  scale: number;
}

/** Fallback used when the model is unavailable or the parse fails */
const FALLBACK: SceneAnalysis = {
  color: '#3b82f6',
  intensity: 0.5,
  wireframe: true,
  scale: 1.0
};

export const aiPredictor = {
  session: null as AITextSession | null,

  /** Returns true only when Chrome Built-in AI is present in this browser. */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && 'ai' in window && window.ai !== undefined;
  },

  async init(): Promise<void> {
    if (this.session || !this.isAvailable()) return;

    // Double-check the model is ready (could be 'no' on unsupported hardware)
    const availability = await window.ai!.canCreateTextSession();
    if (availability === 'no') {
      console.warn('[aiPredictor] Chrome Built-in AI model not available on this device.');
      return;
    }

    this.session = await window.ai!.createTextSession({
      // Encourage deterministic, structured output
      temperature: 0.4,
      topK: 3
    });
  },

  async analyzeSentiment(userInput: string): Promise<SceneAnalysis> {
    await this.init();

    if (!this.session) {
      console.warn('[aiPredictor] No session — returning fallback values.');
      return FALLBACK;
    }

    // The prompt instructs the model to emit only a JSON object
    const prompt = `You are a creative visual engine.
Analyze the emotional tone of: "${userInput}"
Return ONLY a valid JSON object — no markdown, no explanation:
{
  "color": "<hex color that matches the emotion>",
  "intensity": <float 0.0–1.0>,
  "wireframe": <true if tense/angry, false if calm>,
  "scale": <float 0.5–2.5>
}`;

    try {
      const raw = await this.session.prompt(prompt);
      // Strip potential markdown fences: ```json ... ```
      const clean = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(clean) as Partial<SceneAnalysis>;

      return {
        color:     typeof parsed.color     === 'string'  ? parsed.color     : FALLBACK.color,
        intensity: typeof parsed.intensity === 'number'  ? parsed.intensity : FALLBACK.intensity,
        wireframe: typeof parsed.wireframe === 'boolean' ? parsed.wireframe : FALLBACK.wireframe,
        scale:     typeof parsed.scale     === 'number'  ? parsed.scale     : FALLBACK.scale
      };
    } catch (error) {
      console.error('[aiPredictor] Parse / prompt error:', error);
      return FALLBACK;
    }
  }
};