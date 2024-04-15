import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { query, transition, trigger, useAnimation } from '@angular/animations';
import { NgOptimizedImage } from '@angular/common';
import { Card } from '@home/interfaces';
import { fadeIn, fadeOut } from '@shared/animations/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('.card', [
          useAnimation(fadeIn, { params: { time: "800ms" } })
        ])
      ]),
      transition(':leave', [
        query('.card', [
          useAnimation(fadeOut, { params: { time: "500ms" } })
        ])
      ])
    ])
  ]
})
export class CardComponent {
  /**
   * Array with cards items
   * @type {InputSignal}
   * @default []
   * @public
   */
  cards: InputSignal<Card[]> = input.required<Card[]>();
}
