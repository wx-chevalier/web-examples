import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1571350705231 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          isPrimary: true,
          isGenerated: true,
          type: 'int8'
        },
        {
          name: 'email',
          type: 'varchar',
          length: '100',
          isNullable: false,
          isUnique: true
        },
        {
          name: 'username',
          type: 'varchar',
          length: '65',
          isNullable: false,
          isUnique: true
        },
        {
          name: 'firstname',
          type: 'varchar',
          length: '85',
          isNullable: false,
        },
        {
          name: 'lastname',
          type: 'varchar',
          length: '85',
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '90',
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP'
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users', true);
  }

}
