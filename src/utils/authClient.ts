import { FetchMethod } from '../types/FetchMethod';

const BASE_URL = 'http://localhost:3006';

async function request(url: string, method: FetchMethod, data: any, credentials: boolean) {
  const options: any = { method };

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
  register: (data: any) => request('/registration', 'POST', data, false),
  activate: (activationToken: any) =>
    request(`/activation/${activationToken}`, 'GET', false, true),
  login: (data: any) => request('/login', 'POST', data, false),
  refresh: () => request('/refresh', 'GET', {}, true),
  logout: () => request('/logout', 'POST', {}, true),
};
