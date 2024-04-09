import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent {
  /**
   * Input title required
   * @type {InputSignal}
   * @default ''
   * @public
   */
  title: InputSignal<string> = input.required<string>();
  /**
   * Input subtitle required
   * @type {InputSignal}
   * @default ''
   * @public
   */
  subTitle: InputSignal<string> = input.required<string>();
}
