import styles from './user-item.module.scss';
import template from './user-item.template.html';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';

export class UserItem extends ChildComponent {
  constructor(user, isGray = false, onClick) {
    super();
    this.user = user;
    this.isGray = isGray;
    this.onClick = onClick;

    if (!user) {
      throw new Error('UserItem must have user');
    }
    if (!user?.name) {
      throw new Error('UserItem must have name');
    }
    if (!user?.avatarPath) {
      throw new Error('UserItem must have avatarPath');
    }
  }

  #preventDefault(event) {
    event.preventDefault();
  }

  update({ avatarPath, name }) {
    if (name && avatarPath) {
      $I(this.element).find('img').attr('src', avatarPath).attr('alt', name);
      $I(this.element).find('span').text(name);
    }
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);
    this.update(this.user);

    $I(this.element).click(this.onClick || this.#preventDefault.bind(this));
    if (!this.onClick) {
      $I(this.element).attr('disabled', '');
    }

    if (this.isGray) {
      $I(this.element).addClass(styles.gray);
    }
    return this.element;
  }
}
