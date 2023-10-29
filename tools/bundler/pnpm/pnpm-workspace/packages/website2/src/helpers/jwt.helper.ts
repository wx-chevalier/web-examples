import jwtDecode from 'jwt-decode';
import { IUserOptions } from '@monosample/lib';

export class JwtService {

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    const decoded = jwtDecode<Record<string, any>>(token);

    const now = Date.now().valueOf() / 1000;
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
      return false
    }
    if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
      return false
    }
    return true;
  }

  setToken(token: string, user?: Partial<IUserOptions>) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

}

export default new JwtService();