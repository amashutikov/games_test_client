import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Header.scss';
import { VscMenu, VscAccount } from 'react-icons/vsc';
import { jwtDecode } from 'jwt-decode';

export const Header = () => {
  const location = useLocation();

  let user: { email: string; id: string } | null = null;
  const accessTokenCookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken'));

  if (accessTokenCookie) {
    const accessToken = accessTokenCookie.split('=')[1];

    const decodedToken: { email: string; id: string } = jwtDecode(accessToken);

    user = { email: decodedToken.email, id: decodedToken.id };
  }

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
      <Link to={'/settings'}>
        <div className='header__authorization header__authorization-authorized'>
          {/* add header__authorization-authorized class if the user is authorized */}
          <VscAccount color='white' size={20} />
          {user ? user?.email : <Link to={'/registration'}>Sign In</Link>}
        </div>
      </Link>
    </div>
  );
};
