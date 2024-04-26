import { inject, Injectable } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  /**
   * Instance of google tag manager service
   * @type {GoogleTagManagerService}
   * @default GoogleTagManagerService
   * @private
   */
  private gtmService: GoogleTagManagerService = inject(GoogleTagManagerService);

  /**
   * Fire page view analytic
   * @param {string} pageName
   * @public
   */
  pageView(pageName: string): void {
    this.gtmService.pushTag({
      event: 'page-view',
      pageName
    }).then();
  };

  /**
   * Fire custom event analytic
   * @param {string} data
   * @public
   */
  customEvent(data: string): void {
    this.gtmService.pushTag({
      event: 'page-custom-event',
      data
    }).then();
  };
}
