import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbUsersTableService } from 'src/db/table.users.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [DbModule],
    controllers: [UsersController],
    providers: [UsersService, DbUsersTableService],
})
export class UsersModule {}
