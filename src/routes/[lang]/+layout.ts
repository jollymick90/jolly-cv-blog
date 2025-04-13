import type { IResume } from '$lib/content';
import type { LandingConfig } from '$lib/types';
import { getConfig } from '$lib/utils/config-utils';

export function load() {
    console.log("load layout inside lang")
    const lang = 'it'; // O prendi la lingua da parametri o in base a logica di routing
    const landingConfig: LandingConfig = getConfig('landing', lang);
    const resumeConfig: IResume = getConfig('resume', lang);
  
    return {
      landing: landingConfig,
      resume: resumeConfig
    } as {
      landing: LandingConfig,
      resume: IResume
    };
  }