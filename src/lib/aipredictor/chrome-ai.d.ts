/**
 * Type declarations for Chrome Built-in AI (window.ai) — experimental API.
 * @see https://developer.chrome.com/docs/ai/built-in/overview
 *
 * The API is gated behind a Chrome flag and may change at any time.
 * Keeping types here (rather than casting to `any`) makes call-sites type-safe
 * and easier to update when the spec evolves.
 */

/** A prompt-based AI session returned by window.ai.createTextSession() */
export interface AITextSession {
  /** Send a prompt and receive a full text response. */
  prompt(input: string): Promise<string>;
  /** Stream a response token-by-token. */
  promptStreaming(input: string): ReadableStream<string>;
  /** Release resources held by this session. */
  destroy(): void;
}

/** Options accepted by createTextSession() */
export interface AITextSessionOptions {
  /** 0.0 – 1.0  (higher = more creative) */
  temperature?: number;
  /** Top-K sampling parameter */
  topK?: number;
  systemPrompt?: string;
}

/** Availability of the on-device model */
export type AIModelAvailability = 'readily' | 'after-download' | 'no';

/** The window.ai namespace exposed by Chrome's built-in AI */
export interface WindowAI {
  /** Check if the on-device model is available without downloading. */
  canCreateTextSession(): Promise<AIModelAvailability>;
  /** Create a new text-generation session. */
  createTextSession(options?: AITextSessionOptions): Promise<AITextSession>;
  /** Returns default and supported sampling parameters. */
  defaultTextSessionOptions(): Promise<{ temperature: number; topK: number }>;
}

declare global {
  interface Window {
    /**
     * Chrome Built-in AI — available only in Chrome ≥ 127 with the
     * "Prompt API for Gemini Nano" flag enabled.
     * Always guard access with `'ai' in window` before using.
     */
    ai?: WindowAI;
  }
}

export {};
