import type { AEHIEdition } from './types';
import currentPointer from '@/data/current.json';

export async function loadCurrentEdition(): Promise<AEHIEdition> {
  const { edition } = currentPointer;
  const filename = edition.toLowerCase().replace(' ', '-');
  const data = await import(`@/data/${filename}.json`);
  return data.default as AEHIEdition;
}

export async function loadEdition(edition: string): Promise<AEHIEdition> {
  const filename = edition.toLowerCase().replace(' ', '-');
  const data = await import(`@/data/${filename}.json`);
  return data.default as AEHIEdition;
}

export async function loadAllEditions(): Promise<string[]> {
  const current = await loadCurrentEdition();
  return current.historicalTrend.map((t: any) => t.edition);
}
