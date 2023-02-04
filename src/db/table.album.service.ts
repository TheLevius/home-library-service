import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateDBAlbumDto } from './dto/album/create-album.dto';
import { UpdateDBAlbumDto } from './dto/album/update-album.dto';
import { DBAlbum } from './interfaces/album.interface';
import { Result } from './interfaces/result.interface';
import { Statuses } from './interfaces/statuses.interface';

@Injectable()
export class DbAlbumsTableService {
    private table: DBAlbum[] = [];
    public findAll = (): DBAlbum[] => this.table.map((row) => ({ ...row }));
    public findAllFavorite = (): DBAlbum[] =>
        this.table.filter((row) => row.favorite).map((row) => ({ ...row }));
    public findOneById = (id: string): Result<DBAlbum> => {
        const index = this.table.findIndex((row) => row.id === id);
        if (index < 0) {
            return { status: Statuses.Failed };
        }

        return {
            row: { ...this.table[index] },
            index,
            status: Statuses.Ok,
        };
    };
    public create = (dto: CreateDBAlbumDto): Result<DBAlbum> => {
        const row: DBAlbum = {
            id: randomUUID(),
            favorite: false,
            artistId: null,
            ...dto,
        };
        this.table.push({ ...row });
        return { row, status: Statuses.Ok };
    };
    public update = (id: string, dto: UpdateDBAlbumDto): Result<DBAlbum> => {
        const result = this.findOneById(id);
        if (result.status === Statuses.Failed) {
            return result;
        }
        const { row, index } = result;
        this.table[index] = { ...row, ...dto };
        return { row: { ...this.table[index] }, status: Statuses.Ok };
    };
    public delete = (id: string): Result<DBAlbum> => {
        const result = this.findOneById(id);
        if (result.status === Statuses.Failed) {
            return result;
        }
        this.table = this.table.filter((row) => row.id !== id);
        return {
            row: result.row,
            status: Statuses.Ok,
        };
    };
}
