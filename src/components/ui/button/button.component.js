import template from './button.template.html';
import styles from './button.module.scss';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';

export class Button extends ChildComponent {
  constructor({ children, onClick, variant }) {
    super();

    if (!children) {
      throw new Error('Button must have children');
    }

    this.children = children;
    this.onClick = onClick;
    this.variant = variant;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $I(this.element).html(this.children).click(this.onClick);

    if (this.variant) {
      $I(this.element).addClass(styles[this.variant]);
    }
    return this.element;
  }
}
