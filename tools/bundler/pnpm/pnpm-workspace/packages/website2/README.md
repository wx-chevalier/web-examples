# website2

This is a Front-end Package which shares the same core library of the backend packages
(`api 1`, `api 2`)

```js
{
  "name": "@monosample/website2",
  // ...
  "dependencies": {
    // ...
    "core-js": "^3.1.2",
    "vue": "^2.6.10",
    "vue-router": "^3.0.6",
    "@monosample/lib": "1.0.0"
    // ...
  }
  // ...
}
```

To see samples on how the core library is used check `src/views/Login.vue` or `src/views/Signup.vue`
in specific `ILoginParams` or `IAuthResponse`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
