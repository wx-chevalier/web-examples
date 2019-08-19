import { set, init, render } from "../utils/store";
import { vals } from "../utils/fns";
import App from "./main/App";

const r = require.context("./", true,
	/\/(models\/.*|model)\.jsx?$/i);
r.keys().map(r).forEach(v => vals(v).forEach(set));
render(App, init());