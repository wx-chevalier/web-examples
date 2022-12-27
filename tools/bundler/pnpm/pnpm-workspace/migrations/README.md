# Migrations

[typeorm]: https://typeorm.io/#/migrations
[knex]: http://knexjs.org/#Migrations
[sequelize]: https://sequelize.org/master/manual/migrations.html

For this sample we'll use [typeorm] as our migrations tool, but you should be able to use anything else to accomplish the same, either [knex], [sequelize] or any other nodejs based tool, just remember to install it's dependencies on the root package.

[typeorm] will use this directory to create and find migrations, based on the `ormconfig.json` that can be found in the root directory

## Using [typeorm] for migrations

to create a new migration use

- `typeorm migration:create -n <NAME OF YOUR MIGRATION>`

example:

- `typeorm migration:create -n CreateUsersTable`

and to run up/down migrations use

`pnpm run migrations:up` or `pnpm run migrations:down`

the reason for this is that typescript migration files need to be run with `ts-node` so we put a small 
npm script to handle that for you, else you can use [typeorm]-cli as usual