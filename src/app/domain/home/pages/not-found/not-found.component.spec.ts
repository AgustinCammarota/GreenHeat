import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { AnalyticsService } from '@shared/services/analytics.service';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;
  let routerLinks: RouterLink[];
  let linkDes: DebugElement[];

  beforeEach(async () => {
    const analyticsServiceSpy = jasmine.createSpyObj(AnalyticsService, ['pageView']);
    await TestBed.configureTestingModule({
      imports: [
          NotFoundComponent,
          RouterLink,
      ],
      providers: [
        provideRouter([]),
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotFoundComponent);
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should have a h2 element', () => {
      const element = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have a h1 element', () => {
      const element = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have a h3 element', () => {
      const element = fixture.debugElement.query(By.css('h3')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have a link element', () => {
      const element = fixture.debugElement.query(By.css('a')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have 1 routerLinks', () => {
      expect(routerLinks.length).toBe(1);
      expect(routerLinks[0].href).toBe('/');
    });

    it('should redirect when click on a link', fakeAsync(() => {
      const heroesLinkDe = linkDes[0];
      TestBed.inject(Router).resetConfig([{path: '**', children: []}]);
      heroesLinkDe.triggerEventHandler('click', {button: 0});
      tick();
      fixture.detectChanges();
      expect(TestBed.inject(Router).url).toBe('/');
    }));
  });

  describe('Validate ngOnInit', () => {
    it('should call pageView in analytics service when the component start', () => {
      fixture.detectChanges();
      expect(analyticsService.pageView).toHaveBeenCalledWith('error-page');
    });
  });
});
