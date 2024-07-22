
import { setupBrowserHooks, getBrowserState } from './utils';

// Disabled because it can only be run locally
xdescribe('Accessibility', () => {
  setupBrowserHooks();
  
  it('should generate a accessibility report', async () => {
    const { page } = getBrowserState();
    const snapshot = await page.accessibility.snapshot();
    console.log(snapshot);
    expect(snapshot).not.toBeNull();
  }, 50000);
});
