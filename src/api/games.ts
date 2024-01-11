import { client } from '../utils/fetchClient';

export const getGames = (page: number, genre: string) => {
  const data = {
    page,
    isFreshGamesFirst: 'true',
    genre,
    gamesToShow: 9,
  };

  return client.getData(data);
};
