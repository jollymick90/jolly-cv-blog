import configData from '$lib/config/config.json'; // import del JSON

import type {
	LangType,
	SectionType
} from '../../types';

// Se vuoi, puoi definire un tipo per tutto il config
// type AppConfig = { it: { landing: ..., resume: ...}, en: { ... } };


const DEFAULT_LANG: LangType = 'it'; // o prendi la lingua di default da altrove



export function getConfig(
  section: SectionType,
  lang: LangType = DEFAULT_LANG
): any {
  // Ritorna la parte di config corrispondente

  return configData[lang]?.[section] ?? {};
}
