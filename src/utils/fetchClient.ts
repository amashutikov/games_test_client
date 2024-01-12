import { FetchMethod } from '../types/FetchMethod';

const DATA_URL = 'https://api.igdb.com/v4/games';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function request(method: FetchMethod, data: string) {
  const options: any = { method };

  if (data) {
    options.body = data;
    options.mode = 'no-cors';
    options.headers = {
      'Client-ID': CLIENT_ID,
      'Content-Type': 'text/plain',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    };

    console.log(options);
  }

  await wait(300);
  const response = await fetch(DATA_URL, options);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error:', errorText);
    throw new Error();
  }
  return await response.json();
}

export const client = {
  get: (data: string) => request('POST', data),
};
