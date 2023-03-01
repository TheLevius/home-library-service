import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

const accessSecret = process.env.JWT_SECRET_KEY;
const refreshSecret = process.env.JWT_SECRET_REFRESH_KEY;
const tokenExpire = process.env.TOKEN_EXPIRE_TIME;
const tokenRefreshExpire = process.env.TOKEN_REFRESH_EXPIRE_TIME;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}
    create = async (dto: CreateUserDto) => {
        try {
            const result = await this.usersService.create(dto);
            return result;
        } catch (err) {
            throw new BadRequestException('no login or password');
        }
    };
    login = async (dto: CreateUserDto) => {
        try {
            const { login, id: userId } = await this.usersService.checkLogin(
                dto
            );
            const [accessToken, refreshToken] = await this.generateTokens({
                login,
                userId,
            });
            return {
                accessToken,
                refreshToken,
            };
        } catch (err) {
            console.error(err);
            throw new ForbiddenException('no login or password');
        }
    };
    refresh = async (dto: RefreshTokenDto) => {
        try {
            const { login, userId } = await this.jwtService.verifyAsync<{
                login: string;
                userId: string;
            }>(dto.refreshToken, {
                secret: refreshSecret,
            });
            const [accessToken, refreshToken] = await this.generateTokens({
                login,
                userId,
            });
            return {
                accessToken,
                refreshToken,
            };
        } catch (err) {
            console.error(err);
        }
    };

    generateTokens = async (payload: { login: string; userId: string }) => {
        return Promise.all([
            this.generateToken(payload, {
                secret: accessSecret,
                expiresIn: tokenExpire,
            }),
            this.generateToken(payload, {
                secret: refreshSecret,
                expiresIn: tokenRefreshExpire,
            }),
        ]);
    };
    generateToken = async (
        payload: { login: string; userId: string },
        { secret, expiresIn }: { secret: string; expiresIn: string }
    ) => this.jwtService.signAsync(payload, { secret, expiresIn });
}
