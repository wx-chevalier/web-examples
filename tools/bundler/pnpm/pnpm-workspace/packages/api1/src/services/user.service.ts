import { knex } from './database';
import { IUserOptions } from '@monosample/lib';


export class User {

  static readonly defaultSelections: Array<keyof IUserOptions> = [
    "id",
    "email",
    "username",
    "firstname",
    "lastname",
    "createdAt",
    "updatedAt"
  ];

  static find(
    user?: Partial<IUserOptions>,
    selects: Array<keyof IUserOptions | '*'> = this.defaultSelections,
    page = 1,
    limit = 10,
    orderBy: Array<{ column: keyof Partial<IUserOptions>; order: 'asc' | 'desc' }> = [{ column: 'createdAt', order: 'desc' }]
  ) {
    let query = knex<IUserOptions>('users')
      .select(...selects);

    if (user) {
      query = query.where(user);
    }

    let count = knex<IUserOptions>('users').count('id').first();

    if (user) {
      count = count.where(user);
    }
    const finalCount = count.then(res => res.count);
    const offset = (page - 1) * limit;
    query = query
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);
    return Promise.all([query, finalCount]);
  }

  static findOne(user: Partial<IUserOptions>, selects: Array<keyof IUserOptions | '*'> = this.defaultSelections) {
    let query = knex<IUserOptions>('users').where(user);
    if (selects.includes('*')) {
      return query.select('*').first();
    }
    for (const select of selects) {
      query = query.select(select)
    }
    return query.first();
  }

  static save(
    user: Partial<IUserOptions>,
    selections: Array<keyof IUserOptions> = this.defaultSelections
  ) {
    const query = user.id ? this.update(user, selections) : this.insert(user, selections);
    return query.then(result => result.shift());
  }

  protected static update(user: Partial<IUserOptions>, selections?: Array<keyof IUserOptions>) {
    const save = { ...user, id: undefined };
    return knex<IUserOptions>('users')
      .where({ id: user.id })
      .update(save, selections);
  }

  protected static insert(user: Partial<IUserOptions>, selections?: Array<keyof IUserOptions>) {
    return knex<IUserOptions>('users').insert(user, selections)
  }
}