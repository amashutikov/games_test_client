import React from 'react';
import './Card.scss';

export const Card = ({ game }) => {
  return (
    <li className='card'>
      <img src={game.gameImage} className='card_image' />
      <div className='card_about'>
        <h4 className='card_title'>{game.commonGameName}</h4>
        <p className='card_description'>
          {game.gameDescription.length > 0 &&
            game.gameDescription.slice(0, 118) + '...'}
        </p>
      </div>
    </li>
  );
};
