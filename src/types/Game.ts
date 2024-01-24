export interface Game {
  id: number;
  artworks: Artwork[];
  name: string;
  slug: string;
  summary: string
  cover: Cover;
}

interface Artwork {
  id: number;
  image_id: string;
}

export type Cover = {
  id: number;
  image_id: string;
}
