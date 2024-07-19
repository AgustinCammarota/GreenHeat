import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    const title = signal('Green Heat');
    const subtitle = signal('Acclimatization');

    component.title = title as unknown as typeof fixture.componentInstance.title;
    component.subTitle = subtitle as unknown as typeof fixture.componentInstance.subTitle;
    fixture.detectChanges();
  });

  it('should create the TitleComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should have a title', () => {
      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.title-container__title'),
      ).nativeElement;

      expect(body).toBeTruthy();
      expect(body.textContent).toContain('Green Heat');
    });

    it('should have a subtitle', () => {
      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.title-container__subtitle'),
      ).nativeElement;

      expect(body).toBeTruthy();
      expect(body.textContent).toContain('Acclimatization');
    });

    it('should have a divider', () => {
      const body: HTMLParagraphElement = fixture.debugElement.query(
          By.css('.title-container__divider'),
      ).nativeElement;

      expect(body).toBeTruthy();
    });
  });
});
