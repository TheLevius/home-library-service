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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
    constructor(private readonly tracksService: TracksService) {}
    @Get()
    async getAll() {
        const result = await this.tracksService.findAll();
        return result;
    }
    @Get(':id')
    async getOne(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.tracksService.findOneById(id);
        return result;
    }
    @Post()
    async create(@Body() dto: CreateTrackDto) {
        const result = await this.tracksService.create(dto);
        return result;
    }
    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateTrackDto
    ) {
        const result = await this.tracksService.update(id, dto);
        return result;
    }
    @HttpCode(204)
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.tracksService.delete(id);
        return result;
    }
}
