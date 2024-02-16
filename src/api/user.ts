import { userClient } from '../utils/UserClient';

export const getUserById = (id: string) => {
  return userClient.get(null, `/${id}`);
};

export const getNews = (
  firstName: string = '',
  secondName: string = '',
  country: string = '',
  image: string = ''
) => {
  return userClient.patch({ firstName, secondName, country, image }, '');
};
