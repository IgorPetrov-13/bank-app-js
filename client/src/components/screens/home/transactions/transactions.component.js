import { TransactionItem } from './transaction-item/transaction-item.component';
import styles from './transactions.module.scss';
import template from './transactions.template.html';
import { TransactionService } from '@/api/transaction.service';
import { Heading } from '@/components/ui/heading/heading.component';
import { Loader, LOADER_SELECTOR } from '@/components/ui/loader/loader.component';
import { TRANSACTION_COMPLETED } from '@/constants/event.constants';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';
import Store from '@/core/store/store';

export class Transactions extends ChildComponent {
  constructor() {
    super();
    this.store = Store.getInstance().state;
    this.transactionsService = new TransactionService();

    this.element = renderService.htmlToElement(
      template,
      [new Heading('Your transactions')],
      styles,
    );
  }

  #addListeners() {
    document.addEventListener(TRANSACTION_COMPLETED, this.#onTransactionCompleted);
  }

  #removeListeners() {
    document.removeEventListener(BALANCE_UPDATED, this.#onTransactionCompleted);
  }
  #onTransactionCompleted = () => {
    this.fetchData();
  };

  destroy() {
    this.#removeListeners();
  }

  fetchData() {
    this.transactionsService.getAll((data) => {
      if (!data) return;

      const loaderElement = this.element.querySelector(LOADER_SELECTOR);
      if (loaderElement) {
        loaderElement.remove();
      }
      const transactionsList = $I(this.element).find('#transactions-list');
      transactionsList.text('');

      if (data.length) {
        for (const transaction of data.transactions) {
          transactionsList.append(new TransactionItem(transaction).render());
        }
      } else {
        transactionsList.text('No transactions');
      }
    });
  }
  render() {
    if (this.store.user) {
      $I(this.element).append(new Loader().render());
      this.fetchData();
    }
    return this.element;
  }
}
