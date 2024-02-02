import { useState, useEffect } from 'react';
import './GoToTopButton.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`top ${isVisible ? '' : 'hidden'}`}
      onClick={handleBackToTopClick}
    >
      <ArrowBackIosNewIcon className='top__icon' />
    </div>
  );
};
