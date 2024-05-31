import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('validate number of slides in the carousel', () => {
    const elements = fixture.debugElement.queryAll(
        By.css('.slide-container')
    );

    expect(elements.length).toEqual(5);
  });

  it('validate click on button action right', () => {
    component.currentIndex.set(3);

    const element: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.action-right')
    ).nativeElement;

    element.click();

    expect(component.currentIndex()).toEqual(4);
  });

  it('validate click on button action left', () => {
    component.currentIndex.set(3);

    const element: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.action-left')
    ).nativeElement;

    element.click();

    expect(component.currentIndex()).toEqual(2);
  });

  it('validate onPreviousClick method', () => {
    component.currentIndex.set(0);

    component.onPreviousClick();
    expect(component.currentIndex()).toEqual(4);
  });

  it('validate onNextClick method', () => {
    component.currentIndex.set(4);

    component.onNextClick();
    expect(component.currentIndex()).toEqual(0);
  });
});
