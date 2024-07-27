
import { setupBrowserHooks, getBrowserState } from './utils';

describe('Coverage', () => {
  setupBrowserHooks();

  it('should generate a coverage report', async () => {
    const { page } = getBrowserState();

    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage(),
    ]);

    await page.reload({ waitUntil: 'networkidle0' });

    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    let totalBytes = 0;
    let usedBytes = 0;
    const coverage = [...jsCoverage, ...cssCoverage];
    for (const entry of coverage) {
      totalBytes += entry.text.length;
      for (const range of entry.ranges) usedBytes += range.end - range.start - 1;
    }

    expect((usedBytes / totalBytes) * 100).toBeLessThan(100);
  });
});
