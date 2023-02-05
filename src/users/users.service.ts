import { BadRequestException, Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { Result } from 'src/db/interfaces/result.interface';
import { Statuses } from 'src/db/interfaces/statuses.interface';
import { User } from 'src/db/interfaces/user.interface';
import { DbUsersTableService } from 'src/db/table.users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private dbUsersTableService: DbUsersTableService) {}

    public findAll = () => this.dbUsersTableService.findAll();

    public findOneById = (id: string): Result<Omit<User, 'password'>> => {
        const result = this.dbUsersTableService.findOneById(id);
        if (result.status === Statuses.Failed) {
            return result;
        }
        delete result.row.password;
        return result;
    };

    public create = ({ login, password }: CreateUserDto): Result<User> => {
        return this.dbUsersTableService.create({
            login,
            password: this.hashPassword(password),
        });
    };

    public update = (id: string, dto: UpdatePasswordDto): Result<User> => {
        const result = this.dbUsersTableService.findOneById(id);
        if (result.status === Statuses.Failed) {
            return result;
        }
        const {
            row: { password },
        } = result;
        if (this.hashPassword(dto.oldPassword) !== password) {
            throw new BadRequestException('Bad Password');
        }
        return this.dbUsersTableService.update(id, {
            password: this.hashPassword(dto.newPassword),
        });
    };

    public delete = (id: string): Result<User> =>
        this.dbUsersTableService.delete(id);

    private hashPassword = (password: string): string =>
        createHash('sha256').update(password).digest('hex');
}
