import { Card } from '../Card/Card';
import './CardCarousel.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getTopGames } from '../../api/games';
import { Game } from '../../types/Game';

export const CardCarousel = () => {
  const [, setSearchParams] = useSearchParams();
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [games, setGames] = useState<Game[]>([]);

  const totalCards = 24; // Adjust this to the total number of cards

  useEffect(() => {
    getTopGames(totalCards).then((res) => {
      setGames(res);
    });
  }, []);

  const navigate = useNavigate();

  const handleCardClick = (gameId: number) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set('gameId', String(gameId));
      return updatedParams;
    });
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const maxPosition = (totalCards - 3) * -312; // Calculate the maximum position

    if (direction === 'left' && carouselPosition === 0) {
      return;
    }

    if (direction === 'right' && carouselPosition <= maxPosition) {
      return;
    }

    const newPosition =
      direction === 'left' ? carouselPosition + 312 : carouselPosition - 312;
    setCarouselPosition(newPosition);
  };

  const handleShowAllClick = () => {
    navigate('/games');
  };

  return games.length > 0 ? (
    <div className='carousel'>
      <div className='carousel__container'>
        <div
          onClick={() => handleArrowClick('left')}
          className={`carousel__left ${carouselPosition === 0 && 'disabled'}`}
        >
          <ChevronLeftIcon />
        </div>
        <div className='carousel__card_container'>
          <div
            className='carousel__slide'
            style={{ transform: `translateX(${carouselPosition}px)` }}
          >
            {games.map((game) => (
              <div key={game.id}>
                <Card onClick={handleCardClick} game={game} />
              </div>
            ))}
          </div>
        </div>
        <div
          className={`carousel__right ${
            carouselPosition <= (totalCards - 3) * -312 ? 'disabled' : ''
          }`}
          onClick={() => handleArrowClick('right')}
        >
          <ChevronRightIcon />
        </div>
      </div>
      <Button
        variant='contained'
        type='submit'
        fullWidth
        size='medium'
        onClick={handleShowAllClick}
        sx={{
          backgroundColor: '#3f9c13',
          transitionDuration: '1000ms',
          fontFamily: 'inherit',
          maxWidth: '200px',
          height: '40px',
          '&:hover': {
            transform: 'scale(100.5%)',
            backgroundColor: '#3f9c13',
          },
          alignSelf: 'center',
        }}
      >
        Show all
      </Button>
    </div>
  ) : null;
};
