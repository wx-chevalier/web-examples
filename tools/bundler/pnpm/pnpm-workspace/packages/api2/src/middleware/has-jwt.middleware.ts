import { Response, Request, NextFunction } from 'express';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../services';

@Injectable()
export class AuthJwtMiddleware implements NestMiddleware {

  constructor(private $jwt: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    if (!authHeader) { return next(new UnauthorizedException('No Authorization header in request')); }
    const [bearer, token] = authHeader.split(' ');
    if (!bearer || !token) { return next(new UnauthorizedException('Wrong format for authorization header, please use: `Bearer Token`')); }

    const decoded = this.$jwt.getPayload(token);
    if (!decoded) { return next(new UnauthorizedException('Invalid Jwt')); }
    (req as any).token = token;
    (req as any).user = (decoded as any).user;
    next();
  }

}