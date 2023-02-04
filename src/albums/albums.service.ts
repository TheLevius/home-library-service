import { Injectable } from '@nestjs/common';
import { DBAlbum } from 'src/db/interfaces/album.interface';
import { Result } from 'src/db/interfaces/result.interface';
import { Statuses } from 'src/db/interfaces/statuses.interface';
import { DbAlbumsTableService } from 'src/db/table.album.service';
import { DbArtistsTableService } from 'src/db/table.artist.service';
import { DbTracksTableService } from 'src/db/table.track.service';
import { DbUsersTableService } from 'src/db/table.users.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
    constructor(
        private readonly dbUsersTableService: DbUsersTableService,
        private readonly dbArtistsTableService: DbArtistsTableService,
        private readonly dbAlbumsTableService: DbAlbumsTableService,
        private readonly dbTracksTableService: DbTracksTableService
    ) {}

    findAll = (): Album[] => {
        const result = this.dbAlbumsTableService.findAll();
        return result.map(this.trimer);
    };

    findOneById = (id: string): Result<Album> => {
        return this.trimResult(this.dbAlbumsTableService.findOneById(id));
    };

    create = (dto: CreateAlbumDto): Result<Album> => {
        return this.trimResult(this.dbAlbumsTableService.create(dto));
    };

    update = (id: string, dto: UpdateAlbumDto): Result<Album> => {
        return this.trimResult(this.dbAlbumsTableService.update(id, dto));
    };

    delete = (id: string): Result<Album> => {
        return this.trimResult(this.dbAlbumsTableService.delete(id));
    };

    trimResult = (result: Result<DBAlbum>): Result<Album> => {
        if (result.status === Statuses.Failed) {
            return result;
        }
        delete result.row.favorite;
        return result;
    };

    trimer = (row: DBAlbum): Album => {
        delete row.favorite;
        return row;
    };
}
