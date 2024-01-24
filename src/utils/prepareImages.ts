import { Details } from '../types/Details';
import { PreparedImages } from '../types/PreparedImages';

const BASE_ORIGINAL_IMAGE_SRC =
  'https://images.igdb.com/igdb/image/upload/t_720p/';
const BASE_FULLSCREEN_IMAGE_SRC =
  'https://images.igdb.com/igdb/image/upload/t_original/';

export const prepareImages = (data: Details[]) => {
  const result: PreparedImages[] = [];

  data[0].screenshots.forEach((screenshot) => {
    result.push({
      original: `${BASE_ORIGINAL_IMAGE_SRC + screenshot.image_id}.jpg`,
      thumbnail: screenshot.url,
      fullscreen: `${BASE_FULLSCREEN_IMAGE_SRC + screenshot.image_id}.jpg`,
      originalHeight: 400,
    });
  });

  return result;
};
