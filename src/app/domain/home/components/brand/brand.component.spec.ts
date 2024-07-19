import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandComponent } from './brand.component';
import { signal } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          BrandComponent,
          BrowserAnimationsModule
      ]
    })
    .compileComponents();

    const brands = signal([
      {
        description: 'Ariston',
        altImg: 'Ariston',
        icon: '/green-heat/ariston.svg',
      },
      {
        description: 'Baxi',
        altImg: 'Baxi',
        icon: '/green-heat/baxi.svg',
      }
    ]);
    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    component.brands = brands as unknown as typeof fixture.componentInstance.brands;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should have two card ele', () => {
      const elements = fixture.debugElement.queryAll(By.css('.brand'));
      expect(elements.length).toBe(2);
    });
  });
});
