// src/routes/landing/+page.ts
import { getConfig } from '../../lib/utils/config-utils';

export function load() {
  const lang = 'it'; // O prendi la lingua da parametri o in base a logica di routing
  const landingConfig = getConfig('landing', lang);

  return {
    config: landingConfig
  };
}
