export const generatePages = (currentPage: number, numberOfPages: number) => {
  if (numberOfPages <= 7) {
    return Array.from({ length: numberOfPages }, (_, index) => index + 1);
  }

  if (currentPage < 5) {
    return [1, 2, 3, 4, 5, '...', numberOfPages];
  }

  if (currentPage >= 5 && currentPage < numberOfPages - 3) {
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      numberOfPages,
    ];
  }

  return [
    1,
    '...',
    numberOfPages - 4,
    numberOfPages - 3,
    numberOfPages - 2,
    numberOfPages - 1,
    numberOfPages,
  ];
};
