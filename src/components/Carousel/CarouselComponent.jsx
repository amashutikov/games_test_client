import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './CarouselComponent.scss';

const images = [
  'https://images.igdb.com/igdb/image/upload/t_original/ar5bh.jpg',
  'https://images.igdb.com/igdb/image/upload/t_original/ar2d8r.jpg',
  'https://images.igdb.com/igdb/image/upload/t_original/ar1bqr.jpg',
  'https://images.igdb.com/igdb/image/upload/t_original/ar2cn0.jpg',
];
const delay = 10000;

export const CarouselComponent = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const handleBackClick = () => {
    if (index === 0) {
      setIndex(images.length - 1);

      return;
    }

    setIndex((prevIndex) => prevIndex - 1);
  };

  const handleForwardClick = () => {
    if (index === images.length - 1) {
      setIndex(0);

      return;
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleForwardClick(),
    onSwipedRight: () => handleBackClick(),
  });

  return (
    <div className="slideshow" {...handlers}>
      <div className="slideshow__container">
        <div className="slideshow__back" onClick={handleBackClick}></div>

        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {images.map((image) => (
            <img src={image} alt="banner image" className="slide" key={image} />
          ))}
        </div>

        <div className="slideshow__forward" onClick={handleForwardClick}></div>
      </div>

      <div className="slideshowDots">
        {images.map((image, idx) => (
          <div
            key={image}
            className="slideshowDots__container"
            onClick={() => {
              setIndex(idx);
            }}
          >
            <div
              className={`slideshowDots__dot${index === idx ? ' active' : ''}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};