export interface UpdateDBAlbumDto {
    name?: string;
    year?: number;
    artistId?: string | null; // refers to Artist
    favorite?: boolean;
}
