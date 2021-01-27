import { fetch } from 'cross-fetch';

/**
 * Loads mod data from CurseForge.
 */
export class CurseforgeLoader {
  public async load(mod: string): Promise<ICurseforgeData> {
    // Fetch JSON
    const url = `https://api.cfwidget.com/minecraft/mc-mods/${mod}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url} (${response.status}: ${response.statusText})`);
    }

    // Check for API errors
    const dataRaw: CurseforgeDataRaw = await response.json();
    if ('error' in dataRaw) {
      throw new Error(`API Error (${dataRaw.error}): ${dataRaw.title}\n${dataRaw.message}`);
    }

    // Sort files by descending upload data
    dataRaw.files = dataRaw.files
      .sort((fileA: any, fileB: any) => Date.parse(fileB.uploaded_at) - Date.parse(fileA.uploaded_at));

    return dataRaw;
  }
}

export type CurseforgeDataRaw = {
  error: string;
  title: string;
  message: string;
} | ICurseforgeData;

export interface ICurseforgeData {
  id: number;
  title: string;
  summary: string;
  game: string;
  type: string;
  urls: Record<string, string>;
  thumbnail: string;
  created_at: string;
  downloads: {
    monthly: number;
    total: number;
  };
  license: string;
  donate: string;
  categories: string[];
  members: { title: string; username: string }[];
  links: string[];
  files: ICurseforgeDataFile[];
  description: string;
  download: ICurseforgeDataFile;
}

export interface ICurseforgeDataFile {
  id: number;
  url: string;
  display: string;
  name: string;
  type: string;
  version: string;
  filesize: number;
  versions: string[];
  downloads: number;
  uploaded_at: string;
}
