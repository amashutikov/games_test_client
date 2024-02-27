import './Menu.scss';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { initialUserData, useUser } from '../../contexts/UserContext';
import { authClient } from '../../utils/AuthClient';

export const Menu = () => {
  const { userData, updateUser } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isOpenClass, setIsOpenClass] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpenClass(false);

      setTimeout(() => {
        setMenuIsOpen(false);
        document.body.classList.remove('menu-open');
      }, 600);
    };

    if (menuIsOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuIsOpen]);

  const handleMenuOpen = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    document.body.classList.add('menu-open');

    setMenuIsOpen(true);

    setTimeout(() => setIsOpenClass(true));
  };

  const handleLogout = () => {
    authClient
      .logout()
      .then(() => {
        updateUser(initialUserData);
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='menu'>
      <MenuIcon
        fontSize='large'
        className='menu__icon'
        onClick={handleMenuOpen}
      />
      {menuIsOpen && (
        <div className={`menu__container ${isOpenClass ? 'open' : ''}`}>
          <Link to={'/'} className='menu__container_link'>
            <div
              className={`menu__container_item ${
                location.pathname === '/' ? ' active' : ''
              }`}
            >
              <HomeIcon />
              <h5>Home</h5>
            </div>
          </Link>

          <Link to={'/games'} className='menu__container_link'>
            <div
              className={`menu__container_item ${
                location.pathname === '/games' ? ' active' : ''
              }`}
            >
              <SportsEsportsIcon />
              <h5>Games</h5>
            </div>
          </Link>

          <Link to={'/news'} className='menu__container_link'>
            <div
              className={`menu__container_item ${
                location.pathname === '/news' ? ' active' : ''
              }`}
            >
              <ArticleIcon />
              <h5>News</h5>
            </div>
          </Link>

          <div className='menu__container_underline'></div>

          {userData.logged ? (
            <>
              <Link to={'/favorites'} className='menu__container_link'>
                <div
                  className={`menu__container_item ${
                    location.pathname === '/favorites' ? ' active' : ''
                  }`}
                >
                  <FavoriteIcon />
                  <h5>Favorites</h5>
                </div>
              </Link>

              <Link to={'/settings'} className='menu__container_link'>
                <div
                  className={`menu__container_item ${
                    location.pathname === '/settings' ? ' active' : ''
                  }`}
                >
                  <SettingsIcon />
                  <h5>Account settings</h5>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to={'/registration'} className='menu__container_link'>
                <div className='menu__container_item'>
                  <PersonAddIcon />
                  <h5>Sign In</h5>
                </div>
              </Link>

              <Link to={'/login'} className='menu__container_link'>
                <div className='menu__container_item'>
                  <LoginIcon />
                  <h5>Log In</h5>
                </div>
              </Link>
            </>
          )}

          {userData.logged && (
            <>
              <div className='menu__container_underline'></div>

              <div className='menu__container_item' onClick={handleLogout}>
                <LogoutIcon />
                <h5>Log Out</h5>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
