import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent {
  /**
   * Return whatsapp URL
   * @public
   * @return {string}
   */
  get whatsappUrl(): string {
    return environment.whatsappUrl;
  }
}
