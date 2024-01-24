
import './HomePage.scss';
import { CarouselComponent } from '../../components/Carousel/CarouselComponent';


export const HomePage = () => {
  return (
    <div className='home_page'>
      <h1 style={{ fontSize: 45, color: 'white' }}>Home page!</h1>
      <CarouselComponent />
    </div>
  );
};
