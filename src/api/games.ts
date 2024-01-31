import { Game } from '../types/Game';
import { client } from '../utils/fetchClient';

export const getGames = (page: number, genre: string) => {
  const data = `offset ${page * 24}; 
    fields name, summary, id, slug, artworks.*, cover.*;
    limit 24;
    where summary != null 
    & release_dates.platform = (6)
    & category = 0
    & artworks != null 
    & themes != (42) 
    & cover != null
    ${genre !== 'All genres' ? '& genres.name = ' + `"${genre}"` : ''};`;

  return client.get(data, '/games');
};

export const getTopGames = async (numberOfGames: number) => {
  type Data = {
    id: number;
    total_rating: number;
    total_rating_count: number;
  };

  let countOfGames = 0;
  let numberOfFetches = 0;
  let limit = 500;
  let offset = 0;
  const data: Data[] = [];
  const bodyQuery = `where summary != null 
    & category = 0
    & artworks != null 
    & themes != (42) 
    & cover != null
    & release_dates.platform = (6);`;

  await client.get(`${bodyQuery}`, '/games/count').then((res) => {
    countOfGames = res.count;
    numberOfFetches = Math.ceil(countOfGames / 500);
  });

  for (let i = 0; i < numberOfFetches; i++) {
    await client
      .get(
        `fields id, total_rating, total_rating_count;
        limit ${limit};
        offset ${offset};
        sort total_rating desc;
        ${bodyQuery}`,
        '/games'
      )
      .then((res) => data.push(...res));

    if (countOfGames - offset < 500) {
      limit = countOfGames - offset;
      continue;
    }
    offset += 500;
  }

  const rated = data
    .map((item) => {
      const averageRating = item.total_rating;
      const numberOfRatings = item.total_rating_count;
      const weightedRating =
        (numberOfRatings / (numberOfRatings + 100)) * averageRating;

      return {
        weightedRating,
        id: item.id,
      };
    })
    .sort((a, b) => b.weightedRating - a.weightedRating);

  const top: Game[] = await client.get(
    `fields name, summary, id, slug, artworks.*, cover.*;
    sort total_rating desc;
    limit ${numberOfGames};
    where id = (${rated
      .slice(0, numberOfGames)
      .map((item) => item.id)
      .join(',')});`,
    '/games'
  );

  console.log(rated);

  return top;
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

export const getAmountOfGames = (genre: string) => {
  const data = `
  where summary != null 
  & release_dates.platform = (6)
  & category = 0
  & artworks != null 
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
