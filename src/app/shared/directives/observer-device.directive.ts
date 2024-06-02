import { afterNextRender, Directive, OnDestroy, output, OutputEmitterRef } from '@angular/core';

@Directive({
  selector: '[appObserverDevice]',
  standalone: true
})
/**
 * Observer Device Directive
 * @class
 */
export class ObserverDeviceDirective implements OnDestroy {
  /**
   * Determinate if device is mobile / tablet
   * @type {OutputEmitterRef}
   * @default OutputEmitterRef
   * @public
   */
  mobileDeviceDetermined: OutputEmitterRef<boolean> = output<boolean>();
  /**
   * Instance of resize observer
   * @type {ResizeObserver}
   * @default null
   * @private
   */
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => {
      // If it is a mobile or tablet device not do anything.
      if (this.isMobileUserAgent() || this.isTabletUserAgent()) {
        this.mobileDeviceDetermined.emit(true);
        return;
      }

      this.resizeObserver = new ResizeObserver(entries => {
        const entry = entries[0];
        const { width } = entry.contentRect;

        if (width <= 900) {
          this.mobileDeviceDetermined.emit(true);
        } else {
          this.mobileDeviceDetermined.emit(false);
        }
      });

      this.resizeObserver.observe(document.documentElement);
    });
  }

  /**
   * Validate is mobile user agent
   * @private
   * @return boolean
   */
  private isMobileUserAgent(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor || '';
    return (/android/i.test(userAgent)) || (/iPhone|iPod/i.test(userAgent));
  }

  /**
   * Validate is tablet user agent
   * @private
   * @return boolean
   */
  private isTabletUserAgent(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor || '';
    return (/iPad/i.test(userAgent)) || (/(android)/i.test(userAgent));
  }

  /**
   * Life cycle on destroy
   * @public
   */
  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
