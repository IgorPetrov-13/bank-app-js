import styles from './auth.module.scss';
import template from './auth.template.html';
import { AuthService } from '@/api/auth.service';
import { Button } from '@/components/ui/button/button.component';
import { Field } from '@/components/ui/field/field.component';
import { BaseScreen } from '@/core/component/base-screen-component';
import { $I } from '@/core/iQuery/iquery.lib';
import formService from '@/core/services/form.service';
import renderService from '@/core/services/render.service';
import validationService from '@/core/services/validation.service';

export class Auth extends BaseScreen {
  #isTypeLogin = true;
  constructor() {
    super({
      title: 'Auth',
    });
    this.authService = new AuthService();
  }

  #validateFields(formValues) {
    const emailLabel = $I(this.element).find('label[for="email"]');
    const passwordLabel = $I(this.element).find('label[for="password"]');

    if (!formValues.email) {
      validationService.showError(emailLabel);
    }
    if (!formValues.password) {
      validationService.showError(passwordLabel);
    }

    return formValues.email && formValues.password;
  }

  #handleSubmit = (event) => {
    const formValues = formService.getFormValues(event.target);
    if (!this.#validateFields(formValues)) {
      return;
    }

    const type = this.#isTypeLogin ? 'login' : 'register';
    // register or login
    this.authService.main(type, formValues);
  };

  #changeFormType = (event) => {
    event.preventDefault();
    $I(this.element)
      .find('h1')
      .text(this.#isTypeLogin ? 'Register' : 'Sign in');

    $I(event.target).text(this.#isTypeLogin ? 'Sign in' : 'Register');
    this.#isTypeLogin = !this.#isTypeLogin;
  };
  render() {
    this.element = renderService.htmlToElement(
      template,
      [new Button({ children: 'Submit' })],
      styles,
    );

    $I(this.element)
      .find('#auth-inputs')
      .append(
        new Field({
          placeholder: 'Enter email',
          name: 'email',
          type: 'email',
        }).render(),
      )
      .append(
        new Field({
          placeholder: 'Enter password',
          name: 'password',
          type: 'password',
        }).render(),
      );

    $I(this.element).find('#change-form-type').click(this.#changeFormType);

    $I(this.element).find('form').submit(this.#handleSubmit);
    return this.element;
  }
}
