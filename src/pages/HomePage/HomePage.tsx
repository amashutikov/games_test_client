import './HomePage.scss';
import ImageGallery from 'react-image-gallery';
import { getTitleImages } from '../../helpers/getTitleImages';
import { PreparedImages } from '../../types/PreparedImages';
import { CardCarousel } from '../../components/CardCarousel/CardCarousel';

export const HomePage = () => {
  const images: PreparedImages[] = getTitleImages([
    'ar2nxz',
    'ar1bqr',
    'ar5bh',
    'ar2d8r',
  ]);

  return (
    <div className='home_page'>
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

      <h1 className='home_page__subtitle'>Top games</h1>

      <CardCarousel />
    </div>
  );
};
