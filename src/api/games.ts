import { client } from '../utils/fetchClient';

export const getGames = (page: number, genre: string) => {
  const data = `offset ${page * 24}; 
    fields name, summary, id, slug, artworks.*, cover.*;
    limit 24;
    sort rating desc;
    where summary != null 
    & category = 0
    & artworks != null 
    & total_rating >= 80
    & themes != (42) 
    & cover != null
    ${genre !== 'All genres' ? '& genres.name = ' + `"${genre}"` : ''};`;

  return client.get(data, '/games');
};

export const getAmountOfGames = (genre: string) => {
  const data = `
  where summary != null 
  & category = 0
  & artworks != null 
  & total_rating >= 80
  & themes != (42) 
  & cover != null
  ${genre !== 'All genres' ? '& genres.name = ' + `"${genre}"` : ''};`;

  return client.get(data, '/games/count');
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

  return client.get(data, '/games');
};
