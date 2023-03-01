import { Body, Controller, Post } from '@nestjs/common';
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
        return this.authService.create(dto);
    }
    @Public()
    @Post('login')
    async login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }
    @Post('refresh')
    async refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refresh(dto);
    }
}
