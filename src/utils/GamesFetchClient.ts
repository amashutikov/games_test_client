import { FetchMethod } from '../types/FetchMethod';

const DATA_URL = 'http://localhost:3006/games';

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

export const gamesClient = {
  get: (data: any, endpoint: string) => request('POST', data, endpoint),
};
