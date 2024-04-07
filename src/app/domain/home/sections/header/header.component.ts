import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ObserverVisibilityDirective } from '@shared/directives/observer-visibility.directive';
import { ObserverDeviceDirective } from '@shared/directives/observer-device.directive';
import { NavigationItems, Sections } from '@home/interfaces';
import { NavComponent } from '@home/components/nav/nav.component';
import { ScrollTopComponent } from '@home/components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ObserverVisibilityDirective,
    ObserverDeviceDirective,
    NavComponent,
    ScrollTopComponent
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
    ])
  ]
})
export class HeaderComponent {
  /**
   * Emit navigation section
   * @type {OutputEmitterRef}
   * @default OutputEmitterRef
   * @public
   */
  navigation: OutputEmitterRef<string> = output<string>();
  /**
   * Validate if is header maximized
   * @type {WritableSignal}
   * @default false
   * @public
   */
  isMaximize: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Validate if is visible scroll to top
   * @type {WritableSignal}
   * @default false
   * @public
   */
  isVisibleScrollToTop: WritableSignal<boolean> = signal<boolean>(false);
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
  listItemNavigation: WritableSignal<NavigationItems[]> = signal<NavigationItems[]>([
    {
      description: $localize `:@@linkHeaderAbout:Nosotros`,
      section: Sections.aboutSection
    },
    {
      description: $localize `:@@linkHeaderServices:Servicios`,
      section: Sections.serviceSection
    },
    {
      description: $localize `:@@linkHeaderClients:Clientes`,
      section: Sections.clientSection
    },
    {
      description: $localize `:@@linkHeaderContact:Contacto`,
      section: Sections.contactSection
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
    this.isVisibleScrollToTop.set(!event);
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
   * Handle navigation to element
   * @param {string} event
   * @public
   */
  handlerNavigation(event: string): void {
    this.navigation.emit(event);
  }
}
