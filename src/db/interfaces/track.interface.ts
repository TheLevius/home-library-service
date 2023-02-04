import { DBFavoriteSign } from './index.interface';

export interface DBTrack extends DBFavoriteSign {
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
}

export type Track = Omit<DBTrack, 'favorite'>;
