import { JSDOM } from 'jsdom';
import type { Browser, Page } from 'puppeteer';
const puppeteer = require('puppeteer');
const userAgent = require('user-agents');

/**
 * A changelog loader that scrapes the changelog contents from CurseForge.
 */
export class CurseforgeChangelogLoader {
  private browser: Browser | undefined;
  private page: Page | undefined;

  public async initialize(): Promise<void> {
    this.browser = <Browser> await puppeteer.launch({
      // Headless: false,
      defaultViewport: null,
      // SlowMo: 10,
    });
    this.page = await this.browser.newPage();
  }

  public async deinitialize(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  public async load(fileUrl: string): Promise<string> {
    if (!this.page) {
      throw new Error(`CurseforgeChangelogLoader has not been initialized yet. Call .initialize() first.`);
    }

    // Fetch HTML (via puppeteer to bypass Cloudflare)
    await this.page.setUserAgent(userAgent.toString());
    await this.page.goto(fileUrl);
    const content = await this.page.content();

    // Extract changelog tag
    const dom = new JSDOM(content);
    const value = dom.window.document.querySelector('.user-content')?.textContent;
    if (!value) {
      throw new Error(`No changelog tag was found in ${fileUrl}`);
    }
    return value.trim();
  }
}
