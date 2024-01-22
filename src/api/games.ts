import { client } from '../utils/fetchClient';

export const getGames = (page: number, genre: string) => {
  if (genre) {
    console.log(genre);
  }

  const data = `offset ${page * 12}; 
    fields name, summary, id, slug, artworks.*;
    limit 12;
    where summary != null 
    & artworks != null 
    & themes != (42) 
    & rating > 90;`;

  return client.get(data);
};
