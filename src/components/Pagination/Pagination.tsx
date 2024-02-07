import './Pagination.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { generatePages } from '../../helpers/generatePages';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  gamesCount: number;
};

export const Pagination: React.FC<Props> = ({ gamesCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );

  const numberOfPages = Math.floor(gamesCount / 24);

  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams((params) => {
        const updatedParams = new URLSearchParams(params);
        updatedParams.set('page', String(currentPage));
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return updatedParams;
      });

      return;
    }

    searchParams.delete('page');
    setSearchParams(searchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNextPageClick = () => {
    if (currentPage >= numberOfPages) {
      return;
    }

    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPageClick = () => {
    if (currentPage <= 1) {
      return;
    }

    setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'string') {
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className='pagination'>
      <ArrowCircleLeftIcon
        onClick={handlePrevPageClick}
        className={`pagination__arrow ${currentPage === 1 ? 'disabled' : ''}`}
        fontSize='large'
      />

      <div className='pagination__container'>
        {generatePages(currentPage, numberOfPages).map((el, i) => (
          <div
            key={i}
            className={`pagination__container_element ${
              el === currentPage ? 'active' : ''
            } ${typeof el === 'string' ? 'dots' : ''}`}
            onClick={() => handlePageChange(el)}
          >
            {el}
          </div>
        ))}
      </div>

      <ArrowCircleRightIcon
        onClick={handleNextPageClick}
        className={`pagination__arrow ${
          currentPage === numberOfPages ? 'disabled' : ''
        }`}
        fontSize='large'
      />
    </div>
  );
};
