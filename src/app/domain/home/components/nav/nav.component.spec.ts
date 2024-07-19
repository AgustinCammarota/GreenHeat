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
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    const analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['customEvent']);
    await TestBed.configureTestingModule({
      imports: [
          NavComponent,
          BrowserAnimationsModule
      ],
      providers: [
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
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

  describe('Validate dom elements', () => {
    it('should change the isMenuOpen state when click nav button', () => {
      component.isMenuOpen.set(false);
      const element: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.nav-button-container')
      ).nativeElement;

      element.click();
      expect(component.isMenuOpen()).toBeTruthy();
    });

    it('should have a four list item container', () => {
      const elements = fixture.debugElement.queryAll(
          By.css('.list-item-container')
      );
      expect(elements.length).toEqual(4);
    });

    it('should emit nav section event', () => {
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

    it('should call customEvent in analytics services when click action link', () => {
      const element: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.action-link-container')
      ).nativeElement;

      element.removeAttribute('href');

      element.click();
      expect(analyticsService.customEvent).toHaveBeenCalledWith('on-click-contact-whatsapp');
    });
  });

  describe('Validate openMenu method', () => {
    it('should change isMenuOpen status', () => {
      component.isMenuOpen.set(false);
      component.openMenu();

      expect(component.isMenuOpen()).toBeTruthy();
    });
  });

  describe('Validate navToElement method', () => {
    it('should emit nav section event', () => {
      component.navSection.subscribe((value: string) => {
        expect(value).toEqual('aboutSection');
        expect(component.isMenuOpen()).toBeFalse();
      });

      component.navToElement(Sections.aboutSection);
    });
  });

  describe('Validate fireAnalytic method', () => {
    it('should call customEvent in analytics service', () => {
      component.fireAnalytic();
      expect(analyticsService.customEvent).toHaveBeenCalledWith('on-click-contact-whatsapp');
    });
  });

  describe('Validate whatsappUrl method', () => {
    it('should return wp url', () => {
      expect(component.whatsappUrl).toEqual('https://wa.me/+5491166525996');
    });
  });
});
