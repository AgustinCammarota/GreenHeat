import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnalyticsService } from '@shared/services/analytics.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Form Component
 * @class
 */
export class FormComponent {
  /**
   * Validate if the button is disabled
   * @type {WritableSignal}
   * @default false
   * @private
   */
  disabledButton: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Inject instance of FormBuilder
   * @type {FormBuilder}
   * @default FormBuilder
   * @private
   */
  private formBuilder: FormBuilder = inject(FormBuilder);
  /**
   * Instance of AnalyticsService
   * @type {AnalyticsService}
   * @default AnalyticsService
   * @private
   */
  private analyticsService: AnalyticsService = inject(AnalyticsService);
  /**
   * Config of form email
   * @type {FormGroup}
   * @default FormGroup
   * @public
   */
  formEmail: FormGroup = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email ]],
    message: ['', [ Validators.required ]]
  });

  /**
   * Handler send email
   * @public
   */
  sendEmail(): void {
    this.formEmail.reset();
    if (this.formEmail.valid) {
      this.analyticsService.customEvent('on-click-contact-email');
      this.disabledButton.set(true);
    }
  }
}
