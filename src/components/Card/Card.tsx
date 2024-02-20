import { Game } from '../../types/Game';
import './Card.scss';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useState } from 'react';
import { addLikedGame, removeLikedGame } from '../../api/user';
import { useUser } from '../../contexts/UserContext';

type Props = {
  game: Game;
  onClick: (gameId: number) => void;
  liked?: boolean;
};

const BASE_IMAGE_SRC = 'https://images.igdb.com/igdb/image/upload/t_720p/';

export const Card: React.FC<Props> = ({ game, onClick, liked = false }) => {
  const [hovered, setHovered] = useState(false);

  const { userData, updateUser } = useUser();

  const handleAddToFavorites = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    addLikedGame(userData.id, String(game.id))
      .then((res) => updateUser({ ...res }))
      .catch((err) => console.error(err));
  };

  const handleRemoveFromFavourites = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    removeLikedGame(userData.id, String(game.id))
      .then((res) => updateUser({ ...res }))
      .catch((err) => console.error(err));
  };

  return (
    <li
      className='card'
      onClick={() => onClick(game.id)}
      onTouchEnd={() => onClick(game.id)}
    >
      <img
        src={`${BASE_IMAGE_SRC + game.cover.image_id}.jpg`}
        className='card_image'
      />
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? (
          liked ? (
            <HeartBrokenIcon
              className='card__icon'
              onClick={(e) => handleRemoveFromFavourites(e)}
            />
          ) : (
            <FavoriteIcon
              className='card__icon'
              onClick={(e) => handleAddToFavorites(e)}
            />
          )
        ) : liked ? (
          <FavoriteIcon className='card__icon' />
        ) : (
          <FavoriteTwoToneIcon className='card__icon white' />
        )}
      </div>
      <div className='card_about'>
        <h4 className='card_title'>{game.name}</h4>
        <p className='card_description'>
          {game.summary.length > 0 && game.summary.slice(0, 118) + '...'}
        </p>
      </div>
    </li>
  );
};
