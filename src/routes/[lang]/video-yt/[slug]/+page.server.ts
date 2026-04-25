import type { EntryGenerator } from './$types';

// All video slugs - must match the IDs in common.json
const VIDEO_SLUGS = [
  'devfest-torino',
  'devfest-roma',
  'frontend-dilemma',
  'arcade-threejs',
  'keycloak-pt1',
  'keycloak-pt2',
  'keycloak-react-pt1',
  'keycloak-react-pt2',
  'postman-env-auto',
  'postman-env',
  'throttling'
];

export const entries: EntryGenerator = () => {
  return VIDEO_SLUGS.flatMap((slug) => [
    { lang: 'it', slug },
    { lang: 'en', slug }
  ]);
};
