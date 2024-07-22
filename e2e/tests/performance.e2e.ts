
import { setupBrowserHooks, getBrowserState } from './utils';

describe('Performance', () => {
  setupBrowserHooks();

  it('should generate a page load performance report', async () => {
    const { page } = getBrowserState();
    const metrics = await page.evaluate(() => JSON.stringify(window.performance));
    const result = JSON.parse(metrics)?.timing;

    expect(result?.domainLookupEnd - result?.domainLookupStart).toBeLessThan(1000);
    expect(result?.connectEnd - result?.connectStart).toBeLessThan(1000);
    expect(result?.responseEnd - result?.responseStart).toBeLessThan(2000);
    expect(result?.domInteractive - result?.domLoading).toBeLessThan(2000);
    expect(result?.loadEventEnd - result?.navigationStart).toBeLessThan(5000);
  }, 50000);

  it('should generate a first pain and first content report', async () => {
    const { page } = getBrowserState();
    const firstPain = await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint')));
    const firstContentFulPaint = await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-contentful-paint')));

    const firstContentFulPaintResult = JSON.parse(firstContentFulPaint);
    const firstPainResult = JSON.parse(firstPain);

    expect(firstContentFulPaintResult[0]?.startTime).toBeLessThan(2000);
    expect(firstPainResult[0]?.startTime).toBeLessThan(2000);
  }, 50000);
});
