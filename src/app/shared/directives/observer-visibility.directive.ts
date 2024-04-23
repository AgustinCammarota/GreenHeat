import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  OnDestroy, output,
  OutputEmitterRef,
} from '@angular/core';

@Directive({
  selector: '[appObserverVisibility]',
  standalone: true
})
/**
 * Observer Visibility Directive
 * @class
 */
export class ObserverVisibilityDirective implements OnDestroy {
  /**
   * Emit scrolled to top event
   * @type {OutputEmitterRef}
   * @default OutputEmitterRef
   * @public
   */
  scrolledToTop: OutputEmitterRef<boolean> = output<boolean>();
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

  constructor() {
    afterNextRender(() => {
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
