import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { createHash } from 'node:crypto';
import { Result } from 'src/db/interfaces/result.interface';
import { Statuses } from 'src/db/interfaces/statuses.interface';
import { User } from 'src/db/interfaces/user.interface';
import { DbUsersTableService } from 'src/db/table.users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User as UserPrisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private dbUsersTableService: DbUsersTableService,
        private prisma: PrismaService
    ) {}

    public findAll = async () => {
        const users = await this.prisma.user.findMany();
        return users.map(this.trimmer);
    };

    public findOneById = async (
        id: string
    ): Promise<Omit<User, 'password'>> => {
        // this.trimPassword(this.dbUsersTableService.findOneById(id));
        const result = await this.prisma.user.findUnique({ where: { id } });
        return this.trimmer(result);
    };

    public create = async ({
        login,
        password,
    }: CreateUserDto): Promise<Omit<UserPrisma, 'password'>> => {
        const result = await this.prisma.user.create({
            data: {
                login,
                password: this.hashPassword(password),
            },
        });
        // const result = this.dbUsersTableService.create({
        //     login,
        //     password: this.hashPassword(password),
        // });

        return this.trimmer(result);
        // return this.trimPassword(result);
    };

    public update = async (
        id: string,
        dto: UpdatePasswordDto
    ): Promise<Omit<User, 'password'>> => {
        let user: UserPrisma;
        try {
            user = await this.prisma.user.findUnique({ where: { id } });
        } catch (err) {
            console.log(err);
            throw new NotFoundException('User not found');
        }
        if (this.hashPassword(dto.oldPassword) !== user.password) {
            throw new ForbiddenException(`oldPassword is wrong`);
        }

        const result = await this.prisma.user.update({
            where: { id },
            data: { password: dto.newPassword, version: ++user.version },
        });
        return this.trimmer(result);
        // const existResult = this.dbUsersTableService.findOneById(id);
        // if (existResult.status === Statuses.Failed) {
        //     throw new NotFoundException('User not found');
        // }
        // const {
        //     row: { password },
        // } = existResult;
        // if (this.hashPassword(dto.oldPassword) !== password) {
        //     throw new ForbiddenException(`oldPassowrd is wrong`);
        // }
        // const result = this.dbUsersTableService.update(id, {
        //     password: this.hashPassword(dto.newPassword),
        // });
        // return this.trimPassword(result);
    };

    public delete = async (id: string): Promise<Omit<User, 'password'>> => {
        try {
            const result = await this.prisma.user.delete({ where: { id } });
            return this.trimmer(result);
        } catch (err) {
            console.log(err);
            throw new BadRequestException('Bad Request');
        }
        // this.trimPassword(this.dbUsersTableService.delete(id));
    };

    private hashPassword = (password: string): string =>
        createHash('sha256').update(password).digest('hex');

    private trimPassword = (
        result: Result<User>
    ): Result<Omit<User, 'password'>> => {
        if (result.status === Statuses.Failed) {
            throw new NotFoundException('User not');
        }
        delete result.row.password;
        return result;
    };
    private trimmer = (user) => {
        delete user.password;
        return user;
    };
}
