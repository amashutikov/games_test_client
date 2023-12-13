import React from 'react';
import './Header.scss';
import { VscMenu, VscAccount } from 'react-icons/vsc';

export const Header = () => {
  return (
    <div className='header'>
      <h1 className='header__title'>Logo</h1>
      <div className='header__actions'>
        <div className='header__authorization'>
          {/* add header__authorization-authorized class if the user is authorized */}
          <VscAccount color='white' size={28} />
        </div>
        <div className='header__menu'>
          <VscMenu color='white' size={28} />
        </div>
      </div>
    </div>
  );
};
