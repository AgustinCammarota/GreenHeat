import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit } from '@angular/core';
import { AboutComponent } from '@home/sections/about/about.component';
import { ServicesComponent } from '@home/sections/services/services.component';
import { HeaderComponent } from '@home/sections/header/header.component';
import { ClientsComponent } from '@home/sections/clients/clients.component';
import { ContactComponent } from '@home/sections/contact/contact.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    ClientsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  /**
   * Instance of ElementRef
   * @type {ElementRef}
   * @default ElementRef
   * @private
   */
  private elementRef: ElementRef = inject(ElementRef);
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

  /**
   * Handle scroll to element
   * @param {boolean} event
   * @public
   */
  scrollToElement(event: string): void {
    const element = this.elementRef.nativeElement.querySelector(`#${event}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Life cycle on init
   * @public
   */
  ngOnInit(): void {
    this.title.setTitle($localize `:@@appTitle:GreenHeatClima`);
    this.meta.updateTag({
      name: 'description', content: $localize `:@@appDescription:Somos una empresa dedicada a la climatización amigable con el medio ambiente radicada en Argentina.`
    });
    this.meta.updateTag({
      name: 'keywords', content: $localize `:@@appKeywords:Green Heat Clima, Argentina, Reparaciones, Sistemas de refrigeración, Sistemas de calefacción, Instalaciones, Cotizaciones, Climatización, Calderas, Heladeras, Aires Acondicionados, Calefacción, Termotanques, Calefones, Piso Radiante, Losa Radiante.`
    });
  }
}
