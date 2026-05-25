import styles from './actions.module.scss';
import template from './actions.template.html';
import { AuthService } from '@/api/auth.service';
import { Button } from '@/components/ui/button/button.component';
import { Field } from '@/components/ui/field/field.component';
import { BALANCE_UPDATED } from '@/constants/event.constants';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import { NotificationService } from '@/core/services/notification.service';
import renderService from '@/core/services/render.service';
import validationService from '@/core/services/validation.service';
import Store from '@/core/store/store';

export class Actions extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.authService = new AuthService();
    this.notificationService = new NotificationService();
  }

  /**
   * @param {Event} event
   * @param {'top-up' | 'withdraw'} type - The type of transaction
   */
  updateBalance(event, type) {
    event.preventDefault();

    if (!this.store.user) {
      this.notificationService.show('error', 'You are not logged in');
      return;
    }

    $I(event.target).text('Loading...').attr('disabled', true);

    const inputElement = $I(this.element).find('input');
    const amount = inputElement.value();

    if (!amount) {
      validationService.showError($I(this.element).find('label'));
      return;
    }

    this.cardService.updateBalance(amount, type, () => {
      inputElement.value('');
      this.notificationService.show('success', 'Balance updated successfully');

      const balanceUpdateEvent = new Event(BALANCE_UPDATED);
      document.dispatchEvent(balanceUpdateEvent);
    });

    $I(event.target).removeAttr('disabled').text(type);
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [
        new Field({
          name: 'amount',
          placeholder: 'Enter amount',
          type: 'number',
        }),
      ],
      styles,
    );

    $I(this.element)
      .find('#action-buttons')
      .append(
        new Button({
          children: 'Top-up',
          variant: 'green',
          onClick: (e) => this.updateBalance(e, 'top-up'),
        }).render(),
      )
      .append(
        new Button({
          children: 'Withdraw',
          variant: 'purple',
          onClick: (e) => this.updateBalance(e, 'withdraw'),
        }).render(),
      );

    return this.element;
  }
}
