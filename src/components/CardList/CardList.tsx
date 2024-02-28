import './CardList.scss';
import { Card } from '../Card/Card';
import { Game } from '../../types/Game';
import { useSearchParams } from 'react-router-dom';
import { GameDetailsModal } from '../GameDetailsModal/GameDetailsModal';
import { useUser } from '../../contexts/UserContext';

type Props = {
  gamesToShow: Game[];
};

export const CardList: React.FC<Props> = ({ gamesToShow }) => {
  const { userData } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();

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
