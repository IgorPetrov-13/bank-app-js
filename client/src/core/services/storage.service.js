/*
Storage service
*/
export class StorageService {
  /**
   * Sets a value in the local storage.
   * @param {string} key The key to store the value under.
   * @param {*} value The value to store.
   */
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets a value from the local storage.
   * @param {string} key The key to retrieve the value from.
   * @returns {*} The value stored under the given key.
   */
  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * Removes a value from the local storage.
   * @param {string} key The key to remove the value from.
   */
  removeItem(key) {
    localStorage.removeItem(key);
  }

  /**
   * Clears all values from the local storage.
   */
  clear() {
    localStorage.clear();
  }
}
