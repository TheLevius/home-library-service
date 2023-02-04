import { Injectable } from '@nestjs/common';
import { DBArtist } from 'src/db/interfaces/artist.interface';
import { Result } from 'src/db/interfaces/result.interface';
import { Statuses } from 'src/db/interfaces/statuses.interface';
import { DbAlbumsTableService } from 'src/db/table.album.service';
import { DbArtistsTableService } from 'src/db/table.artist.service';
import { DbTracksTableService } from 'src/db/table.track.service';
import { DbUsersTableService } from 'src/db/table.users.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
    constructor(
        private readonly dbUsersTableService: DbUsersTableService,
        private readonly dbArtistsTableService: DbArtistsTableService,
        private readonly dbAlbumsTableService: DbAlbumsTableService,
        private readonly dbTracksTableService: DbTracksTableService
    ) {}

    findAll = (): Artist[] => {
        const result = this.dbArtistsTableService.findAll();
        return result.map(this.trimer);
    };

    findOneById = (id: string): Result<Artist> => {
        return this.trimResult(this.dbArtistsTableService.findOneById(id));
    };

    create = (dto: CreateArtistDto): Result<Artist> => {
        return this.trimResult(this.dbArtistsTableService.create(dto));
    };

    update = (id: string, dto: UpdateArtistDto): Result<Artist> => {
        return this.trimResult(this.dbArtistsTableService.update(id, dto));
    };

    delete = (id: string): Result<Artist> => {
        return this.trimResult(this.dbArtistsTableService.delete(id));
    };

    trimResult = (result: Result<DBArtist>): Result<Artist> => {
        if (result.status === Statuses.Failed) {
            return result;
        }
        delete result.row.favorite;
        return result;
    };

    trimer = (row: DBArtist): Artist => {
        delete row.favorite;
        return row;
    };
}
