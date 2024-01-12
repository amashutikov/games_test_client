export interface Game {
  id: number;
  artworks: Artwork[];
  name: string;
  slug: string;
  summary: string
}

interface Artwork {
  id: number;
  image_id: string;
}
