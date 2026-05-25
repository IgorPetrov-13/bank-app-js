import styles from './card-info.module.scss';
import template from './card-info.template.html';
import { CardService } from '@/api/card.service';
import { BALANCE_UPDATED } from '@/constants/event.constants';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';
import Store from '@/core/store/store';
import { formatCardNumber } from '@/utils/format/format-card-number';
import { formatToCurrency } from '@/utils/format/format-to-currency';

const CODE = '*****';
export class CardInfo extends ChildComponent {
  constructor() {
    super();
    this.cardService = new CardService();
    this.cardStore = Store.getInstance();
    this.element = renderService.htmlToElement(template, [], styles);

    this.#addListeners();
  }

  #addListeners() {
    document.addEventListener(BALANCE_UPDATED, this.#onUpdateBalance);
  }

  #removeListeners() {
    document.removeEventListener(BALANCE_UPDATED, this.#onUpdateBalance);
  }

  destroy() {
    this.#removeListeners();
  }

  #onUpdateBalance = () => {
    this.fillElements();
  };

  #copyCardNumber(e) {
    navigator.clipboard.writeText(e.target.textContent).then(() => {
      e.target.innerText = 'Copied!';
      setTimeout(() => {
        e.target.innerText = formatCardNumber(this.card.number);
      }, 2000);
    });
  }

  #toggleCvc(cardCvc) {
    const text = cardCvc.text();

    text === CODE ? cardCvc.text(this.card.cvc) : cardCvc.text(CODE);
  }

  fillElements() {
    $I(this.element).html(renderService.htmlToElement(template, [], styles).innerHTML);

    $I(this.element)
      .findAll(':scope > div')
      .forEach((child) => {
        child.addClass('fade-in');
      });

    $I(this.element)
      .find('#card-number')
      .text(formatCardNumber(this.card.number))
      .click(this.#copyCardNumber.bind(this));

    $I(this.element).find('#card-expire-date').text(this.card.expireDate);

    const cardCvc = $I(this.element).find('#card-cvc');
    cardCvc.text(CODE).css('width', '44px');

    $I(this.element).find('#toggle-cvc').click(this.#toggleCvc.bind(this, cardCvc));

    $I(this.element).find('#card-balance').text(formatToCurrency(this.card.balance));
  }

  fetchData() {
    this.cardService.byUser((data) => {
      if (data?.id) {
        this.card = data;
        this.fillElements();
        this.store.updateCard(data);
      } else {
        this.store.updateCard(null);
      }
    });
  }
  render() {
    if (this.store.state.user) this.fetchData();
    return this.element;
  }
}
