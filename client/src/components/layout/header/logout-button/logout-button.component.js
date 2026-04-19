import styles from './logout-button.module.scss';
import template from './logout-button.template.html';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';

export class LogoutButton extends ChildComponent {
  constructor({ router }) {
    super();
    this.router = router;
    this.store = Store.getInstance();
    this.user = this.store.state.user;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $I(this.element)
      .find('button')
      .click(() => {
        this.store.logout();
        this.router.navigate('/auth');
      });
    return this.element;
  }
}
