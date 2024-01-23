export type Details = {
  artworks: Artworks[];
  id: number;
  name: string;
  summary: string;
  screenshots: Screenshots[];
  storyline: string;
};

type Artworks = {
  url: string;
  id: number;
  image_id: string;
};

type Screenshots = {
  url: string;
  id: number;
  image_id: string;
};
