import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
export class FormComponent {
  /**
   * Inject instance of FormBuilder
   * @type {FormBuilder}
   * @default FormBuilder
   * @private
   */
  private formBuilder: FormBuilder = inject(FormBuilder);
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
  }
}
