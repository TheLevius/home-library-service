import { Injectable } from '@nestjs/common';
import { TableNames } from 'src/db/interfaces/favorites.interface';
import { Statuses } from 'src/db/interfaces/statuses.interface';
import { DbAlbumsTableService } from 'src/db/table.album.service';
import { DbArtistsTableService } from 'src/db/table.artist.service';
import { DbFavoritesTableService } from 'src/db/table.favorites.service';
import { DbTracksTableService } from 'src/db/table.track.service';

@Injectable()
export class FavsService {
    constructor(
        private readonly artists: DbArtistsTableService,
        private readonly albums: DbAlbumsTableService,
        private readonly tracks: DbTracksTableService,
        private readonly dbFavoritesTableService: DbFavoritesTableService
    ) {}
    findAll = () => this.dbFavoritesTableService.findAll();
    findOneById = (id: string, table: TableNames) =>
        this.dbFavoritesTableService.findOneById(id, table);
    create = (id: string, table: TableNames) => {
        const existResult = this[table].findOneById(id);
        if (existResult.status === Statuses.Failed) {
            return existResult;
        }
        const checkResult = this.dbFavoritesTableService.findOneById(id, table);
        if (checkResult.status === Statuses.Failed) {
            return checkResult;
        }
        return {
            status: Statuses.Ok,
            row: this.dbFavoritesTableService.create(id, table),
        };
    };
    delete = (id: string, table: TableNames) => {
        const checkResult = this.dbFavoritesTableService.findOneById(id, table);
        if (checkResult.status === Statuses.Failed) {
            return checkResult;
        }
        return {
            status: Statuses.Ok,
            row: this.dbFavoritesTableService.delete(id, table),
        };
    };
}
