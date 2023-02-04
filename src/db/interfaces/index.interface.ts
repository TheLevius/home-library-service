export interface DBSign {
    id: string; // UUID Primary Key
}
export interface DBFavoriteSign extends DBSign {
    favorite: boolean;
}
