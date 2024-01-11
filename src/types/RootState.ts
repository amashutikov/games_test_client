import { Game } from './Game';

export enum SelectedGenre {
  FREE = 'FREE',
  MOBA = 'MOBA',
  SHOOTERS = 'SHOOTERS',
  LAUNCHERS = 'LAUNCHERS',
  MMORPG = 'MMORPG',
  STRATEGY = 'STRATEGY',
  FIGHTING = 'FIGHTING',
  RACING = 'RACING',
  SURVIVAL = 'SURVIVAL',
  ONLINE = 'ONLINE',
}

export type RootState = {
  gamesToShow: Game[];
  selectedGenre: SelectedGenre;
};
