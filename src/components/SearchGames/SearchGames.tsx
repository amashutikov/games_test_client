import CircularProgress from '@mui/material/CircularProgress';
import './SearchGames.scss';
import { useCallback, useEffect, useState } from 'react';
import { searchGames } from '../../api/games';
import debounce from 'lodash.debounce';

type GameSearch = {
  id: string;
  name: string;
  cover: {
    id: string;
    image_id: string;
  };
};

export const SearchGames = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownGames, setDropdownGames] = useState<GameSearch[]>([]);
  const [dropDownIsLoading, setDropdownIsLoading] = useState(false);

  const debouncedFetch = useCallback(
    debounce((searchValue) => {
      setDropdownIsLoading(true);
      searchGames(searchValue)
        .then((res) => {
          setDropdownGames(res);
          setDropdownIsLoading(false);
        })
        .catch((err) => console.error(err));
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(searchValue);
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className='search'>
      <h4 className='search__title'>Search:</h4>
      <div className='search__container'>
        <input
          className={`search__input`}
          type='text'
          name='gamesSearch'
          placeholder={'Start typing'}
          value={searchValue}
          onChange={handleInputChange}
        />
        {searchValue.length > 0 && (
          <div className='search__dropdown'>
            {dropDownIsLoading && (
              <CircularProgress
                size={20}
                color='inherit'
                className='search__dropdown_loader'
              />
            )}
            {dropdownGames.map((game) => (
              <div className='search__dropdown_item' key={game.id}>
                <img
                  className='search__dropdown_image'
                  alt='game image'
                  src={`https://images.igdb.com/igdb/image/upload/t_thumb/${game.cover.image_id}.jpg`}
                />
                <span className='search__dropdown_text'>{game.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
