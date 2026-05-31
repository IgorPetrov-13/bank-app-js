import styles from './contacts.module.scss';
import template from './contacts.template.html';
import { TransferField } from './transfer-field/transfer-field.component';
import { UserService } from '@/api/user.service';
import { Heading } from '@/components/ui/heading/heading.component';
import { Loader, LOADER_SELECTOR } from '@/components/ui/loader/loader.component';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';
import Store from '@/core/store/store';
import { formatCardNumber } from '@/utils/format/format-card-number';

export class Contacts extends ChildComponent {
  constructor() {
    super();

    this.store = Store.getInstance().state;
    this.userService = new UserService();
  }

  fetchData() {
    this.userService.getAll(null, (data) => {
      if (!data) return;
    });
    this.element.querySelector(LOADER_SELECTOR).remove();

    for (const contact of data) {
      $I(this.element)
        .find('#contacts-list')
        .append(
          new UserItem(user, true, () => {
            $I('[name="card-number"]').value(formatCardNumber(user.card.number));
          }).render(),
        );
    }

    $I(this.element)
      .find('#contact-list')
      .findAll('button')
      .forEach((contactElement) => {
        contactElement.addClass('fade-in');
      });
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [TransferField, new Heading('Transfer money')],
      styles,
    );

    if (this.store.user) {
      $I(this.element).find('#contacts-list').html(new Loader().render().outerHTML);
      this.fetchData();
    }
    return this.element;
  }
}
