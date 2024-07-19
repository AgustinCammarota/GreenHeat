import { ComponentFixture, DeferBlockBehavior, DeferBlockFixture, DeferBlockState, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { Sections } from '@home/interfaces';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let deferBlockFixture: DeferBlockFixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        BrowserAnimationsModule
      ],
      deferBlockBehavior: DeferBlockBehavior.Manual
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    deferBlockFixture = (await fixture.getDeferBlocks())[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(deferBlockFixture).toBeDefined();
  });

  it('should have a list with item navigation', () => {
    expect(component.listItemNavigation().length).toBe(4);
    expect(component.listItemNavigation()).toEqual([
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
  });

  describe('Validate dom elements', () => {
    it('should have a "app-nav" element', () => {
      const element = fixture.debugElement.query(By.css('app-nav')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should have a "app-scroll-top" element', async () => {
      await deferBlockFixture.render(DeferBlockState.Complete);
      const element = fixture.debugElement.query(By.css('app-scroll-top')).nativeElement;
      expect(element).toBeTruthy();
    });

    it('should call handlerNavigation method when "app-scroll-top" emit scrollToTop event', async () => {
      await deferBlockFixture.render(DeferBlockState.Complete);
      const spy = spyOn(component, 'handlerNavigation').and.stub();
      const element = fixture.debugElement.query(By.css('app-scroll-top')).nativeElement;
      element.dispatchEvent(new Event('scrollToTop'));
      expect(spy).toHaveBeenCalled();
    });

    it('should call handlerNavigation when "app-nav" emit navSection event', () => {
      const spy = spyOn(component, 'handlerNavigation').and.stub();
      const element: HTMLElement = fixture.debugElement.query(By.css('app-nav')).nativeElement;
      element.dispatchEvent(new Event('navSection'));
      expect(spy).toHaveBeenCalled();
    });

    it('should call handleScroll when emit scrolledToTop event', () => {
      const spy = spyOn(component, 'handleScroll').and.stub();
      const element: HTMLElement = fixture.debugElement.query(By.css('.header-section')).nativeElement;
      element.dispatchEvent(new Event('scrolledToTop'));
      expect(spy).toHaveBeenCalled();
    });

    it('should call handleDevice when emit mobileDeviceDetermined event', () => {
      const spy = spyOn(component, 'handleDevice').and.stub();
      const element: HTMLElement = fixture.debugElement.query(By.css('.header-section')).nativeElement;
      element.dispatchEvent(new Event('mobileDeviceDetermined'));
      expect(spy).toHaveBeenCalled();
    });

    it('should have ng-animating state', () => {
      component.isMaximize.set(true);
      component.isMobileDevice.set(false);
      fixture.detectChanges();
      const animationElement: HTMLElement = fixture.debugElement.query(By.css('.header')).nativeElement;
      expect(animationElement.classList).toContain('ng-animating');
    });

    it('should change the style when the animation state change', () => {
      const animationElement: HTMLElement = fixture.debugElement.query(By.css('.header')).nativeElement;
      expect(animationElement.style.transform).toBe('translate(-50%, 0px)');
      expect(animationElement.style.padding).toBe('0px');
      component.isMaximize.set(true);
      component.isMobileDevice.set(false);
      fixture.detectChanges();
      expect(animationElement.style.transform).toBe('');
      expect(animationElement.style.padding).toBe('');
    });
  });

  describe('Method handleScroll', () => {
    it('should change the isMaximize and isVisibleScrollToTop properties', () => {
      component.isMaximize.set(false);
      component.isVisibleScrollToTop.set(true);
      component.handleScroll(true);
      expect(component.isMaximize()).toBeTruthy();
      expect(component.isVisibleScrollToTop()).toBeFalsy();
    });
  });

  describe('Method handleDevice', () => {
    it('should change the isMobileDevice property', () => {
      component.isMobileDevice.set(false);
      component.handleDevice(true);
      expect(component.isMobileDevice()).toBeTruthy();
    });
  });

  describe('Method handlerNavigation', () => {
    it('should emit navigation event', (done) => {
      component.navigation.subscribe(value => {
        expect(value).toEqual('aboutSection');
        done();
      });
      component.handlerNavigation('aboutSection');
    });
  });
});
