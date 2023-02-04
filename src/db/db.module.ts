import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbAlbumsTableService } from './table.album.service';
import { DbArtistsTableService } from './table.artist.service';
import { DbTracksTableService } from './table.track.service';
import { DbUsersTableService } from './table.users.service';

@Module({
    providers: [
        DbUsersTableService,
        DbArtistsTableService,
        DbTracksTableService,
        DbAlbumsTableService,
    ],
    controllers: [DbController],
    exports: [
        DbUsersTableService,
        DbArtistsTableService,
        DbTracksTableService,
        DbAlbumsTableService,
    ],
})
export class DbModule {}
