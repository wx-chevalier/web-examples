# Website 1

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

For more information, go to https://aurelia.io/docs/cli/webpack


This is a Front-end Package which shares the same core library of the backend packages
(`api 1`, `api 2`)

```js
{
  "name": "@monosample/website1",
  "description": "An Aurelia client application.",
  // ...
  "dependencies": {
    // ...
    "aurelia-bootstrapper": "^2.3.2",
    "@monosample/lib": "1.0.0"
    // ...
  }
  // ...
}
```

To see samples on how the core library is used check `src/auth/login.ts` or `src/auth/signup.ts`
in specific `ILoginParams` or `IAuthResponse`