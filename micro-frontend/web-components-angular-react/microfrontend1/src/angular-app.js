import * as angular from "angular";
import { AppModule, html } from "./app.module";

window.customElements.define(
  "angular-app",
  class AngularApp extends HTMLElement {
    static get observedAttributes() {
      return ["error-mode", "title"];
    }

    get title() {
      return this.getAttribute("title");
    }

    get errorMode() {
      return this.hasAttribute("error-mode");
    }

    set errorMode(val) {
      // Reflect the value of the open property as an HTML attribute.
      if (val) {
        this.setAttribute("error-mode", "");
      } else {
        this.removeAttribute("error-mode");
      }
    }

    produceError(e) {
      this.dispatchEvent(new CustomEvent("error", { detail: e }));
    }

    constructor(self) {
      self = super(self);

      console.log("AngularApp constructor", this);

      return self;
    }

    connectedCallback() {
      try {
        if (this.errorMode) {
          throw new Error("Application failed at load");
        }
      } catch (e) {
        this.produceError(e);
        return;
      }

      console.log("AngularApp connected");

      this.innerHTML = html;

      const name = `${AppModule}.instance`;

      // create new module as we attaching `run` callback
      angular
        .module(name, [AppModule])
        .value("config", { title: this.title })
        .run(() => {
          console.log(`Angular module ${AppModule} instance is running`);
          this.dispatchEvent(new Event("load"));
        });

      this.$injector = angular.bootstrap(this, [name], {
        strictDi: true
      });
    }

    disconnectedCallback() {
      console.log("AngularApp disconnected");
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      console.log("AngularApp attributeChanged", attrName, oldVal, newVal);

      if (!this.$injector) {
        return;
      }

      switch (attrName) {
        case "title":
          const element = angular.element(this);
          const config = element.injector().get("config");
          config.title = this.title;
          element.scope().$apply();
          return;
      }
    }
  }
);
