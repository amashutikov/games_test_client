import { FetchMethod } from '../types/FetchMethod';

const BASE_URL = 'https://games-server-1qpi.onrender.com';

export interface ErrorResponse {
  message: string;
}

export interface VerifyResponse {
  success: boolean;
}

async function request<T>(
  url: string,
  method: FetchMethod,
  data: any,
  credentials: boolean
): Promise<T> {
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

  let responseBody: T;

  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    } else {
      throw new Error('Response is not in JSON format');
    }
  } catch (error) {
    throw new Error('Error parsing server response');
  }

  if (!response.ok) {
    const error: ErrorResponse = responseBody as ErrorResponse;

    throw new Error(error.message);
  }

  return responseBody;
}

export const authClient = {
  register: (data: any) => request('/registration', 'POST', data, false),
  activate: (activationToken: any) =>
    request(`/activation/${activationToken}`, 'GET', false, true),
  login: (data: any) => request('/login', 'POST', data, true),
  logout: () => request('/logout', 'POST', {}, true),
  verify: () => request<VerifyResponse>('/verify', 'GET', false, true),
};
