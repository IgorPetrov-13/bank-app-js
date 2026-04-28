/**
 * Debounce function
 * @param {*} func
 * @param {*} wait
 * @returns
 */
export function debounce(func, wait = 1000) {
  let timeout;

  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
