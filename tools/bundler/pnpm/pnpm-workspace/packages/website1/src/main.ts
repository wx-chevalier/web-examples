import 'bootstrap';
import '@monosample/core-ui';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient, HttpClientConfiguration } from 'aurelia-fetch-client';
import { bearerTokenInterceptor } from './interceptors';
import * as environment from '../config/environment.json';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  const container = aurelia.container;

  const http = new HttpClient();
  http.configure((config: HttpClientConfiguration) => {
    config
      .useStandardConfiguration()
      .withBaseUrl(environment.baseUrl)
      .withInterceptor(bearerTokenInterceptor);
  });


  container.registerInstance(HttpClient, http);
  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  //Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
