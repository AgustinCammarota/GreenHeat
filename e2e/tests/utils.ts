
import * as puppeteer from 'puppeteer';

const baseUrl = process.env['baseUrl'] ?? 'http://localhost:8080';
let browser: puppeteer.Browser;
let page: puppeteer.Page;

export function setupBrowserHooks(): void {

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true
    });
  });


  beforeEach(async () => {
    page = await browser.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(10000);
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });
  });

  afterEach(async () => {
    if (!page.isClosed()) {
      await page.close();
    }
  });


  afterAll(async () => {
    await browser.close();
  });
}

export function getBrowserState(): {
  browser: puppeteer.Browser;
  page: puppeteer.Page
  baseUrl: string;
} {
  if (!browser) {
    throw new Error(
      'No browser state found! Ensure `setupBrowserHooks()` is called.'
    );
  }
  return {
    browser,
    page,
    baseUrl,
  };
}
