import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateDBArtistDto } from './dto/artist/create-artist.dto';
import { UpdateDBArtistDto } from './dto/artist/update-artist.dto';
import { DBArtist } from './interfaces/artist.interface';
import { Result } from './interfaces/result.interface';
import { Statuses } from './interfaces/statuses.interface';

@Injectable()
export class DbArtistsTableService {
    private table: DBArtist[] = [];
    public findAll = (): DBArtist[] => this.table.map((row) => ({ ...row }));
    public findAllFavorite = (): DBArtist[] =>
        this.table.filter((row) => row.favorite).map((row) => ({ ...row }));
    public findOneById = (id: string): Result<DBArtist> => {
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
    public create = (dto: CreateDBArtistDto): Result<DBArtist> => {
        const row: DBArtist = {
            id: randomUUID(),
            favorite: false,
            ...dto,
        };
        this.table.push({ ...row });
        return { row, status: Statuses.Ok };
    };
    public update = (id: string, dto: UpdateDBArtistDto): Result<DBArtist> => {
        const result = this.findOneById(id);
        if (result.status === Statuses.Failed) {
            return result;
        }
        const { row, index } = result;
        this.table[index] = { ...row, ...dto };
        return { row: { ...this.table[index] }, status: Statuses.Ok };
    };
    public delete = (id: string): Result<DBArtist> => {
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
