/**
 * Extract the error message from the given error object.
 * If the error object does not have a "message" property,
 * or if the "message" property is not a string or an array,
 * return the default error message "Something went wrong".
 * @param {Object} error The error object to extract the message from.
 * @returns {string} The extracted error message.
 */
export function extractErrorMessage(error) {
  if (!error) {
    return 'Unknown error';
  }
  if (typeof error.message === 'string') return error.message;

  if (Array.isArray(error.message)) return error.message[0];

  return 'Something went wrong';
}
