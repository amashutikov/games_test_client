import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { actions as selectedGenreActions } from '../../store/selectedGenre';
import './GenreSelect.scss';

const options = [
  { value: 'FREE', label: 'FREE' },
  { value: 'MOBA', label: 'MOBA' },
  { value: 'SHOOTERS', label: 'SHOOTERS' },
  { value: 'LAUNCHERS', label: 'LAUNCHERS' },
  { value: 'MMORPG', label: 'MMORPG' },
  { value: 'STRATEGY', label: 'STRATEGY' },
  { value: 'FIGHTING', label: 'FIGHTING' },
  { value: 'RACING', label: 'RACING' },
  { value: 'SURVIVAL', label: 'SURVIVAL' },
  { value: 'ONLINE', label: 'ONLINE' },
];

export const GenreSelect = () => {
  const genre = useSelector((state) => state.selectedGenre);

  const dispatch = useDispatch();

  return (
    <form className='game-genre'>
      <label>Choose game genre:</label>
      <Select
        options={options}
        onChange={(e) => dispatch(selectedGenreActions.change(e))}
        value={options.filter((option) => option === genre)}
        label='Single select'
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: 'green',
            primary: 'black',
          },
        })}
      />
    </form>
  );
};
