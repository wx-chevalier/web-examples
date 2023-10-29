import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { IUserOptions } from '@monosample/lib';

@Entity('users')
export class User extends BaseEntity implements IUserOptions {

  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 65 })
  username: string;

  @Column({ length: 85 })
  firstname: string;

  @Column({ length: 85 })
  lastname: string;

  @Column({ length: 90, select: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;


  constructor(opts?: Partial<IUserOptions>) {
    super();
    if (opts) {
      Object.assign(this, opts);
    }
  }

  static exists(usernameOrEmail: string) {
    return this.createQueryBuilder('user')
      .where('user.username = :username', { username: usernameOrEmail })
      .orWhere('user.email = :email', { email: usernameOrEmail })
      .getCount()
      .then(count => count > 0);
  }

  static findByEmailOrUsername(usernameOrEmail: string, withPassword = false) {
    let query = this.createQueryBuilder('user')
      .where('user.username = :username', { username: usernameOrEmail })
      .orWhere('user.email = :email', { email: usernameOrEmail })
    if (withPassword) {
      query = query.addSelect('user.password');
    }
    return query.getOne();
  }
}