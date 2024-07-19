import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CarouselComponent,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    component.slides = signal([1,2,3,4,5]) as unknown as typeof component.slides;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should have five slide container', () => {
      const elements = fixture.debugElement.queryAll(
          By.css('.slide-container')
      );

      expect(elements.length).toEqual(5);
    });

    it('should increase currentIndex when click button action right', () => {
      component.currentIndex.set(3);

      const element: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.action-right')
      ).nativeElement;

      element.click();

      expect(component.currentIndex()).toEqual(4);
    });

    it('should decrease currentIndex when click button action left', () => {
      component.currentIndex.set(3);

      const element: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.action-left')
      ).nativeElement;

      element.click();

      expect(component.currentIndex()).toEqual(2);
    });
  });

  describe('Validate onPreviousClick method', () => {
    it('should decrease currentIndex', () => {
      component.currentIndex.set(0);

      component.onPreviousClick();
      expect(component.currentIndex()).toEqual(4);
    });
  });

  describe('Validate onNextClick method', () => {
    it('should increase currentIndex', () => {
      component.currentIndex.set(4);

      component.onNextClick();
      expect(component.currentIndex()).toEqual(0);
    });

    it('should emit values in intervals of time', fakeAsync( ()=> {
      expect(component.currentIndex()).toEqual(0);

      component.onNextClick();
      fixture.detectChanges();

      expect(component.currentIndex()).toEqual(1);

      tick(6000);
      fixture.detectChanges();

      expect(component.currentIndex()).toEqual(2);
      component.ngOnDestroy();
    }));
  });
});
