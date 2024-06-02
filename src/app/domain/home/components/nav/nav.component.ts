import {
  ChangeDetectionStrategy,
  Component, inject,
  input,
  InputSignal, output, OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { NavigationItems } from '@home/interfaces';
import { environment } from '@environments/environment';
import { visibilityIn, visibilityOut } from '@shared/animations/animations';
import { AnalyticsService } from '@shared/services/analytics.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openMenuTrigger', [
      state(
          'open',
          style({
            visibility: 'visible'
          }),
      ),
      state(
          'close',
          style({
            visibility: 'hidden'
          }),
      ),
      transition("close => open", [
        useAnimation(visibilityIn, { params: { time: "0.2s" } })
      ]),
      transition("open => close", [
        useAnimation(visibilityOut, { params: { time: "0.2s" } })
      ])
    ])
  ]
})
/**
 * Nav Component
 * @class
 */
export class NavComponent {
  /**
   * Emit navigation section
   * @type {OutputEmitterRef}
   * @default OutputEmitterRef
   * @public
   */
  navSection: OutputEmitterRef<string> = output<string>();
  /**
   * Array with nav items
   * @type {InputSignal}
   * @default []
   * @public
   */
  navItems: InputSignal<NavigationItems[]> = input.required<NavigationItems[]>()
  /**
   * Validate if is menu opened
   * @type {WritableSignal}
   * @default false
   * @public
   */
  isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Instance of AnalyticsService
   * @type {AnalyticsService}
   * @default AnalyticsService
   * @private
   */
  private analyticsService: AnalyticsService = inject(AnalyticsService);

  /**
   * Handle on click open menu
   * @public
   */
  openMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  /**
   * Handle navigation to element
   * @param {string} section
   * @public
   */
  navToElement(section: string): void {
    this.navSection.emit(section);
    this.isMenuOpen.set(false);
  }

  /**
   * Fire custom analytic
   * @public
   */
  fireAnalytic(): void {
    this.analyticsService.customEvent('on-click-contact-whatsapp');
  }

  /**
   * Return whatsapp URL
   * @public
   * @return {string}
   */
  get whatsappUrl(): string {
    return environment.whatsappUrl;
  }
}
