export interface Favorites {
    artists: string[]; // favorite artists ids
    albums: string[]; // favorite albums ids
    tracks: string[]; // favorite tracks ids
}

export interface DBFavoriteArtist {
    id: string; // Primary key
    artistId: string; // Foreign key
}

export interface DBFavoriteTrack {
    id: string; // Primary key
    trackId: string; //Foreign key
}

export interface DBFavoriteAlbum {
    id: string;
    albumId: string;
}
