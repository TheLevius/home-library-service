import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
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
    create = (id: string, table: TableNames) => {
        const existResult = this[table].findOneById(id);
        if (existResult.status === Statuses.Failed) {
            throw new UnprocessableEntityException(
                `${table.slice(
                    0,
                    table.length - 1
                )} with id: ${id} does not exist`
            );
        }
        const result = {
            status: Statuses.Ok,
            row: id,
        };
        if (this.dbFavoritesTableService.isExist(id, table)) {
            return result;
        }
        this.dbFavoritesTableService.create(id, table);
        return result;
    };
    delete = (id: string, table: TableNames) => {
        if (!this.dbFavoritesTableService.isExist(id, table)) {
            throw new NotFoundException(
                `${table.slice(0, table.length - 1)} is not favorite`
            );
        }
        return {
            status: Statuses.Ok,
            row: this.dbFavoritesTableService.delete(id, table),
        };
    };
}
