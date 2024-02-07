import { Genre } from '../types/Genre';

export const getGenreId = (
  currentGenre: string | null,
  genres: Genre[] | undefined
) => {
  if (!genres) {
    return 0;
  }

  const selectedGenre = genres.find((genre) => genre.name === currentGenre);

  if (selectedGenre) {
    return selectedGenre.id;
  }
  return 0;
};
