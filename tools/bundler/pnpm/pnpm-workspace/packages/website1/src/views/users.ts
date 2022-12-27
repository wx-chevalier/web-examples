import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { IUserOptions, IPaginatedResult, getFullProfileStr } from '@monosample/lib'

@autoinject
export class Users {
  users: Partial<IUserOptions>[] = [];
  count: string | number = 0;

  constructor(private http: HttpClient) { }

  async activate() {
    const result: IPaginatedResult<Partial<IUserOptions>> = await this.http.get('api/users').then(res => res.json());
    this.count = result.count;
    this.users = result.list.map(user => {
      user.createdAt = new Date(user.createdAt);
      user.updatedAt = new Date(user.updatedAt);
      return user;
    });
  }

  getFullProfile(user: IUserOptions) {
    console.log(user);
    return getFullProfileStr(user);
  }
}