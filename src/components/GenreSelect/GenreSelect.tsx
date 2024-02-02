import './GenreSelect.scss';
import { Genre } from '../../types/Genre';
import { useSearchParams } from 'react-router-dom';

type Props = {
  onGenreChange: (newGenre: string) => void;
  genres: Genre[] | undefined;
};

export const GenreSelect: React.FC<Props> = ({ onGenreChange, genres }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onGenreChange(e.target.value);

    if (e.target.value === 'All genres') {
      searchParams.delete('gameGenre');

      setSearchParams(searchParams);
      return;
    }

    setSearchParams({ gameGenre: e.target.value });
  };

  return (
    <form className='genres'>
      <label>Choose game genre:</label>
      <select
        onChange={handleGenreChange}
        className='genres__select'
        value={searchParams.get('gameGenre') || 'All genres'}
      >
        <option>All genres</option>
        {genres &&
          genres.map((genre) => (
            <option key={genre.id}>
              {genre.name}
            </option>
          ))}
      </select>
    </form>
  );
};
