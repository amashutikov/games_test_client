import { Game } from '../../types/Game';
import './Card.scss';

type Props = {
  game: Game;
};

const BASE_IMAGE_SRC = 'https://images.igdb.com/igdb/image/upload/t_720p/'

export const Card: React.FC<Props> = ({ game }) => {
  console.log(game);

  return (
    <li className='card'>
      <img src={`${BASE_IMAGE_SRC + game.artworks[0].image_id}.jpg`} className='card_image' />
      <div className='card_about'>
        <h4 className='card_title'>{game.name}</h4>
        <p className='card_description'>
          {game.summary.length > 0 &&
            game.summary.slice(0, 118) + '...'}
        </p>
      </div>
    </li>
  );
};
