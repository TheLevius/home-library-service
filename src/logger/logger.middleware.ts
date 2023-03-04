import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name);
    use(req: Request, res: Response, next: () => void) {
        this.logger.log(`Request URL: ${req.baseUrl}`);
        this.logger.verbose(
            `Request query params: ${JSON.stringify(req.query)}`
        );
        this.logger.verbose(
            `Request body: ${JSON.stringify(req.body, null, 2)}`
        );
        next();
        res.once('finish', () => {
            this.logger.log(`Response status code: ${res.statusCode}`);
        });
    }
}
