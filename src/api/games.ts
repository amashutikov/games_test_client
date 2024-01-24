import { client } from '../utils/fetchClient';

export const getGames = (page: number, genre: string) => {
  if (genre) {
    console.log(genre);
  }

  const data = `offset ${page * 12}; 
    fields name, summary, id, slug, artworks.*, cover.*;
    limit 12;
    where summary != null 
    & artworks != null 
    & themes != (42) 
    & rating > 90;`;

  return client.get(data);
};

export const getGameDetails = (gameId: string) => {
  const data = `where id = ${gameId};
  fields 
  artworks.url,
  artworks.id,
  artworks.image_id,
  name, 
  summary,
  storyline,
  screenshots.url, 
  screenshots.id, 
  screenshots.image_id, 
  similar_games.id, 
  similar_games.name,
  similar_games.cover.id, 
  similar_games.cover.image_id;`;

  return client.get(data);
};
