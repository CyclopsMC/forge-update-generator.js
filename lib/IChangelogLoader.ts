export interface IChangelogLoader {
  /**
   * Load a changelog string for the given file URL.
   * @param fileUrl The URL of a CurseForge mod file page.
   */
  load: (fileUrl: string) => Promise<string>;
}
