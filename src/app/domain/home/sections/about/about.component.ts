import {
  ChangeDetectionStrategy,
  Component,
  signal, WritableSignal
} from '@angular/core';
import { CarouselComponent } from '@home/components/carousel/carousel.component';
import { PresentationComponent } from '@home/components/presentation/presentation.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CarouselComponent,
    PresentationComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * About Section
 * @class
 */
export class AboutComponent {
  /**
   * Array with number of carrousel images
   * @type {WritableSignal}
   * @default []
   * @public
   */
  carrouselImagesNumber: WritableSignal<number[]> = signal<number[]>(
      Array.from({ length: 16 }, (_, index: number) => index)
  );
}
