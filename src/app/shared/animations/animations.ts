import { animate, animation, stagger, style } from '@angular/animations';

/**
 * Translate animation
 */
export const translateAnimation = animation([
  style({ opacity: 0, transform: 'translateX(100%)' }),
  animate('{{ time }}', style({ opacity: 1, transform: 'translateX(0)' }))
]);

/**
 * Fade in animation
 */
export const fadeIn = animation([
  style({ opacity: 0, transform: 'translateY(-50px)' }),
  stagger(200, [
    animate("{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        style({ opacity: 1, transform: 'none' }))
  ])
]);

/**
 * Fade out animation
 */
export const fadeOut = animation([
  style({ opacity: 1, transform: 'none' }),
  stagger(200, [
      animate("{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      style({ opacity: 0, transform: 'translateY(-50px)' }))
  ])
]);

/**
 * Fade in animation
 */
export const visibilityIn = animation([
  style({ visibility: 'hidden' }),
  animate("{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      style({ visibility: 'visible' })
  )
]);

/**
 * Fade out animation
 */
export const visibilityOut = animation([
  animate("{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      style({ visibility: 'hidden' })
  )
]);