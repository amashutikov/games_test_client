import { client } from '../utils/IGDBFetchClient';

export const getGenres = () => {
  const data = 'fields name, id; limit: 500;';

  return client.get(data, '/genres');
};
