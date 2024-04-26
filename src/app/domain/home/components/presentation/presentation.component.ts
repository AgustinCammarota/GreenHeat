import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environment } from '@environments/environment.development';
import { AnalyticsService } from '@shared/services/analytics.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Presentation Component
 * @class
 */
export class PresentationComponent {
  /**
   * Instance of AnalyticsService
   * @type {AnalyticsService}
   * @default AnalyticsService
   * @private
   */
  private analyticsService: AnalyticsService = inject(AnalyticsService);

  /**
   * Return whatsapp URL
   * @public
   * @return {string}
   */
  get whatsappUrl(): string {
    return environment.whatsappUrl;
  }

  /**
   * Fire custom analytic
   * @public
   */
  fireAnalytic(): void {
    this.analyticsService.customEvent('on-click-contact-whatsapp');
  }
}
