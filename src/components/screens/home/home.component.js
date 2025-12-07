import styles from './home.module.scss';
import template from './home.template.html';
import { Button } from '@/components/ui/button/button.component';
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
        new Button({
          children: 'Button11',
          onClick: () => {
            console.log('Button clicked');
          },
          variant: 'green',
        }),
      ],
      styles
    );

    
    return element;
  }
}
