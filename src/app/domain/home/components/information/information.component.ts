import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Information } from '@home/interfaces';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Information Component
 * @class
 */
export class InformationComponent {
  /**
   * Array with information items
   * @type InputSignal<Information[]>
   * @default []
   * @public
   */
  informationItems: InputSignal<Information[]> = input.required<Information[]>();
}
