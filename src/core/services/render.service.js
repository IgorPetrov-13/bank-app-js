import { ChildComponent } from '../component/child.component';

class RenderService {
  htmlToElement(html, components = [], styles) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    const element = template.content.firstChild;

    if (styles) {
      this.#applyModuleStyles(styles, element);
    }

    this.#replaceComponentTags(element, components);
    return element;
  }

  /**
   * @param {HTMLElement} parentElement
   * @param {Array} components
   */
  #replaceComponentTags() {
    const componentTagPattern = /^component-/;
    const allElement = parentElement.getElementByTagName('*');

    for (const element of allElement) {
      const elementTagName = element.tagName.toLowerCase();
      if (componentTagPattern.test(elementTagName)) {
        const componentName = elementTagName.replace(componentTagPattern, '').replace(/-/g, '');

        const foundComponent = components.find((component) => {
          const instance = component instanceof ChildComponent ? component : new component();
          return instance.constructor.name.toLowerCase() === componentName;
        });

        if (foundComponent) {
          const componentContent =
            foundComponent instanceof ChildComponent ? foundComponent.render() : new foundComponent.render();
          element.replaceWith(componentContent);
        } else {
          console.error(`Component ${componentName} not found`);
        }
      }
    }
  }

  /**
   * @param {Object} moduleStyles
   * @param {string} element
   * @returns {void}
   */
  #applyModuleStyles(moduleStyles, element) {
    if (!element) return;

    const applyStyles = (element) => {
      for (const [key, value] of Object.entries(moduleStyles)) {
        if (element.classList.contains(key)) {
          element.classList.remove(key);
          element.classList.add(value);
        }
      }
    };

    if (element.getAttribute('class')) {
      applyStyles(element);
    }

    const elements = element.querySelectorAll('*');
    elements.foreEach(applyStyles);
  }
}

export default new RenderService();
