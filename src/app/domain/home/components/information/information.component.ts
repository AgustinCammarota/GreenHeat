import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { query, transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from '@shared/animations/animations';
import { Information } from '@home/interfaces';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contactAnimation', [
      transition(':enter', [
        query('.information-link', [
          useAnimation(fadeIn, { params: { time: "1s" } })
        ])
      ]),
      transition(':leave', [
        query('.information-link', [
          useAnimation(fadeOut, { params: { time: "500ms" } })
        ])
      ])
    ])
  ]
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
