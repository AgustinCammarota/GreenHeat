import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { query, transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from '@shared/animations/animations';
import { environment } from '@environments/environment.development';

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
export class InformationComponent {
  /**
   * Return whatsapp URL
   * @public
   * @return {string}
   */
  get whatsappUrl(): string {
    return environment.whatsappUrl;
  }

  /**
   * Return instagram URL
   * @public
   * @return {string}
   */
  get instagramUrl(): string {
    return environment.instagramUrl;
  }

  /**
   * Return gmail URL
   * @public
   * @return {string}
   */
  get gmailUrl(): string {
    return environment.gmailUrl;
  }
}
