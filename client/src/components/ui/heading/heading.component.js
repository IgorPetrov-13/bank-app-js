import styles from './heading.module.scss';
import template from './heading.template.html';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';

export class Heading extends ChildComponent {
  constructor(title = '') {
    super();
    this.title = title;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $I(this.element).text(this.title);

    return this.element;
  }
}
