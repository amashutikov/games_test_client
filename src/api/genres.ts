import { client } from '../utils/fetchClient';

export const getGenres = () => {
   const data = 'fields name, id;';

  return client.get(data, '/genres');
};