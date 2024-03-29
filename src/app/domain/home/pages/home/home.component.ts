import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '@home/components/header/header.component';
import { ObserverVisibilityDirective } from '@shared/directives/observer-visibility.directive';
import { AboutComponent } from '@home/components/about/about.component';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    ObserverVisibilityDirective,
    AboutComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
