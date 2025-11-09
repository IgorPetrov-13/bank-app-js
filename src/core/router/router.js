import { ROUTES } from './routes.data';
import { Layout } from '@/components/layout/layout.component';
import { NotFound } from '@/components/screens/not-found/not-found.component';

export class Router {
  #routes;
  #currentRoute;
  #layout = null;
  constructor() {
    this.#routes = ROUTES;
    this.#currentRoute = null;

    this.#handelRouteChange();
    this.#handelLinks();
    this.#handelPopState();
  }

  #handelLinks() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a');

      if (target) {
        event.preventDefault();
        this.navigate(target.href);
      }
    });
  }

  #handelPopState() {
    window.addEventListener('popstate', () => {
      this.#handelRouteChange;
    });
  }

  getCurrentPath() {
    return window.location.pathname;
  }

  navigate(path) {
    if (path === this.getCurrentPath()) {
      window.history.pushState({}, '', path);
      this.#handelRouteChange();
    }
  }

  #handelRouteChange() {
    const path = this.getCurrentPath() || '/';
    let route = this.#routes.find((route) => route.path === path);
    if (!route) {
      route = {
        component: NotFound,
      };
    }
    this.#currentRoute = route;
    this.#render();
  }

  #render() {
    const component = new this.#currentRoute.component();

    if (!this.#layout) {
      this.#layout = new Layout({
        router: this,
        children: component.render(),
      });
      document.getElementById('app').innerHTML = this.#layout.render();
    } else {
      document.querySelector('main').innerHTML = component.render();
    }
  }
}
