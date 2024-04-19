import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { PresentationComponent } from '@home/components/presentation/presentation.component';
import { BrandComponent } from '@home/components/brand/brand.component';
import { Brand, Presentation } from '@home/interfaces';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    PresentationComponent,
    BrandComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {
  /**
   * Presentation information
   * @type {WritableSignal}
   * @default {}
   * @public
   */
  presentation: WritableSignal<Presentation> = signal<Presentation>({
    title: $localize`:@@clientTitle:Las mejores marcas`,
    subTitle: $localize`:@@clientSubtitle:Trabajamos con`
  });
  /**
   * Brands card information
   * @type {WritableSignal}
   * @default []
   * @public
   */
  brands: WritableSignal<Brand[]> = signal<Brand[]>([
    {
      description: $localize`:@@brandTitleOne:Ariston`,
      altImg: $localize `:@@brandAltImgOne:Ariston`,
      icon: '/green-heat/ariston.svg',
    },
    {
      description: $localize`:@@brandTitleTwo:Baxi`,
      altImg: $localize `:@@brandAltImgTwo:Baxi`,
      icon: '/green-heat/baxi.svg',
    },
    {
      description: $localize`:@@brandTitleThree:Giacomini`,
      altImg: $localize `:@@brandAltImgThree:Giacomini`,
      icon: '/green-heat/giacomini.svg',
    },
    {
      description: $localize`:@@brandTitleFour:Peisa`,
      altImg: $localize `:@@brandAltImgFour:Peisa`,
      icon: '/green-heat/peisa.svg',
    },
    {
      description: $localize`:@@brandTitleFive:Triangular`,
      altImg: $localize `:@@brandAltImgFive:Triangular`,
      icon: '/green-heat/triangular.svg',
    },
    {
      description: $localize`:@@brandTitleSix:Wilo`,
      altImg: $localize `:@@brandAltImgSix:Wilo`,
      icon: '/green-heat/wilo.svg',
    }
  ]);
}
