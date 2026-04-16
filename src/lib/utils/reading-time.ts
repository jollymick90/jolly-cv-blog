/**
 * Estimates reading time from raw markdown text.
 * Strips YAML frontmatter and HTML/Svelte tags before counting words.
 * Returns minutes (minimum 1).
 */
export function readingTime(rawMarkdown: string): number {
  // Remove YAML frontmatter (--- ... ---)
  const body = rawMarkdown.replace(/^---[\s\S]*?---\s*/, '');
  // Remove HTML/Svelte tags so <Callout> etc. don't inflate word count
  const text = body.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
