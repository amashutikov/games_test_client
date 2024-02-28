export interface UserData {
  email: string;
  id: string;
  firstName?: string;
  secondName?: string;
  country?: string;
  image?: string;
  likedGames: string[];
  logged: boolean;
}
