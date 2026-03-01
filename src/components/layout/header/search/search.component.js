import styles from './search.module.scss';
import template from './search.template.html';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';

export class Search extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    $I(this.element).find('input').input({
      type: 'search',
      name: 'search',
      placeholder: 'Search contacts',
    });
    return this.element;
  }
}
