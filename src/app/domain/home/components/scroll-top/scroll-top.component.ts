import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { Sections } from '@home/interfaces';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollTopComponent {
  /**
   * Emit event when scroll to top
   * @type {OutputEmitterRef}
   * @default OutputEmitterRef
   * @public
   */
  scrollToTop: OutputEmitterRef<string> = output<string>();
  /**
   * Validate if is visible the element
   * @type {InputSignal}
   * @default false
   * @public
   */
  isVisible: InputSignal<boolean> = input.required<boolean>();

  /**
   * Handle navigate to top page
   * @public
   */
  navigateToTop(): void {
    this.scrollToTop.emit(Sections.aboutSection);
  }
}
