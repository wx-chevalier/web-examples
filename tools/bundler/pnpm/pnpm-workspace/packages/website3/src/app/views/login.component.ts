import { Component } from '@angular/core';
import { ILoginParams, IAuthResponse } from '@monosample/lib';
import { NgForm } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mono-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  title = 'website3';
  credentials: ILoginParams = { email: '', password: '' };
  email = '';
  password = '';

  constructor(private http: HttpClient, private $jwt: JwtService) { }

  submit(form: NgForm) {
    if (!form.valid) return;
    this.credentials = form.value as ILoginParams;
    this.http.post(`${environment.baseUrl}/auth/login`, this.credentials)
      .subscribe((res: IAuthResponse) => {
        this.$jwt.setToken(res.token, res.user);
      });
  }
}
