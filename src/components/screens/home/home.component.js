import styles from './home.module.scss';
import template from './home.template.html';
import { Field } from '@/components/ui/field/field.component';
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
      ],
      styles
    );
    $I(element).find('h1').css('color', 'green');

    return element;
  }
}
