import { useEffect, useState } from 'react';
import './FavoritesPage.scss';
import { useUser } from '../../contexts/UserContext';
import { getFavoriteGames } from '../../api/games';
import { Game } from '../../types/Game';
import { CardList } from '../../components/CardList/CardList';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

export const FavoritesPage = () => {
  const { userData } = useUser();

  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (userData.likedGames.length === 0) {
      setLoading(false);
      setFavoriteGames([]);

      return;
    }

    getFavoriteGames(userData.likedGames)
      .then((res) => {
        setFavoriteGames(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [userData]);

  return (
    <div className='favorites'>
      {loading && <Loader />}
      <h1 className='favorites__title'>Favorite Games</h1>

      {favoriteGames.length > 0 ? (
        <>
          <CardList gamesToShow={favoriteGames} />
        </>
      ) : !loading ? (
        <div className='favorites__container'>
          <h1 className='favorites__title'>No games liked yet! 🎮</h1>
          <span className='favorites__text'>
            Go to <Link to={'/games'}>Games</Link> page to browse some 😉
          </span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
