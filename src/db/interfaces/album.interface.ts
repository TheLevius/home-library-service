import { DBFavoriteSign } from './index.interface';

export interface DBAlbum extends DBFavoriteSign {
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}

export type Album = Omit<DBAlbum, 'favorite'>;
