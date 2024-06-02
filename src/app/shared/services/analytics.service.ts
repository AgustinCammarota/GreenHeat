import { inject, Injectable } from '@angular/core';
import { WindowsReferenceService } from '@shared/services/windows-reference.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  /**
   * Instance of windows reference service
   * @type {WindowsReferenceService}
   * @default WindowsReferenceService
   * @private
   */
  private window: WindowsReferenceService = inject(WindowsReferenceService);

  /**
   * Fire page view analytic
   * @param {string} pageName
   * @public
   */
  pageView(pageName: string): void {
    if (!this.window?.nativeWindow?.dataLayer) return;
    this.window.nativeWindow.dataLayer.push({
      event: 'page-view',
      pageName
    });
  }

  /**
   * Fire custom event analytic
   * @param {string} data
   * @public
   */
  customEvent(data: string): void {
    if (!this.window?.nativeWindow?.dataLayer) return;
    this.window.nativeWindow.dataLayer.push({
      event: 'page-custom-event',
      data
    });
  }
}
