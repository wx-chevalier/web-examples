// @flow
import React from "react";
import Loadable from "react-loadable";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

export const LoadableLazyComponent = Loadable({
  loader: () => import("./LazyComponent"),
  LoadingComponent: LoadingPlaceholder,
  delay: 200
  // serverSideRequirePath: path.join(__dirname, "./LazyComponent"),
  // webpackRequireWeakId: () => require.resolveWeak("./LazyComponent")
});
