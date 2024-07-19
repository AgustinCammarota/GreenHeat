import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { InformationComponent } from './information.component';
import { AnalyticsService } from '@shared/services/analytics.service';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    const analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['customEvent']);
    await TestBed.configureTestingModule({
      imports: [InformationComponent],
      providers: [
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;

    const informationItems = signal([
      {
        href: '',
        image: '/green-heat/whatsapp.svg',
        altImage: 'Whatsapp',
        text: '111121212',
      },
      {
        href: '',
        image: '/green-heat/instagram.svg',
        altImage: 'Instagram',
        text: '@greenheatclima',
      },
    ]);
    component.informationItems = informationItems as unknown as typeof fixture.componentInstance.informationItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should call fireAnalytic method when click information link', () => {
      const spy = spyOn(component, 'fireAnalytic').and.stub();

      fixture.debugElement.queryAll(
          By.css('.information-link'),
      ).map(element => {
        const link: HTMLParagraphElement  = element.nativeElement;
        const img = link.querySelector('.information-link__picture')?.querySelector('img');
        link.removeAttribute('href');
        link.click();
        expect(spy).toHaveBeenCalledWith(img?.getAttribute('alt') || '');
      });
    });
  });

  describe('Validate fireAnalytic method', () => {
    it('should call customEvent in analytics service', () => {
      component.fireAnalytic('Instagram');
      expect(analyticsService.customEvent).toHaveBeenCalledWith('on-click-contact-instagram');
    });
  });
});
