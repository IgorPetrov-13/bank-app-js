import styles from './auth.module.scss';
import template from './auth.template.html';
import { Heading } from '@/components/ui/heading/heading.component';
import { BaseScreen } from '@/core/component/base-screen-component';
import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

export class Auth extends BaseScreen {
  constructor() {
    super({
      title: 'Auth',
    });
  }
  render() {
    this.element = renderService.htmlToElement(template, [new Heading('Auth')], styles);
    return this.element;
  }
}
