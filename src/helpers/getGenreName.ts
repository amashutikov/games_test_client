import { Genre } from '../types/Genre';

export const getGenreName = (genreId: number, genres: Genre[] | undefined) => {
  if (!genres) {
    return 'All genres';
  }

  const selectedGenre = genres.find((genre) => genre.id === genreId);

  if (selectedGenre) {
    return selectedGenre.name;
  }
  return 'All genres';
};
