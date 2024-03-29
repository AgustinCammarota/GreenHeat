import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, inject,
  input,
  InputSignal, OnDestroy,
  signal,
  WritableSignal
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Carousel } from '@home/interfaces';
import { translateAnimation } from '@shared/animations/animations';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideAnimation', [
      transition('* <=> *', [
        useAnimation(translateAnimation, { params: { time: '0.5s ease-in-out' } })
      ])
    ])
  ]
})
export class CarouselComponent implements OnDestroy {
  /**
   * Array with carousel information
   * @type {InputSignal}
   * @default []
   * @public
   */
  slides:InputSignal<Carousel[]> = input.required<Carousel[]>();
  /**
   * Carousel current index
   * @type {WritableSignal}
   * @default 0
   * @public
   */
  currentIndex: WritableSignal<number> = signal<number>(0);
  /**
   * Subscription of interval observer
   * @type {Subscription}
   * @default null
   * @private
   */
  private interval$: Subscription | null = null;
  /**
   * Instance of ChangeDetectorRef
   * @type {ChangeDetectorRef}
   * @default ChangeDetectorRef
   * @private
   */
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    afterNextRender(() => {
      this.startInterval();
    });
  }

  /**
   * Life cycle on destroy
   */
  ngOnDestroy(): void {
    this.endInterval();
  }

  /**
   * Handler previous slide
   * @public
   */
  onPreviousClick() {
    this.endInterval();
    const previous = this.currentIndex() - 1;
    this.currentIndex.set(previous < 0 ? this.slides().length - 1 : previous);
    this.startInterval();
  }

  /**
   * Handler next slide
   * @public
   */
  onNextClick() {
    this.endInterval();
    const next = this.currentIndex() + 1;
    this.currentIndex.set( next === this.slides().length ? 0 : next);
    this.startInterval();
  }

  /**
   * Start interval observer to change slide
   * @private
   */
  private startInterval(): void {
    this.interval$ = interval(6000).subscribe(() => {
      this.currentIndex.update(value => (value + 1) % this.slides().length);
      this.cdr.detectChanges();
    });
  }

  /**
   * End interval observer
   * @private
   */
  private endInterval(): void {
    this.interval$?.unsubscribe();
  }
}
