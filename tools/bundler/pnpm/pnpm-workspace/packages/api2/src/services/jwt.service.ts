import { Injectable } from '@nestjs/common';
import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private jwtKey: string;

  constructor() {
    this.jwtKey = process.env.JWT_KEY || 'ultra secret o:';
  }

  issueJwt(data: { [key: string]: any }, opts?: SignOptions) {
    const options = { expiresIn: '1d', ...opts }
    return sign(data, this.jwtKey, options);
  }

  getPayload(token: string, opts?: VerifyOptions) {
    const options: VerifyOptions = { ...opts };
    try {
      return verify(token, this.jwtKey, options);
    } catch (error) {
      return false;
    }
  }

}