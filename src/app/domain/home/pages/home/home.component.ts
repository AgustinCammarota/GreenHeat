import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { AboutComponent } from '@home/sections/about/about.component';
import { ServicesComponent } from '@home/sections/services/services.component';
import { HeaderComponent } from '@home/sections/header/header.component';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
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
