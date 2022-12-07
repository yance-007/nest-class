import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { jwtConstants } from '../constants';

const cookieExtractor = function (req: FastifyRequest) {
  let token = null;
  if (req && (req as any).cookies) {
    token = (req as any).cookies['jwt'];
  }
  return token;
};

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: jwtConstants.ignoreExpiration,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Payload): Promise<Payload> {
    return { ...payload };
  }
}
