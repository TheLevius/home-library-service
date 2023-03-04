import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { MyLoggerService } from './logger.service';
import { MyExceptionFilter } from './MyExceptionsFilter.service';

@Module({
    providers: [MyLoggerService, LoggerMiddleware, MyExceptionFilter],
    exports: [MyLoggerService, LoggerMiddleware, MyExceptionFilter],
})
export class LoggerModule {}
