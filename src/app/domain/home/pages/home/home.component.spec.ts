import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AnalyticsService } from '@shared/services/analytics.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    const analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['pageView']);
    await TestBed.configureTestingModule({
      imports: [
          HomeComponent,
          BrowserAnimationsModule
      ],
      providers: [
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should have app header', () => {
      const element: HTMLElement = fixture.debugElement.query(By.css('app-header')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have app about', () => {
      const element: HTMLElement = fixture.debugElement.query(By.css('app-about')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have app services', () => {
      const element: HTMLElement = fixture.debugElement.query(By.css('app-services')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have app clients', () => {
      const element: HTMLElement = fixture.debugElement.query(By.css('app-clients')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have app contact', () => {
      const element: HTMLElement = fixture.debugElement.query(By.css('app-contact')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should call scrollToElement when the header component emit a navigation event', () => {
      const spy = spyOn(component, 'scrollToElement').and.stub();
      const element: HTMLElement = fixture.debugElement.query(By.css('app-header')).nativeElement;
      element.dispatchEvent(new Event('navigation'));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled()
    });
  });

  describe('Validate ngOnInit', () => {
    it('should call pageView in analytics service when the component start', () => {
      fixture.detectChanges();
      expect(analyticsService.pageView).toHaveBeenCalledWith('home-page');
    });
  });

  describe('Method scrollToElement', () => {
    it('should call scrollIntoView method', () => {
      const element: HTMLElement = fixture.debugElement.query(By.css('#aboutSection')).nativeElement;
      const spy = spyOn(element, 'scrollIntoView').and.stub();
      component.scrollToElement('aboutSection');
      expect(spy).toHaveBeenCalled();
    });
  });
});
