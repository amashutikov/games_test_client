import CircularProgress from '@mui/material/CircularProgress';
import './SearchGames.scss';
import { useCallback, useEffect, useState } from 'react';
import { searchGames } from '../../api/games';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { GameDetailsModal } from '../GameDetailsModal/GameDetailsModal';

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
  const [dropDownIsLoading, setDropdownIsLoading] = useState(true);
  const [noMatches, setNoMatches] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedFetch = useCallback(
    debounce((searchValue) => {
      searchGames(searchValue)
        .then((res) => {
          if (res.length === 0) {
            setNoMatches(true);
          } else {
            setNoMatches(false);
          }
          setDropdownGames(res);
          setDropdownIsLoading(false);
        })
        .catch((err) => console.error(err));
    }, 500),
    []
  );

  useEffect(() => {
    setDropdownIsLoading(true);
    debouncedFetch(searchValue);
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value.trim().length === 0) {
      setDropdownGames([]);
    }
  };

  const handleDropdownItemClick = (gameId: number) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set('gameId', String(gameId));
      return updatedParams;
    });
  };

  const handleClearSearch = () => {
    setSearchValue('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = () => {
    if (searchValue.length === 0) {
      searchParams.delete('search');
      setSearchParams(searchParams);
      return;
    }

    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set('search', searchValue);
      return updatedParams;
    });
  };

  return (
    <div className='search'>
      {searchParams.has('gameId') && <GameDetailsModal />}
      <h4 className='search__title'>Search:</h4>
      <div className='search__container'>
        <input
          className={`search__input`}
          type='text'
          name='gamesSearch'
          placeholder={'Start typing'}
          value={searchValue}
          onChange={handleInputChange}
          onKeyUp={(e) => e.key === 'Enter' && handleSearchSubmit()}
        />
        {searchValue.length > 0 && (
          <ClearIcon
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '20px',
              color: 'inherit',
              cursor: 'pointer',
            }}
            onClick={handleClearSearch}
          />
        )}

        <SearchIcon
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '10px',
            color: 'inherit',
            cursor: 'pointer',
          }}
          onClick={handleSearchSubmit}
        />
        {searchValue.length > 0 && (
          <div className='search__dropdown'>
            {dropDownIsLoading && (
              <div className='search__dropdown_loader'>
                <CircularProgress size={20} color='inherit' />
              </div>
            )}
            {noMatches && !dropDownIsLoading && (
              <div className='search__dropdown_item'>
                <span className='search__dropdown_text'>
                  No games matching your query
                </span>
              </div>
            )}
            {dropdownGames.map((game) => (
              <div
                className='search__dropdown_item'
                key={game.id}
                onClick={() => handleDropdownItemClick(Number(game.id))}
              >
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
