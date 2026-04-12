import { $I } from '../iQuery/iquery.lib';
import styles from '@/components/layout/notification/notification.module.scss';

export class NotificationService {
  #timeout;
  #availableTypes = ['success', 'error'];

  constructor() {
    this.#timeout = null;
  }

  #setTimeout(callback, duration) {
    if (this.#timeout) {
      clearTimeout(this.#timeout);
    }

    this.#timeout = setTimeout(callback, duration);
  }

  /**
   * Show a notification with given type and message
   * @param {'success' | ''error} type - success or error
   * @param {string} message - notification message
   * @throws {Error} if type is not success or error
   */
  show(type, message) {
    if (!this.#availableTypes.includes(type)) {
      throw new Error('Invalid notification type');
    }

    const classNames = {
      success: styles.success,
      error: styles.error,
    };

    const notificationElement = $I('#notification');
    const className = classNames[type];

    notificationElement.text(message).addClass(className);

    this.#setTimeout(() => {
      notificationElement.removeClass(className);
    }, 3000);
  }
}
