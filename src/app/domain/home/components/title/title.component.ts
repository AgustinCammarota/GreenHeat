import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
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
