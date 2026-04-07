import { BaseScreen } from '@/core/component/base-screen-component';

export class AboutUs extends BaseScreen {
  constructor() {
    super({ title: 'About' });
  }
  render() {
    const p = document.createElement('p');
    p.textContent = 'About';
    return p;
  }
}
