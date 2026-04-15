import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ parent }) => {
  const { profile } = await parent();
  return { profile };
};
