import { redirect } from '@sveltejs/kit';

export function load() {
  console.log("1 load page.ts and redirect")
  throw redirect(307, '/it');
}