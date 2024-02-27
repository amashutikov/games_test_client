import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Header.scss';
import { VscMenu } from 'react-icons/vsc';
import { Menu } from '../Menu/Menu';

export const Header = () => {
  const location = useLocation();

  return (
    <div className='header'>
      <Logo />
      <div className='header__actions'>
        <div className='header__actions_links'>
          <Link
            to={'/'}
            className={`header__actions_link${
              location.pathname === '/' ? ' active' : ''
            }`}
          >
            HOME
          </Link>
          <Link
            to={'/games'}
            className={`header__actions_link${
              location.pathname === '/games' ? ' active' : ''
            }`}
          >
            GAMES
          </Link>
          <Link
            to={'/news'}
            className={`header__actions_link${
              location.pathname === '/news' ? ' active' : ''
            }`}
          >
            NEWS
          </Link>
        </div>

        <div className='header__menu' style={{ display: 'none' }}>
          <VscMenu color='white' size={28} />
        </div>
      </div>

      <div className='header__authorization '>
        <Menu />
      </div>
    </div>
  );
};
