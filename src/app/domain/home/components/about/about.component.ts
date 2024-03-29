import {
  ChangeDetectionStrategy,
  Component,
  signal, WritableSignal
} from '@angular/core';
import { CarouselComponent } from '@home/components/carousel/carousel.component';
import { Carousel } from '@home/interfaces';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
      CarouselComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  /**
   * Array with carousel information
   * @type {WritableSignal}
   * @default []
   * @public
   */
  carousel: WritableSignal<Carousel[]> = signal<Carousel[]>([
    {
      base: './assets/images/carousel-image-one-small.webp',
      sizes: [
          './assets/images/carousel-image-one-small.webp 300w',
        './assets/images/carousel-image-one-medium.webp 600w',
        './assets/images/carousel-image-one-large.webp 900w',
      ],
      alt: $localize `:@@aboutCarouselImageOne:Primera imagen del carousel`
    },
    {
      base: './assets/images/carousel-image-two-small.webp',
      sizes: [
        './assets/images/carousel-image-two-small.webp 300w',
        './assets/images/carousel-image-two-medium.webp 600w',
        './assets/images/carousel-image-two-large.webp 900w',
      ],
      alt: $localize `:@@aboutCarouselImageTwo:Segunda imagen del carousel`
    },
    {
      base: './assets/images/carousel-image-one-small.webp',
      sizes: [
        './assets/images/carousel-image-one-small.webp 300w',
        './assets/images/carousel-image-one-medium.webp 600w',
        './assets/images/carousel-image-one-large.webp 900w',
      ],
      alt: $localize `:@@aboutCarouselImageOne:Primera imagen del carousel`
    }
  ]);
}
