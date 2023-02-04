import { Injectable } from '@nestjs/common';
import { Result } from 'src/db/interfaces/result.interface';
import { DBUser } from 'src/db/interfaces/user.interface';
import { DbUsersTableService } from 'src/db/table.users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private dbUsersTableService: DbUsersTableService) {}

    public findAll = () => this.dbUsersTableService.findAll();
    public findOneById = (id: string): Result<DBUser> =>
        this.dbUsersTableService.findOneById(id);
    public create = (dto: CreateUserDto): Result<DBUser> => {
        return this.dbUsersTableService.create(dto);
    };
    public update = (id: string, dto: UpdateUserDto): Result<DBUser> => {
        return this.dbUsersTableService.update(id, dto);
    };
    public delete = (id: string): Result<DBUser> =>
        this.dbUsersTableService.delete(id);
}
