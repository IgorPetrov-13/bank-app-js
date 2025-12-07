import template from './<FTName>.template.html';
import styles from './<FTName>.module.scss';

import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service';



export class <FTName | pascalecase> extends ChildComponent {

  render() {
    this.element = renderService.htmlToElement(template, [], styles);
    return this.element;
  }
}
