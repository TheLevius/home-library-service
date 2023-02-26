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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}
    @Get()
    async getAll() {
        const result = await this.artistsService.findAll();
        return result;
    }
    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        const result = this.artistsService.findOneById(id);
        return result;
    }
    @Post()
    async create(@Body() dto: CreateArtistDto) {
        const result = await this.artistsService.create(dto);
        return result;
    }
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateArtistDto
    ) {
        const result = await this.artistsService.update(id, dto);
        return result;
    }
    @HttpCode(204)
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.artistsService.delete(id);
        return result;
    }
}
