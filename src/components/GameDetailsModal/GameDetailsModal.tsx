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
    document.body.classList.add('modal-open');

    const gameId = searchParams.get('gameId');

    if (gameId) {
      getGameImages(gameId).then((res) => {
        setGame(res[0]);
        setImages(prepareImages(res));
      });
    }

    return () => {
      document.body.classList.remove('modal-open');
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

          <Typography
            variant='h3'
            sx={{
              fontFamily: 'inherit',
              fontWeight: '900',
              color: 'white',
              mt: 2,
            }}
          >
            {game.name}
          </Typography>

          <div className='modal__showcase'>
            <img
              className='modal__image'
              alt='banner'
              src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0].image_id}.jpg`}
            />

            <div className='modal__about'>
              <Typography
                sx={{ fontFamily: 'inherit', color: 'white' }}
                variant='body1'
              >
                {game.summary}
              </Typography>
            </div>
          </div>

          <div className='modal__gallery'>
            <ImageGallery
              items={images}
              autoPlay={true}
              showPlayButton={false}
              showFullscreenButton={false}
              showBullets={true}
              slideInterval={10000}
              lazyLoad={true}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
