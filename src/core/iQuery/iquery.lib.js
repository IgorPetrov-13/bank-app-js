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
   * Append a child element to the current element
   * @param {HTMLElement} childElement The element to append
   * @returns {IQuery} A new IQuery instance
   */
  append(childElement) {
    this.element.appendChild(childElement);
    return this;
  }

  /**
   * Remove child element from the current element
   * @param {HTMLElement} childElement The element to remove
   * @returns {IQuery} A new IQuery instance
   */
  remove(childElement) {
    if (!(childElement instanceof HTMLElement)) {
      throw new Error('Invalid child element');
    }
    this.element.removeChild(childElement);
    return this;
  }

  /**
   * Insert a child element before the current element
   * @param {HTMLElement} childElement The element to insert
   * @returns {IQuery} A new IQuery instance
   */
  before(childElement) {
    if (!(childElement instanceof HTMLElement)) {
      throw new Error('Invalid child element');
    }
    this.element.before(childElement);
    return this;
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
