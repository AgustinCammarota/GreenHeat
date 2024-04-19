import {
  ChangeDetectionStrategy,
  Component,
  signal, WritableSignal
} from '@angular/core';
import { CarouselComponent } from '@home/components/carousel/carousel.component';
import { environment } from '@environments/environment.development';

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
   * Array with number of carrousel images
   * @type {WritableSignal}
   * @default []
   * @public
   */
  carrouselImagesNumber: WritableSignal<number[]> = signal<number[]>(
      Array.from({ length: 16 }, (_, index: number) => index)
  );

  /**
   * Return whatsapp URL
   * @public
   * @return {string}
   */
  get whatsappUrl(): string {
    return environment.whatsappUrl;
  }
}
