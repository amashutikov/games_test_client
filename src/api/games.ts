import { gamesClient } from '../utils/GamesFetchClient';
import { client } from '../utils/IGDBFetchClient';

export const searchGames = (search: string) => {
  const data = `    
    fields id, name, cover.image_id;
    search "${search}";
    limit 50;
    where summary != null 
    & category = 0
    & artworks != null 
    & themes != (42) 
    & cover != null;`;
  return client.get(data, '/games');
};

export const getSearchedGames = (
  search: string,
  page: number,
  endpoint: string = ''
) => {
  const data = `    
  fields name, summary, id, slug, artworks.*, cover.*;
  limit 24;
  offset ${(page - 1) * 24};
  search "${search}";
  where summary != null 
  & category = 0
  & artworks != null 
  & themes != (42) 
  & cover != null;`;
  return client.get(data, '/games' + endpoint);
};

export const getAmountOfSearchedGames = (search: string, page: number) => {
  return getSearchedGames(search, page, '/count');
};

export const getGames = async (page: number, genre: string | null) => {
  const gamesIds: number[] = [];

  await gamesClient
    .get(
      { limit: '24', offset: `${24 * (page - 1)}`, genre: Number(genre) },
      '/byGenre'
    )
    .then((res) => {
      gamesIds.push(...res.games);
    });

  const data = `
    fields name, summary, id, slug, artworks.*, cover.*;
    limit 24;
    where id = (${gamesIds.join(',')});`;

  return client.get(data, '/games');
};

export const getTopGames = async (numberOfGames: number) => {
  const topGamesIds: number[] = [];

  await gamesClient
    .get({ numberOfGames }, '/top')
    .then((res) => topGamesIds.push(...res.games));

  return client.get(
    `fields name, summary, id, slug, artworks.*, cover.*;
        limit ${numberOfGames};
        where id = (${topGamesIds.join(',')});`,
    '/games'
  );
};

export const getFavoriteGames = async (favoriteGames: string[]) => {
  return client.get(
    `fields name, summary, id, slug, artworks.*, cover.*;
        where id = (${favoriteGames.join(',')});`,
    '/games'
  );
};

export const getTopRatedGames = () => {
  const data = `
    fields name, summary, id, slug, artworks.*, cover.*;
    limit 15;
    sort rating desc;
    where summary != null 
    & category = 0
    & artworks != null 
    & themes != (42) 
    & cover != null;`;

  return client.get(data, '/games');
};

export const getAmountOfGames = async (page: number, genre: string | null) => {
  let count: number = 0;

  await gamesClient
    .get(
      { limit: '24', offset: `${24 * (page - 1)}`, genre: Number(genre) },
      '/byGenre'
    )
    .then((res) => {
      count = res.count;
    });

  return count;
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
