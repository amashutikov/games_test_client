import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Header.scss';
import { VscMenu, VscAccount } from 'react-icons/vsc';
import { useUser } from '../../contexts/UserContext';

export const Header = () => {
  const location = useLocation();
  const { userData } = useUser();

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
        {/* add header__authorization-authorized class if the user is authorized */}
        <VscAccount color='white' size={20} />
        {userData.email ? (
          <Link to={'/settings'}>
            {userData.firstName || userData.secondName || userData.email}
          </Link>
        ) : (
          <Link to={'/registration'}>Sign In</Link>
        )}
      </div>
    </div>
  );
};
