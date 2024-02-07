import { PreparedImages } from '../types/PreparedImages';

const BASE_ORIGINAL_IMAGE_SRC =
  'https://images.igdb.com/igdb/image/upload/t_original/';

export const getTitleImages = (ids: string[]) => {
  const preparedImages: PreparedImages[] = ids.map((id) => ({
    original: `${BASE_ORIGINAL_IMAGE_SRC + id}.jpg`,
  }));

  return preparedImages;
};
