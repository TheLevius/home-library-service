import { DBFavoriteSign } from './index.interface';

export interface DBArtist extends DBFavoriteSign {
    name: string;
    grammy: boolean;
}

export type Artist = Omit<DBArtist, 'favorite'>;
