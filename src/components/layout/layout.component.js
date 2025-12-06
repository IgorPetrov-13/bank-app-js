import { Header } from './header/header.component';
import styles from './layout.module.scss';
import template from './layout.template.html';
import ChildComponent from '@/core/component/child.component';
import { $I } from '@/core/iQuery/iquery.lib';
import renderService from '@/core/services/render.service';

export class Layout extends ChildComponent {
  constructor({ router, children }) {
    super()
    this.router = router;
    this.children = children;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    const mainElement = $I(this.element).find('main');

    const contentContainer = $I(this.element).find('#content');
    contentContainer.append(this.children);

    mainElement.before(new Header().render()).append(contentContainer.element);

    return this.element;
  }
}
