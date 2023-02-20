import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { Statuses } from 'src/db/interfaces/statuses.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    async getAll() {
        const result = await this.usersService.findAll();
        return result;
    }
    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.usersService.findOneById(id);
        // if (result.status === Statuses.Failed) {
        //     throw new BadRequestException('User not found');
        // }
        return result;
    }
    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await this.usersService.create(dto);
    }
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdatePasswordDto
    ) {
        const result = await this.usersService.update(id, dto);
        // if (result.status === Statuses.Failed) {
        //     throw new BadRequestException('Bad Request');
        // }
        return result;
    }
    @HttpCode(204)
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.usersService.delete(id);
        // if (result.status === Statuses.Failed) {
        //     throw new BadRequestException('Bad Request');
        // }
        return result;
    }
}
