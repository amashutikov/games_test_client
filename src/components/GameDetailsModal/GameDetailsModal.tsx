import { Typography } from '@mui/material';
import './GameDetailsModal.scss';
import ImageGallery from 'react-image-gallery';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getGameDetails } from '../../api/games';
import { prepareImages } from '../../helpers/prepareImages';
import { PreparedImages } from '../../types/PreparedImages';
import { Details } from '../../types/Details';
import { Loader } from '../Loader/Loader';
import { CloseButton } from '../CloseButton/CloseButton';
import { SimilarGames } from '../SimilarGames/SimilarGames';
import { Storyline } from '../Storyline/Storyline';

export const GameDetailsModal = () => {
  const [images, setImages] = useState<PreparedImages[]>([]);
  const [game, setGame] = useState<Details | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setGame(undefined);

    document.body.classList.add('modal-open');

    const gameId = searchParams.get('gameId');

    if (gameId) {
      getGameDetails(gameId).then((res) => {
        setImages(prepareImages(res));
        setGame(res[0]);
      });
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [searchParams]);

  const handleCloseClick = () => {
    searchParams.delete('gameId');
    setSearchParams(searchParams);
  };

  return (
    <div className='modal' onClick={handleCloseClick}>
      {game ? (
        <div
          className='modal__container'
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            e.stopPropagation()
          }
        >
          <div className='modal__close' onClick={handleCloseClick}>
            <CloseButton />
          </div>

          <Typography
            variant='h3'
            sx={{
              fontFamily: 'inherit',
              fontWeight: '900',
              color: 'white',
              m: 2,
              mb: 0,
            }}
          >
            {game.name}
          </Typography>
          <div className='modal__showcase'>
            {game.artworks ? (
              <img
                style={{ flex: 6 }}
                className='modal__image'
                alt='banner'
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0].image_id}.jpg`}
              />
            ) : (
              <img
                style={{ flex: 6 }}
                className='modal__image'
                alt='banner'
                src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.screenshots[0].image_id}.jpg`}
              />
            )}

            <Typography
              sx={{ fontFamily: 'inherit', color: 'white', flex: 4, m: '20px' }}
              variant='body1'
            >
              {game.summary}
            </Typography>
          </div>

          {game.storyline && <Storyline storyline={game.storyline} />}

          <Typography
            sx={{
              fontFamily: 'inherit',
              color: 'white',
              alignSelf: 'flex-start',
              margin: '20px 0 10px 20px',
            }}
            variant='h4'
          >
            Screenshots:
          </Typography>

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

          <Typography
            sx={{
              fontFamily: 'inherit',
              color: 'white',
              alignSelf: 'flex-start',
              margin: '20px 0 10px 20px',
            }}
            variant='h4'
          >
            You may also like:
          </Typography>

          <SimilarGames similarGames={game.similar_games} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
