import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PresentationComponent } from './presentation.component';
import { AnalyticsService } from '@shared/services/analytics.service';

describe('PresentationComponent', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    const analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['fireAnalytic', 'customEvent']);
    await TestBed.configureTestingModule({
      imports: [PresentationComponent],
      providers: [
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should have a subtitle', () => {
      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.presentation__subtitle'),
      ).nativeElement;

      expect(body).toBeTruthy();
    });

    it('should have a title', () => {
      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.presentation__title'),
      ).nativeElement;

      expect(body).toBeTruthy();
    });

    it('should have a text', () => {
      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.presentation__text'),
      ).nativeElement;

      expect(body).toBeTruthy();
    });

    it('should have a link', () => {
      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.presentation__link'),
      ).nativeElement;

      expect(body).toBeTruthy();
    });

    it('should call fireAnalytic method when click on presentation link', () => {
      const spy = spyOn(component, 'fireAnalytic').and.stub();

      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.presentation__link'),
      ).nativeElement;

      body.removeAttribute('href');

      body.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Validate whatsappUrl method', () => {
    it('should return a wp url', () => {
      expect(component.whatsappUrl).toEqual('https://wa.me/+5491166525996');
    });
  });

  describe('Validate fireAnalytic method', () => {
    it('should call customEvent in analytics service', () => {
      component.fireAnalytic();
      expect(analyticsService.customEvent).toHaveBeenCalledWith('on-click-contact-whatsapp');
    });
  });
});
