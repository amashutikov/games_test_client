import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      to={'/'}
      onClick={handleLogoClick}
      style={{ display: 'block', width: 'max-content' }}
    >
      <h1 className='logo'>Logo</h1>
    </Link>
  );
};
