import template from './logo.template.html';
import styles from './logo.module.scss';

import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service';



export class Logo extends ChildComponent {

  render() {
    this.element = renderService.htmlToElement(template, [], styles);
    return this.element;
  }
}
