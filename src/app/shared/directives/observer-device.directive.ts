import { afterNextRender, Directive, inject, OnDestroy, output, OutputEmitterRef } from '@angular/core';
import { DeviceDetectorService } from "ngx-device-detector";

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
   * Instance of device detector service
   * @type {DeviceDetectorService}
   * @default DeviceDetectorService
   * @private
   */
  private deviceDetectorService: DeviceDetectorService = inject(DeviceDetectorService);
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
      if (this.deviceDetectorService.isMobile() || this.deviceDetectorService.isTablet()) {
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
   * Life cycle on destroy
   * @public
   */
  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
