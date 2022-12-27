import { Component, OnInit } from '@angular/core';
import { IUserOptions, IPaginatedResult, getFullProfileStr } from '@monosample/lib';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mono-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
    this.fetchUsers();
  }
  title = 'website3';
  users: Partial<IUserOptions>[] = [];
  count: number | string = 0;

  constructor(private http: HttpClient) { }

  fetchUsers() {
    this.http.get(`${environment.baseUrl}/api/users`)
      .subscribe((result: IPaginatedResult<Partial<IUserOptions>>) => {
        this.count = result.count;
        this.users = result.list.map(user => {
          user.createdAt = new Date(user.createdAt);
          user.updatedAt = new Date(user.updatedAt);
          return user;
        });
      });
  }

  getFullProfile(user: IUserOptions) {
    return getFullProfileStr(user);
  }
}
