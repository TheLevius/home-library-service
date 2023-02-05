import { Injectable } from '@nestjs/common';
import { Result } from 'src/db/interfaces/result.interface';
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

    findAll = (): Album[] => this.dbAlbumsTableService.findAll();

    findOneById = (id: string): Result<Album> => {
        return this.dbAlbumsTableService.findOneById(id);
    };

    create = (dto: CreateAlbumDto): Result<Album> =>
        this.dbAlbumsTableService.create(dto);

    update = (id: string, dto: UpdateAlbumDto): Result<Album> =>
        this.dbAlbumsTableService.update(id, dto);

    delete = (id: string): Result<Album> =>
        this.dbAlbumsTableService.delete(id);
}
