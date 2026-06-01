import { Actions } from './actions/actions.component';
import { CardInfo } from './card-info/card-info.component';
import { Contacts } from './contacts/contacts.component';
import styles from './home.module.scss';
import template from './home.template.html';
import { Transactions } from './transactions/transactions.component';
import { Field } from '@/components/ui/field/field.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';
import { BaseScreen } from '@/core/component/base-screen-component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';

export class Home extends BaseScreen {
  constructor() {
    super({ title: 'Home' });
  }
  render() {
    const element = renderService.htmlToElement(
      template,
      [CardInfo, Actions, Contacts, Transactions],
      styles,
    );
    $I(element).find('h1').css('color', 'green');

    return element;
  }
}
