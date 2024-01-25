import './Pagination.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1001];

export const Pagination = () => {
  // Assuming data is an array of page numbers
  const currentPage = 1; // Replace with the actual current page

  // Function to generate an array of page numbers based on current page
  const generatePages = () => {
    if (data.length <= 5) {
      return data;
    }

    const pages = [1, 2, '...', data.length - 1, data.length];

    // If the current page is one of the first two, remove the ellipsis
    if (currentPage <= 2) {
      pages.splice(2, 1, 3);
    }

    // If the current page is one of the last two, remove the ellipsis
    if (currentPage >= data.length - 1) {
      pages.splice(3, 1, data.length - 2);
    }

    return pages;
  };

  return (
    <div className='pagination'>
      <ArrowCircleLeftIcon className='pagination__arrow' fontSize='large' />

      <div className='pagination__container'>
        {generatePages().map((el, i) => (
          <div
            key={i}
            className={`pagination__container_element ${
              el === currentPage ? 'active' : ''
            }`}
          >
            {el}
          </div>
        ))}
      </div>

      <ArrowCircleRightIcon className='pagination__arrow' fontSize='large' />
    </div>
  );
};
