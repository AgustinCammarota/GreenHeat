import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate initialization properties', () => {
    it('should have a contact information property', () => {
      expect(component.contactInformation().length).toBe(3);
    });
  });

  describe('Validate dom elements', () => {
    it('should have "app-form" element', () => {
      const element = fixture.debugElement.query(By.css('app-form'));
      expect(element).toBeTruthy();
    });

    it('should have "app-information" element', () => {
      const element = fixture.debugElement.query(By.css('app-information'));
      expect(element).toBeTruthy();
    });

    it('should have ".author-section__text" element', () => {
      const element = fixture.debugElement.query(By.css('.author-section__text'));
      expect(element).toBeTruthy();
    });
  });
});
