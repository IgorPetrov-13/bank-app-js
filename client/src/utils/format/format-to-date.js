/**
 *  Converts a date string to a formatted date string.
 * @param {string} date
 * @returns {string} The formatted date string "MM dd, yyyy".
 */
export function formatToDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
