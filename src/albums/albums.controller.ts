import {
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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}
    @Get()
    async getAll() {
        return this.albumsService.findAll();
    }
    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.albumsService.findOneById(id);
        return result;
    }
    @Post()
    async create(@Body() dto: CreateAlbumDto) {
        const result = await this.albumsService.create(dto);
        return result;
    }
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateAlbumDto
    ) {
        const result = await this.albumsService.update(id, dto);
        return result;
    }
    @HttpCode(204)
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.albumsService.delete(id);
        return result;
    }
}
