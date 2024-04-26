import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit } from '@angular/core';
import { AboutComponent } from '@home/sections/about/about.component';
import { ServicesComponent } from '@home/sections/services/services.component';
import { HeaderComponent } from '@home/sections/header/header.component';
import { ClientsComponent } from '@home/sections/clients/clients.component';
import { ContactComponent } from '@home/sections/contact/contact.component';
import { AnalyticsService } from '@shared/services/analytics.service';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    ClientsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Home Page
 * @class
 */
export class HomeComponent implements OnInit {
  /**
   * Instance of ElementRef
   * @type {ElementRef}
   * @default ElementRef
   * @private
   */
  private elementRef: ElementRef = inject(ElementRef);
  /**
   * Instance of AnalyticsService
   * @type {AnalyticsService}
   * @default AnalyticsService
   * @private
   */
  private analyticsService: AnalyticsService = inject(AnalyticsService);

  /**
   * Life cycle on init
   * @public
   */
  ngOnInit(): void {
    this.analyticsService.pageView('home-page');
  }

  /**
   * Handle scroll to element
   * @param {boolean} event
   * @public
   */
  scrollToElement(event: string): void {
    const element = this.elementRef.nativeElement.querySelector(`#${event}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
