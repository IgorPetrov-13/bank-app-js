import { getTitle } from '@/config/seo.config';

export class BaseScreen {
  /**
   * @param {Object} options
   * @param {string} options.title - Title of the screen
   *
   */
  constructor({ title }) {
    document.title = getTitle(title);
  }

   /**
   * @returns {HTMLElement}
   */
  render() {
    throw new Error('Render method error');
  }
}
