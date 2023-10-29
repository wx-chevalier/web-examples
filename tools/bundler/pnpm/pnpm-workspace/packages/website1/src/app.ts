import { PLATFORM, autoinject, computedFrom } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { JwtService } from 'services/jwt.service';
import { AuthenticateStep } from 'AuthenticateStep';

@autoinject
export class App {
  public router: Router;

  constructor(private $jwt: JwtService) {

  }

  @computedFrom('$jwt.isAuthenticated()')
  get authenticated() {
    return this.$jwt.isAuthenticated();
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.addAuthorizeStep(AuthenticateStep);
    config.map([
      {
        route: ['', 'login'],
        name: 'login',
        moduleId: PLATFORM.moduleName('./views/login'),
        nav: false,
        title: 'Sign in.'
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: PLATFORM.moduleName('./views/signup'),
        nav: false,
        title: 'Sign up.'
      },
      {
        route: 'users',
        name: 'welcome',
        moduleId: PLATFORM.moduleName('./views/users'),
        nav: true,
        settings: {
          auth: true
        },
        title: 'Users'
      },
    ]);

    this.router = router;
  }
}
