import { useEffect, useState } from 'react';
import { getGenres } from '../../api/genres';
import './GenreSelect.scss';
import { Genre } from '../../types/Genre';
import { useSearchParams } from 'react-router-dom';

type Props = {
  onGenreChange: (newGenre: string) => void;
};

export const GenreSelect: React.FC<Props> = ({ onGenreChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGenreChange(e.target.value);

    if (e.target.value === 'All genres') {
      searchParams.delete('gameGenre');
      return;
    }

    setSearchParams({ gameGenre: e.target.value });
  };

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
          onChange={handleGenreChange}
          className='genres__select'
          value={searchParams.get('gameGenre') || 'All games' }
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
