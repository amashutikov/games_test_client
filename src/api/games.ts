import { client } from '../utils/fetchClient';

export const getGames = (page: number, genre: string) => {
  const data = `offset ${page * 12}; fields name, summary, id, slug, artworks.*; limit 12`;

  return client.get(data);
};
