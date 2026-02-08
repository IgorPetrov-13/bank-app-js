import { BaseScreen } from '@/core/component/base-screen-component';

export class Auth extends BaseScreen {
  constructor() {
    super({ title: 'Auth' });
  }
  render() {
    const p = document.createElement('p');
    p.textContent = 'Auth';
    return p;
  }
}
