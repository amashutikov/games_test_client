import { Card } from '../Card/Card';
import './CardCarousel.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

export const CardCarousel = () => {
  const [, setSearchParams] = useSearchParams();
  const [carouselPosition, setCarouselPosition] = useState(0);

  useEffect((
    
  ) => {}, []);

  const navigate = useNavigate();

  const handleCardClick = (gameId: number) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      updatedParams.set('gameId', String(gameId));
      return updatedParams;
    });
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const totalCards = 8; // Adjust this to the total number of cards
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

  const game = {
    id: 88973,
    artworks: [
      {
        id: 14689,
        alpha_channel: false,
        animated: false,
        game: 88973,
        height: 1080,
        image_id: 'arbc1',
        url: '//images.igdb.com/igdb/image/upload/t_thumb/arbc1.jpg',
        width: 1920,
        checksum: 'ef4ff28f-dcf4-dc07-79eb-7c2cc08a7d8a',
      },
    ],
    cover: {
      id: 92497,
      alpha_channel: false,
      animated: false,
      game: 88973,
      height: 800,
      image_id: 'co1zdd',
      url: '//images.igdb.com/igdb/image/upload/t_thumb/co1zdd.jpg',
      width: 600,
      checksum: '4519fbae-714a-5b81-17cf-151df9907998',
    },
    name: 'Goblin Sword',
    slug: 'goblin-sword',
    summary:
      'Goblin Sword is a retro-inspired action platformer with light rpg elements.\n\nAn army of monsters led by an evil wizard have invaded your hometown. Slay as many monsters as you can, collect loot, avoid dangerous traps and defeat menacing bosses, before facing the evil wizard himself.\n\nReviews:\n“It\'s such a crazy value and has such good production quality it kind of speaks for itself.” 5/5 TouchArcade\n"Fun visuals, good music, engaging level design, and lots of content make Goblin Sword an excellent little game." Editor\'s Choice -148 Apps\n“A deeply compelling and staggeringly impressive tribute to retro games.” 10/10 ArcadeLife\n\nFeatures:\n-89 levels\n-13 bosses\n-30 weapons with unique special attacks\n-30 relics that grant you abilities\n-14 costumes\n-8 guardians that follow you around and assist you\n-5 secret very hard levels\n-Decorate your home with souvenirs\n-Customizable touch controls\n-Universal app. Works on iPad, iPhone and iPod touch.\n-iCloud and MFi support\n-Game Center achievements and leaderboards\n-Premium game. No IAP or ads ever.',
  };

  return (
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
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
            <div>
              <Card onClick={handleCardClick} game={game} />
            </div>
          </div>
        </div>
        <div
          className={`carousel__right ${
            carouselPosition <= (8 - 3) * -312 ? 'disabled' : ''
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
  );
};
