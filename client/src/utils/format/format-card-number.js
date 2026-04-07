/**
 * Format a card number string
 * @param {string} cardNumber The card number string to format
 * @returns {string} The formatted card number string
 * @example
 * formatCardNumber('1234 5678 9012 3456') // '1234 5678 9012 3456'
 */
export function formatCardNumber(cardNumber) {
  return cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ');
}
