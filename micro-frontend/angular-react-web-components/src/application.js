export class Application {
  root = null;
  title = "Web Components";
  container = null;
  errorMode = false;
  loadedApp = null;

  bootstrap(root) {
    this.root = root;

    this.root.innerHTML = `
            <h1>Micro Frontends & Web Components</h1>
            <div class="row">
                <div class="col-sm">
                    <h2>Separately Running Multiple Apps</h2>
                    <angular-app title="Angular Separate Running App"></angular-app>
                    <react-app title="React 15 Separate Running App"></react-app>
                    <react-app-old title="React 0.14 Separate Running App"></react-app-old>
                </div>
                <div class="col-sm">
                    <h2>Rendering Apps in Same Container</h2>
                    <label for="title">Title:</label>
                    <input class="form-control" id="title" name="title" value="${
                      this.title
                    }">
                    <div>
                        <p>Error Mode</p>
                        <input type="radio" name="errorMode" value="0" checked> Disabled
                        <input type="radio" name="errorMode" value="1"> Enabled
                    </div>

                    <div>
                        <button class="btn btn-default" data-app="angular-app">Load Angular App</button>
                        <button class="btn btn-default" data-app="react-app">Load React 15 App</button>
                        <button class="btn btn-default" data-app="react-app-old">Load React 0.14 App</button>
                    </div>
                    <div id="main"></div>
                </div>
            </div>
            `;

    this.container = this.root.querySelector("#main");
    this.root.addEventListener("keyup", this.handleInputChange);
    this.root.addEventListener("change", this.handleInputChange);
    this.root.addEventListener("click", this.handleButtonClick);
  }

  handleInputChange = event => {
    if (event.target.id === "title") {
      this.title = event.target.value;
      this.updateLoadedApp();
      return;
    }

    if (event.target.name !== "errorMode") {
      return false;
    }

    this.errorMode = event.target.value === "1";

    this.updateLoadedApp();
  };

  handleButtonClick = event => {
    if (event.target.nodeName !== "BUTTON") {
      return;
    }

    this.loadApp(event.target.dataset.app);
  };

  updateLoadedApp() {
    if (this.loadedApp) {
      this.loadedApp.setAttribute("title", this.title);

      if (this.errorMode) {
        this.loadedApp.setAttribute("error-mode", "");
      } else {
        this.loadedApp.removeAttribute("error-mode");
      }
    }
  }

  loadApp(app) {
    this.container.innerHTML = "";

    this.loadedApp = document.createElement(app);

    if (this.errorMode) {
      this.loadedApp.setAttribute("error-mode", "");
    }

    this.loadedApp.setAttribute("title", this.title);

    this.loadedApp.addEventListener("load", load => {
      console.log("loaded", load);
    });

    this.loadedApp.addEventListener("error", err => {
      console.error("error", err);

      this.loadedApp.parentNode.removeChild(this.loadedApp);
      this.loadedApp = null;
      this.container.appendChild(this.getError(err.detail));
    });

    this.container.appendChild(this.loadedApp);
  }

  getError(err) {
    const message = document.createElement("p");
    message.innerHTML = err.stack.split("\n").join("<br/>");
    return message;
  }
}

export function render(Component, element) {
  const component = new Component();
  component.bootstrap(element);
}
