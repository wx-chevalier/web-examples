# es-react-pwa

minimalist and modern react boilerplate designed for minimal configuration.

note this uses a forked react build to work with es modules. there is optimisim that react will support an es module compatable build soon.

[demo](https://es-react-pwa.netlify.com/)

contents:

* [snowpack](https://snowpack.dev)
* [react-esm](https://www.npmjs.com/org/reactesm)
* [styled-components](https://styled-components.com)
* [es-module-shims](https://github.com/guybedford/es-module-shims)
* [kv-storage](https://github.com/WICG/kv-storage)
* [workbox](https://developers.google.com/web/tools/workbox)
* [htm](https://github.com/developit/htm)

concepts:

## import maps

included is es module shims, which includes polyfill support for `importmaps`. these allow direct global imports. this is key in not requiring babel.

## tree shaking (snowpack)

snowpack allows you to treeshake es module dependencies in a convinient way. there is a production command that will do the treeshaking, and a post npm install step which will localize the es modules.

```sh
yarn prepare
```

```sh
yarn optimize
```

### progressive web app (workbox)

workbox is configured to be run during build to generate the caching configuration.

intialization:

```sh
yarn pwa:init
```

to generate caching with each build

```sh
yarn pwa
```

