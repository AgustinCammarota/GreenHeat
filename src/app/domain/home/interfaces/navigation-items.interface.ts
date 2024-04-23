/**
 * Navigation items interface
 * @interface
 */
export interface NavigationItems {
  /**
   * Section
   * @type {Sections}
   */
  section: Sections;
  /**
   * Description
   * @type {string}
   */
  description: string
}

/**
 * Sections enum
 * @enum
 */
export enum Sections {
  /**
   * About section
   */
  aboutSection = 'aboutSection',
  /**
   * Service section
   */
  serviceSection = 'serviceSection',
  /**
   * Client section
   */
  clientSection = 'clientSection',
  /**
   * Contact section
   */
  contactSection = 'contactSection'
}