import { autoinject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client'
import { JwtService } from './jwt.service';
import { ILoginParams, ISignUpParams, IAuthResponse } from '@monosample/lib';
import * as environment from '../../config/environment.json';

@autoinject
export class AuthService {

  constructor(private http: HttpClient, private $jwt: JwtService) { }

  async login(params: ILoginParams) {
    try {
      var response: IAuthResponse = await this.http.post('auth/login', json(params)).then(res => res.json());
    } catch (error) {
      console.error(error.message);
      return;
    }
    this.$jwt.setToken(response.token, response.user);
  }

  async signup(params: ISignUpParams) {
    try {
      var response: IAuthResponse = await this.http.post('auth/signup', json(params)).then(res => res.json());
    } catch (error) {
      console.error(error.message);
    }
    console.log(response);
  }

}