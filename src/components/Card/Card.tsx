import { Game } from '../../types/Game';
import './Card.scss';

type Props = {
  game: Game;
};

const BASE_IMAGE_SRC = 'https://images.igdb.com/igdb/image/upload/t_logo_med/'

export const Card: React.FC<Props> = ({ game }) => {
  return (
    <li className='card'>
      <img src={`${BASE_IMAGE_SRC + game.artworks[0].image_id}.jpeg`} className='card_image' />
      {/* <div className='card_about'>
        <h4 className='card_title'>{game.commonGameName}</h4>
        <p className='card_description'>
          {game.gameDescription.length > 0 &&
            game.gameDescription.slice(0, 118) + '...'}
        </p>
      </div> */}
    </li>
  );
};
