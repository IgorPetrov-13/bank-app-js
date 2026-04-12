import { redQuery } from '@/core/red-query/red-query.lib';
import { NotificationService } from '@/core/services/notification.service';

export class CardService {
  #BASE_URL = '/cards';
  constructor() {
    //store
    this.notificationService = new NotificationService();
  }

  byUser(onSuccess) {
    return redQuery({
      path: `${this.#BASE_URL}/by-user`,
      onSuccess,
    });
  }

  /**
   * Update user balance.
   * @param {number} amount - The amount to add or subtract from the balance.
   * @param {'top-up', 'withdrawal'} type - The type of the transaction.
   * @param {function} onSuccess - A callback function that is called when the request is successful.
   * @returns {Promise} A promise that resolves with an object containing the request result.
   */
  updateBalance(amount, type, onSuccess) {
    return redQuery({
      path: `${this.#BASE_URL}/balance/${type}`,
      method: 'PATCH',
      body: { amount: Number(amount) },
      onSuccess: () => {
        this.notificationService.show('success', 'Balance successfully changed!');
        onSuccess();
      },
    });
  }

  /**
   * Transfer money from the user's card to another card.
   * @param {{amount: number, toCardNumber: string}} - The data to transfer.
   * @param {function} onSuccess - A callback function that is called when the request is successful.
   * @returns {Promise} A promise that resolves with an object containing the request result.
   */
  transfer({ amount, toCardNumber }, onSuccess) {
    return redQuery({
      path: `${this.#BASE_URL}/transfer-money`,
      method: 'PATCH',
      body: {
        amount: Number(amount),
        //fromCardNumber: this.store.user.card.number,
        toCardNumber,
      },
      onSuccess: () => {
        this.notificationService.show('success', 'Transfer successfully completed!');
        onSuccess();
      },
    });
  }
}
