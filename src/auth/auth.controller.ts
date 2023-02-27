import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() dto: CreateUserDto) {
        try {
            const result = await this.authService.create(dto);
            return result;
        } catch (err) {
            console.error(err);
            throw new BadRequestException('no login or password');
        }
    }

    @Post('login')
    async login(@Body() dto: CreateUserDto) {
        try {
            const result = await this.authService.login(dto);
            return result;
        } catch (err) {
            console.error(err);
            throw new ForbiddenException('no login or password');
        }
    }
    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    async refresh(@Body() dto: RefreshTokenDto) {
        try {
            const result = await this.authService.refresh(dto);
            return result;
        } catch (err) {
            console.error(err);
            throw new ForbiddenException('invalid token');
        }
    }
}
