import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Card } from '@home/interfaces';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  /**
   * Array with cards items
   * @type {WritableSignal}
   * @default []
   * @public
   */
  cards: WritableSignal<Card[]> = signal<Card[]>([
    {
      icon: './assets/svg/technology.svg',
      title: $localize `:@@titleCardOne:Tecnología`,
      description: $localize `:@@descriptionCardOne:Contamos con la última tecnología, domótica, solar, condensación, termorregulación y mucho más...`,
      altImg: $localize `:@@altImgCardOne:Tecnología`
    },
    {
      icon: './assets/svg/tools.svg',
      title: $localize `:@@titleCardTwo:Materiales`,
      description: $localize `:@@descriptionCardTwo:Usamos las mejores y más reconocidas marcas europeas, de esta manera brindamos un producto final de alta calidad.`,
      altImg: $localize `:@@altImgCardTwo:Materiales`
    },
    {
      icon: './assets/svg/education.svg',
      title: $localize `:@@titleCardThree:Formación`,
      description: $localize `:@@descriptionCardThree:Nuestros técnicos están altamente capacitados para tener una respuesta rápida a cada problema.`,
      altImg: $localize `:@@altImgCardThree:Formación`
    },
    {
      icon: './assets/svg/comment.svg',
      title: $localize `:@@titleCardFour:Asesoramiento`,
      description: $localize `:@@descriptionCardFour:Equipo de ventas técnicas a disposición de tu proyecto.`,
      altImg: $localize `:@@altImgCardFour:Asesoramiento`
    },
    {
      icon: './assets/svg/comment.svg',
      title: $localize `:@@titleCardFive:Planificación`,
      description: $localize `:@@descriptionCardFive:Tu obra de principio a fin. Materiales y mano de obra.`,
      altImg: $localize `:@@altImgCardFive:Planificación`
    },
    {
      icon: './assets/svg/finance.svg',
      title: $localize `:@@titleCardSix:Post Venta`,
      description: $localize `:@@descriptionCardSix:El mejor service y repuestos.`,
      altImg: $localize `:@@altImgCardSix:Post Venta`
    }
  ]);
}
