import { decode, sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

/**
 * JsonWebToken Service to issue, decode and verify tokens
 * @class
 */
export class JwtService {
  jwtSecret: string;
  /**
   * works on top of the token if provided
   * @param {object?} token  Json Web Token provided to work with it
   */
  constructor(secret: string) {
    this.jwtSecret = secret;
  }

  /**
   * decodes a json web token
   * @param {string} token jwt to be decoded
   */
  decodeJwt(secret = this.jwtSecret) {
    try {
      let payload = decode(secret);
      if (payload) { return payload; }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * issues a json web token
   * @param {{ [x: string]: any }} payload Any Key/Value that you want to add to the token in question
   * @param {{ [x: string]: any }} options SignOptions from the jsonwebtoken lib
   */
  async issueToken(payload = {}, options = { expiresIn: '1 day' }) {
    const token = await sign(payload, this.jwtSecret, options);
    // All done.
    return token;
  }

  /**
   *
   * @param {string} secret token to be verified
   * @param {{ [x: string]: any }} options VeryfyOptions from the jsonwebtoken lib
   * @return {boolean}
   */
  verify(secret = this.jwtSecret, options = {}) {
    let valid = false;
    try {
      valid = !!verify(secret, this.jwtSecret, options);
    } catch (error) {
      throw new Error(error.message);
    }
    // All done.
    return valid;
  }
}

export default new JwtService(JWT_SECRET);