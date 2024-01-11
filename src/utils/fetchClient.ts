/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchMethod } from '../types/FetchMethod';

const DATA_URL = 'https://api.igdb.com/v4/games';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function request(method: FetchMethod, data: any) {
  const options: any = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'text/plain',
    };
  }

  await wait(300);
  const response = await fetch(DATA_URL, options);
  if (!response.ok) {
    throw new Error();
  }
  return await response.json();
}

export const client = {
  getData: (data: any) => request('POST', data),
};
