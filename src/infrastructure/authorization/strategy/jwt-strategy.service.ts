import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { passportJwtSecret } from 'jwks-rsa';
import { join } from 'node:path';
import { ExtractJwt, Strategy } from 'passport-jwt';

dotenv.config({
  path: join(process.cwd(), 'environments', `.env.${process.env.SCOPE}`),
});

/**
 * @class JwtStrategy
 * @classdesc Estrategia de autenticación basada en JSON Web Token (JWT) para Passport.
 * @extends PassportStrategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @constructor
   */
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  /**
   * Valida el payload del token JWT.
   * @param {unknown} payload - El payload del token JWT.
   * @returns {unknown} El payload validado.
   */
  validate(payload: unknown): unknown {
    return payload;
  }
}
