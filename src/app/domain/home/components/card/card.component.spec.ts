import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
          CardComponent,
          BrowserAnimationsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    const cards = signal([
      {
        icon: '/green-heat/technology.svg',
        title: 'Technology',
        description: 'Technology',
        altImg: 'Technology',
      },
      {
        icon: '/green-heat/tools.svg',
        title: 'Tools',
        description: 'Tools',
        altImg: 'Tools'
      },
    ]);
    component.cards = cards as unknown as typeof fixture.componentInstance.cards;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate dom elements', () => {
    it('should have two card ele', () => {
      const elements = fixture.debugElement.queryAll(By.css('.card'));
      expect(elements.length).toBe(2);
    });
  });
});
