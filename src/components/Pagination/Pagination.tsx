import './Pagination.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { generatePages } from '../../helpers/generatePages';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );

  useEffect(() => {
    if (currentPage !== 1) {
      setSearchParams((params) => {
        const updatedParams = new URLSearchParams(params);
        updatedParams.set('page', String(currentPage));
        return updatedParams;
      });

      return;
    }

    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [currentPage]);

  const handleNextPageClick = () => {
    if (currentPage >= data.length) {
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
        {generatePages(currentPage, data.length).map((el, i) => (
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
          currentPage === data.length ? 'disabled' : ''
        }`}
        fontSize='large'
      />
    </div>
  );
};
