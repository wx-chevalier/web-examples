import * as angular from "angular";
import { AppComponent } from "./app.component";

export const html = "<app></app>";

export const AppModule = angular
  .module("app", [])
  .component("app", AppComponent.component).name;
