import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { NavComponent } from './nav.component';
import { Sections } from '@home/interfaces';
import { AnalyticsService } from '@shared/services/analytics.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let analyticsService: AnalyticsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          NavComponent,
          BrowserAnimationsModule
      ],
      providers: [AnalyticsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService);
    const sidebarItems = signal([
      {
        description: 'Nosotros',
        section: Sections.aboutSection
      },
      {
        description: 'Servicios',
        section: Sections.serviceSection
      },
      {
        description: 'Clientes',
        section: Sections.clientSection
      },
      {
        description: 'Contacto',
        section: Sections.contactSection
      }
    ]);
    component.navItems = sidebarItems as unknown as typeof fixture.componentInstance.navItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate click on nav button', () => {
    component.isMenuOpen.set(false);
    const element: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.nav-button-container')
    ).nativeElement;

    element.click();
    expect(component.isMenuOpen()).toBeTruthy();
  });

  it('validate number of elements on the list item', () => {
    const elements = fixture.debugElement.queryAll(
        By.css('.list-item-container')
    );
    expect(elements.length).toEqual(4);
  });

  it('validate click on list item', () => {
    component.navSection.subscribe((value: string) => {
      expect(component.isMenuOpen()).toBeFalse();
      expect(value).toBeDefined();
      expect(value).toMatch(/aboutSection|serviceSection|clientSection|contactSection/);
    });

    fixture.debugElement.queryAll(
        By.css('.list-item-container')
    ).map(element => {
      const li: HTMLParagraphElement = element.nativeElement;
      const button: HTMLButtonElement | null = li.querySelector('.list-item-container__link');
      button?.click();
    });
  });

  it('validate click on action link', () => {
    const spy = spyOn(analyticsService, 'customEvent');
    const element: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.action-link-container')
    ).nativeElement;

    element.removeAttribute('href');

    element.click();
    expect(spy).toHaveBeenCalledWith('on-click-contact-whatsapp');
  });

  it('validate openMenu method', () => {
    component.isMenuOpen.set(false);
    component.openMenu();

    expect(component.isMenuOpen()).toBeTruthy();
  });

  it('validate navToElement method', () => {
    component.navSection.subscribe((value: string) => {
      expect(value).toEqual('aboutSection');
      expect(component.isMenuOpen()).toBeFalse();
    });

    component.navToElement(Sections.aboutSection);
  });

  it('validate fireAnalytic method', () => {
    const spy = spyOn(analyticsService, 'customEvent');
    component.fireAnalytic();

    expect(spy).toHaveBeenCalledWith('on-click-contact-whatsapp');
  });

  it('validate whatsappUrl method', () => {
    expect(component.whatsappUrl).toEqual('https://wa.me/+5491166525996');
  });
});
