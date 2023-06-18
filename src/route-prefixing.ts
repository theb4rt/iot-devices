import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoutePrefixingMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apiPrefix = this.configService.get<string>('api.prefix');
    const apiVersion = this.configService.get<string>('api.version');
    req.url = `${apiPrefix}/${apiVersion}/${req.url}`;
    next();
  }
}
