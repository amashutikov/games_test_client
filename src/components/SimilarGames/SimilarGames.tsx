import { Typography } from '@mui/material';
import { Similar } from '../../types/Details';
import './SimilarGames.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  similarGames: Similar[];
};

export const SimilarGames: React.FC<Props> = ({ similarGames }) => {
  const [, setSearchParams] = useSearchParams();

  const handleClick = (gameId: number) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set('gameId', String(gameId));
      return updatedParams;
    });
  };

  return (
    <div className='similar'>
      {similarGames.map((similarGame) => (
        <div
          key={similarGame.id}
          className='similar__container'
          onClick={() => handleClick(similarGame.id)}
        >
          <img
            className='similar__image'
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${similarGame.cover.image_id}.jpg`}
            alt='Similar game image'
          />
          <Typography
            sx={{
              fontFamily: 'inherit',
              color: 'white',
              alignSelf: 'center',
              maxWidth: '198px',
              marginTop: '5px',
            }}
            variant='subtitle2'
          >
            {similarGame.name}
          </Typography>
        </div>
      ))}
    </div>
  );
};
