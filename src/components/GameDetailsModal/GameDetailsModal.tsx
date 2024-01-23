import { Typography } from '@mui/material';
import './GameDetailsModal.scss';
import ImageGallery from 'react-image-gallery';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getGameImages } from '../../api/games';
import { prepareImages } from '../../utils/prepareImages';
import { PreparedImages } from '../../types/PreparedImages';
import { Details } from '../../types/Details';
import { Loader } from '../Loader/Loader';
import { CloseButton } from '../CloseButton/CloseButton';

export const GameDetailsModal = () => {
  const [images, setImages] = useState<PreparedImages[]>([]);
  const [game, setGame] = useState<Details | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const gameId = searchParams.get('gameId');

    if (gameId) {
      getGameImages(gameId).then((res) => {
        setGame(res[0]);
        setImages(prepareImages(res));
      });
    }

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

  const handleCloseClick = () => {
    searchParams.delete('gameId');
    setSearchParams(searchParams);
  };

  return (
    <div className='modal'>
      {game ? (
        <div className='modal__container'>
          <div className='modal__close' onClick={handleCloseClick}>
            <CloseButton />
          </div>

          <div className='modal__gallery'>
            <ImageGallery
              items={images}
              autoPlay={true}
              showPlayButton={false}
              showBullets={true}
              slideInterval={10000}
              lazyLoad={true}
            />
          </div>
          <div className='modal__about'>
            <Typography
              variant='h3'
              sx={{ fontFamily: 'inherit', fontWeight: '900', color: 'white' }}
            >
              {game.name}
            </Typography>

            <Typography
              sx={{ fontFamily: 'inherit', color: 'white' }}
              variant='body1'
            >
              {game.summary}
            </Typography>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
