import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Information } from '@home/interfaces';
import { AnalyticsService } from '@shared/services/analytics.service';

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
  /**
   * Instance of AnalyticsService
   * @type {AnalyticsService}
   * @default AnalyticsService
   * @private
   */
  private analyticsService: AnalyticsService = inject(AnalyticsService);

  /**
   * Fire custom analytic
   * @param {string} event
   * @public
   */
  fireAnalytic(event: string): void {
    this.analyticsService.customEvent(`on-click-contact-${event.toLowerCase()}`);
  }
}
