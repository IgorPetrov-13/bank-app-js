import styles from './transfer-field.module.scss';
import template from './transfer-field.template.html';
import { AuthService } from '@/api/auth.service';
import { Field } from '@/components/ui/field/field.component';
import { BALANCE_UPDATED, TRANSACTION_COMPLETED } from '@/constants/event.constants';
import ChildComponent from '@/core/component/child.component';
import { NotificationService } from '@/core/services/notification.service';
import renderService from '@/core/services/render.service';
import Store from '@/core/store/store';

export class TransferField extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.authService = new AuthService();
    this.notificationService = new NotificationService();
  }

  handelTransfer = (e) => {
    e.preventDefault();

    if (!this.store.user) {
      this.notificationService.show('error', 'You are not logged in');
      return;
    }

    $I(e.target).text('Sending...').attr('disabled', true);

    const inputElement = $I(this.element).find('input');
    const toCardNumber = inputElement.value().replaceAll('-', '');

    const reset = () => {
      $I(e.target).removeAttr('disabled').text('Send');
    };

    if (!toCardNumber) {
      validationService.showError($I(this.element).find('label'));
      reset();
      return;
    }

    let amount = prompt('Transfer amount');

    this.cardService.transfer({ amount, toCardNumber }, () => {
      inputElement.value('');
      amount = '';

      document.dispatchEvent(new Event(TRANSACTION_COMPLETED));
      document.dispatchEvent(new Event(BALANCE_UPDATED));
    });
    reset();
  };

  render() {
    this.element = renderService.htmlToElement(
      template,
      [
        new Field({
          name: 'card-number',
          placeholder: 'xxxx-xxxx-xxxx-xxxx',
          variant: 'credit-card',
        }),
        new Button({
          children: 'Send',
          variant: 'purple',
          onClick: this.handelTransfer,
        })
      ],
      styles,
    );
    return this.element;
  }
}
