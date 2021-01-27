import type { IChangelogLoader } from './IChangelogLoader';

/**
 * A changelog loader that returns a constant string with a link to the file.
 */
export class DeferredChangelogLoader implements IChangelogLoader {
  public async load(fileUrl: string): Promise<string> {
    return `Download and changelog available at ${fileUrl}`;
  }
}
