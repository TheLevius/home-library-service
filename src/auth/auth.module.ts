import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.stategy';

@Module({
    imports: [DbModule, UsersModule, JwtModule.register({}), PassportModule],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
