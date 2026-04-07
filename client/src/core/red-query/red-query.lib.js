import { extractErrorMessage } from './extract-error-message';

/**
 * Make a request to the server with the given options.
 * @param {string} path The path to make the request to.
 * @param {object} [body] The body of the request.
 * @param {object} [headers] The headers of the request.
 * @param {string} [method] The method of the request, defaults to 'GET'.
 * @param {function} [onError] A function to call if the request fails.
 * @param {function} [onSuccess] A function to call if the request succeeds.
 * @returns {Promise} A promise that resolves with an object containing the request result.
 */
export async function redQuery({
  path,
  body = null,
  headers = {},
  method = 'GET',
  onError = null,
  onSuccess = null,
}) {
  const result = { isLoading: true, error: null, data: null };
  const url = `${SERVER_URL}/api${path}`;

  // token
  const accessToken = 'token';

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (accessToken) {
    requestOptions.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, requestOptions);

    const payload = await response.json().catch(() => ({}));

    if (response.ok) {
      result.data = payload;
      onSuccess?.(payload);
    } else {
      result.error = extractErrorMessage(payload);
      onError?.(result.error);
    }
  } catch (err) {
    result.error = extractErrorMessage(err);
    onError?.(result.error);
  } finally {
    result.isLoading = false;
  }

  return result;
}
