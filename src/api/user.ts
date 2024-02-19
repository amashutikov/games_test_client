import { userClient } from '../utils/UserClient';

export const getUserById = (id: string) => {
  return userClient.get(null, `/${id}`);
};

export const updateUserOnServer = (
  id: string,
  firstName?: string,
  secondName?: string,
  country?: string,
  image?: string
) => {
  return userClient.patch({ id, firstName, secondName, country, image }, '/');
};
