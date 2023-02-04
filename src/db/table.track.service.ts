import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateDBTrackDto } from './dto/track/create-track.dto';
import { UpdateDBTrackDto } from './dto/track/update-track.dto';
import { Result } from './interfaces/result.interface';
import { Statuses } from './interfaces/statuses.interface';
import { DBTrack } from './interfaces/track.interface';

@Injectable()
export class DbTracksTableService {
    private table: DBTrack[] = [];
    public findAll = (): DBTrack[] => this.table.map((row) => ({ ...row }));
    public findAllFavorite = (): DBTrack[] =>
        this.table.filter((row) => row.favorite).map((row) => ({ ...row }));
    public findOneById = (id: string): Result<DBTrack> => {
        const index = this.table.findIndex((row: DBTrack) => row.id === id);
        if (index < 0) {
            return { status: Statuses.Failed };
        }

        return {
            row: { ...this.table[index] },
            index,
            status: Statuses.Ok,
        };
    };
    public create = (dto: CreateDBTrackDto): Result<DBTrack> => {
        const row: DBTrack = {
            id: randomUUID(),
            favorite: false,
            artistId: null,
            albumId: null,
            ...dto,
        };
        this.table.push({ ...row });
        return { row, status: Statuses.Ok };
    };
    public update = (id: string, dto: UpdateDBTrackDto): Result<DBTrack> => {
        const result = this.findOneById(id);
        if (result.status === Statuses.Failed) {
            return result;
        }
        const { row, index } = result;
        this.table[index] = { ...row, ...dto };
        return { row: { ...this.table[index] }, status: Statuses.Ok };
    };
    public delete = (id: string): Result<DBTrack> => {
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
