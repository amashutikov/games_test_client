export type Game = {
  gameImage: string;
  commonGameName: string;
  gameDescription: string;
  _id: string;
};

export interface G {
  id: number;
  age_ratings: number[];
  artworks: number[];
  category: number;
  cover: number;
  created_at: number;
  external_games: number[];
  first_release_date: number;
  genres: number[];
  name: string;
  platforms: number[];
  release_dates: number[];
  screenshots: number[];
  similar_games: number[];
  slug: string;
  summary: string;
  tags: number[];
  themes: number[];
  updated_at: number;
  url: string;
  websites: number[];
  checksum: string;
  language_supports: number[];
}
