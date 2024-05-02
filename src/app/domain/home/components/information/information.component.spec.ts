import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { InformationComponent } from './information.component';
import { AnalyticsService } from '@shared/services/analytics.service';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;
  let analyticsService: AnalyticsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationComponent],
      providers: [AnalyticsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService);

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

  it('validate click on information link', () => {
    const spy = spyOn(component, 'fireAnalytic');

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

  it('validate fireAnalytic method', () => {
    const spy = spyOn(analyticsService, 'customEvent');

    component.fireAnalytic('Instagram');
    expect(spy).toHaveBeenCalledWith('on-click-contact-instagram');
  });
});
