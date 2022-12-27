import { BaseContext } from 'koa';
import { hash, compare } from 'bcryptjs';
import jwt from '../services/jwt';
import { logger } from '../services/logger';
import { KoaNext } from '../interfaces/annotations';
import { ILoginParams, IUserOptions, IAuthResponse, ISignUpParams } from '@monosample/lib';
import { User } from '../services';

export async function login(ctx: BaseContext, next: KoaNext) {
  await next();
  if (!ctx.request.body || !ctx.request.body.email || !ctx.request.body.password) {
    ctx.response.status = 400;
    ctx.body = { error: 'Missing Fields' };
    return;
  }
  const payload: ILoginParams = { ...ctx.request.body };
  try {
    var creds = await User.findOne(
      { email: payload.email },
      ['email', 'password', 'id', 'username', 'firstname', 'lastname']
    );
  } catch (error) {
    logger.error(`${error.message} - ${new Date().toDateString()}`)
    ctx.response.status = 404;
    ctx.body = { error: 'User Not Found' };
  }

  if (!creds) {
    ctx.response.status = 404;
    ctx.body = { error: 'User Not Found' };
    return;
  }

  const valid = await compare(payload.password, creds.password);

  if (!valid) {
    ctx.response.status = 403;
    ctx.body = { error: 'Invalid Credentials' };
    return;
  }

  const token = await jwt.issueToken({ user: { id: creds.id, email: creds.email } });
  const finalUser: Partial<IUserOptions> = { ...creds, password: undefined };
  ctx.body = { token, user: finalUser } as IAuthResponse;
}

export async function signup(ctx: BaseContext, next: KoaNext) {
  await next();
  if (!ctx.request.body) {
    ctx.response.status = 400;
    ctx.body = { error: 'Missing Request Body' };
    return;
  }
  const payload: ISignUpParams = { ...ctx.request.body }
  payload.password = await hash(payload.password, 10);
  try {
    const user = await User.save(payload, ['id', 'email', "username", 'firstname', 'lastname']);
    const token = await jwt.issueToken({ user: { id: user.id, email: user.email } });
    ctx.body = { token, user } as IAuthResponse;
  } catch (error) {
    logger.warn(`[${__filename}]:[SignUp] - ${error.message}`);
    ctx.response.status = 422;
    if (error.code === 11000) {
      ctx.body = { error: 'That Email is already in use.' };
      return;
    }
    ctx.body = { error: 'Missing Request Body' };
    return;
  }
  ctx.response.status = 202;
}
