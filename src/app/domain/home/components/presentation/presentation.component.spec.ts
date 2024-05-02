import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PresentationComponent } from './presentation.component';
import { AnalyticsService } from '@shared/services/analytics.service';

describe('PresentationComponent', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;
  let analyticsService: AnalyticsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationComponent],
      providers: [AnalyticsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate subtitle', () => {
    const body: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.presentation__subtitle'),
    ).nativeElement;

    expect(body).toBeTruthy();
  });

  it('validate title', () => {
    const body: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.presentation__title'),
    ).nativeElement;

    expect(body).toBeTruthy();
  });

  it('validate text', () => {
    const body: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.presentation__text'),
    ).nativeElement;

    expect(body).toBeTruthy();
  });

  it('validate link', () => {
    const body: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.presentation__link'),
    ).nativeElement;

    expect(body).toBeTruthy();
  });

  it('validate click on presentation link', () => {
    const spy = spyOn(component, 'fireAnalytic');

    const body: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.presentation__link'),
    ).nativeElement;

    body.removeAttribute('href');

    body.click();
    expect(spy).toHaveBeenCalled();
  });

  it('validate whatsappUrl method', () => {
    expect(component.whatsappUrl).toEqual('https://wa.me/+5491166525996');
  });

  it('validate fireAnalytic method', () => {
    const spy = spyOn(analyticsService, 'customEvent');

    component.fireAnalytic();
    expect(spy).toHaveBeenCalledWith('on-click-contact-whatsapp');
  });
});
