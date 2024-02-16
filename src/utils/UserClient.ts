import { FetchMethod } from '../types/FetchMethod';

const DATA_URL = 'https://games-server-1qpi.onrender.com/user';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function request(method: FetchMethod, data: any, endpoint: string) {
  const options: any = { method };

  if (data) {
    options.body = JSON.stringify(data);

    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  options.credentials = 'include';

  await wait(300);

  const url = `${DATA_URL}${endpoint}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error:', errorText);
    throw new Error();
  }
  return await response.json();
}

export const userClient = {
  get: (data: any, endpoint: string) => request('GET', data, endpoint),
  patch: (data: any, endpoint: string) => request('PATCH', data, endpoint),
};
