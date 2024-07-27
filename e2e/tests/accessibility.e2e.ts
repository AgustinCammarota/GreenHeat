
import { setupBrowserHooks, getBrowserState } from './utils';
import { AxePuppeteer } from '@axe-core/puppeteer';


describe('Accessibility', () => {
  setupBrowserHooks();
  
  it('should generate a accessibility report', async () => {
    const { page } = getBrowserState();
    await page.setBypassCSP(true);
    await page.reload();

    const result = await new AxePuppeteer(page).analyze();
    console.log(result.violations);
    expect(result.violations.length).toBeLessThan(2);
  }, 50000);
});
