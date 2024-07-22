
import { setupBrowserHooks, getBrowserState } from './utils';

describe('Green Heat Test E2E', () => {
  setupBrowserHooks();

  it('should have a header section', async () => {
    const { page } = getBrowserState();
    const icon = await page.waitForSelector('app-nav nav .icon-container img');
    const title = await page.waitForSelector('app-nav nav .icon-container h1');
    const listItem = await page.waitForSelector('app-nav nav .list-container .list-item-container');
    const actionlink = await page.waitForSelector('app-nav nav .action-link-container');
    const menuMobile = await page.waitForSelector('app-nav nav .nav-button-container', { visible: false });

    expect(icon).not.toBeNull();
    expect(title).not.toBeNull();
    expect(listItem).not.toBeNull();
    expect(actionlink).not.toBeNull();
    expect(menuMobile).not.toBeNull();
  }, 50000);

  it('should have about section', async () => {
    const { page } = getBrowserState();
    const subtitle = await page.waitForSelector('.about-section .presentation .presentation__subtitle');
    const title = await page.waitForSelector('.about-section .presentation .presentation__title');
    const presentation = await page.waitForSelector('.about-section .presentation .presentation__text');
    const contactButton = await page.waitForSelector('.about-section .presentation .presentation__link');
    const slideContainer = await page.waitForSelector('app-carousel .carousel-container .slide-container');
    const slideButtonRight = await page.waitForSelector('app-carousel .carousel-container .buttons-container .action-right');
    const slideButtonLeft = await page.waitForSelector('app-carousel .carousel-container .buttons-container .action-left');

    expect(subtitle).not.toBeNull();
    expect(title).not.toBeNull();
    expect(presentation).not.toBeNull();
    expect(contactButton).not.toBeNull();
    expect(slideContainer).not.toBeNull();
    expect(slideButtonRight).not.toBeNull();
    expect(slideButtonLeft).not.toBeNull();
  }, 50000);

  it('should have services section', async () => {
    const { page } = getBrowserState();
    const serviceItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Servicios)');
    await serviceItem?.click();

    const subtitle = await page.waitForSelector('.service-section .title-container .title-container__subtitle');
    const title = await page.waitForSelector('.service-section .title-container .title-container__title');
    const divider = await page.waitForSelector('.service-section .title-container .title-container__divider');
    const cardImage = await page.waitForSelector('.service-section .card-container .card .card-image-container');
    const cardTitle = await page.waitForSelector('.service-section .card-container .card .card__title');
    const cardText = await page.waitForSelector('.service-section .card-container .card .card__text');

    expect(subtitle).not.toBeNull();
    expect(title).not.toBeNull();
    expect(divider).not.toBeNull();
    expect(cardImage).not.toBeNull();
    expect(cardTitle).not.toBeNull();
    expect(cardText).not.toBeNull();
  }, 50000);

  it('should have clients section', async () => {
    const { page } = getBrowserState();
    const clientItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Clientes)');
    await clientItem?.click();

    const subtitle = await page.waitForSelector('.client-section .title-container .title-container__subtitle');
    const title = await page.waitForSelector('.client-section .title-container .title-container__title');
    const divider = await page.waitForSelector('.client-section .title-container .title-container__divider');
    const brandImage = await page.waitForSelector('.client-section .brand-container .brand .brand__image');
    const brandDescription = await page.waitForSelector('.client-section .brand-container .brand .brand__description');

    expect(subtitle).not.toBeNull();
    expect(title).not.toBeNull();
    expect(divider).not.toBeNull();
    expect(brandImage).not.toBeNull();
    expect(brandDescription).not.toBeNull();
  }, 50000);

  it('should have contact section', async () => {
    const { page } = getBrowserState();
    const contactItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Contacto)');
    await contactItem?.click();

    const formTitle = await page.waitForSelector('.contact-container .form-container .form-container__title');
    const formInput = await page.waitForSelector('.contact-container .form-container .form[name="form-email"] input[type="email"]');
    const formTextarea = await page.waitForSelector('.contact-container .form-container .form[name="form-email"] textarea');
    const formButton = await page.waitForSelector('.contact-container .form-container .form[name="form-email"] .form__button');

    const informationLink = await page.waitForSelector('.contact-container .information-container .information-link');
    const informationLinkImg = await page.waitForSelector('.contact-container .information-container .information-link .information-link__picture');
    const informationLinkText = await page.waitForSelector('.contact-container .information-container .information-link .information-link__text');

    const authorText = await page.waitForSelector('.contact-container .author-section .author-section__text');

    expect(formTitle).not.toBeNull();
    expect(formInput).not.toBeNull();
    expect(formTextarea).not.toBeNull();
    expect(formButton).not.toBeNull();
    expect(informationLink).not.toBeNull();
    expect(informationLinkImg).not.toBeNull();
    expect(informationLinkText).not.toBeNull();
    expect(authorText).not.toBeNull();
  }, 50000);

  it('should have scroll button', async () => {
    const { page } = getBrowserState();
    const scrollContainerSelector = 'app-scroll-top .scroll-top-container';
    const scrollButtonSelector = 'app-scroll-top .scroll-top-container .scroll-top-button';

    const clientItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Clientes)');
    await clientItem?.click();

    const scrollButton = await page.waitForSelector(scrollButtonSelector);
    const validation = await page.$eval(scrollContainerSelector, element => element.className);

    expect(scrollButton).not.toBeNull();
    expect(validation).toContain('visible');

    await scrollButton?.click();
    const scrollContainer = await page.waitForSelector(scrollContainerSelector, { visible: false });

    expect(scrollContainer).not.toBeNull();
  }, 50000);

  it('should complete the contact form', async () => {
    const { page } = getBrowserState();
    const formInputSelector = '.contact-container .form[name="form-email"] input[type="email"]'
    const formTextareaSelector = '.contact-container .form[name="form-email"] textarea'
    const formButtonSelector = '.contact-container .form[name="form-email"] .form__button'

    const contactItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Contacto)');
    await contactItem?.click();

    const formInput = await page.waitForSelector(formInputSelector);
    await formInput?.type('agustin@hotmail.com');

    const formTextarea = await page.waitForSelector(formTextareaSelector);
    await formTextarea?.type('this is a message for test');

    const validationOne = await page.$eval(formInputSelector, element => element.value);
    const validationTwo = await page.$eval(formTextareaSelector, element => element.value);

    expect(formInput).not.toBeNull();
    expect(formTextarea).not.toBeNull();
    expect(validationOne).toEqual('agustin@hotmail.com');
    expect(validationTwo).toEqual('this is a message for test');

    const formButton = await page.waitForSelector(formButtonSelector);
    await formButton?.click();
    const validationThree = await page.$eval(formButtonSelector, element => element.getAttribute('disabled'));

    expect(formButton).not.toBeNull();
    expect(validationThree).not.toBeNull();
  }, 50000);

  it('should open Whatsapp when the user click contact button footer', async () => {
    const { page } = getBrowserState();
    const contactItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Contacto)');
    await contactItem?.click();

    const informationLink = await page.waitForSelector('.contact-container .information-container .information-link[title="+54 9 11 6652-5996"]');
    await informationLink?.click();

    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    expect(page.url()).toContain('whatsapp');
  }, 50000);

  it('should open Instagram when the user click contact button footer', async () => {
    const { page } = getBrowserState();
    const contactItem = await page.waitForSelector('app-nav nav .list-container .list-item-container .list-item-container__link ::-p-text(Contacto)');
    await contactItem?.click();

    const informationLink = await page.waitForSelector('.contact-container .information-container .information-link[title="@greenheatclima"]');
    await informationLink?.click();

    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    expect(page.url()).toContain('instagram');
  }, 50000);

  it('should open Whatsapp when the user click contact button presentation', async () => {
    const { page } = getBrowserState();
    const contactButton = await page.waitForSelector('.about-section .presentation .presentation__link');
    await contactButton?.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    expect(page.url()).toContain('whatsapp');
  }, 50000);

  it('should open Whatsapp when the user click button header', async () => {
    const { page } = getBrowserState();
    const actionlink = await page.waitForSelector('app-nav nav .action-link-container');
    await actionlink?.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    expect(page.url()).toContain('whatsapp');
  }, 50000);
});
