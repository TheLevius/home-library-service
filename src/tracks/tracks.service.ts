import { Injectable } from '@nestjs/common';
import { Result } from 'src/db/interfaces/result.interface';
import { Statuses } from 'src/db/interfaces/statuses.interface';
import { DBTrack } from 'src/db/interfaces/track.interface';
import { DbAlbumsTableService } from 'src/db/table.album.service';
import { DbArtistsTableService } from 'src/db/table.artist.service';
import { DbTracksTableService } from 'src/db/table.track.service';
import { DbUsersTableService } from 'src/db/table.users.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
    constructor(
        private readonly dbUsersTableService: DbUsersTableService,
        private readonly dbArtistsTableService: DbArtistsTableService,
        private readonly dbAlbumsTableService: DbAlbumsTableService,
        private readonly dbTracksTableService: DbTracksTableService
    ) {}

    findAll = (): Track[] => {
        const result = this.dbTracksTableService.findAll();
        return result.map(this.trimer);
    };

    findOneById = (id: string): Result<Track> => {
        return this.trimResult(this.dbTracksTableService.findOneById(id));
    };

    create = (dto: CreateTrackDto): Result<Track> => {
        return this.trimResult(this.dbTracksTableService.create(dto));
    };

    update = (id: string, dto: UpdateTrackDto): Result<Track> => {
        return this.trimResult(this.dbTracksTableService.update(id, dto));
    };

    delete = (id: string): Result<Track> => {
        return this.trimResult(this.dbTracksTableService.delete(id));
    };

    trimResult = (result: Result<DBTrack>): Result<Track> => {
        if (result.status === Statuses.Failed) {
            return result;
        }
        delete result.row.favorite;
        return result;
    };

    trimer = (row: DBTrack): Track => {
        delete row.favorite;
        return row;
    };
}
