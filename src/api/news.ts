import { newsClient } from '../utils/NewsClient';

export const getNewsById = (id: string) => {
  return newsClient.get(null, `/${id}`);
};

export const getNews = (limit: number = 0, offset: number = 0) => {
  return newsClient.post({ limit, offset }, '');
};
 