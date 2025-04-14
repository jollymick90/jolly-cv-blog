
export const prerender = true;

export function entries() {
  return ['it', 'en'].map(lang => ({ lang }));
}
export function load() {
  console.log("load [lang]/page.ts")
  
}