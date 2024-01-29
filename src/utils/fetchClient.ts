import { FetchMethod } from '../types/FetchMethod';

const DATA_URL = 'https://api.igdb.com/v4';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function request(method: FetchMethod, data: string, endpoint: string) {
  const options: any = { method };

  if (data) {
    options.body = data;
    // Remove 'no-cors' mode
    options.headers = {
      'Client-ID': CLIENT_ID,
      'Content-Type': 'text/plain',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    };
  }

  await wait(300);

  // Use a CORS proxy if needed
  const proxyUrl = 'https://cors-anywhere-34sl.onrender.com/';
  const urlWithProxy = `${proxyUrl}${DATA_URL}${endpoint}`;

  const response = await fetch(urlWithProxy, options);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error:', errorText);
    throw new Error();
  }
  return await response.json();
}

export const client = {
  get: (data: string, endpoint: string) => request('POST', data, endpoint),
};
