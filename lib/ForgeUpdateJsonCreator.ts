import type { ICurseforgeData } from './CurseforgeLoader';
import type { IChangelogLoader } from './IChangelogLoader';

/**
 * Generate a Forge update JSON file from given CurseForge data.
 */
export class ForgeUpdateJsonCreator {
  private readonly changelogLoader: IChangelogLoader;

  public constructor(changelogLoader: IChangelogLoader) {
    this.changelogLoader = changelogLoader;
  }

  public async generate(dataCurseforge: ICurseforgeData): Promise<IForgeUpdateData> {
    const dataForge: IForgeUpdateData = {
      homepage: dataCurseforge.urls.curseforge,
      promos: {},
    };

    // Add all mod versions
    const latestMcVersions: Record<string, string> = {};
    const recommendedMcVersions: Record<string, string> = {};
    for (const file of dataCurseforge.files) {
      if (file.versions.includes('Forge')) {
        // Determine MC and mod version
        const mcVersion = file.version;
        const match = /-([^-]*)\.jar/u.exec(file.name);
        if (!match) {
          continue;
        }
        const modVersion = match[1];

        // Add version to container
        if (!dataForge[mcVersion]) {
          dataForge[mcVersion] = {};
        }
        const mcVersionContainer: Record<string, string> = <any> dataForge[mcVersion];
        mcVersionContainer[modVersion] = await this.changelogLoader.load(file.url);

        // Index mod version per mc version for determining promos
        // We assume here that files are sorted by upload date
        if (!latestMcVersions[mcVersion]) {
          latestMcVersions[mcVersion] = modVersion;
        }
        if (file.type === 'release' && !recommendedMcVersions[mcVersion]) {
          recommendedMcVersions[mcVersion] = modVersion;
        }
      }
    }

    // Add promos
    for (const [ mcVersion, modVersion ] of Object.entries(recommendedMcVersions)) {
      dataForge.promos[`${mcVersion}-recommended`] = modVersion;
    }
    for (const [ mcVersion, modVersion ] of Object.entries(latestMcVersions)) {
      dataForge.promos[`${mcVersion}-latest`] = modVersion;
    }

    return dataForge;
  }
}

export interface IForgeUpdateData {
  homepage: string;
  // | string needed because of TS limitation
  [minecraftVersion: string]: Record<string, string> | string;
  promos: Record<string, string>;
}
