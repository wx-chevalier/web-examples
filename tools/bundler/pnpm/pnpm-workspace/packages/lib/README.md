# Core Library

This is your core library, meaning anything that you can re-use between packages
should be put inside this library.

1. for example a password validation function (can be used both in the api's or websites's)
2. Your models, interfaces and types you can see examples at `src/interfaces` or `src/utils`

### Notes: 
If you happen to have multiple web projects that require web-specific utilities
you can create a specific CoreWeb Library. Example:
```
|- package.json
|- .npmrc
|- pnpm-workspace.yaml
|- packages
    |- api1
    |- api2
    |- lib
    |- weblib <-- new Web Specific Library
    |- website1
    |- website2
    |- website3
```

```javascript
// packages/weblib/package.json
{
  "name": "@monosample/weblib",
  "version": "0.2.0"
  "private": true,
  // ...
  "dependencies": {
    // ...
    "@monosample/lib": "workspace:1.0.0",
    "some-dom-library": "2.4.0"
    // ...
  }
  // ...
}

// packages/website1/package.json
{
  "name": "@monosample/website1",
  "private": true,
  // ...
  "dependencies": {
    // ...
    "@monosample/lib": "workspace:1.0.0",
    "@monosample/weblib": "0.2.0"
    // ...
  }
  // ...
}
// packages/website2/package.json
{
  "name": "@monosample/website2",
  "private": true,
  // ...
  "dependencies": {
    // ...
    "@monosample/lib": "workspace:1.0.0",
    "@monosample/weblib": "0.2.0"
    // ...
  }
  // ...
}
```

```typescript
// packages/weblib/src/dom/dom-helpers.ts
import { IUserOptions, getFullProfileStr } from '@monosample/lib'
const hasNode = selector => !!document.querySelector(selector);
const replaceElement = (selector: string | HTMLElement, user: IUserOptions, replacement: HTMLElement) => {
  let element: HTMLElement;
  if(typeof selector === 'string') {
    element = = document.querySelector(selector);
  } else {
    element = selector;
  }
  replacement.innerText = getFullProfileStr(user);
  // do some logic/check about what you're going to do
  element.replaceWith(replacement);
};
```

### Somewhere inside website1
```ts
import { IUserOptions } from '@monosample/lib';
import { replaceElement } from '@monosample/weblib';

export class MyView {
  replaceMe: HTMLElement = null;
  user: IUserOptions = null;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('current_user'));
  }

  attached() {
    const el = document.createElement('span');
    // when attached is called, replaceMe is already available on the DOM and on the class
    replaceElement(this.replaceMe, this.user, el);
  }
}
```

### Somewhere inside website2
```html
<template>
  <!-- Some template -->
</template>
<script>
import { IUserOptions } from '@monosample/lib';
import { replaceElement } from '@monosample/weblib';
export default {
  name: 'SomeView',
  data(){
    // ...
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('current_user'));
    const replaceme = this.$refs['replaceMe'];
    const el = document.createElement('span');
    replaceElement(replaceme, user, el);
  }
}
</script>
```

The same can be applied to back-end only libraries, while the example is trivial
and there are better ways to replace DOM elements in each specific framework, this
just serves to show a possible idea on how could you accomplish a Front-end only library
a Back-end only library would of course be tied to nodejs specific dependencies,
like database/files manipulation, networking etc.