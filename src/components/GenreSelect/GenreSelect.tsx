// import { useSelector, useDispatch } from 'react-redux';
// import { actions as selectedGenreActions } from '../../store/selectedGenre';
import './GenreSelect.scss';
// import { SelectedGenre } from '../../types/RootState';

// const options = Object.entries(SelectedGenre).map(([value, label]) => ({
//   value: value as SelectedGenre,
//   label: label as SelectedGenre,
// }));

export const GenreSelect = () => {
  // const genre = useSelector((state: RootState) => state.selectedGenre);

  // const dispatch = useDispatch();

  return (
    <form className='game-genre'>
      <label>Choose game genre:</label>
    </form>
  );
};
