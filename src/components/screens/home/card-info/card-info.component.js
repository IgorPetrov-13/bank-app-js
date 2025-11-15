import styles from './home.module.scss';
import template from './home.template.html';
import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

export class CardInfo extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles);
    return this.element;
  }
}
