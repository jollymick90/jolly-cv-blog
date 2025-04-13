import { redirect } from '@sveltejs/kit';

export function load() {
  console.log("load page.ts and redirect")
  throw redirect(307, '/it');
}