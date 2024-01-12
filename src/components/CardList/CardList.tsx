import './CardList.scss';
import { useSelector } from 'react-redux';
import { Card } from '../Card/Card';
import { Game } from '../../types/Game';
import { RootState } from '../../types/RootState';

export const CardList = () => {
  const gamesToShow: Game[] = useSelector((state: RootState) => state.gamesToShow);

  return (
    <ul className='list'>
      {gamesToShow.map((game) => (
        <Card game={game} key={game.id} />
      ))}
    </ul>
  );
};
