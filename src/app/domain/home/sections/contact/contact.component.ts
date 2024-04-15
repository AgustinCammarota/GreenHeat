import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormComponent } from '@home/components/form/form.component';
import { InformationComponent } from '@home/components/information/information.component';

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
export class ContactComponent {

}
