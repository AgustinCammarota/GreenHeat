import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { query, transition, trigger, useAnimation } from '@angular/animations';
import { NgOptimizedImage } from '@angular/common';
import { Brand } from '@home/interfaces';
import { fadeIn, fadeOut } from '@shared/animations/animations';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('brandAnimation', [
      transition(':enter', [
        query('.brand', [
          useAnimation(fadeIn, { params: { time: "800ms" } })
        ])
      ]),
      transition(':leave', [
        query('.brand', [
          useAnimation(fadeOut, { params: { time: "500ms" } })
        ])
      ])
    ])
  ]
})
/**
 * Brand Component
 * @class
 */
export class BrandComponent {
  /**
   * Brands card information
   * @type {InputSignal}
   * @default []
   * @public
   */
  brands: InputSignal<Brand[]> = input.required<Brand[]>();
}
