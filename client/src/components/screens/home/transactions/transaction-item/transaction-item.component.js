import styles from './transaction-item.module.scss';
import template from './transaction-item.template.html';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';
import { formatToCurrency } from '@/utils/format/format-to-currency';
import { formatToDate } from '@/utils/format/format-to-date';

export class TransactionItem extends ChildComponent {
  constructor(transaction) {
    super();
    this.transaction = transaction;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    const isIncome = this.transaction.type === 'TOP_UP';
    const name = isIncome ? 'Income' : 'Expense';

    if (isIncome) {
      $I(this.element).addClass(styles.income);
    }

    $I(this.element).find('#transaction-name').text(name);
    $I(this.element).find('#transaction-amount').text(formatToCurrency(this.transaction.amount));
    $I(this.element).find('#transaction-date').text(formatToDate(this.transaction.createdAt));

    return this.element;
  }
}
