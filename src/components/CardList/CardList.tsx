import './CardList.scss';
import { useSelector } from 'react-redux';
import { Card } from '../Card/Card';
import { Game } from '../../types/Game';
import { RootState } from '../../types/RootState';
import { useSearchParams } from 'react-router-dom';
import { GameDetailsModal } from '../GameDetailsModal/GameDetailsModal';
import { useUser } from '../../contexts/UserContext';

export const CardList = () => {
  const { userData } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();

  const gamesToShow: Game[] = useSelector(
    (state: RootState) => state.gamesToShow
  );

  const handleCardClick = (gameId: number) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set('gameId', String(gameId));
      return updatedParams;
    });
  };

  return (
    <ul className='list'>
      {searchParams.has('gameId') && <GameDetailsModal />}
      {gamesToShow.map((game) => (
        <Card
          game={game}
          key={game.id}
          onClick={handleCardClick}
          liked={userData.likedGames?.includes(String(game.id))}
        />
      ))}
    </ul>
  );
};
