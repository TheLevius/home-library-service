import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
    constructor(private prisma: PrismaService) {}

    findAll = async (): Promise<Track[]> => this.prisma.track.findMany();

    findOneById = async (id: string): Promise<Track> => {
        try {
            const result = await this.prisma.track.findUniqueOrThrow({
                where: { id },
            });
            return result;
        } catch (err) {
            console.error(err);
            throw new NotFoundException(`Track with id: ${id} not found`);
        }
    };

    create = async (dto: CreateTrackDto): Promise<Track> =>
        this.prisma.track.create({ data: dto });

    update = async (id: string, dto: UpdateTrackDto): Promise<Track> => {
        try {
            const result = await this.prisma.track.update({
                where: { id },
                data: dto,
            });
            return result;
        } catch (err) {
            console.error(err);
            throw new NotFoundException('Track was not found');
        }
    };

    delete = async (id: string): Promise<Track> => {
        try {
            const result = await this.prisma.track.delete({ where: { id } });
            return result;
        } catch (err) {
            console.error(err);
            throw new NotFoundException(`Track with id: ${id} does not exist`);
        }
    };
}
