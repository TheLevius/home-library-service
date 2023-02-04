import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateDBUserDto } from './dto/user/create-user.dto';
import { UpdateDBUserDto } from './dto/user/update-user.dto';
import { Result } from './interfaces/result.interface';
import { Statuses } from './interfaces/statuses.interface';
import { DBUser } from './interfaces/user.interface';

@Injectable()
export class DbUsersTableService {
    private table: DBUser[] = [];
    public findAll = (): DBUser[] => this.table.map((row) => ({ ...row }));
    public findOneById = (id: string): Result<DBUser> => {
        const index = this.table.findIndex((row: DBUser) => row.id === id);
        if (index < 0) {
            return { status: Statuses.Failed };
        }

        return {
            row: { ...this.table[index] },
            index,
            status: Statuses.Ok,
        };
    };
    public create = (dto: CreateDBUserDto): Result<DBUser> => {
        const currentDate = Date.now();
        const newUser: DBUser = {
            id: randomUUID(),
            login: dto.login,
            password: dto.password,
            createdAt: currentDate,
            updatedAt: currentDate,
            version: 1,
        };
        this.table.push(newUser);
        return { row: { ...newUser }, status: Statuses.Ok };
    };
    public update = (id: string, dto: UpdateDBUserDto): Result<DBUser> => {
        const result = this.findOneById(id);
        if (result.status === Statuses.Failed) {
            return result;
        }
        const { row, index } = result;
        row.version++;
        row.updatedAt = Date.now();
        this.table[index] = { ...row, ...dto };
        return { row: { ...this.table[index] }, status: Statuses.Ok };
    };
    public delete = (id: string): Result<DBUser> => {
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
