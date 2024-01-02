const BASE_URL = 'http://localhost:3006';

async function request(url, method, data, credentials) {
  const options = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  if (credentials) {
    options.credentials = 'include';
  }

  const response = await fetch(BASE_URL + url, options);
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }
  return await response.json();
}

export const authClient = {
  register: (data) => request('/registration', 'POST', data),
  activate: (activationToken) =>
    request(`/activation/${activationToken}`, 'GET', false, true),
  login: (data) => request('/login', 'POST', data),
  refresh: () => request('/refresh', 'GET', {}, true),
  logout: () => request('/logout', 'POST', {}, true),
};
