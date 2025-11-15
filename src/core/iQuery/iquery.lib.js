/**
 *  IQuery library
 */
class IQuery {
  /**
   * Create a new IQuery instance
   * @param {string | HTMLElement} selector
   */
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector);

      if (!this.element) {
        throw new Error(`Element ${selector} not found`);
      }
    } else if (selector instanceof HTMLElement) {
      this.element = selector;
    } else {
      throw new Error('Invalid selector type');
    }
  }

  /**
   * Find method
   * @param {string} selector
   * @returns {IQuery} A new IQuery instance
   */
  find(selector) {
    const element = new IQuery(this.element.querySelector(selector));
    if (element) {
      return element;
    } else {
      throw new Error(`Element ${selector} not found`);
    }
  }

  /**
   * Set CSS style
   * @param {string} property
   * @param {string} value
   * @returns {IQuery} A new IQuery instance
   */
  css(property, value) {
    if (typeof property !== 'string' || typeof value !== 'string') {
      throw new Error(`Property and value must be string`);
    }

    this.element.style[property] = value;
    return this;
  }
}

export function $I(selector) {
  return new IQuery(selector);
}
