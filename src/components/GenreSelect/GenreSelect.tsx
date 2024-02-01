import { useEffect, useState } from 'react';
import { getGenres } from '../../api/genres';
import './GenreSelect.scss';
import { Genre } from '../../types/Genre';
import { useSearchParams } from 'react-router-dom';
import { getGenreName } from '../../helpers/getGenreName';

type Props = {
  onGenreChange: (newGenre: string) => void;
};

export const GenreSelect: React.FC<Props> = ({ onGenreChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [genres, setGenres] = useState<Genre[] | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState('All genres');

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGenreChange(e.target.value);

    if (e.target.value === 'All genres') {
      searchParams.delete('gameGenreId');

      setSelectedGenre('All genres');
      setSearchParams(searchParams);
      return;
    }

    setSearchParams({ gameGenreId: e.target.value });

    const newGenre = getGenreName(Number(searchParams.get('genreId')), genres);

    setSelectedGenre(newGenre);
  };

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res);
    });
  }, []);

  return (
    <form className='genres'>
      <label>Choose game genre:</label>
      <select
        onChange={handleGenreChange}
        className='genres__select'
        value={selectedGenre}
      >
        <option>All genres</option>
        {genres &&
          genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
      </select>
    </form>
  );
};
