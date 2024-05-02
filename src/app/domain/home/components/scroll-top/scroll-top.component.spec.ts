import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ScrollTopComponent } from './scroll-top.component';

describe('ScrollTopComponent', () => {
  let component: ScrollTopComponent;
  let fixture: ComponentFixture<ScrollTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollTopComponent);
    component = fixture.componentInstance;
    const isVisible = signal(true);
    component.isVisible = isVisible as unknown as typeof fixture.componentInstance.isVisible;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate visible class', () => {
    const element: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.scroll-top-container')
    ).nativeElement;

    expect(element.getAttribute('class')).toContain('visible');
  });

  it('validate click on scroll top button', () => {
    component.scrollToTop.subscribe((value: string) => {
      expect(value).toEqual('aboutSection');
    });

    const element: HTMLParagraphElement = fixture.debugElement.query(
        By.css('.scroll-top-button')
    ).nativeElement;

    element.click();
  });

  it('Validate navigateToTop method', () => {
    component.scrollToTop.subscribe((value: string) => {
      expect(value).toEqual('aboutSection');
    });

    component.navigateToTop();
  });
});
