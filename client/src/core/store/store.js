import { StorageService } from '../services/storage.service';
import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from '@/constants/auth.constants';

export default class Store {
  constructor(initialStore) {
    this.observers = new Set();
    this.storageService = new StorageService();
    const currUser = this.storageService.getItem(USER_STORAGE_KEY);
    const state = currUser ? { user: currUser } : initialStore;

    this.state = new Proxy(state, {
      set: (target, key, value) => {
        target[key] = value;
        this.notify();
        return true;
      },
    });
  }

  /**
   * Returns the singleton instance of the Store class.
   * If the instance does not exist, it is created with the given initial store.
   * @param {Object} initialStore - The initial state of the store.
   * @returns {Store} The singleton instance of the Store class.
   */
  static getInstance(initialStore) {
    if (!Store.instance) {
      Store.instance = new Store(initialStore);
    }
    return Store.instance;
  }

  /**
   * Adds an observer to the store.
   * The observer must be a function with a name.
   * The observer will be called whenever the state of the store changes.
   * @param {function} observer - The observer to add.
   * @throws {Error} If the observer is not a function or does not have a name.
   */
  addObserver(observer) {
    if (typeof observer === 'function' && !observer.name) {
      throw new Error('Function must have a name');
    }
    if (!observer.name) {
      throw new Error('Observer must have a name');
    }
    this.observers.add(observer);
  }

  /**
   * Removes an observer from the store.
   * The observer will no longer be called whenever the state of the store changes.
   * @param {function} observer - The observer to remove.
   */
  removeObserver(observer) {
    this.observers.delete(observer);
  }

  /**
   * Calls all observers to update their state.
   * This method is called whenever the state of the store changes.
   */
  notify() {
    this.observers.forEach((observer) => observer.update());
  }

  /**
   * Logs the user in.
   * Updates the state of the store to contain the user.
   * Saves the user and access token to the local storage.
   * @param {object} user - The user to log in.
   * @param {string} accessToken - The access token to save.
   */
  login(user, accessToken) {
    this.state.user = user;
    this.storageService.setItem(USER_STORAGE_KEY, user);
    this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  /**
   * Logs the user out.
   * Resets the state of the store to not contain a user.
   * Removes the user and access token from the local storage.
   */
  logout() {
    this.state.user = null;
    this.storageService.removeItem(USER_STORAGE_KEY);
    this.storageService.removeItem(ACCESS_TOKEN_KEY);
  }

  updateCard(card) {
    this.state.card = card;

    const oldUser = this.state.user;
    const newUser = { ...oldUser, card };

    this.state.user = newUser;
    this.storageService.setItem(USER_STORAGE_KEY, newUser);
  }
}
