import './HomePage.scss';
import ImageGallery from 'react-image-gallery';
import { getTitleImages } from '../../helpers/getTitleImages';
import { PreparedImages } from '../../types/PreparedImages';
import { CardCarousel } from '../../components/CardCarousel/CardCarousel';
import { useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { GameDetailsModal } from '../../components/GameDetailsModal/GameDetailsModal';
import { useSearchParams } from 'react-router-dom';
import { NewsSection } from '../../components/NewsSection/NewsSection';

export const HomePage = () => {
  const [searchParams] = useSearchParams();

  const images: PreparedImages[] = getTitleImages([
    'ar2nxz',
    'ar1bqr',
    'ar5bh',
    'ar2d8r',
  ]);

  const [pageIsLoading, setPageIsLoading] = useState(false);

  const handleLoadingToggle = () => {
    setPageIsLoading(false);
  };

  return (
    <div className='home_page'>
      {pageIsLoading && <Loader />}

      <h1
        style={{
          fontSize: 45,
          fontWeight: '800',
          color: 'white',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        Home page!
      </h1>
      <div className='home_page__gallery'>
        <ImageGallery
          items={images}
          autoPlay={true}
          showPlayButton={false}
          showFullscreenButton={false}
          slideInterval={10000}
          lazyLoad={true}
        />
      </div>
      
      <div className='home_page__news'>
        <h2 className='home_page__subtitle'>Recent gaming news</h2>

        <NewsSection />
      </div>

      <h2 className='home_page__subtitle'>Top games</h2>

      <CardCarousel loadingToggle={handleLoadingToggle} />

      {searchParams.has('gameId') && <GameDetailsModal />}
    </div>
  );
};
