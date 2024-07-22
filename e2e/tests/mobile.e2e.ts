
import { setupBrowserHooks, getBrowserState } from './utils';
import * as puppeteer from 'puppeteer';

describe('Mobile Green Heat Test E2E', () => {
  setupBrowserHooks();

  it('should have a menu open button', async () => {
    const { page} = getBrowserState();
    const mobile = puppeteer.KnownDevices['iPhone 15 Pro'];
    const listItemSelector = 'app-nav nav .list-container .list-item-container';
    await page.emulate(mobile);
    await page.reload({ waitUntil: 'networkidle0' });

    const menuMobile = await page.waitForSelector('app-nav .nav-container button.nav-button-container');
    let listItem = await page.waitForSelector(listItemSelector, { visible: false });
    expect(menuMobile).not.toBeNull();
    expect(listItem).not.toBeNull();

    await menuMobile?.click();
    listItem = await page.waitForSelector(listItemSelector, { visible: true });

    expect(listItem).not.toBeNull();
  }, 50000);

  it('should have a information link footer items without text', async () => {
    const { page} = getBrowserState();
    const mobile = puppeteer.KnownDevices['iPhone 15 Pro'];
    await page.emulate(mobile);
    await page.reload({ waitUntil: 'networkidle0' });

    const menuMobile = await page.waitForSelector('app-nav .nav-container button.nav-button-container');
    await menuMobile?.click();

    expect(menuMobile).not.toBeNull();

    const contactItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Contacto)');
    await contactItem?.click();

    expect(contactItem).not.toBeNull();

    const informationLink = await page.waitForSelector('.contact-container .information-container .information-link');
    const informationLinkImg = await page.waitForSelector('.contact-container .information-container .information-link .information-link__picture');
    const informationLinkText = await page.waitForSelector('.contact-container .information-container .information-link .information-link__text', { visible: false });

    expect(informationLink).not.toBeNull();
    expect(informationLinkImg).not.toBeNull();
    expect(informationLinkText).not.toBeNull();
  }, 50000);
});
