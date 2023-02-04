export interface CreateDBAlbumDto {
    name: string;
    year: number;
    artistId?: string | null; // refers to Artist
}
