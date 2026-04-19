class FormService {
  /**
   * Returns an object with the values of all input fields of the given form element.
   * @param {HTMLElement} formElement - The form element to get the values from.
   * @returns {Object} An object with the values of all input fields.
   */
  getFormValues(formElement) {
    const formData = new FormData(formElement);
    return Object.fromEntries(formData);
  }
}

export default new FormService();
