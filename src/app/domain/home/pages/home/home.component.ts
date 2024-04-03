import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { HeaderComponent } from '@home/components/header/header.component';
import { ObserverVisibilityDirective } from '@shared/directives/observer-visibility.directive';
import { AboutComponent } from '@home/components/about/about.component';
import { ServicesComponent } from '@home/components/services/services.component';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    ObserverVisibilityDirective,
    AboutComponent,
    ServicesComponent
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  /**
   * Instance of ElementRef
   * @type {ElementRef}
   * @default ElementRef
   * @private
   */
  private elementRef: ElementRef = inject(ElementRef);

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
}
