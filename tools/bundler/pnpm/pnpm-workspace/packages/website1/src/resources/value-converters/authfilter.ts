import { valueConverter } from 'aurelia-framework'
import { RouteConfig } from 'aurelia-router';

@valueConverter('authFilter')
export class AuthFilterValueConverter {
  toView(routes: RouteConfig, isAuthenticated: boolean): boolean {
    return routes.filter(route => typeof route.settings.auth !== 'boolean' || route.settings.auth === isAuthenticated);
  }
}