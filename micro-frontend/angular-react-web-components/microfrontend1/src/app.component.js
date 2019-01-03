export class AppComponent {
  static component = {
    template: `
            <div>
                <h3>Title: {{ $ctrl.config.title }}</h3>
                <p>Greeting: {{ $ctrl.hello }}</p>
            </div>
        `,
    controller: AppComponent
  };

  static $inject = ["$http", "config"];

  hello = "Angular Web Component";

  constructor($http, config) {
    this.$http = $http;
    this.config = config;
  }
}
