import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { FormComponent } from '@home/components/form/form.component';
import { InformationComponent } from '@home/components/information/information.component';
import { Information } from '@home/interfaces';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormComponent,
    InformationComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Contact Section
 * @class
 */
export class ContactComponent {
  /**
   * Array with contact information
   * @type WritableSignal<Information[]>
   * @default []
   * @public
   */
  contactInformation: WritableSignal<Information[]> = signal<Information[]>([
    {
      href: environment.whatsappUrl,
      image: '/green-heat/whatsapp.svg',
      altImage: $localize`:@@informationIconWhatsappAlt:Whatsapp`,
      text: $localize`:@@informationWhatsappText:+54 9 11 6218-8835`,
    },
    {
      href: environment.instagramUrl,
      image: '/green-heat/instagram.svg',
      altImage: $localize`:@@informationIconInstagramAlt:Instagram`,
      text: $localize`:@@informationInstagramText:@greenheatclima`,
    },
    {
      href: environment.gmailUrl,
      image: '/green-heat/mail.svg',
      altImage: $localize`:@@informationIconMailAlt:Email`,
      text: $localize`:@@informationMailText:infoghclima@gmail.com`,
    }
  ]);
}
