import { Injectable } from '@nestjs/common';
import { Favorites, TableNames } from './interfaces/favorites.interface';
import { Result } from './interfaces/result.interface';
import { Statuses } from './interfaces/statuses.interface';

@Injectable()
export class DbFavoritesTableService {
    private readonly schema: Favorites = {
        artists: [],
        albums: [],
        tracks: [],
    };
    findAll = (): Favorites => ({
        artists: this.schema.artists.slice(),
        albums: this.schema.albums.slice(),
        tracks: this.schema.tracks.slice(),
    });
    findAllTableOf = (table: TableNames): string[] =>
        this.schema[table].slice();
    findOneById = (id: string, table: TableNames): Result<string> => {
        const index = this.schema[table].findIndex((tableId) => tableId === id);
        if (index < 0) {
            return {
                status: Statuses.Failed,
            };
        }
        return {
            status: Statuses.Ok,
            row: this.schema[table][index],
        };
    };

    create = (id: string, table: TableNames): string => {
        this.schema[table].push(id);
        return id;
    };
    delete = (id: string, table: TableNames): string => {
        this.schema[table] = this.schema[table].filter(
            (tableId) => tableId !== id
        );
        return id;
    };
}
