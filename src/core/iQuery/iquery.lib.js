import { formatCardNumber } from '@/utils/format/format-card-number';

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
   * @param {HTMLElement} newElement The element to insert
   * @returns {IQuery} A new IQuery instance
   */
  before(newElement) {
    if (!(newElement instanceof HTMLElement)) {
      throw new Error('Invalid child element');
    }

    const parentElement = this.element.parentElement;
    if (parentElement) {
      parentElement.insertBefore(newElement, this.element);
      return this;
    } else {
      throw new Error('Element does not have a parent element');
    }
  }

  /**
   * Get or set the HTML content of the element
   * @param {string} [htmlContent] The HTML content to set
   * @returns {IQuery} A new IQuery instance
   */
  html(htmlContent) {
    if (typeof htmlContent === 'undefined') {
      return this.element.innerHTML;
    } else {
      this.element.innerHTML = htmlContent;
      return this;
    }
  }

  /**
   * Attach a click event listener to the element
   * @param {function} callback The callback to call when the element is clicked
   * @returns {IQuery} A new IQuery instance
   */
  click(callback) {
    this.element.addEventListener('click', callback);
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

  /**
   * Add CSS classes to the element
   * @param {string | string[]} classNames The CSS class(es) to add
   * @returns {IQuery} A new IQuery instance
   */
  addClass(classNames) {
    if (typeof classNames === 'string') {
      this.element.classList.add(classNames);
    } else if (Array.isArray(classNames)) {
      this.element.classList.add(...classNames);
    } else {
      throw new Error('classNames must be a string or an array');
    }
    return this;
  }

  /**
   * Remove CSS classes from the element
   * @param {string | string[]} classNames The CSS class(es) to remove
   * @returns {IQuery} A new IQuery instance
   */
  removeClass(classNames) {
    if (typeof classNames === 'string') {
      this.element.classList.remove(classNames);
    } else if (Array.isArray(classNames)) {
      for (const className of classNames) {
        this.element.classList.remove(className);
      }
    } else {
      throw new Error('classNames must be a string or an array');
    }
    return this;
  }

  // FORM

  /**
   * Set attributes and event listeners on an input element
   * @param {function} onInput The callback to call when the input element is changed
   * @param {object} rest The attributes to set on the input element
   * @returns {IQuery} A new IQuery instance
   */
  input({ onInput, ...rest }) {
    if (this.element.tagName.toLowerCase() !== 'input') {
      throw new Error('Element is not an input');
    }

    for (const [key, value] of Object.entries(rest)) {
      this.element.setAttribute(key, value);
    }
    if (onInput) {
      this.element.addEventListener('input', onInput);
    }
    return this;
  }

  /**
   * Set a limit on a number input element
   * @param {number} limit The maximum number of characters to allow in the input
   * @returns {IQuery} A new IQuery instance
   * @throws {Error} If the element is not an input or not a number input
   */
  numberLimit(limit) {
    if (this.element.tagName.toLowerCase() !== 'input') {
      throw new Error('Element is not an input');
    }
    if (this.element.type !== 'number') {
      throw new Error('Element is not a number input');
    }

    this.element.addEventListener('input', (event) => {
      const value = event.target.value.replace(/[^0-9]/g, '');
      if (limit) {
        event.target.value = value.slice(0, limit);
      }
    });
    return this;
  }

  /**
   * Format the input value as a credit card number
   * @param {number} limit The maximum number of characters to allow in the input
   * @returns {IQuery} A new IQuery instance
   * @throws {Error} If the element is not an input or not a text input
   */
  creditCardInput() {
    const limit = 16;
    if (this.element.tagName.toLowerCase() !== 'input') {
      throw new Error('Element is not an input');
    }
    if (this.element.type !== 'text') {
      throw new Error('Element is not a text input');
    }

    this.element.addEventListener('input', (event) => {
      const value = event.target.value.replace(/[^0-9]/g, '');
      if (limit) {
        value = value.slice(0, limit);
      }
      event.target.value = formatCardNumber(value);
    });
    return this;
  }
}

export function $I(selector) {
  return new IQuery(selector);
}
