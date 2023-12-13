import React from 'react';
import './CardList.scss';
import { useSelector } from 'react-redux';
import { Card } from '../Card/Card';

export const CardList = () => {
  const gamesToShow = useSelector((state) => state.gamesToShow);

  return (
    <ul className='list'>
      {gamesToShow.map(game => (
        <Card game={game} key={game._id}/>
      ))}
    </ul>
  );
};
