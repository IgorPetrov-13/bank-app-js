import styles from './home.module.scss';
import template from './home.template.html';
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
      [
        new Field({
          placeholder: 'Name',
          name: 'name',
          variant: 'credit-card',
        }),
        new UserItem(
          {
            name: 'User 1',
            avatarPath: 'https://i.pravatar.cc/150?img=1',
          },
          true,
          () => {
            alert('Click');
          }
        ),
      ],
      styles
    );
    $I(element).find('h1').css('color', 'green');

    return element;
  }
}
