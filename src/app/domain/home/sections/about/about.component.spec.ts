import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutComponent,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a carrousel images number', () => {
    expect(component.carrouselImagesNumber()).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]);
  });

  describe('Validate dom elements', () => {
    it('should have a "app-presentation" element', () => {
      const element = fixture.debugElement.query(By.css('app-presentation'));
      expect(element).toBeTruthy();
    });

    it('should have a "app-carousel" element', () => {
      const element = fixture.debugElement.query(By.css('app-carousel'));
      expect(element).toBeTruthy();
    });
  });
});
