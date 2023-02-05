import { Injectable } from '@nestjs/common';
import { Result } from 'src/db/interfaces/result.interface';
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

    findAll = (): Artist[] => this.dbArtistsTableService.findAll();

    findOneById = (id: string): Result<Artist> =>
        this.dbArtistsTableService.findOneById(id);

    create = (dto: CreateArtistDto): Result<Artist> =>
        this.dbArtistsTableService.create(dto);

    update = (id: string, dto: UpdateArtistDto): Result<Artist> =>
        this.dbArtistsTableService.update(id, dto);

    delete = (id: string): Result<Artist> =>
        this.dbArtistsTableService.delete(id);
}
