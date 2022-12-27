import { autoinject } from 'aurelia-framework'
import { AuthService } from 'services/auth.service';
import { ILoginParams } from '@monosample/lib';

@autoinject
export class Login {
  credentials: ILoginParams = { email: '', password: '' };

  constructor(private $auth: AuthService) { }

  async submit(event) {
    event.preventDefault();
    if (!this.credentials.email && !this.credentials.password) return;

    await this.$auth.login(this.credentials);
  }
}