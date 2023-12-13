import { client } from '../utils/fetchClient';

export const getGames = (page, genre) => {
  const data = {
    page,
    isFreshGamesFirst: 'true',
    genre,
    gamesToShow: 9,
  };

  return client.post('', data);
};
