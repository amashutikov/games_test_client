import { useEffect, useState } from 'react';
import './FavoritesPage.scss';
import { useUser } from '../../contexts/UserContext';
import { getFavoriteGames } from '../../api/games';
import { Game } from '../../types/Game';
import { CardList } from '../../components/CardList/CardList';

export const FavoritesPage = () => {
  const { userData } = useUser();

  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    if (userData.likedGames.length === 0) {
      return;
    }

    getFavoriteGames(userData.likedGames)
      .then((res) => setFavoriteGames(res))
      .catch((err) => console.error(err));
  }, [userData]);

  return (
    <div className='favorites'>
      <h1 className='favorites__title'>FavoritesPage</h1>
      <CardList gamesToShow={favoriteGames} />
    </div>
  );
};
