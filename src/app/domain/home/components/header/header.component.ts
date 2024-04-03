import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter, inject, Output,
  signal,
  WritableSignal
} from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common'
import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { ObserverVisibilityDirective } from '@shared/directives/observer-visibility.directive';
import { ObserverDeviceDirective } from '@shared/directives/observer-device.directive';
import { Navigation } from '@home/interfaces';
import { environment } from '@environments/environment.development'
import { visibilityIn, visibilityOut } from '@shared/animations/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ObserverVisibilityDirective,
    ObserverDeviceDirective,
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('scrollTrigger', [
      state(
          'minimize',
          style({
            transform: 'translate(-50%, 48px)',
            padding: '0px 3%'
          }),
      ),
      state(
          'maximize',
          style({
            transform: 'translate(-50%, 0px)',
            padding: '0px'
          }),
      ),
      transition('minimize => maximize', [animate('0.3s ease-in')]),
      transition('maximize => minimize', [animate('0.3s ease-in')]),
    ]),
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
export class HeaderComponent {
  /**
   * Emit navigation section
   * @type {EventEmitter}
   * @default EventEmitter
   * @public
   */
  @Output() navSection: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Validate if is header maximized
   * @type {WritableSignal}
   * @default false
   * @public
   */
  isMaximize: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Validate if is menu opened
   * @type {WritableSignal}
   * @default false
   * @public
   */
  isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Validate if is menu opened
   * @type {WritableSignal}
   * @default false
   * @public
   */
  isMobileDevice: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Array with navigation items
   * @type {WritableSignal}
   * @default []
   * @public
   */
  listItemNavigation: WritableSignal<Navigation[]> = signal<Navigation[]>([
    {
      description: $localize `:@@linkHeaderAbout:Nosotros`,
      link: 'aboutSection'
    },
    {
      description: $localize `:@@linkHeaderServices:Servicios`,
      link: 'serviceSection'
    },
    {
      description: $localize `:@@linkHeaderClients:Clientes`,
      link: 'clientSection'
    },
    {
      description: $localize `:@@linkHeaderContact:Contacto`,
      link: 'contactSection'
    }
  ]);
  /**
   * Instance of ChangeDetectorRef
   * @type {ChangeDetectorRef}
   * @default ChangeDetectorRef
   * @private
   */
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  /**
   * Handle scroll event
   * @param {boolean} event
   * @public
   */
  handleScroll(event: boolean): void {
    this.isMaximize.set(event);
    this.cdr.detectChanges();
  }

  /**
   * Handle device viewport event
   * @param {boolean} event
   * @public
   */
  handleDevice(event: boolean) {
    this.isMobileDevice.set(event);
    this.cdr.detectChanges();
  }

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
