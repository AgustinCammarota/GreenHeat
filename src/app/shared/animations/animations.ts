import { animate, animation, style } from '@angular/animations';

/**
 * Translate animation
 */
export const translateAnimation = animation([
  style({ transform: 'translateX(100%)' }),
  animate('{{ time }}')
]);

/**
 * Fade in animation
 */
export const fadeIn = animation([
  style({ opacity: 0 }),
  animate(
      "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      style({ opacity: 1 })
  )
]);

/**
 * Fade out animation
 */
export const fadeOut = animation([
  animate(
      "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      style({ opacity: 0 })
  )
]);