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
      this.emitMobileDevice();
    });
  }

  /**
   * Life cycle on destroy
   * @public
   */
  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  /**
   * Emit mobile device
   * @private
   */
  private emitMobileDevice(): void {
    this.validateMobileDevice();
    this.resizeObserver = new ResizeObserver(entries => this.validateEntries(entries));
    this.resizeObserver.observe(document.documentElement);
  }

  /**
   * Validate entries
   * @private
   * @param {ResizeObserverEntry[]} entries
   */
  private validateEntries(entries: ResizeObserverEntry[]) {
    const entry = entries[0];
    const { width } = entry.contentRect;

    if (width <= 900) {
      this.mobileDeviceDetermined.emit(true);
    } else {
      this.mobileDeviceDetermined.emit(false);
    }
  }

  /**
   * Validate mobile device
   * @private
   */
  private validateMobileDevice() {
    // If it is a mobile or tablet device not do anything.
    if (this.isMobileUserAgent()) {
      this.mobileDeviceDetermined.emit(true);
      return;
    }
  }

  /**
   * Validate is mobile user agent
   * @private
   * @return boolean
   */
  private isMobileUserAgent(): boolean {
    const userAgent = navigator.userAgent || navigator.vendor;
    return (/iPhone|iPod|iPad|android/i.test(userAgent));
  }
}
