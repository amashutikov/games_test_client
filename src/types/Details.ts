import { Cover } from './Game';

export type Details = {
  artworks: Artworks[];
  id: number;
  name: string;
  summary: string;
  screenshots: Screenshots[];
  storyline: string;
  similar_games: Similar[];
};

type Artworks = {
  url: string;
  id: number;
  image_id: string;
};

export type Similar = {
  id: number;
  cover: Cover;
  name: string;
};

type Screenshots = {
  url: string;
  id: number;
  image_id: string;
};
