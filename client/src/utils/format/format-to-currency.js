/**
 * Format a number to a currency string
 * @param {number} number The number to format
 * @returns {string} The formatted currency string
 * @example
 * formatToCurrency(1234.56) // '1234.56 ₽'
 */
export function formatToCurrency(number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(number);
}
