import { BaseContext } from 'koa';
import { logger } from '../services/logger';
import { KoaNext } from '../interfaces/annotations';
import { User } from '../services';
import { IPaginatedResult, IUserOptions } from '@monosample/lib';

export async function find(ctx: BaseContext, next: KoaNext) {
  await next();
  const [list, count] = await User.find();
  ctx.status = 200;
  ctx.body = { list, count } as IPaginatedResult<Partial<IUserOptions>>;
}

export async function findOne(ctx: BaseContext, next: KoaNext) {
  await next();
  logger.info(`${ctx.path}`);
}

export async function update(ctx: BaseContext, next: KoaNext) {
  await next();
  logger.info(`${ctx.path}`);
}

export async function del(ctx: BaseContext, next: KoaNext) {
  await next();
  logger.info(`${ctx.path}`);
}
