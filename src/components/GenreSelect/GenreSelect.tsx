import { useEffect, useState } from 'react';
import { getGenres } from '../../api/genres';
import './GenreSelect.scss';
import { Genre } from '../../types/Genre';

type Props = {
  onGenreChange: (newGenre: string) => void;
};

export const GenreSelect: React.FC<Props> = ({ onGenreChange }) => {
  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res);
    });
  }, []);

  if (genres) {
    return (
      <form className='genres'>
        <label>Choose game genre:</label>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onGenreChange(e.target.value)
          }
          defaultValue='All genres'
          className='genres__select'
        >
          <option>All genres</option>
          {genres.map((genre) => (
            <option key={genre.id}>{genre.name}</option>
          ))}
        </select>
      </form>
    );
  }

  return null;
};
