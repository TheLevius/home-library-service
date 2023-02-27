import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Post,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Public()
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
    @Public()
    @Post('login')
    async login(@Body() dto: CreateUserDto) {
        try {
            const result = await this.authService.login(dto);
            return result;
        } catch (err) {
            console.error(err);
            throw new ForbiddenException('incorrect login or password');
        }
    }
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
