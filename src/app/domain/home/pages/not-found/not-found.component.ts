import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '@shared/services/analytics.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  /**
   * Instance of AnalyticsService
   * @type {AnalyticsService}
   * @default AnalyticsService
   * @private
   */
  private analyticsService: AnalyticsService = inject(AnalyticsService);

  ngOnInit(): void {
    this.analyticsService.pageView('error-page');
  }
}
