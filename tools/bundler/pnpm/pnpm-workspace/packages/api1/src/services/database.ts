import preKnex from 'knex';
import { DB_URL } from '../config';

export const knex = preKnex({
  client: 'pg',
  connection: DB_URL,
  searchPath: ['public'],
});

export default knex;