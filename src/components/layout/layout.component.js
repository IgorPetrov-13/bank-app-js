import styles from './layout.module.scss';
import template from './layout.template.html';
import renderService from '@/core/services/render.service';

export class Layout {
  constructor({ router, children }) {
    this.router = router;
    this.children = children;
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles);

    return this.element;
  }
}
