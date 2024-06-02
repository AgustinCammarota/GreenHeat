/**
 * ICustomWindow interface
 * @interface
 */
export interface ICustomWindow extends Window {
  /**
   * DataLayer
   * @type {DataLayer}
   */
  dataLayer: DataLayer[];
}

/**
 * ICustomWindow interface
 * @interface
 */
export interface DataLayer {
  /**
   * Event
   * @type {String}
   */
  event: string;
  /**
   * Page name
   * @type {String}
   */
  pageName?: string;
  /**
   * Data
   * @type {String}
   */
  data?: string;
}