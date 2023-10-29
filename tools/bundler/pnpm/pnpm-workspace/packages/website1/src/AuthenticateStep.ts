import { autoinject } from 'aurelia-dependency-injection';
import { Redirect } from 'aurelia-router';
import { JwtService } from 'services/jwt.service';


@autoinject
export class AuthenticateStep {

  constructor(private $jwt: JwtService) { }

  run(routingContext, next) {
    const isAuthenticated = this.$jwt.isAuthenticated();
    console.log(isAuthenticated);
    if (routingContext.getAllInstructions().some(route => route.config.settings && route.config.settings.auth === true)) {
      if (!isAuthenticated) {
        return next.cancel(new Redirect('/login'));
      }
    } else if (isAuthenticated && routingContext.getAllInstructions().some(route => route.config.name === 'login')) {
      return next.cancel(new Redirect('/users'));
    }

    return next();
  }
}