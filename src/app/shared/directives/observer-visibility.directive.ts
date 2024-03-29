import {
  afterNextRender,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Directive({
  selector: '[appObserverVisibility]',
  standalone: true
})
export class ObserverVisibilityDirective implements OnDestroy {
  /**
   * Emit scrolled to top event
   * @type {EventEmitter}
   * @default EventEmitter
   * @public
   */
  @Output() scrolledToTop: EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * Instance of intersection observer
   * @type {IntersectionObserver}
   * @default null
   * @private
   */
  private intersectionObserver: IntersectionObserver | null = null;
  /**
   * Instance of element ref
   * @type {ElementRef}
   * @default ElementRef
   * @private
   */
  private elementRef: ElementRef = inject(ElementRef);
  /**
   * Instance of device detector service
   * @type {DeviceDetectorService}
   * @default DeviceDetectorService
   * @private
   */
  private deviceDetectorService: DeviceDetectorService = inject(DeviceDetectorService);

  constructor() {
    afterNextRender(() => {
      // If it is a mobile or tablet device not do anything.
      if (this.deviceDetectorService.isMobile() || this.deviceDetectorService.isTablet()) {
        this.scrolledToTop.emit(false);
        return;
      }

      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      };

      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.scrolledToTop.emit(entry.isIntersecting);
      }, options);

      this.intersectionObserver.observe(this.elementRef.nativeElement);
    });
  }

  /**
   * Life cycle on destroy
   * @public
   */
  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
  }
}
