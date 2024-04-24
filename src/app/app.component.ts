import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Base Component
 * @class
 */
export class AppComponent implements OnInit {
  /**
   * Instance of Meta
   * @type {Meta}
   * @default Meta
   * @private
   */
  private meta: Meta = inject(Meta);
  /**
   * Instance of Meta
   * @type {Meta}
   * @default Meta
   * @private
   */
  private title: Title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle($localize `:@@appTitle:Green Heat Clima - Climatización Sustentable`);
    this.meta.addTags([
      { name: 'description', content: $localize `:@@appDescription:Somos Green Heat Clima, una empresa dedicada a la climatización amigable con el medio ambiente radicada en Argentina. Contamos con servicios de instalación, cotización y reparación de sistemas de calefacción / refrigeración.` },
      { name: 'keywords', content: $localize `:@@appKeywords:Green Heat Clima, Argentina, Reparaciones, Sistemas de refrigeración, Sistemas de calefacción, Instalaciones, Reparaciones, Cotizaciones, Climatización, Calderas, Heladeras, Aires Acondicionados, Calefacción, Termotanques, Calefones, Piso Radiante, Losa Radiante.` },
      { name: 'author', content:  $localize `:@@appAuthor:Agustin Cammarota Muti` },
      { name: 'publisher', content:  $localize `:@@appPublisher:Cammarota` },
      { name: 'robots', content:  $localize `:@@appRobots:index, follow` },
      { rel: 'canonical', href: $localize `:@@appCanonical:https://greenheatclima.com.ar` }
    ]);
  }
}
