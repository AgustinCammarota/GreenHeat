import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { AnalyticsService } from '@shared/services/analytics.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(async () => {
    const analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['customEvent']);
    await TestBed.configureTestingModule({
      imports: [
        FormComponent,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as jasmine.SpyObj<AnalyticsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validate form', () => {
    it('should have a form with two controls', () => {
      expect(component.formEmail.contains('message')).toBeTruthy();
      expect(component.formEmail.contains('email')).toBeTruthy();
    });

    it('should make the message control required', () => {
      const control = component.formEmail.get('message');
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
    });

    it('should make the email control required and check for email format', () => {
      const control = component.formEmail.get('email');
      control?.setValue('');
      expect(control?.valid).toBeFalsy();

      control?.setValue('notanemail');
      expect(control?.valid).toBeFalsy();

      control?.setValue('test@example.com');
      expect(control?.valid).toBeTruthy();
    });

    it('should call sendEmail method when form is submitted', () => {
      const spy = spyOn(component, 'sendEmail').and.stub();
      component.formEmail.setValue({ message: 'Random message', email: 'john@example.com' });
      const element: HTMLFormElement = fixture.debugElement.query(By.css('.form')).nativeElement;
      element.dispatchEvent(new Event('submit'));
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Method sendEmail', () => {
    it('should call the customEvent in analytics service when the form is valid', () => {
      component.formEmail.setValue({ message: 'Random message', email: 'john@example.com' });
      component.sendEmail();
      expect(analyticsService.customEvent).toHaveBeenCalledWith('on-click-contact-email');
    });

    it('should disabled the button when the form is valid', () => {
      const button: HTMLButtonElement = fixture.debugElement.query(By.css('.form__button')).nativeElement;
      expect(button.disabled).toBeFalsy();
      component.formEmail.setValue({ message: 'Random message', email: 'john@example.com' });
      component.sendEmail();
      fixture.detectChanges();
      expect(button.disabled).toBeTruthy();
    });

    it('should reset the form', () => {
      component.formEmail.setValue({ message: 'Random message', email: 'baa' });
      component.sendEmail();
      expect(component.formEmail.get('message')?.value).toBeNull();
      expect(component.formEmail.get('email')?.value).toBeNull();
    });
  });
});
